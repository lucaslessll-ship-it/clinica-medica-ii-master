import { fsrs, createEmptyCard, Rating } from 'ts-fsrs';
const scheduler=fsrs({enable_fuzz:false,enable_short_term:false,request_retention:0.9});
window.MasterScheduler={
 next(previous,{correct,helped,confidence,now=new Date()}){
  let card=previous?.fsrs?{...previous.fsrs,due:new Date(previous.fsrs.due),last_review:previous.fsrs.last_review?new Date(previous.fsrs.last_review):undefined}:createEmptyCard(now);
  const rating=!correct||helped?Rating.Again:confidence==='Baixa'?Rating.Hard:confidence==='Alta'?Rating.Easy:Rating.Good;
  const result=scheduler.next(card,now,rating).card;
  return {...result,due:result.due.toISOString(),last_review:result.last_review?.toISOString()};
 }
};
