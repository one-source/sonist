/**
 *
 * @authors yutent (yutent@doui.cc)
 * @date    2019-09-07 23:35:03
 * @version v2.0.1
 * 
 */

'use strict'

import"../scroll/index.js";import"../icon/index.js";import{ebind,bind,unbind,clickOutside}from"../utils.js";const TYPES=["text","textarea","password"],INPUTS={text:'<input spellcheck="false">',textarea:'<textarea spellcheck="false"></textarea>'};export default class Input extends HTMLElement{static get observedAttributes(){return["value","icon","type","label","placeholder","mvidx","autofocus","readonly","disabled"]}constructor(){super();var e,t=this.getAttribute("type");"textarea"!==t&&(t="text"),e=INPUTS[t],Object.defineProperty(this,"root",{value:this.attachShadow({mode:"open"}),writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(this,"props",{value:{value:"",icon:"",type:"text",label:"",placeholder:"",mvidx:null,autofocus:!1,readonly:!1,disabled:!1},writable:!0,enumerable:!1,configurable:!0}),this.root.innerHTML=`<style>*{box-sizing:border-box;margin:0;padding:0}::before,::after{box-sizing:border-box}ul,li{list-style:none}:host{overflow:hidden;display:inline-block;user-select:none;-moz-user-select:none;color:#526273;border-radius:4px}.label{display:flex;justify-content:center;align-items:center;min-width:64px;width:100%;height:32px;font-size:14px;border:1px solid #dae1e9;border-radius:inherit;background:#fff;color:inherit;cursor:text}.label input,.label textarea{flex:1;min-width:32px;width:0;height:100%;padding:0 5px;border:0;border-radius:inherit;color:inherit;font-size:inherit;font-family:inherit;background:none;outline:none;box-shadow:none;cursor:inherit}.label input::placeholder,.label textarea::placeholder{color:#aabac3}.label textarea{padding:5px 8px;resize:none}.label .prepend,.label .append{display:none;justify-content:center;align-items:center;width:auto;height:30px;padding:0 10px;background:#f3f5fb}.label .prepend{border-right:1px solid #dae1e9;border-radius:4px 0 0 4px}.label .append{border-left:1px solid #dae1e9;border-radius:0 4px 4px 0}.label[prepend] .prepend,.label[append] .append{display:flex}.label .icon{padding:0 5px;--size: 20px}.suggestion{display:none;position:fixed;z-index:10240;left:0;top:0;width:200px;height:auto;max-height:200px;min-height:46px;padding:8px 0;border-radius:4px;background:#fff;box-shadow:0 0 5px rgba(0,0,0,0.25)}.suggestion .list{width:100%}.suggestion::after{position:absolute;left:30px;top:-4px;width:8px;height:8px;background:#fff;box-shadow:-1px -1px 2px rgba(0,0,0,0.1);transform:rotate(45deg);content:''}.suggestion.show{display:flex}.suggestion li{overflow:hidden;width:100%;height:30px;line-height:30px;padding:0 8px;text-overflow:ellipsis;white-space:nowrap;cursor:pointer}.suggestion li:hover,.suggestion li[focus]{background:#f3f5fb}:host([disabled]) .label{background:#f3f5fb;cursor:not-allowed;opacity:0.6}:host(:focus-within){box-shadow:0 0 2px #88f7df}:host(:focus-within[readonly]){box-shadow:0 0 2px #f3be4d}:host([type='textarea']){display:flex;height:80px}:host([type='textarea']) .label{width:100%;height:100%}:host([type='textarea']) .icon,:host([type='textarea']) .suggestion{display:none}:host([round]){border-radius:21px}:host([round]) .prepend{border-radius:21px 0 0 21px}:host([round]) .append{border-radius:0 21px 21px 0}:host([size='large']) .label{height:42px;font-size:16px}:host([size='large']) .prepend,:host([size='large']) .append{height:40px}:host([size='medium']) .label{height:36px}:host([size='medium']) .prepend,:host([size='medium']) .append{height:34px}:host([size='mini']) .label{height:24px;font-size:12px}:host([size='mini']) .icon{--size: 16px}:host([size='mini']) .prepend,:host([size='mini']) .append{height:18px}\n</style> <div class="label"> <slot class="prepend" name="prepend"></slot> ${e} <wc-icon class="icon"></wc-icon> <slot class="append" name="append"></slot> <div class="suggestion"> <wc-scroll> <ul class="list"></ul> </wc-scroll> </div> </div> `,this.props.type=t,this.__OUTER__=this.root.children[1],this.__PREPEND__=this.__OUTER__.children[0],this.__INPUT__=this.__OUTER__.children[1],this.__ICO__=this.__OUTER__.children[2],this.__APPEND__=this.__OUTER__.children[3],this.__LIST__=this.__OUTER__.children[4]}get readonly(){return this.props.readonly}set readonly(e){var t=typeof e;e!==this.props.readonly&&("boolean"===t&&e||"boolean"!==t?(this.props.readonly=!0,this.setAttribute("readonly",""),this.__INPUT__.setAttribute("readonly","")):(this.props.readonly=!1,this.removeAttribute("readonly"),this.__INPUT__.removeAttribute("readonly")))}get disabled(){return this.props.disabled}set disabled(e){var t=typeof e;e!==this.props.disabled&&("boolean"===t&&e||"boolean"!==t?(this.props.disabled=!0,this.setAttribute("disabled",""),this.__INPUT__.setAttribute("disabled","")):(this.props.disabled=!1,this.removeAttribute("disabled"),this.__INPUT__.removeAttribute("disabled")))}get value(){return this.__INPUT__.value}set value(e){this.__INPUT__.value=e}get type(){return this.__INPUT__.type}set type(e){"textarea"!==e&&(this.__INPUT__.type=e)}_moveSelect(e){var{list:t}=this.props;if(t&&t.length){e.preventDefault();var i=38===e.keyCode?-1:1,s=Array.from(this.__LIST__.firstElementChild.firstElementChild.children);null===this.props.mvidx?this.props.mvidx=0:this.props.mvidx+=i,this.props.mvidx<0?this.props.mvidx=0:this.props.mvidx>s.length-1&&(this.props.mvidx=s.length-1),s.forEach((e,t)=>{t===this.props.mvidx?(this.__LIST__.firstElementChild.scrollTop=e.offsetTop-150,e.setAttribute("focus","")):e.removeAttribute("focus")})}}_fetchSelect(e,t){var i=this.props.list[e];this.value=i.value,this.dispatchEvent(new CustomEvent("select",{detail:i})),this._handleChange(t),this.__LIST__.classList.remove("show"),this.props.mvidx=null}connectedCallback(){for(var e=this.__PREPEND__.assignedNodes(),t=this.__APPEND__.assignedNodes();e.length>1;)this.removeChild(e.pop());for(;t.length>1;)this.removeChild(t.pop());e.length&&"textarea"!==this.props.type&&this.__OUTER__.setAttribute("prepend",""),t.length&&"textarea"!==this.props.type&&this.__OUTER__.setAttribute("append","");var{type:i}=this.props;this._handleSubmit=ebind(this.__INPUT__,"keydown",e=>{if(!this.disabled&&!this.readonly){if((38===e.keyCode||40===e.keyCode)&&"text"===this.type)return this._moveSelect(e);if(13===e.keyCode){if("text"===this.type&&null!==this.props.mvidx)return this._fetchSelect(this.props.mvidx,e);("text"===i||"textarea"===i&&(e.ctrlKey||e.metaKey))&&this.dispatchEvent(new CustomEvent("submit",{detail:this.value}))}}}),this._handleWheel=ebind(this.__INPUT__,"wheel"),"text"===i&&(this._handleChange=bind(this.__INPUT__,"input",e=>{e.preventDefault(),this.dispatchEvent(new CustomEvent("fetch-suggest",{detail:{value:this.value,send:e=>{this.props.list=e,this._parseSuggestion()}}}))}),this._parseSuggestion=bind(this.__INPUT__,"click",e=>{var{list:t}=this.props;let{x:i,y:s,width:o}=this.getBoundingClientRect();if(t&&t.length){var l=t.map((e,t)=>`<li data-idx="${t}">${e.value}</li>`).join("");this.__LIST__.firstElementChild.firstElementChild.innerHTML=l,this.__LIST__.classList.toggle("show",!0),this.__LIST__.style.cssText=`left:${i}px;top:${s+50}px;width:${o}px;`}else this.__LIST__.classList.toggle("show",!1)}),this._inactiveFn=clickOutside(this,e=>{this.__LIST__.classList.remove("show")}),this._handleSelect=bind(this.__LIST__,"click",e=>{"LI"===e.target.tagName&&(this._fetchSelect(e.target.dataset.idx,e),this.dispatchEvent(new CustomEvent("input")))}))}disconnectedCallback(){unbind(this.__INPUT__,"wheel",this._handleWheel),unbind(this.__INPUT__,"keydown",this._handleSubmit),unbind(this.__INPUT__,"input",this._handleChange),unbind(document,"mousedown",this._inactiveFn),unbind(this.__LIST__,"click",this._handleSelect)}attributeChangedCallback(e,t,i){if(null!==i&&t!==i)switch(e){case"icon":this.props.icon=i,i?this.__ICO__.setAttribute("is",i):(this.removeAttribute("icon"),this.__ICO__.removeAttribute("is"));break;case"autofocus":this.__INPUT__.setAttribute("autofocus",""),setTimeout(e=>{this.__INPUT__.focus()},10);break;case"label":case"placeholder":this.__INPUT__.setAttribute("placeholder",i);break;case"type":~TYPES.indexOf(i)?this.type=i:this.type="text";break;case"value":this.value=i;break;case"readonly":case"disabled":this[e]=!0}}};

if(!customElements.get('wc-input')){
  customElements.define('wc-input', Input)
}
