/* Planejamento de estudo por datas locais. Não altera o progresso do estudante. */
(function(root){
  'use strict';
  const firstDay='2026-11-13',examDay='2026-11-19';
  const dayKey=date=>date.getFullYear()+'-'+String(date.getMonth()+1).padStart(2,'0')+'-'+String(date.getDate()).padStart(2,'0');
  const localDate=key=>{const [year,month,day]=key.split('-').map(Number);return new Date(year,month-1,day,12);};
  function dates(from,to){const out=[],date=localDate(from);while(dayKey(date)<=to){out.push(dayKey(date));date.setDate(date.getDate()+1);}return out;}
  function build({topics=[],completed={},questions=[],results={},activity={},now=new Date()}={}){
    const today=dayKey(now),active=today>=firstDay&&today<=examDay;
    const ranked=topics.map((topic,index)=>({topic,index})).sort((a,b)=>b.topic.priority-a.topic.priority||a.index-b.index).map(row=>row.topic);
    const weights=new Map(ranked.map((topic,index)=>[topic.id,index]));
    const allLessons=ranked.flatMap(topic=>topic.chapters.map((chapter,index)=>({key:topic.id+'_'+index,topic:topic.id,index,title:chapter.name,topicTitle:topic.title,priority:topic.priority})));
    const pending=allLessons.filter(lesson=>!completed[lesson.key]);
    const ownQuestions=questions.filter(question=>weights.has(question.t));
    const unanswered=ownQuestions.filter(question=>!results[question.id]).sort((a,b)=>weights.get(a.t)-weights.get(b.t));
    const marked=new Set(activity[today]?.lessons||[]),answered=new Set(activity[today]?.questions||[]);
    const doneToday=allLessons.filter(lesson=>marked.has(lesson.key)&&completed[lesson.key]);
    const questionsToday=ownQuestions.filter(question=>answered.has(question.id)&&results[question.id]);
    const days=active?dates(today,examDay).map(date=>({date,review:date===examDay,lessons:[],questions:[],completedLessons:0,completedQuestions:0})):[];
    const studyDays=days.filter(day=>!day.review);
    const remainingLessons=[...pending],remainingQuestions=[...unanswered];
    studyDays.forEach((day,index)=>{
      const creditLessons=index===0?doneToday.length:0,creditQuestions=index===0?questionsToday.length:0,remainingDays=studyDays.length-index;
      const countLessons=Math.max(0,Math.ceil((remainingLessons.length+creditLessons)/remainingDays)-creditLessons);
      const countQuestions=Math.max(0,Math.ceil((remainingQuestions.length+creditQuestions)/remainingDays)-creditQuestions);
      day.lessons=remainingLessons.splice(0,countLessons);day.questions=remainingQuestions.splice(0,countQuestions).map(question=>question.id);
      day.completedLessons=creditLessons;day.completedQuestions=creditQuestions;
    });
    return {active,today,firstDay,examDay,days,next:days[0]?.lessons[0]||null,pendingLessons:pending.length,pendingQuestions:unanswered.length,completedToday:doneToday.length,questionCreditToday:questionsToday.length,totalLessons:allLessons.length,totalQuestions:ownQuestions.length};
  }
  const api={build,dayKey,firstDay,examDay};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  else{
    root.CirPlan=api;
    let timer,lastDay=dayKey(new Date());
    function refresh(){
      clearTimeout(timer);
      const now=new Date(),current=dayKey(now);
      if(current!==lastDay){lastDay=current;if(document.querySelector('.dash-today')&&typeof root.render==='function')root.render();}
      if(current<=examDay){const midnight=new Date(now.getFullYear(),now.getMonth(),now.getDate()+1);timer=setTimeout(refresh,midnight.getTime()-now.getTime()+50);}
    }
    root.addEventListener('load',refresh);
    document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')refresh();});
  }
})(globalThis);
