/**
 *
 * @authors yutent (yutent@doui.cc)
 * @date    2019-09-01 23:16:06
 * @version v2.0.1
 * 
 */

'use strict'

function calculate(t,e,r){var o,a=[],s=0,i=t<3?6-t:2;if(e<2||r)return a.push({to:t,txt:t}),a;t-i>1&&e>5&&(o=(o=t-2*i)<1?1:o,a.push({to:o,txt:"..."}));e-t<i&&(s=i-e+t);for(var n=t-i-s;n<t+i+1&&n<=e;n++)n>0&&a.push({to:n,txt:n});t+i<e&&(o=(o=t+2*i)>e?e:o,a.push({to:o,txt:"..."}));return a}export default class Pager extends HTMLElement{static get observedAttributes(){return["layout","total","curr","pagesize","simple"]}constructor(){super(),Object.defineProperty(this,"root",{value:this.attachShadow({mode:"open"}),writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(this,"props",{value:{layout:"home, prev, next, end",total:0,curr:1,pagesize:20,simple:!1},writable:!0,enumerable:!1,configurable:!0}),this.root.innerHTML='<style>*{box-sizing:border-box;margin:0;padding:0}::before,::after{box-sizing:border-box}:host{display:block;line-height:1;color:#62778d;font-size:14px;user-select:none;-moz-user-select:none}:host .layout{display:flex;justify-content:center;align-items:center;margin:10px auto}:host button{min-width:32px;height:32px;padding:0 8px;margin:0 3px;background:#f3f5fb;border:0;border-radius:4px;outline:none;font-size:inherit;color:inherit}:host button:hover{background:#e8ebf4}:host button[curr]{background:#3fc2a7;color:#fff}:host([simple]) .home,:host([simple]) .end{display:none}:host([circle]) button{border-radius:50%}:host([color=\'red\']) button[curr]{background:#ff5061}:host([color=\'blue\']) button[curr]{background:#66b1ff}:host([color=\'green\']) button[curr]{background:#58d68d}:host([color=\'teal\']) button[curr]{background:#3fc2a7}:host([color=\'orange\']) button[curr]{background:#ffb618}:host([color=\'dark\']) button[curr]{background:#62778d}:host([color=\'purple\']) button[curr]{background:#ac61ce}\n</style> <div class="layout"> <button data-page="1" class="home">|<</button> <button data-page="prev" class="prev"><</button> <div class="pager"></div> <button data-page="next" class="next">></button> <button data-page="end" class="end">>|</button> </div> ',this.__LAYOUT__=this.root.children[1],this.__HOME__=this.__LAYOUT__.children[0],this.__PREV__=this.__LAYOUT__.children[1],this.__PAGE__=this.__LAYOUT__.children[2],this.__NEXT__=this.__LAYOUT__.children[3],this.__END__=this.__LAYOUT__.children[4]}update(){var{curr:t,totalpage:e,simple:r}=this.props,o=calculate(t,e,r);this.__PAGE__.innerHTML=o.map(e=>`<button ${t===e.to?"curr":""} data-page="${e.to}">${e.txt}</button>`).join("")}connectedCallback(){var{pagesize:t,total:e}=this.props;this.props.totalpage=Math.ceil(e/t),this.update(),this.__LAYOUT__.addEventListener("click",t=>{if("BUTTON"===t.target.tagName){var{curr:e,totalpage:r}=this.props,o=t.target.dataset.page,a=+o;if(a==a){if(a===e)return}else switch(o){case"prev":if((a=e-1)<1)return;break;case"next":if((a=e+1)>r)return;break;case"end":if(r===e)return;a=r}this.props.curr=a,this.update(),this.dispatchEvent(new CustomEvent("pick",{detail:a}))}},!1)}attributeChangedCallback(t,e,r){if(e!==r)switch(t){case"total":case"pagesize":case"curr":this.props[t]=+r||this.props[t];var{pagesize:o,total:a}=this.props;this.props.totalpage=Math.ceil(a/o),this.update();break;case"simple":this.props.simple=!0}}};

if(!customElements.get('wc-pager')){
  customElements.define('wc-pager', Pager)
}
