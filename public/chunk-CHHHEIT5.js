import{a as q}from"./chunk-WGOC63YR.js";import{k as u}from"./chunk-TDM3KEZO.js";import{Ea as v,Fa as G,G as b,H as p,Ib as D,J as T,N as c,Nc as P,O as f,Pc as k,Qc as E,Rc as S,Sc as j,Tc as L,Vc as O,Wc as U,Ya as I,bb as l,h as r,i as A,ia as n,k as s,ld as h,wb as R,xc as B,yc as d}from"./chunk-PF65G2OF.js";import{a as F,b as N,h as m}from"./chunk-MXSB3YWW.js";var C=(()=>{class o{constructor(e){this.firestore=e,this.collectionName="games"}getGames(){return r(k(S(this.firestore,this.collectionName),{idField:"id"})).pipe(s(e=>e.map(t=>({uuid:t.id,date:t.date,opponent:t.opponent,score:t.score,team:t.team,isAway:t.isAway}))))}getGame(e){return e?r(L(j(this.firestore,this.collectionName,e))).pipe(s(t=>{let a=null;return t.exists()&&(a={uuid:t.id,date:t.get("date"),opponent:t.get("opponent"),score:t.get("score"),team:t.get("team"),isAway:t.get("isAway")}),a})):A(null)}createGame(e){let t={date:e.date,opponent:e.opponent,team:e.team,isAway:e.isAway};return r(E(S(this.firestore,this.collectionName),t)).pipe(s(a=>N(F({},e),{uuid:a.id})))}updateSession(e){return r(O(j(this.firestore,this.collectionName,e.uuid),e))}static{this.\u0275fac=function(t){return new(t||o)(T(P))}}static{this.\u0275prov=b({token:o,factory:o.\u0275fac,providedIn:"root"})}}return o})();var y=class w{constructor(i){this.gameService=i}ngOnInit(){}static{this.\u0275fac=function(e){return new(e||w)(n(C))}}static{this.\u0275cmp=c({type:w,selectors:[["app-games"]],standalone:!0,features:[l],decls:5,vars:0,template:function(e,t){e&1&&(v(0,"h1"),I(1,"Liste des matchs"),G(),v(2,"mat-card")(3,"p"),I(4,"Bient\xF4t disponible :)"),G()())},dependencies:[d,B,u],encapsulation:2})}};y=m([h()],y);var g=class x{constructor(i,e){this.sessionService=i,this.playerService=e}ngOnInit(){}static{this.\u0275fac=function(e){return new(e||x)(n(C),n(U))}}static{this.\u0275cmp=c({type:x,selectors:[["app-game"]],standalone:!0,features:[l],decls:0,vars:0,template:function(e,t){},dependencies:[d,u]})}};g=m([h()],g);var J=[{path:"",component:y,pathMatch:"full"},{path:"create/:uuid",component:g,canActivate:[q]}],H=(()=>{class o{static{this.\u0275fac=function(t){return new(t||o)}}static{this.\u0275mod=f({type:o})}static{this.\u0275inj=p({imports:[D.forChild(J),D]})}}return o})();var ue=(()=>{class o{static{this.\u0275fac=function(t){return new(t||o)}}static{this.\u0275mod=f({type:o})}static{this.\u0275inj=p({imports:[R,H]})}}return o})();export{ue as GameModule};