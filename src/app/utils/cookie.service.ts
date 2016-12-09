import { Injectable } from '@angular/core';

@Injectable()
export class CookieService {

  constructor() { }

  getItem(sKey: string) {
    if (!sKey) { return null; }
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  }


  setItem(sKey: string, sValue: string, sPath: string = '/', vEnd?: Date, sDomain?: string, bSecure?: string) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    var sExpires = "";
    if (vEnd) {
      sExpires = "; expires=" + vEnd.toUTCString();
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
  }

  // MDN removeItem implementation doesn't work. Internally uses
  // a different implementation taken from SO.
  removeItem(sKey: string, sPath: string = '/', sDomain?: string) {
    this.deleteCookie(sKey, sPath, sDomain);
  }

  // Taken from:
  // http://stackoverflow.com/questions/2144386/javascript-delete-cookie
  private deleteCookie(name, path?, domain?) {
    if(this.getItem(name)) {
      document.cookie = name + "=" +
        ((path) ? ";path="+path:"")+
        ((domain)?";domain="+domain:"") +
        ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
  }

  hasItem(sKey: string) {
    if (!sKey) { return false; }
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  }

  keys(): string[] {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    return aKeys;
  }

}
