from pathlib import Path
import http.server, socketserver, threading, os
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).parent
URL='http://127.0.0.1:8767/index.html'
os.chdir(ROOT)
class Server(socketserver.ThreadingMixIn, http.server.HTTPServer): daemon_threads=True
server=Server(('127.0.0.1',8767), http.server.SimpleHTTPRequestHandler)
threading.Thread(target=server.serve_forever,daemon=True).start()

def run():
  with sync_playwright() as p:
    browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
    for width,height in [(1440,950),(820,1180),(390,844)]:
      page=browser.new_page(viewport={'width':width,'height':height},device_scale_factor=1)
      page.set_default_timeout(8000)
      page.route('**/*', lambda route: route.abort())
      print('TEST viewport',width,flush=True)
      failures=[]
      page.on('pageerror',lambda e:failures.append(str(e)))
      html=(ROOT/'index.html').read_text()
      html=html.replace('<link rel="stylesheet" href="styles.css">','<style>'+ (ROOT/'styles.css').read_text()+'</style>')
      html=html.replace('<script defer src="app.js"></script>','<script>'+(ROOT/'app.js').read_text()+'</script>')
      page.set_content(html,wait_until='domcontentloaded')
      page.wait_for_timeout(300)
      assert page.locator('h1').first.is_visible(),f'No header {width}'
      page.screenshot(path=str(ROOT / f'screenshot-{width}.png'),full_page=(width==1440))
      overflow=page.evaluate('document.documentElement.scrollWidth>window.innerWidth+2')
      print('viewport',width,'errors',failures,'overflow',overflow,'title',page.title())
      assert not failures
      assert not overflow
      for v in ('physio','patterns','microscopy','lab','cases','quiz'):
        print('  nav',v,flush=True)
        page.locator(f'[data-view="{v}"]').first.click()
        page.wait_for_timeout(50)
        assert page.locator('h1').first.is_visible()
        assert not page.evaluate('document.documentElement.scrollWidth>window.innerWidth+2'),f'overflow {v}@{width}'
      print('  lab interaction',flush=True)
      page.locator('[data-view="lab"]').first.click()
      page.locator('[data-request="ferritin"]').click()
      assert page.get_by_text('Ferritina',exact=True).count()>=1
      page.locator('[data-lab-answer="0"]').click()
      assert page.get_by_text('Deficiência absoluta',exact=False).count()>=1
      print('  cases interaction',flush=True)
      page.locator('[data-view="cases"]').first.click()
      page.locator('[data-case-answer="0:1"]').click()
      assert page.locator('[data-case-answer="1:0"]').count()==1
      print('  quiz interaction',flush=True)
      page.locator('[data-view="quiz"]').first.click()
      q=page.locator('[data-answer]').first
      q.click()
      assert page.locator('.feedback').count()>=1
      page.locator('#themeToggle').click()
      assert page.locator('body.dark').count()==1
      page.close()
    browser.close()
if __name__=='__main__':run()