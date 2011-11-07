/*
 * Ext JS Library 3.0.0
 * Copyright(c) 2006-2009 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.DomHelper = function() {
	var s = null, j = /^(?:br|frame|hr|img|input|link|meta|range|spacer|wbr|area|param|col)$/i, l = /^table|tbody|tr|td$/i, p, m = "afterbegin", n = "afterend", c = "beforebegin", o = "beforeend", a = "<table>", h = "</table>", b = a
			+ "<tbody>", i = "</tbody>" + h, k = b + "<tr>", r = "</tr>" + i;
	function g(w, y, x, z, v, t) {
		var u = p.insertHtml(z, Ext.getDom(w), q(y));
		return x ? Ext.get(u, true) : u
	}
	function q(y) {
		var v = "", u, x, w, t, z;
		if (typeof y == "string") {
			v = y
		} else {
			if (Ext.isArray(y)) {
				Ext.each(y, function(A) {
					v += q(A)
				})
			} else {
				v += "<" + (y.tag = y.tag || "div");
				Ext.iterate(y, function(A, B) {
					if (!/tag|children|cn|html$/i.test(A)) {
						if (Ext.isObject(B)) {
							v += " " + A + "='";
							Ext.iterate(B, function(D, C) {
								v += D + ":" + C + ";"
							});
							v += "'"
						} else {
							v += " " + ( {
								cls : "class",
								htmlFor : "for"
							}[A] || A) + "='" + B + "'"
						}
					}
				});
				if (j.test(y.tag)) {
					v += "/>"
				} else {
					v += ">";
					if ((z = y.children || y.cn)) {
						v += q(z)
					} else {
						if (y.html) {
							v += y.html
						}
					}
					v += "</" + y.tag + ">"
				}
			}
		}
		return v
	}
	function e(y, w, v, x) {
		s.innerHTML = [ w, v, x ].join("");
		var t = -1, u = s;
		while (++t < y) {
			u = u.firstChild
		}
		return u
	}
	function d(t, u, w, v) {
		var x, y;
		s = s || document.createElement("div");
		if (t == "td" && (u == m || u == o) || !/td|tr|tbody/i.test(t)
				&& (u == c || u == n)) {
			return
		}
		y = u == c ? w : u == n ? w.nextSibling : u == m ? w.firstChild : null;
		if (u == c || u == n) {
			w = w.parentNode
		}
		if (t == "td" || (t == "tr" && (u == o || u == m))) {
			x = e(4, k, v, r)
		} else {
			if ((t == "tbody" && (u == o || u == m))
					|| (t == "tr" && (u == c || u == n))) {
				x = e(3, b, v, i)
			} else {
				x = e(2, a, v, h)
			}
		}
		w.insertBefore(x, y);
		return x
	}
	p = {
		markup : function(t) {
			return q(t)
		},
		insertHtml : function(y, t, z) {
			var x = {}, v, B, A, C, w, u;
			y = y.toLowerCase();
			x[c] = [ "BeforeBegin", "previousSibling" ];
			x[n] = [ "AfterEnd", "nextSibling" ];
			if (t.insertAdjacentHTML) {
				if (l.test(t.tagName)
						&& (u = d(t.tagName.toLowerCase(), y, t, z))) {
					return u
				}
				x[m] = [ "AfterBegin", "firstChild" ];
				x[o] = [ "BeforeEnd", "lastChild" ];
				if ((v = x[y])) {
					t.insertAdjacentHTML(v[0], z);
					return t[v[1]]
				}
			} else {
				A = t.ownerDocument.createRange();
				B = "setStart" + (/end/i.test(y) ? "After" : "Before");
				if (x[y]) {
					A[B](t);
					C = A.createContextualFragment(z);
					t.parentNode.insertBefore(C, y == c ? t : t.nextSibling);
					return t[(y == c ? "previous" : "next") + "Sibling"]
				} else {
					w = (y == m ? "first" : "last") + "Child";
					if (t.firstChild) {
						A[B](t[w]);
						C = A.createContextualFragment(z);
						if (y == m) {
							t.insertBefore(C, t.firstChild)
						} else {
							t.appendChild(C)
						}
					} else {
						t.innerHTML = z
					}
					return t[w]
				}
			}
			throw 'Illegal insertion point -> "' + y + '"'
		},
		insertBefore : function(t, v, u) {
			return g(t, v, u, c)
		},
		insertAfter : function(t, v, u) {
			return g(t, v, u, n, "nextSibling")
		},
		insertFirst : function(t, v, u) {
			return g(t, v, u, m, "firstChild")
		},
		append : function(t, v, u) {
			return g(t, v, u, o, "", true)
		},
		overwrite : function(t, v, u) {
			t = Ext.getDom(t);
			t.innerHTML = q(v);
			return u ? Ext.get(t.firstChild) : t.firstChild
		},
		createHtml : q
	};
	return p
}();
Ext
		.apply(
				Ext.DomHelper,
				function() {
					var d, a = "afterbegin", g = "afterend", h = "beforebegin", c = "beforeend";
					function e(l, n, m, p, k, i) {
						l = Ext.getDom(l);
						var j;
						if (d.useDom) {
							j = b(n, null);
							if (i) {
								l.appendChild(j)
							} else {
								(k == "firstChild" ? l : l.parentNode)
										.insertBefore(j, l[k] || l)
							}
						} else {
							j = Ext.DomHelper.insertHtml(p, l, Ext.DomHelper
									.createHtml(n))
						}
						return m ? Ext.get(j, true) : j
					}
					function b(p, j) {
						var l, m = document, k, i, n, q;
						if (Ext.isArray(p)) {
							l = m.createDocumentFragment();
							Ext.each(p, function(o) {
								b(o, l)
							})
						} else {
							if (Ext.isString(p)) {
								l = m.createTextNode(p)
							} else {
								l = m.createElement(p.tag || "div");
								k = !!l.setAttribute;
								Ext.iterate(p, function(o, r) {
									if (!/tag|children|cn|html|style/.test(o)) {
										if (o == "cls") {
											l.className = r
										} else {
											if (k) {
												l.setAttribute(o, r)
											} else {
												l[o] = r
											}
										}
									}
								});
								d.applyStyles(l, p.style);
								if ((q = p.children || p.cn)) {
									b(q, l)
								} else {
									if (p.html) {
										l.innerHTML = p.html
									}
								}
							}
						}
						if (j) {
							j.appendChild(l)
						}
						return l
					}
					d = {
						createTemplate : function(j) {
							var i = Ext.DomHelper.createHtml(j);
							return new Ext.Template(i)
						},
						useDom : false,
						applyStyles : function(m, n) {
							if (n) {
								var k = 0, j, l;
								m = Ext.fly(m);
								if (Ext.isFunction(n)) {
									n = n.call()
								}
								if (Ext.isString(n)) {
									n = n.trim().split(/\s*(?::|;)\s*/);
									for (j = n.length; k < j;) {
										m.setStyle(n[k++], n[k++])
									}
								} else {
									if (Ext.isObject(n)) {
										m.setStyle(n)
									}
								}
							}
						},
						insertBefore : function(i, k, j) {
							return e(i, k, j, h)
						},
						insertAfter : function(i, k, j) {
							return e(i, k, j, g, "nextSibling")
						},
						insertFirst : function(i, k, j) {
							return e(i, k, j, a, "firstChild")
						},
						append : function(i, k, j) {
							return e(i, k, j, c, "", true)
						},
						createDom : b
					};
					return d
				}());
Ext.Template = function(d) {
	var e = this, b = arguments, c = [];
	if (Ext.isArray(d)) {
		d = d.join("")
	} else {
		if (b.length > 1) {
			Ext.each(b, function(a) {
				if (Ext.isObject(a)) {
					Ext.apply(e, a)
				} else {
					c.push(a)
				}
			});
			d = c.join("")
		}
	}
	e.html = d;
	if (e.compiled) {
		e.compile()
	}
};
Ext.Template.prototype = {
	applyTemplate : function(a) {
		var b = this;
		return b.compiled ? b.compiled(a) : b.html.replace(b.re,
				function(c, d) {
					return a[d] !== undefined ? a[d] : ""
				})
	},
	set : function(a, c) {
		var b = this;
		b.html = a;
		b.compiled = null;
		return c ? b.compile() : b
	},
	re : /\{([\w-]+)\}/g,
	compile : function() {
		var me = this, sep = Ext.isGecko ? "+" : ",";
		function fn(m, name) {
			name = "values['" + name + "']";
			return "'" + sep + "(" + name + " == undefined ? '' : " + name
					+ ")" + sep + "'"
		}
		eval("this.compiled = function(values){ return "
				+ (Ext.isGecko ? "'" : "['")
				+ me.html.replace(/\\/g, "\\\\").replace(/(\r\n|\n)/g, "\\n")
						.replace(/'/g, "\\'").replace(this.re, fn)
				+ (Ext.isGecko ? "';};" : "'].join('');};"));
		return me
	},
	insertFirst : function(b, a, c) {
		return this.doInsert("afterBegin", b, a, c)
	},
	insertBefore : function(b, a, c) {
		return this.doInsert("beforeBegin", b, a, c)
	},
	insertAfter : function(b, a, c) {
		return this.doInsert("afterEnd", b, a, c)
	},
	append : function(b, a, c) {
		return this.doInsert("beforeEnd", b, a, c)
	},
	doInsert : function(c, e, b, a) {
		e = Ext.getDom(e);
		var d = Ext.DomHelper.insertHtml(c, e, this.applyTemplate(b));
		return a ? Ext.get(d, true) : d
	},
	overwrite : function(b, a, c) {
		b = Ext.getDom(b);
		b.innerHTML = this.applyTemplate(a);
		return c ? Ext.get(b.firstChild, true) : b.firstChild
	}
};
Ext.Template.prototype.apply = Ext.Template.prototype.applyTemplate;
Ext.Template.from = function(b, a) {
	b = Ext.getDom(b);
	return new Ext.Template(b.value || b.innerHTML, a || "")
};
Ext
		.apply(
				Ext.Template.prototype,
				{
					applyTemplate : function(b) {
						var g = this, a = g.disableFormats !== true, e = Ext.util.Format, c = g;
						if (g.compiled) {
							return g.compiled(b)
						}
						function d(j, l, p, k) {
							if (p && a) {
								if (p.substr(0, 5) == "this.") {
									return c.call(p.substr(5), b[l], b)
								} else {
									if (k) {
										var o = /^\s*['"](.*)["']\s*$/;
										k = k.split(",");
										for ( var n = 0, h = k.length; n < h; n++) {
											k[n] = k[n].replace(o, "$1")
										}
										k = [ b[l] ].concat(k)
									} else {
										k = [ b[l] ]
									}
									return e[p].apply(e, k)
								}
							} else {
								return b[l] !== undefined ? b[l] : ""
							}
						}
						return g.html.replace(g.re, d)
					},
					disableFormats : false,
					re : /\{([\w-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g,
					compile : function() {
						var me = this, fm = Ext.util.Format, useF = me.disableFormats !== true, sep = Ext.isGecko ? "+"
								: ",", body;
						function fn(m, name, format, args) {
							if (format && useF) {
								args = args ? "," + args : "";
								if (format.substr(0, 5) != "this.") {
									format = "fm." + format + "("
								} else {
									format = 'this.call("' + format.substr(5) + '", ';
									args = ", values"
								}
							} else {
								args = "";
								format = "(values['" + name
										+ "'] == undefined ? '' : "
							}
							return "'" + sep + format + "values['" + name
									+ "']" + args + ")" + sep + "'"
						}
						if (Ext.isGecko) {
							body = "this.compiled = function(values){ return '"
									+ me.html.replace(/\\/g, "\\\\").replace(
											/(\r\n|\n)/g, "\\n").replace(/'/g,
											"\\'").replace(this.re, fn)
									+ "';};"
						} else {
							body = [ "this.compiled = function(values){ return ['" ];
							body.push(me.html.replace(/\\/g, "\\\\").replace(
									/(\r\n|\n)/g, "\\n").replace(/'/g, "\\'")
									.replace(this.re, fn));
							body.push("'].join('');};");
							body = body.join("")
						}
						eval(body);
						return me
					},
					call : function(c, b, a) {
						return this[c](b, a)
					}
				});
Ext.Template.prototype.apply = Ext.Template.prototype.applyTemplate;
Ext.DomQuery = function() {
	var cache = {}, simpleCache = {}, valueCache = {}, nonSpace = /\S/, trimRe = /^\s+|\s+$/g, tplRe = /\{(\d+)\}/g, modeRe = /^(\s?[\/>+~]\s?|\s|$)/, tagTokenRe = /^(#)?([\w-\*]+)/, nthRe = /(\d*)n\+?(\d*)/, nthRe2 = /\D/, isIE = window.ActiveXObject ? true
			: false, isOpera = Ext.isOpera, key = 30803;
	eval("var batch = 30803;");
	function child(p, index) {
		var i = 0, n = p.firstChild;
		while (n) {
			if (n.nodeType == 1) {
				if (++i == index) {
					return n
				}
			}
			n = n.nextSibling
		}
		return null
	}
	function next(n) {
		while ((n = n.nextSibling) && n.nodeType != 1) {
		}
		return n
	}
	function prev(n) {
		while ((n = n.previousSibling) && n.nodeType != 1) {
		}
		return n
	}
	function children(d) {
		var n = d.firstChild, ni = -1, nx;
		while (n) {
			nx = n.nextSibling;
			if (n.nodeType == 3 && !nonSpace.test(n.nodeValue)) {
				d.removeChild(n)
			} else {
				n.nodeIndex = ++ni
			}
			n = nx
		}
		return this
	}
	function byClassName(c, a, v) {
		if (!v) {
			return c
		}
		var r = [], ri = -1, cn;
		for ( var i = 0, ci; ci = c[i]; i++) {
			if ((" " + ci.className + " ").indexOf(v) != -1) {
				r[++ri] = ci
			}
		}
		return r
	}
	function attrValue(n, attr) {
		if (!n.tagName && typeof n.length != "undefined") {
			n = n[0]
		}
		if (!n) {
			return null
		}
		if (attr == "for") {
			return n.htmlFor
		}
		if (attr == "class" || attr == "className") {
			return n.className
		}
		return n.getAttribute(attr) || n[attr]
	}
	function getNodes(ns, mode, tagName) {
		var result = [], ri = -1, cs;
		if (!ns) {
			return result
		}
		tagName = tagName || "*";
		if (typeof ns.getElementsByTagName != "undefined") {
			ns = [ ns ]
		}
		if (!mode) {
			for ( var i = 0, ni; ni = ns[i]; i++) {
				cs = ni.getElementsByTagName(tagName);
				for ( var j = 0, ci; ci = cs[j]; j++) {
					result[++ri] = ci
				}
			}
		} else {
			if (mode == "/" || mode == ">") {
				var utag = tagName.toUpperCase();
				for ( var i = 0, ni, cn; ni = ns[i]; i++) {
					cn = isOpera ? ni.childNodes
							: (ni.children || ni.childNodes);
					for ( var j = 0, cj; cj = cn[j]; j++) {
						if (cj.nodeName == utag || cj.nodeName == tagName
								|| tagName == "*") {
							result[++ri] = cj
						}
					}
				}
			} else {
				if (mode == "+") {
					var utag = tagName.toUpperCase();
					for ( var i = 0, n; n = ns[i]; i++) {
						while ((n = n.nextSibling) && n.nodeType != 1) {
						}
						if (n
								&& (n.nodeName == utag || n.nodeName == tagName || tagName == "*")) {
							result[++ri] = n
						}
					}
				} else {
					if (mode == "~") {
						var utag = tagName.toUpperCase();
						for ( var i = 0, n; n = ns[i]; i++) {
							while ((n = n.nextSibling)) {
								if (n.nodeName == utag || n.nodeName == tagName
										|| tagName == "*") {
									result[++ri] = n
								}
							}
						}
					}
				}
			}
		}
		return result
	}
	function concat(a, b) {
		if (b.slice) {
			return a.concat(b)
		}
		for ( var i = 0, l = b.length; i < l; i++) {
			a[a.length] = b[i]
		}
		return a
	}
	function byTag(cs, tagName) {
		if (cs.tagName || cs == document) {
			cs = [ cs ]
		}
		if (!tagName) {
			return cs
		}
		var r = [], ri = -1;
		tagName = tagName.toLowerCase();
		for ( var i = 0, ci; ci = cs[i]; i++) {
			if (ci.nodeType == 1 && ci.tagName.toLowerCase() == tagName) {
				r[++ri] = ci
			}
		}
		return r
	}
	function byId(cs, attr, id) {
		if (cs.tagName || cs == document) {
			cs = [ cs ]
		}
		if (!id) {
			return cs
		}
		var r = [], ri = -1;
		for ( var i = 0, ci; ci = cs[i]; i++) {
			if (ci && ci.id == id) {
				r[++ri] = ci;
				return r
			}
		}
		return r
	}
	function byAttribute(cs, attr, value, op, custom) {
		var r = [], ri = -1, st = custom == "{", f = Ext.DomQuery.operators[op];
		for ( var i = 0, ci; ci = cs[i]; i++) {
			if (ci.nodeType != 1) {
				continue
			}
			var a;
			if (st) {
				a = Ext.DomQuery.getStyle(ci, attr)
			} else {
				if (attr == "class" || attr == "className") {
					a = ci.className
				} else {
					if (attr == "for") {
						a = ci.htmlFor
					} else {
						if (attr == "href") {
							a = ci.getAttribute("href", 2)
						} else {
							a = ci.getAttribute(attr)
						}
					}
				}
			}
			if ((f && f(a, value)) || (!f && a)) {
				r[++ri] = ci
			}
		}
		return r
	}
	function byPseudo(cs, name, value) {
		return Ext.DomQuery.pseudos[name](cs, value)
	}
	function nodupIEXml(cs) {
		var d = ++key, r;
		cs[0].setAttribute("_nodup", d);
		r = [ cs[0] ];
		for ( var i = 1, len = cs.length; i < len; i++) {
			var c = cs[i];
			if (!c.getAttribute("_nodup") != d) {
				c.setAttribute("_nodup", d);
				r[r.length] = c
			}
		}
		for ( var i = 0, len = cs.length; i < len; i++) {
			cs[i].removeAttribute("_nodup")
		}
		return r
	}
	function nodup(cs) {
		if (!cs) {
			return []
		}
		var len = cs.length, c, i, r = cs, cj, ri = -1;
		if (!len || typeof cs.nodeType != "undefined" || len == 1) {
			return cs
		}
		if (isIE && typeof cs[0].selectSingleNode != "undefined") {
			return nodupIEXml(cs)
		}
		var d = ++key;
		cs[0]._nodup = d;
		for (i = 1; c = cs[i]; i++) {
			if (c._nodup != d) {
				c._nodup = d
			} else {
				r = [];
				for ( var j = 0; j < i; j++) {
					r[++ri] = cs[j]
				}
				for (j = i + 1; cj = cs[j]; j++) {
					if (cj._nodup != d) {
						cj._nodup = d;
						r[++ri] = cj
					}
				}
				return r
			}
		}
		return r
	}
	function quickDiffIEXml(c1, c2) {
		var d = ++key, r = [];
		for ( var i = 0, len = c1.length; i < len; i++) {
			c1[i].setAttribute("_qdiff", d)
		}
		for ( var i = 0, len = c2.length; i < len; i++) {
			if (c2[i].getAttribute("_qdiff") != d) {
				r[r.length] = c2[i]
			}
		}
		for ( var i = 0, len = c1.length; i < len; i++) {
			c1[i].removeAttribute("_qdiff")
		}
		return r
	}
	function quickDiff(c1, c2) {
		var len1 = c1.length, d = ++key, r = [];
		if (!len1) {
			return c2
		}
		if (isIE && c1[0].selectSingleNode) {
			return quickDiffIEXml(c1, c2)
		}
		for ( var i = 0; i < len1; i++) {
			c1[i]._qdiff = d
		}
		for ( var i = 0, len = c2.length; i < len; i++) {
			if (c2[i]._qdiff != d) {
				r[r.length] = c2[i]
			}
		}
		return r
	}
	function quickId(ns, mode, root, id) {
		if (ns == root) {
			var d = root.ownerDocument || root;
			return d.getElementById(id)
		}
		ns = getNodes(ns, mode, "*");
		return byId(ns, null, id)
	}
	return {
		getStyle : function(el, name) {
			return Ext.fly(el).getStyle(name)
		},
		compile : function(path, type) {
			type = type || "select";
			var fn = [ "var f = function(root){\n var mode; ++batch; var n = root || document;\n" ], q = path, mode, lq, tk = Ext.DomQuery.matchers, tklen = tk.length, mm, lmode = q
					.match(modeRe);
			if (lmode && lmode[1]) {
				fn[fn.length] = 'mode="' + lmode[1].replace(trimRe, "") + '";';
				q = q.replace(lmode[1], "")
			}
			while (path.substr(0, 1) == "/") {
				path = path.substr(1)
			}
			while (q && lq != q) {
				lq = q;
				var tm = q.match(tagTokenRe);
				if (type == "select") {
					if (tm) {
						if (tm[1] == "#") {
							fn[fn.length] = 'n = quickId(n, mode, root, "' + tm[2] + '");'
						} else {
							fn[fn.length] = 'n = getNodes(n, mode, "' + tm[2] + '");'
						}
						q = q.replace(tm[0], "")
					} else {
						if (q.substr(0, 1) != "@") {
							fn[fn.length] = 'n = getNodes(n, mode, "*");'
						}
					}
				} else {
					if (tm) {
						if (tm[1] == "#") {
							fn[fn.length] = 'n = byId(n, null, "' + tm[2] + '");'
						} else {
							fn[fn.length] = 'n = byTag(n, "' + tm[2] + '");'
						}
						q = q.replace(tm[0], "")
					}
				}
				while (!(mm = q.match(modeRe))) {
					var matched = false;
					for ( var j = 0; j < tklen; j++) {
						var t = tk[j];
						var m = q.match(t.re);
						if (m) {
							fn[fn.length] = t.select.replace(tplRe, function(x,
									i) {
								return m[i]
							});
							q = q.replace(m[0], "");
							matched = true;
							break
						}
					}
					if (!matched) {
						throw 'Error parsing selector, parsing failed at "' + q + '"'
					}
				}
				if (mm[1]) {
					fn[fn.length] = 'mode="' + mm[1].replace(trimRe, "") + '";';
					q = q.replace(mm[1], "")
				}
			}
			fn[fn.length] = "return nodup(n);\n}";
			eval(fn.join(""));
			return f
		},
		select : function(path, root, type) {
			if (!root || root == document) {
				root = document
			}
			if (typeof root == "string") {
				root = document.getElementById(root)
			}
			var paths = path.split(","), results = [];
			for ( var i = 0, len = paths.length; i < len; i++) {
				var p = paths[i].replace(trimRe, "");
				if (!cache[p]) {
					cache[p] = Ext.DomQuery.compile(p);
					if (!cache[p]) {
						throw p + " is not a valid selector"
					}
				}
				var result = cache[p](root);
				if (result && result != document) {
					results = results.concat(result)
				}
			}
			if (paths.length > 1) {
				return nodup(results)
			}
			return results
		},
		selectNode : function(path, root) {
			return Ext.DomQuery.select(path, root)[0]
		},
		selectValue : function(path, root, defaultValue) {
			path = path.replace(trimRe, "");
			if (!valueCache[path]) {
				valueCache[path] = Ext.DomQuery.compile(path, "select")
			}
			var n = valueCache[path](root), v;
			n = n[0] ? n[0] : n;
			v = "";
			if(n.childNodes) {
				for(var i = 0; i < n.childNodes.length; i++) {
					if(n.childNodes[i].nodeType==3 && n.childNodes[i].nodeValue) {
						v += n.childNodes[i].nodeValue;
					}
				}
			}
			return ((v === null || v === undefined || v === "") ? defaultValue
					: v)
		},
		selectNumber : function(path, root, defaultValue) {
			var v = Ext.DomQuery.selectValue(path, root, defaultValue || 0);
			return parseFloat(v)
		},
		is : function(el, ss) {
			if (typeof el == "string") {
				el = document.getElementById(el)
			}
			var isArray = Ext.isArray(el), result = Ext.DomQuery.filter(
					isArray ? el : [ el ], ss);
			return isArray ? (result.length == el.length) : (result.length > 0)
		},
		filter : function(els, ss, nonMatches) {
			ss = ss.replace(trimRe, "");
			if (!simpleCache[ss]) {
				simpleCache[ss] = Ext.DomQuery.compile(ss, "simple")
			}
			var result = simpleCache[ss](els);
			return nonMatches ? quickDiff(result, els) : result
		},
		matchers : [
				{
					re : /^\.([\w-]+)/,
					select : 'n = byClassName(n, null, " {1} ");'
				},
				{
					re : /^\:([\w-]+)(?:\(((?:[^\s>\/]*|.*?))\))?/,
					select : 'n = byPseudo(n, "{1}", "{2}");'
				},
				{
					re : /^(?:([\[\{])(?:@)?([\w-]+)\s?(?:(=|.=)\s?['"]?(.*?)["']?)?[\]\}])/,
					select : 'n = byAttribute(n, "{2}", "{4}", "{3}", "{1}");'
				},
				{
					re : /^#([\w-]+)/,
					select : 'n = byId(n, null, "{1}");'
				},
				{
					re : /^@([\w-]+)/,
					select : 'return {firstChild:{nodeValue:attrValue(n, "{1}")}};'
				} ],
		operators : {
			"=" : function(a, v) {
				return a == v
			},
			"!=" : function(a, v) {
				return a != v
			},
			"^=" : function(a, v) {
				return a && a.substr(0, v.length) == v
			},
			"$=" : function(a, v) {
				return a && a.substr(a.length - v.length) == v
			},
			"*=" : function(a, v) {
				return a && a.indexOf(v) !== -1
			},
			"%=" : function(a, v) {
				return (a % v) == 0
			},
			"|=" : function(a, v) {
				return a && (a == v || a.substr(0, v.length + 1) == v + "-")
			},
			"~=" : function(a, v) {
				return a && (" " + a + " ").indexOf(" " + v + " ") != -1
			}
		},
		pseudos : {
			"first-child" : function(c) {
				var r = [], ri = -1, n;
				for ( var i = 0, ci; ci = n = c[i]; i++) {
					while ((n = n.previousSibling) && n.nodeType != 1) {
					}
					if (!n) {
						r[++ri] = ci
					}
				}
				return r
			},
			"last-child" : function(c) {
				var r = [], ri = -1, n;
				for ( var i = 0, ci; ci = n = c[i]; i++) {
					while ((n = n.nextSibling) && n.nodeType != 1) {
					}
					if (!n) {
						r[++ri] = ci
					}
				}
				return r
			},
			"nth-child" : function(c, a) {
				var r = [], ri = -1, m = nthRe.exec(a == "even" && "2n"
						|| a == "odd" && "2n+1" || !nthRe2.test(a) && "n+" + a
						|| a), f = (m[1] || 1) - 0, l = m[2] - 0;
				for ( var i = 0, n; n = c[i]; i++) {
					var pn = n.parentNode;
					if (batch != pn._batch) {
						var j = 0;
						for ( var cn = pn.firstChild; cn; cn = cn.nextSibling) {
							if (cn.nodeType == 1) {
								cn.nodeIndex = ++j
							}
						}
						pn._batch = batch
					}
					if (f == 1) {
						if (l == 0 || n.nodeIndex == l) {
							r[++ri] = n
						}
					} else {
						if ((n.nodeIndex + l) % f == 0) {
							r[++ri] = n
						}
					}
				}
				return r
			},
			"only-child" : function(c) {
				var r = [], ri = -1;
				for ( var i = 0, ci; ci = c[i]; i++) {
					if (!prev(ci) && !next(ci)) {
						r[++ri] = ci
					}
				}
				return r
			},
			empty : function(c) {
				var r = [], ri = -1;
				for ( var i = 0, ci; ci = c[i]; i++) {
					var cns = ci.childNodes, j = 0, cn, empty = true;
					while (cn = cns[j]) {
						++j;
						if (cn.nodeType == 1 || cn.nodeType == 3) {
							empty = false;
							break
						}
					}
					if (empty) {
						r[++ri] = ci
					}
				}
				return r
			},
			contains : function(c, v) {
				var r = [], ri = -1;
				for ( var i = 0, ci; ci = c[i]; i++) {
					if ((ci.textContent || ci.innerText || "").indexOf(v) != -1) {
						r[++ri] = ci
					}
				}
				return r
			},
			nodeValue : function(c, v) {
				var r = [], ri = -1;
				for ( var i = 0, ci; ci = c[i]; i++) {
					if (ci.firstChild && ci.firstChild.nodeValue == v) {
						r[++ri] = ci
					}
				}
				return r
			},
			checked : function(c) {
				var r = [], ri = -1;
				for ( var i = 0, ci; ci = c[i]; i++) {
					if (ci.checked == true) {
						r[++ri] = ci
					}
				}
				return r
			},
			not : function(c, ss) {
				return Ext.DomQuery.filter(c, ss, true)
			},
			any : function(c, selectors) {
				var ss = selectors.split("|"), r = [], ri = -1, s;
				for ( var i = 0, ci; ci = c[i]; i++) {
					for ( var j = 0; s = ss[j]; j++) {
						if (Ext.DomQuery.is(ci, s)) {
							r[++ri] = ci;
							break
						}
					}
				}
				return r
			},
			odd : function(c) {
				return this["nth-child"](c, "odd")
			},
			even : function(c) {
				return this["nth-child"](c, "even")
			},
			nth : function(c, a) {
				return c[a - 1] || []
			},
			first : function(c) {
				return c[0] || []
			},
			last : function(c) {
				return c[c.length - 1] || []
			},
			has : function(c, ss) {
				var s = Ext.DomQuery.select, r = [], ri = -1;
				for ( var i = 0, ci; ci = c[i]; i++) {
					if (s(ss, ci).length > 0) {
						r[++ri] = ci
					}
				}
				return r
			},
			next : function(c, ss) {
				var is = Ext.DomQuery.is, r = [], ri = -1;
				for ( var i = 0, ci; ci = c[i]; i++) {
					var n = next(ci);
					if (n && is(n, ss)) {
						r[++ri] = ci
					}
				}
				return r
			},
			prev : function(c, ss) {
				var is = Ext.DomQuery.is, r = [], ri = -1;
				for ( var i = 0, ci; ci = c[i]; i++) {
					var n = prev(ci);
					if (n && is(n, ss)) {
						r[++ri] = ci
					}
				}
				return r
			}
		}
	}
}();
Ext.query = Ext.DomQuery.select;
( function() {
	var i = Ext.util, l = Ext.toArray, k = Ext.each, a = Ext.isObject, h = true, j = false;
	i.Observable = function() {
		var m = this, n = m.events;
		if (m.listeners) {
			m.on(m.listeners);
			delete m.listeners
		}
		m.events = n || {}
	};
	i.Observable.prototype = function() {
		var n = /^(?:scope|delay|buffer|single)$/, m = function(o) {
			return o.toLowerCase()
		};
		return {
			fireEvent : function() {
				var o = l(arguments), r = m(o[0]), s = this, p = h, u = s.events[r], t, v;
				if (s.eventsSuspended === h) {
					if (t = s.suspendedEventsQueue) {
						t.push(o)
					}
				} else {
					if (a(u) && u.bubble) {
						if (u.fire.apply(u, o.slice(1)) === j) {
							return j
						}
						v = s.getBubbleTarget && s.getBubbleTarget();
						if (v && v.enableBubble) {
							v.enableBubble(r);
							return v.fireEvent.apply(v, o)
						}
					} else {
						if (a(u)) {
							o.shift();
							p = u.fire.apply(u, o)
						}
					}
				}
				return p
			},
			addListener : function(r, u, w, q) {
				var t = this, s, x, v, p;
				if (a(r)) {
					q = r;
					for (s in q) {
						x = q[s];
						if (!n.test(s)) {
							t.addListener(s, x.fn || x, x.scope || q.scope,
									x.fn ? x : q)
						}
					}
				} else {
					r = m(r);
					p = t.events[r] || h;
					if (typeof p == "boolean") {
						t.events[r] = p = new i.Event(t, r)
					}
					p.addListener(u, w, a(q) ? q : {})
				}
			},
			removeListener : function(o, q, p) {
				var r = this.events[m(o)];
				if (a(r)) {
					r.removeListener(q, p)
				}
			},
			purgeListeners : function() {
				var q = this.events, o, p;
				for (p in q) {
					o = q[p];
					if (a(o)) {
						o.clearListeners()
					}
				}
			},
			addEvents : function(q) {
				var p = this;
				p.events = p.events || {};
				if (typeof q == "string") {
					k(arguments, function(o) {
						p.events[o] = p.events[o] || h
					})
				} else {
					Ext.applyIf(p.events, q)
				}
			},
			hasListener : function(o) {
				var p = this.events[o];
				return a(p) && p.listeners.length > 0
			},
			suspendEvents : function(o) {
				this.eventsSuspended = h;
				if (o) {
					this.suspendedEventsQueue = []
				}
			},
			resumeEvents : function() {
				var o = this;
				o.eventsSuspended = !delete o.suspendedEventQueue;
				k(o.suspendedEventsQueue, function(p) {
					o.fireEvent.apply(o, p)
				})
			}
		}
	}();
	var e = i.Observable.prototype;
	e.on = e.addListener;
	e.un = e.removeListener;
	i.Observable.releaseCapture = function(m) {
		m.fireEvent = e.fireEvent
	};
	function g(n, p, m) {
		return function() {
			if (p.target == arguments[0]) {
				n.apply(m, l(arguments))
			}
		}
	}
	function c(p, q, n) {
		var m = new i.DelayedTask();
		return function() {
			m.delay(q.buffer, p, n, l(arguments))
		}
	}
	function d(o, p, n, m) {
		return function() {
			p.removeListener(n, m);
			return o.apply(m, arguments)
		}
	}
	function b(n, p, m) {
		return function() {
			var o = l(arguments);
			( function() {
				n.apply(m, o)
			}).defer(p.delay || 10)
		}
	}
	i.Event = function(n, m) {
		this.name = m;
		this.obj = n;
		this.listeners = []
	};
	i.Event.prototype = {
		addListener : function(p, o, n) {
			var q = this, m;
			o = o || q.obj;
			if (!q.isListening(p, o)) {
				m = q.createListener(p, o, n);
				if (q.firing) {
					q.listeners = q.listeners.slice(0)
				}
				q.listeners.push(m)
			}
		},
		createListener : function(q, p, r) {
			r = r || {}, p = p || this.obj;
			var m = {
				fn : q,
				scope : p,
				options : r
			}, n = q;
			if (r.target) {
				n = g(n, r, p)
			}
			if (r.delay) {
				n = b(n, r, p)
			}
			if (r.single) {
				n = d(n, this, q, p)
			}
			if (r.buffer) {
				n = c(n, r, p)
			}
			m.fireFn = n;
			return m
		},
		findListener : function(p, o) {
			var n, m = -1;
			k(this.listeners, function(q, r) {
				n = q.scope;
				if (q.fn == p && (n == o || n == this.obj)) {
					m = r;
					return j
				}
			}, this);
			return m
		},
		isListening : function(n, m) {
			return this.findListener(n, m) != -1
		},
		removeListener : function(p, o) {
			var n, q = this, m = j;
			if ((n = q.findListener(p, o)) != -1) {
				if (q.firing) {
					q.listeners = q.listeners.slice(0)
				}
				q.listeners.splice(n, 1);
				m = h
			}
			return m
		},
		clearListeners : function() {
			this.listeners = []
		},
		fire : function() {
			var o = this, n = l(arguments), m = h;
			k(o.listeners, function(p) {
				o.firing = h;
				if (p.fireFn.apply(p.scope || o.obj || window, n) === j) {
					return m = o.firing = j
				}
			});
			o.firing = j;
			return m
		}
	}
})();
Ext
		.apply(
				Ext.util.Observable.prototype,
				function() {
					function a(j) {
						var i = (this.methodEvents = this.methodEvents || {})[j], d, c, g, h = this;
						if (!i) {
							this.methodEvents[j] = i = {};
							i.originalFn = this[j];
							i.methodName = j;
							i.before = [];
							i.after = [];
							var b = function(l, k, e) {
								if (!Ext.isEmpty(c = l.apply(k || h, e))) {
									if (Ext.isObject(c)) {
										d = !Ext.isEmpty(c.returnValue) ? c.returnValue
												: c;
										g = !!c.cancel
									} else {
										if (c === false) {
											g = true
										} else {
											d = c
										}
									}
								}
							};
							this[j] = function() {
								var e = Ext.toArray(arguments);
								d = c = undefined;
								g = false;
								Ext.each(i.before, function(k) {
									b(k.fn, k.scope, e);
									if (g) {
										return d
									}
								});
								if (!Ext.isEmpty(c = i.originalFn.apply(h, e))) {
									d = c
								}
								Ext.each(i.after, function(k) {
									b(k.fn, k.scope, e);
									if (g) {
										return d
									}
								});
								return d
							}
						}
						return i
					}
					return {
						beforeMethod : function(d, c, b) {
							a.call(this, d).before.push( {
								fn : c,
								scope : b
							})
						},
						afterMethod : function(d, c, b) {
							a.call(this, d).after.push( {
								fn : c,
								scope : b
							})
						},
						removeMethodListener : function(h, c, b) {
							var g = a.call(this, h), d = false;
							Ext.each(g.before, function(j, k, e) {
								if (j.fn == c && j.scope == b) {
									e.splice(k, 1);
									d = true;
									return false
								}
							});
							if (!d) {
								Ext.each(g.after, function(j, k, e) {
									if (j.fn == c && j.scope == b) {
										e.splice(k, 1);
										return false
									}
								})
							}
						},
						relayEvents : function(e, b) {
							var d = this;
							function c(g) {
								return function() {
									return d.fireEvent.apply(d, [ g ]
											.concat(Ext.toArray(arguments)))
								}
							}
							Ext.each(b, function(g) {
								d.events[g] = d.events[g] || true;
								e.on(g, c(g), d)
							})
						},
						enableBubble : function(b) {
							var c = this;
							b = Ext.isArray(b) ? b : Ext.toArray(arguments);
							Ext.each(b, function(d) {
								d = d.toLowerCase();
								var e = c.events[d] || true;
								if (typeof e == "boolean") {
									e = new Ext.util.Event(c, d);
									c.events[d] = e
								}
								e.bubble = true
							})
						}
					}
				}());
Ext.util.Observable.capture = function(c, b, a) {
	c.fireEvent = c.fireEvent.createInterceptor(b, a)
};
Ext.util.Observable.observeClass = function(a) {
	Ext.apply(a, new Ext.util.Observable());
	a.prototype.fireEvent = function() {
		return (a.fireEvent.apply(a, arguments) !== false)
				&& (Ext.util.Observable.prototype.fireEvent.apply(this,
						arguments) !== false)
	}
};
Ext.EventManager = function() {
	var t, m, j = false, l = Ext.lib.Event, n = Ext.lib.Dom, b = document, u = window, g = "ie-deferred-loader", o = "DOMContentLoaded", e = {}, h = /^(?:scope|delay|buffer|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate)$/;
	function k(A, w, z, y, x) {
		var C = Ext.id(A), B = e[C] = e[C] || {};
		(B[w] = B[w] || []).push( [ z, y, x ]);
		l.on(A, w, y);
		if (w == "mousewheel" && A.addEventListener) {
			var v = [ "DOMMouseScroll", y, false ];
			A.addEventListener.apply(A, v);
			l.on(window, "unload", function() {
				A.removeEventListener.apply(A, v)
			})
		}
		if (w == "mousedown" && A == document) {
			Ext.EventManager.stoppedMouseDownEvent.addListener(y)
		}
	}
	function c() {
		if (!j) {
			Ext.isReady = j = true;
			if (m) {
				clearInterval(m)
			}
			if (Ext.isGecko || Ext.isOpera) {
				b.removeEventListener(o, c, false)
			}
			if (Ext.isIE) {
				var v = b.getElementById(g);
				if (v) {
					v.onreadystatechange = null;
					v.parentNode.removeChild(v)
				}
			}
			if (t) {
				t.fire();
				t.clearListeners()
			}
		}
	}
	function a() {
		var v = "complete";
		t = new Ext.util.Event();
		if (Ext.isGecko || Ext.isOpera) {
			b.addEventListener(o, c, false)
		} else {
			if (Ext.isIE) {
				b.write("<script id=" + g
						+ ' defer="defer" src="//:"><\/script>');
				b.getElementById(g).onreadystatechange = function() {
					if (this.readyState == v) {
						c()
					}
				}
			} else {
				if (Ext.isWebKit) {
					m = setInterval( function() {
						if (b.readyState == v) {
							c()
						}
					}, 10)
				}
			}
		}
		l.on(u, "load", c)
	}
	function r(v, w) {
		return function() {
			var x = Ext.toArray(arguments);
			if (w.target == Ext.EventObject.setEvent(x[0]).target) {
				v.apply(this, x)
			}
		}
	}
	function s(w, x) {
		var v = new Ext.util.DelayedTask(w);
		return function(y) {
			v.delay(x.buffer, w, null, [ new Ext.EventObjectImpl(y) ])
		}
	}
	function p(z, y, v, x, w) {
		return function(A) {
			Ext.EventManager.removeListener(y, v, x, w);
			z(A)
		}
	}
	function d(v, w) {
		return function(x) {
			x = new Ext.EventObjectImpl(x);
			setTimeout( function() {
				v(x)
			}, w.delay || 10)
		}
	}
	function i(x, w, v, B, A) {
		var C = !Ext.isObject(v) ? {} : v, z = Ext.getDom(x);
		B = B || C.fn;
		A = A || C.scope;
		if (!z) {
			throw 'Error listening for "' + w + '". Element "' + x
					+ "\" doesn't exist."
		}
		function y(E) {
			if (!Ext) {
				return
			}
			E = Ext.EventObject.setEvent(E);
			var D;
			if (C.delegate) {
				if (!(D = E.getTarget(C.delegate, z))) {
					return
				}
			} else {
				D = E.target
			}
			if (C.stopEvent) {
				E.stopEvent()
			}
			if (C.preventDefault) {
				E.preventDefault()
			}
			if (C.stopPropagation) {
				E.stopPropagation()
			}
			if (C.normalized) {
				E = E.browserEvent
			}
			B.call(A || z, E, D, C)
		}
		if (C.target) {
			y = r(y, C)
		}
		if (C.delay) {
			y = d(y, C)
		}
		if (C.single) {
			y = p(y, z, w, B, A)
		}
		if (C.buffer) {
			y = s(y, C)
		}
		k(z, w, B, y, A);
		return y
	}
	var q = {
		addListener : function(x, v, z, y, w) {
			if (Ext.isObject(v)) {
				var C = v, A, B;
				for (A in C) {
					B = C[A];
					if (!h.test(A)) {
						if (Ext.isFunction(B)) {
							i(x, A, C, B, C.scope)
						} else {
							i(x, A, B)
						}
					}
				}
			} else {
				i(x, v, w, z, y)
			}
		},
		removeListener : function(w, v, A, z) {
			var y = Ext.getDom(w), B = Ext.id(y), x;
			Ext.each((e[B] || {})[v], function(D, E, C) {
				if (Ext.isArray(D) && D[0] == A && (!z || D[2] == z)) {
					l.un(y, v, x = D[1]);
					C.splice(E, 1);
					return false
				}
			});
			if (v == "mousewheel" && y.addEventListener && x) {
				y.removeEventListener("DOMMouseScroll", x, false)
			}
			if (v == "mousedown" && y == b && x) {
				Ext.EventManager.stoppedMouseDownEvent.removeListener(x)
			}
		},
		removeAll : function(w) {
			var y = Ext.id(w = Ext.getDom(w)), x = e[y], v;
			for (v in x) {
				if (x.hasOwnProperty(v)) {
					Ext.each(x[v], function(z) {
						l.un(w, v, z.wrap)
					})
				}
			}
			e[y] = null
		},
		onDocumentReady : function(x, w, v) {
			if (j) {
				t.addListener(x, w, v);
				t.fire();
				t.clearListeners()
			} else {
				if (!t) {
					a()
				}
				v = v || {};
				v.delay = v.delay || 1;
				t.addListener(x, w, v)
			}
		},
		elHash : e
	};
	q.on = q.addListener;
	q.un = q.removeListener;
	q.stoppedMouseDownEvent = new Ext.util.Event();
	return q
}();
Ext.onReady = Ext.EventManager.onDocumentReady;
( function() {
	var a = function() {
		var c = document.body || document.getElementsByTagName("body")[0];
		if (!c) {
			return false
		}
		var b = [
				" ",
				Ext.isIE ? "ext-ie "
						+ (Ext.isIE6 ? "ext-ie6" : (Ext.isIE7 ? "ext-ie7"
								: "ext-ie8")) : Ext.isGecko ? "ext-gecko "
						+ (Ext.isGecko2 ? "ext-gecko2" : "ext-gecko3")
						: Ext.isOpera ? "ext-opera"
								: Ext.isWebKit ? "ext-webkit" : "" ];
		if (Ext.isSafari) {
			b.push("ext-safari "
					+ (Ext.isSafari2 ? "ext-safari2"
							: (Ext.isSafari3 ? "ext-safari3" : "ext-safari4")))
		} else {
			if (Ext.isChrome) {
				b.push("ext-chrome")
			}
		}
		if (Ext.isMac) {
			b.push("ext-mac")
		}
		if (Ext.isLinux) {
			b.push("ext-linux")
		}
		if (Ext.isStrict || Ext.isBorderBox) {
			var d = c.parentNode;
			if (d) {
				d.className += Ext.isStrict ? " ext-strict" : " ext-border-box"
			}
		}
		c.className += b.join(" ");
		return true
	};
	if (!a()) {
		Ext.onReady(a)
	}
})();
Ext.EventObject = function() {
	var b = Ext.lib.Event, a = {
		3 : 13,
		63234 : 37,
		63235 : 39,
		63232 : 38,
		63233 : 40,
		63276 : 33,
		63277 : 34,
		63272 : 46,
		63273 : 36,
		63275 : 35
	}, c = Ext.isIE ? {
		1 : 0,
		4 : 1,
		2 : 2
	} : (Ext.isWebKit ? {
		1 : 0,
		2 : 1,
		3 : 2
	} : {
		0 : 0,
		1 : 1,
		2 : 2
	});
	Ext.EventObjectImpl = function(d) {
		if (d) {
			this.setEvent(d.browserEvent || d)
		}
	};
	Ext.EventObjectImpl.prototype = {
		setEvent : function(g) {
			var d = this;
			if (g == d || (g && g.browserEvent)) {
				return g
			}
			d.browserEvent = g;
			if (g) {
				d.button = g.button ? c[g.button]
						: (g.which ? g.which - 1 : -1);
				if (g.type == "click" && d.button == -1) {
					d.button = 0
				}
				d.type = g.type;
				d.shiftKey = g.shiftKey;
				d.ctrlKey = g.ctrlKey || g.metaKey || false;
				d.altKey = g.altKey;
				d.keyCode = g.keyCode;
				d.charCode = g.charCode;
				d.target = b.getTarget(g);
				d.xy = b.getXY(g)
			} else {
				d.button = -1;
				d.shiftKey = false;
				d.ctrlKey = false;
				d.altKey = false;
				d.keyCode = 0;
				d.charCode = 0;
				d.target = null;
				d.xy = [ 0, 0 ]
			}
			return d
		},
		stopEvent : function() {
			var d = this;
			if (d.browserEvent) {
				if (d.browserEvent.type == "mousedown") {
					Ext.EventManager.stoppedMouseDownEvent.fire(d)
				}
				b.stopEvent(d.browserEvent)
			}
		},
		preventDefault : function() {
			if (this.browserEvent) {
				b.preventDefault(this.browserEvent)
			}
		},
		stopPropagation : function() {
			var d = this;
			if (d.browserEvent) {
				if (d.browserEvent.type == "mousedown") {
					Ext.EventManager.stoppedMouseDownEvent.fire(d)
				}
				b.stopPropagation(d.browserEvent)
			}
		},
		getCharCode : function() {
			return this.charCode || this.keyCode
		},
		getKey : function() {
			return this.normalizeKey(this.keyCode || this.charCode)
		},
		normalizeKey : function(d) {
			return Ext.isSafari ? (a[d] || d) : d
		},
		getPageX : function() {
			return this.xy[0]
		},
		getPageY : function() {
			return this.xy[1]
		},
		getXY : function() {
			return this.xy
		},
		getTarget : function(e, g, d) {
			return e ? Ext.fly(this.target).findParent(e, g, d) : (d ? Ext
					.get(this.target) : this.target)
		},
		getRelatedTarget : function() {
			return this.browserEvent ? b.getRelatedTarget(this.browserEvent)
					: null
		},
		getWheelDelta : function() {
			var d = this.browserEvent;
			var g = 0;
			if (d.wheelDelta) {
				g = d.wheelDelta / 120
			} else {
				if (d.detail) {
					g = -d.detail / 3
				}
			}
			return g
		},
		within : function(g, h, d) {
			if (g) {
				var e = this[h ? "getRelatedTarget" : "getTarget"]();
				return e
						&& ((d ? (e == Ext.getDom(g)) : false) || Ext.fly(g)
								.contains(e))
			}
			return false
		}
	};
	return new Ext.EventObjectImpl()
}();
Ext
		.apply(
				Ext.EventManager,
				function() {
					var c, j, e, b, a = Ext.lib.Dom, k = Ext.lib.Event, i = /^(?:scope|delay|buffer|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate)$/, h = 0, g = 0, d = Ext.isSafari ? Ext
							.num(navigator.userAgent.toLowerCase().match(
									/version\/(\d+\.\d)/)[1] || 2) >= 3.1
							: !((Ext.isGecko && !Ext.isWindows) || Ext.isOpera);
					return {
						doResizeEvent : function() {
							var m = a.getViewHeight(), l = a.getViewWidth();
							if (g != m || h != l) {
								c.fire(h = l, g = m)
							}
						},
						onWindowResize : function(n, m, l) {
							if (!c) {
								c = new Ext.util.Event();
								j = new Ext.util.DelayedTask(this.doResizeEvent);
								k.on(window, "resize", this.fireWindowResize,
										this)
							}
							c.addListener(n, m, l)
						},
						fireWindowResize : function() {
							if (c) {
								if ((Ext.isIE || Ext.isAir) && j) {
									j.delay(50)
								} else {
									c.fire(a.getViewWidth(), a.getViewHeight())
								}
							}
						},
						onTextResize : function(o, n, l) {
							if (!e) {
								e = new Ext.util.Event();
								var m = new Ext.Element(document
										.createElement("div"));
								m.dom.className = "x-text-resize";
								m.dom.innerHTML = "X";
								m.appendTo(document.body);
								b = m.dom.offsetHeight;
								setInterval( function() {
									if (m.dom.offsetHeight != b) {
										e.fire(b, b = m.dom.offsetHeight)
									}
								}, this.textResizeInterval)
							}
							e.addListener(o, n, l)
						},
						removeResizeListener : function(m, l) {
							if (c) {
								c.removeListener(m, l)
							}
						},
						fireResize : function() {
							if (c) {
								c.fire(a.getViewWidth(), a.getViewHeight())
							}
						},
						textResizeInterval : 50,
						ieDeferSrc : false,
						useKeydown : d
					}
				}());
Ext.EventManager.on = Ext.EventManager.addListener;
Ext.apply(Ext.EventObjectImpl.prototype, {
	BACKSPACE : 8,
	TAB : 9,
	NUM_CENTER : 12,
	ENTER : 13,
	RETURN : 13,
	SHIFT : 16,
	CTRL : 17,
	CONTROL : 17,
	ALT : 18,
	PAUSE : 19,
	CAPS_LOCK : 20,
	ESC : 27,
	SPACE : 32,
	PAGE_UP : 33,
	PAGEUP : 33,
	PAGE_DOWN : 34,
	PAGEDOWN : 34,
	END : 35,
	HOME : 36,
	LEFT : 37,
	UP : 38,
	RIGHT : 39,
	DOWN : 40,
	PRINT_SCREEN : 44,
	INSERT : 45,
	DELETE : 46,
	ZERO : 48,
	ONE : 49,
	TWO : 50,
	THREE : 51,
	FOUR : 52,
	FIVE : 53,
	SIX : 54,
	SEVEN : 55,
	EIGHT : 56,
	NINE : 57,
	A : 65,
	B : 66,
	C : 67,
	D : 68,
	E : 69,
	F : 70,
	G : 71,
	H : 72,
	I : 73,
	J : 74,
	K : 75,
	L : 76,
	M : 77,
	N : 78,
	O : 79,
	P : 80,
	Q : 81,
	R : 82,
	S : 83,
	T : 84,
	U : 85,
	V : 86,
	W : 87,
	X : 88,
	Y : 89,
	Z : 90,
	CONTEXT_MENU : 93,
	NUM_ZERO : 96,
	NUM_ONE : 97,
	NUM_TWO : 98,
	NUM_THREE : 99,
	NUM_FOUR : 100,
	NUM_FIVE : 101,
	NUM_SIX : 102,
	NUM_SEVEN : 103,
	NUM_EIGHT : 104,
	NUM_NINE : 105,
	NUM_MULTIPLY : 106,
	NUM_PLUS : 107,
	NUM_MINUS : 109,
	NUM_PERIOD : 110,
	NUM_DIVISION : 111,
	F1 : 112,
	F2 : 113,
	F3 : 114,
	F4 : 115,
	F5 : 116,
	F6 : 117,
	F7 : 118,
	F8 : 119,
	F9 : 120,
	F10 : 121,
	F11 : 122,
	F12 : 123,
	isNavKeyPress : function() {
		var b = this, a = this.normalizeKey(b.keyCode);
		return (a >= 33 && a <= 40) || a == b.RETURN || a == b.TAB
				|| a == b.ESC
	},
	isSpecialKey : function() {
		var a = this.normalizeKey(this.keyCode);
		return (this.type == "keypress" && this.ctrlKey)
				|| this.isNavKeyPress() || (a == this.BACKSPACE)
				|| (a >= 16 && a <= 20) || (a >= 44 && a <= 45)
	},
	getPoint : function() {
		return new Ext.lib.Point(this.xy[0], this.xy[1])
	},
	hasModifier : function() {
		return ((this.ctrlKey || this.altKey) || this.shiftKey)
	}
});
( function() {
	var i = document;
	Ext.Element = function(n, o) {
		var p = typeof n == "string" ? i.getElementById(n) : n, q;
		if (!p) {
			return null
		}
		q = p.id;
		if (!o && q && Ext.Element.cache[q]) {
			return Ext.Element.cache[q]
		}
		this.dom = p;
		this.id = q || Ext.id(p)
	};
	var a = Ext.lib.Dom, e = Ext.DomHelper, l = Ext.lib.Event, d = Ext.lib.Anim, g = Ext.Element;
	g.prototype = {
		set : function(s, p) {
			var q = this.dom, n, r;
			for (n in s) {
				r = s[n];
				if (n != "style" && !Ext.isFunction(r)) {
					if (n == "cls") {
						q.className = r
					} else {
						if (s.hasOwnProperty(n)) {
							if (p || !!q.setAttribute) {
								q.setAttribute(n, r)
							} else {
								q[n] = r
							}
						}
					}
				}
			}
			if (s.style) {
				Ext.DomHelper.applyStyles(q, s.style)
			}
			return this
		},
		defaultUnit : "px",
		is : function(n) {
			return Ext.DomQuery.is(this.dom, n)
		},
		focus : function(q, p) {
			var n = this, p = p || n.dom;
			try {
				if (Number(q)) {
					n.focus.defer(q, null, [ null, p ])
				} else {
					p.focus()
				}
			} catch (o) {
			}
			return n
		},
		blur : function() {
			try {
				this.dom.blur()
			} catch (n) {
			}
			return this
		},
		getValue : function(n) {
			var o = this.dom.value;
			return n ? parseInt(o, 10) : o
		},
		addListener : function(n, q, p, o) {
			Ext.EventManager.on(this.dom, n, q, p || this, o);
			return this
		},
		removeListener : function(n, p, o) {
			Ext.EventManager.removeListener(this.dom, n, p, o || this);
			return this
		},
		removeAllListeners : function() {
			Ext.EventManager.removeAll(this.dom);
			return this
		},
		addUnits : function(n) {
			if (n === "" || n == "auto" || n === undefined) {
				n = n || ""
			} else {
				if (!isNaN(n) || !j.test(n)) {
					n = n + (this.defaultUnit || "px")
				}
			}
			return n
		},
		load : function(o, p, n) {
			Ext.Ajax.request(Ext.apply( {
				params : p,
				url : o.url || o,
				callback : n,
				el : this.dom,
				indicatorText : o.indicatorText || ""
			}, Ext.isObject(o) ? o : {}));
			return this
		},
		isBorderBox : function() {
			return h[(this.dom.tagName || "").toLowerCase()] || Ext.isBorderBox
		},
		remove : function() {
			var n = this, o = n.dom;
			n.removeAllListeners();
			delete g.cache[o.id];
			delete g.dataCache[o.id];
			Ext.removeNode(o)
		},
		hover : function(o, n, q, p) {
			var r = this;
			r.on("mouseenter", o, q || r.dom, p);
			r.on("mouseleave", n, q || r.dom, p);
			return r
		},
		contains : function(n) {
			return !n ? false : Ext.lib.Dom.isAncestor(this.dom, n.dom ? n.dom
					: n)
		},
		getAttributeNS : function(o, n) {
			return this.getAttribute(n, o)
		},
		getAttribute : Ext.isIE ? function(n, p) {
			var q = this.dom, o = typeof q[p + ":" + n];
			if ( [ "undefined", "unknown" ].indexOf(o) == -1) {
				return q[p + ":" + n]
			}
			return q[n]
		} : function(n, o) {
			var p = this.dom;
			return p.getAttributeNS(o, n) || p.getAttribute(o + ":" + n)
					|| p.getAttribute(n) || p[n]
		},
		update : function(n) {
			this.dom.innerHTML = n;
			return this
		}
	};
	var m = g.prototype;
	g.addMethods = function(n) {
		Ext.apply(m, n)
	};
	m.on = m.addListener;
	m.un = m.removeListener;
	m.autoBoxAdjust = true;
	var j = /\d+(px|em|%|en|ex|pt|in|cm|mm|pc)$/i, c;
	g.cache = {};
	g.dataCache = {};
	g.get = function(o) {
		var n, r, q;
		if (!o) {
			return null
		}
		if (typeof o == "string") {
			if (!(r = i.getElementById(o))) {
				return null
			}
			if (n = g.cache[o]) {
				n.dom = r
			} else {
				n = g.cache[o] = new g(r)
			}
			return n
		} else {
			if (o.tagName) {
				if (!(q = o.id)) {
					q = Ext.id(o)
				}
				if (n = g.cache[q]) {
					n.dom = o
				} else {
					n = g.cache[q] = new g(o)
				}
				return n
			} else {
				if (o instanceof g) {
					if (o != c) {
						o.dom = i.getElementById(o.id) || o.dom;
						g.cache[o.id] = o
					}
					return o
				} else {
					if (o.isComposite) {
						return o
					} else {
						if (Ext.isArray(o)) {
							return g.select(o)
						} else {
							if (o == i) {
								if (!c) {
									var p = function() {
									};
									p.prototype = g.prototype;
									c = new p();
									c.dom = i
								}
								return c
							}
						}
					}
				}
			}
		}
		return null
	};
	g.data = function(o, n, p) {
		var q = g.dataCache[o.id];
		if (!q) {
			q = g.dataCache[o.id] = {}
		}
		if (arguments.length == 2) {
			return q[n]
		} else {
			q[n] = p
		}
	};
	function k() {
		if (!Ext.enableGarbageCollector) {
			clearInterval(g.collectorThread)
		} else {
			var n, o, p;
			for (n in g.cache) {
				o = g.cache[n];
				p = o.dom;
				if (!p || !p.parentNode
						|| (!p.offsetParent && !i.getElementById(n))) {
					delete g.cache[n];
					if (p && Ext.enableListenerCollection) {
						Ext.EventManager.removeAll(p)
					}
				}
			}
		}
	}
	g.collectorThreadId = setInterval(k, 30000);
	var b = function() {
	};
	b.prototype = g.prototype;
	g.Flyweight = function(n) {
		this.dom = n
	};
	g.Flyweight.prototype = new b();
	g.Flyweight.prototype.isFlyweight = true;
	g._flyweights = {};
	g.fly = function(p, n) {
		var o = null;
		n = n || "_global";
		if (p = Ext.getDom(p)) {
			(g._flyweights[n] = g._flyweights[n] || new g.Flyweight()).dom = p;
			o = g._flyweights[n]
		}
		return o
	};
	Ext.get = g.get;
	Ext.fly = g.fly;
	var h = Ext.isStrict ? {
		select : 1
	} : {
		input : 1,
		select : 1,
		textarea : 1
	};
	if (Ext.isIE || Ext.isGecko) {
		h.button = 1
	}
	Ext.EventManager.on(window, "unload", function() {
		delete g.cache;
		delete g.dataCache;
		delete g._flyweights
	})
})();
Ext.Element
		.addMethods( {
			swallowEvent : function(a, b) {
				var d = this;
				function c(g) {
					g.stopPropagation();
					if (b) {
						g.preventDefault()
					}
				}
				if (Ext.isArray(a)) {
					Ext.each(a, function(g) {
						d.on(g, c)
					});
					return d
				}
				d.on(a, c);
				return d
			},
			relayEvent : function(a, b) {
				this.on(a, function(c) {
					b.fireEvent(a, c)
				})
			},
			clean : function(b) {
				var d = this, e = d.dom, g = e.firstChild, c = -1;
				if (Ext.Element.data(e, "isCleaned") && b !== true) {
					return d
				}
				while (g) {
					var a = g.nextSibling;
					if (g.nodeType == 3 && !/\S/.test(g.nodeValue)) {
						e.removeChild(g)
					} else {
						g.nodeIndex = ++c
					}
					g = a
				}
				Ext.Element.data(e, "isCleaned", true);
				return d
			},
			load : function() {
				var a = this.getUpdater();
				a.update.apply(a, arguments);
				return this
			},
			getUpdater : function() {
				return this.updateManager
						|| (this.updateManager = new Ext.Updater(this))
			},
			update : function(html, loadScripts, callback) {
				html = html || "";
				if (loadScripts !== true) {
					this.dom.innerHTML = html;
					if (Ext.isFunction(callback)) {
						callback()
					}
					return this
				}
				var id = Ext.id(), dom = this.dom;
				html += '<span id="' + id + '"></span>';
				Ext.lib.Event
						.onAvailable(
								id,
								function() {
									var DOC = document, hd = DOC
											.getElementsByTagName("head")[0], re = /(?:<script([^>]*)?>)((\n|\r|.)*?)(?:<\/script>)/ig, srcRe = /\ssrc=([\'\"])(.*?)\1/i, typeRe = /\stype=([\'\"])(.*?)\1/i, match, attrs, srcMatch, typeMatch, el, s;
									while ((match = re.exec(html))) {
										attrs = match[1];
										srcMatch = attrs ? attrs.match(srcRe)
												: false;
										if (srcMatch && srcMatch[2]) {
											s = DOC.createElement("script");
											s.src = srcMatch[2];
											typeMatch = attrs.match(typeRe);
											if (typeMatch && typeMatch[2]) {
												s.type = typeMatch[2]
											}
											hd.appendChild(s)
										} else {
											if (match[2] && match[2].length > 0) {
												if (window.execScript) {
													window.execScript(match[2])
												} else {
													window.eval(match[2])
												}
											}
										}
									}
									el = DOC.getElementById(id);
									if (el) {
										Ext.removeNode(el)
									}
									if (Ext.isFunction(callback)) {
										callback()
									}
								});
				dom.innerHTML = html.replace(
						/(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/ig, "");
				return this
			},
			createProxy : function(a, e, d) {
				a = Ext.isObject(a) ? a : {
					tag : "div",
					cls : a
				};
				var c = this, b = e ? Ext.DomHelper.append(e, a, true)
						: Ext.DomHelper.insertBefore(c.dom, a, true);
				if (d && c.setBox && c.getBox) {
					b.setBox(c.getBox())
				}
				return b
			}
		});
Ext.Element.prototype.getUpdateManager = Ext.Element.prototype.getUpdater;
Ext.Element.uncache = function(e) {
	for ( var d = 0, c = arguments, b = c.length; d < b; d++) {
		if (c[d]) {
			delete Ext.Element.cache[c[d].id || c[d]]
		}
	}
};
Ext.Element
		.addMethods( {
			getAnchorXY : function(e, l, q) {
				e = (e || "tl").toLowerCase();
				q = q || {};
				var k = this, b = k.dom == document.body || k.dom == document, n = q.width
						|| b ? Ext.lib.Dom.getViewWidth() : k.getWidth(), i = q.height
						|| b ? Ext.lib.Dom.getViewHeight() : k.getHeight(), p, a = Math.round, c = k
						.getXY(), m = k.getScroll(), j = b ? m.left : !l ? c[0]
						: 0, g = b ? m.top : !l ? c[1] : 0, d = {
					c : [ a(n * 0.5), a(i * 0.5) ],
					t : [ a(n * 0.5), 0 ],
					l : [ 0, a(i * 0.5) ],
					r : [ n, a(i * 0.5) ],
					b : [ a(n * 0.5), i ],
					tl : [ 0, 0 ],
					bl : [ 0, i ],
					br : [ n, i ],
					tr : [ n, 0 ]
				};
				p = d[e];
				return [ p[0] + j, p[1] + g ]
			},
			anchorTo : function(b, g, c, a, i, j) {
				var h = this, e = h.dom;
				function d() {
					Ext.fly(e).alignTo(b, g, c, a);
					Ext.callback(j, Ext.fly(e))
				}
				Ext.EventManager.onWindowResize(d, h);
				if (!Ext.isEmpty(i)) {
					Ext.EventManager.on(window, "scroll", d, h, {
						buffer : !isNaN(i) ? i : 50
					})
				}
				d.call(h);
				return h
			},
			getAlignToXY : function(g, A, B) {
				g = Ext.get(g);
				if (!g || !g.dom) {
					throw "Element.alignToXY with an element that doesn't exist"
				}
				B = B || [ 0, 0 ];
				A = (A == "?" ? "tl-bl?" : (!/-/.test(A) && A !== "" ? "tl-"
						+ A : A || "tl-bl")).toLowerCase();
				var K = this, H = K.dom, M, L, n, l, s, F, v, t = Ext.lib.Dom
						.getViewWidth() - 10, G = Ext.lib.Dom.getViewHeight() - 10, b, i, j, k, u, z, N = document, J = N.documentElement, q = N.body, E = (J.scrollLeft
						|| q.scrollLeft || 0) + 5, D = (J.scrollTop
						|| q.scrollTop || 0) + 5, I = false, e = "", a = "", C = A
						.match(/^([a-z]+)-([a-z]+)(\?)?$/);
				if (!C) {
					throw "Element.alignTo with an invalid alignment " + A
				}
				e = C[1];
				a = C[2];
				I = !!C[3];
				M = K.getAnchorXY(e, true);
				L = g.getAnchorXY(a, false);
				n = L[0] - M[0] + B[0];
				l = L[1] - M[1] + B[1];
				if (I) {
					s = K.getWidth();
					F = K.getHeight();
					v = g.getRegion();
					b = e.charAt(0);
					i = e.charAt(e.length - 1);
					j = a.charAt(0);
					k = a.charAt(a.length - 1);
					u = ((b == "t" && j == "b") || (b == "b" && j == "t"));
					z = ((i == "r" && k == "l") || (i == "l" && k == "r"));
					if (n + s > t + E) {
						n = z ? v.left - s : t + E - s
					}
					if (n < E) {
						n = z ? v.right : E
					}
					if (l + F > G + D) {
						l = u ? v.top - F : G + D - F
					}
					if (l < D) {
						l = u ? v.bottom : D
					}
				}
				return [ n, l ]
			},
			alignTo : function(c, a, e, b) {
				var d = this;
				return d.setXY(d.getAlignToXY(c, a, e), d.preanim && !!b ? d
						.preanim(arguments, 3) : false)
			},
			adjustForConstraints : function(c, a, b) {
				return this.getConstrainToXY(a || document, false, b, c) || c
			},
			getConstrainToXY : function(b, a, c, e) {
				var d = {
					top : 0,
					left : 0,
					bottom : 0,
					right : 0
				};
				return function(i, z, k, m) {
					i = Ext.get(i);
					k = k ? Ext.applyIf(k, d) : d;
					var v, C, u = 0, t = 0;
					if (i.dom == document.body || i.dom == document) {
						v = Ext.lib.Dom.getViewWidth();
						C = Ext.lib.Dom.getViewHeight()
					} else {
						v = i.dom.clientWidth;
						C = i.dom.clientHeight;
						if (!z) {
							var r = i.getXY();
							u = r[0];
							t = r[1]
						}
					}
					var q = i.getScroll();
					u += k.left + q.left;
					t += k.top + q.top;
					v -= k.right;
					C -= k.bottom;
					var A = u + v;
					var g = t + C;
					var j = m
							|| (!z ? this.getXY() : [ this.getLeft(true),
									this.getTop(true) ]);
					var o = j[0], n = j[1];
					var p = this.dom.offsetWidth, B = this.dom.offsetHeight;
					var l = false;
					if ((o + p) > A) {
						o = A - p;
						l = true
					}
					if ((n + B) > g) {
						n = g - B;
						l = true
					}
					if (o < u) {
						o = u;
						l = true
					}
					if (n < t) {
						n = t;
						l = true
					}
					return l ? [ o, n ] : false
				}
			}(),
			getCenterXY : function() {
				return this.getAlignToXY(document, "c-c")
			},
			center : function(a) {
				return this.alignTo(a || document, "c-c")
			}
		});
Ext.Element
		.addMethods( function() {
			var d = "parentNode", b = "nextSibling", c = "previousSibling", e = Ext.DomQuery, a = Ext.get;
			return {
				findParent : function(m, l, h) {
					var j = this.dom, g = document.body, k = 0, i;
					if (Ext.isGecko
							&& Object.prototype.toString.call(j) == "[object XULElement]") {
						return null
					}
					l = l || 50;
					if (isNaN(l)) {
						i = Ext.getDom(l);
						l = Number.MAX_VALUE
					}
					while (j && j.nodeType == 1 && k < l && j != g && j != i) {
						if (e.is(j, m)) {
							return h ? a(j) : j
						}
						k++;
						j = j.parentNode
					}
					return null
				},
				findParentNode : function(j, i, g) {
					var h = Ext.fly(this.dom.parentNode, "_internal");
					return h ? h.findParent(j, i, g) : null
				},
				up : function(h, g) {
					return this.findParentNode(h, g, true)
				},
				select : function(g, h) {
					return Ext.Element.select(g, h, this.dom)
				},
				query : function(g, h) {
					return e.select(g, this.dom)
				},
				child : function(g, h) {
					var i = e.selectNode(g, this.dom);
					return h ? i : a(i)
				},
				down : function(g, h) {
					var i = e.selectNode(" > " + g, this.dom);
					return h ? i : a(i)
				},
				parent : function(g, h) {
					return this.matchNode(d, d, g, h)
				},
				next : function(g, h) {
					return this.matchNode(b, b, g, h)
				},
				prev : function(g, h) {
					return this.matchNode(c, c, g, h)
				},
				first : function(g, h) {
					return this.matchNode(b, "firstChild", g, h)
				},
				last : function(g, h) {
					return this.matchNode(c, "lastChild", g, h)
				},
				matchNode : function(h, k, g, i) {
					var j = this.dom[k];
					while (j) {
						if (j.nodeType == 1 && (!g || e.is(j, g))) {
							return !i ? a(j) : j
						}
						j = j[h]
					}
					return null
				}
			}
		}());
Ext.Element.addMethods( function() {
	var d = Ext.getDom, a = Ext.get, c = Ext.DomHelper, b = function(e) {
		return (e.nodeType || e.dom || typeof e == "string")
	};
	return {
		appendChild : function(e) {
			return a(e).appendTo(this)
		},
		appendTo : function(e) {
			d(e).appendChild(this.dom);
			return this
		},
		insertBefore : function(e) {
			(e = d(e)).parentNode.insertBefore(this.dom, e);
			return this
		},
		insertAfter : function(e) {
			(e = d(e)).parentNode.insertBefore(this.dom, e.nextSibling);
			return this
		},
		insertFirst : function(g, e) {
			g = g || {};
			if (b(g)) {
				g = d(g);
				this.dom.insertBefore(g, this.dom.firstChild);
				return !e ? a(g) : g
			} else {
				return this.createChild(g, this.dom.firstChild, e)
			}
		},
		replace : function(e) {
			e = a(e);
			this.insertBefore(e);
			e.remove();
			return this
		},
		replaceWith : function(g) {
			var h = this, e = Ext.Element;
			if (b(g)) {
				g = d(g);
				h.dom.parentNode.insertBefore(g, h.dom)
			} else {
				g = c.insertBefore(h.dom, g)
			}
			delete e.cache[h.id];
			Ext.removeNode(h.dom);
			h.id = Ext.id(h.dom = g);
			return e.cache[h.id] = h
		},
		createChild : function(g, e, h) {
			g = g || {
				tag : "div"
			};
			return e ? c.insertBefore(e, g, h !== true)
					: c[!this.dom.firstChild ? "overwrite" : "append"](
							this.dom, g, h !== true)
		},
		wrap : function(e, g) {
			var h = c.insertBefore(this.dom, e || {
				tag : "div"
			}, !g);
			h.dom ? h.dom.appendChild(this.dom) : h.appendChild(this.dom);
			return h
		},
		insertHtml : function(g, h, e) {
			var i = c.insertHtml(g, this.dom, h);
			return e ? Ext.get(i) : i
		}
	}
}());
Ext.apply(Ext.Element.prototype, function() {
	var c = Ext.getDom, a = Ext.get, b = Ext.DomHelper;
	return {
		insertSibling : function(h, e, g) {
			var i = this, d;
			if (Ext.isArray(h)) {
				Ext.each(h, function(j) {
					d = i.insertSibling(j, e, g)
				});
				return d
			}
			e = (e || "before").toLowerCase();
			h = h || {};
			if (h.nodeType || h.dom) {
				d = i.dom.parentNode.insertBefore(c(h), e == "before" ? i.dom
						: i.dom.nextSibling);
				if (!g) {
					d = a(d)
				}
			} else {
				if (e == "after" && !i.dom.nextSibling) {
					d = b.append(i.dom.parentNode, h, !g)
				} else {
					d = b[e == "after" ? "insertAfter" : "insertBefore"](i.dom,
							h, !g)
				}
			}
			return d
		}
	}
}());
Ext.Element
		.addMethods( function() {
			var h = {}, y = /(-[a-z])/gi, b = {}, t = document.defaultView, v = Ext.isIE ? "styleFloat"
					: "cssFloat", D = /alpha\(opacity=(.*)\)/i, l = /^\s+|\s+$/g, B = Ext.Element, d = "padding", c = "margin", z = "border", u = "-left", r = "-right", x = "-top", o = "-bottom", j = "-width", s = Math, A = "hidden", e = "isClipped", k = "overflow", n = "overflow-x", m = "overflow-y", C = "originalClip", i = {
				l : z + u + j,
				r : z + r + j,
				t : z + x + j,
				b : z + o + j
			}, g = {
				l : d + u,
				r : d + r,
				t : d + x,
				b : d + o
			}, a = {
				l : c + u,
				r : c + r,
				t : c + x,
				b : c + o
			}, E = Ext.Element.data;
			function q(F, G) {
				return G.charAt(1).toUpperCase()
			}
			function p(G, F) {
				var H = 0;
				Ext.each(G.match(/\w/g), function(I) {
					if (I = parseInt(this.getStyle(F[I]), 10)) {
						H += s.abs(I)
					}
				}, this);
				return H
			}
			function w(F) {
				return h[F] || (h[F] = F == "float" ? v : F.replace(y, q))
			}
			return {
				adjustWidth : function(F) {
					var G = this;
					var H = (typeof F == "number");
					if (H && G.autoBoxAdjust && !G.isBorderBox()) {
						F -= (G.getBorderWidth("lr") + G.getPadding("lr"))
					}
					return (H && F < 0) ? 0 : F
				},
				adjustHeight : function(F) {
					var G = this;
					var H = (typeof F == "number");
					if (H && G.autoBoxAdjust && !G.isBorderBox()) {
						F -= (G.getBorderWidth("tb") + G.getPadding("tb"))
					}
					return (H && F < 0) ? 0 : F
				},
				addClass : function(F) {
					var G = this;
					Ext.each(F, function(H) {
						G.dom.className += (!G.hasClass(H) && H ? " " + H : "")
					});
					return G
				},
				radioClass : function(F) {
					Ext.each(this.dom.parentNode.childNodes, function(G) {
						if (G.nodeType == 1) {
							Ext.fly(G, "_internal").removeClass(F)
						}
					});
					return this.addClass(F)
				},
				removeClass : function(F) {
					var G = this;
					if (G.dom.className) {
						Ext.each(F, function(H) {
							G.dom.className = G.dom.className.replace(
									b[H] = b[H]
											|| new RegExp("(?:^|\\s+)" + H
													+ "(?:\\s+|$)", "g"), " ")
						})
					}
					return G
				},
				toggleClass : function(F) {
					return this.hasClass(F) ? this.removeClass(F) : this
							.addClass(F)
				},
				hasClass : function(F) {
					return F
							&& (" " + this.dom.className + " ").indexOf(" " + F
									+ " ") != -1
				},
				replaceClass : function(G, F) {
					return this.removeClass(G).addClass(F)
				},
				isStyle : function(F, G) {
					return this.getStyle(F) == G
				},
				getStyle : function() {
					return t && t.getComputedStyle ? function(I) {
						var H = this.dom, F, G;
						if (H == document) {
							return null
						}
						I = w(I);
						return (F = H.style[I]) ? F : (G = t.getComputedStyle(
								H, "")) ? G[I] : null
					} : function(J) {
						var H = this.dom, F, G;
						if (H == document) {
							return null
						}
						if (J == "opacity") {
							if (H.style.filter.match) {
								if (F = H.style.filter.match(D)) {
									var I = parseFloat(F[1]);
									if (!isNaN(I)) {
										return I ? I / 100 : 0
									}
								}
							}
							return 1
						}
						J = w(J);
						return H.style[J]
								|| ((G = H.currentStyle) ? G[J] : null)
					}
				}(),
				getColor : function(F, G, K) {
					var I = this.getStyle(F), H = K || "#", J;
					if (!I || /transparent|inherit/.test(I)) {
						return G
					}
					if (/^r/.test(I)) {
						Ext.each(I.slice(4, I.length - 1).split(","), function(
								L) {
							J = parseInt(L, 10);
							H += (J < 16 ? "0" : "") + J.toString(16)
						})
					} else {
						I = I.replace("#", "");
						H += I.length == 3 ? I.replace(/^(\w)(\w)(\w)$/,
								"$1$1$2$2$3$3") : I
					}
					return (H.length > 5 ? H.toLowerCase() : G)
				},
				setStyle : function(J, I) {
					var G, H, F;
					if (!Ext.isObject(J)) {
						G = {};
						G[J] = I;
						J = G
					}
					for (H in J) {
						I = J[H];
						H == "opacity" ? this.setOpacity(I)
								: this.dom.style[w(H)] = I
					}
					return this
				},
				setOpacity : function(G, F) {
					var J = this, H = J.dom.style;
					if (!F || !J.anim) {
						if (Ext.isIE) {
							var I = G < 1 ? "alpha(opacity=" + G * 100 + ")"
									: "", K = H.filter.replace(D, "").replace(
									l, "");
							H.zoom = 1;
							H.filter = K + (K.length > 0 ? " " : "") + I
						} else {
							H.opacity = G
						}
					} else {
						J.anim( {
							opacity : {
								to : G
							}
						}, J.preanim(arguments, 1), null, 0.35, "easeIn")
					}
					return J
				},
				clearOpacity : function() {
					var F = this.dom.style;
					if (Ext.isIE) {
						if (!Ext.isEmpty(F.filter)) {
							F.filter = F.filter.replace(D, "").replace(l, "")
						}
					} else {
						F.opacity = F["-moz-opacity"] = F["-khtml-opacity"] = ""
					}
					return this
				},
				getHeight : function(H) {
					var G = this, I = G.dom, F = s.max(I.offsetHeight,
							I.clientHeight) || 0;
					F = !H ? F : F - G.getBorderWidth("tb")
							- G.getPadding("tb");
					return F < 0 ? 0 : F
				},
				getWidth : function(G) {
					var H = this, I = H.dom, F = s.max(I.offsetWidth,
							I.clientWidth) || 0;
					F = !G ? F : F - H.getBorderWidth("lr")
							- H.getPadding("lr");
					return F < 0 ? 0 : F
				},
				setWidth : function(G, F) {
					var H = this;
					G = H.adjustWidth(G);
					!F || !H.anim ? H.dom.style.width = H.addUnits(G) : H.anim(
							{
								width : {
									to : G
								}
							}, H.preanim(arguments, 1));
					return H
				},
				setHeight : function(F, G) {
					var H = this;
					F = H.adjustHeight(F);
					!G || !H.anim ? H.dom.style.height = H.addUnits(F) : H
							.anim( {
								height : {
									to : F
								}
							}, H.preanim(arguments, 1));
					return H
				},
				getBorderWidth : function(F) {
					return p.call(this, F, i)
				},
				getPadding : function(F) {
					return p.call(this, F, g)
				},
				clip : function() {
					var F = this, G = F.dom;
					if (!E(G, e)) {
						E(G, e, true);
						E(G, C, {
							o : F.getStyle(k),
							x : F.getStyle(n),
							y : F.getStyle(m)
						});
						F.setStyle(k, A);
						F.setStyle(n, A);
						F.setStyle(m, A)
					}
					return F
				},
				unclip : function() {
					var F = this, H = F.dom;
					if (E(H, e)) {
						E(H, e, false);
						var G = E(H, C);
						if (G.o) {
							F.setStyle(k, G.o)
						}
						if (G.x) {
							F.setStyle(n, G.x)
						}
						if (G.y) {
							F.setStyle(m, G.y)
						}
					}
					return F
				},
				addStyles : p,
				margins : a
			}
		}());
Ext.Element.boxMarkup = '<div class="{0}-tl"><div class="{0}-tr"><div class="{0}-tc"></div></div></div><div class="{0}-ml"><div class="{0}-mr"><div class="{0}-mc"></div></div></div><div class="{0}-bl"><div class="{0}-br"><div class="{0}-bc"></div></div></div>';
Ext.Element
		.addMethods( function() {
			var a = "_internal";
			return {
				applyStyles : function(b) {
					Ext.DomHelper.applyStyles(this.dom, b);
					return this
				},
				getStyles : function() {
					var b = {};
					Ext.each(arguments, function(c) {
						b[c] = this.getStyle(c)
					}, this);
					return b
				},
				getStyleSize : function() {
					var g = this, b, e, i = this.dom, c = i.style;
					if (c.width && c.width != "auto") {
						b = parseInt(c.width, 10);
						if (g.isBorderBox()) {
							b -= g.getFrameWidth("lr")
						}
					}
					if (c.height && c.height != "auto") {
						e = parseInt(c.height, 10);
						if (g.isBorderBox()) {
							e -= g.getFrameWidth("tb")
						}
					}
					return {
						width : b || g.getWidth(true),
						height : e || g.getHeight(true)
					}
				},
				setOverflow : function(b) {
					var c = this.dom;
					if (b == "auto" && Ext.isMac && Ext.isGecko2) {
						c.style.overflow = "hidden";
						( function() {
							c.style.overflow = "auto"
						}).defer(1)
					} else {
						c.style.overflow = b
					}
				},
				boxWrap : function(b) {
					b = b || "x-box";
					var c = Ext.get(this.insertHtml("beforeBegin",
							"<div class='" + b + "'>"
									+ String.format(Ext.Element.boxMarkup, b)
									+ "</div>"));
					Ext.DomQuery.selectNode("." + b + "-mc", c.dom)
							.appendChild(this.dom);
					return c
				},
				setSize : function(d, b, c) {
					var e = this;
					if (Ext.isObject(d)) {
						b = d.height;
						d = d.width
					}
					d = e.adjustWidth(d);
					b = e.adjustHeight(b);
					if (!c || !e.anim) {
						e.dom.style.width = e.addUnits(d);
						e.dom.style.height = e.addUnits(b)
					} else {
						e.anim( {
							width : {
								to : d
							},
							height : {
								to : b
							}
						}, e.preanim(arguments, 2))
					}
					return e
				},
				getComputedHeight : function() {
					var c = this, b = Math.max(c.dom.offsetHeight,
							c.dom.clientHeight);
					if (!b) {
						b = parseInt(c.getStyle("height"), 10) || 0;
						if (!c.isBorderBox()) {
							b += c.getFrameWidth("tb")
						}
					}
					return b
				},
				getComputedWidth : function() {
					var b = Math
							.max(this.dom.offsetWidth, this.dom.clientWidth);
					if (!b) {
						b = parseInt(this.getStyle("width"), 10) || 0;
						if (!this.isBorderBox()) {
							b += this.getFrameWidth("lr")
						}
					}
					return b
				},
				getFrameWidth : function(c, b) {
					return b && this.isBorderBox() ? 0
							: (this.getPadding(c) + this.getBorderWidth(c))
				},
				addClassOnOver : function(b) {
					this.hover( function() {
						Ext.fly(this, a).addClass(b)
					}, function() {
						Ext.fly(this, a).removeClass(b)
					});
					return this
				},
				addClassOnFocus : function(b) {
					this.on("focus", function() {
						Ext.fly(this, a).addClass(b)
					}, this.dom);
					this.on("blur", function() {
						Ext.fly(this, a).removeClass(b)
					}, this.dom);
					return this
				},
				addClassOnClick : function(b) {
					var c = this.dom;
					this.on("mousedown", function() {
						Ext.fly(c, a).addClass(b);
						var g = Ext.getDoc(), e = function() {
							Ext.fly(c, a).removeClass(b);
							g.removeListener("mouseup", e)
						};
						g.on("mouseup", e)
					});
					return this
				},
				getViewSize : function() {
					var e = document, g = this.dom, c = Ext.lib.Dom, b = (g == e || g == e.body);
					return {
						width : (b ? c.getViewWidth() : g.clientWidth),
						height : (b ? c.getViewHeight() : g.clientHeight)
					}
				},
				getSize : function(b) {
					return {
						width : this.getWidth(b),
						height : this.getHeight(b)
					}
				},
				repaint : function() {
					var b = this.dom;
					this.addClass("x-repaint");
					setTimeout( function() {
						Ext.fly(b).removeClass("x-repaint")
					}, 1);
					return this
				},
				unselectable : function() {
					this.dom.unselectable = "on";
					return this.swallowEvent("selectstart", true).applyStyles(
							"-moz-user-select:none;-khtml-user-select:none;")
							.addClass("x-unselectable")
				},
				getMargins : function(c) {
					var d = this, b, e = {
						t : "top",
						l : "left",
						r : "right",
						b : "bottom"
					}, g = {};
					if (!c) {
						for (b in d.margins) {
							g[e[b]] = parseInt(d.getStyle(d.margins[b]), 10) || 0
						}
						return g
					} else {
						return d.addStyles.call(d, c, d.margins)
					}
				}
			}
		}());
( function() {
	var a = Ext.lib.Dom, b = "left", g = "right", d = "top", i = "bottom", h = "position", c = "static", e = "relative", j = "auto", k = "z-index";
	function l(n, m, o) {
		return this.preanim && !!m ? this.preanim(n, o) : false
	}
	Ext.Element.addMethods( {
		getX : function() {
			return a.getX(this.dom)
		},
		getY : function() {
			return a.getY(this.dom)
		},
		getXY : function() {
			return a.getXY(this.dom)
		},
		getOffsetsTo : function(m) {
			var p = this.getXY(), n = Ext.fly(m, "_internal").getXY();
			return [ p[0] - n[0], p[1] - n[1] ]
		},
		setX : function(m, n) {
			return this.setXY( [ m, this.getY() ], l
					.call(this, arguments, n, 1))
		},
		setY : function(n, m) {
			return this.setXY( [ this.getX(), n ], l
					.call(this, arguments, m, 1))
		},
		setLeft : function(m) {
			this.setStyle(b, this.addUnits(m));
			return this
		},
		setTop : function(m) {
			this.setStyle(d, this.addUnits(m));
			return this
		},
		setRight : function(m) {
			this.setStyle(g, this.addUnits(m));
			return this
		},
		setBottom : function(m) {
			this.setStyle(i, this.addUnits(m));
			return this
		},
		setXY : function(o, m) {
			var n = this;
			if (!m || !n.anim) {
				a.setXY(n.dom, o)
			} else {
				n.anim( {
					points : {
						to : o
					}
				}, n.preanim(arguments, 1), "motion")
			}
			return n
		},
		setLocation : function(m, o, n) {
			return this.setXY( [ m, o ], l.call(this, arguments, n, 2))
		},
		moveTo : function(m, o, n) {
			return this.setXY( [ m, o ], l.call(this, arguments, n, 2))
		},
		getLeft : function(m) {
			return !m ? this.getX() : parseInt(this.getStyle(b), 10) || 0
		},
		getRight : function(m) {
			var n = this;
			return !m ? n.getX() + n.getWidth() : (n.getLeft(true) + n
					.getWidth()) || 0
		},
		getTop : function(m) {
			return !m ? this.getY() : parseInt(this.getStyle(d), 10) || 0
		},
		getBottom : function(m) {
			var n = this;
			return !m ? n.getY() + n.getHeight() : (n.getTop(true) + n
					.getHeight()) || 0
		},
		position : function(q, p, m, o) {
			var n = this;
			if (!q && n.isStyle(h, c)) {
				n.setStyle(h, e)
			} else {
				if (q) {
					n.setStyle(h, q)
				}
			}
			if (p) {
				n.setStyle(k, p)
			}
			if (m || o) {
				n.setXY( [ m || false, o || false ])
			}
		},
		clearPositioning : function(m) {
			m = m || "";
			this.setStyle( {
				left : m,
				right : m,
				top : m,
				bottom : m,
				"z-index" : "",
				position : c
			});
			return this
		},
		getPositioning : function() {
			var m = this.getStyle(b);
			var n = this.getStyle(d);
			return {
				position : this.getStyle(h),
				left : m,
				right : m ? "" : this.getStyle(g),
				top : n,
				bottom : n ? "" : this.getStyle(i),
				"z-index" : this.getStyle(k)
			}
		},
		setPositioning : function(m) {
			var o = this, n = o.dom.style;
			o.setStyle(m);
			if (m.right == j) {
				n.right = ""
			}
			if (m.bottom == j) {
				n.bottom = ""
			}
			return o
		},
		translatePoints : function(m, u) {
			u = isNaN(m[1]) ? u : m[1];
			m = isNaN(m[0]) ? m : m[0];
			var q = this, r = q.isStyle(h, e), s = q.getXY(), n = parseInt(q
					.getStyle(b), 10), p = parseInt(q.getStyle(d), 10);
			n = !isNaN(n) ? n : (r ? 0 : q.dom.offsetLeft);
			p = !isNaN(p) ? p : (r ? 0 : q.dom.offsetTop);
			return {
				left : (m - s[0] + n),
				top : (u - s[1] + p)
			}
		},
		animTest : l
	})
})();
Ext.Element
		.addMethods( {
			setBox : function(e, g, b) {
				var d = this, a = e.width, c = e.height;
				if ((g && !d.autoBoxAdjust) && !d.isBorderBox()) {
					a -= (d.getBorderWidth("lr") + d.getPadding("lr"));
					c -= (d.getBorderWidth("tb") + d.getPadding("tb"))
				}
				d
						.setBounds(e.x, e.y, a, c, d.animTest.call(d,
								arguments, b, 2));
				return d
			},
			getBox : function(j, p) {
				var m = this, v, e, o, d = m.getBorderWidth, q = m.getPadding, g, a, u, n;
				if (!p) {
					v = m.getXY()
				} else {
					e = parseInt(m.getStyle("left"), 10) || 0;
					o = parseInt(m.getStyle("top"), 10) || 0;
					v = [ e, o ]
				}
				var c = m.dom, s = c.offsetWidth, i = c.offsetHeight, k;
				if (!j) {
					k = {
						x : v[0],
						y : v[1],
						0 : v[0],
						1 : v[1],
						width : s,
						height : i
					}
				} else {
					g = d.call(m, "l") + q.call(m, "l");
					a = d.call(m, "r") + q.call(m, "r");
					u = d.call(m, "t") + q.call(m, "t");
					n = d.call(m, "b") + q.call(m, "b");
					k = {
						x : v[0] + g,
						y : v[1] + u,
						0 : v[0] + g,
						1 : v[1] + u,
						width : s - (g + a),
						height : i - (u + n)
					}
				}
				k.right = k.x + k.width;
				k.bottom = k.y + k.height;
				return k
			},
			move : function(j, b, c) {
				var g = this, m = g.getXY(), k = m[0], i = m[1], d = [ k - b, i ], l = [
						k + b, i ], h = [ k, i - b ], a = [ k, i + b ], e = {
					l : d,
					left : d,
					r : l,
					right : l,
					t : h,
					top : h,
					up : h,
					b : a,
					bottom : a,
					down : a
				};
				j = j.toLowerCase();
				g.moveTo(e[j][0], e[j][1], g.animTest.call(g, arguments, c, 2))
			},
			setLeftTop : function(d, c) {
				var b = this, a = b.dom.style;
				a.left = b.addUnits(d);
				a.top = b.addUnits(c);
				return b
			},
			getRegion : function() {
				return Ext.lib.Dom.getRegion(this.dom)
			},
			setBounds : function(b, g, d, a, c) {
				var e = this;
				if (!c || !e.anim) {
					e.setSize(d, a);
					e.setLocation(b, g)
				} else {
					e.anim( {
						points : {
							to : [ b, g ]
						},
						width : {
							to : e.adjustWidth(d)
						},
						height : {
							to : e.adjustHeight(a)
						}
					}, e.preanim(arguments, 4), "motion")
				}
				return e
			},
			setRegion : function(b, a) {
				return this.setBounds(b.left, b.top, b.right - b.left, b.bottom
						- b.top, this.animTest.call(this, arguments, a, 1))
			}
		});
Ext.Element
		.addMethods( {
			isScrollable : function() {
				var a = this.dom;
				return a.scrollHeight > a.clientHeight
						|| a.scrollWidth > a.clientWidth
			},
			scrollTo : function(a, b) {
				this.dom["scroll" + (/top/i.test(a) ? "Top" : "Left")] = b;
				return this
			},
			getScroll : function() {
				var i = this.dom, h = document, a = h.body, c = h.documentElement, b, g, e;
				if (i == h || i == a) {
					if (Ext.isIE && Ext.isStrict) {
						b = c.scrollLeft;
						g = c.scrollTop
					} else {
						b = window.pageXOffset;
						g = window.pageYOffset
					}
					e = {
						left : b || (a ? a.scrollLeft : 0),
						top : g || (a ? a.scrollTop : 0)
					}
				} else {
					e = {
						left : i.scrollLeft,
						top : i.scrollTop
					}
				}
				return e
			}
		});
Ext.Element
		.addMethods( {
			scrollTo : function(c, e, b) {
				var a = /top/i, h = "scroll" + (a.test(c) ? "Top" : "Left"), d = this, g = d.dom;
				if (!b || !d.anim) {
					g[h] = e
				} else {
					d.anim( {
						scroll : {
							to : a.test(h) ? [ g[h], e ] : [ e, g[h] ]
						}
					}, d.preanim(arguments, 2), "scroll")
				}
				return d
			},
			scrollIntoView : function(e, i) {
				var p = Ext.getDom(e) || Ext.getBody().dom, h = this.dom, g = this
						.getOffsetsTo(p), k = g[0] + p.scrollLeft, u = g[1]
						+ p.scrollTop, q = u + h.offsetHeight, d = k
						+ h.offsetWidth, a = p.clientHeight, m = parseInt(
						p.scrollTop, 10), s = parseInt(p.scrollLeft, 10), j = m
						+ a, n = s + p.clientWidth;
				if (h.offsetHeight > a || u < m) {
					p.scrollTop = u
				} else {
					if (q > j) {
						p.scrollTop = q - a
					}
				}
				p.scrollTop = p.scrollTop;
				if (i !== false) {
					if (h.offsetWidth > p.clientWidth || k < s) {
						p.scrollLeft = k
					} else {
						if (d > n) {
							p.scrollLeft = d - p.clientWidth
						}
					}
					p.scrollLeft = p.scrollLeft
				}
				return this
			},
			scrollChildIntoView : function(b, a) {
				Ext.fly(b, "_scrollChildIntoView").scrollIntoView(this, a)
			},
			scroll : function(m, b, d) {
				if (!this.isScrollable()) {
					return
				}
				var e = this.dom, g = e.scrollLeft, p = e.scrollTop, n = e.scrollWidth, k = e.scrollHeight, i = e.clientWidth, a = e.clientHeight, c = false, o, j = {
					l : Math.min(g + b, n - i),
					r : o = Math.max(g - b, 0),
					t : Math.max(p - b, 0),
					b : Math.min(p + b, k - a)
				};
				j.d = j.b;
				j.u = j.t;
				m = m.substr(0, 1);
				if ((o = j[m]) > -1) {
					c = true;
					this.scrollTo(m == "l" || m == "r" ? "left" : "top", o,
							this.preanim(arguments, 2))
				}
				return c
			}
		});
Ext.Element.VISIBILITY = 1;
Ext.Element.DISPLAY = 2;
Ext.Element
		.addMethods( function() {
			var h = "visibility", d = "display", b = "hidden", j = "none", a = "originalDisplay", c = "visibilityMode", e = Ext.Element.DISPLAY, g = Ext.Element.data, i = function(
					m) {
				var l = g(m, a);
				if (l === undefined) {
					g(m, a, l = "")
				}
				return l
			}, k = function(n) {
				var l = g(n, c);
				if (l === undefined) {
					g(n, c, l = 1)
				}
				return l
			};
			return {
				originalDisplay : "",
				visibilityMode : 1,
				setVisibilityMode : function(l) {
					g(this.dom, c, l);
					return this
				},
				animate : function(m, o, n, p, l) {
					this.anim(m, {
						duration : o,
						callback : n,
						easing : p
					}, l);
					return this
				},
				anim : function(o, p, m, r, n, l) {
					m = m || "run";
					p = p || {};
					var q = this, s = Ext.lib.Anim[m](q.dom, o,
							(p.duration || r) || 0.35, (p.easing || n)
									|| "easeOut", function() {
								if (l) {
									l.call(q)
								}
								if (p.callback) {
									p.callback.call(p.scope || q, q, p)
								}
							}, q);
					p.anim = s;
					return s
				},
				preanim : function(l, m) {
					return !l[m] ? false : (Ext.isObject(l[m]) ? l[m] : {
						duration : l[m + 1],
						callback : l[m + 2],
						easing : l[m + 3]
					})
				},
				isVisible : function() {
					return !this.isStyle(h, b) && !this.isStyle(d, j)
				},
				setVisible : function(p, m) {
					var n = this, o = n.dom, l = k(this.dom) == e;
					if (!m || !n.anim) {
						if (l) {
							n.setDisplayed(p)
						} else {
							n.fixDisplay();
							o.style.visibility = p ? "visible" : b
						}
					} else {
						if (p) {
							n.setOpacity(0.01);
							n.setVisible(true)
						}
						n.anim( {
							opacity : {
								to : (p ? 1 : 0)
							}
						}, n.preanim(arguments, 1), null, 0.35, "easeIn",
								function() {
									if (!p) {
										o.style[l ? d : h] = (l) ? j : b;
										Ext.fly(o).setOpacity(1)
									}
								})
					}
					return n
				},
				toggle : function(l) {
					var m = this;
					m.setVisible(!m.isVisible(), m.preanim(arguments, 0));
					return m
				},
				setDisplayed : function(l) {
					if (typeof l == "boolean") {
						l = l ? i(this.dom) : j
					}
					this.setStyle(d, l);
					return this
				},
				fixDisplay : function() {
					var l = this;
					if (l.isStyle(d, j)) {
						l.setStyle(h, b);
						l.setStyle(d, i(this.dom));
						if (l.isStyle(d, j)) {
							l.setStyle(d, "block")
						}
					}
				},
				hide : function(l) {
					this.setVisible(false, this.preanim(arguments, 0));
					return this
				},
				show : function(l) {
					this.setVisible(true, this.preanim(arguments, 0));
					return this
				}
			}
		}());
Ext.Element
		.addMethods( function() {
			var d = "visibility", b = "display", a = "hidden", h = "none", c = "x-masked", g = "x-masked-relative", e = Ext.Element.data;
			return {
				isVisible : function(i) {
					var j = !this.isStyle(d, a) && !this.isStyle(b, h), k = this.dom.parentNode;
					if (i !== true || !j) {
						return j
					}
					while (k && !/body/i.test(k.tagName)) {
						if (!Ext.fly(k, "_isVisible").isVisible()) {
							return false
						}
						k = k.parentNode
					}
					return true
				},
				isDisplayed : function() {
					return !this.isStyle(b, h)
				},
				enableDisplayMode : function(i) {
					this.setVisibilityMode(Ext.Element.DISPLAY);
					if (!Ext.isEmpty(i)) {
						e(this.dom, "originalDisplay", i)
					}
					return this
				},
				mask : function(j, n) {
					var p = this, l = p.dom, o = Ext.DomHelper, m = "ext-el-mask-msg", i, q;
					if (p.getStyle("position") == "static") {
						p.addClass(g)
					}
					if ((i = e(l, "maskMsg"))) {
						i.remove()
					}
					if ((i = e(l, "mask"))) {
						i.remove()
					}
					q = o.append(l, {
						cls : "ext-el-mask"
					}, true);
					e(l, "mask", q);
					p.addClass(c);
					q.setDisplayed(true);
					if (typeof j == "string") {
						var k = o.append(l, {
							cls : m,
							cn : {
								tag : "div"
							}
						}, true);
						e(l, "maskMsg", k);
						k.dom.className = n ? m + " " + n : m;
						k.dom.firstChild.innerHTML = j;
						k.setDisplayed(true);
						k.center(p)
					}
					if (Ext.isIE && !(Ext.isIE7 && Ext.isStrict)
							&& p.getStyle("height") == "auto") {
						q.setSize(undefined, p.getHeight())
					}
					return q
				},
				unmask : function() {
					var k = this, l = k.dom, i = e(l, "mask"), j = e(l,
							"maskMsg");
					if (i) {
						if (j) {
							j.remove();
							e(l, "maskMsg", undefined)
						}
						i.remove();
						e(l, "mask", undefined)
					}
					k.removeClass( [ c, g ])
				},
				isMasked : function() {
					var i = e(this.dom, "mask");
					return i && i.isVisible()
				},
				createShim : function() {
					var i = document.createElement("iframe"), j;
					i.frameBorder = "0";
					i.className = "ext-shim";
					if (Ext.isIE && Ext.isSecure) {
						i.src = Ext.SSL_SECURE_URL
					}
					j = Ext.get(this.dom.parentNode.insertBefore(i, this.dom));
					j.autoBoxAdjust = false;
					return j
				}
			}
		}());
Ext.Element.addMethods( {
	addKeyListener : function(b, d, c) {
		var a;
		if (!Ext.isObject(b) || Ext.isArray(b)) {
			a = {
				key : b,
				fn : d,
				scope : c
			}
		} else {
			a = {
				key : b.key,
				shift : b.shift,
				ctrl : b.ctrl,
				alt : b.alt,
				fn : d,
				scope : c
			}
		}
		return new Ext.KeyMap(this, a)
	},
	addKeyMap : function(a) {
		return new Ext.KeyMap(this, a)
	}
});
( function() {
	var y = null, A = undefined, k = true, t = false, j = "setX", h = "setY", a = "setXY", n = "left", l = "bottom", s = "top", m = "right", q = "height", g = "width", i = "points", w = "hidden", z = "absolute", u = "visible", e = "motion", o = "position", r = "easeOut", d = new Ext.Element.Flyweight(), v = {}, x = function(
			B) {
		return B || {}
	}, p = function(B) {
		d.dom = B;
		d.id = Ext.id(B);
		return d
	}, c = function(B) {
		if (!v[B]) {
			v[B] = []
		}
		return v[B]
	}, b = function(C, B) {
		v[C] = B
	};
	Ext.enableFx = k;
	Ext.Fx = {
		switchStatements : function(C, D, B) {
			return D.apply(this, B[C])
		},
		slideIn : function(H, E) {
			E = x(E);
			var J = this, G = J.dom, M = G.style, O, B, L, D, C, M, I, N, K, F;
			H = H || "t";
			J.queueFx(E,
					function() {
						O = p(G).getXY();
						p(G).fixDisplay();
						B = p(G).getFxRestore();
						L = {
							x : O[0],
							y : O[1],
							0 : O[0],
							1 : O[1],
							width : G.offsetWidth,
							height : G.offsetHeight
						};
						L.right = L.x + L.width;
						L.bottom = L.y + L.height;
						p(G).setWidth(L.width).setHeight(L.height);
						D = p(G).fxWrap(B.pos, E, w);
						M.visibility = u;
						M.position = z;
						function P() {
							p(G).fxUnwrap(D, B.pos, E);
							M.width = B.width;
							M.height = B.height;
							p(G).afterFx(E)
						}
						N = {
							to : [ L.x, L.y ]
						};
						K = {
							to : L.width
						};
						F = {
							to : L.height
						};
						function Q(U, R, V, S, X, Z, ac, ab, aa, W, T) {
							var Y = {};
							p(U).setWidth(V).setHeight(S);
							if (p(U)[X]) {
								p(U)[X](Z)
							}
							R[ac] = R[ab] = "0";
							if (aa) {
								Y.width = aa
							}
							if (W) {
								Y.height = W
							}
							if (T) {
								Y.points = T
							}
							return Y
						}
						I = p(G)
								.switchStatements(
										H.toLowerCase(),
										Q,
										{
											t : [ D, M, L.width, 0, y, y, n, l,
													y, F, y ],
											l : [ D, M, 0, L.height, y, y, m,
													s, K, y, y ],
											r : [ D, M, L.width, L.height, j,
													L.right, n, s, y, y, N ],
											b : [ D, M, L.width, L.height, h,
													L.bottom, n, s, y, F, N ],
											tl : [ D, M, 0, 0, y, y, m, l, K,
													F, N ],
											bl : [ D, M, 0, 0, h,
													L.y + L.height, m, s, K, F,
													N ],
											br : [ D, M, 0, 0, a,
													[ L.right, L.bottom ], n,
													s, K, F, N ],
											tr : [ D, M, 0, 0, j,
													L.x + L.width, n, l, K, F,
													N ]
										});
						M.visibility = u;
						p(D).show();
						arguments.callee.anim = p(D).fxanim(I, E, e, 0.5, r, P)
					});
			return J
		},
		slideOut : function(F, D) {
			D = x(D);
			var H = this, E = H.dom, K = E.style, L = H.getXY(), C, B, I, J, G = {
				to : 0
			};
			F = F || "t";
			H.queueFx(D, function() {
				B = p(E).getFxRestore();
				I = {
					x : L[0],
					y : L[1],
					0 : L[0],
					1 : L[1],
					width : E.offsetWidth,
					height : E.offsetHeight
				};
				I.right = I.x + I.width;
				I.bottom = I.y + I.height;
				p(E).setWidth(I.width).setHeight(I.height);
				C = p(E).fxWrap(B.pos, D, u);
				K.visibility = u;
				K.position = z;
				p(C).setWidth(I.width).setHeight(I.height);
				function M() {
					D.useDisplay ? p(E).setDisplayed(t) : p(E).hide();
					p(E).fxUnwrap(C, B.pos, D);
					K.width = B.width;
					K.height = B.height;
					p(E).afterFx(D)
				}
				function N(O, W, U, X, S, V, R, T, Q) {
					var P = {};
					O[W] = O[U] = "0";
					P[X] = S;
					if (V) {
						P[V] = R
					}
					if (T) {
						P[T] = Q
					}
					return P
				}
				J = p(E).switchStatements(F.toLowerCase(), N, {
					t : [ K, n, l, q, G ],
					l : [ K, m, s, g, G ],
					r : [ K, n, s, g, G, i, {
						to : [ I.right, I.y ]
					} ],
					b : [ K, n, s, q, G, i, {
						to : [ I.x, I.bottom ]
					} ],
					tl : [ K, m, l, g, G, q, G ],
					bl : [ K, m, s, g, G, q, G, i, {
						to : [ I.x, I.bottom ]
					} ],
					br : [ K, n, s, g, G, q, G, i, {
						to : [ I.x + I.width, I.bottom ]
					} ],
					tr : [ K, n, l, g, G, q, G, i, {
						to : [ I.right, I.y ]
					} ]
				});
				arguments.callee.anim = p(C).fxanim(J, D, e, 0.5, r, M)
			});
			return H
		},
		puff : function(H) {
			H = x(H);
			var F = this, G = F.dom, C = G.style, D, B, E;
			F.queueFx(H, function() {
				D = p(G).getWidth();
				B = p(G).getHeight();
				p(G).clearOpacity();
				p(G).show();
				E = p(G).getFxRestore();
				function I() {
					H.useDisplay ? p(G).setDisplayed(t) : p(G).hide();
					p(G).clearOpacity();
					p(G).setPositioning(E.pos);
					C.width = E.width;
					C.height = E.height;
					C.fontSize = "";
					p(G).afterFx(H)
				}
				arguments.callee.anim = p(G).fxanim( {
					width : {
						to : p(G).adjustWidth(D * 2)
					},
					height : {
						to : p(G).adjustHeight(B * 2)
					},
					points : {
						by : [ -D * 0.5, -B * 0.5 ]
					},
					opacity : {
						to : 0
					},
					fontSize : {
						to : 200,
						unit : "%"
					}
				}, H, e, 0.5, r, I)
			});
			return F
		},
		switchOff : function(F) {
			F = x(F);
			var D = this, E = D.dom, B = E.style, C;
			D.queueFx(F, function() {
				p(E).clearOpacity();
				p(E).clip();
				C = p(E).getFxRestore();
				function G() {
					F.useDisplay ? p(E).setDisplayed(t) : p(E).hide();
					p(E).clearOpacity();
					p(E).setPositioning(C.pos);
					B.width = C.width;
					B.height = C.height;
					p(E).afterFx(F)
				}
				p(E).fxanim( {
					opacity : {
						to : 0.3
					}
				}, y, y, 0.1, y, function() {
					p(E).clearOpacity();
					( function() {
						p(E).fxanim( {
							height : {
								to : 1
							},
							points : {
								by : [ 0, p(E).getHeight() * 0.5 ]
							}
						}, F, e, 0.3, "easeIn", G)
					}).defer(100)
				})
			});
			return D
		},
		highlight : function(D, H) {
			H = x(H);
			var F = this, G = F.dom, B = H.attr || "backgroundColor", C = {}, E;
			F.queueFx(H, function() {
				p(G).clearOpacity();
				p(G).show();
				function I() {
					G.style[B] = E;
					p(G).afterFx(H)
				}
				E = G.style[B];
				C[B] = {
					from : D || "ffff9c",
					to : H.endColor || p(G).getColor(B) || "ffffff"
				};
				arguments.callee.anim = p(G).fxanim(C, H, "color", 1, "easeIn",
						I)
			});
			return F
		},
		frame : function(B, E, H) {
			H = x(H);
			var D = this, G = D.dom, C, F;
			D.queueFx(H, function() {
				B = B || "#C3DAF9";
				if (B.length == 6) {
					B = "#" + B
				}
				E = E || 1;
				p(G).show();
				var L = p(G).getXY(), J = {
					x : L[0],
					y : L[1],
					0 : L[0],
					1 : L[1],
					width : G.offsetWidth,
					height : G.offsetHeight
				}, I = function() {
					C = p(document.body || document.documentElement)
							.createChild( {
								style : {
									visbility : w,
									position : z,
									"z-index" : 35000,
									border : "0px solid " + B
								}
							});
					return C.queueFx( {}, K)
				};
				arguments.callee.anim = {
					isAnimated : true,
					stop : function() {
						E = 0;
						C.stopFx()
					}
				};
				function K() {
					var M = Ext.isBorderBox ? 2 : 1;
					F = C.anim( {
						top : {
							from : J.y,
							to : J.y - 20
						},
						left : {
							from : J.x,
							to : J.x - 20
						},
						borderWidth : {
							from : 0,
							to : 10
						},
						opacity : {
							from : 1,
							to : 0
						},
						height : {
							from : J.height,
							to : J.height + 20 * M
						},
						width : {
							from : J.width,
							to : J.width + 20 * M
						}
					}, {
						duration : H.duration || 1,
						callback : function() {
							C.remove();
							--E > 0 ? I() : p(G).afterFx(H)
						}
					});
					arguments.callee.anim = {
						isAnimated : true,
						stop : function() {
							F.stop()
						}
					}
				}
				I()
			});
			return D
		},
		pause : function(D) {
			var C = this.dom, B;
			this.queueFx( {}, function() {
				B = setTimeout( function() {
					p(C).afterFx( {})
				}, D * 1000);
				arguments.callee.anim = {
					isAnimated : true,
					stop : function() {
						clearTimeout(B);
						p(C).afterFx( {})
					}
				}
			});
			return this
		},
		fadeIn : function(D) {
			D = x(D);
			var B = this, C = B.dom, E = D.endOpacity || 1;
			B.queueFx(D, function() {
				p(C).setOpacity(0);
				p(C).fixDisplay();
				C.style.visibility = u;
				arguments.callee.anim = p(C).fxanim( {
					opacity : {
						to : E
					}
				}, D, y, 0.5, r, function() {
					if (E == 1) {
						p(C).clearOpacity()
					}
					p(C).afterFx(D)
				})
			});
			return B
		},
		fadeOut : function(E) {
			E = x(E);
			var C = this, D = C.dom, B = D.style, F = E.endOpacity || 0;
			C
					.queueFx(
							E,
							function() {
								arguments.callee.anim = p(D)
										.fxanim(
												{
													opacity : {
														to : F
													}
												},
												E,
												y,
												0.5,
												r,
												function() {
													if (F == 0) {
														Ext.Element
																.data(D,
																		"visibilityMode") == Ext.Element.DISPLAY
																|| E.useDisplay ? B.display = "none"
																: B.visibility = w;
														p(D).clearOpacity()
													}
													p(D).afterFx(E)
												})
							});
			return C
		},
		scale : function(B, C, D) {
			this.shift(Ext.apply( {}, D, {
				width : B,
				height : C
			}));
			return this
		},
		shift : function(D) {
			D = x(D);
			var C = this.dom, B = {};
			this.queueFx(D, function() {
				for ( var E in D) {
					if (D[E] != A) {
						B[E] = {
							to : D[E]
						}
					}
				}
				B.width ? B.width.to = p(C).adjustWidth(D.width) : B;
				B.height ? B.height.to = p(C).adjustWidth(D.height) : B;
				if (B.x || B.y || B.xy) {
					B.points = B.xy
							|| {
								to : [ B.x ? B.x.to : p(C).getX(),
										B.y ? B.y.to : p(C).getY() ]
							}
				}
				arguments.callee.anim = p(C).fxanim(B, D, e, 0.35, r,
						function() {
							p(C).afterFx(D)
						})
			});
			return this
		},
		ghost : function(E, C) {
			C = x(C);
			var G = this, D = G.dom, J = D.style, H = {
				opacity : {
					to : 0
				},
				points : {}
			}, K = H.points, B, I, F;
			E = E || "b";
			G.queueFx(C, function() {
				B = p(D).getFxRestore();
				I = p(D).getWidth();
				F = p(D).getHeight();
				function L() {
					C.useDisplay ? p(D).setDisplayed(t) : p(D).hide();
					p(D).clearOpacity();
					p(D).setPositioning(B.pos);
					J.width = B.width;
					J.height = B.height;
					p(D).afterFx(C)
				}
				K.by = p(D).switchStatements(E.toLowerCase(), function(N, M) {
					return [ N, M ]
				}, {
					t : [ 0, -F ],
					l : [ -I, 0 ],
					r : [ I, 0 ],
					b : [ 0, F ],
					tl : [ -I, -F ],
					bl : [ -I, F ],
					br : [ I, F ],
					tr : [ I, -F ]
				});
				arguments.callee.anim = p(D).fxanim(H, C, e, 0.5, r, L)
			});
			return G
		},
		syncFx : function() {
			var B = this;
			B.fxDefaults = Ext.apply(B.fxDefaults || {}, {
				block : t,
				concurrent : k,
				stopFx : t
			});
			return B
		},
		sequenceFx : function() {
			var B = this;
			B.fxDefaults = Ext.apply(B.fxDefaults || {}, {
				block : t,
				concurrent : t,
				stopFx : t
			});
			return B
		},
		nextFx : function() {
			var B = c(this.dom.id)[0];
			if (B) {
				B.call(this)
			}
		},
		hasActiveFx : function() {
			return c(this.dom.id)[0]
		},
		stopFx : function(B) {
			var C = this, E = C.dom.id;
			if (C.hasActiveFx()) {
				var D = c(E)[0];
				if (D && D.anim) {
					if (D.anim.isAnimated) {
						b(E, [ D ]);
						D.anim.stop(B !== undefined ? B : k)
					} else {
						b(E, [])
					}
				}
			}
			return C
		},
		beforeFx : function(B) {
			if (this.hasActiveFx() && !B.concurrent) {
				if (B.stopFx) {
					this.stopFx();
					return k
				}
				return t
			}
			return k
		},
		hasFxBlock : function() {
			var B = c(this.dom.id);
			return B && B[0] && B[0].block
		},
		queueFx : function(E, B) {
			var C = this;
			if (!C.hasFxBlock()) {
				Ext.applyIf(E, C.fxDefaults);
				if (!E.concurrent) {
					var D = C.beforeFx(E);
					B.block = E.block;
					c(C.dom.id).push(B);
					if (D) {
						C.nextFx()
					}
				} else {
					B.call(C)
				}
			}
			return C
		},
		fxWrap : function(H, F, D) {
			var E = this.dom, C, B;
			if (!F.wrap || !(C = Ext.getDom(F.wrap))) {
				if (F.fixPosition) {
					B = p(E).getXY()
				}
				var G = document.createElement("div");
				G.style.visibility = D;
				C = E.parentNode.insertBefore(G, E);
				p(C).setPositioning(H);
				if (p(C).isStyle(o, "static")) {
					p(C).position("relative")
				}
				p(E).clearPositioning("auto");
				p(C).clip();
				C.appendChild(E);
				if (B) {
					p(C).setXY(B)
				}
			}
			return C
		},
		fxUnwrap : function(B, E, D) {
			var C = this.dom;
			p(C).clearPositioning();
			p(C).setPositioning(E);
			if (!D.wrap) {
				B.parentNode.insertBefore(C, B);
				p(B).remove()
			}
		},
		getFxRestore : function() {
			var B = this.dom.style;
			return {
				pos : this.getPositioning(),
				width : B.width,
				height : B.height
			}
		},
		afterFx : function(C) {
			var B = this.dom, E = B.id, D = !C.concurrent;
			if (C.afterStyle) {
				p(B).setStyle(C.afterStyle)
			}
			if (C.afterCls) {
				p(B).addClass(C.afterCls)
			}
			if (C.remove == k) {
				p(B).remove()
			}
			if (D) {
				c(E).shift()
			}
			if (C.callback) {
				C.callback.call(C.scope, p(B))
			}
			if (D) {
				p(B).nextFx()
			}
		},
		fxanim : function(E, F, C, G, D, B) {
			C = C || "run";
			F = F || {};
			var H = Ext.lib.Anim[C](this.dom, E, (F.duration || G) || 0.35,
					(F.easing || D) || r, B, this);
			F.anim = H;
			return H
		}
	};
	Ext.Fx.resize = Ext.Fx.scale;
	Ext.Element.addMethods(Ext.Fx)
})();
Ext.CompositeElementLite = function(b, a) {
	this.elements = [];
	this.add(b, a);
	this.el = new Ext.Element.Flyweight()
};
Ext.CompositeElementLite.prototype = {
	isComposite : true,
	getCount : function() {
		return this.elements.length
	},
	add : function(b) {
		if (b) {
			if (Ext.isArray(b)) {
				this.elements = this.elements.concat(b)
			} else {
				var a = this.elements;
				Ext.each(b, function(c) {
					a.push(c)
				})
			}
		}
		return this
	},
	invoke : function(d, a) {
		var b = this.elements, c = this.el;
		Ext.each(b, function(g) {
			c.dom = g;
			Ext.Element.prototype[d].apply(c, a)
		});
		return this
	},
	item : function(a) {
		var b = this;
		if (!b.elements[a]) {
			return null
		}
		b.el.dom = b.elements[a];
		return b.el
	},
	addListener : function(a, d, c, b) {
		Ext.each(this.elements, function(g) {
			Ext.EventManager.on(g, a, d, c || g, b)
		});
		return this
	},
	each : function(c, b) {
		var d = this, a = d.el;
		Ext.each(d.elements, function(h, g) {
			a.dom = h;
			return c.call(b || a, a, d, g)
		});
		return d
	},
	indexOf : function(a) {
		return this.elements.indexOf(Ext.getDom(a))
	},
	replaceElement : function(e, c, a) {
		var b = !isNaN(e) ? e : this.indexOf(e), g;
		if (b > -1) {
			c = Ext.getDom(c);
			if (a) {
				g = this.elements[b];
				g.parentNode.insertBefore(c, g);
				Ext.removeNode(g)
			}
			this.elements.splice(b, 1, c)
		}
		return this
	},
	clear : function() {
		this.elements = []
	}
};
Ext.CompositeElementLite.prototype.on = Ext.CompositeElementLite.prototype.addListener;
( function() {
	var c, b = Ext.Element.prototype, a = Ext.CompositeElementLite.prototype;
	for (c in b) {
		if (Ext.isFunction(b[c])) {
			( function(d) {
				a[d] = a[d] || function() {
					return this.invoke(d, arguments)
				}
			}).call(a, c)
		}
	}
})();
if (Ext.DomQuery) {
	Ext.Element.selectorFunction = Ext.DomQuery.select
}
Ext.Element.select = function(a, d, b) {
	var c;
	if (typeof a == "string") {
		c = Ext.Element.selectorFunction(a, b)
	} else {
		if (a.length !== undefined) {
			c = a
		} else {
			throw "Invalid selector"
		}
	}
	return new Ext.CompositeElementLite(c)
};
Ext.select = Ext.Element.select;
Ext.apply(Ext.CompositeElementLite.prototype, {
	addElements : function(c, a) {
		if (!c) {
			return this
		}
		if (typeof c == "string") {
			c = Ext.Element.selectorFunction(c, a)
		}
		var b = this.elements;
		Ext.each(c, function(d) {
			b.push(Ext.get(d))
		});
		return this
	},
	fill : function(a) {
		this.elements = [];
		this.add(a);
		return this
	},
	first : function() {
		return this.item(0)
	},
	last : function() {
		return this.item(this.getCount() - 1)
	},
	contains : function(a) {
		return this.indexOf(a) != -1
	},
	filter : function(a) {
		var b = [];
		this.each( function(c) {
			if (c.is(a)) {
				b[b.length] = c.dom
			}
		});
		this.fill(b);
		return this
	},
	removeElement : function(d, e) {
		var c = this, a = this.elements, b;
		Ext.each(d, function(g) {
			if ((b = (a[g] || a[g = c.indexOf(g)]))) {
				if (e) {
					if (b.dom) {
						b.remove()
					} else {
						Ext.removeNode(b)
					}
				}
				a.splice(g, 1)
			}
		});
		return this
	}
});
Ext.CompositeElement = function(b, a) {
	this.elements = [];
	this.add(b, a)
};
Ext.extend(Ext.CompositeElement, Ext.CompositeElementLite, {
	invoke : function(b, a) {
		Ext.each(this.elements, function(c) {
			Ext.Element.prototype[b].apply(c, a)
		});
		return this
	},
	add : function(c, a) {
		if (!c) {
			return this
		}
		if (typeof c == "string") {
			c = Ext.Element.selectorFunction(c, a)
		}
		var b = this.elements;
		Ext.each(c, function(d) {
			b.push(Ext.get(d))
		});
		return this
	},
	item : function(a) {
		return this.elements[a] || null
	},
	indexOf : function(a) {
		return this.elements.indexOf(Ext.get(a))
	},
	filter : function(a) {
		var c = this, b = [];
		Ext.each(c.elements, function(d) {
			if (d.is(a)) {
				b.push(Ext.get(d))
			}
		});
		c.elements = b;
		return c
	},
	each : function(b, a) {
		Ext.each(this.elements, function(d, c) {
			return b.call(a || d, d, this, c)
		}, this);
		return this
	}
});
Ext.Element.select = function(a, d, b) {
	var c;
	if (typeof a == "string") {
		c = Ext.Element.selectorFunction(a, b)
	} else {
		if (a.length !== undefined) {
			c = a
		} else {
			throw "Invalid selector"
		}
	}
	return (d === true) ? new Ext.CompositeElement(c)
			: new Ext.CompositeElementLite(c)
};
Ext.select = Ext.Element.select;
( function() {
	var c = "beforerequest", l = "requestcomplete", k = "requestexception", e = undefined, i = "load", h = "POST", j = "GET", g = window;
	Ext.data.Connection = function(m) {
		Ext.apply(this, m);
		this.addEvents(c, l, k);
		Ext.data.Connection.superclass.constructor.call(this)
	};
	function b(m) {
		this.transId = false;
		var n = m.argument.options;
		m.argument = n ? n.argument : null;
		this.fireEvent(l, this, m, n);
		if (n.success) {
			n.success.call(n.scope, m, n)
		}
		if (n.callback) {
			n.callback.call(n.scope, n, true, m)
		}
	}
	function d(m, o) {
		this.transId = false;
		var n = m.argument.options;
		m.argument = n ? n.argument : null;
		this.fireEvent(k, this, m, n, o);
		if (n.failure) {
			n.failure.call(n.scope, m, n)
		}
		if (n.callback) {
			n.callback.call(n.scope, n, false, m)
		}
	}
	function a(t, m, n) {
		var p = Ext.id(), z = document, u = z.createElement("iframe"), q = Ext
				.getDom(t.form), y = [], x, s = "multipart/form-data", r = {
			target : q.target,
			method : q.method,
			encoding : q.encoding,
			enctype : q.enctype,
			action : q.action
		};
		Ext.apply(u, {
			id : p,
			name : p,
			className : "x-hidden",
			src : Ext.SSL_SECURE_URL
		});
		z.body.appendChild(u);
		if (Ext.isIE) {
			document.frames[p].name = p
		}
		Ext.apply(q, {
			target : p,
			method : h,
			enctype : s,
			encoding : s,
			action : n || r.action
		});
		m = Ext.urlDecode(m, false);
		for ( var w in m) {
			if (m.hasOwnProperty(w)) {
				x = z.createElement("input");
				x.type = "hidden";
				x.value = m[x.name = w];
				q.appendChild(x);
				y.push(x)
			}
		}
		function v() {
			var B = this, A = {
				responseText : "",
				responseXML : null,
				argument : t.argument
			}, E, D;
			try {
				E = u.contentWindow.document || u.contentDocument
						|| g.frames[p].document;
				if (E) {
					if (E.body) {
						if (/textarea/i
								.test((D = E.body.firstChild || {}).tagName)) {
							A.responseText = D.value
						} else {
							A.responseText = E.body.innerHTML
						}
					}
					A.responseXML = E.XMLDocument || E
				}
			} catch (C) {
			}
			Ext.EventManager.removeListener(u, i, v, B);
			B.fireEvent(l, B, A, t);
			function o(H, G, F) {
				if (Ext.isFunction(H)) {
					H.apply(G, F)
				}
			}
			o(t.success, t.scope, [ A, t ]);
			o(t.callback, t.scope, [ t, true, A ]);
			if (!B.debugUploads) {
				setTimeout( function() {
					Ext.removeNode(u)
				}, 100)
			}
		}
		Ext.EventManager.on(u, i, v, this);
		q.submit();
		Ext.apply(q, r);
		Ext.each(y, function(o) {
			Ext.removeNode(o)
		})
	}
	Ext.extend(Ext.data.Connection, Ext.util.Observable, {
		timeout : 30000,
		autoAbort : false,
		disableCaching : true,
		disableCachingParam : "_dc",
		request : function(s) {
			var v = this;
			if (v.fireEvent(c, v, s)) {
				if (s.el) {
					if (!Ext.isEmpty(s.indicatorText)) {
						v.indicatorText = '<div class="loading-indicator">'
								+ s.indicatorText + "</div>"
					}
					if (v.indicatorText) {
						Ext.getDom(s.el).innerHTML = v.indicatorText
					}
					s.success = (Ext.isFunction(s.success) ? s.success
							: function() {
							}).createInterceptor( function(o) {
						Ext.getDom(s.el).innerHTML = o.responseText
					})
				}
				var q = s.params, n = s.url || v.url, m, t = {
					success : b,
					failure : d,
					scope : v,
					argument : {
						options : s
					},
					timeout : s.timeout || v.timeout
				}, r, w;
				if (Ext.isFunction(q)) {
					q = q.call(s.scope || g, s)
				}
				q = Ext.urlEncode(v.extraParams, Ext.isObject(q) ? Ext
						.urlEncode(q) : q);
				if (Ext.isFunction(n)) {
					n = n.call(s.scope || g, s)
				}
				if ((r = Ext.getDom(s.form))) {
					n = n || r.action;
					if (s.isUpload
							|| /multipart\/form-data/i.test(r
									.getAttribute("enctype"))) {
						return a.call(v, s, q, n)
					}
					w = Ext.lib.Ajax.serializeForm(r);
					q = q ? (q + "&" + w) : w
				}
				m = s.method || v.method
						|| ((q || s.xmlData || s.jsonData) ? h : j);
				if (m === j && (v.disableCaching && s.disableCaching !== false)
						|| s.disableCaching === true) {
					var u = s.disableCachingParam || v.disableCachingParam;
					n = Ext.urlAppend(n, u + "=" + (new Date().getTime()))
				}
				s.headers = Ext.apply(s.headers || {}, v.defaultHeaders || {});
				if (s.autoAbort === true || v.autoAbort) {
					v.abort()
				}
				if ((m == j || s.xmlData || s.jsonData) && q) {
					n = Ext.urlAppend(n, q);
					q = ""
				}
				return (v.transId = Ext.lib.Ajax.request(m, n, t, q, s))
			} else {
				return s.callback ? s.callback.apply(s.scope, [ s, e, e ])
						: null
			}
		},
		isLoading : function(m) {
			return m ? Ext.lib.Ajax.isCallInProgress(m) : !!this.transId
		},
		abort : function(m) {
			if (m || this.isLoading()) {
				Ext.lib.Ajax.abort(m || this.transId)
			}
		}
	})
})();
Ext.Ajax = new Ext.data.Connection( {
	autoAbort : false,
	serializeForm : function(a) {
		return Ext.lib.Ajax.serializeForm(a)
	}
});
Ext.UpdateManager = Ext.Updater = Ext.extend(Ext.util.Observable, function() {
	var b = "beforeupdate", d = "update", c = "failure";
	function a(h) {
		var i = this;
		i.transaction = null;
		if (h.argument.form && h.argument.reset) {
			try {
				h.argument.form.reset()
			} catch (j) {
			}
		}
		if (i.loadScripts) {
			i.renderer.render(i.el, h, i, g.createDelegate(i, [ h ]))
		} else {
			i.renderer.render(i.el, h, i);
			g.call(i, h)
		}
	}
	function g(h, i, j) {
		this.fireEvent(i || d, this.el, h);
		if (Ext.isFunction(h.argument.callback)) {
			h.argument.callback.call(h.argument.scope, this.el,
					Ext.isEmpty(j) ? true : false, h, h.argument.options)
		}
	}
	function e(h) {
		g.call(this, h, c, !!(this.transaction = null))
	}
	return {
		constructor : function(i, h) {
			var j = this;
			i = Ext.get(i);
			if (!h && i.updateManager) {
				return i.updateManager
			}
			j.el = i;
			j.defaultUrl = null;
			j.addEvents(b, d, c);
			Ext.apply(j, Ext.Updater.defaults);
			j.transaction = null;
			j.refreshDelegate = j.refresh.createDelegate(j);
			j.updateDelegate = j.update.createDelegate(j);
			j.formUpdateDelegate = (j.formUpdate || function() {
			}).createDelegate(j);
			j.renderer = j.renderer || j.getDefaultRenderer();
			Ext.Updater.superclass.constructor.call(j)
		},
		setRenderer : function(h) {
			this.renderer = h
		},
		getRenderer : function() {
			return this.renderer
		},
		getDefaultRenderer : function() {
			return new Ext.Updater.BasicRenderer()
		},
		setDefaultUrl : function(h) {
			this.defaultUrl = h
		},
		getEl : function() {
			return this.el
		},
		update : function(i, n, p, l) {
			var k = this, h, j;
			if (k.fireEvent(b, k.el, i, n) !== false) {
				if (Ext.isObject(i)) {
					h = i;
					i = h.url;
					n = n || h.params;
					p = p || h.callback;
					l = l || h.discardUrl;
					j = h.scope;
					if (!Ext.isEmpty(h.nocache)) {
						k.disableCaching = h.nocache
					}
					if (!Ext.isEmpty(h.text)) {
						k.indicatorText = '<div class="loading-indicator">'
								+ h.text + "</div>"
					}
					if (!Ext.isEmpty(h.scripts)) {
						k.loadScripts = h.scripts
					}
					if (!Ext.isEmpty(h.timeout)) {
						k.timeout = h.timeout
					}
				}
				k.showLoading();
				if (!l) {
					k.defaultUrl = i
				}
				if (Ext.isFunction(i)) {
					i = i.call(k)
				}
				var m = Ext.apply( {},
						{
							url : i,
							params : (Ext.isFunction(n) && j) ? n
									.createDelegate(j) : n,
							success : a,
							failure : e,
							scope : k,
							callback : undefined,
							timeout : (k.timeout * 1000),
							disableCaching : k.disableCaching,
							argument : {
								options : h,
								url : i,
								form : null,
								callback : p,
								scope : j || window,
								params : n
							}
						}, h);
				k.transaction = Ext.Ajax.request(m)
			}
		},
		formUpdate : function(k, h, j, l) {
			var i = this;
			if (i.fireEvent(b, i.el, k, h) !== false) {
				if (Ext.isFunction(h)) {
					h = h.call(i)
				}
				k = Ext.getDom(k);
				i.transaction = Ext.Ajax.request( {
					form : k,
					url : h,
					success : a,
					failure : e,
					scope : i,
					timeout : (i.timeout * 1000),
					argument : {
						url : h,
						form : k,
						callback : l,
						reset : j
					}
				});
				i.showLoading.defer(1, i)
			}
		},
		startAutoRefresh : function(i, j, l, m, h) {
			var k = this;
			if (h) {
				k.update(j || k.defaultUrl, l, m, true)
			}
			if (k.autoRefreshProcId) {
				clearInterval(k.autoRefreshProcId)
			}
			k.autoRefreshProcId = setInterval(k.update.createDelegate(k, [
					j || k.defaultUrl, l, m, true ]), i * 1000)
		},
		stopAutoRefresh : function() {
			if (this.autoRefreshProcId) {
				clearInterval(this.autoRefreshProcId);
				delete this.autoRefreshProcId
			}
		},
		isAutoRefreshing : function() {
			return !!this.autoRefreshProcId
		},
		showLoading : function() {
			if (this.showLoadIndicator) {
				this.el.dom.innerHTML = this.indicatorText
			}
		},
		abort : function() {
			if (this.transaction) {
				Ext.Ajax.abort(this.transaction)
			}
		},
		isUpdating : function() {
			return this.transaction ? Ext.Ajax.isLoading(this.transaction)
					: false
		},
		refresh : function(h) {
			if (this.defaultUrl) {
				this.update(this.defaultUrl, null, h, true)
			}
		}
	}
}());
Ext.Updater.defaults = {
	timeout : 30,
	disableCaching : false,
	showLoadIndicator : true,
	indicatorText : '<div class="loading-indicator">Loading...</div>',
	loadScripts : false,
	sslBlankUrl : (Ext.SSL_SECURE_URL || "javascript:false")
};
Ext.Updater.updateElement = function(d, c, e, b) {
	var a = Ext.get(d).getUpdater();
	Ext.apply(a, b);
	a.update(c, e, b ? b.callback : null)
};
Ext.Updater.BasicRenderer = function() {
};
Ext.Updater.BasicRenderer.prototype = {
	render : function(c, a, b, d) {
		c.update(a.responseText, b.loadScripts, d)
	}
};
( function() {
	Date.useStrict = false;
	function b(d) {
		var c = Array.prototype.slice.call(arguments, 1);
		return d.replace(/\{(\d+)\}/g, function(e, g) {
			return c[g]
		})
	}
	Date.formatCodeToRegex = function(d, c) {
		var e = Date.parseCodes[d];
		if (e) {
			e = typeof e == "function" ? e() : e;
			Date.parseCodes[d] = e
		}
		return e ? Ext.applyIf( {
			c : e.c ? b(e.c, c || "{0}") : e.c
		}, e) : {
			g : 0,
			c : null,
			s : Ext.escapeRe(d)
		}
	};
	var a = Date.formatCodeToRegex;
	Ext
			.apply(
					Date,
					{
						parseFunctions : {
							"M$" : function(d, c) {
								var e = new RegExp(
										"\\/Date\\(([-+])?(\\d+)(?:[+-]\\d{4})?\\)\\/");
								var g = (d || "").match(e);
								return g ? new Date(((g[1] || "") + g[2]) * 1)
										: null
							}
						},
						parseRegexes : [],
						formatFunctions : {
							"M$" : function() {
								return "\\/Date(" + this.getTime() + ")\\/"
							}
						},
						y2kYear : 50,
						MILLI : "ms",
						SECOND : "s",
						MINUTE : "mi",
						HOUR : "h",
						DAY : "d",
						MONTH : "mo",
						YEAR : "y",
						defaults : {},
						dayNames : [ "Sunday", "Monday", "Tuesday",
								"Wednesday", "Thursday", "Friday", "Saturday" ],
						monthNames : [ "January", "February", "March", "April",
								"May", "June", "July", "August", "September",
								"October", "November", "December" ],
						monthNumbers : {
							Jan : 0,
							Feb : 1,
							Mar : 2,
							Apr : 3,
							May : 4,
							Jun : 5,
							Jul : 6,
							Aug : 7,
							Sep : 8,
							Oct : 9,
							Nov : 10,
							Dec : 11
						},
						getShortMonthName : function(c) {
							return Date.monthNames[c].substring(0, 3)
						},
						getShortDayName : function(c) {
							return Date.dayNames[c].substring(0, 3)
						},
						getMonthNumber : function(c) {
							return Date.monthNumbers[c.substring(0, 1)
									.toUpperCase()
									+ c.substring(1, 3).toLowerCase()]
						},
						formatCodes : {
							d : "String.leftPad(this.getDate(), 2, '0')",
							D : "Date.getShortDayName(this.getDay())",
							j : "this.getDate()",
							l : "Date.dayNames[this.getDay()]",
							N : "(this.getDay() ? this.getDay() : 7)",
							S : "this.getSuffix()",
							w : "this.getDay()",
							z : "this.getDayOfYear()",
							W : "String.leftPad(this.getWeekOfYear(), 2, '0')",
							F : "Date.monthNames[this.getMonth()]",
							m : "String.leftPad(this.getMonth() + 1, 2, '0')",
							M : "Date.getShortMonthName(this.getMonth())",
							n : "(this.getMonth() + 1)",
							t : "this.getDaysInMonth()",
							L : "(this.isLeapYear() ? 1 : 0)",
							o : "(this.getFullYear() + (this.getWeekOfYear() == 1 && this.getMonth() > 0 ? +1 : (this.getWeekOfYear() >= 52 && this.getMonth() < 11 ? -1 : 0)))",
							Y : "this.getFullYear()",
							y : "('' + this.getFullYear()).substring(2, 4)",
							a : "(this.getHours() < 12 ? 'am' : 'pm')",
							A : "(this.getHours() < 12 ? 'AM' : 'PM')",
							g : "((this.getHours() % 12) ? this.getHours() % 12 : 12)",
							G : "this.getHours()",
							h : "String.leftPad((this.getHours() % 12) ? this.getHours() % 12 : 12, 2, '0')",
							H : "String.leftPad(this.getHours(), 2, '0')",
							i : "String.leftPad(this.getMinutes(), 2, '0')",
							s : "String.leftPad(this.getSeconds(), 2, '0')",
							u : "String.leftPad(this.getMilliseconds(), 3, '0')",
							O : "this.getGMTOffset()",
							P : "this.getGMTOffset(true)",
							T : "this.getTimezone()",
							Z : "(this.getTimezoneOffset() * -60)",
							c : function() {
								for ( var k = "Y-m-dTH:i:sP", h = [], g = 0, d = k.length; g < d; ++g) {
									var j = k.charAt(g);
									h.push(j == "T" ? "'T'" : Date
											.getFormatCode(j))
								}
								return h.join(" + ")
							},
							U : "Math.round(this.getTime() / 1000)"
						},
						isValid : function(o, c, n, k, g, j, e) {
							k = k || 0;
							g = g || 0;
							j = j || 0;
							e = e || 0;
							var l = new Date(o, c - 1, n, k, g, j, e);
							return o == l.getFullYear()
									&& c == l.getMonth() + 1
									&& n == l.getDate() && k == l.getHours()
									&& g == l.getMinutes()
									&& j == l.getSeconds()
									&& e == l.getMilliseconds()
						},
						parseDate : function(d, g, c) {
							var e = Date.parseFunctions;
							if (e[g] == null) {
								Date.createParser(g)
							}
							return e[g](d, Ext.isDefined(c) ? c
									: Date.useStrict)
						},
						getFormatCode : function(d) {
							var c = Date.formatCodes[d];
							if (c) {
								c = typeof c == "function" ? c() : c;
								Date.formatCodes[d] = c
							}
							return c || ("'" + String.escape(d) + "'")
						},
						createFormat : function(h) {
							var g = [], c = false, e = "";
							for ( var d = 0; d < h.length; ++d) {
								e = h.charAt(d);
								if (!c && e == "\\") {
									c = true
								} else {
									if (c) {
										c = false;
										g.push("'" + String.escape(e) + "'")
									} else {
										g.push(Date.getFormatCode(e))
									}
								}
							}
							Date.formatFunctions[h] = new Function("return "
									+ g.join("+"))
						},
						createParser : function() {
							var c = [
									"var dt, y, m, d, h, i, s, ms, o, z, zz, u, v,",
									"def = Date.defaults,",
									"results = String(input).match(Date.parseRegexes[{0}]);",
									"if(results){",
									"{1}",
									"if(u != null){",
									"v = new Date(u * 1000);",
									"}else{",
									"dt = (new Date()).clearTime();",
									"y = y >= 0? y : Ext.num(def.y, dt.getFullYear());",
									"m = m >= 0? m : Ext.num(def.m - 1, dt.getMonth());",
									"d = d >= 0? d : Ext.num(def.d, dt.getDate());",
									"h  = h || Ext.num(def.h, dt.getHours());",
									"i  = i || Ext.num(def.i, dt.getMinutes());",
									"s  = s || Ext.num(def.s, dt.getSeconds());",
									"ms = ms || Ext.num(def.ms, dt.getMilliseconds());",
									"if(z >= 0 && y >= 0){",
									"v = new Date(y, 0, 1, h, i, s, ms);",
									"v = !strict? v : (strict === true && (z <= 364 || (v.isLeapYear() && z <= 365))? v.add(Date.DAY, z) : null);",
									"}else if(strict === true && !Date.isValid(y, m + 1, d, h, i, s, ms)){",
									"v = null;",
									"}else{",
									"v = new Date(y, m, d, h, i, s, ms);",
									"}",
									"}",
									"}",
									"if(v){",
									"if(zz != null){",
									"v = v.add(Date.SECOND, -v.getTimezoneOffset() * 60 - zz);",
									"}else if(o){",
									"v = v.add(Date.MINUTE, -v.getTimezoneOffset() + (sn == '+'? -1 : 1) * (hr * 60 + mn));",
									"}", "}", "return v;" ].join("\n");
							return function(m) {
								var e = Date.parseRegexes.length, n = 1, g = [], l = [], k = false, d = "";
								for ( var j = 0; j < m.length; ++j) {
									d = m.charAt(j);
									if (!k && d == "\\") {
										k = true
									} else {
										if (k) {
											k = false;
											l.push(String.escape(d))
										} else {
											var h = a(d, n);
											n += h.g;
											l.push(h.s);
											if (h.g && h.c) {
												g.push(h.c)
											}
										}
									}
								}
								Date.parseRegexes[e] = new RegExp("^"
										+ l.join("") + "$", "i");
								Date.parseFunctions[m] = new Function("input",
										"strict", b(c, e, g.join("")))
							}
						}(),
						parseCodes : {
							d : {
								g : 1,
								c : "d = parseInt(results[{0}], 10);\n",
								s : "(\\d{2})"
							},
							j : {
								g : 1,
								c : "d = parseInt(results[{0}], 10);\n",
								s : "(\\d{1,2})"
							},
							D : function() {
								for ( var c = [], d = 0; d < 7; c.push(Date
										.getShortDayName(d)), ++d) {
								}
								return {
									g : 0,
									c : null,
									s : "(?:" + c.join("|") + ")"
								}
							},
							l : function() {
								return {
									g : 0,
									c : null,
									s : "(?:" + Date.dayNames.join("|") + ")"
								}
							},
							N : {
								g : 0,
								c : null,
								s : "[1-7]"
							},
							S : {
								g : 0,
								c : null,
								s : "(?:st|nd|rd|th)"
							},
							w : {
								g : 0,
								c : null,
								s : "[0-6]"
							},
							z : {
								g : 1,
								c : "z = parseInt(results[{0}], 10);\n",
								s : "(\\d{1,3})"
							},
							W : {
								g : 0,
								c : null,
								s : "(?:\\d{2})"
							},
							F : function() {
								return {
									g : 1,
									c : "m = parseInt(Date.getMonthNumber(results[{0}]), 10);\n",
									s : "(" + Date.monthNames.join("|") + ")"
								}
							},
							M : function() {
								for ( var c = [], d = 0; d < 12; c.push(Date
										.getShortMonthName(d)), ++d) {
								}
								return Ext.applyIf( {
									s : "(" + c.join("|") + ")"
								}, a("F"))
							},
							m : {
								g : 1,
								c : "m = parseInt(results[{0}], 10) - 1;\n",
								s : "(\\d{2})"
							},
							n : {
								g : 1,
								c : "m = parseInt(results[{0}], 10) - 1;\n",
								s : "(\\d{1,2})"
							},
							t : {
								g : 0,
								c : null,
								s : "(?:\\d{2})"
							},
							L : {
								g : 0,
								c : null,
								s : "(?:1|0)"
							},
							o : function() {
								return a("Y")
							},
							Y : {
								g : 1,
								c : "y = parseInt(results[{0}], 10);\n",
								s : "(\\d{4})"
							},
							y : {
								g : 1,
								c : "var ty = parseInt(results[{0}], 10);\ny = ty > Date.y2kYear ? 1900 + ty : 2000 + ty;\n",
								s : "(\\d{1,2})"
							},
							a : {
								g : 1,
								c : "if (results[{0}] == 'am') {\nif (h == 12) { h = 0; }\n} else { if (h < 12) { h += 12; }}",
								s : "(am|pm)"
							},
							A : {
								g : 1,
								c : "if (results[{0}] == 'AM') {\nif (h == 12) { h = 0; }\n} else { if (h < 12) { h += 12; }}",
								s : "(AM|PM)"
							},
							g : function() {
								return a("G")
							},
							G : {
								g : 1,
								c : "h = parseInt(results[{0}], 10);\n",
								s : "(\\d{1,2})"
							},
							h : function() {
								return a("H")
							},
							H : {
								g : 1,
								c : "h = parseInt(results[{0}], 10);\n",
								s : "(\\d{2})"
							},
							i : {
								g : 1,
								c : "i = parseInt(results[{0}], 10);\n",
								s : "(\\d{2})"
							},
							s : {
								g : 1,
								c : "s = parseInt(results[{0}], 10);\n",
								s : "(\\d{2})"
							},
							u : {
								g : 1,
								c : "ms = results[{0}]; ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n",
								s : "(\\d+)"
							},
							O : {
								g : 1,
								c : [
										"o = results[{0}];",
										"var sn = o.substring(0,1),",
										"hr = o.substring(1,3)*1 + Math.floor(o.substring(3,5) / 60),",
										"mn = o.substring(3,5) % 60;",
										"o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + String.leftPad(hr, 2, '0') + String.leftPad(mn, 2, '0')) : null;\n" ]
										.join("\n"),
								s : "([+-]\\d{4})"
							},
							P : {
								g : 1,
								c : [
										"o = results[{0}];",
										"var sn = o.substring(0,1),",
										"hr = o.substring(1,3)*1 + Math.floor(o.substring(4,6) / 60),",
										"mn = o.substring(4,6) % 60;",
										"o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + String.leftPad(hr, 2, '0') + String.leftPad(mn, 2, '0')) : null;\n" ]
										.join("\n"),
								s : "([+-]\\d{2}:\\d{2})"
							},
							T : {
								g : 0,
								c : null,
								s : "[A-Z]{1,4}"
							},
							Z : {
								g : 1,
								c : "zz = results[{0}] * 1;\nzz = (-43200 <= zz && zz <= 50400)? zz : null;\n",
								s : "([+-]?\\d{1,5})"
							},
							c : function() {
								var e = [], c = [
										a("Y", 1),
										a("m", 2),
										a("d", 3),
										a("h", 4),
										a("i", 5),
										a("s", 6),
										{
											c : "ms = results[7] || '0'; ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n"
										},
										{
											c : [
													"if(results[8]) {",
													"if(results[8] == 'Z'){",
													"zz = 0;",
													"}else if (results[8].indexOf(':') > -1){",
													a("P", 8).c, "}else{",
													a("O", 8).c, "}", "}" ]
													.join("\n")
										} ];
								for ( var g = 0, d = c.length; g < d; ++g) {
									e.push(c[g].c)
								}
								return {
									g : 1,
									c : e.join(""),
									s : [ c[0].s, "(?:", "-", c[1].s, "(?:",
											"-", c[2].s, "(?:", "(?:T| )?",
											c[3].s, ":", c[4].s, "(?::",
											c[5].s, ")?",
											"(?:(?:\\.|,)(\\d+))?",
											"(Z|(?:[-+]\\d{2}(?::)?\\d{2}))?",
											")?", ")?", ")?" ].join("")
								}
							},
							U : {
								g : 1,
								c : "u = parseInt(results[{0}], 10);\n",
								s : "(-?\\d+)"
							}
						}
					})
}());
Ext
		.apply(
				Date.prototype,
				{
					dateFormat : function(a) {
						if (Date.formatFunctions[a] == null) {
							Date.createFormat(a)
						}
						return Date.formatFunctions[a].call(this)
					},
					getTimezone : function() {
						return this
								.toString()
								.replace(
										/^.* (?:\((.*)\)|([A-Z]{1,4})(?:[\-+][0-9]{4})?(?: -?\d+)?)$/,
										"$1$2").replace(/[^A-Z]/g, "")
					},
					getGMTOffset : function(a) {
						return (this.getTimezoneOffset() > 0 ? "-" : "+")
								+ String.leftPad(Math.floor(Math.abs(this
										.getTimezoneOffset()) / 60), 2, "0")
								+ (a ? ":" : "")
								+ String.leftPad(Math.abs(this
										.getTimezoneOffset() % 60), 2, "0")
					},
					getDayOfYear : function() {
						var c = 0, b = 0, e = this.clone(), a = this.getMonth();
						for (c = 0, e.setMonth(0); c < a; e.setMonth(++c)) {
							b += e.getDaysInMonth()
						}
						return b + this.getDate() - 1
					},
					getWeekOfYear : function() {
						var a = 86400000, b = 7 * a;
						return function() {
							var d = Date.UTC(this.getFullYear(), this
									.getMonth(), this.getDate() + 3)
									/ a, c = Math.floor(d / 7), e = new Date(c
									* b).getUTCFullYear();
							return c - Math.floor(Date.UTC(e, 0, 7) / b) + 1
						}
					}(),
					isLeapYear : function() {
						var a = this.getFullYear();
						return !!((a & 3) == 0 && (a % 100 || (a % 400 == 0 && a)))
					},
					getFirstDayOfMonth : function() {
						var a = (this.getDay() - (this.getDate() - 1)) % 7;
						return (a < 0) ? (a + 7) : a
					},
					getLastDayOfMonth : function() {
						return this.getLastDateOfMonth().getDay()
					},
					getFirstDateOfMonth : function() {
						return new Date(this.getFullYear(), this.getMonth(), 1)
					},
					getLastDateOfMonth : function() {
						return new Date(this.getFullYear(), this.getMonth(),
								this.getDaysInMonth())
					},
					getDaysInMonth : function() {
						var a = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30,
								31 ];
						return function() {
							var b = this.getMonth();
							return b == 1 && this.isLeapYear() ? 29 : a[b]
						}
					}(),
					getSuffix : function() {
						switch (this.getDate()) {
						case 1:
						case 21:
						case 31:
							return "st";
						case 2:
						case 22:
							return "nd";
						case 3:
						case 23:
							return "rd";
						default:
							return "th"
						}
					},
					clone : function() {
						return new Date(this.getTime())
					},
					isDST : function() {
						return new Date(this.getFullYear(), 0, 1)
								.getTimezoneOffset() != this
								.getTimezoneOffset()
					},
					clearTime : function(g) {
						if (g) {
							return this.clone().clearTime()
						}
						var b = this.getDate();
						this.setHours(0);
						this.setMinutes(0);
						this.setSeconds(0);
						this.setMilliseconds(0);
						if (this.getDate() != b) {
							for ( var a = 1, e = this.add(Date.HOUR, a); e
									.getDate() != b; a++, e = this.add(
									Date.HOUR, a)) {
							}
							this.setDate(b);
							this.setHours(e.getHours())
						}
						return this
					},
					add : function(b, c) {
						var e = this.clone();
						if (!b || c === 0) {
							return e
						}
						switch (b.toLowerCase()) {
						case Date.MILLI:
							e.setMilliseconds(this.getMilliseconds() + c);
							break;
						case Date.SECOND:
							e.setSeconds(this.getSeconds() + c);
							break;
						case Date.MINUTE:
							e.setMinutes(this.getMinutes() + c);
							break;
						case Date.HOUR:
							e.setHours(this.getHours() + c);
							break;
						case Date.DAY:
							e.setDate(this.getDate() + c);
							break;
						case Date.MONTH:
							var a = this.getDate();
							if (a > 28) {
								a = Math
										.min(a, this.getFirstDateOfMonth().add(
												"mo", c).getLastDateOfMonth()
												.getDate())
							}
							e.setDate(a);
							e.setMonth(this.getMonth() + c);
							break;
						case Date.YEAR:
							e.setFullYear(this.getFullYear() + c);
							break
						}
						return e
					},
					between : function(c, a) {
						var b = this.getTime();
						return c.getTime() <= b && b <= a.getTime()
					}
				});
Date.prototype.format = Date.prototype.dateFormat;
if (Ext.isSafari
		&& (navigator.userAgent.match(/WebKit\/(\d+)/)[1] || NaN) < 420) {
	Ext
			.apply(
					Date.prototype,
					{
						_xMonth : Date.prototype.setMonth,
						_xDate : Date.prototype.setDate,
						setMonth : function(a) {
							if (a <= -1) {
								var d = Math.ceil(-a), c = Math.ceil(d / 12), b = (d % 12) ? 12 - d % 12
										: 0;
								this.setFullYear(this.getFullYear() - c);
								return this._xMonth(b)
							} else {
								return this._xMonth(a)
							}
						},
						setDate : function(a) {
							return this.setTime(this.getTime()
									- (this.getDate() - a) * 86400000)
						}
					})
}
Ext.util.DelayedTask = function(d, c, a) {
	var e = this, g, b = function() {
		clearInterval(g);
		g = null;
		d.apply(c, a || [])
	};
	e.delay = function(i, k, j, h) {
		e.cancel();
		d = k || d;
		c = j || c;
		a = h || a;
		g = setInterval(b, i)
	};
	e.cancel = function() {
		if (g) {
			clearInterval(g);
			g = null
		}
	}
};
Ext.util.MixedCollection = function(b, a) {
	this.items = [];
	this.map = {};
	this.keys = [];
	this.length = 0;
	this.addEvents("clear", "add", "replace", "remove", "sort");
	this.allowFunctions = b === true;
	if (a) {
		this.getKey = a
	}
	Ext.util.MixedCollection.superclass.constructor.call(this)
};
Ext
		.extend(
				Ext.util.MixedCollection,
				Ext.util.Observable,
				{
					allowFunctions : false,
					add : function(b, c) {
						if (arguments.length == 1) {
							c = arguments[0];
							b = this.getKey(c)
						}
						if (typeof b != "undefined" && b !== null) {
							var a = this.map[b];
							if (typeof a != "undefined") {
								return this.replace(b, c)
							}
							this.map[b] = c
						}
						this.length++;
						this.items.push(c);
						this.keys.push(b);
						this.fireEvent("add", this.length - 1, c, b);
						return c
					},
					getKey : function(a) {
						return a.id
					},
					replace : function(c, d) {
						if (arguments.length == 1) {
							d = arguments[0];
							c = this.getKey(d)
						}
						var a = this.map[c];
						if (typeof c == "undefined" || c === null
								|| typeof a == "undefined") {
							return this.add(c, d)
						}
						var b = this.indexOfKey(c);
						this.items[b] = d;
						this.map[c] = d;
						this.fireEvent("replace", c, a, d);
						return d
					},
					addAll : function(e) {
						if (arguments.length > 1 || Ext.isArray(e)) {
							var b = arguments.length > 1 ? arguments : e;
							for ( var d = 0, a = b.length; d < a; d++) {
								this.add(b[d])
							}
						} else {
							for ( var c in e) {
								if (this.allowFunctions
										|| typeof e[c] != "function") {
									this.add(c, e[c])
								}
							}
						}
					},
					each : function(e, d) {
						var b = [].concat(this.items);
						for ( var c = 0, a = b.length; c < a; c++) {
							if (e.call(d || b[c], b[c], c, a) === false) {
								break
							}
						}
					},
					eachKey : function(d, c) {
						for ( var b = 0, a = this.keys.length; b < a; b++) {
							d.call(c || window, this.keys[b], this.items[b], b,
									a)
						}
					},
					find : function(d, c) {
						for ( var b = 0, a = this.items.length; b < a; b++) {
							if (d
									.call(c || window, this.items[b],
											this.keys[b])) {
								return this.items[b]
							}
						}
						return null
					},
					insert : function(a, b, c) {
						if (arguments.length == 2) {
							c = arguments[1];
							b = this.getKey(c)
						}
						if (this.containsKey(b)) {
							this.suspendEvents();
							this.removeKey(b);
							this.resumeEvents()
						}
						if (a >= this.length) {
							return this.add(b, c)
						}
						this.length++;
						this.items.splice(a, 0, c);
						if (typeof b != "undefined" && b !== null) {
							this.map[b] = c
						}
						this.keys.splice(a, 0, b);
						this.fireEvent("add", a, c, b);
						return c
					},
					remove : function(a) {
						return this.removeAt(this.indexOf(a))
					},
					removeAt : function(a) {
						if (a < this.length && a >= 0) {
							this.length--;
							var c = this.items[a];
							this.items.splice(a, 1);
							var b = this.keys[a];
							if (typeof b != "undefined") {
								delete this.map[b]
							}
							this.keys.splice(a, 1);
							this.fireEvent("remove", c, b);
							return c
						}
						return false
					},
					removeKey : function(a) {
						return this.removeAt(this.indexOfKey(a))
					},
					getCount : function() {
						return this.length
					},
					indexOf : function(a) {
						return this.items.indexOf(a)
					},
					indexOfKey : function(a) {
						return this.keys.indexOf(a)
					},
					item : function(b) {
						var a = this.map[b], c = a !== undefined ? a
								: (typeof b == "number") ? this.items[b]
										: undefined;
						return !Ext.isFunction(c) || this.allowFunctions ? c
								: null
					},
					itemAt : function(a) {
						return this.items[a]
					},
					key : function(a) {
						return this.map[a]
					},
					contains : function(a) {
						return this.indexOf(a) != -1
					},
					containsKey : function(a) {
						return typeof this.map[a] != "undefined"
					},
					clear : function() {
						this.length = 0;
						this.items = [];
						this.keys = [];
						this.map = {};
						this.fireEvent("clear")
					},
					first : function() {
						return this.items[0]
					},
					last : function() {
						return this.items[this.length - 1]
					},
					_sort : function(m, a, l) {
						var e, g, d = String(a).toUpperCase() == "DESC" ? -1
								: 1, j = [], b = this.keys, h = this.items;
						l = l || function(i, c) {
							return i - c
						};
						for (e = 0, g = h.length; e < g; e++) {
							j[j.length] = {
								key : b[e],
								value : h[e],
								index : e
							}
						}
						j.sort( function(i, c) {
							var k = l(i[m], c[m]) * d;
							if (k === 0) {
								k = (i.index < c.index ? -1 : 1)
							}
							return k
						});
						for (e = 0, g = j.length; e < g; e++) {
							h[e] = j[e].value;
							b[e] = j[e].key
						}
						this.fireEvent("sort", this)
					},
					sort : function(a, b) {
						this._sort("value", a, b)
					},
					keySort : function(a, b) {
						this
								._sort(
										"key",
										a,
										b
												|| function(d, c) {
													var g = String(d)
															.toUpperCase(), e = String(
															c).toUpperCase();
													return g > e ? 1
															: (g < e ? -1 : 0)
												})
					},
					getRange : function(e, a) {
						var b = this.items;
						if (b.length < 1) {
							return []
						}
						e = e || 0;
						a = Math.min(typeof a == "undefined" ? this.length - 1
								: a, this.length - 1);
						var c, d = [];
						if (e <= a) {
							for (c = e; c <= a; c++) {
								d[d.length] = b[c]
							}
						} else {
							for (c = e; c >= a; c--) {
								d[d.length] = b[c]
							}
						}
						return d
					},
					filter : function(c, b, d, a) {
						if (Ext.isEmpty(b, false)) {
							return this.clone()
						}
						b = this.createValueMatcher(b, d, a);
						return this.filterBy( function(e) {
							return e && b.test(e[c])
						})
					},
					filterBy : function(g, e) {
						var h = new Ext.util.MixedCollection();
						h.getKey = this.getKey;
						var b = this.keys, d = this.items;
						for ( var c = 0, a = d.length; c < a; c++) {
							if (g.call(e || this, d[c], b[c])) {
								h.add(b[c], d[c])
							}
						}
						return h
					},
					findIndex : function(c, b, e, d, a) {
						if (Ext.isEmpty(b, false)) {
							return -1
						}
						b = this.createValueMatcher(b, d, a);
						return this.findIndexBy( function(g) {
							return g && b.test(g[c])
						}, null, e)
					},
					findIndexBy : function(g, e, h) {
						var b = this.keys, d = this.items;
						for ( var c = (h || 0), a = d.length; c < a; c++) {
							if (g.call(e || this, d[c], b[c])) {
								return c
							}
						}
						return -1
					},
					createValueMatcher : function(b, c, a) {
						if (!b.exec) {
							b = String(b);
							b = new RegExp((c === true ? "" : "^")
									+ Ext.escapeRe(b), a ? "" : "i")
						}
						return b
					},
					clone : function() {
						var e = new Ext.util.MixedCollection();
						var b = this.keys, d = this.items;
						for ( var c = 0, a = d.length; c < a; c++) {
							e.add(b[c], d[c])
						}
						e.getKey = this.getKey;
						return e
					}
				});
Ext.util.MixedCollection.prototype.get = Ext.util.MixedCollection.prototype.item;
Ext.util.JSON = new ( function() {
	var useHasOwn = !! {}.hasOwnProperty, isNative = function() {
		var useNative = null;
		return function() {
			if (useNative === null) {
				useNative = Ext.USE_NATIVE_JSON && window.JSON
						&& JSON.toString() == "[object JSON]"
			}
			return useNative
		}
	}(), pad = function(n) {
		return n < 10 ? "0" + n : n
	}, doDecode = function(json) {
		return eval("(" + json + ")")
	}, doEncode = function(o) {
		if (typeof o == "undefined" || o === null) {
			return "null"
		} else {
			if (Ext.isArray(o)) {
				return encodeArray(o)
			} else {
				if (Object.prototype.toString.apply(o) === "[object Date]") {
					return Ext.util.JSON.encodeDate(o)
				} else {
					if (typeof o == "string") {
						return encodeString(o)
					} else {
						if (typeof o == "number") {
							return isFinite(o) ? String(o) : "null"
						} else {
							if (typeof o == "boolean") {
								return String(o)
							} else {
								var a = [ "{" ], b, i, v;
								for (i in o) {
									if (!useHasOwn || o.hasOwnProperty(i)) {
										v = o[i];
										switch (typeof v) {
										case "undefined":
										case "function":
										case "unknown":
											break;
										default:
											if (b) {
												a.push(",")
											}
											a.push(doEncode(i), ":",
													v === null ? "null"
															: doEncode(v));
											b = true
										}
									}
								}
								a.push("}");
								return a.join("")
							}
						}
					}
				}
			}
		}
	}, m = {
		"\b" : "\\b",
		"\t" : "\\t",
		"\n" : "\\n",
		"\f" : "\\f",
		"\r" : "\\r",
		'"' : '\\"',
		"\\" : "\\\\"
	}, encodeString = function(s) {
		if (/["\\\x00-\x1f]/.test(s)) {
			return '"' + s.replace(/([\x00-\x1f\\"])/g, function(a, b) {
				var c = m[b];
				if (c) {
					return c
				}
				c = b.charCodeAt();
				return "\\u00" + Math.floor(c / 16).toString(16)
						+ (c % 16).toString(16)
			}) + '"'
		}
		return '"' + s + '"'
	}, encodeArray = function(o) {
		var a = [ "[" ], b, i, l = o.length, v;
		for (i = 0; i < l; i += 1) {
			v = o[i];
			switch (typeof v) {
			case "undefined":
			case "function":
			case "unknown":
				break;
			default:
				if (b) {
					a.push(",")
				}
				a.push(v === null ? "null" : Ext.util.JSON.encode(v));
				b = true
			}
		}
		a.push("]");
		return a.join("")
	};
	this.encodeDate = function(o) {
		return '"' + o.getFullYear() + "-" + pad(o.getMonth() + 1) + "-"
				+ pad(o.getDate()) + "T" + pad(o.getHours()) + ":"
				+ pad(o.getMinutes()) + ":" + pad(o.getSeconds()) + '"'
	};
	this.encode = function() {
		var ec;
		return function(o) {
			if (!ec) {
				ec = isNative() ? JSON.stringify : doEncode
			}
			return ec(o)
		}
	}();
	this.decode = function() {
		var dc;
		return function(json) {
			if (!dc) {
				dc = isNative() ? JSON.parse : doDecode
			}
			return dc(json)
		}
	}()
})();
Ext.encode = Ext.util.JSON.encode;
Ext.decode = Ext.util.JSON.decode;
Ext.util.Format = function() {
	var trimRe = /^\s+|\s+$/g;
	return {
		ellipsis : function(value, len, word) {
			if (value && value.length > len) {
				if (word) {
					var vs = value.substr(0, len - 2);
					var index = Math.max(vs.lastIndexOf(" "), vs
							.lastIndexOf("."), vs.lastIndexOf("!"), vs
							.lastIndexOf("?"));
					if (index == -1 || index < (len - 15)) {
						return value.substr(0, len - 3) + "..."
					} else {
						return vs.substr(0, index) + "..."
					}
				} else {
					return value.substr(0, len - 3) + "..."
				}
			}
			return value
		},
		undef : function(value) {
			return value !== undefined ? value : ""
		},
		defaultValue : function(value, defaultValue) {
			return value !== undefined && value !== "" ? value : defaultValue
		},
		htmlEncode : function(value) {
			return !value ? value : String(value).replace(/&/g, "&amp;")
					.replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g,
							"&quot;")
		},
		htmlDecode : function(value) {
			return !value ? value : String(value).replace(/&gt;/g, ">")
					.replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(
							/&amp;/g, "&")
		},
		trim : function(value) {
			return String(value).replace(trimRe, "")
		},
		substr : function(value, start, length) {
			return String(value).substr(start, length)
		},
		lowercase : function(value) {
			return String(value).toLowerCase()
		},
		uppercase : function(value) {
			return String(value).toUpperCase()
		},
		capitalize : function(value) {
			return !value ? value : value.charAt(0).toUpperCase()
					+ value.substr(1).toLowerCase()
		},
		call : function(value, fn) {
			if (arguments.length > 2) {
				var args = Array.prototype.slice.call(arguments, 2);
				args.unshift(value);
				return eval(fn).apply(window, args)
			} else {
				return eval(fn).call(window, value)
			}
		},
		usMoney : function(v) {
			v = (Math.round((v - 0) * 100)) / 100;
			v = (v == Math.floor(v)) ? v + ".00" : ((v * 10 == Math
					.floor(v * 10)) ? v + "0" : v);
			v = String(v);
			var ps = v.split(".");
			var whole = ps[0];
			var sub = ps[1] ? "." + ps[1] : ".00";
			var r = /(\d+)(\d{3})/;
			while (r.test(whole)) {
				whole = whole.replace(r, "$1,$2")
			}
			v = whole + sub;
			if (v.charAt(0) == "-") {
				return "-$" + v.substr(1)
			}
			return "$" + v
		},
		date : function(v, format) {
			if (!v) {
				return ""
			}
			if (!Ext.isDate(v)) {
				v = new Date(Date.parse(v))
			}
			return v.dateFormat(format || "m/d/Y")
		},
		dateRenderer : function(format) {
			return function(v) {
				return Ext.util.Format.date(v, format)
			}
		},
		stripTagsRE : /<\/?[^>]+>/gi,
		stripTags : function(v) {
			return !v ? v : String(v).replace(this.stripTagsRE, "")
		},
		stripScriptsRe : /(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/ig,
		stripScripts : function(v) {
			return !v ? v : String(v).replace(this.stripScriptsRe, "")
		},
		fileSize : function(size) {
			if (size < 1024) {
				return size + " bytes"
			} else {
				if (size < 1048576) {
					return (Math.round(((size * 10) / 1024)) / 10) + " KB"
				} else {
					return (Math.round(((size * 10) / 1048576)) / 10) + " MB"
				}
			}
		},
		math : function() {
			var fns = {};
			return function(v, a) {
				if (!fns[a]) {
					fns[a] = new Function("v", "return v " + a + ";")
				}
				return fns[a](v)
			}
		}(),
		round : function(value, precision) {
			var result = Number(value);
			if (typeof precision == "number") {
				precision = Math.pow(10, precision);
				result = Math.round(value * precision) / precision
			}
			return result
		},
		number : function(v, format) {
			if (!format) {
				return v
			}
			v = Ext.num(v, NaN);
			if (isNaN(v)) {
				return ""
			}
			var comma = ",", dec = ".", i18n = false, neg = v < 0;
			v = Math.abs(v);
			if (format.substr(format.length - 2) == "/i") {
				format = format.substr(0, format.length - 2);
				i18n = true;
				comma = ".";
				dec = ","
			}
			var hasComma = format.indexOf(comma) != -1, psplit = (i18n ? format
					.replace(/[^\d\,]/g, "") : format.replace(/[^\d\.]/g, ""))
					.split(dec);
			if (1 < psplit.length) {
				v = v.toFixed(psplit[1].length)
			} else {
				if (2 < psplit.length) {
					throw ("NumberFormatException: invalid format, formats should have no more than 1 period: " + format)
				} else {
					v = v.toFixed(0)
				}
			}
			var fnum = v.toString();
			if (hasComma) {
				psplit = fnum.split(".");
				var cnum = psplit[0], parr = [], j = cnum.length, m = Math
						.floor(j / 3), n = cnum.length % 3 || 3;
				for ( var i = 0; i < j; i += n) {
					if (i != 0) {
						n = 3
					}
					parr[parr.length] = cnum.substr(i, n);
					m -= 1
				}
				fnum = parr.join(comma);
				if (psplit[1]) {
					fnum += dec + psplit[1]
				}
			}
			return (neg ? "-" : "") + format.replace(/[\d,?\.?]+/, fnum)
		},
		numberRenderer : function(format) {
			return function(v) {
				return Ext.util.Format.number(v, format)
			}
		},
		plural : function(v, s, p) {
			return v + " " + (v == 1 ? s : (p ? p : s + "s"))
		},
		nl2br : function(v) {
			return v === undefined || v === null ? "" : v.replace(/\n/g,
					"<br/>")
		}
	}
}();
Ext.XTemplate = function() {
	Ext.XTemplate.superclass.constructor.apply(this, arguments);
	var w = this, i = w.html, p = /<tpl\b[^>]*>((?:(?=([^<]+))\2|<(?!tpl\b[^>]*>))*?)<\/tpl>/, d = /^<tpl\b[^>]*?for="(.*?)"/, t = /^<tpl\b[^>]*?if="(.*?)"/, v = /^<tpl\b[^>]*?exec="(.*?)"/, q, o = 0, j = [], n = "values", u = "parent", k = "xindex", l = "xcount", e = "return ", c = "with(values){ ";
	i = [ "<tpl>", i, "</tpl>" ].join("");
	while ((q = i.match(p))) {
		var b = q[0].match(d), a = q[0].match(t), y = q[0].match(v), g = null, h = null, r = null, x = b
				&& b[1] ? b[1] : "";
		if (a) {
			g = a && a[1] ? a[1] : null;
			if (g) {
				h = new Function(n, u, k, l, c + e
						+ (Ext.util.Format.htmlDecode(g)) + "; }")
			}
		}
		if (y) {
			g = y && y[1] ? y[1] : null;
			if (g) {
				r = new Function(n, u, k, l, c
						+ (Ext.util.Format.htmlDecode(g)) + "; }")
			}
		}
		if (x) {
			switch (x) {
			case ".":
				x = new Function(n, u, c + e + n + "; }");
				break;
			case "..":
				x = new Function(n, u, c + e + u + "; }");
				break;
			default:
				x = new Function(n, u, c + e + x + "; }")
			}
		}
		j.push( {
			id : o,
			target : x,
			exec : r,
			test : h,
			body : q[1] || ""
		});
		i = i.replace(q[0], "{xtpl" + o + "}");
		++o
	}
	Ext.each(j, function(m) {
		w.compileTpl(m)
	});
	w.master = j[j.length - 1];
	w.tpls = j
};
Ext
		.extend(
				Ext.XTemplate,
				Ext.Template,
				{
					re : /\{([\w-\.\#]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?(\s?[\+\-\*\\]\s?[\d\.\+\-\*\\\(\)]+)?\}/g,
					codeRe : /\{\[((?:\\\]|.|\n)*?)\]\}/g,
					applySubTemplate : function(a, i, h, d, c) {
						var g = this, e, k = g.tpls[a], j, b = [];
						if ((k.test && !k.test.call(g, i, h, d, c))
								|| (k.exec && k.exec.call(g, i, h, d, c))) {
							return ""
						}
						j = k.target ? k.target.call(g, i, h) : i;
						e = j.length;
						h = k.target ? i : h;
						if (k.target && Ext.isArray(j)) {
							Ext.each(j, function(l, m) {
								b[b.length] = k.compiled
										.call(g, l, h, m + 1, e)
							});
							return b.join("")
						}
						return k.compiled.call(g, j, h, d, c)
					},
					compileTpl : function(tpl) {
						var fm = Ext.util.Format, useF = this.disableFormats !== true, sep = Ext.isGecko ? "+"
								: ",", body;
						function fn(m, name, format, args, math) {
							if (name.substr(0, 4) == "xtpl") {
								return "'" + sep + "this.applySubTemplate("
										+ name.substr(4)
										+ ", values, parent, xindex, xcount)"
										+ sep + "'"
							}
							var v;
							if (name === ".") {
								v = "values"
							} else {
								if (name === "#") {
									v = "xindex"
								} else {
									if (name.indexOf(".") != -1) {
										v = name
									} else {
										v = "values['" + name + "']"
									}
								}
							}
							if (math) {
								v = "(" + v + math + ")"
							}
							if (format && useF) {
								args = args ? "," + args : "";
								if (format.substr(0, 5) != "this.") {
									format = "fm." + format + "("
								} else {
									format = 'this.call("' + format.substr(5) + '", ';
									args = ", values"
								}
							} else {
								args = "";
								format = "(" + v + " === undefined ? '' : "
							}
							return "'" + sep + format + v + args + ")" + sep
									+ "'"
						}
						function codeFn(m, code) {
							return "'" + sep + "(" + code + ")" + sep + "'"
						}
						if (Ext.isGecko) {
							body = "tpl.compiled = function(values, parent, xindex, xcount){ return '"
									+ tpl.body.replace(/(\r\n|\n)/g, "\\n")
											.replace(/'/g, "\\'").replace(
													this.re, fn).replace(
													this.codeRe, codeFn)
									+ "';};"
						} else {
							body = [ "tpl.compiled = function(values, parent, xindex, xcount){ return ['" ];
							body.push(tpl.body.replace(/(\r\n|\n)/g, "\\n")
									.replace(/'/g, "\\'").replace(this.re, fn)
									.replace(this.codeRe, codeFn));
							body.push("'].join('');};");
							body = body.join("")
						}
						eval(body);
						return this
					},
					applyTemplate : function(a) {
						return this.master.compiled.call(this, a, {}, 1, 1)
					},
					compile : function() {
						return this
					}
				});
Ext.XTemplate.prototype.apply = Ext.XTemplate.prototype.applyTemplate;
Ext.XTemplate.from = function(a) {
	a = Ext.getDom(a);
	return new Ext.XTemplate(a.value || a.innerHTML)
};
Ext.util.CSS = function() {
	var d = null;
	var c = document;
	var b = /(-[a-z])/gi;
	var a = function(e, g) {
		return g.charAt(1).toUpperCase()
	};
	return {
		createStyleSheet : function(i, l) {
			var h;
			var g = c.getElementsByTagName("head")[0];
			var k = c.createElement("style");
			k.setAttribute("type", "text/css");
			if (l) {
				k.setAttribute("id", l)
			}
			if (Ext.isIE) {
				g.appendChild(k);
				h = k.styleSheet;
				h.cssText = i
			} else {
				try {
					k.appendChild(c.createTextNode(i))
				} catch (j) {
					k.cssText = i
				}
				g.appendChild(k);
				h = k.styleSheet ? k.styleSheet
						: (k.sheet || c.styleSheets[c.styleSheets.length - 1])
			}
			this.cacheStyleSheet(h);
			return h
		},
		removeStyleSheet : function(g) {
			var e = c.getElementById(g);
			if (e) {
				e.parentNode.removeChild(e)
			}
		},
		swapStyleSheet : function(h, e) {
			this.removeStyleSheet(h);
			var g = c.createElement("link");
			g.setAttribute("rel", "stylesheet");
			g.setAttribute("type", "text/css");
			g.setAttribute("id", h);
			g.setAttribute("href", e);
			c.getElementsByTagName("head")[0].appendChild(g)
		},
		refreshCache : function() {
			return this.getRules(true)
		},
		cacheStyleSheet : function(h) {
			if (!d) {
				d = {}
			}
			try {
				var k = h.cssRules || h.rules;
				for ( var g = k.length - 1; g >= 0; --g) {
					d[k[g].selectorText] = k[g]
				}
			} catch (i) {
			}
		},
		getRules : function(h) {
			if (d === null || h) {
				d = {};
				var k = c.styleSheets;
				for ( var j = 0, g = k.length; j < g; j++) {
					try {
						this.cacheStyleSheet(k[j])
					} catch (l) {
					}
				}
			}
			return d
		},
		getRule : function(e, h) {
			var g = this.getRules(h);
			if (!Ext.isArray(e)) {
				return g[e]
			}
			for ( var j = 0; j < e.length; j++) {
				if (g[e[j]]) {
					return g[e[j]]
				}
			}
			return null
		},
		updateRule : function(e, j, h) {
			if (!Ext.isArray(e)) {
				var k = this.getRule(e);
				if (k) {
					k.style[j.replace(b, a)] = h;
					return true
				}
			} else {
				for ( var g = 0; g < e.length; g++) {
					if (this.updateRule(e[g], j, h)) {
						return true
					}
				}
			}
			return false
		}
	}
}();
Ext.util.ClickRepeater = function(b, a) {
	this.el = Ext.get(b);
	this.el.unselectable();
	Ext.apply(this, a);
	this.addEvents("mousedown", "click", "mouseup");
	if (!this.disabled) {
		this.disabled = true;
		this.enable()
	}
	if (this.handler) {
		this.on("click", this.handler, this.scope || this)
	}
	Ext.util.ClickRepeater.superclass.constructor.call(this)
};
Ext.extend(Ext.util.ClickRepeater, Ext.util.Observable, {
	interval : 20,
	delay : 250,
	preventDefault : true,
	stopDefault : false,
	timer : 0,
	enable : function() {
		if (this.disabled) {
			this.el.on("mousedown", this.handleMouseDown, this);
			if (this.preventDefault || this.stopDefault) {
				this.el.on("click", this.eventOptions, this)
			}
		}
		this.disabled = false
	},
	disable : function(a) {
		if (a || !this.disabled) {
			clearTimeout(this.timer);
			if (this.pressClass) {
				this.el.removeClass(this.pressClass)
			}
			Ext.getDoc().un("mouseup", this.handleMouseUp, this);
			this.el.removeAllListeners()
		}
		this.disabled = true
	},
	setDisabled : function(a) {
		this[a ? "disable" : "enable"]()
	},
	eventOptions : function(a) {
		if (this.preventDefault) {
			a.preventDefault()
		}
		if (this.stopDefault) {
			a.stopEvent()
		}
	},
	destroy : function() {
		this.disable(true);
		Ext.destroy(this.el);
		this.purgeListeners()
	},
	handleMouseDown : function() {
		clearTimeout(this.timer);
		this.el.blur();
		if (this.pressClass) {
			this.el.addClass(this.pressClass)
		}
		this.mousedownTime = new Date();
		Ext.getDoc().on("mouseup", this.handleMouseUp, this);
		this.el.on("mouseout", this.handleMouseOut, this);
		this.fireEvent("mousedown", this);
		this.fireEvent("click", this);
		if (this.accelerate) {
			this.delay = 400
		}
		this.timer = this.click.defer(this.delay || this.interval, this)
	},
	click : function() {
		this.fireEvent("click", this);
		this.timer = this.click.defer(this.accelerate ? this.easeOutExpo(
				this.mousedownTime.getElapsed(), 400, -390, 12000)
				: this.interval, this)
	},
	easeOutExpo : function(e, a, h, g) {
		return (e == g) ? a + h : h * (-Math.pow(2, -10 * e / g) + 1) + a
	},
	handleMouseOut : function() {
		clearTimeout(this.timer);
		if (this.pressClass) {
			this.el.removeClass(this.pressClass)
		}
		this.el.on("mouseover", this.handleMouseReturn, this)
	},
	handleMouseReturn : function() {
		this.el.un("mouseover", this.handleMouseReturn, this);
		if (this.pressClass) {
			this.el.addClass(this.pressClass)
		}
		this.click()
	},
	handleMouseUp : function() {
		clearTimeout(this.timer);
		this.el.un("mouseover", this.handleMouseReturn, this);
		this.el.un("mouseout", this.handleMouseOut, this);
		Ext.getDoc().un("mouseup", this.handleMouseUp, this);
		this.el.removeClass(this.pressClass);
		this.fireEvent("mouseup", this)
	}
});
Ext.KeyNav = function(b, a) {
	this.el = Ext.get(b);
	Ext.apply(this, a);
	if (!this.disabled) {
		this.disabled = true;
		this.enable()
	}
};
Ext.KeyNav.prototype = {
	disabled : false,
	defaultEventAction : "stopEvent",
	forceKeyDown : false,
	prepareEvent : function(c) {
		var a = c.getKey();
		var b = this.keyToHandler[a];
		if (Ext.isSafari2 && b && a >= 37 && a <= 40) {
			c.stopEvent()
		}
	},
	relay : function(c) {
		var a = c.getKey();
		var b = this.keyToHandler[a];
		if (b && this[b]) {
			if (this.doRelay(c, this[b], b) !== true) {
				c[this.defaultEventAction]()
			}
		}
	},
	doRelay : function(c, b, a) {
		return b.call(this.scope || this, c)
	},
	enter : false,
	left : false,
	right : false,
	up : false,
	down : false,
	tab : false,
	esc : false,
	pageUp : false,
	pageDown : false,
	del : false,
	home : false,
	end : false,
	keyToHandler : {
		37 : "left",
		39 : "right",
		38 : "up",
		40 : "down",
		33 : "pageUp",
		34 : "pageDown",
		46 : "del",
		36 : "home",
		35 : "end",
		13 : "enter",
		27 : "esc",
		9 : "tab"
	},
	enable : function() {
		if (this.disabled) {
			if (this.isKeydown()) {
				this.el.on("keydown", this.relay, this)
			} else {
				this.el.on("keydown", this.prepareEvent, this);
				this.el.on("keypress", this.relay, this)
			}
			this.disabled = false
		}
	},
	disable : function() {
		if (!this.disabled) {
			if (this.isKeydown()) {
				this.el.un("keydown", this.relay, this)
			} else {
				this.el.un("keydown", this.prepareEvent, this);
				this.el.un("keypress", this.relay, this)
			}
			this.disabled = true
		}
	},
	setDisabled : function(a) {
		this[a ? "disable" : "enable"]()
	},
	isKeydown : function() {
		return this.forceKeyDown || Ext.EventManager.useKeydown
	}
};
Ext.KeyMap = function(c, b, a) {
	this.el = Ext.get(c);
	this.eventName = a || "keydown";
	this.bindings = [];
	if (b) {
		this.addBinding(b)
	}
	this.enable()
};
Ext.KeyMap.prototype = {
	stopEvent : false,
	addBinding : function(b) {
		if (Ext.isArray(b)) {
			Ext.each(b, function(j) {
				this.addBinding(j)
			}, this);
			return
		}
		var k = b.key, g = b.fn || b.handler, l = b.scope;
		if (b.stopEvent) {
			this.stopEvent = b.stopEvent
		}
		if (typeof k == "string") {
			var h = [];
			var e = k.toUpperCase();
			for ( var c = 0, d = e.length; c < d; c++) {
				h.push(e.charCodeAt(c))
			}
			k = h
		}
		var a = Ext.isArray(k);
		var i = function(o) {
			if (this.checkModifiers(b, o)) {
				var m = o.getKey();
				if (a) {
					for ( var n = 0, j = k.length; n < j; n++) {
						if (k[n] == m) {
							if (this.stopEvent) {
								o.stopEvent()
							}
							g.call(l || window, m, o);
							return
						}
					}
				} else {
					if (m == k) {
						if (this.stopEvent) {
							o.stopEvent()
						}
						g.call(l || window, m, o)
					}
				}
			}
		};
		this.bindings.push(i)
	},
	checkModifiers : function(b, h) {
		var j, d, g = [ "shift", "ctrl", "alt" ];
		for ( var c = 0, a = g.length; c < a; ++c) {
			d = g[c];
			j = b[d];
			if (!(j === undefined || (j === h[d + "Key"]))) {
				return false
			}
		}
		return true
	},
	on : function(b, d, c) {
		var h, a, e, g;
		if (typeof b == "object" && !Ext.isArray(b)) {
			h = b.key;
			a = b.shift;
			e = b.ctrl;
			g = b.alt
		} else {
			h = b
		}
		this.addBinding( {
			key : h,
			shift : a,
			ctrl : e,
			alt : g,
			fn : d,
			scope : c
		})
	},
	handleKeyDown : function(g) {
		if (this.enabled) {
			var c = this.bindings;
			for ( var d = 0, a = c.length; d < a; d++) {
				c[d].call(this, g)
			}
		}
	},
	isEnabled : function() {
		return this.enabled
	},
	enable : function() {
		if (!this.enabled) {
			this.el.on(this.eventName, this.handleKeyDown, this);
			this.enabled = true
		}
	},
	disable : function() {
		if (this.enabled) {
			this.el.removeListener(this.eventName, this.handleKeyDown, this);
			this.enabled = false
		}
	},
	setDisabled : function(a) {
		this[a ? "disable" : "enable"]()
	}
};
Ext.util.TextMetrics = function() {
	var a;
	return {
		measure : function(b, c, d) {
			if (!a) {
				a = Ext.util.TextMetrics.Instance(b, d)
			}
			a.bind(b);
			a.setFixedWidth(d || "auto");
			return a.getSize(c)
		},
		createInstance : function(b, c) {
			return Ext.util.TextMetrics.Instance(b, c)
		}
	}
}();
Ext.util.TextMetrics.Instance = function(b, d) {
	var c = new Ext.Element(document.createElement("div"));
	document.body.appendChild(c.dom);
	c.position("absolute");
	c.setLeftTop(-1000, -1000);
	c.hide();
	if (d) {
		c.setWidth(d)
	}
	var a = {
		getSize : function(g) {
			c.update(g);
			var e = c.getSize();
			c.update("");
			return e
		},
		bind : function(e) {
			c.setStyle(Ext.fly(e).getStyles("font-size", "font-style",
					"font-weight", "font-family", "line-height",
					"text-transform", "letter-spacing"))
		},
		setFixedWidth : function(e) {
			c.setWidth(e)
		},
		getWidth : function(e) {
			c.dom.style.width = "auto";
			return this.getSize(e).width
		},
		getHeight : function(e) {
			return this.getSize(e).height
		}
	};
	a.bind(b);
	return a
};
Ext.Element.addMethods( {
	getTextWidth : function(c, b, a) {
		return (Ext.util.TextMetrics.measure(this.dom, Ext.value(c,
				this.dom.innerHTML, true)).width).constrain(b || 0,
				a || 1000000)
	}
});
Ext.util.Cookies = {
	set : function(c, e) {
		var a = arguments;
		var i = arguments.length;
		var b = (i > 2) ? a[2] : null;
		var h = (i > 3) ? a[3] : "/";
		var d = (i > 4) ? a[4] : null;
		var g = (i > 5) ? a[5] : false;
		document.cookie = c + "=" + escape(e)
				+ ((b === null) ? "" : ("; expires=" + b.toGMTString()))
				+ ((h === null) ? "" : ("; path=" + h))
				+ ((d === null) ? "" : ("; domain=" + d))
				+ ((g === true) ? "; secure" : "")
	},
	get : function(d) {
		var b = d + "=";
		var g = b.length;
		var a = document.cookie.length;
		var e = 0;
		var c = 0;
		while (e < a) {
			c = e + g;
			if (document.cookie.substring(e, c) == b) {
				return Ext.util.Cookies.getCookieVal(c)
			}
			e = document.cookie.indexOf(" ", e) + 1;
			if (e === 0) {
				break
			}
		}
		return null
	},
	clear : function(a) {
		if (Ext.util.Cookies.get(a)) {
			document.cookie = a + "=; expires=Thu, 01-Jan-70 00:00:01 GMT"
		}
	},
	getCookieVal : function(b) {
		var a = document.cookie.indexOf(";", b);
		if (a == -1) {
			a = document.cookie.length
		}
		return unescape(document.cookie.substring(b, a))
	}
};
Ext.handleError = function(a) {
	throw a
};
Ext.Error = function(a) {
	this.message = (this.lang[a]) ? this.lang[a] : a
};
Ext.Error.prototype = new Error();
Ext.apply(Ext.Error.prototype, {
	lang : {},
	name : "Ext.Error",
	getName : function() {
		return this.name
	},
	getMessage : function() {
		return this.message
	},
	toJson : function() {
		return Ext.encode(this)
	}
});
Ext.ComponentMgr = function() {
	var c = new Ext.util.MixedCollection();
	var b = {};
	var a = {};
	return {
		register : function(d) {
			c.add(d)
		},
		unregister : function(d) {
			c.remove(d)
		},
		get : function(d) {
			return c.get(d)
		},
		onAvailable : function(g, e, d) {
			c.on("add", function(h, i) {
				if (i.id == g) {
					e.call(d || i, i);
					c.un("add", e, d)
				}
			})
		},
		all : c,
		isRegistered : function(d) {
			return b[d] !== undefined
		},
		registerType : function(e, d) {
			b[e] = d;
			d.xtype = e
		},
		create : function(d, e) {
			return d.render ? d : new b[d.xtype || e](d)
		},
		registerPlugin : function(e, d) {
			a[e] = d;
			d.ptype = e
		},
		createPlugin : function(d, e) {
			return new a[d.ptype || e](d)
		}
	}
}();
Ext.reg = Ext.ComponentMgr.registerType;
Ext.preg = Ext.ComponentMgr.registerPlugin;
Ext.create = Ext.ComponentMgr.create;
Ext.Component = function(b) {
	b = b || {};
	if (b.initialConfig) {
		if (b.isAction) {
			this.baseAction = b
		}
		b = b.initialConfig
	} else {
		if (b.tagName || b.dom || Ext.isString(b)) {
			b = {
				applyTo : b,
				id : b.id || b
			}
		}
	}
	this.initialConfig = b;
	Ext.apply(this, b);
	this.addEvents("disable", "enable", "beforeshow", "show", "beforehide",
			"hide", "beforerender", "render", "afterrender", "beforedestroy",
			"destroy", "beforestaterestore", "staterestore", "beforestatesave",
			"statesave");
	this.getId();
	Ext.ComponentMgr.register(this);
	Ext.Component.superclass.constructor.call(this);
	if (this.baseAction) {
		this.baseAction.addComponent(this)
	}
	this.initComponent();
	if (this.plugins) {
		if (Ext.isArray(this.plugins)) {
			for ( var c = 0, a = this.plugins.length; c < a; c++) {
				this.plugins[c] = this.initPlugin(this.plugins[c])
			}
		} else {
			this.plugins = this.initPlugin(this.plugins)
		}
	}
	if (this.stateful !== false) {
		this.initState(b)
	}
	if (this.applyTo) {
		this.applyToMarkup(this.applyTo);
		delete this.applyTo
	} else {
		if (this.renderTo) {
			this.render(this.renderTo);
			delete this.renderTo
		}
	}
};
Ext.Component.AUTO_ID = 1000;
Ext
		.extend(
				Ext.Component,
				Ext.util.Observable,
				{
					disabled : false,
					hidden : false,
					autoEl : "div",
					disabledClass : "x-item-disabled",
					allowDomMove : true,
					autoShow : false,
					hideMode : "display",
					hideParent : false,
					rendered : false,
					ctype : "Ext.Component",
					actionMode : "el",
					getActionEl : function() {
						return this[this.actionMode]
					},
					initPlugin : function(a) {
						if (a.ptype && !Ext.isFunction(a.init)) {
							a = Ext.ComponentMgr.createPlugin(a)
						} else {
							if (Ext.isString(a)) {
								a = Ext.ComponentMgr.createPlugin( {
									ptype : a
								})
							}
						}
						a.init(this);
						return a
					},
					initComponent : Ext.emptyFn,
					render : function(b, a) {
						if (!this.rendered
								&& this.fireEvent("beforerender", this) !== false) {
							if (!b && this.el) {
								this.el = Ext.get(this.el);
								b = this.el.dom.parentNode;
								this.allowDomMove = false
							}
							this.container = Ext.get(b);
							if (this.ctCls) {
								this.container.addClass(this.ctCls)
							}
							this.rendered = true;
							if (a !== undefined) {
								if (Ext.isNumber(a)) {
									a = this.container.dom.childNodes[a]
								} else {
									a = Ext.getDom(a)
								}
							}
							this.onRender(this.container, a || null);
							if (this.autoShow) {
								this.el.removeClass( [ "x-hidden",
										"x-hide-" + this.hideMode ])
							}
							if (this.cls) {
								this.el.addClass(this.cls);
								delete this.cls
							}
							if (this.style) {
								this.el.applyStyles(this.style);
								delete this.style
							}
							if (this.overCls) {
								this.el.addClassOnOver(this.overCls)
							}
							this.fireEvent("render", this);
							this.afterRender(this.container);
							if (this.hidden) {
								this.doHide()
							}
							if (this.disabled) {
								this.disable(true)
							}
							if (this.stateful !== false) {
								this.initStateEvents()
							}
							this.initRef();
							this.fireEvent("afterrender", this)
						}
						return this
					},
					initRef : function() {
						if (this.ref) {
							var d = this.ref.split("/");
							var c = d.length, b = 0;
							var a = this;
							while (b < c) {
								if (a.ownerCt) {
									a = a.ownerCt
								}
								b++
							}
							a[d[--b]] = this
						}
					},
					initState : function(a) {
						if (Ext.state.Manager) {
							var c = this.getStateId();
							if (c) {
								var b = Ext.state.Manager.get(c);
								if (b) {
									if (this.fireEvent("beforestaterestore",
											this, b) !== false) {
										this.applyState(b);
										this.fireEvent("staterestore", this, b)
									}
								}
							}
						}
					},
					getStateId : function() {
						return this.stateId
								|| ((this.id.indexOf("ext-comp-") == 0 || this.id
										.indexOf("ext-gen") == 0) ? null
										: this.id)
					},
					initStateEvents : function() {
						if (this.stateEvents) {
							for ( var a = 0, b; b = this.stateEvents[a]; a++) {
								this.on(b, this.saveState, this, {
									delay : 100
								})
							}
						}
					},
					applyState : function(b, a) {
						if (b) {
							Ext.apply(this, b)
						}
					},
					getState : function() {
						return null
					},
					saveState : function() {
						if (Ext.state.Manager && this.stateful !== false) {
							var b = this.getStateId();
							if (b) {
								var a = this.getState();
								if (this.fireEvent("beforestatesave", this, a) !== false) {
									Ext.state.Manager.set(b, a);
									this.fireEvent("statesave", this, a)
								}
							}
						}
					},
					applyToMarkup : function(a) {
						this.allowDomMove = false;
						this.el = Ext.get(a);
						this.render(this.el.dom.parentNode)
					},
					addClass : function(a) {
						if (this.el) {
							this.el.addClass(a)
						} else {
							this.cls = this.cls ? this.cls + " " + a : a
						}
						return this
					},
					removeClass : function(a) {
						if (this.el) {
							this.el.removeClass(a)
						} else {
							if (this.cls) {
								this.cls = this.cls.split(" ").remove(a).join(
										" ")
							}
						}
						return this
					},
					onRender : function(b, a) {
						if (!this.el && this.autoEl) {
							if (Ext.isString(this.autoEl)) {
								this.el = document.createElement(this.autoEl)
							} else {
								var c = document.createElement("div");
								Ext.DomHelper.overwrite(c, this.autoEl);
								this.el = c.firstChild
							}
							if (!this.el.id) {
								this.el.id = this.getId()
							}
						}
						if (this.el) {
							this.el = Ext.get(this.el);
							if (this.allowDomMove !== false) {
								b.dom.insertBefore(this.el.dom, a)
							}
						}
					},
					getAutoCreate : function() {
						var a = Ext.isObject(this.autoCreate) ? this.autoCreate
								: Ext.apply( {}, this.defaultAutoCreate);
						if (this.id && !a.id) {
							a.id = this.id
						}
						return a
					},
					afterRender : Ext.emptyFn,
					destroy : function() {
						if (this.fireEvent("beforedestroy", this) !== false) {
							this.beforeDestroy();
							if (this.rendered) {
								this.el.removeAllListeners();
								this.el.remove();
								if (this.actionMode == "container"
										|| this.removeMode == "container") {
									this.container.remove()
								}
							}
							this.onDestroy();
							Ext.ComponentMgr.unregister(this);
							this.fireEvent("destroy", this);
							this.purgeListeners()
						}
					},
					beforeDestroy : Ext.emptyFn,
					onDestroy : Ext.emptyFn,
					getEl : function() {
						return this.el
					},
					getId : function() {
						return this.id
								|| (this.id = "ext-comp-"
										+ (++Ext.Component.AUTO_ID))
					},
					getItemId : function() {
						return this.itemId || this.getId()
					},
					focus : function(b, a) {
						if (a) {
							this.focus.defer(Ext.isNumber(a) ? a : 10, this, [
									b, false ]);
							return
						}
						if (this.rendered) {
							this.el.focus();
							if (b === true) {
								this.el.dom.select()
							}
						}
						return this
					},
					blur : function() {
						if (this.rendered) {
							this.el.blur()
						}
						return this
					},
					disable : function(a) {
						if (this.rendered) {
							this.onDisable()
						}
						this.disabled = true;
						if (a !== true) {
							this.fireEvent("disable", this)
						}
						return this
					},
					onDisable : function() {
						this.getActionEl().addClass(this.disabledClass);
						this.el.dom.disabled = true
					},
					enable : function() {
						if (this.rendered) {
							this.onEnable()
						}
						this.disabled = false;
						this.fireEvent("enable", this);
						return this
					},
					onEnable : function() {
						this.getActionEl().removeClass(this.disabledClass);
						this.el.dom.disabled = false
					},
					setDisabled : function(a) {
						return this[a ? "disable" : "enable"]()
					},
					show : function() {
						if (this.fireEvent("beforeshow", this) !== false) {
							this.hidden = false;
							if (this.autoRender) {
								this
										.render(Ext.isBoolean(this.autoRender) ? Ext
												.getBody()
												: this.autoRender)
							}
							if (this.rendered) {
								this.onShow()
							}
							this.fireEvent("show", this)
						}
						return this
					},
					onShow : function() {
						this.getVisibiltyEl().removeClass(
								"x-hide-" + this.hideMode)
					},
					hide : function() {
						if (this.fireEvent("beforehide", this) !== false) {
							this.doHide();
							this.fireEvent("hide", this)
						}
						return this
					},
					doHide : function() {
						this.hidden = true;
						if (this.rendered) {
							this.onHide()
						}
					},
					onHide : function() {
						this.getVisibiltyEl().addClass(
								"x-hide-" + this.hideMode)
					},
					getVisibiltyEl : function() {
						return this.hideParent ? this.container : this
								.getActionEl()
					},
					setVisible : function(a) {
						return this[a ? "show" : "hide"]()
					},
					isVisible : function() {
						return this.rendered
								&& this.getVisibiltyEl().isVisible()
					},
					cloneConfig : function(b) {
						b = b || {};
						var c = b.id || Ext.id();
						var a = Ext.applyIf(b, this.initialConfig);
						a.id = c;
						return new this.constructor(a)
					},
					getXType : function() {
						return this.constructor.xtype
					},
					isXType : function(b, a) {
						if (Ext.isFunction(b)) {
							b = b.xtype
						} else {
							if (Ext.isObject(b)) {
								b = b.constructor.xtype
							}
						}
						return !a ? ("/" + this.getXTypes() + "/").indexOf("/"
								+ b + "/") != -1 : this.constructor.xtype == b
					},
					getXTypes : function() {
						var a = this.constructor;
						if (!a.xtypes) {
							var d = [], b = this;
							while (b && b.constructor.xtype) {
								d.unshift(b.constructor.xtype);
								b = b.constructor.superclass
							}
							a.xtypeChain = d;
							a.xtypes = d.join("/")
						}
						return a.xtypes
					},
					findParentBy : function(a) {
						for ( var b = this.ownerCt; (b != null) && !a(b, this); b = b.ownerCt) {
						}
						return b || null
					},
					findParentByType : function(a) {
						return Ext.isFunction(a) ? this.findParentBy( function(
								b) {
							return b.constructor === a
						}) : this.findParentBy( function(b) {
							return b.constructor.xtype === a
						})
					},
					getDomPositionEl : function() {
						return this.getPositionEl ? this.getPositionEl() : this
								.getEl()
					},
					purgeListeners : function() {
						Ext.Component.superclass.purgeListeners.call(this);
						if (this.mons) {
							this.on("beforedestroy", this.clearMons, this, {
								single : true
							})
						}
					},
					clearMons : function() {
						Ext.each(this.mons, function(a) {
							a.item.un(a.ename, a.fn, a.scope)
						}, this);
						this.mons = []
					},
					mon : function(g, b, d, c, a) {
						if (!this.mons) {
							this.mons = [];
							this.on("beforedestroy", this.clearMons, this, {
								single : true
							})
						}
						if (Ext.isObject(b)) {
							var j = /^(?:scope|delay|buffer|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate)$/;
							var i = b;
							for ( var h in i) {
								if (j.test(h)) {
									continue
								}
								if (Ext.isFunction(i[h])) {
									this.mons.push( {
										item : g,
										ename : h,
										fn : i[h],
										scope : i.scope
									});
									g.on(h, i[h], i.scope, i)
								} else {
									this.mons.push( {
										item : g,
										ename : h,
										fn : i[h],
										scope : i.scope
									});
									g.on(h, i[h])
								}
							}
							return
						}
						this.mons.push( {
							item : g,
							ename : b,
							fn : d,
							scope : c
						});
						g.on(b, d, c, a)
					},
					mun : function(h, c, g, e) {
						var j, d;
						for ( var b = 0, a = this.mons.length; b < a; ++b) {
							d = this.mons[b];
							if (h === d.item && c == d.ename && g === d.fn
									&& e === d.scope) {
								this.mons.splice(b, 1);
								h.un(c, g, e);
								j = true;
								break
							}
						}
						return j
					},
					nextSibling : function() {
						if (this.ownerCt) {
							var a = this.ownerCt.items.indexOf(this);
							if (a != -1
									&& a + 1 < this.ownerCt.items.getCount()) {
								return this.ownerCt.items.itemAt(a + 1)
							}
						}
						return null
					},
					previousSibling : function() {
						if (this.ownerCt) {
							var a = this.ownerCt.items.indexOf(this);
							if (a > 0) {
								return this.ownerCt.items.itemAt(a - 1)
							}
						}
						return null
					},
					getBubbleTarget : function() {
						return this.ownerCt
					}
				});
Ext.reg("component", Ext.Component);
Ext.Action = function(a) {
	this.initialConfig = a;
	this.itemId = a.itemId = (a.itemId || a.id || Ext.id());
	this.items = []
};
Ext.Action.prototype = {
	isAction : true,
	setText : function(a) {
		this.initialConfig.text = a;
		this.callEach("setText", [ a ])
	},
	getText : function() {
		return this.initialConfig.text
	},
	setIconClass : function(a) {
		this.initialConfig.iconCls = a;
		this.callEach("setIconClass", [ a ])
	},
	getIconClass : function() {
		return this.initialConfig.iconCls
	},
	setDisabled : function(a) {
		this.initialConfig.disabled = a;
		this.callEach("setDisabled", [ a ])
	},
	enable : function() {
		this.setDisabled(false)
	},
	disable : function() {
		this.setDisabled(true)
	},
	isDisabled : function() {
		return this.initialConfig.disabled
	},
	setHidden : function(a) {
		this.initialConfig.hidden = a;
		this.callEach("setVisible", [ !a ])
	},
	show : function() {
		this.setHidden(false)
	},
	hide : function() {
		this.setHidden(true)
	},
	isHidden : function() {
		return this.initialConfig.hidden
	},
	setHandler : function(b, a) {
		this.initialConfig.handler = b;
		this.initialConfig.scope = a;
		this.callEach("setHandler", [ b, a ])
	},
	each : function(b, a) {
		Ext.each(this.items, b, a)
	},
	callEach : function(e, b) {
		var d = this.items;
		for ( var c = 0, a = d.length; c < a; c++) {
			d[c][e].apply(d[c], b)
		}
	},
	addComponent : function(a) {
		this.items.push(a);
		a.on("destroy", this.removeComponent, this)
	},
	removeComponent : function(a) {
		this.items.remove(a)
	},
	execute : function() {
		this.initialConfig.handler.apply(this.initialConfig.scope || window,
				arguments)
	}
};
( function() {
	Ext.Layer = function(d, c) {
		d = d || {};
		var e = Ext.DomHelper;
		var h = d.parentEl, g = h ? Ext.getDom(h) : document.body;
		if (c) {
			this.dom = Ext.getDom(c)
		}
		if (!this.dom) {
			var i = d.dh || {
				tag : "div",
				cls : "x-layer"
			};
			this.dom = e.append(g, i)
		}
		if (d.cls) {
			this.addClass(d.cls)
		}
		this.constrain = d.constrain !== false;
		this.setVisibilityMode(Ext.Element.VISIBILITY);
		if (d.id) {
			this.id = this.dom.id = d.id
		} else {
			this.id = Ext.id(this.dom)
		}
		this.zindex = d.zindex || this.getZIndex();
		this.position("absolute", this.zindex);
		if (d.shadow) {
			this.shadowOffset = d.shadowOffset || 4;
			this.shadow = new Ext.Shadow( {
				offset : this.shadowOffset,
				mode : d.shadow
			})
		} else {
			this.shadowOffset = 0
		}
		this.useShim = d.shim !== false && Ext.useShims;
		this.useDisplay = d.useDisplay;
		this.hide()
	};
	var a = Ext.Element.prototype;
	var b = [];
	Ext
			.extend(
					Ext.Layer,
					Ext.Element,
					{
						getZIndex : function() {
							return this.zindex
									|| parseInt((this.getShim() || this)
											.getStyle("z-index"), 10) || 11000
						},
						getShim : function() {
							if (!this.useShim) {
								return null
							}
							if (this.shim) {
								return this.shim
							}
							var d = b.shift();
							if (!d) {
								d = this.createShim();
								d.enableDisplayMode("block");
								d.dom.style.display = "none";
								d.dom.style.visibility = "visible"
							}
							var c = this.dom.parentNode;
							if (d.dom.parentNode != c) {
								c.insertBefore(d.dom, this.dom)
							}
							d.setStyle("z-index", this.getZIndex() - 2);
							this.shim = d;
							return d
						},
						hideShim : function() {
							if (this.shim) {
								this.shim.setDisplayed(false);
								b.push(this.shim);
								delete this.shim
							}
						},
						disableShadow : function() {
							if (this.shadow) {
								this.shadowDisabled = true;
								this.shadow.hide();
								this.lastShadowOffset = this.shadowOffset;
								this.shadowOffset = 0
							}
						},
						enableShadow : function(c) {
							if (this.shadow) {
								this.shadowDisabled = false;
								this.shadowOffset = this.lastShadowOffset;
								delete this.lastShadowOffset;
								if (c) {
									this.sync(true)
								}
							}
						},
						sync : function(c) {
							var k = this.shadow;
							if (!this.updating && this.isVisible()
									&& (k || this.useShim)) {
								var g = this.getShim();
								var j = this.getWidth(), e = this.getHeight();
								var d = this.getLeft(true), m = this
										.getTop(true);
								if (k && !this.shadowDisabled) {
									if (c && !k.isVisible()) {
										k.show(this)
									} else {
										k.realign(d, m, j, e)
									}
									if (g) {
										if (c) {
											g.show()
										}
										var i = k.adjusts, n = g.dom.style;
										n.left = (Math.min(d, d + i.l)) + "px";
										n.top = (Math.min(m, m + i.t)) + "px";
										n.width = (j + i.w) + "px";
										n.height = (e + i.h) + "px"
									}
								} else {
									if (g) {
										if (c) {
											g.show()
										}
										g.setSize(j, e);
										g.setLeftTop(d, m)
									}
								}
							}
						},
						destroy : function() {
							this.hideShim();
							if (this.shadow) {
								this.shadow.hide()
							}
							this.removeAllListeners();
							Ext.removeNode(this.dom);
							Ext.Element.uncache(this.id)
						},
						remove : function() {
							this.destroy()
						},
						beginUpdate : function() {
							this.updating = true
						},
						endUpdate : function() {
							this.updating = false;
							this.sync(true)
						},
						hideUnders : function(c) {
							if (this.shadow) {
								this.shadow.hide()
							}
							this.hideShim()
						},
						constrainXY : function() {
							if (this.constrain) {
								var j = Ext.lib.Dom.getViewWidth(), d = Ext.lib.Dom
										.getViewHeight();
								var o = Ext.getDoc().getScroll();
								var n = this.getXY();
								var k = n[0], i = n[1];
								var c = this.shadowOffset;
								var l = this.dom.offsetWidth + c, e = this.dom.offsetHeight
										+ c;
								var g = false;
								if ((k + l) > j + o.left) {
									k = j - l - c;
									g = true
								}
								if ((i + e) > d + o.top) {
									i = d - e - c;
									g = true
								}
								if (k < o.left) {
									k = o.left;
									g = true
								}
								if (i < o.top) {
									i = o.top;
									g = true
								}
								if (g) {
									if (this.avoidY) {
										var m = this.avoidY;
										if (i <= m && (i + e) >= m) {
											i = m - e - 5
										}
									}
									n = [ k, i ];
									this.storeXY(n);
									a.setXY.call(this, n);
									this.sync()
								}
							}
							return this
						},
						isVisible : function() {
							return this.visible
						},
						showAction : function() {
							this.visible = true;
							if (this.useDisplay === true) {
								this.setDisplayed("")
							} else {
								if (this.lastXY) {
									a.setXY.call(this, this.lastXY)
								} else {
									if (this.lastLT) {
										a.setLeftTop.call(this, this.lastLT[0],
												this.lastLT[1])
									}
								}
							}
						},
						hideAction : function() {
							this.visible = false;
							if (this.useDisplay === true) {
								this.setDisplayed(false)
							} else {
								this.setLeftTop(-10000, -10000)
							}
						},
						setVisible : function(i, h, k, l, j) {
							if (i) {
								this.showAction()
							}
							if (h && i) {
								var g = function() {
									this.sync(true);
									if (l) {
										l()
									}
								}.createDelegate(this);
								a.setVisible.call(this, true, true, k, g, j)
							} else {
								if (!i) {
									this.hideUnders(true)
								}
								var g = l;
								if (h) {
									g = function() {
										this.hideAction();
										if (l) {
											l()
										}
									}.createDelegate(this)
								}
								a.setVisible.call(this, i, h, k, g, j);
								if (i) {
									this.sync(true)
								} else {
									if (!h) {
										this.hideAction()
									}
								}
							}
							return this
						},
						storeXY : function(c) {
							delete this.lastLT;
							this.lastXY = c
						},
						storeLeftTop : function(d, c) {
							delete this.lastXY;
							this.lastLT = [ d, c ]
						},
						beforeFx : function() {
							this.beforeAction();
							return Ext.Layer.superclass.beforeFx.apply(this,
									arguments)
						},
						afterFx : function() {
							Ext.Layer.superclass.afterFx.apply(this, arguments);
							this.sync(this.isVisible())
						},
						beforeAction : function() {
							if (!this.updating && this.shadow) {
								this.shadow.hide()
							}
						},
						setLeft : function(c) {
							this.storeLeftTop(c, this.getTop(true));
							a.setLeft.apply(this, arguments);
							this.sync();
							return this
						},
						setTop : function(c) {
							this.storeLeftTop(this.getLeft(true), c);
							a.setTop.apply(this, arguments);
							this.sync();
							return this
						},
						setLeftTop : function(d, c) {
							this.storeLeftTop(d, c);
							a.setLeftTop.apply(this, arguments);
							this.sync();
							return this
						},
						setXY : function(j, h, k, l, i) {
							this.fixDisplay();
							this.beforeAction();
							this.storeXY(j);
							var g = this.createCB(l);
							a.setXY.call(this, j, h, k, g, i);
							if (!h) {
								g()
							}
							return this
						},
						createCB : function(e) {
							var d = this;
							return function() {
								d.constrainXY();
								d.sync(true);
								if (e) {
									e()
								}
							}
						},
						setX : function(g, h, j, k, i) {
							this.setXY( [ g, this.getY() ], h, j, k, i);
							return this
						},
						setY : function(k, g, i, j, h) {
							this.setXY( [ this.getX(), k ], g, i, j, h);
							return this
						},
						setSize : function(j, k, i, m, n, l) {
							this.beforeAction();
							var g = this.createCB(n);
							a.setSize.call(this, j, k, i, m, g, l);
							if (!i) {
								g()
							}
							return this
						},
						setWidth : function(i, h, k, l, j) {
							this.beforeAction();
							var g = this.createCB(l);
							a.setWidth.call(this, i, h, k, g, j);
							if (!h) {
								g()
							}
							return this
						},
						setHeight : function(j, i, l, m, k) {
							this.beforeAction();
							var g = this.createCB(m);
							a.setHeight.call(this, j, i, l, g, k);
							if (!i) {
								g()
							}
							return this
						},
						setBounds : function(o, m, p, i, n, k, l, j) {
							this.beforeAction();
							var g = this.createCB(l);
							if (!n) {
								this.storeXY( [ o, m ]);
								a.setXY.call(this, [ o, m ]);
								a.setSize.call(this, p, i, n, k, g, j);
								g()
							} else {
								a.setBounds.call(this, o, m, p, i, n, k, g, j)
							}
							return this
						},
						setZIndex : function(c) {
							this.zindex = c;
							this.setStyle("z-index", c + 2);
							if (this.shadow) {
								this.shadow.setZIndex(c + 1)
							}
							if (this.shim) {
								this.shim.setStyle("z-index", c)
							}
							return this
						}
					})
})();
Ext.Shadow = function(d) {
	Ext.apply(this, d);
	if (typeof this.mode != "string") {
		this.mode = this.defaultMode
	}
	var e = this.offset, c = {
		h : 0
	};
	var b = Math.floor(this.offset / 2);
	switch (this.mode.toLowerCase()) {
	case "drop":
		c.w = 0;
		c.l = c.t = e;
		c.t -= 1;
		if (Ext.isIE) {
			c.l -= this.offset + b;
			c.t -= this.offset + b;
			c.w -= b;
			c.h -= b;
			c.t += 1
		}
		break;
	case "sides":
		c.w = (e * 2);
		c.l = -e;
		c.t = e - 1;
		if (Ext.isIE) {
			c.l -= (this.offset - b);
			c.t -= this.offset + b;
			c.l += 1;
			c.w -= (this.offset - b) * 2;
			c.w -= b + 1;
			c.h -= 1
		}
		break;
	case "frame":
		c.w = c.h = (e * 2);
		c.l = c.t = -e;
		c.t += 1;
		c.h -= 2;
		if (Ext.isIE) {
			c.l -= (this.offset - b);
			c.t -= (this.offset - b);
			c.l += 1;
			c.w -= (this.offset + b + 1);
			c.h -= (this.offset + b);
			c.h += 1
		}
		break
	}
	this.adjusts = c
};
Ext.Shadow.prototype = {
	offset : 4,
	defaultMode : "drop",
	show : function(a) {
		a = Ext.get(a);
		if (!this.el) {
			this.el = Ext.Shadow.Pool.pull();
			if (this.el.dom.nextSibling != a.dom) {
				this.el.insertBefore(a)
			}
		}
		this.el.setStyle("z-index", this.zIndex
				|| parseInt(a.getStyle("z-index"), 10) - 1);
		if (Ext.isIE) {
			this.el.dom.style.filter = "progid:DXImageTransform.Microsoft.alpha(opacity=50) progid:DXImageTransform.Microsoft.Blur(pixelradius="
					+ (this.offset) + ")"
		}
		this.realign(a.getLeft(true), a.getTop(true), a.getWidth(), a
				.getHeight());
		this.el.dom.style.display = "block"
	},
	isVisible : function() {
		return this.el ? true : false
	},
	realign : function(b, r, q, g) {
		if (!this.el) {
			return
		}
		var n = this.adjusts, k = this.el.dom, u = k.style;
		var i = 0;
		u.left = (b + n.l) + "px";
		u.top = (r + n.t) + "px";
		var p = (q + n.w), e = (g + n.h), j = p + "px", o = e + "px";
		if (u.width != j || u.height != o) {
			u.width = j;
			u.height = o;
			if (!Ext.isIE) {
				var m = k.childNodes;
				var c = Math.max(0, (p - 12)) + "px";
				m[0].childNodes[1].style.width = c;
				m[1].childNodes[1].style.width = c;
				m[2].childNodes[1].style.width = c;
				m[1].style.height = Math.max(0, (e - 12)) + "px"
			}
		}
	},
	hide : function() {
		if (this.el) {
			this.el.dom.style.display = "none";
			Ext.Shadow.Pool.push(this.el);
			delete this.el
		}
	},
	setZIndex : function(a) {
		this.zIndex = a;
		if (this.el) {
			this.el.setStyle("z-index", a)
		}
	}
};
Ext.Shadow.Pool = function() {
	var b = [];
	var a = Ext.isIE ? '<div class="x-ie-shadow"></div>'
			: '<div class="x-shadow"><div class="xst"><div class="xstl"></div><div class="xstc"></div><div class="xstr"></div></div><div class="xsc"><div class="xsml"></div><div class="xsmc"></div><div class="xsmr"></div></div><div class="xsb"><div class="xsbl"></div><div class="xsbc"></div><div class="xsbr"></div></div></div>';
	return {
		pull : function() {
			var c = b.shift();
			if (!c) {
				c = Ext.get(Ext.DomHelper.insertHtml("beforeBegin",
						document.body.firstChild, a));
				c.autoBoxAdjust = false
			}
			return c
		},
		push : function(c) {
			b.push(c)
		}
	}
}();
Ext.BoxComponent = Ext.extend(Ext.Component, {
	initComponent : function() {
		Ext.BoxComponent.superclass.initComponent.call(this);
		this.addEvents("resize", "move")
	},
	boxReady : false,
	deferHeight : false,
	setSize : function(b, d) {
		if (typeof b == "object") {
			d = b.height;
			b = b.width
		}
		if (!this.boxReady) {
			this.width = b;
			this.height = d;
			return this
		}
		if (this.cacheSizes !== false && this.lastSize
				&& this.lastSize.width == b && this.lastSize.height == d) {
			return this
		}
		this.lastSize = {
			width : b,
			height : d
		};
		var c = this.adjustSize(b, d);
		var g = c.width, a = c.height;
		if (g !== undefined || a !== undefined) {
			var e = this.getResizeEl();
			if (!this.deferHeight && g !== undefined && a !== undefined) {
				e.setSize(g, a)
			} else {
				if (!this.deferHeight && a !== undefined) {
					e.setHeight(a)
				} else {
					if (g !== undefined) {
						e.setWidth(g)
					}
				}
			}
			this.onResize(g, a, b, d);
			this.fireEvent("resize", this, g, a, b, d)
		}
		return this
	},
	setWidth : function(a) {
		return this.setSize(a)
	},
	setHeight : function(a) {
		return this.setSize(undefined, a)
	},
	getSize : function() {
		return this.getResizeEl().getSize()
	},
	getWidth : function() {
		return this.getResizeEl().getWidth()
	},
	getHeight : function() {
		return this.getResizeEl().getHeight()
	},
	getOuterSize : function() {
		var a = this.getResizeEl();
		return {
			width : a.getWidth() + a.getMargins("lr"),
			height : a.getHeight() + a.getMargins("tb")
		}
	},
	getPosition : function(a) {
		var b = this.getPositionEl();
		if (a === true) {
			return [ b.getLeft(true), b.getTop(true) ]
		}
		return this.xy || b.getXY()
	},
	getBox : function(a) {
		var c = this.getPosition(a);
		var b = this.getSize();
		b.x = c[0];
		b.y = c[1];
		return b
	},
	updateBox : function(a) {
		this.setSize(a.width, a.height);
		this.setPagePosition(a.x, a.y);
		return this
	},
	getResizeEl : function() {
		return this.resizeEl || this.el
	},
	getPositionEl : function() {
		return this.positionEl || this.el
	},
	setPosition : function(a, g) {
		if (a && typeof a[1] == "number") {
			g = a[1];
			a = a[0]
		}
		this.x = a;
		this.y = g;
		if (!this.boxReady) {
			return this
		}
		var b = this.adjustPosition(a, g);
		var e = b.x, d = b.y;
		var c = this.getPositionEl();
		if (e !== undefined || d !== undefined) {
			if (e !== undefined && d !== undefined) {
				c.setLeftTop(e, d)
			} else {
				if (e !== undefined) {
					c.setLeft(e)
				} else {
					if (d !== undefined) {
						c.setTop(d)
					}
				}
			}
			this.onPosition(e, d);
			this.fireEvent("move", this, e, d)
		}
		return this
	},
	setPagePosition : function(a, c) {
		if (a && typeof a[1] == "number") {
			c = a[1];
			a = a[0]
		}
		this.pageX = a;
		this.pageY = c;
		if (!this.boxReady) {
			return
		}
		if (a === undefined || c === undefined) {
			return
		}
		var b = this.getPositionEl().translatePoints(a, c);
		this.setPosition(b.left, b.top);
		return this
	},
	onRender : function(b, a) {
		Ext.BoxComponent.superclass.onRender.call(this, b, a);
		if (this.resizeEl) {
			this.resizeEl = Ext.get(this.resizeEl)
		}
		if (this.positionEl) {
			this.positionEl = Ext.get(this.positionEl)
		}
	},
	afterRender : function() {
		Ext.BoxComponent.superclass.afterRender.call(this);
		this.boxReady = true;
		this.setSize(this.width, this.height);
		if (this.x || this.y) {
			this.setPosition(this.x, this.y)
		} else {
			if (this.pageX || this.pageY) {
				this.setPagePosition(this.pageX, this.pageY)
			}
		}
	},
	syncSize : function() {
		delete this.lastSize;
		this.setSize(
				this.autoWidth ? undefined : this.getResizeEl().getWidth(),
				this.autoHeight ? undefined : this.getResizeEl().getHeight());
		return this
	},
	onResize : function(d, b, a, c) {
	},
	onPosition : function(a, b) {
	},
	adjustSize : function(a, b) {
		if (this.autoWidth) {
			a = "auto"
		}
		if (this.autoHeight) {
			b = "auto"
		}
		return {
			width : a,
			height : b
		}
	},
	adjustPosition : function(a, b) {
		return {
			x : a,
			y : b
		}
	}
});
Ext.reg("box", Ext.BoxComponent);
Ext.Spacer = Ext.extend(Ext.BoxComponent, {
	autoEl : "div"
});
Ext.reg("spacer", Ext.Spacer);
Ext.SplitBar = function(c, e, b, d, a) {
	this.el = Ext.get(c, true);
	this.el.dom.unselectable = "on";
	this.resizingEl = Ext.get(e, true);
	this.orientation = b || Ext.SplitBar.HORIZONTAL;
	this.minSize = 0;
	this.maxSize = 2000;
	this.animate = false;
	this.useShim = false;
	this.shim = null;
	if (!a) {
		this.proxy = Ext.SplitBar.createProxy(this.orientation)
	} else {
		this.proxy = Ext.get(a).dom
	}
	this.dd = new Ext.dd.DDProxy(this.el.dom.id, "XSplitBars", {
		dragElId : this.proxy.id
	});
	this.dd.b4StartDrag = this.onStartProxyDrag.createDelegate(this);
	this.dd.endDrag = this.onEndProxyDrag.createDelegate(this);
	this.dragSpecs = {};
	this.adapter = new Ext.SplitBar.BasicLayoutAdapter();
	this.adapter.init(this);
	if (this.orientation == Ext.SplitBar.HORIZONTAL) {
		this.placement = d
				|| (this.el.getX() > this.resizingEl.getX() ? Ext.SplitBar.LEFT
						: Ext.SplitBar.RIGHT);
		this.el.addClass("x-splitbar-h")
	} else {
		this.placement = d
				|| (this.el.getY() > this.resizingEl.getY() ? Ext.SplitBar.TOP
						: Ext.SplitBar.BOTTOM);
		this.el.addClass("x-splitbar-v")
	}
	this.addEvents("resize", "moved", "beforeresize", "beforeapply");
	Ext.SplitBar.superclass.constructor.call(this)
};
Ext.extend(Ext.SplitBar, Ext.util.Observable,
		{
			onStartProxyDrag : function(a, e) {
				this.fireEvent("beforeresize", this);
				this.overlay = Ext.DomHelper.append(document.body, {
					cls : "x-drag-overlay",
					html : "&#160;"
				}, true);
				this.overlay.unselectable();
				this.overlay.setSize(Ext.lib.Dom.getViewWidth(true),
						Ext.lib.Dom.getViewHeight(true));
				this.overlay.show();
				Ext.get(this.proxy).setDisplayed("block");
				var c = this.adapter.getElementSize(this);
				this.activeMinSize = this.getMinimumSize();
				this.activeMaxSize = this.getMaximumSize();
				var d = c - this.activeMinSize;
				var b = Math.max(this.activeMaxSize - c, 0);
				if (this.orientation == Ext.SplitBar.HORIZONTAL) {
					this.dd.resetConstraints();
					this.dd.setXConstraint(
							this.placement == Ext.SplitBar.LEFT ? d : b,
							this.placement == Ext.SplitBar.LEFT ? b : d,
							this.tickSize);
					this.dd.setYConstraint(0, 0)
				} else {
					this.dd.resetConstraints();
					this.dd.setXConstraint(0, 0);
					this.dd.setYConstraint(
							this.placement == Ext.SplitBar.TOP ? d : b,
							this.placement == Ext.SplitBar.TOP ? b : d,
							this.tickSize)
				}
				this.dragSpecs.startSize = c;
				this.dragSpecs.startPoint = [ a, e ];
				Ext.dd.DDProxy.prototype.b4StartDrag.call(this.dd, a, e)
			},
			onEndProxyDrag : function(c) {
				Ext.get(this.proxy).setDisplayed(false);
				var b = Ext.lib.Event.getXY(c);
				if (this.overlay) {
					Ext.destroy(this.overlay);
					delete this.overlay
				}
				var a;
				if (this.orientation == Ext.SplitBar.HORIZONTAL) {
					a = this.dragSpecs.startSize
							+ (this.placement == Ext.SplitBar.LEFT ? b[0]
									- this.dragSpecs.startPoint[0]
									: this.dragSpecs.startPoint[0] - b[0])
				} else {
					a = this.dragSpecs.startSize
							+ (this.placement == Ext.SplitBar.TOP ? b[1]
									- this.dragSpecs.startPoint[1]
									: this.dragSpecs.startPoint[1] - b[1])
				}
				a = Math.min(Math.max(a, this.activeMinSize),
						this.activeMaxSize);
				if (a != this.dragSpecs.startSize) {
					if (this.fireEvent("beforeapply", this, a) !== false) {
						this.adapter.setElementSize(this, a);
						this.fireEvent("moved", this, a);
						this.fireEvent("resize", this, a)
					}
				}
			},
			getAdapter : function() {
				return this.adapter
			},
			setAdapter : function(a) {
				this.adapter = a;
				this.adapter.init(this)
			},
			getMinimumSize : function() {
				return this.minSize
			},
			setMinimumSize : function(a) {
				this.minSize = a
			},
			getMaximumSize : function() {
				return this.maxSize
			},
			setMaximumSize : function(a) {
				this.maxSize = a
			},
			setCurrentSize : function(b) {
				var a = this.animate;
				this.animate = false;
				this.adapter.setElementSize(this, b);
				this.animate = a
			},
			destroy : function(a) {
				Ext.destroy(this.shim, Ext.get(this.proxy));
				this.dd.unreg();
				if (a) {
					this.el.remove()
				}
				this.purgeListeners()
			}
		});
Ext.SplitBar.createProxy = function(b) {
	var c = new Ext.Element(document.createElement("div"));
	c.unselectable();
	var a = "x-splitbar-proxy";
	c.addClass(a + " " + (b == Ext.SplitBar.HORIZONTAL ? a + "-h" : a + "-v"));
	document.body.appendChild(c.dom);
	return c.dom
};
Ext.SplitBar.BasicLayoutAdapter = function() {
};
Ext.SplitBar.BasicLayoutAdapter.prototype = {
	init : function(a) {
	},
	getElementSize : function(a) {
		if (a.orientation == Ext.SplitBar.HORIZONTAL) {
			return a.resizingEl.getWidth()
		} else {
			return a.resizingEl.getHeight()
		}
	},
	setElementSize : function(b, a, c) {
		if (b.orientation == Ext.SplitBar.HORIZONTAL) {
			if (!b.animate) {
				b.resizingEl.setWidth(a);
				if (c) {
					c(b, a)
				}
			} else {
				b.resizingEl.setWidth(a, true, 0.1, c, "easeOut")
			}
		} else {
			if (!b.animate) {
				b.resizingEl.setHeight(a);
				if (c) {
					c(b, a)
				}
			} else {
				b.resizingEl.setHeight(a, true, 0.1, c, "easeOut")
			}
		}
	}
};
Ext.SplitBar.AbsoluteLayoutAdapter = function(a) {
	this.basic = new Ext.SplitBar.BasicLayoutAdapter();
	this.container = Ext.get(a)
};
Ext.SplitBar.AbsoluteLayoutAdapter.prototype = {
	init : function(a) {
		this.basic.init(a)
	},
	getElementSize : function(a) {
		return this.basic.getElementSize(a)
	},
	setElementSize : function(b, a, c) {
		this.basic.setElementSize(b, a, this.moveSplitter.createDelegate(this,
				[ b ]))
	},
	moveSplitter : function(a) {
		var b = Ext.SplitBar;
		switch (a.placement) {
		case b.LEFT:
			a.el.setX(a.resizingEl.getRight());
			break;
		case b.RIGHT:
			a.el.setStyle("right", (this.container.getWidth() - a.resizingEl
					.getLeft())
					+ "px");
			break;
		case b.TOP:
			a.el.setY(a.resizingEl.getBottom());
			break;
		case b.BOTTOM:
			a.el.setY(a.resizingEl.getTop() - a.el.getHeight());
			break
		}
	}
};
Ext.SplitBar.VERTICAL = 1;
Ext.SplitBar.HORIZONTAL = 2;
Ext.SplitBar.LEFT = 1;
Ext.SplitBar.RIGHT = 2;
Ext.SplitBar.TOP = 3;
Ext.SplitBar.BOTTOM = 4;
Ext.Container = Ext.extend(Ext.BoxComponent, {
	bufferResize : 100,
	autoDestroy : true,
	forceLayout : false,
	defaultType : "panel",
	initComponent : function() {
		Ext.Container.superclass.initComponent.call(this);
		this.addEvents("afterlayout", "beforeadd", "beforeremove", "add",
				"remove");
		this.enableBubble("add", "remove");
		var a = this.items;
		if (a) {
			delete this.items;
			if (Ext.isArray(a) && a.length > 0) {
				this.add.apply(this, a)
			} else {
				this.add(a)
			}
		}
	},
	initItems : function() {
		if (!this.items) {
			this.items = new Ext.util.MixedCollection(false,
					this.getComponentId);
			this.getLayout()
		}
	},
	setLayout : function(a) {
		if (this.layout && this.layout != a) {
			this.layout.setContainer(null)
		}
		this.initItems();
		this.layout = a;
		a.setContainer(this)
	},
	render : function() {
		Ext.Container.superclass.render.apply(this, arguments);
		if (this.layout) {
			if (Ext.isObject(this.layout) && !this.layout.layout) {
				this.layoutConfig = this.layout;
				this.layout = this.layoutConfig.type
			}
			if (typeof this.layout == "string") {
				this.layout = new Ext.Container.LAYOUTS[this.layout
						.toLowerCase()](this.layoutConfig)
			}
			this.setLayout(this.layout);
			if (this.activeItem !== undefined) {
				var a = this.activeItem;
				delete this.activeItem;
				this.layout.setActiveItem(a)
			}
		}
		if (!this.ownerCt) {
			this.doLayout(false, true)
		}
		if (this.monitorResize === true) {
			Ext.EventManager.onWindowResize(this.doLayout, this, [ false ])
		}
	},
	getLayoutTarget : function() {
		return this.el
	},
	getComponentId : function(a) {
		return a.getItemId()
	},
	add : function(a) {
		this.initItems();
		var b = arguments.length > 1;
		if (b || Ext.isArray(a)) {
			Ext.each(b ? arguments : a, function(g) {
				this.add(g)
			}, this);
			return
		}
		var e = this.lookupComponent(this.applyDefaults(a));
		var d = this.items.length;
		if (this.fireEvent("beforeadd", this, e, d) !== false
				&& this.onBeforeAdd(e) !== false) {
			this.items.add(e);
			e.ownerCt = this;
			this.fireEvent("add", this, e, d)
		}
		return e
	},
	insert : function(g, e) {
		this.initItems();
		var d = arguments, b = d.length;
		if (b > 2) {
			for ( var h = b - 1; h >= 1; --h) {
				this.insert(g, d[h])
			}
			return
		}
		var j = this.lookupComponent(this.applyDefaults(e));
		if (j.ownerCt == this && this.items.indexOf(j) < g) {
			--g
		}
		if (this.fireEvent("beforeadd", this, j, g) !== false
				&& this.onBeforeAdd(j) !== false) {
			this.items.insert(g, j);
			j.ownerCt = this;
			this.fireEvent("add", this, j, g)
		}
		return j
	},
	applyDefaults : function(a) {
		if (this.defaults) {
			if (typeof a == "string") {
				a = Ext.ComponentMgr.get(a);
				Ext.apply(a, this.defaults)
			} else {
				if (!a.events) {
					Ext.applyIf(a, this.defaults)
				} else {
					Ext.apply(a, this.defaults)
				}
			}
		}
		return a
	},
	onBeforeAdd : function(a) {
		if (a.ownerCt) {
			a.ownerCt.remove(a, false)
		}
		if (this.hideBorders === true) {
			a.border = (a.border === true)
		}
	},
	remove : function(a, b) {
		this.initItems();
		var d = this.getComponent(a);
		if (d && this.fireEvent("beforeremove", this, d) !== false) {
			this.items.remove(d);
			delete d.ownerCt;
			if (b === true || (b !== false && this.autoDestroy)) {
				d.destroy()
			}
			if (this.layout && this.layout.activeItem == d) {
				delete this.layout.activeItem
			}
			this.fireEvent("remove", this, d)
		}
		return d
	},
	removeAll : function(c) {
		this.initItems();
		var e, g = [], b = [];
		this.items.each( function(h) {
			g.push(h)
		});
		for ( var d = 0, a = g.length; d < a; ++d) {
			e = g[d];
			this.remove(e, c);
			if (e.ownerCt !== this) {
				b.push(e)
			}
		}
		return b
	},
	getComponent : function(a) {
		if (Ext.isObject(a)) {
			return a
		}
		return this.items.get(a)
	},
	lookupComponent : function(a) {
		if (typeof a == "string") {
			return Ext.ComponentMgr.get(a)
		} else {
			if (!a.events) {
				return this.createComponent(a)
			}
		}
		return a
	},
	createComponent : function(a) {
		return Ext.create(a, this.defaultType)
	},
	doLayout : function(g, e) {
		var k = this.rendered, j = this.forceLayout;
		if (!this.isVisible() || this.collapsed) {
			this.deferLayout = this.deferLayout || !g;
			if (!(e || j)) {
				return
			}
			g = g && !this.deferLayout
		} else {
			delete this.deferLayout
		}
		if (k && this.layout) {
			this.layout.layout()
		}
		if (g !== true && this.items) {
			var d = this.items.items;
			for ( var b = 0, a = d.length; b < a; b++) {
				var h = d[b];
				if (h.doLayout) {
					h.forceLayout = j;
					h.doLayout()
				}
			}
		}
		if (k) {
			this.onLayout(g, e)
		}
		delete this.forceLayout
	},
	onLayout : Ext.emptyFn,
	onShow : function() {
		Ext.Container.superclass.onShow.call(this);
		if (this.deferLayout !== undefined) {
			this.doLayout(true)
		}
	},
	getLayout : function() {
		if (!this.layout) {
			var a = new Ext.layout.ContainerLayout(this.layoutConfig);
			this.setLayout(a)
		}
		return this.layout
	},
	beforeDestroy : function() {
		if (this.items) {
			Ext.destroy.apply(Ext, this.items.items)
		}
		if (this.monitorResize) {
			Ext.EventManager.removeResizeListener(this.doLayout, this)
		}
		Ext.destroy(this.layout);
		Ext.Container.superclass.beforeDestroy.call(this)
	},
	bubble : function(c, b, a) {
		var d = this;
		while (d) {
			if (c.apply(b || d, a || [ d ]) === false) {
				break
			}
			d = d.ownerCt
		}
		return this
	},
	cascade : function(g, e, b) {
		if (g.apply(e || this, b || [ this ]) !== false) {
			if (this.items) {
				var d = this.items.items;
				for ( var c = 0, a = d.length; c < a; c++) {
					if (d[c].cascade) {
						d[c].cascade(g, e, b)
					} else {
						g.apply(e || d[c], b || [ d[c] ])
					}
				}
			}
		}
		return this
	},
	findById : function(c) {
		var a, b = this;
		this.cascade( function(d) {
			if (b != d && d.id === c) {
				a = d;
				return false
			}
		});
		return a || null
	},
	findByType : function(b, a) {
		return this.findBy( function(d) {
			return d.isXType(b, a)
		})
	},
	find : function(b, a) {
		return this.findBy( function(d) {
			return d[b] === a
		})
	},
	findBy : function(d, c) {
		var a = [], b = this;
		this.cascade( function(e) {
			if (b != e && d.call(c || e, e, b) === true) {
				a.push(e)
			}
		});
		return a
	},
	get : function(a) {
		return this.items.get(a)
	}
});
Ext.Container.LAYOUTS = {};
Ext.reg("container", Ext.Container);
Ext.layout.ContainerLayout = function(a) {
	Ext.apply(this, a)
};
Ext.layout.ContainerLayout.prototype = {
	monitorResize : false,
	activeItem : null,
	layout : function() {
		var a = this.container.getLayoutTarget();
		this.onLayout(this.container, a);
		this.container.fireEvent("afterlayout", this.container, this)
	},
	onLayout : function(a, b) {
		this.renderAll(a, b)
	},
	isValidParent : function(b, a) {
		return a && b.getDomPositionEl().dom.parentNode == (a.dom || a)
	},
	renderAll : function(e, g) {
		var b = e.items.items;
		for ( var d = 0, a = b.length; d < a; d++) {
			var h = b[d];
			if (h && (!h.rendered || !this.isValidParent(h, g))) {
				this.renderItem(h, d, g)
			}
		}
	},
	renderItem : function(d, a, b) {
		if (d && !d.rendered) {
			d.render(b, a);
			this.configureItem(d, a)
		} else {
			if (d && !this.isValidParent(d, b)) {
				if (typeof a == "number") {
					a = b.dom.childNodes[a]
				}
				b.dom.insertBefore(d.getDomPositionEl().dom, a || null);
				d.container = b;
				this.configureItem(d, a)
			}
		}
	},
	configureItem : function(d, a) {
		if (this.extraCls) {
			var b = d.getPositionEl ? d.getPositionEl() : d;
			b.addClass(this.extraCls)
		}
		if (this.renderHidden && d != this.activeItem) {
			d.hide()
		}
		if (d.doLayout) {
			d.doLayout(false, this.forceLayout)
		}
	},
	onResize : function() {
		if (this.container.collapsed) {
			return
		}
		var a = this.container.bufferResize;
		if (a) {
			if (!this.resizeTask) {
				this.resizeTask = new Ext.util.DelayedTask(this.runLayout, this);
				this.resizeBuffer = typeof a == "number" ? a : 100
			}
			this.resizeTask.delay(this.resizeBuffer)
		} else {
			this.runLayout()
		}
	},
	runLayout : function() {
		this.layout();
		this.container.onLayout()
	},
	setContainer : function(a) {
		if (this.monitorResize && a != this.container) {
			if (this.container) {
				this.container.un("resize", this.onResize, this);
				this.container.un("bodyresize", this.onResize, this)
			}
			if (a) {
				a.on( {
					scope : this,
					resize : this.onResize,
					bodyresize : this.onResize
				})
			}
		}
		this.container = a
	},
	parseMargins : function(b) {
		if (typeof b == "number") {
			b = b.toString()
		}
		var c = b.split(" ");
		var a = c.length;
		if (a == 1) {
			c[1] = c[0];
			c[2] = c[0];
			c[3] = c[0]
		}
		if (a == 2) {
			c[2] = c[0];
			c[3] = c[1]
		}
		if (a == 3) {
			c[3] = c[1]
		}
		return {
			top : parseInt(c[0], 10) || 0,
			right : parseInt(c[1], 10) || 0,
			bottom : parseInt(c[2], 10) || 0,
			left : parseInt(c[3], 10) || 0
		}
	},
	fieldTpl : ( function() {
		var a = new Ext.Template(
				'<div class="x-form-item {itemCls}" tabIndex="-1">',
				'<label for="{id}" style="{labelStyle}" class="x-form-item-label">{label}{labelSeparator}</label>',
				'<div class="x-form-element" id="x-form-el-{id}" style="{elementStyle}">',
				'</div><div class="{clearCls}"></div>', "</div>");
		a.disableFormats = true;
		return a.compile()
	})(),
	destroy : Ext.emptyFn
};
Ext.Container.LAYOUTS.auto = Ext.layout.ContainerLayout;
Ext.layout.FitLayout = Ext.extend(Ext.layout.ContainerLayout, {
	monitorResize : true,
	onLayout : function(a, c) {
		Ext.layout.FitLayout.superclass.onLayout.call(this, a, c);
		if (!this.container.collapsed) {
			var b = (Ext.isIE6 && Ext.isStrict && c.dom == document.body) ? c
					.getViewSize() : c.getStyleSize();
			this.setItemSize(this.activeItem || a.items.itemAt(0), b)
		}
	},
	setItemSize : function(b, a) {
		if (b && a.height > 0) {
			b.setSize(a)
		}
	}
});
Ext.Container.LAYOUTS.fit = Ext.layout.FitLayout;
Ext.layout.CardLayout = Ext.extend(Ext.layout.FitLayout, {
	deferredRender : false,
	layoutOnCardChange : false,
	renderHidden : true,
	constructor : function(a) {
		Ext.layout.CardLayout.superclass.constructor.call(this, a);
		this.forceLayout = (this.deferredRender === false)
	},
	setActiveItem : function(a) {
		a = this.container.getComponent(a);
		if (this.activeItem != a) {
			if (this.activeItem) {
				this.activeItem.hide()
			}
			this.activeItem = a;
			a.show();
			this.container.doLayout();
			if (this.layoutOnCardChange && a.doLayout) {
				a.doLayout()
			}
		}
	},
	renderAll : function(a, b) {
		if (this.deferredRender) {
			this.renderItem(this.activeItem, undefined, b)
		} else {
			Ext.layout.CardLayout.superclass.renderAll.call(this, a, b)
		}
	}
});
Ext.Container.LAYOUTS.card = Ext.layout.CardLayout;
Ext.layout.AnchorLayout = Ext.extend(Ext.layout.ContainerLayout,
		{
			monitorResize : true,
			getAnchorViewSize : function(a, b) {
				return b.dom == document.body ? b.getViewSize() : b
						.getStyleSize()
			},
			onLayout : function(k, n) {
				Ext.layout.AnchorLayout.superclass.onLayout.call(this, k, n);
				var t = this.getAnchorViewSize(k, n);
				var r = t.width, j = t.height;
				if (r < 20 && j < 20) {
					return
				}
				var d, p;
				if (k.anchorSize) {
					if (typeof k.anchorSize == "number") {
						d = k.anchorSize
					} else {
						d = k.anchorSize.width;
						p = k.anchorSize.height
					}
				} else {
					d = k.initialConfig.width;
					p = k.initialConfig.height
				}
				var m = k.items.items, l = m.length, g, o, q, e, b;
				for (g = 0; g < l; g++) {
					o = m[g];
					if (o.anchor) {
						q = o.anchorSpec;
						if (!q) {
							var s = o.anchor.split(" ");
							o.anchorSpec = q = {
								right : this.parseAnchor(s[0],
										o.initialConfig.width, d),
								bottom : this.parseAnchor(s[1],
										o.initialConfig.height, p)
							}
						}
						e = q.right ? this.adjustWidthAnchor(q.right(r), o)
								: undefined;
						b = q.bottom ? this.adjustHeightAnchor(q.bottom(j), o)
								: undefined;
						if (e || b) {
							o.setSize(e || undefined, b || undefined)
						}
					}
				}
			},
			parseAnchor : function(c, h, b) {
				if (c && c != "none") {
					var e;
					if (/^(r|right|b|bottom)$/i.test(c)) {
						var g = b - h;
						return function(a) {
							if (a !== e) {
								e = a;
								return a - g
							}
						}
					} else {
						if (c.indexOf("%") != -1) {
							var d = parseFloat(c.replace("%", "")) * 0.01;
							return function(a) {
								if (a !== e) {
									e = a;
									return Math.floor(a * d)
								}
							}
						} else {
							c = parseInt(c, 10);
							if (!isNaN(c)) {
								return function(a) {
									if (a !== e) {
										e = a;
										return a + c
									}
								}
							}
						}
					}
				}
				return false
			},
			adjustWidthAnchor : function(b, a) {
				return b
			},
			adjustHeightAnchor : function(b, a) {
				return b
			}
		});
Ext.Container.LAYOUTS.anchor = Ext.layout.AnchorLayout;
Ext.layout.ColumnLayout = Ext
		.extend(
				Ext.layout.ContainerLayout,
				{
					monitorResize : true,
					extraCls : "x-column",
					scrollOffset : 0,
					isValidParent : function(b, a) {
						return (b.getPositionEl ? b.getPositionEl() : b.getEl()).dom.parentNode == this.innerCt.dom
					},
					onLayout : function(d, j) {
						var e = d.items.items, g = e.length, k, a;
						if (!this.innerCt) {
							j.addClass("x-column-layout-ct");
							this.innerCt = j.createChild( {
								cls : "x-column-inner"
							});
							this.innerCt.createChild( {
								cls : "x-clear"
							})
						}
						this.renderAll(d, this.innerCt);
						var n = Ext.isIE && j.dom != Ext.getBody().dom ? j
								.getStyleSize() : j.getViewSize();
						if (n.width < 1 && n.height < 1) {
							return
						}
						var l = n.width - j.getPadding("lr")
								- this.scrollOffset, b = n.height
								- j.getPadding("tb"), m = l;
						this.innerCt.setWidth(l);
						for (a = 0; a < g; a++) {
							k = e[a];
							if (!k.columnWidth) {
								m -= (k.getSize().width + k.getEl().getMargins(
										"lr"))
							}
						}
						m = m < 0 ? 0 : m;
						for (a = 0; a < g; a++) {
							k = e[a];
							if (k.columnWidth) {
								k.setSize(Math.floor(k.columnWidth * m)
										- k.getEl().getMargins("lr"))
							}
						}
					}
				});
Ext.Container.LAYOUTS.column = Ext.layout.ColumnLayout;
Ext.layout.BorderLayout = Ext
		.extend(
				Ext.layout.ContainerLayout,
				{
					monitorResize : true,
					rendered : false,
					onLayout : function(d, H) {
						var g;
						if (!this.rendered) {
							H.addClass("x-border-layout-ct");
							var v = d.items.items;
							g = [];
							for ( var A = 0, B = v.length; A < B; A++) {
								var E = v[A];
								var l = E.region;
								if (E.collapsed) {
									g.push(E)
								}
								E.collapsed = false;
								if (!E.rendered) {
									E.cls = E.cls ? E.cls + " x-border-panel"
											: "x-border-panel";
									E.render(H, A)
								}
								this[l] = l != "center" && E.split ? new Ext.layout.BorderLayout.SplitRegion(
										this, E.initialConfig, l)
										: new Ext.layout.BorderLayout.Region(
												this, E.initialConfig, l);
								this[l].render(H, E)
							}
							this.rendered = true
						}
						var u = H.getViewSize();
						if (u.width < 20 || u.height < 20) {
							if (g) {
								this.restoreCollapsed = g
							}
							return
						} else {
							if (this.restoreCollapsed) {
								g = this.restoreCollapsed;
								delete this.restoreCollapsed
							}
						}
						var r = u.width, C = u.height;
						var q = r, z = C, o = 0, p = 0;
						var x = this.north, t = this.south, k = this.west, D = this.east, E = this.center;
						if (!E && Ext.layout.BorderLayout.WARN !== false) {
							throw "No center region defined in BorderLayout "
									+ d.id
						}
						if (x && x.isVisible()) {
							var G = x.getSize();
							var y = x.getMargins();
							G.width = r - (y.left + y.right);
							G.x = y.left;
							G.y = y.top;
							o = G.height + G.y + y.bottom;
							z -= o;
							x.applyLayout(G)
						}
						if (t && t.isVisible()) {
							var G = t.getSize();
							var y = t.getMargins();
							G.width = r - (y.left + y.right);
							G.x = y.left;
							var F = (G.height + y.top + y.bottom);
							G.y = C - F + y.top;
							z -= F;
							t.applyLayout(G)
						}
						if (k && k.isVisible()) {
							var G = k.getSize();
							var y = k.getMargins();
							G.height = z - (y.top + y.bottom);
							G.x = y.left;
							G.y = o + y.top;
							var a = (G.width + y.left + y.right);
							p += a;
							q -= a;
							k.applyLayout(G)
						}
						if (D && D.isVisible()) {
							var G = D.getSize();
							var y = D.getMargins();
							G.height = z - (y.top + y.bottom);
							var a = (G.width + y.left + y.right);
							G.x = r - a + y.left;
							G.y = o + y.top;
							q -= a;
							D.applyLayout(G)
						}
						if (E) {
							var y = E.getMargins();
							var j = {
								x : p + y.left,
								y : o + y.top,
								width : q - (y.left + y.right),
								height : z - (y.top + y.bottom)
							};
							E.applyLayout(j)
						}
						if (g) {
							for ( var A = 0, B = g.length; A < B; A++) {
								g[A].collapse(false)
							}
						}
						if (Ext.isIE && Ext.isStrict) {
							H.repaint()
						}
					},
					destroy : function() {
						var b = [ "north", "south", "east", "west" ];
						for ( var a = 0; a < b.length; a++) {
							var c = this[b[a]];
							if (c) {
								if (c.destroy) {
									c.destroy()
								} else {
									if (c.split) {
										c.split.destroy(true)
									}
								}
							}
						}
						Ext.layout.BorderLayout.superclass.destroy.call(this)
					}
				});
Ext.layout.BorderLayout.Region = function(b, a, c) {
	Ext.apply(this, a);
	this.layout = b;
	this.position = c;
	this.state = {};
	if (typeof this.margins == "string") {
		this.margins = this.layout.parseMargins(this.margins)
	}
	this.margins = Ext.applyIf(this.margins || {}, this.defaultMargins);
	if (this.collapsible) {
		if (typeof this.cmargins == "string") {
			this.cmargins = this.layout.parseMargins(this.cmargins)
		}
		if (this.collapseMode == "mini" && !this.cmargins) {
			this.cmargins = {
				left : 0,
				top : 0,
				right : 0,
				bottom : 0
			}
		} else {
			this.cmargins = Ext.applyIf(this.cmargins || {}, c == "north"
					|| c == "south" ? this.defaultNSCMargins
					: this.defaultEWCMargins)
		}
	}
};
Ext.layout.BorderLayout.Region.prototype = {
	collapsible : false,
	split : false,
	floatable : true,
	minWidth : 50,
	minHeight : 50,
	defaultMargins : {
		left : 0,
		top : 0,
		right : 0,
		bottom : 0
	},
	defaultNSCMargins : {
		left : 5,
		top : 5,
		right : 5,
		bottom : 5
	},
	defaultEWCMargins : {
		left : 5,
		top : 0,
		right : 5,
		bottom : 0
	},
	floatingZIndex : 100,
	isCollapsed : false,
	render : function(b, c) {
		this.panel = c;
		c.el.enableDisplayMode();
		this.targetEl = b;
		this.el = c.el;
		var a = c.getState, d = this.position;
		c.getState = function() {
			return Ext.apply(a.call(c) || {}, this.state)
		}.createDelegate(this);
		if (d != "center") {
			c.allowQueuedExpand = false;
			c.on( {
				beforecollapse : this.beforeCollapse,
				collapse : this.onCollapse,
				beforeexpand : this.beforeExpand,
				expand : this.onExpand,
				hide : this.onHide,
				show : this.onShow,
				scope : this
			});
			if (this.collapsible || this.floatable) {
				c.collapseEl = "el";
				c.slideAnchor = this.getSlideAnchor()
			}
			if (c.tools && c.tools.toggle) {
				c.tools.toggle.addClass("x-tool-collapse-" + d);
				c.tools.toggle.addClassOnOver("x-tool-collapse-" + d + "-over")
			}
		}
	},
	getCollapsedEl : function() {
		if (!this.collapsedEl) {
			if (!this.toolTemplate) {
				var b = new Ext.Template(
						'<div class="x-tool x-tool-{id}">&#160;</div>');
				b.disableFormats = true;
				b.compile();
				Ext.layout.BorderLayout.Region.prototype.toolTemplate = b
			}
			this.collapsedEl = this.targetEl.createChild( {
				cls : "x-layout-collapsed x-layout-collapsed-" + this.position,
				id : this.panel.id + "-xcollapsed"
			});
			this.collapsedEl.enableDisplayMode("block");
			if (this.collapseMode == "mini") {
				this.collapsedEl.addClass("x-layout-cmini-" + this.position);
				this.miniCollapsedEl = this.collapsedEl.createChild( {
					cls : "x-layout-mini x-layout-mini-" + this.position,
					html : "&#160;"
				});
				this.miniCollapsedEl.addClassOnOver("x-layout-mini-over");
				this.collapsedEl.addClassOnOver("x-layout-collapsed-over");
				this.collapsedEl.on("click", this.onExpandClick, this, {
					stopEvent : true
				})
			} else {
				if (this.collapsible !== false && !this.hideCollapseTool) {
					var a = this.toolTemplate.append(this.collapsedEl.dom, {
						id : "expand-" + this.position
					}, true);
					a
							.addClassOnOver("x-tool-expand-" + this.position
									+ "-over");
					a.on("click", this.onExpandClick, this, {
						stopEvent : true
					})
				}
				if (this.floatable !== false || this.titleCollapse) {
					this.collapsedEl.addClassOnOver("x-layout-collapsed-over");
					this.collapsedEl.on("click",
							this[this.floatable ? "collapseClick"
									: "onExpandClick"], this)
				}
			}
		}
		return this.collapsedEl
	},
	onExpandClick : function(a) {
		if (this.isSlid) {
			this.afterSlideIn();
			this.panel.expand(false)
		} else {
			this.panel.expand()
		}
	},
	onCollapseClick : function(a) {
		this.panel.collapse()
	},
	beforeCollapse : function(b, a) {
		this.lastAnim = a;
		if (this.splitEl) {
			this.splitEl.hide()
		}
		this.getCollapsedEl().show();
		this.panel.el.setStyle("z-index", 100);
		this.isCollapsed = true;
		this.layout.layout()
	},
	onCollapse : function(a) {
		this.panel.el.setStyle("z-index", 1);
		if (this.lastAnim === false || this.panel.animCollapse === false) {
			this.getCollapsedEl().dom.style.visibility = "visible"
		} else {
			this.getCollapsedEl().slideIn(this.panel.slideAnchor, {
				duration : 0.2
			})
		}
		this.state.collapsed = true;
		this.panel.saveState()
	},
	beforeExpand : function(a) {
		var b = this.getCollapsedEl();
		this.el.show();
		if (this.position == "east" || this.position == "west") {
			this.panel.setSize(undefined, b.getHeight())
		} else {
			this.panel.setSize(b.getWidth(), undefined)
		}
		b.hide();
		b.dom.style.visibility = "hidden";
		this.panel.el.setStyle("z-index", this.floatingZIndex)
	},
	onExpand : function() {
		this.isCollapsed = false;
		if (this.splitEl) {
			this.splitEl.show()
		}
		this.layout.layout();
		this.panel.el.setStyle("z-index", 1);
		this.state.collapsed = false;
		this.panel.saveState()
	},
	collapseClick : function(a) {
		if (this.isSlid) {
			a.stopPropagation();
			this.slideIn()
		} else {
			a.stopPropagation();
			this.slideOut()
		}
	},
	onHide : function() {
		if (this.isCollapsed) {
			this.getCollapsedEl().hide()
		} else {
			if (this.splitEl) {
				this.splitEl.hide()
			}
		}
	},
	onShow : function() {
		if (this.isCollapsed) {
			this.getCollapsedEl().show()
		} else {
			if (this.splitEl) {
				this.splitEl.show()
			}
		}
	},
	isVisible : function() {
		return !this.panel.hidden
	},
	getMargins : function() {
		return this.isCollapsed && this.cmargins ? this.cmargins : this.margins
	},
	getSize : function() {
		return this.isCollapsed ? this.getCollapsedEl().getSize() : this.panel
				.getSize()
	},
	setPanel : function(a) {
		this.panel = a
	},
	getMinWidth : function() {
		return this.minWidth
	},
	getMinHeight : function() {
		return this.minHeight
	},
	applyLayoutCollapsed : function(a) {
		var b = this.getCollapsedEl();
		b.setLeftTop(a.x, a.y);
		b.setSize(a.width, a.height)
	},
	applyLayout : function(a) {
		if (this.isCollapsed) {
			this.applyLayoutCollapsed(a)
		} else {
			this.panel.setPosition(a.x, a.y);
			this.panel.setSize(a.width, a.height)
		}
	},
	beforeSlide : function() {
		this.panel.beforeEffect()
	},
	afterSlide : function() {
		this.panel.afterEffect()
	},
	initAutoHide : function() {
		if (this.autoHide !== false) {
			if (!this.autoHideHd) {
				var a = new Ext.util.DelayedTask(this.slideIn, this);
				this.autoHideHd = {
					mouseout : function(b) {
						if (!b.within(this.el, true)) {
							a.delay(500)
						}
					},
					mouseover : function(b) {
						a.cancel()
					},
					scope : this
				}
			}
			this.el.on(this.autoHideHd)
		}
	},
	clearAutoHide : function() {
		if (this.autoHide !== false) {
			this.el.un("mouseout", this.autoHideHd.mouseout);
			this.el.un("mouseover", this.autoHideHd.mouseover)
		}
	},
	clearMonitor : function() {
		Ext.getDoc().un("click", this.slideInIf, this)
	},
	slideOut : function() {
		if (this.isSlid || this.el.hasActiveFx()) {
			return
		}
		this.isSlid = true;
		var a = this.panel.tools;
		if (a && a.toggle) {
			a.toggle.hide()
		}
		this.el.show();
		if (this.position == "east" || this.position == "west") {
			this.panel.setSize(undefined, this.collapsedEl.getHeight())
		} else {
			this.panel.setSize(this.collapsedEl.getWidth(), undefined)
		}
		this.restoreLT = [ this.el.dom.style.left, this.el.dom.style.top ];
		this.el.alignTo(this.collapsedEl, this.getCollapseAnchor());
		this.el.setStyle("z-index", this.floatingZIndex + 2);
		this.panel.el.replaceClass("x-panel-collapsed", "x-panel-floating");
		if (this.animFloat !== false) {
			this.beforeSlide();
			this.el.slideIn(this.getSlideAnchor(), {
				callback : function() {
					this.afterSlide();
					this.initAutoHide();
					Ext.getDoc().on("click", this.slideInIf, this)
				},
				scope : this,
				block : true
			})
		} else {
			this.initAutoHide();
			Ext.getDoc().on("click", this.slideInIf, this)
		}
	},
	afterSlideIn : function() {
		this.clearAutoHide();
		this.isSlid = false;
		this.clearMonitor();
		this.el.setStyle("z-index", "");
		this.panel.el.replaceClass("x-panel-floating", "x-panel-collapsed");
		this.el.dom.style.left = this.restoreLT[0];
		this.el.dom.style.top = this.restoreLT[1];
		var a = this.panel.tools;
		if (a && a.toggle) {
			a.toggle.show()
		}
	},
	slideIn : function(a) {
		if (!this.isSlid || this.el.hasActiveFx()) {
			Ext.callback(a);
			return
		}
		this.isSlid = false;
		if (this.animFloat !== false) {
			this.beforeSlide();
			this.el.slideOut(this.getSlideAnchor(), {
				callback : function() {
					this.el.hide();
					this.afterSlide();
					this.afterSlideIn();
					Ext.callback(a)
				},
				scope : this,
				block : true
			})
		} else {
			this.el.hide();
			this.afterSlideIn()
		}
	},
	slideInIf : function(a) {
		if (!a.within(this.el)) {
			this.slideIn()
		}
	},
	anchors : {
		west : "left",
		east : "right",
		north : "top",
		south : "bottom"
	},
	sanchors : {
		west : "l",
		east : "r",
		north : "t",
		south : "b"
	},
	canchors : {
		west : "tl-tr",
		east : "tr-tl",
		north : "tl-bl",
		south : "bl-tl"
	},
	getAnchor : function() {
		return this.anchors[this.position]
	},
	getCollapseAnchor : function() {
		return this.canchors[this.position]
	},
	getSlideAnchor : function() {
		return this.sanchors[this.position]
	},
	getAlignAdj : function() {
		var a = this.cmargins;
		switch (this.position) {
		case "west":
			return [ 0, 0 ];
			break;
		case "east":
			return [ 0, 0 ];
			break;
		case "north":
			return [ 0, 0 ];
			break;
		case "south":
			return [ 0, 0 ];
			break
		}
	},
	getExpandAdj : function() {
		var b = this.collapsedEl, a = this.cmargins;
		switch (this.position) {
		case "west":
			return [ -(a.right + b.getWidth() + a.left), 0 ];
			break;
		case "east":
			return [ a.right + b.getWidth() + a.left, 0 ];
			break;
		case "north":
			return [ 0, -(a.top + a.bottom + b.getHeight()) ];
			break;
		case "south":
			return [ 0, a.top + a.bottom + b.getHeight() ];
			break
		}
	}
};
Ext.layout.BorderLayout.SplitRegion = function(b, a, c) {
	Ext.layout.BorderLayout.SplitRegion.superclass.constructor.call(this, b, a,
			c);
	this.applyLayout = this.applyFns[c]
};
Ext
		.extend(
				Ext.layout.BorderLayout.SplitRegion,
				Ext.layout.BorderLayout.Region,
				{
					splitTip : "Drag to resize.",
					collapsibleSplitTip : "Drag to resize. Double click to hide.",
					useSplitTips : false,
					splitSettings : {
						north : {
							orientation : Ext.SplitBar.VERTICAL,
							placement : Ext.SplitBar.TOP,
							maxFn : "getVMaxSize",
							minProp : "minHeight",
							maxProp : "maxHeight"
						},
						south : {
							orientation : Ext.SplitBar.VERTICAL,
							placement : Ext.SplitBar.BOTTOM,
							maxFn : "getVMaxSize",
							minProp : "minHeight",
							maxProp : "maxHeight"
						},
						east : {
							orientation : Ext.SplitBar.HORIZONTAL,
							placement : Ext.SplitBar.RIGHT,
							maxFn : "getHMaxSize",
							minProp : "minWidth",
							maxProp : "maxWidth"
						},
						west : {
							orientation : Ext.SplitBar.HORIZONTAL,
							placement : Ext.SplitBar.LEFT,
							maxFn : "getHMaxSize",
							minProp : "minWidth",
							maxProp : "maxWidth"
						}
					},
					applyFns : {
						west : function(c) {
							if (this.isCollapsed) {
								return this.applyLayoutCollapsed(c)
							}
							var d = this.splitEl.dom, b = d.style;
							this.panel.setPosition(c.x, c.y);
							var a = d.offsetWidth;
							b.left = (c.x + c.width - a) + "px";
							b.top = (c.y) + "px";
							b.height = Math.max(0, c.height) + "px";
							this.panel.setSize(c.width - a, c.height)
						},
						east : function(c) {
							if (this.isCollapsed) {
								return this.applyLayoutCollapsed(c)
							}
							var d = this.splitEl.dom, b = d.style;
							var a = d.offsetWidth;
							this.panel.setPosition(c.x + a, c.y);
							b.left = (c.x) + "px";
							b.top = (c.y) + "px";
							b.height = Math.max(0, c.height) + "px";
							this.panel.setSize(c.width - a, c.height)
						},
						north : function(c) {
							if (this.isCollapsed) {
								return this.applyLayoutCollapsed(c)
							}
							var d = this.splitEl.dom, b = d.style;
							var a = d.offsetHeight;
							this.panel.setPosition(c.x, c.y);
							b.left = (c.x) + "px";
							b.top = (c.y + c.height - a) + "px";
							b.width = Math.max(0, c.width) + "px";
							this.panel.setSize(c.width, c.height - a)
						},
						south : function(c) {
							if (this.isCollapsed) {
								return this.applyLayoutCollapsed(c)
							}
							var d = this.splitEl.dom, b = d.style;
							var a = d.offsetHeight;
							this.panel.setPosition(c.x, c.y + a);
							b.left = (c.x) + "px";
							b.top = (c.y) + "px";
							b.width = Math.max(0, c.width) + "px";
							this.panel.setSize(c.width, c.height - a)
						}
					},
					render : function(a, c) {
						Ext.layout.BorderLayout.SplitRegion.superclass.render
								.call(this, a, c);
						var d = this.position;
						this.splitEl = a.createChild( {
							cls : "x-layout-split x-layout-split-" + d,
							html : "&#160;",
							id : this.panel.id + "-xsplit"
						});
						if (this.collapseMode == "mini") {
							this.miniSplitEl = this.splitEl.createChild( {
								cls : "x-layout-mini x-layout-mini-" + d,
								html : "&#160;"
							});
							this.miniSplitEl
									.addClassOnOver("x-layout-mini-over");
							this.miniSplitEl.on("click", this.onCollapseClick,
									this, {
										stopEvent : true
									})
						}
						var b = this.splitSettings[d];
						this.split = new Ext.SplitBar(this.splitEl.dom, c.el,
								b.orientation);
						this.split.tickSize = this.tickSize;
						this.split.placement = b.placement;
						this.split.getMaximumSize = this[b.maxFn]
								.createDelegate(this);
						this.split.minSize = this.minSize || this[b.minProp];
						this.split.on("beforeapply", this.onSplitMove, this);
						this.split.useShim = this.useShim === true;
						this.maxSize = this.maxSize || this[b.maxProp];
						if (c.hidden) {
							this.splitEl.hide()
						}
						if (this.useSplitTips) {
							this.splitEl.dom.title = this.collapsible ? this.collapsibleSplitTip
									: this.splitTip
						}
						if (this.collapsible) {
							this.splitEl.on("dblclick", this.onCollapseClick,
									this)
						}
					},
					getSize : function() {
						if (this.isCollapsed) {
							return this.collapsedEl.getSize()
						}
						var a = this.panel.getSize();
						if (this.position == "north"
								|| this.position == "south") {
							a.height += this.splitEl.dom.offsetHeight
						} else {
							a.width += this.splitEl.dom.offsetWidth
						}
						return a
					},
					getHMaxSize : function() {
						var b = this.maxSize || 10000;
						var a = this.layout.center;
						return Math.min(b, (this.el.getWidth() + a.el
								.getWidth())
								- a.getMinWidth())
					},
					getVMaxSize : function() {
						var b = this.maxSize || 10000;
						var a = this.layout.center;
						return Math.min(b, (this.el.getHeight() + a.el
								.getHeight())
								- a.getMinHeight())
					},
					onSplitMove : function(b, a) {
						var c = this.panel.getSize();
						this.lastSplitSize = a;
						if (this.position == "north"
								|| this.position == "south") {
							this.panel.setSize(c.width, a);
							this.state.height = a
						} else {
							this.panel.setSize(a, c.height);
							this.state.width = a
						}
						this.layout.layout();
						this.panel.saveState();
						return false
					},
					getSplitBar : function() {
						return this.split
					},
					destroy : function() {
						Ext.destroy(this.miniSplitEl, this.split, this.splitEl)
					}
				});
Ext.Container.LAYOUTS.border = Ext.layout.BorderLayout;
Ext.layout.FormLayout = Ext
		.extend(
				Ext.layout.AnchorLayout,
				{
					labelSeparator : ":",
					setContainer : function(a) {
						Ext.layout.FormLayout.superclass.setContainer.call(
								this, a);
						if (a.labelAlign) {
							a.addClass("x-form-label-" + a.labelAlign)
						}
						if (a.hideLabels) {
							this.labelStyle = "display:none";
							this.elementStyle = "padding-left:0;";
							this.labelAdjust = 0
						} else {
							this.labelSeparator = a.labelSeparator
									|| this.labelSeparator;
							a.labelWidth = a.labelWidth || 100;
							if (typeof a.labelWidth == "number") {
								var b = (typeof a.labelPad == "number" ? a.labelPad
										: 5);
								this.labelAdjust = a.labelWidth + b;
								this.labelStyle = "width:" + a.labelWidth
										+ "px;";
								this.elementStyle = "padding-left:"
										+ (a.labelWidth + b) + "px"
							}
							if (a.labelAlign == "top") {
								this.labelStyle = "width:auto;";
								this.labelAdjust = 0;
								this.elementStyle = "padding-left:0;"
							}
						}
					},
					getLabelStyle : function(e) {
						var b = "", c = [ this.labelStyle, e ];
						for ( var d = 0, a = c.length; d < a; ++d) {
							if (c[d]) {
								b += c[d];
								if (b.substr(-1, 1) != ";") {
									b += ";"
								}
							}
						}
						return b
					},
					renderItem : function(e, a, d) {
						if (e && !e.rendered && (e.isFormField || e.fieldLabel)
								&& e.inputType != "hidden") {
							var b = this.getTemplateArgs(e);
							if (typeof a == "number") {
								a = d.dom.childNodes[a] || null
							}
							if (a) {
								this.fieldTpl.insertBefore(a, b)
							} else {
								this.fieldTpl.append(d, b)
							}
							e.render("x-form-el-" + e.id)
						} else {
							Ext.layout.FormLayout.superclass.renderItem.apply(
									this, arguments)
						}
					},
					getTemplateArgs : function(b) {
						var a = !b.fieldLabel || b.hideLabel;
						return {
							id : b.id,
							label : b.fieldLabel,
							labelStyle : b.labelStyle || this.labelStyle || "",
							elementStyle : this.elementStyle || "",
							labelSeparator : a ? ""
									: (typeof b.labelSeparator == "undefined" ? this.labelSeparator
											: b.labelSeparator),
							itemCls : (b.itemCls || this.container.itemCls || "")
									+ (b.hideLabel ? " x-hide-label" : ""),
							clearCls : b.clearCls || "x-form-clear-left"
						}
					},
					adjustWidthAnchor : function(b, a) {
						return b
								- (a.isFormField || a.fieldLabel ? (a.hideLabel ? 0
										: this.labelAdjust)
										: 0)
					},
					isValidParent : function(b, a) {
						return true
					}
				});
Ext.Container.LAYOUTS.form = Ext.layout.FormLayout;
Ext.layout.AccordionLayout = Ext.extend(Ext.layout.FitLayout,
		{
			fill : true,
			autoWidth : true,
			titleCollapse : true,
			hideCollapseTool : false,
			collapseFirst : false,
			animate : false,
			sequence : false,
			activeOnTop : false,
			renderItem : function(a) {
				if (this.animate === false) {
					a.animCollapse = false
				}
				a.collapsible = true;
				if (this.autoWidth) {
					a.autoWidth = true
				}
				if (this.titleCollapse) {
					a.titleCollapse = true
				}
				if (this.hideCollapseTool) {
					a.hideCollapseTool = true
				}
				if (this.collapseFirst !== undefined) {
					a.collapseFirst = this.collapseFirst
				}
				if (!this.activeItem && !a.collapsed) {
					this.activeItem = a
				} else {
					if (this.activeItem && this.activeItem != a) {
						a.collapsed = true
					}
				}
				Ext.layout.AccordionLayout.superclass.renderItem.apply(this,
						arguments);
				a.header.addClass("x-accordion-hd");
				a.on("beforeexpand", this.beforeExpand, this)
			},
			beforeExpand : function(c, b) {
				var a = this.activeItem;
				if (a) {
					if (this.sequence) {
						delete this.activeItem;
						if (!a.collapsed) {
							a.collapse( {
								callback : function() {
									c.expand(b || true)
								},
								scope : this
							});
							return false
						}
					} else {
						a.collapse(this.animate)
					}
				}
				this.activeItem = c;
				if (this.activeOnTop) {
					c.el.dom.parentNode.insertBefore(c.el.dom,
							c.el.dom.parentNode.firstChild)
				}
				this.layout()
			},
			setItemSize : function(c, b) {
				if (this.fill && c) {
					var a = 0;
					this.container.items.each( function(d) {
						if (d != c) {
							a += d.header.getHeight()
						}
					});
					b.height -= a;
					c.setSize(b)
				}
			},
			setActiveItem : function(a) {
				a = this.container.getComponent(a);
				if (this.activeItem != a) {
					if (a.rendered && a.collapsed) {
						a.expand()
					} else {
						this.activeItem = a
					}
				}
			}
		});
Ext.Container.LAYOUTS.accordion = Ext.layout.AccordionLayout;
Ext.layout.Accordion = Ext.layout.AccordionLayout;
Ext.layout.TableLayout = Ext.extend(Ext.layout.ContainerLayout, {
	monitorResize : false,
	tableAttrs : null,
	setContainer : function(a) {
		Ext.layout.TableLayout.superclass.setContainer.call(this, a);
		this.currentRow = 0;
		this.currentColumn = 0;
		this.cells = []
	},
	onLayout : function(d, g) {
		var e = d.items.items, a = e.length, h, b;
		if (!this.table) {
			g.addClass("x-table-layout-ct");
			this.table = g.createChild(Ext.apply( {
				tag : "table",
				cls : "x-table-layout",
				cellspacing : 0,
				cn : {
					tag : "tbody"
				}
			}, this.tableAttrs), null, true)
		}
		this.renderAll(d, g)
	},
	getRow : function(a) {
		var b = this.table.tBodies[0].childNodes[a];
		if (!b) {
			b = document.createElement("tr");
			this.table.tBodies[0].appendChild(b)
		}
		return b
	},
	getNextCell : function(j) {
		var a = this.getNextNonSpan(this.currentColumn, this.currentRow);
		var g = this.currentColumn = a[0], e = this.currentRow = a[1];
		for ( var i = e; i < e + (j.rowspan || 1); i++) {
			if (!this.cells[i]) {
				this.cells[i] = []
			}
			for ( var d = g; d < g + (j.colspan || 1); d++) {
				this.cells[i][d] = true
			}
		}
		var h = document.createElement("td");
		if (j.cellId) {
			h.id = j.cellId
		}
		var b = "x-table-layout-cell";
		if (j.cellCls) {
			b += " " + j.cellCls
		}
		h.className = b;
		if (j.colspan) {
			h.colSpan = j.colspan
		}
		if (j.rowspan) {
			h.rowSpan = j.rowspan
		}
		this.getRow(e).appendChild(h);
		return h
	},
	getNextNonSpan : function(a, c) {
		var b = this.columns;
		while ((b && a >= b) || (this.cells[c] && this.cells[c][a])) {
			if (b && a >= b) {
				c++;
				a = 0
			} else {
				a++
			}
		}
		return [ a, c ]
	},
	renderItem : function(e, a, d) {
		if (e && !e.rendered) {
			e.render(this.getNextCell(e));
			if (this.extraCls) {
				var b = e.getPositionEl ? e.getPositionEl() : e;
				b.addClass(this.extraCls)
			}
		}
	},
	isValidParent : function(b, a) {
		return true
	}
});
Ext.Container.LAYOUTS.table = Ext.layout.TableLayout;
Ext.layout.AbsoluteLayout = Ext.extend(Ext.layout.AnchorLayout, {
	extraCls : "x-abs-layout-item",
	onLayout : function(a, b) {
		b.position();
		this.paddingLeft = b.getPadding("l");
		this.paddingTop = b.getPadding("t");
		Ext.layout.AbsoluteLayout.superclass.onLayout.call(this, a, b)
	},
	adjustWidthAnchor : function(b, a) {
		return b ? b - a.getPosition(true)[0] + this.paddingLeft : b
	},
	adjustHeightAnchor : function(b, a) {
		return b ? b - a.getPosition(true)[1] + this.paddingTop : b
	}
});
Ext.Container.LAYOUTS.absolute = Ext.layout.AbsoluteLayout;
Ext.layout.BoxLayout = Ext.extend(Ext.layout.ContainerLayout, {
	defaultMargins : {
		left : 0,
		top : 0,
		right : 0,
		bottom : 0
	},
	padding : "0",
	pack : "start",
	monitorResize : true,
	scrollOffset : 0,
	extraCls : "x-box-item",
	ctCls : "x-box-layout-ct",
	innerCls : "x-box-inner",
	isValidParent : function(b, a) {
		return b.getEl().dom.parentNode == this.innerCt.dom
	},
	onLayout : function(e, j) {
		var g = e.items.items, b = g.length, k, d, h = b - 1, a;
		if (!this.innerCt) {
			j.addClass(this.ctCls);
			this.innerCt = j.createChild( {
				cls : this.innerCls
			});
			this.padding = this.parseMargins(this.padding)
		}
		this.renderAll(e, this.innerCt)
	},
	renderItem : function(a) {
		if (typeof a.margins == "string") {
			a.margins = this.parseMargins(a.margins)
		} else {
			if (!a.margins) {
				a.margins = this.defaultMargins
			}
		}
		Ext.layout.BoxLayout.superclass.renderItem.apply(this, arguments)
	},
	getTargetSize : function(a) {
		return (Ext.isIE6 && Ext.isStrict && a.dom == document.body) ? a
				.getStyleSize() : a.getViewSize()
	},
	getItems : function(b) {
		var a = [];
		b.items.each( function(d) {
			if (d.isVisible()) {
				a.push(d)
			}
		});
		return a
	}
});
Ext.layout.VBoxLayout = Ext
		.extend(
				Ext.layout.BoxLayout,
				{
					align : "left",
					onLayout : function(e, E) {
						Ext.layout.VBoxLayout.superclass.onLayout.call(this, e,
								E);
						var g = this.getItems(e), j, m, q, r = this
								.getTargetSize(E), k = r.width
								- E.getPadding("lr") - this.scrollOffset, y = r.height
								- E.getPadding("tb"), s = this.padding.left, n = this.padding.top, i = this.pack == "start", v = [
								"stretch", "stretchmax" ].indexOf(this.align) == -1, B = k
								- (this.padding.left + this.padding.right), o = 0, A = 0, u = 0, C = 0, d = 0;
						Ext.each(g, function(h) {
							j = h.margins;
							u += h.flex || 0;
							m = h.getHeight();
							q = j.top + j.bottom;
							o += m + q;
							C += q + (h.flex ? 0 : m);
							A = Math.max(A, h.getWidth() + j.left + j.right)
						});
						o = y - o - this.padding.top - this.padding.bottom;
						var a = A + this.padding.left + this.padding.right;
						switch (this.align) {
						case "stretch":
							this.innerCt.setSize(k, y);
							break;
						case "stretchmax":
						case "left":
							this.innerCt.setSize(a, y);
							break;
						case "center":
							this.innerCt.setSize(k = Math.max(k, a), y);
							break
						}
						var c = Math.max(0, y - this.padding.top
								- this.padding.bottom - C), D = c, z = [], x = [], p = 0, b = Math
								.max(0, k - this.padding.left
										- this.padding.right);
						Ext.each(g, function(h) {
							if (i && h.flex) {
								m = Math.floor(c * (h.flex / u));
								D -= m;
								z.push(m)
							}
						});
						if (this.pack == "center") {
							n += o ? o / 2 : 0
						} else {
							if (this.pack == "end") {
								n += o
							}
						}
						Ext.each(g, function(h) {
							j = h.margins;
							n += j.top;
							h.setPosition(s + j.left, n);
							if (i && h.flex) {
								m = Math.max(0, z[p++] + (D-- > 0 ? 1 : 0));
								if (v) {
									x.push(h.getWidth())
								}
								h.setSize(b, m)
							} else {
								m = h.getHeight()
							}
							n += m + j.bottom
						});
						p = 0;
						Ext
								.each(
										g,
										function(l) {
											j = l.margins;
											if (this.align == "stretch") {
												l
														.setWidth((B - (j.left + j.right))
																.constrain(
																		l.minWidth || 0,
																		l.maxWidth || 1000000))
											} else {
												if (this.align == "stretchmax") {
													l
															.setWidth((A - (j.left + j.right))
																	.constrain(
																			l.minWidth || 0,
																			l.maxWidth || 1000000))
												} else {
													if (this.align == "center") {
														var h = b
																- (l.getWidth()
																		+ j.left + j.right);
														if (h > 0) {
															l.setPosition(s
																	+ j.left
																	+ (h / 2),
																	l.y)
														}
													}
													if (i && l.flex) {
														l.setWidth(x[p++])
													}
												}
											}
										}, this)
					}
				});
Ext.Container.LAYOUTS.vbox = Ext.layout.VBoxLayout;
Ext.layout.HBoxLayout = Ext
		.extend(
				Ext.layout.BoxLayout,
				{
					align : "top",
					onLayout : function(d, E) {
						Ext.layout.HBoxLayout.superclass.onLayout.call(this, d,
								E);
						var e = this.getItems(d), j, c, q, r = this
								.getTargetSize(E), m = r.width
								- E.getPadding("lr") - this.scrollOffset, B = r.height
								- E.getPadding("tb"), u = this.padding.left, o = this.padding.top, i = this.pack == "start", z = [
								"stretch", "stretchmax" ].indexOf(this.align) == -1, n = B
								- (this.padding.top + this.padding.bottom), C = 0, s = 0, v = 0, b = 0, g = 0;
						Ext.each(e, function(h) {
							j = h.margins;
							v += h.flex || 0;
							c = h.getWidth();
							q = j.left + j.right;
							C += c + q;
							b += q + (h.flex ? 0 : c);
							s = Math.max(s, h.getHeight() + j.top + j.bottom)
						});
						C = m - C - this.padding.left - this.padding.right;
						var y = s + this.padding.top + this.padding.bottom;
						switch (this.align) {
						case "stretch":
							this.innerCt.setSize(m, B);
							break;
						case "stretchmax":
						case "top":
							this.innerCt.setSize(m, y);
							break;
						case "middle":
							this.innerCt.setSize(m, B = Math.max(B, y));
							break
						}
						var x = Math.max(0, m - this.padding.left
								- this.padding.right - b), D = x, k = [], A = [], p = 0, a = Math
								.max(0, B - this.padding.top
										- this.padding.bottom);
						Ext.each(e, function(h) {
							if (i && h.flex) {
								c = Math.floor(x * (h.flex / v));
								D -= c;
								k.push(c)
							}
						});
						if (this.pack == "center") {
							u += C ? C / 2 : 0
						} else {
							if (this.pack == "end") {
								u += C
							}
						}
						Ext.each(e, function(h) {
							j = h.margins;
							u += j.left;
							h.setPosition(u, o + j.top);
							if (i && h.flex) {
								c = Math.max(0, k[p++] + (D-- > 0 ? 1 : 0));
								if (z) {
									A.push(h.getHeight())
								}
								h.setSize(c, a)
							} else {
								c = h.getWidth()
							}
							u += c + j.right
						});
						p = 0;
						Ext
								.each(
										e,
										function(t) {
											var h = t.margins;
											if (this.align == "stretch") {
												t
														.setHeight((n - (h.top + h.bottom))
																.constrain(
																		t.minHeight || 0,
																		t.maxHeight || 1000000))
											} else {
												if (this.align == "stretchmax") {
													t
															.setHeight((s - (h.top + h.bottom))
																	.constrain(
																			t.minHeight || 0,
																			t.maxHeight || 1000000))
												} else {
													if (this.align == "middle") {
														var l = a
																- (t
																		.getHeight()
																		+ h.top + h.bottom);
														if (l > 0) {
															t
																	.setPosition(
																			t.x,
																			o
																					+ h.top
																					+ (l / 2))
														}
													}
													if (i && t.flex) {
														t.setHeight(A[p++])
													}
												}
											}
										}, this)
					}
				});
Ext.Container.LAYOUTS.hbox = Ext.layout.HBoxLayout;
Ext.Viewport = Ext.extend(Ext.Container, {
	initComponent : function() {
		Ext.Viewport.superclass.initComponent.call(this);
		document.getElementsByTagName("html")[0].className += " x-viewport";
		this.el = Ext.getBody();
		this.el.setHeight = Ext.emptyFn;
		this.el.setWidth = Ext.emptyFn;
		this.el.setSize = Ext.emptyFn;
		this.el.dom.scroll = "no";
		this.allowDomMove = false;
		this.autoWidth = true;
		this.autoHeight = true;
		Ext.EventManager.onWindowResize(this.fireResize, this);
		this.renderTo = this.el
	},
	fireResize : function(a, b) {
		this.fireEvent("resize", this, a, b, a, b)
	}
});
Ext.reg("viewport", Ext.Viewport);
Ext.Panel = Ext
		.extend(
				Ext.Container,
				{
					baseCls : "x-panel",
					collapsedCls : "x-panel-collapsed",
					maskDisabled : true,
					animCollapse : Ext.enableFx,
					headerAsText : true,
					buttonAlign : "right",
					collapsed : false,
					collapseFirst : true,
					minButtonWidth : 75,
					elements : "body",
					preventBodyReset : false,
					toolTarget : "header",
					collapseEl : "bwrap",
					slideAnchor : "t",
					disabledClass : "",
					deferHeight : true,
					expandDefaults : {
						duration : 0.25
					},
					collapseDefaults : {
						duration : 0.25
					},
					initComponent : function() {
						Ext.Panel.superclass.initComponent.call(this);
						this.addEvents("bodyresize", "titlechange",
								"iconchange", "collapse", "expand",
								"beforecollapse", "beforeexpand",
								"beforeclose", "close", "activate",
								"deactivate");
						if (this.unstyled) {
							this.baseCls = "x-plain"
						}
						if (this.tbar) {
							this.elements += ",tbar";
							if (Ext.isObject(this.tbar)) {
								this.topToolbar = this.tbar
							}
							delete this.tbar
						}
						if (this.bbar) {
							this.elements += ",bbar";
							if (Ext.isObject(this.bbar)) {
								this.bottomToolbar = this.bbar
							}
							delete this.bbar
						}
						if (this.header === true) {
							this.elements += ",header";
							delete this.header
						} else {
							if (this.headerCfg
									|| (this.title && this.header !== false)) {
								this.elements += ",header"
							}
						}
						if (this.footerCfg || this.footer === true) {
							this.elements += ",footer";
							delete this.footer
						}
						if (this.buttons) {
							this.elements += ",footer";
							var c = this.buttons;
							this.buttons = [];
							for ( var b = 0, a = c.length; b < a; b++) {
								if (c[b].render) {
									this.buttons.push(c[b])
								} else {
									if (c[b].xtype) {
										this.buttons.push(Ext.create(c[b],
												"button"))
									} else {
										this.addButton(c[b])
									}
								}
							}
						}
						if (this.fbar) {
							this.elements += ",footer"
						}
						if (this.autoLoad) {
							this.on("render", this.doAutoLoad, this, {
								delay : 10
							})
						}
					},
					createElement : function(a, c) {
						if (this[a]) {
							c.appendChild(this[a].dom);
							return
						}
						if (a === "bwrap" || this.elements.indexOf(a) != -1) {
							if (this[a + "Cfg"]) {
								this[a] = Ext.fly(c).createChild(
										this[a + "Cfg"])
							} else {
								var b = document.createElement("div");
								b.className = this[a + "Cls"];
								this[a] = Ext.get(c.appendChild(b))
							}
							if (this[a + "CssClass"]) {
								this[a].addClass(this[a + "CssClass"])
							}
							if (this[a + "Style"]) {
								this[a].applyStyles(this[a + "Style"])
							}
						}
					},
					onRender : function(g, e) {
						Ext.Panel.superclass.onRender.call(this, g, e);
						this.createClasses();
						var a = this.el, i = a.dom, k;
						a.addClass(this.baseCls);
						if (i.firstChild) {
							this.header = a.down("." + this.headerCls);
							this.bwrap = a.down("." + this.bwrapCls);
							var j = this.bwrap ? this.bwrap : a;
							this.tbar = j.down("." + this.tbarCls);
							this.body = j.down("." + this.bodyCls);
							this.bbar = j.down("." + this.bbarCls);
							this.footer = j.down("." + this.footerCls);
							this.fromMarkup = true
						}
						if (this.preventBodyReset === true) {
							a.addClass("x-panel-reset")
						}
						if (this.cls) {
							a.addClass(this.cls)
						}
						if (this.buttons) {
							this.elements += ",footer"
						}
						if (this.frame) {
							a.insertHtml("afterBegin", String.format(
									Ext.Element.boxMarkup, this.baseCls));
							this.createElement("header",
									i.firstChild.firstChild.firstChild);
							this.createElement("bwrap", i);
							k = this.bwrap.dom;
							var c = i.childNodes[1], b = i.childNodes[2];
							k.appendChild(c);
							k.appendChild(b);
							var l = k.firstChild.firstChild.firstChild;
							this.createElement("tbar", l);
							this.createElement("body", l);
							this.createElement("bbar", l);
							this.createElement("footer",
									k.lastChild.firstChild.firstChild);
							if (!this.footer) {
								this.bwrap.dom.lastChild.className += " x-panel-nofooter"
							}
						} else {
							this.createElement("header", i);
							this.createElement("bwrap", i);
							k = this.bwrap.dom;
							this.createElement("tbar", k);
							this.createElement("body", k);
							this.createElement("bbar", k);
							this.createElement("footer", k);
							if (!this.header) {
								this.body.addClass(this.bodyCls + "-noheader");
								if (this.tbar) {
									this.tbar.addClass(this.tbarCls
											+ "-noheader")
								}
							}
						}
						if (this.padding !== undefined) {
							this.body.setStyle("padding", this.body
									.addUnits(this.padding))
						}
						if (this.border === false) {
							this.el.addClass(this.baseCls + "-noborder");
							this.body.addClass(this.bodyCls + "-noborder");
							if (this.header) {
								this.header.addClass(this.headerCls
										+ "-noborder")
							}
							if (this.footer) {
								this.footer.addClass(this.footerCls
										+ "-noborder")
							}
							if (this.tbar) {
								this.tbar.addClass(this.tbarCls + "-noborder")
							}
							if (this.bbar) {
								this.bbar.addClass(this.bbarCls + "-noborder")
							}
						}
						if (this.bodyBorder === false) {
							this.body.addClass(this.bodyCls + "-noborder")
						}
						this.bwrap.enableDisplayMode("block");
						if (this.header) {
							this.header.unselectable();
							if (this.headerAsText) {
								this.header.dom.innerHTML = '<span class="'
										+ this.headerTextCls + '">'
										+ this.header.dom.innerHTML + "</span>";
								if (this.iconCls) {
									this.setIconClass(this.iconCls)
								}
							}
						}
						if (this.floating) {
							this.makeFloating(this.floating)
						}
						if (this.collapsible) {
							this.tools = this.tools ? this.tools.slice(0) : [];
							if (!this.hideCollapseTool) {
								this.tools[this.collapseFirst ? "unshift"
										: "push"]( {
									id : "toggle",
									handler : this.toggleCollapse,
									scope : this
								})
							}
							if (this.titleCollapse && this.header) {
								this.mon(this.header, "click",
										this.toggleCollapse, this);
								this.header.setStyle("cursor", "pointer")
							}
						}
						if (this.tools) {
							var h = this.tools;
							this.tools = {};
							this.addTool.apply(this, h)
						} else {
							this.tools = {}
						}
						if (this.buttons && this.buttons.length > 0) {
							this.fbar = new Ext.Toolbar( {
								items : this.buttons,
								toolbarCls : "x-panel-fbar"
							})
						}
						this.toolbars = [];
						if (this.fbar) {
							this.fbar = Ext.create(this.fbar, "toolbar");
							this.fbar.enableOverflow = false;
							if (this.fbar.items) {
								this.fbar.items.each( function(d) {
									d.minWidth = d.minWidth
											|| this.minButtonWidth
								}, this)
							}
							this.fbar.toolbarCls = "x-panel-fbar";
							var m = this.footer.createChild( {
								cls : "x-panel-btns x-panel-btns-"
										+ this.buttonAlign
							});
							this.fbar.ownerCt = this;
							this.fbar.render(m);
							m.createChild( {
								cls : "x-clear"
							});
							this.toolbars.push(this.fbar)
						}
						if (this.tbar && this.topToolbar) {
							if (Ext.isArray(this.topToolbar)) {
								this.topToolbar = new Ext.Toolbar(
										this.topToolbar)
							} else {
								if (!this.topToolbar.events) {
									this.topToolbar = Ext.create(
											this.topToolbar, "toolbar")
								}
							}
							this.topToolbar.ownerCt = this;
							this.topToolbar.render(this.tbar);
							this.toolbars.push(this.topToolbar)
						}
						if (this.bbar && this.bottomToolbar) {
							if (Ext.isArray(this.bottomToolbar)) {
								this.bottomToolbar = new Ext.Toolbar(
										this.bottomToolbar)
							} else {
								if (!this.bottomToolbar.events) {
									this.bottomToolbar = Ext.create(
											this.bottomToolbar, "toolbar")
								}
							}
							this.bottomToolbar.ownerCt = this;
							this.bottomToolbar.render(this.bbar);
							this.toolbars.push(this.bottomToolbar)
						}
						Ext.each(this.toolbars, function(d) {
							d.on( {
								scope : this,
								afterlayout : this.syncHeight,
								remove : this.syncHeight
							})
						}, this)
					},
					setIconClass : function(b) {
						var a = this.iconCls;
						this.iconCls = b;
						if (this.rendered && this.header) {
							if (this.frame) {
								this.header.addClass("x-panel-icon");
								this.header.replaceClass(a, this.iconCls)
							} else {
								var d = this.header.dom;
								var c = d.firstChild
										&& String(d.firstChild.tagName)
												.toLowerCase() == "img" ? d.firstChild
										: null;
								if (c) {
									Ext.fly(c).replaceClass(a, this.iconCls)
								} else {
									Ext.DomHelper.insertBefore(d.firstChild, {
										tag : "img",
										src : Ext.BLANK_IMAGE_URL,
										cls : "x-panel-inline-icon "
												+ this.iconCls
									})
								}
							}
						}
						this.fireEvent("iconchange", this, b, a)
					},
					makeFloating : function(a) {
						this.floating = true;
						this.el = new Ext.Layer(Ext.isObject(a) ? a : {
							shadow : this.shadow !== undefined ? this.shadow
									: "sides",
							shadowOffset : this.shadowOffset,
							constrain : false,
							shim : this.shim === false ? false : undefined
						}, this.el)
					},
					getTopToolbar : function() {
						return this.topToolbar
					},
					getBottomToolbar : function() {
						return this.bottomToolbar
					},
					addButton : function(a, d, c) {
						var e = {
							handler : d,
							scope : c,
							minWidth : this.minButtonWidth,
							hideParent : true
						};
						if (typeof a == "string") {
							e.text = a
						} else {
							Ext.apply(e, a)
						}
						var b = new Ext.Button(e);
						if (!this.buttons) {
							this.buttons = []
						}
						this.buttons.push(b);
						return b
					},
					addTool : function() {
						if (!this[this.toolTarget]) {
							return
						}
						if (!this.toolTemplate) {
							var h = new Ext.Template(
									'<div class="x-tool x-tool-{id}">&#160;</div>');
							h.disableFormats = true;
							h.compile();
							Ext.Panel.prototype.toolTemplate = h
						}
						for ( var g = 0, d = arguments, c = d.length; g < c; g++) {
							var b = d[g];
							if (!this.tools[b.id]) {
								var j = "x-tool-" + b.id + "-over";
								var e = this.toolTemplate
										.insertFirst(
												(b.align !== "left") ? this[this.toolTarget]
														: this[this.toolTarget]
																.child("span"),
												b, true);
								this.tools[b.id] = e;
								e.enableDisplayMode("block");
								this.mon(e, "click", this.createToolHandler(e,
										b, j, this));
								if (b.on) {
									this.mon(e, b.on)
								}
								if (b.hidden) {
									e.hide()
								}
								if (b.qtip) {
									if (Ext.isObject(b.qtip)) {
										Ext.QuickTips.register(Ext.apply( {
											target : e.id
										}, b.qtip))
									} else {
										e.dom.qtip = b.qtip
									}
								}
								e.addClassOnOver(j)
							}
						}
					},
					onLayout : function() {
						if (this.toolbars.length > 0) {
							this.duringLayout = true;
							Ext.each(this.toolbars, function(a) {
								a.doLayout()
							});
							delete this.duringLayout;
							this.syncHeight()
						}
					},
					syncHeight : function() {
						if (!(this.autoHeight || this.duringLayout)) {
							var d = this.lastSize;
							if (d && !Ext.isEmpty(d.height)) {
								var b = d.height, c = this.el.getHeight();
								if (b != "auto" && b != c) {
									var e = this.body, a = e.getHeight();
									c = Math.max(a + b - c, 0);
									if (a > 0 && a != c) {
										e.setHeight(c);
										if (Ext.isIE && c <= 0) {
											return
										}
										var g = e.getSize();
										this.fireEvent("bodyresize", g.width,
												g.height)
									}
								}
							}
						}
					},
					onShow : function() {
						if (this.floating) {
							return this.el.show()
						}
						Ext.Panel.superclass.onShow.call(this)
					},
					onHide : function() {
						if (this.floating) {
							return this.el.hide()
						}
						Ext.Panel.superclass.onHide.call(this)
					},
					createToolHandler : function(c, a, d, b) {
						return function(g) {
							c.removeClass(d);
							if (a.stopEvent !== false) {
								g.stopEvent()
							}
							if (a.handler) {
								a.handler.call(a.scope || c, g, c, b, a)
							}
						}
					},
					afterRender : function() {
						if (this.floating && !this.hidden) {
							this.el.show()
						}
						if (this.title) {
							this.setTitle(this.title)
						}
						this.setAutoScroll();
						if (this.html) {
							this.body
									.update(Ext.isObject(this.html) ? Ext.DomHelper
											.markup(this.html)
											: this.html);
							delete this.html
						}
						if (this.contentEl) {
							var a = Ext.getDom(this.contentEl);
							Ext.fly(a).removeClass(
									[ "x-hidden", "x-hide-display" ]);
							this.body.dom.appendChild(a)
						}
						if (this.collapsed) {
							this.collapsed = false;
							this.collapse(false)
						}
						Ext.Panel.superclass.afterRender.call(this);
						this.initEvents()
					},
					setAutoScroll : function() {
						if (this.rendered && this.autoScroll) {
							var a = this.body || this.el;
							if (a) {
								a.setOverflow("auto")
							}
						}
					},
					getKeyMap : function() {
						if (!this.keyMap) {
							this.keyMap = new Ext.KeyMap(this.el, this.keys)
						}
						return this.keyMap
					},
					initEvents : function() {
						if (this.keys) {
							this.getKeyMap()
						}
						if (this.draggable) {
							this.initDraggable()
						}
					},
					initDraggable : function() {
						this.dd = new Ext.Panel.DD(this,
								typeof this.draggable == "boolean" ? null
										: this.draggable)
					},
					beforeEffect : function() {
						if (this.floating) {
							this.el.beforeAction()
						}
						this.el.addClass("x-panel-animated")
					},
					afterEffect : function() {
						this.syncShadow();
						this.el.removeClass("x-panel-animated")
					},
					createEffect : function(c, b, d) {
						var e = {
							scope : d,
							block : true
						};
						if (c === true) {
							e.callback = b;
							return e
						} else {
							if (!c.callback) {
								e.callback = b
							} else {
								e.callback = function() {
									b.call(d);
									Ext.callback(c.callback, c.scope)
								}
							}
						}
						return Ext.applyIf(e, c)
					},
					collapse : function(b) {
						if (this.collapsed
								|| this.el.hasFxBlock()
								|| this.fireEvent("beforecollapse", this, b) === false) {
							return
						}
						var a = b === true
								|| (b !== false && this.animCollapse);
						this.beforeEffect();
						this.onCollapse(a, b);
						return this
					},
					onCollapse : function(a, b) {
						if (a) {
							this[this.collapseEl].slideOut(this.slideAnchor,
									Ext.apply(this.createEffect(b || true,
											this.afterCollapse, this),
											this.collapseDefaults))
						} else {
							this[this.collapseEl].hide();
							this.afterCollapse()
						}
					},
					afterCollapse : function() {
						this.collapsed = true;
						this.el.addClass(this.collapsedCls);
						this.afterEffect();
						this.fireEvent("collapse", this)
					},
					expand : function(b) {
						if (!this.collapsed
								|| this.el.hasFxBlock()
								|| this.fireEvent("beforeexpand", this, b) === false) {
							return
						}
						var a = b === true
								|| (b !== false && this.animCollapse);
						this.el.removeClass(this.collapsedCls);
						this.beforeEffect();
						this.onExpand(a, b);
						return this
					},
					onExpand : function(a, b) {
						if (a) {
							this[this.collapseEl].slideIn(this.slideAnchor, Ext
									.apply(this.createEffect(b || true,
											this.afterExpand, this),
											this.expandDefaults))
						} else {
							this[this.collapseEl].show();
							this.afterExpand()
						}
					},
					afterExpand : function() {
						this.collapsed = false;
						this.afterEffect();
						if (this.deferLayout !== undefined) {
							this.doLayout(true)
						}
						this.fireEvent("expand", this)
					},
					toggleCollapse : function(a) {
						this[this.collapsed ? "expand" : "collapse"](a);
						return this
					},
					onDisable : function() {
						if (this.rendered && this.maskDisabled) {
							this.el.mask()
						}
						Ext.Panel.superclass.onDisable.call(this)
					},
					onEnable : function() {
						if (this.rendered && this.maskDisabled) {
							this.el.unmask()
						}
						Ext.Panel.superclass.onEnable.call(this)
					},
					onResize : function(b, c) {
						if (b !== undefined || c !== undefined) {
							if (!this.collapsed) {
								if (typeof b == "number") {
									b = this.adjustBodyWidth(b
											- this.getFrameWidth());
									if (this.tbar) {
										this.tbar.setWidth(b);
										if (this.topToolbar) {
											this.topToolbar.setSize(b)
										}
									}
									if (this.bbar) {
										this.bbar.setWidth(b);
										if (this.bottomToolbar) {
											this.bottomToolbar.setSize(b)
										}
									}
									if (this.fbar) {
										var d = this.fbar, e = 1, a = Ext.isStrict;
										if (this.buttonAlign == "left") {
											e = b
													- d.container
															.getFrameWidth("lr")
										} else {
											if (Ext.isIE || Ext.isWebKit) {
												if (!(this.buttonAlign == "center" && Ext.isWebKit)
														&& (!a || (!Ext.isIE8 && a))) {
													( function() {
														d
																.setWidth(d
																		.getEl()
																		.child(
																				".x-toolbar-ct")
																		.getWidth())
													}).defer(1)
												} else {
													e = "auto"
												}
											} else {
												e = "auto"
											}
										}
										d.setWidth(e)
									}
									this.body.setWidth(b)
								} else {
									if (b == "auto") {
										this.body.setWidth(b)
									}
								}
								if (typeof c == "number") {
									c = Math.max(0, this.adjustBodyHeight(c
											- this.getFrameHeight()));
									this.body.setHeight(c)
								} else {
									if (c == "auto") {
										this.body.setHeight(c)
									}
								}
								if (this.disabled && this.el._mask) {
									this.el._mask.setSize(
											this.el.dom.clientWidth, this.el
													.getHeight())
								}
							} else {
								this.queuedBodySize = {
									width : b,
									height : c
								};
								if (!this.queuedExpand
										&& this.allowQueuedExpand !== false) {
									this.queuedExpand = true;
									this.on("expand", function() {
										delete this.queuedExpand;
										this.onResize(
												this.queuedBodySize.width,
												this.queuedBodySize.height);
										this.doLayout()
									}, this, {
										single : true
									})
								}
							}
							this.fireEvent("bodyresize", this, b, c)
						}
						this.syncShadow()
					},
					adjustBodyHeight : function(a) {
						return a
					},
					adjustBodyWidth : function(a) {
						return a
					},
					onPosition : function() {
						this.syncShadow()
					},
					getFrameWidth : function() {
						var b = this.el.getFrameWidth("lr")
								+ this.bwrap.getFrameWidth("lr");
						if (this.frame) {
							var a = this.bwrap.dom.firstChild;
							b += (Ext.fly(a).getFrameWidth("l") + Ext.fly(
									a.firstChild).getFrameWidth("r"));
							var c = this.bwrap.dom.firstChild.firstChild.firstChild;
							b += Ext.fly(c).getFrameWidth("lr")
						}
						return b
					},
					getFrameHeight : function() {
						var a = this.el.getFrameWidth("tb")
								+ this.bwrap.getFrameWidth("tb");
						a += (this.tbar ? this.tbar.getHeight() : 0)
								+ (this.bbar ? this.bbar.getHeight() : 0);
						if (this.frame) {
							var c = this.el.dom.firstChild;
							var d = this.bwrap.dom.lastChild;
							a += (c.offsetHeight + d.offsetHeight);
							var b = this.bwrap.dom.firstChild.firstChild.firstChild;
							a += Ext.fly(b).getFrameWidth("tb")
						} else {
							a += (this.header ? this.header.getHeight() : 0)
									+ (this.footer ? this.footer.getHeight()
											: 0)
						}
						return a
					},
					getInnerWidth : function() {
						return this.getSize().width - this.getFrameWidth()
					},
					getInnerHeight : function() {
						return this.getSize().height - this.getFrameHeight()
					},
					syncShadow : function() {
						if (this.floating) {
							this.el.sync(true)
						}
					},
					getLayoutTarget : function() {
						return this.body
					},
					setTitle : function(b, a) {
						this.title = b;
						if (this.header && this.headerAsText) {
							this.header.child("span").update(b)
						}
						if (a) {
							this.setIconClass(a)
						}
						this.fireEvent("titlechange", this, b);
						return this
					},
					getUpdater : function() {
						return this.body.getUpdater()
					},
					load : function() {
						var a = this.body.getUpdater();
						a.update.apply(a, arguments);
						return this
					},
					beforeDestroy : function() {
						if (this.header) {
							this.header.removeAllListeners();
							if (this.headerAsText) {
								Ext.Element.uncache(this.header.child("span"))
							}
						}
						Ext.Element.uncache(this.header, this.tbar, this.bbar,
								this.footer, this.body, this.bwrap);
						if (this.tools) {
							for ( var c in this.tools) {
								Ext.destroy(this.tools[c])
							}
						}
						if (this.buttons) {
							for ( var a in this.buttons) {
								Ext.destroy(this.buttons[a])
							}
						}
						Ext.destroy(this.toolbars);
						Ext.Panel.superclass.beforeDestroy.call(this)
					},
					createClasses : function() {
						this.headerCls = this.baseCls + "-header";
						this.headerTextCls = this.baseCls + "-header-text";
						this.bwrapCls = this.baseCls + "-bwrap";
						this.tbarCls = this.baseCls + "-tbar";
						this.bodyCls = this.baseCls + "-body";
						this.bbarCls = this.baseCls + "-bbar";
						this.footerCls = this.baseCls + "-footer"
					},
					createGhost : function(a, e, b) {
						var d = document.createElement("div");
						d.className = "x-panel-ghost " + (a ? a : "");
						if (this.header) {
							d.appendChild(this.el.dom.firstChild
									.cloneNode(true))
						}
						Ext.fly(d.appendChild(document.createElement("ul")))
								.setHeight(this.bwrap.getHeight());
						d.style.width = this.el.dom.offsetWidth + "px";
						if (!b) {
							this.container.dom.appendChild(d)
						} else {
							Ext.getDom(b).appendChild(d)
						}
						if (e !== false && this.el.useShim !== false) {
							var c = new Ext.Layer( {
								shadow : false,
								useDisplay : true,
								constrain : false
							}, d);
							c.show();
							return c
						} else {
							return new Ext.Element(d)
						}
					},
					doAutoLoad : function() {
						var a = this.body.getUpdater();
						if (this.renderer) {
							a.setRenderer(this.renderer)
						}
						a.update(Ext.isObject(this.autoLoad) ? this.autoLoad
								: {
									url : this.autoLoad
								})
					},
					getTool : function(a) {
						return this.tools[a]
					}
				});
Ext.reg("panel", Ext.Panel);
Ext.Editor = function(b, a) {
	if (b.field) {
		this.field = Ext.create(b.field, "textfield");
		a = Ext.apply( {}, b);
		delete a.field
	} else {
		this.field = b
	}
	Ext.Editor.superclass.constructor.call(this, a)
};
Ext
		.extend(Ext.Editor, Ext.Component,
				{
					value : "",
					alignment : "c-c?",
					shadow : "frame",
					constrain : false,
					swallowKeys : true,
					completeOnEnter : false,
					cancelOnEsc : false,
					updateEl : false,
					initComponent : function() {
						Ext.Editor.superclass.initComponent.call(this);
						this.addEvents("beforestartedit", "startedit",
								"beforecomplete", "complete", "canceledit",
								"specialkey")
					},
					onRender : function(b, a) {
						this.el = new Ext.Layer( {
							shadow : this.shadow,
							cls : "x-editor",
							parentEl : b,
							shim : this.shim,
							shadowOffset : this.shadowOffset || 4,
							id : this.id,
							constrain : this.constrain
						});
						if (this.zIndex) {
							this.el.setZIndex(this.zIndex)
						}
						this.el.setStyle("overflow", Ext.isGecko ? "auto"
								: "hidden");
						if (this.field.msgTarget != "title") {
							this.field.msgTarget = "qtip"
						}
						this.field.inEditor = true;
						this.field.render(this.el);
						if (Ext.isGecko) {
							this.field.el.dom.setAttribute("autocomplete",
									"off")
						}
						this.mon(this.field, "specialkey", this.onSpecialKey,
								this);
						if (this.swallowKeys) {
							this.field.el
									.swallowEvent( [ "keydown", "keypress" ])
						}
						this.field.show();
						this.mon(this.field, "blur", this.onBlur, this);
						if (this.field.grow) {
							this.mon(this.field, "autosize", this.el.sync,
									this.el, {
										delay : 1
									})
						}
					},
					onSpecialKey : function(c, b) {
						var a = b.getKey();
						if (this.completeOnEnter && a == b.ENTER) {
							b.stopEvent();
							this.completeEdit()
						} else {
							if (this.cancelOnEsc && a == b.ESC) {
								this.cancelEdit()
							} else {
								this.fireEvent("specialkey", c, b)
							}
						}
						if (this.field.triggerBlur
								&& (a == b.ENTER || a == b.ESC || a == b.TAB)) {
							this.field.triggerBlur()
						}
					},
					startEdit : function(b, c) {
						if (this.editing) {
							this.completeEdit()
						}
						this.boundEl = Ext.get(b);
						var a = c !== undefined ? c
								: this.boundEl.dom.innerHTML;
						if (!this.rendered) {
							this.render(this.parentEl || document.body)
						}
						if (this.fireEvent("beforestartedit", this,
								this.boundEl, a) === false) {
							return
						}
						this.startValue = a;
						this.field.setValue(a);
						this.doAutoSize();
						this.el.alignTo(this.boundEl, this.alignment);
						this.editing = true;
						this.show()
					},
					doAutoSize : function() {
						if (this.autoSize) {
							var a = this.boundEl.getSize();
							switch (this.autoSize) {
							case "width":
								this.setSize(a.width, "");
								break;
							case "height":
								this.setSize("", a.height);
								break;
							default:
								this.setSize(a.width, a.height)
							}
						}
					},
					setSize : function(a, b) {
						delete this.field.lastSize;
						this.field.setSize(a, b);
						if (this.el) {
							if (Ext.isGecko2 || Ext.isOpera) {
								this.el.setSize(a, b)
							}
							this.el.sync()
						}
					},
					realign : function() {
						this.el.alignTo(this.boundEl, this.alignment)
					},
					completeEdit : function(a) {
						if (!this.editing) {
							return
						}
						var b = this.getValue();
						if (!this.field.isValid()) {
							if (this.revertInvalid !== false) {
								this.cancelEdit(a)
							}
							return
						}
						if (String(b) === String(this.startValue)
								&& this.ignoreNoChange) {
							this.hideEdit(a);
							return
						}
						if (this.fireEvent("beforecomplete", this, b,
								this.startValue) !== false) {
							b = this.getValue();
							if (this.updateEl && this.boundEl) {
								this.boundEl.update(b)
							}
							this.hideEdit(a);
							this
									.fireEvent("complete", this, b,
											this.startValue)
						}
					},
					onShow : function() {
						this.el.show();
						if (this.hideEl !== false) {
							this.boundEl.hide()
						}
						this.field.show();
						if (Ext.isIE && !this.fixIEFocus) {
							this.fixIEFocus = true;
							this.deferredFocus.defer(50, this)
						} else {
							this.field.focus()
						}
						this.fireEvent("startedit", this.boundEl,
								this.startValue)
					},
					deferredFocus : function() {
						if (this.editing) {
							this.field.focus()
						}
					},
					cancelEdit : function(a) {
						if (this.editing) {
							var b = this.getValue();
							this.setValue(this.startValue);
							this.hideEdit(a);
							this.fireEvent("canceledit", this, b,
									this.startValue)
						}
					},
					hideEdit : function(a) {
						if (a !== true) {
							this.editing = false;
							this.hide()
						}
					},
					onBlur : function() {
						if (this.allowBlur !== true && this.editing) {
							this.completeEdit()
						}
					},
					onHide : function() {
						if (this.editing) {
							this.completeEdit();
							return
						}
						this.field.blur();
						if (this.field.collapse) {
							this.field.collapse()
						}
						this.el.hide();
						if (this.hideEl !== false) {
							this.boundEl.show()
						}
					},
					setValue : function(a) {
						this.field.setValue(a)
					},
					getValue : function() {
						return this.field.getValue()
					},
					beforeDestroy : function() {
						Ext.destroy(this.field);
						this.field = null
					}
				});
Ext.reg("editor", Ext.Editor);
Ext.ColorPalette = function(a) {
	Ext.ColorPalette.superclass.constructor.call(this, a);
	this.addEvents("select");
	if (this.handler) {
		this.on("select", this.handler, this.scope, true)
	}
};
Ext
		.extend(
				Ext.ColorPalette,
				Ext.Component,
				{
					itemCls : "x-color-palette",
					value : null,
					clickEvent : "click",
					ctype : "Ext.ColorPalette",
					allowReselect : false,
					colors : [ "000000", "993300", "333300", "003300",
							"003366", "000080", "333399", "333333", "800000",
							"FF6600", "808000", "008000", "008080", "0000FF",
							"666699", "808080", "FF0000", "FF9900", "99CC00",
							"339966", "33CCCC", "3366FF", "800080", "969696",
							"FF00FF", "FFCC00", "FFFF00", "00FF00", "00FFFF",
							"00CCFF", "993366", "C0C0C0", "FF99CC", "FFCC99",
							"FFFF99", "CCFFCC", "CCFFFF", "99CCFF", "CC99FF",
							"FFFFFF" ],
					onRender : function(b, a) {
						var c = this.tpl
								|| new Ext.XTemplate(
										'<tpl for="."><a href="#" class="color-{.}" hidefocus="on"><em><span style="background:#{.}" unselectable="on">&#160;</span></em></a></tpl>');
						var d = document.createElement("div");
						d.id = this.getId();
						d.className = this.itemCls;
						c.overwrite(d, this.colors);
						b.dom.insertBefore(d, a);
						this.el = Ext.get(d);
						this.mon(this.el, this.clickEvent, this.handleClick,
								this, {
									delegate : "a"
								});
						if (this.clickEvent != "click") {
							this.mon(this.el, "click", Ext.emptyFn, this, {
								delegate : "a",
								preventDefault : true
							})
						}
					},
					afterRender : function() {
						Ext.ColorPalette.superclass.afterRender.call(this);
						if (this.value) {
							var a = this.value;
							this.value = null;
							this.select(a)
						}
					},
					handleClick : function(b, a) {
						b.preventDefault();
						if (!this.disabled) {
							var d = a.className
									.match(/(?:^|\s)color-(.{6})(?:\s|$)/)[1];
							this.select(d.toUpperCase())
						}
					},
					select : function(a) {
						a = a.replace("#", "");
						if (a != this.value || this.allowReselect) {
							var b = this.el;
							if (this.value) {
								b.child("a.color-" + this.value).removeClass(
										"x-color-palette-sel")
							}
							b.child("a.color-" + a).addClass(
									"x-color-palette-sel");
							this.value = a;
							this.fireEvent("select", this, a)
						}
					}
				});
Ext.reg("colorpalette", Ext.ColorPalette);
Ext.DatePicker = Ext
		.extend(
				Ext.BoxComponent,
				{
					todayText : "Today",
					okText : "&#160;OK&#160;",
					cancelText : "Cancel",
					todayTip : "{0} (Spacebar)",
					minText : "This date is before the minimum date",
					maxText : "This date is after the maximum date",
					format : "m/d/y",
					disabledDaysText : "Disabled",
					disabledDatesText : "Disabled",
					monthNames : Date.monthNames,
					dayNames : Date.dayNames,
					nextText : "Next Month (Control+Right)",
					prevText : "Previous Month (Control+Left)",
					monthYearText : "Choose a month (Control+Up/Down to move years)",
					startDay : 0,
					showToday : true,
					initComponent : function() {
						Ext.DatePicker.superclass.initComponent.call(this);
						this.value = this.value ? this.value.clearTime()
								: new Date().clearTime();
						this.addEvents("select");
						if (this.handler) {
							this.on("select", this.handler, this.scope || this)
						}
						this.initDisabledDays()
					},
					initDisabledDays : function() {
						if (!this.disabledDatesRE && this.disabledDates) {
							var b = this.disabledDates, a = b.length - 1, c = "(?:";
							Ext.each(b, function(g, e) {
								c += Ext.isDate(g) ? "^"
										+ Ext.escapeRe(g
												.dateFormat(this.format)) + "$"
										: b[e];
								if (e != a) {
									c += "|"
								}
							}, this);
							this.disabledDatesRE = new RegExp(c + ")")
						}
					},
					setDisabledDates : function(a) {
						if (Ext.isArray(a)) {
							this.disabledDates = a;
							this.disabledDatesRE = null
						} else {
							this.disabledDatesRE = a
						}
						this.initDisabledDays();
						this.update(this.value, true)
					},
					setDisabledDays : function(a) {
						this.disabledDays = a;
						this.update(this.value, true)
					},
					setMinDate : function(a) {
						this.minDate = a;
						this.update(this.value, true)
					},
					setMaxDate : function(a) {
						this.maxDate = a;
						this.update(this.value, true)
					},
					setValue : function(b) {
						var a = this.value;
						this.value = b.clearTime(true);
						if (this.el) {
							this.update(this.value)
						}
					},
					getValue : function() {
						return this.value
					},
					focus : function() {
						if (this.el) {
							this.update(this.activeDate)
						}
					},
					onEnable : function(a) {
						Ext.DatePicker.superclass.onEnable.call(this);
						this.doDisabled(false);
						this.update(a ? this.value : this.activeDate);
						if (Ext.isIE) {
							this.el.repaint()
						}
					},
					onDisable : function() {
						Ext.DatePicker.superclass.onDisable.call(this);
						this.doDisabled(true);
						if (Ext.isIE && !Ext.isIE8) {
							Ext.each( [].concat(this.textNodes, this.el
									.query("th span")), function(a) {
								Ext.fly(a).repaint()
							})
						}
					},
					doDisabled : function(a) {
						this.keyNav.setDisabled(a);
						this.prevRepeater.setDisabled(a);
						this.nextRepeater.setDisabled(a);
						if (this.showToday) {
							this.todayKeyListener.setDisabled(a);
							this.todayBtn.setDisabled(a)
						}
					},
					onRender : function(e, b) {
						var a = [
								'<table cellspacing="0">',
								'<tr><td class="x-date-left"><a href="#" title="',
								this.prevText,
								'">&#160;</a></td><td class="x-date-middle" align="center"></td><td class="x-date-right"><a href="#" title="',
								this.nextText, '">&#160;</a></td></tr>',
								'<tr><td colspan="3"><table class="x-date-inner" cellspacing="0"><thead><tr>' ], c = this.dayNames, h;
						for (h = 0; h < 7; h++) {
							var k = this.startDay + h;
							if (k > 6) {
								k = k - 7
							}
							a.push("<th><span>", c[k].substr(0, 1),
									"</span></th>")
						}
						a[a.length] = "</tr></thead><tbody><tr>";
						for (h = 0; h < 42; h++) {
							if (h % 7 === 0 && h !== 0) {
								a[a.length] = "</tr><tr>"
							}
							a[a.length] = '<td><a href="#" hidefocus="on" class="x-date-date" tabIndex="1"><em><span></span></em></a></td>'
						}
						a
								.push(
										"</tr></tbody></table></td></tr>",
										this.showToday ? '<tr><td colspan="3" class="x-date-bottom" align="center"></td></tr>'
												: "",
										'</table><div class="x-date-mp"></div>');
						var j = document.createElement("div");
						j.className = "x-date-picker";
						j.innerHTML = a.join("");
						e.dom.insertBefore(j, b);
						this.el = Ext.get(j);
						this.eventEl = Ext.get(j.firstChild);
						this.prevRepeater = new Ext.util.ClickRepeater(this.el
								.child("td.x-date-left a"), {
							handler : this.showPrevMonth,
							scope : this,
							preventDefault : true,
							stopDefault : true
						});
						this.nextRepeater = new Ext.util.ClickRepeater(this.el
								.child("td.x-date-right a"), {
							handler : this.showNextMonth,
							scope : this,
							preventDefault : true,
							stopDefault : true
						});
						this.monthPicker = this.el.down("div.x-date-mp");
						this.monthPicker.enableDisplayMode("block");
						this.keyNav = new Ext.KeyNav(this.eventEl, {
							left : function(d) {
								if (d.ctrlKey) {
									this.showPrevMonth()
								} else {
									this.update(this.activeDate.add("d", -1))
								}
							},
							right : function(d) {
								if (d.ctrlKey) {
									this.showNextMonth()
								} else {
									this.update(this.activeDate.add("d", 1))
								}
							},
							up : function(d) {
								if (d.ctrlKey) {
									this.showNextYear()
								} else {
									this.update(this.activeDate.add("d", -7))
								}
							},
							down : function(d) {
								if (d.ctrlKey) {
									this.showPrevYear()
								} else {
									this.update(this.activeDate.add("d", 7))
								}
							},
							pageUp : function(d) {
								this.showNextMonth()
							},
							pageDown : function(d) {
								this.showPrevMonth()
							},
							enter : function(d) {
								d.stopPropagation();
								return true
							},
							scope : this
						});
						this.el.unselectable();
						this.cells = this.el
								.select("table.x-date-inner tbody td");
						this.textNodes = this.el
								.query("table.x-date-inner tbody span");
						this.mbtn = new Ext.Button( {
							text : "&#160;",
							tooltip : this.monthYearText,
							renderTo : this.el.child("td.x-date-middle", true)
						});
						this.mbtn.el.child("em").addClass("x-btn-arrow");
						if (this.showToday) {
							this.todayKeyListener = this.eventEl
									.addKeyListener(Ext.EventObject.SPACE,
											this.selectToday, this);
							var g = (new Date()).dateFormat(this.format);
							this.todayBtn = new Ext.Button( {
								renderTo : this.el.child("td.x-date-bottom",
										true),
								text : String.format(this.todayText, g),
								tooltip : String.format(this.todayTip, g),
								handler : this.selectToday,
								scope : this
							})
						}
						this.mon(this.eventEl, "mousewheel",
								this.handleMouseWheel, this);
						this.mon(this.eventEl, "click", this.handleDateClick,
								this, {
									delegate : "a.x-date-date"
								});
						this
								.mon(this.mbtn, "click", this.showMonthPicker,
										this);
						this.onEnable(true)
					},
					createMonthPicker : function() {
						if (!this.monthPicker.dom.firstChild) {
							var a = [ '<table border="0" cellspacing="0">' ];
							for ( var b = 0; b < 6; b++) {
								a
										.push(
												'<tr><td class="x-date-mp-month"><a href="#">',
												Date.getShortMonthName(b),
												"</a></td>",
												'<td class="x-date-mp-month x-date-mp-sep"><a href="#">',
												Date.getShortMonthName(b + 6),
												"</a></td>",
												b === 0 ? '<td class="x-date-mp-ybtn" align="center"><a class="x-date-mp-prev"></a></td><td class="x-date-mp-ybtn" align="center"><a class="x-date-mp-next"></a></td></tr>'
														: '<td class="x-date-mp-year"><a href="#"></a></td><td class="x-date-mp-year"><a href="#"></a></td></tr>')
							}
							a
									.push(
											'<tr class="x-date-mp-btns"><td colspan="4"><button type="button" class="x-date-mp-ok">',
											this.okText,
											'</button><button type="button" class="x-date-mp-cancel">',
											this.cancelText,
											"</button></td></tr>", "</table>");
							this.monthPicker.update(a.join(""));
							this.mon(this.monthPicker, "click",
									this.onMonthClick, this);
							this.mon(this.monthPicker, "dblclick",
									this.onMonthDblClick, this);
							this.mpMonths = this.monthPicker
									.select("td.x-date-mp-month");
							this.mpYears = this.monthPicker
									.select("td.x-date-mp-year");
							this.mpMonths.each( function(c, d, e) {
								e += 1;
								if ((e % 2) === 0) {
									c.dom.xmonth = 5 + Math.round(e * 0.5)
								} else {
									c.dom.xmonth = Math.round((e - 1) * 0.5)
								}
							})
						}
					},
					showMonthPicker : function() {
						if (!this.disabled) {
							this.createMonthPicker();
							var a = this.el.getSize();
							this.monthPicker.setSize(a);
							this.monthPicker.child("table").setSize(a);
							this.mpSelMonth = (this.activeDate || this.value)
									.getMonth();
							this.updateMPMonth(this.mpSelMonth);
							this.mpSelYear = (this.activeDate || this.value)
									.getFullYear();
							this.updateMPYear(this.mpSelYear);
							this.monthPicker.slideIn("t", {
								duration : 0.2
							})
						}
					},
					updateMPYear : function(e) {
						this.mpyear = e;
						var c = this.mpYears.elements;
						for ( var b = 1; b <= 10; b++) {
							var d = c[b - 1], a;
							if ((b % 2) === 0) {
								a = e + Math.round(b * 0.5);
								d.firstChild.innerHTML = a;
								d.xyear = a
							} else {
								a = e - (5 - Math.round(b * 0.5));
								d.firstChild.innerHTML = a;
								d.xyear = a
							}
							this.mpYears.item(b - 1)[a == this.mpSelYear ? "addClass"
									: "removeClass"]("x-date-mp-sel")
						}
					},
					updateMPMonth : function(a) {
						this.mpMonths.each( function(b, c, d) {
							b[b.dom.xmonth == a ? "addClass" : "removeClass"]
									("x-date-mp-sel")
						})
					},
					selectMPMonth : function(a) {
					},
					onMonthClick : function(g, b) {
						g.stopEvent();
						var c = new Ext.Element(b), a;
						if (c.is("button.x-date-mp-cancel")) {
							this.hideMonthPicker()
						} else {
							if (c.is("button.x-date-mp-ok")) {
								var h = new Date(this.mpSelYear,
										this.mpSelMonth,
										(this.activeDate || this.value)
												.getDate());
								if (h.getMonth() != this.mpSelMonth) {
									h = new Date(this.mpSelYear,
											this.mpSelMonth, 1)
											.getLastDateOfMonth()
								}
								this.update(h);
								this.hideMonthPicker()
							} else {
								if ((a = c.up("td.x-date-mp-month", 2))) {
									this.mpMonths.removeClass("x-date-mp-sel");
									a.addClass("x-date-mp-sel");
									this.mpSelMonth = a.dom.xmonth
								} else {
									if ((a = c.up("td.x-date-mp-year", 2))) {
										this.mpYears
												.removeClass("x-date-mp-sel");
										a.addClass("x-date-mp-sel");
										this.mpSelYear = a.dom.xyear
									} else {
										if (c.is("a.x-date-mp-prev")) {
											this.updateMPYear(this.mpyear - 10)
										} else {
											if (c.is("a.x-date-mp-next")) {
												this
														.updateMPYear(this.mpyear + 10)
											}
										}
									}
								}
							}
						}
					},
					onMonthDblClick : function(d, b) {
						d.stopEvent();
						var c = new Ext.Element(b), a;
						if ((a = c.up("td.x-date-mp-month", 2))) {
							this.update(new Date(this.mpSelYear, a.dom.xmonth,
									(this.activeDate || this.value).getDate()));
							this.hideMonthPicker()
						} else {
							if ((a = c.up("td.x-date-mp-year", 2))) {
								this.update(new Date(a.dom.xyear,
										this.mpSelMonth,
										(this.activeDate || this.value)
												.getDate()));
								this.hideMonthPicker()
							}
						}
					},
					hideMonthPicker : function(a) {
						if (this.monthPicker) {
							if (a === true) {
								this.monthPicker.hide()
							} else {
								this.monthPicker.slideOut("t", {
									duration : 0.2
								})
							}
						}
					},
					showPrevMonth : function(a) {
						this.update(this.activeDate.add("mo", -1))
					},
					showNextMonth : function(a) {
						this.update(this.activeDate.add("mo", 1))
					},
					showPrevYear : function() {
						this.update(this.activeDate.add("y", -1))
					},
					showNextYear : function() {
						this.update(this.activeDate.add("y", 1))
					},
					handleMouseWheel : function(a) {
						a.stopEvent();
						if (!this.disabled) {
							var b = a.getWheelDelta();
							if (b > 0) {
								this.showPrevMonth()
							} else {
								if (b < 0) {
									this.showNextMonth()
								}
							}
						}
					},
					handleDateClick : function(b, a) {
						b.stopEvent();
						if (!this.disabled
								&& a.dateValue
								&& !Ext.fly(a.parentNode).hasClass(
										"x-date-disabled")) {
							this.setValue(new Date(a.dateValue));
							this.fireEvent("select", this, this.value)
						}
					},
					selectToday : function() {
						if (this.todayBtn && !this.todayBtn.disabled) {
							this.setValue(new Date().clearTime());
							this.fireEvent("select", this, this.value)
						}
					},
					update : function(H, B) {
						var a = this.activeDate, p = this.isVisible();
						this.activeDate = H;
						if (!B && a && this.el) {
							var o = H.getTime();
							if (a.getMonth() == H.getMonth()
									&& a.getFullYear() == H.getFullYear()) {
								this.cells.removeClass("x-date-selected");
								this.cells.each( function(d) {
									if (d.dom.firstChild.dateValue == o) {
										d.addClass("x-date-selected");
										if (p) {
											Ext.fly(d.dom.firstChild).focus(50)
										}
										return false
									}
								});
								return
							}
						}
						var k = H.getDaysInMonth();
						var q = H.getFirstDateOfMonth();
						var g = q.getDay() - this.startDay;
						if (g <= this.startDay) {
							g += 7
						}
						var C = H.add("mo", -1);
						var h = C.getDaysInMonth() - g;
						var e = this.cells.elements;
						var r = this.textNodes;
						k += g;
						var z = 86400000;
						var E = (new Date(C.getFullYear(), C.getMonth(), h))
								.clearTime();
						var D = new Date().clearTime().getTime();
						var v = H.clearTime().getTime();
						var u = this.minDate ? this.minDate.clearTime()
								: Number.NEGATIVE_INFINITY;
						var y = this.maxDate ? this.maxDate.clearTime()
								: Number.POSITIVE_INFINITY;
						var G = this.disabledDatesRE;
						var s = this.disabledDatesText;
						var J = this.disabledDays ? this.disabledDays.join("")
								: false;
						var F = this.disabledDaysText;
						var A = this.format;
						if (this.showToday) {
							var m = new Date().clearTime();
							var c = (m < u || m > y
									|| (G && A && G.test(m.dateFormat(A))) || (J && J
									.indexOf(m.getDay()) != -1));
							if (!this.disabled) {
								this.todayBtn.setDisabled(c);
								this.todayKeyListener[c ? "disable" : "enable"]
										()
							}
						}
						var l = function(K, d) {
							d.title = "";
							var i = E.getTime();
							d.firstChild.dateValue = i;
							if (i == D) {
								d.className += " x-date-today";
								d.title = K.todayText
							}
							if (i == v) {
								d.className += " x-date-selected";
								if (p) {
									Ext.fly(d.firstChild).focus(50)
								}
							}
							if (i < u) {
								d.className = " x-date-disabled";
								d.title = K.minText;
								return
							}
							if (i > y) {
								d.className = " x-date-disabled";
								d.title = K.maxText;
								return
							}
							if (J) {
								if (J.indexOf(E.getDay()) != -1) {
									d.title = F;
									d.className = " x-date-disabled"
								}
							}
							if (G && A) {
								var w = E.dateFormat(A);
								if (G.test(w)) {
									d.title = s.replace("%0", w);
									d.className = " x-date-disabled"
								}
							}
						};
						var x = 0;
						for (; x < g; x++) {
							r[x].innerHTML = (++h);
							E.setDate(E.getDate() + 1);
							e[x].className = "x-date-prevday";
							l(this, e[x])
						}
						for (; x < k; x++) {
							var b = x - g + 1;
							r[x].innerHTML = (b);
							E.setDate(E.getDate() + 1);
							e[x].className = "x-date-active";
							l(this, e[x])
						}
						var I = 0;
						for (; x < 42; x++) {
							r[x].innerHTML = (++I);
							E.setDate(E.getDate() + 1);
							e[x].className = "x-date-nextday";
							l(this, e[x])
						}
						this.mbtn.setText(this.monthNames[H.getMonth()] + " "
								+ H.getFullYear());
						if (!this.internalRender) {
							var j = this.el.dom.firstChild;
							var n = j.offsetWidth;
							this.el.setWidth(n + this.el.getBorderWidth("lr"));
							Ext.fly(j).setWidth(n);
							this.internalRender = true;
							if (Ext.isOpera && !this.secondPass) {
								j.rows[0].cells[1].style.width = (n - (j.rows[0].cells[0].offsetWidth + j.rows[0].cells[2].offsetWidth))
										+ "px";
								this.secondPass = true;
								this.update.defer(10, this, [ H ])
							}
						}
					},
					beforeDestroy : function() {
						if (this.rendered) {
							this.keyNav.disable();
							this.keyNav = null;
							Ext.destroy(this.leftClickRpt, this.rightClickRpt,
									this.monthPicker, this.eventEl, this.mbtn,
									this.todayBtn)
						}
					}
				});
Ext.reg("datepicker", Ext.DatePicker);
Ext.LoadMask = function(c, b) {
	this.el = Ext.get(c);
	Ext.apply(this, b);
	if (this.store) {
		this.store.on("beforeload", this.onBeforeLoad, this);
		this.store.on("load", this.onLoad, this);
		this.store.on("exception", this.onLoad, this);
		this.removeMask = Ext.value(this.removeMask, false)
	} else {
		var a = this.el.getUpdater();
		a.showLoadIndicator = false;
		a.on("beforeupdate", this.onBeforeLoad, this);
		a.on("update", this.onLoad, this);
		a.on("failure", this.onLoad, this);
		this.removeMask = Ext.value(this.removeMask, true)
	}
};
Ext.LoadMask.prototype = {
	msg : "Loading...",
	msgCls : "x-mask-loading",
	disabled : false,
	disable : function() {
		this.disabled = true
	},
	enable : function() {
		this.disabled = false
	},
	onLoad : function() {
		this.el.unmask(this.removeMask)
	},
	onBeforeLoad : function() {
		if (!this.disabled) {
			this.el.mask(this.msg, this.msgCls)
		}
	},
	show : function() {
		this.onBeforeLoad()
	},
	hide : function() {
		this.onLoad()
	},
	destroy : function() {
		if (this.store) {
			this.store.un("beforeload", this.onBeforeLoad, this);
			this.store.un("load", this.onLoad, this);
			this.store.un("exception", this.onLoad, this)
		} else {
			var a = this.el.getUpdater();
			a.un("beforeupdate", this.onBeforeLoad, this);
			a.un("update", this.onLoad, this);
			a.un("failure", this.onLoad, this)
		}
	}
};
Ext.Slider = Ext
		.extend(
				Ext.BoxComponent,
				{
					vertical : false,
					minValue : 0,
					maxValue : 100,
					decimalPrecision : 0,
					keyIncrement : 1,
					increment : 0,
					clickRange : [ 5, 15 ],
					clickToChange : true,
					animate : true,
					dragging : false,
					initComponent : function() {
						if (!Ext.isDefined(this.value)) {
							this.value = this.minValue
						}
						Ext.Slider.superclass.initComponent.call(this);
						this.keyIncrement = Math.max(this.increment,
								this.keyIncrement);
						this.addEvents("beforechange", "change",
								"changecomplete", "dragstart", "drag",
								"dragend");
						if (this.vertical) {
							Ext.apply(this, Ext.Slider.Vertical)
						}
					},
					onRender : function() {
						this.autoEl = {
							cls : "x-slider "
									+ (this.vertical ? "x-slider-vert"
											: "x-slider-horz"),
							cn : {
								cls : "x-slider-end",
								cn : {
									cls : "x-slider-inner",
									cn : [ {
										cls : "x-slider-thumb"
									}, {
										tag : "a",
										cls : "x-slider-focus",
										href : "#",
										tabIndex : "-1",
										hidefocus : "on"
									} ]
								}
							}
						};
						Ext.Slider.superclass.onRender.apply(this, arguments);
						this.endEl = this.el.first();
						this.innerEl = this.endEl.first();
						this.thumb = this.innerEl.first();
						this.halfThumb = (this.vertical ? this.thumb
								.getHeight() : this.thumb.getWidth()) / 2;
						this.focusEl = this.thumb.next();
						this.initEvents()
					},
					initEvents : function() {
						this.thumb.addClassOnOver("x-slider-thumb-over");
						this.mon(this.el, {
							scope : this,
							mousedown : this.onMouseDown,
							keydown : this.onKeyDown
						});
						this.focusEl.swallowEvent("click", true);
						this.tracker = new Ext.dd.DragTracker( {
							onBeforeStart : this.onBeforeDragStart
									.createDelegate(this),
							onStart : this.onDragStart.createDelegate(this),
							onDrag : this.onDrag.createDelegate(this),
							onEnd : this.onDragEnd.createDelegate(this),
							tolerance : 3,
							autoStart : 300
						});
						this.tracker.initEl(this.thumb);
						this.on("beforedestroy", this.tracker.destroy,
								this.tracker)
					},
					onMouseDown : function(b) {
						if (this.disabled) {
							return
						}
						if (this.clickToChange && b.target != this.thumb.dom) {
							var a = this.innerEl.translatePoints(b.getXY());
							this.onClickChange(a)
						}
						this.focus()
					},
					onClickChange : function(a) {
						if (a.top > this.clickRange[0]
								&& a.top < this.clickRange[1]) {
							this.setValue(Ext.util.Format.round(this
									.reverseValue(a.left),
									this.decimalPrecision), undefined, true)
						}
					},
					onKeyDown : function(b) {
						if (this.disabled) {
							b.preventDefault();
							return
						}
						var a = b.getKey();
						switch (a) {
						case b.UP:
						case b.RIGHT:
							b.stopEvent();
							if (b.ctrlKey) {
								this.setValue(this.maxValue, undefined, true)
							} else {
								this.setValue(this.value + this.keyIncrement,
										undefined, true)
							}
							break;
						case b.DOWN:
						case b.LEFT:
							b.stopEvent();
							if (b.ctrlKey) {
								this.setValue(this.minValue, undefined, true)
							} else {
								this.setValue(this.value - this.keyIncrement,
										undefined, true)
							}
							break;
						default:
							b.preventDefault()
						}
					},
					doSnap : function(b) {
						if (!this.increment || this.increment == 1 || !b) {
							return b
						}
						var d = b, c = this.increment;
						var a = b % c;
						if (a != 0) {
							d -= a;
							if (a * 2 > c) {
								d += c
							} else {
								if (a * 2 < -c) {
									d -= c
								}
							}
						}
						return d.constrain(this.minValue, this.maxValue)
					},
					afterRender : function() {
						Ext.Slider.superclass.afterRender
								.apply(this, arguments);
						if (this.value !== undefined) {
							var a = this.normalizeValue(this.value);
							if (a !== this.value) {
								delete this.value;
								this.setValue(a, false)
							} else {
								this.moveThumb(this.translateValue(a), false)
							}
						}
					},
					getRatio : function() {
						var a = this.innerEl.getWidth();
						var b = this.maxValue - this.minValue;
						return b == 0 ? a : (a / b)
					},
					normalizeValue : function(a) {
						a = this.doSnap(a);
						a = Ext.util.Format.round(a, this.decimalPrecision);
						a = a.constrain(this.minValue, this.maxValue);
						return a
					},
					setValue : function(b, a, c) {
						b = this.normalizeValue(b);
						if (b !== this.value
								&& this.fireEvent("beforechange", this, b,
										this.value) !== false) {
							this.value = b;
							this.moveThumb(this.translateValue(b), a !== false);
							this.fireEvent("change", this, b);
							if (c) {
								this.fireEvent("changecomplete", this, b)
							}
						}
					},
					translateValue : function(a) {
						var b = this.getRatio();
						return (a * b) - (this.minValue * b) - this.halfThumb
					},
					reverseValue : function(b) {
						var a = this.getRatio();
						return (b + this.halfThumb + (this.minValue * a)) / a
					},
					moveThumb : function(b, a) {
						if (!a || this.animate === false) {
							this.thumb.setLeft(b)
						} else {
							this.thumb.shift( {
								left : b,
								stopFx : true,
								duration : 0.35
							})
						}
					},
					focus : function() {
						this.focusEl.focus(10)
					},
					onBeforeDragStart : function(a) {
						return !this.disabled
					},
					onDragStart : function(a) {
						this.thumb.addClass("x-slider-thumb-drag");
						this.dragging = true;
						this.dragStartValue = this.value;
						this.fireEvent("dragstart", this, a)
					},
					onDrag : function(a) {
						var b = this.innerEl.translatePoints(this.tracker
								.getXY());
						this.setValue(Ext.util.Format.round(this
								.reverseValue(b.left), this.decimalPrecision),
								false);
						this.fireEvent("drag", this, a)
					},
					onDragEnd : function(a) {
						this.thumb.removeClass("x-slider-thumb-drag");
						this.dragging = false;
						this.fireEvent("dragend", this, a);
						if (this.dragStartValue != this.value) {
							this.fireEvent("changecomplete", this, this.value)
						}
					},
					onResize : function(a, b) {
						this.innerEl.setWidth(a
								- (this.el.getPadding("l") + this.endEl
										.getPadding("r")));
						this.syncThumb()
					},
					onDisable : function() {
						Ext.Slider.superclass.onDisable.call(this);
						this.thumb.addClass(this.disabledClass);
						if (Ext.isIE) {
							var a = this.thumb.getXY();
							this.thumb.hide();
							this.innerEl.addClass(this.disabledClass).dom.disabled = true;
							if (!this.thumbHolder) {
								this.thumbHolder = this.endEl.createChild( {
									cls : "x-slider-thumb "
											+ this.disabledClass
								})
							}
							this.thumbHolder.show().setXY(a)
						}
					},
					onEnable : function() {
						Ext.Slider.superclass.onEnable.call(this);
						this.thumb.removeClass(this.disabledClass);
						if (Ext.isIE) {
							this.innerEl.removeClass(this.disabledClass).dom.disabled = false;
							if (this.thumbHolder) {
								this.thumbHolder.hide()
							}
							this.thumb.show();
							this.syncThumb()
						}
					},
					syncThumb : function() {
						if (this.rendered) {
							this.moveThumb(this.translateValue(this.value))
						}
					},
					getValue : function() {
						return this.value
					}
				});
Ext.reg("slider", Ext.Slider);
Ext.Slider.Vertical = {
	onResize : function(a, b) {
		this.innerEl.setHeight(b
				- (this.el.getPadding("t") + this.endEl.getPadding("b")));
		this.syncThumb()
	},
	getRatio : function() {
		var b = this.innerEl.getHeight();
		var a = this.maxValue - this.minValue;
		return b / a
	},
	moveThumb : function(b, a) {
		if (!a || this.animate === false) {
			this.thumb.setBottom(b)
		} else {
			this.thumb.shift( {
				bottom : b,
				stopFx : true,
				duration : 0.35
			})
		}
	},
	onDrag : function(b) {
		var c = this.innerEl.translatePoints(this.tracker.getXY());
		var a = this.innerEl.getHeight() - c.top;
		this.setValue(this.minValue
				+ Ext.util.Format.round(a / this.getRatio(),
						this.decimalPrecision), false);
		this.fireEvent("drag", this, b)
	},
	onClickChange : function(b) {
		if (b.left > this.clickRange[0] && b.left < this.clickRange[1]) {
			var a = this.innerEl.getHeight() - b.top;
			this.setValue(this.minValue
					+ Ext.util.Format.round(a / this.getRatio(),
							this.decimalPrecision), undefined, true)
		}
	}
};
Ext.ProgressBar = Ext.extend(Ext.BoxComponent, {
	baseCls : "x-progress",
	animate : false,
	waitTimer : null,
	initComponent : function() {
		Ext.ProgressBar.superclass.initComponent.call(this);
		this.addEvents("update")
	},
	onRender : function(d, a) {
		var c = new Ext.Template('<div class="{cls}-wrap">',
				'<div class="{cls}-inner">', '<div class="{cls}-bar">',
				'<div class="{cls}-text">', "<div>&#160;</div>", "</div>",
				"</div>", '<div class="{cls}-text {cls}-text-back">',
				"<div>&#160;</div>", "</div>", "</div>", "</div>");
		this.el = a ? c.insertBefore(a, {
			cls : this.baseCls
		}, true) : c.append(d, {
			cls : this.baseCls
		}, true);
		if (this.id) {
			this.el.dom.id = this.id
		}
		var b = this.el.dom.firstChild;
		this.progressBar = Ext.get(b.firstChild);
		if (this.textEl) {
			this.textEl = Ext.get(this.textEl);
			delete this.textTopEl
		} else {
			this.textTopEl = Ext.get(this.progressBar.dom.firstChild);
			var e = Ext.get(b.childNodes[1]);
			this.textTopEl.setStyle("z-index", 99).addClass("x-hidden");
			this.textEl = new Ext.CompositeElement( [
					this.textTopEl.dom.firstChild, e.dom.firstChild ]);
			this.textEl.setWidth(b.offsetWidth)
		}
		this.progressBar.setHeight(b.offsetHeight)
	},
	afterRender : function() {
		Ext.ProgressBar.superclass.afterRender.call(this);
		if (this.value) {
			this.updateProgress(this.value, this.text)
		} else {
			this.updateText(this.text)
		}
	},
	updateProgress : function(c, d, b) {
		this.value = c || 0;
		if (d) {
			this.updateText(d)
		}
		if (this.rendered) {
			var a = Math.floor(c * this.el.dom.firstChild.offsetWidth);
			this.progressBar.setWidth(a, b === true
					|| (b !== false && this.animate));
			if (this.textTopEl) {
				this.textTopEl.removeClass("x-hidden").setWidth(a)
			}
		}
		this.fireEvent("update", this, c, d);
		return this
	},
	wait : function(b) {
		if (!this.waitTimer) {
			var a = this;
			b = b || {};
			this.updateText(b.text);
			this.waitTimer = Ext.TaskMgr.start( {
				run : function(c) {
					var d = b.increment || 10;
					this.updateProgress(
							((((c + d) % d) + 1) * (100 / d)) * 0.01, null,
							b.animate)
				},
				interval : b.interval || 1000,
				duration : b.duration,
				onStop : function() {
					if (b.fn) {
						b.fn.apply(b.scope || this)
					}
					this.reset()
				},
				scope : a
			})
		}
		return this
	},
	isWaiting : function() {
		return this.waitTimer !== null
	},
	updateText : function(a) {
		this.text = a || "&#160;";
		if (this.rendered) {
			this.textEl.update(this.text)
		}
		return this
	},
	syncProgressBar : function() {
		if (this.value) {
			this.updateProgress(this.value, this.text)
		}
		return this
	},
	setSize : function(a, c) {
		Ext.ProgressBar.superclass.setSize.call(this, a, c);
		if (this.textTopEl) {
			var b = this.el.dom.firstChild;
			this.textEl.setSize(b.offsetWidth, b.offsetHeight)
		}
		this.syncProgressBar();
		return this
	},
	reset : function(a) {
		this.updateProgress(0);
		if (this.textTopEl) {
			this.textTopEl.addClass("x-hidden")
		}
		if (this.waitTimer) {
			this.waitTimer.onStop = null;
			Ext.TaskMgr.stop(this.waitTimer);
			this.waitTimer = null
		}
		if (a === true) {
			this.hide()
		}
		return this
	}
});
Ext.reg("progress", Ext.ProgressBar);
( function() {
	var a = Ext.EventManager;
	var b = Ext.lib.Dom;
	Ext.dd.DragDrop = function(e, c, d) {
		if (e) {
			this.init(e, c, d)
		}
	};
	Ext.dd.DragDrop.prototype = {
		id : null,
		config : null,
		dragElId : null,
		handleElId : null,
		invalidHandleTypes : null,
		invalidHandleIds : null,
		invalidHandleClasses : null,
		startPageX : 0,
		startPageY : 0,
		groups : null,
		locked : false,
		lock : function() {
			this.locked = true
		},
		moveOnly : false,
		unlock : function() {
			this.locked = false
		},
		isTarget : true,
		padding : null,
		_domRef : null,
		__ygDragDrop : true,
		constrainX : false,
		constrainY : false,
		minX : 0,
		maxX : 0,
		minY : 0,
		maxY : 0,
		maintainOffset : false,
		xTicks : null,
		yTicks : null,
		primaryButtonOnly : true,
		available : false,
		hasOuterHandles : false,
		b4StartDrag : function(c, d) {
		},
		startDrag : function(c, d) {
		},
		b4Drag : function(c) {
		},
		onDrag : function(c) {
		},
		onDragEnter : function(c, d) {
		},
		b4DragOver : function(c) {
		},
		onDragOver : function(c, d) {
		},
		b4DragOut : function(c) {
		},
		onDragOut : function(c, d) {
		},
		b4DragDrop : function(c) {
		},
		onDragDrop : function(c, d) {
		},
		onInvalidDrop : function(c) {
		},
		b4EndDrag : function(c) {
		},
		endDrag : function(c) {
		},
		b4MouseDown : function(c) {
		},
		onMouseDown : function(c) {
		},
		onMouseUp : function(c) {
		},
		onAvailable : function() {
		},
		defaultPadding : {
			left : 0,
			right : 0,
			top : 0,
			bottom : 0
		},
		constrainTo : function(j, h, o) {
			if (typeof h == "number") {
				h = {
					left : h,
					right : h,
					top : h,
					bottom : h
				}
			}
			h = h || this.defaultPadding;
			var l = Ext.get(this.getEl()).getBox();
			var d = Ext.get(j);
			var n = d.getScroll();
			var k, e = d.dom;
			if (e == document.body) {
				k = {
					x : n.left,
					y : n.top,
					width : Ext.lib.Dom.getViewWidth(),
					height : Ext.lib.Dom.getViewHeight()
				}
			} else {
				var m = d.getXY();
				k = {
					x : m[0] + n.left,
					y : m[1] + n.top,
					width : e.clientWidth,
					height : e.clientHeight
				}
			}
			var i = l.y - k.y;
			var g = l.x - k.x;
			this.resetConstraints();
			this.setXConstraint(g - (h.left || 0), k.width - g - l.width
					- (h.right || 0), this.xTickSize);
			this.setYConstraint(i - (h.top || 0), k.height - i - l.height
					- (h.bottom || 0), this.yTickSize)
		},
		getEl : function() {
			if (!this._domRef) {
				this._domRef = Ext.getDom(this.id)
			}
			return this._domRef
		},
		getDragEl : function() {
			return Ext.getDom(this.dragElId)
		},
		init : function(e, c, d) {
			this.initTarget(e, c, d);
			a.on(this.id, "mousedown", this.handleMouseDown, this)
		},
		initTarget : function(e, c, d) {
			this.config = d || {};
			this.DDM = Ext.dd.DDM;
			this.groups = {};
			if (typeof e !== "string") {
				e = Ext.id(e)
			}
			this.id = e;
			this.addToGroup((c) ? c : "default");
			this.handleElId = e;
			this.setDragElId(e);
			this.invalidHandleTypes = {
				A : "A"
			};
			this.invalidHandleIds = {};
			this.invalidHandleClasses = [];
			this.applyConfig();
			this.handleOnAvailable()
		},
		applyConfig : function() {
			this.padding = this.config.padding || [ 0, 0, 0, 0 ];
			this.isTarget = (this.config.isTarget !== false);
			this.maintainOffset = (this.config.maintainOffset);
			this.primaryButtonOnly = (this.config.primaryButtonOnly !== false)
		},
		handleOnAvailable : function() {
			this.available = true;
			this.resetConstraints();
			this.onAvailable()
		},
		setPadding : function(e, c, g, d) {
			if (!c && 0 !== c) {
				this.padding = [ e, e, e, e ]
			} else {
				if (!g && 0 !== g) {
					this.padding = [ e, c, e, c ]
				} else {
					this.padding = [ e, c, g, d ]
				}
			}
		},
		setInitPosition : function(g, e) {
			var h = this.getEl();
			if (!this.DDM.verifyEl(h)) {
				return
			}
			var d = g || 0;
			var c = e || 0;
			var i = b.getXY(h);
			this.initPageX = i[0] - d;
			this.initPageY = i[1] - c;
			this.lastPageX = i[0];
			this.lastPageY = i[1];
			this.setStartPosition(i)
		},
		setStartPosition : function(d) {
			var c = d || b.getXY(this.getEl());
			this.deltaSetXY = null;
			this.startPageX = c[0];
			this.startPageY = c[1]
		},
		addToGroup : function(c) {
			this.groups[c] = true;
			this.DDM.regDragDrop(this, c)
		},
		removeFromGroup : function(c) {
			if (this.groups[c]) {
				delete this.groups[c]
			}
			this.DDM.removeDDFromGroup(this, c)
		},
		setDragElId : function(c) {
			this.dragElId = c
		},
		setHandleElId : function(c) {
			if (typeof c !== "string") {
				c = Ext.id(c)
			}
			this.handleElId = c;
			this.DDM.regHandle(this.id, c)
		},
		setOuterHandleElId : function(c) {
			if (typeof c !== "string") {
				c = Ext.id(c)
			}
			a.on(c, "mousedown", this.handleMouseDown, this);
			this.setHandleElId(c);
			this.hasOuterHandles = true
		},
		unreg : function() {
			a.un(this.id, "mousedown", this.handleMouseDown);
			this._domRef = null;
			this.DDM._remove(this)
		},
		destroy : function() {
			this.unreg()
		},
		isLocked : function() {
			return (this.DDM.isLocked() || this.locked)
		},
		handleMouseDown : function(g, d) {
			if (this.primaryButtonOnly && g.button != 0) {
				return
			}
			if (this.isLocked()) {
				return
			}
			this.DDM.refreshCache(this.groups);
			var c = new Ext.lib.Point(Ext.lib.Event.getPageX(g), Ext.lib.Event
					.getPageY(g));
			if (!this.hasOuterHandles && !this.DDM.isOverTarget(c, this)) {
			} else {
				if (this.clickValidator(g)) {
					this.setStartPosition();
					this.b4MouseDown(g);
					this.onMouseDown(g);
					this.DDM.handleMouseDown(g, this);
					this.DDM.stopEvent(g)
				} else {
				}
			}
		},
		clickValidator : function(d) {
			var c = d.getTarget();
			return (this.isValidHandleChild(c) && (this.id == this.handleElId || this.DDM
					.handleWasClicked(c, this.id)))
		},
		addInvalidHandleType : function(c) {
			var d = c.toUpperCase();
			this.invalidHandleTypes[d] = d
		},
		addInvalidHandleId : function(c) {
			if (typeof c !== "string") {
				c = Ext.id(c)
			}
			this.invalidHandleIds[c] = c
		},
		addInvalidHandleClass : function(c) {
			this.invalidHandleClasses.push(c)
		},
		removeInvalidHandleType : function(c) {
			var d = c.toUpperCase();
			delete this.invalidHandleTypes[d]
		},
		removeInvalidHandleId : function(c) {
			if (typeof c !== "string") {
				c = Ext.id(c)
			}
			delete this.invalidHandleIds[c]
		},
		removeInvalidHandleClass : function(d) {
			for ( var e = 0, c = this.invalidHandleClasses.length; e < c; ++e) {
				if (this.invalidHandleClasses[e] == d) {
					delete this.invalidHandleClasses[e]
				}
			}
		},
		isValidHandleChild : function(h) {
			var g = true;
			var k;
			try {
				k = h.nodeName.toUpperCase()
			} catch (j) {
				k = h.nodeName
			}
			g = g && !this.invalidHandleTypes[k];
			g = g && !this.invalidHandleIds[h.id];
			for ( var d = 0, c = this.invalidHandleClasses.length; g && d < c; ++d) {
				g = !Ext.fly(h).hasClass(this.invalidHandleClasses[d])
			}
			return g
		},
		setXTicks : function(g, c) {
			this.xTicks = [];
			this.xTickSize = c;
			var e = {};
			for ( var d = this.initPageX; d >= this.minX; d = d - c) {
				if (!e[d]) {
					this.xTicks[this.xTicks.length] = d;
					e[d] = true
				}
			}
			for (d = this.initPageX; d <= this.maxX; d = d + c) {
				if (!e[d]) {
					this.xTicks[this.xTicks.length] = d;
					e[d] = true
				}
			}
			this.xTicks.sort(this.DDM.numericSort)
		},
		setYTicks : function(g, c) {
			this.yTicks = [];
			this.yTickSize = c;
			var e = {};
			for ( var d = this.initPageY; d >= this.minY; d = d - c) {
				if (!e[d]) {
					this.yTicks[this.yTicks.length] = d;
					e[d] = true
				}
			}
			for (d = this.initPageY; d <= this.maxY; d = d + c) {
				if (!e[d]) {
					this.yTicks[this.yTicks.length] = d;
					e[d] = true
				}
			}
			this.yTicks.sort(this.DDM.numericSort)
		},
		setXConstraint : function(e, d, c) {
			this.leftConstraint = e;
			this.rightConstraint = d;
			this.minX = this.initPageX - e;
			this.maxX = this.initPageX + d;
			if (c) {
				this.setXTicks(this.initPageX, c)
			}
			this.constrainX = true
		},
		clearConstraints : function() {
			this.constrainX = false;
			this.constrainY = false;
			this.clearTicks()
		},
		clearTicks : function() {
			this.xTicks = null;
			this.yTicks = null;
			this.xTickSize = 0;
			this.yTickSize = 0
		},
		setYConstraint : function(c, e, d) {
			this.topConstraint = c;
			this.bottomConstraint = e;
			this.minY = this.initPageY - c;
			this.maxY = this.initPageY + e;
			if (d) {
				this.setYTicks(this.initPageY, d)
			}
			this.constrainY = true
		},
		resetConstraints : function() {
			if (this.initPageX || this.initPageX === 0) {
				var d = (this.maintainOffset) ? this.lastPageX - this.initPageX
						: 0;
				var c = (this.maintainOffset) ? this.lastPageY - this.initPageY
						: 0;
				this.setInitPosition(d, c)
			} else {
				this.setInitPosition()
			}
			if (this.constrainX) {
				this.setXConstraint(this.leftConstraint, this.rightConstraint,
						this.xTickSize)
			}
			if (this.constrainY) {
				this.setYConstraint(this.topConstraint, this.bottomConstraint,
						this.yTickSize)
			}
		},
		getTick : function(k, g) {
			if (!g) {
				return k
			} else {
				if (g[0] >= k) {
					return g[0]
				} else {
					for ( var d = 0, c = g.length; d < c; ++d) {
						var e = d + 1;
						if (g[e] && g[e] >= k) {
							var j = k - g[d];
							var h = g[e] - k;
							return (h > j) ? g[d] : g[e]
						}
					}
					return g[g.length - 1]
				}
			}
		},
		toString : function() {
			return ("DragDrop " + this.id)
		}
	}
})();
if (!Ext.dd.DragDropMgr) {
	Ext.dd.DragDropMgr = function() {
		var a = Ext.EventManager;
		return {
			ids : {},
			handleIds : {},
			dragCurrent : null,
			dragOvers : {},
			deltaX : 0,
			deltaY : 0,
			preventDefault : true,
			stopPropagation : true,
			initialized : false,
			locked : false,
			init : function() {
				this.initialized = true
			},
			POINT : 0,
			INTERSECT : 1,
			mode : 0,
			_execOnAll : function(d, c) {
				for ( var e in this.ids) {
					for ( var b in this.ids[e]) {
						var g = this.ids[e][b];
						if (!this.isTypeOfDD(g)) {
							continue
						}
						g[d].apply(g, c)
					}
				}
			},
			_onLoad : function() {
				this.init();
				a.on(document, "mouseup", this.handleMouseUp, this, true);
				a.on(document, "mousemove", this.handleMouseMove, this, true);
				a.on(window, "unload", this._onUnload, this, true);
				a.on(window, "resize", this._onResize, this, true)
			},
			_onResize : function(b) {
				this._execOnAll("resetConstraints", [])
			},
			lock : function() {
				this.locked = true
			},
			unlock : function() {
				this.locked = false
			},
			isLocked : function() {
				return this.locked
			},
			locationCache : {},
			useCache : true,
			clickPixelThresh : 3,
			clickTimeThresh : 350,
			dragThreshMet : false,
			clickTimeout : null,
			startX : 0,
			startY : 0,
			regDragDrop : function(c, b) {
				if (!this.initialized) {
					this.init()
				}
				if (!this.ids[b]) {
					this.ids[b] = {}
				}
				this.ids[b][c.id] = c
			},
			removeDDFromGroup : function(d, b) {
				if (!this.ids[b]) {
					this.ids[b] = {}
				}
				var c = this.ids[b];
				if (c && c[d.id]) {
					delete c[d.id]
				}
			},
			_remove : function(c) {
				for ( var b in c.groups) {
					if (b && this.ids[b] && this.ids[b][c.id]) {
						delete this.ids[b][c.id]
					}
				}
				delete this.handleIds[c.id]
			},
			regHandle : function(c, b) {
				if (!this.handleIds[c]) {
					this.handleIds[c] = {}
				}
				this.handleIds[c][b] = b
			},
			isDragDrop : function(b) {
				return (this.getDDById(b)) ? true : false
			},
			getRelated : function(h, c) {
				var g = [];
				for ( var e in h.groups) {
					for ( var d in this.ids[e]) {
						var b = this.ids[e][d];
						if (!this.isTypeOfDD(b)) {
							continue
						}
						if (!c || b.isTarget) {
							g[g.length] = b
						}
					}
				}
				return g
			},
			isLegalTarget : function(g, e) {
				var c = this.getRelated(g, true);
				for ( var d = 0, b = c.length; d < b; ++d) {
					if (c[d].id == e.id) {
						return true
					}
				}
				return false
			},
			isTypeOfDD : function(b) {
				return (b && b.__ygDragDrop)
			},
			isHandle : function(c, b) {
				return (this.handleIds[c] && this.handleIds[c][b])
			},
			getDDById : function(c) {
				for ( var b in this.ids) {
					if (this.ids[b][c]) {
						return this.ids[b][c]
					}
				}
				return null
			},
			handleMouseDown : function(d, c) {
				if (Ext.QuickTips) {
					Ext.QuickTips.disable()
				}
				if (this.dragCurrent) {
					this.handleMouseUp(d)
				}
				this.currentTarget = d.getTarget();
				this.dragCurrent = c;
				var b = c.getEl();
				this.startX = d.getPageX();
				this.startY = d.getPageY();
				this.deltaX = this.startX - b.offsetLeft;
				this.deltaY = this.startY - b.offsetTop;
				this.dragThreshMet = false;
				this.clickTimeout = setTimeout( function() {
					var e = Ext.dd.DDM;
					e.startDrag(e.startX, e.startY)
				}, this.clickTimeThresh)
			},
			startDrag : function(b, c) {
				clearTimeout(this.clickTimeout);
				if (this.dragCurrent) {
					this.dragCurrent.b4StartDrag(b, c);
					this.dragCurrent.startDrag(b, c)
				}
				this.dragThreshMet = true
			},
			handleMouseUp : function(b) {
				if (Ext.QuickTips) {
					Ext.QuickTips.enable()
				}
				if (!this.dragCurrent) {
					return
				}
				clearTimeout(this.clickTimeout);
				if (this.dragThreshMet) {
					this.fireEvents(b, true)
				} else {
				}
				this.stopDrag(b);
				this.stopEvent(b)
			},
			stopEvent : function(b) {
				if (this.stopPropagation) {
					b.stopPropagation()
				}
				if (this.preventDefault) {
					b.preventDefault()
				}
			},
			stopDrag : function(b) {
				if (this.dragCurrent) {
					if (this.dragThreshMet) {
						this.dragCurrent.b4EndDrag(b);
						this.dragCurrent.endDrag(b)
					}
					this.dragCurrent.onMouseUp(b)
				}
				this.dragCurrent = null;
				this.dragOvers = {}
			},
			handleMouseMove : function(d) {
				if (!this.dragCurrent) {
					return true
				}
				if (Ext.isIE
						&& (d.button !== 0 && d.button !== 1 && d.button !== 2)) {
					this.stopEvent(d);
					return this.handleMouseUp(d)
				}
				if (!this.dragThreshMet) {
					var c = Math.abs(this.startX - d.getPageX());
					var b = Math.abs(this.startY - d.getPageY());
					if (c > this.clickPixelThresh || b > this.clickPixelThresh) {
						this.startDrag(this.startX, this.startY)
					}
				}
				if (this.dragThreshMet) {
					this.dragCurrent.b4Drag(d);
					this.dragCurrent.onDrag(d);
					if (!this.dragCurrent.moveOnly) {
						this.fireEvents(d, false)
					}
				}
				this.stopEvent(d);
				return true
			},
			fireEvents : function(n, o) {
				var q = this.dragCurrent;
				if (!q || q.isLocked()) {
					return
				}
				var r = n.getPoint();
				var b = [];
				var g = [];
				var l = [];
				var j = [];
				var d = [];
				for ( var h in this.dragOvers) {
					var c = this.dragOvers[h];
					if (!this.isTypeOfDD(c)) {
						continue
					}
					if (!this.isOverTarget(r, c, this.mode)) {
						g.push(c)
					}
					b[h] = true;
					delete this.dragOvers[h]
				}
				for ( var p in q.groups) {
					if ("string" != typeof p) {
						continue
					}
					for (h in this.ids[p]) {
						var k = this.ids[p][h];
						if (!this.isTypeOfDD(k)) {
							continue
						}
						if (k.isTarget && !k.isLocked()
								&& ((k != q) || (q.ignoreSelf === false))) {
							if (this.isOverTarget(r, k, this.mode)) {
								if (o) {
									j.push(k)
								} else {
									if (!b[k.id]) {
										d.push(k)
									} else {
										l.push(k)
									}
									this.dragOvers[k.id] = k
								}
							}
						}
					}
				}
				if (this.mode) {
					if (g.length) {
						q.b4DragOut(n, g);
						q.onDragOut(n, g)
					}
					if (d.length) {
						q.onDragEnter(n, d)
					}
					if (l.length) {
						q.b4DragOver(n, l);
						q.onDragOver(n, l)
					}
					if (j.length) {
						q.b4DragDrop(n, j);
						q.onDragDrop(n, j)
					}
				} else {
					var m = 0;
					for (h = 0, m = g.length; h < m; ++h) {
						q.b4DragOut(n, g[h].id);
						q.onDragOut(n, g[h].id)
					}
					for (h = 0, m = d.length; h < m; ++h) {
						q.onDragEnter(n, d[h].id)
					}
					for (h = 0, m = l.length; h < m; ++h) {
						q.b4DragOver(n, l[h].id);
						q.onDragOver(n, l[h].id)
					}
					for (h = 0, m = j.length; h < m; ++h) {
						q.b4DragDrop(n, j[h].id);
						q.onDragDrop(n, j[h].id)
					}
				}
				if (o && !j.length) {
					q.onInvalidDrop(n)
				}
			},
			getBestMatch : function(d) {
				var g = null;
				var c = d.length;
				if (c == 1) {
					g = d[0]
				} else {
					for ( var e = 0; e < c; ++e) {
						var b = d[e];
						if (b.cursorIsOver) {
							g = b;
							break
						} else {
							if (!g || g.overlap.getArea() < b.overlap.getArea()) {
								g = b
							}
						}
					}
				}
				return g
			},
			refreshCache : function(c) {
				for ( var b in c) {
					if ("string" != typeof b) {
						continue
					}
					for ( var d in this.ids[b]) {
						var e = this.ids[b][d];
						if (this.isTypeOfDD(e)) {
							var g = this.getLocation(e);
							if (g) {
								this.locationCache[e.id] = g
							} else {
								delete this.locationCache[e.id]
							}
						}
					}
				}
			},
			verifyEl : function(c) {
				if (c) {
					var b;
					if (Ext.isIE) {
						try {
							b = c.offsetParent
						} catch (d) {
						}
					} else {
						b = c.offsetParent
					}
					if (b) {
						return true
					}
				}
				return false
			},
			getLocation : function(j) {
				if (!this.isTypeOfDD(j)) {
					return null
				}
				var h = j.getEl(), n, g, d, p, o, q, c, m, i;
				try {
					n = Ext.lib.Dom.getXY(h)
				} catch (k) {
				}
				if (!n) {
					return null
				}
				g = n[0];
				d = g + h.offsetWidth;
				p = n[1];
				o = p + h.offsetHeight;
				q = p - j.padding[0];
				c = d + j.padding[1];
				m = o + j.padding[2];
				i = g - j.padding[3];
				return new Ext.lib.Region(q, c, m, i)
			},
			isOverTarget : function(k, b, d) {
				var g = this.locationCache[b.id];
				if (!g || !this.useCache) {
					g = this.getLocation(b);
					this.locationCache[b.id] = g
				}
				if (!g) {
					return false
				}
				b.cursorIsOver = g.contains(k);
				var j = this.dragCurrent;
				if (!j || !j.getTargetCoord
						|| (!d && !j.constrainX && !j.constrainY)) {
					return b.cursorIsOver
				}
				b.overlap = null;
				var h = j.getTargetCoord(k.x, k.y);
				var c = j.getDragEl();
				var e = new Ext.lib.Region(h.y, h.x + c.offsetWidth, h.y
						+ c.offsetHeight, h.x);
				var i = e.intersect(g);
				if (i) {
					b.overlap = i;
					return (d) ? true : b.cursorIsOver
				} else {
					return false
				}
			},
			_onUnload : function(c, b) {
				Ext.dd.DragDropMgr.unregAll()
			},
			unregAll : function() {
				if (this.dragCurrent) {
					this.stopDrag();
					this.dragCurrent = null
				}
				this._execOnAll("unreg", []);
				for ( var b in this.elementCache) {
					delete this.elementCache[b]
				}
				this.elementCache = {};
				this.ids = {}
			},
			elementCache : {},
			getElWrapper : function(c) {
				var b = this.elementCache[c];
				if (!b || !b.el) {
					b = this.elementCache[c] = new this.ElementWrapper(Ext
							.getDom(c))
				}
				return b
			},
			getElement : function(b) {
				return Ext.getDom(b)
			},
			getCss : function(c) {
				var b = Ext.getDom(c);
				return (b) ? b.style : null
			},
			ElementWrapper : function(b) {
				this.el = b || null;
				this.id = this.el && b.id;
				this.css = this.el && b.style
			},
			getPosX : function(b) {
				return Ext.lib.Dom.getX(b)
			},
			getPosY : function(b) {
				return Ext.lib.Dom.getY(b)
			},
			swapNode : function(d, b) {
				if (d.swapNode) {
					d.swapNode(b)
				} else {
					var e = b.parentNode;
					var c = b.nextSibling;
					if (c == d) {
						e.insertBefore(d, b)
					} else {
						if (b == d.nextSibling) {
							e.insertBefore(b, d)
						} else {
							d.parentNode.replaceChild(b, d);
							e.insertBefore(d, c)
						}
					}
				}
			},
			getScroll : function() {
				var d, b, e = document.documentElement, c = document.body;
				if (e && (e.scrollTop || e.scrollLeft)) {
					d = e.scrollTop;
					b = e.scrollLeft
				} else {
					if (c) {
						d = c.scrollTop;
						b = c.scrollLeft
					} else {
					}
				}
				return {
					top : d,
					left : b
				}
			},
			getStyle : function(c, b) {
				return Ext.fly(c).getStyle(b)
			},
			getScrollTop : function() {
				return this.getScroll().top
			},
			getScrollLeft : function() {
				return this.getScroll().left
			},
			moveToEl : function(b, d) {
				var c = Ext.lib.Dom.getXY(d);
				Ext.lib.Dom.setXY(b, c)
			},
			numericSort : function(d, c) {
				return (d - c)
			},
			_timeoutCount : 0,
			_addListeners : function() {
				var b = Ext.dd.DDM;
				if (Ext.lib.Event && document) {
					b._onLoad()
				} else {
					if (b._timeoutCount > 2000) {
					} else {
						setTimeout(b._addListeners, 10);
						if (document && document.body) {
							b._timeoutCount += 1
						}
					}
				}
			},
			handleWasClicked : function(b, d) {
				if (this.isHandle(d, b.id)) {
					return true
				} else {
					var c = b.parentNode;
					while (c) {
						if (this.isHandle(d, c.id)) {
							return true
						} else {
							c = c.parentNode
						}
					}
				}
				return false
			}
		}
	}();
	Ext.dd.DDM = Ext.dd.DragDropMgr;
	Ext.dd.DDM._addListeners()
}
Ext.dd.DD = function(c, a, b) {
	if (c) {
		this.init(c, a, b)
	}
};
Ext.extend(Ext.dd.DD, Ext.dd.DragDrop, {
	scroll : true,
	autoOffset : function(c, b) {
		var a = c - this.startPageX;
		var d = b - this.startPageY;
		this.setDelta(a, d)
	},
	setDelta : function(b, a) {
		this.deltaX = b;
		this.deltaY = a
	},
	setDragElPos : function(c, b) {
		var a = this.getDragEl();
		this.alignElWithMouse(a, c, b)
	},
	alignElWithMouse : function(c, h, g) {
		var e = this.getTargetCoord(h, g);
		var b = c.dom ? c : Ext.fly(c, "_dd");
		if (!this.deltaSetXY) {
			var i = [ e.x, e.y ];
			b.setXY(i);
			var d = b.getLeft(true);
			var a = b.getTop(true);
			this.deltaSetXY = [ d - e.x, a - e.y ]
		} else {
			b.setLeftTop(e.x + this.deltaSetXY[0], e.y + this.deltaSetXY[1])
		}
		this.cachePosition(e.x, e.y);
		this.autoScroll(e.x, e.y, c.offsetHeight, c.offsetWidth);
		return e
	},
	cachePosition : function(b, a) {
		if (b) {
			this.lastPageX = b;
			this.lastPageY = a
		} else {
			var c = Ext.lib.Dom.getXY(this.getEl());
			this.lastPageX = c[0];
			this.lastPageY = c[1]
		}
	},
	autoScroll : function(l, k, e, m) {
		if (this.scroll) {
			var n = Ext.lib.Dom.getViewHeight();
			var b = Ext.lib.Dom.getViewWidth();
			var p = this.DDM.getScrollTop();
			var d = this.DDM.getScrollLeft();
			var j = e + k;
			var o = m + l;
			var i = (n + p - k - this.deltaY);
			var g = (b + d - l - this.deltaX);
			var c = 40;
			var a = (document.all) ? 80 : 30;
			if (j > n && i < c) {
				window.scrollTo(d, p + a)
			}
			if (k < p && p > 0 && k - p < c) {
				window.scrollTo(d, p - a)
			}
			if (o > b && g < c) {
				window.scrollTo(d + a, p)
			}
			if (l < d && d > 0 && l - d < c) {
				window.scrollTo(d - a, p)
			}
		}
	},
	getTargetCoord : function(c, b) {
		var a = c - this.deltaX;
		var d = b - this.deltaY;
		if (this.constrainX) {
			if (a < this.minX) {
				a = this.minX
			}
			if (a > this.maxX) {
				a = this.maxX
			}
		}
		if (this.constrainY) {
			if (d < this.minY) {
				d = this.minY
			}
			if (d > this.maxY) {
				d = this.maxY
			}
		}
		a = this.getTick(a, this.xTicks);
		d = this.getTick(d, this.yTicks);
		return {
			x : a,
			y : d
		}
	},
	applyConfig : function() {
		Ext.dd.DD.superclass.applyConfig.call(this);
		this.scroll = (this.config.scroll !== false)
	},
	b4MouseDown : function(a) {
		this.autoOffset(a.getPageX(), a.getPageY())
	},
	b4Drag : function(a) {
		this.setDragElPos(a.getPageX(), a.getPageY())
	},
	toString : function() {
		return ("DD " + this.id)
	}
});
Ext.dd.DDProxy = function(c, a, b) {
	if (c) {
		this.init(c, a, b);
		this.initFrame()
	}
};
Ext.dd.DDProxy.dragElId = "ygddfdiv";
Ext.extend(Ext.dd.DDProxy, Ext.dd.DD, {
	resizeFrame : true,
	centerFrame : false,
	createFrame : function() {
		var b = this;
		var a = document.body;
		if (!a || !a.firstChild) {
			setTimeout( function() {
				b.createFrame()
			}, 50);
			return
		}
		var d = this.getDragEl();
		if (!d) {
			d = document.createElement("div");
			d.id = this.dragElId;
			var c = d.style;
			c.position = "absolute";
			c.visibility = "hidden";
			c.cursor = "move";
			c.border = "2px solid #aaa";
			c.zIndex = 999;
			a.insertBefore(d, a.firstChild)
		}
	},
	initFrame : function() {
		this.createFrame()
	},
	applyConfig : function() {
		Ext.dd.DDProxy.superclass.applyConfig.call(this);
		this.resizeFrame = (this.config.resizeFrame !== false);
		this.centerFrame = (this.config.centerFrame);
		this.setDragElId(this.config.dragElId || Ext.dd.DDProxy.dragElId)
	},
	showFrame : function(e, d) {
		var c = this.getEl();
		var a = this.getDragEl();
		var b = a.style;
		this._resizeProxy();
		if (this.centerFrame) {
			this.setDelta(Math.round(parseInt(b.width, 10) / 2), Math
					.round(parseInt(b.height, 10) / 2))
		}
		this.setDragElPos(e, d);
		Ext.fly(a).show()
	},
	_resizeProxy : function() {
		if (this.resizeFrame) {
			var a = this.getEl();
			Ext.fly(this.getDragEl()).setSize(a.offsetWidth, a.offsetHeight)
		}
	},
	b4MouseDown : function(b) {
		var a = b.getPageX();
		var c = b.getPageY();
		this.autoOffset(a, c);
		this.setDragElPos(a, c)
	},
	b4StartDrag : function(a, b) {
		this.showFrame(a, b)
	},
	b4EndDrag : function(a) {
		Ext.fly(this.getDragEl()).hide()
	},
	endDrag : function(c) {
		var b = this.getEl();
		var a = this.getDragEl();
		a.style.visibility = "";
		this.beforeMove();
		b.style.visibility = "hidden";
		Ext.dd.DDM.moveToEl(b, a);
		a.style.visibility = "hidden";
		b.style.visibility = "";
		this.afterDrag()
	},
	beforeMove : function() {
	},
	afterDrag : function() {
	},
	toString : function() {
		return ("DDProxy " + this.id)
	}
});
Ext.dd.DDTarget = function(c, a, b) {
	if (c) {
		this.initTarget(c, a, b)
	}
};
Ext.extend(Ext.dd.DDTarget, Ext.dd.DragDrop, {
	toString : function() {
		return ("DDTarget " + this.id)
	}
});
Ext.dd.DragTracker = function(a) {
	Ext.apply(this, a);
	this.addEvents("mousedown", "mouseup", "mousemove", "dragstart", "dragend",
			"drag");
	this.dragRegion = new Ext.lib.Region(0, 0, 0, 0);
	if (this.el) {
		this.initEl(this.el)
	}
};
Ext.extend(Ext.dd.DragTracker, Ext.util.Observable, {
	active : false,
	tolerance : 5,
	autoStart : false,
	initEl : function(a) {
		this.el = Ext.get(a);
		a.on("mousedown", this.onMouseDown, this, this.delegate ? {
			delegate : this.delegate
		} : undefined)
	},
	destroy : function() {
		this.el.un("mousedown", this.onMouseDown, this)
	},
	onMouseDown : function(c, b) {
		if (this.fireEvent("mousedown", this, c) !== false
				&& this.onBeforeStart(c) !== false) {
			this.startXY = this.lastXY = c.getXY();
			this.dragTarget = this.delegate ? b : this.el.dom;
			if (this.preventDefault !== false) {
				c.preventDefault()
			}
			var a = Ext.getDoc();
			a.on("mouseup", this.onMouseUp, this);
			a.on("mousemove", this.onMouseMove, this);
			a.on("selectstart", this.stopSelect, this);
			if (this.autoStart) {
				this.timer = this.triggerStart.defer(
						this.autoStart === true ? 1000 : this.autoStart, this)
			}
		}
	},
	onMouseMove : function(d, c) {
		if (this.active && Ext.isIE && !d.browserEvent.button) {
			d.preventDefault();
			this.onMouseUp(d);
			return
		}
		d.preventDefault();
		var b = d.getXY(), a = this.startXY;
		this.lastXY = b;
		if (!this.active) {
			if (Math.abs(a[0] - b[0]) > this.tolerance
					|| Math.abs(a[1] - b[1]) > this.tolerance) {
				this.triggerStart()
			} else {
				return
			}
		}
		this.fireEvent("mousemove", this, d);
		this.onDrag(d);
		this.fireEvent("drag", this, d)
	},
	onMouseUp : function(c) {
		var b = Ext.getDoc();
		b.un("mousemove", this.onMouseMove, this);
		b.un("mouseup", this.onMouseUp, this);
		b.un("selectstart", this.stopSelect, this);
		c.preventDefault();
		this.clearStart();
		var a = this.active;
		this.active = false;
		delete this.elRegion;
		this.fireEvent("mouseup", this, c);
		if (a) {
			this.onEnd(c);
			this.fireEvent("dragend", this, c)
		}
	},
	triggerStart : function(a) {
		this.clearStart();
		this.active = true;
		this.onStart(this.startXY);
		this.fireEvent("dragstart", this, this.startXY)
	},
	clearStart : function() {
		if (this.timer) {
			clearTimeout(this.timer);
			delete this.timer
		}
	},
	stopSelect : function(a) {
		a.stopEvent();
		return false
	},
	onBeforeStart : function(a) {
	},
	onStart : function(a) {
	},
	onDrag : function(a) {
	},
	onEnd : function(a) {
	},
	getDragTarget : function() {
		return this.dragTarget
	},
	getDragCt : function() {
		return this.el
	},
	getXY : function(a) {
		return a ? this.constrainModes[a].call(this, this.lastXY) : this.lastXY
	},
	getOffset : function(c) {
		var b = this.getXY(c);
		var a = this.startXY;
		return [ a[0] - b[0], a[1] - b[1] ]
	},
	constrainModes : {
		point : function(b) {
			if (!this.elRegion) {
				this.elRegion = this.getDragCt().getRegion()
			}
			var a = this.dragRegion;
			a.left = b[0];
			a.top = b[1];
			a.right = b[0];
			a.bottom = b[1];
			a.constrainTo(this.elRegion);
			return [ a.left, a.top ]
		}
	}
});
Ext.dd.ScrollManager = function() {
	var c = Ext.dd.DragDropMgr;
	var e = {};
	var b = null;
	var i = {};
	var h = function(l) {
		b = null;
		a()
	};
	var j = function() {
		if (c.dragCurrent) {
			c.refreshCache(c.dragCurrent.groups)
		}
	};
	var d = function() {
		if (c.dragCurrent) {
			var l = Ext.dd.ScrollManager;
			var m = i.el.ddScrollConfig ? i.el.ddScrollConfig.increment
					: l.increment;
			if (!l.animate) {
				if (i.el.scroll(i.dir, m)) {
					j()
				}
			} else {
				i.el.scroll(i.dir, m, true, l.animDuration, j)
			}
		}
	};
	var a = function() {
		if (i.id) {
			clearInterval(i.id)
		}
		i.id = 0;
		i.el = null;
		i.dir = ""
	};
	var g = function(m, l) {
		a();
		i.el = m;
		i.dir = l;
		var n = (m.ddScrollConfig && m.ddScrollConfig.frequency) ? m.ddScrollConfig.frequency
				: Ext.dd.ScrollManager.frequency;
		i.id = setInterval(d, n)
	};
	var k = function(o, q) {
		if (q || !c.dragCurrent) {
			return
		}
		var s = Ext.dd.ScrollManager;
		if (!b || b != c.dragCurrent) {
			b = c.dragCurrent;
			s.refreshCache()
		}
		var t = Ext.lib.Event.getXY(o);
		var u = new Ext.lib.Point(t[0], t[1]);
		for ( var m in e) {
			var n = e[m], l = n._region;
			var p = n.ddScrollConfig ? n.ddScrollConfig : s;
			if (l && l.contains(u) && n.isScrollable()) {
				if (l.bottom - u.y <= p.vthresh) {
					if (i.el != n) {
						g(n, "down")
					}
					return
				} else {
					if (l.right - u.x <= p.hthresh) {
						if (i.el != n) {
							g(n, "left")
						}
						return
					} else {
						if (u.y - l.top <= p.vthresh) {
							if (i.el != n) {
								g(n, "up")
							}
							return
						} else {
							if (u.x - l.left <= p.hthresh) {
								if (i.el != n) {
									g(n, "right")
								}
								return
							}
						}
					}
				}
			}
		}
		a()
	};
	c.fireEvents = c.fireEvents.createSequence(k, c);
	c.stopDrag = c.stopDrag.createSequence(h, c);
	return {
		register : function(n) {
			if (Ext.isArray(n)) {
				for ( var m = 0, l = n.length; m < l; m++) {
					this.register(n[m])
				}
			} else {
				n = Ext.get(n);
				e[n.id] = n
			}
		},
		unregister : function(n) {
			if (Ext.isArray(n)) {
				for ( var m = 0, l = n.length; m < l; m++) {
					this.unregister(n[m])
				}
			} else {
				n = Ext.get(n);
				delete e[n.id]
			}
		},
		vthresh : 25,
		hthresh : 25,
		increment : 100,
		frequency : 500,
		animate : true,
		animDuration : 0.4,
		refreshCache : function() {
			for ( var l in e) {
				if (typeof e[l] == "object") {
					e[l]._region = e[l].getRegion()
				}
			}
		}
	}
}();
Ext.dd.Registry = function() {
	var d = {};
	var b = {};
	var a = 0;
	var c = function(g, e) {
		if (typeof g == "string") {
			return g
		}
		var h = g.id;
		if (!h && e !== false) {
			h = "extdd-" + (++a);
			g.id = h
		}
		return h
	};
	return {
		register : function(j, k) {
			k = k || {};
			if (typeof j == "string") {
				j = document.getElementById(j)
			}
			k.ddel = j;
			d[c(j)] = k;
			if (k.isHandle !== false) {
				b[k.ddel.id] = k
			}
			if (k.handles) {
				var h = k.handles;
				for ( var g = 0, e = h.length; g < e; g++) {
					b[c(h[g])] = k
				}
			}
		},
		unregister : function(j) {
			var l = c(j, false);
			var k = d[l];
			if (k) {
				delete d[l];
				if (k.handles) {
					var h = k.handles;
					for ( var g = 0, e = h.length; g < e; g++) {
						delete b[c(h[g], false)]
					}
				}
			}
		},
		getHandle : function(e) {
			if (typeof e != "string") {
				e = e.id
			}
			return b[e]
		},
		getHandleFromEvent : function(h) {
			var g = Ext.lib.Event.getTarget(h);
			return g ? b[g.id] : null
		},
		getTarget : function(e) {
			if (typeof e != "string") {
				e = e.id
			}
			return d[e]
		},
		getTargetFromEvent : function(h) {
			var g = Ext.lib.Event.getTarget(h);
			return g ? d[g.id] || b[g.id] : null
		}
	}
}();
Ext.dd.StatusProxy = function(a) {
	Ext.apply(this, a);
	this.id = this.id || Ext.id();
	this.el = new Ext.Layer( {
		dh : {
			id : this.id,
			tag : "div",
			cls : "x-dd-drag-proxy " + this.dropNotAllowed,
			children : [ {
				tag : "div",
				cls : "x-dd-drop-icon"
			}, {
				tag : "div",
				cls : "x-dd-drag-ghost"
			} ]
		},
		shadow : !a || a.shadow !== false
	});
	this.ghost = Ext.get(this.el.dom.childNodes[1]);
	this.dropStatus = this.dropNotAllowed
};
Ext.dd.StatusProxy.prototype = {
	dropAllowed : "x-dd-drop-ok",
	dropNotAllowed : "x-dd-drop-nodrop",
	setStatus : function(a) {
		a = a || this.dropNotAllowed;
		if (this.dropStatus != a) {
			this.el.replaceClass(this.dropStatus, a);
			this.dropStatus = a
		}
	},
	reset : function(a) {
		this.el.dom.className = "x-dd-drag-proxy " + this.dropNotAllowed;
		this.dropStatus = this.dropNotAllowed;
		if (a) {
			this.ghost.update("")
		}
	},
	update : function(a) {
		if (typeof a == "string") {
			this.ghost.update(a)
		} else {
			this.ghost.update("");
			a.style.margin = "0";
			this.ghost.dom.appendChild(a)
		}
		var b = this.ghost.dom.firstChild;
		if (b) {
			Ext.fly(b).setStyle("float", "none")
		}
	},
	getEl : function() {
		return this.el
	},
	getGhost : function() {
		return this.ghost
	},
	hide : function(a) {
		this.el.hide();
		if (a) {
			this.reset(true)
		}
	},
	stop : function() {
		if (this.anim && this.anim.isAnimated && this.anim.isAnimated()) {
			this.anim.stop()
		}
	},
	show : function() {
		this.el.show()
	},
	sync : function() {
		this.el.sync()
	},
	repair : function(b, c, a) {
		this.callback = c;
		this.scope = a;
		if (b && this.animRepair !== false) {
			this.el.addClass("x-dd-drag-repair");
			this.el.hideUnders(true);
			this.anim = this.el.shift( {
				duration : this.repairDuration || 0.5,
				easing : "easeOut",
				xy : b,
				stopFx : true,
				callback : this.afterRepair,
				scope : this
			})
		} else {
			this.afterRepair()
		}
	},
	afterRepair : function() {
		this.hide(true);
		if (typeof this.callback == "function") {
			this.callback.call(this.scope || this)
		}
		this.callback = null;
		this.scope = null
	}
};
Ext.dd.DragSource = function(b, a) {
	this.el = Ext.get(b);
	if (!this.dragData) {
		this.dragData = {}
	}
	Ext.apply(this, a);
	if (!this.proxy) {
		this.proxy = new Ext.dd.StatusProxy()
	}
	Ext.dd.DragSource.superclass.constructor.call(this, this.el.dom,
			this.ddGroup || this.group, {
				dragElId : this.proxy.id,
				resizeFrame : false,
				isTarget : false,
				scroll : this.scroll === true
			});
	this.dragging = false
};
Ext.extend(Ext.dd.DragSource, Ext.dd.DDProxy, {
	dropAllowed : "x-dd-drop-ok",
	dropNotAllowed : "x-dd-drop-nodrop",
	getDragData : function(a) {
		return this.dragData
	},
	onDragEnter : function(c, d) {
		var b = Ext.dd.DragDropMgr.getDDById(d);
		this.cachedTarget = b;
		if (this.beforeDragEnter(b, c, d) !== false) {
			if (b.isNotifyTarget) {
				var a = b.notifyEnter(this, c, this.dragData);
				this.proxy.setStatus(a)
			} else {
				this.proxy.setStatus(this.dropAllowed)
			}
			if (this.afterDragEnter) {
				this.afterDragEnter(b, c, d)
			}
		}
	},
	beforeDragEnter : function(b, a, c) {
		return true
	},
	alignElWithMouse : function() {
		Ext.dd.DragSource.superclass.alignElWithMouse.apply(this, arguments);
		this.proxy.sync()
	},
	onDragOver : function(c, d) {
		var b = this.cachedTarget || Ext.dd.DragDropMgr.getDDById(d);
		if (this.beforeDragOver(b, c, d) !== false) {
			if (b.isNotifyTarget) {
				var a = b.notifyOver(this, c, this.dragData);
				this.proxy.setStatus(a)
			}
			if (this.afterDragOver) {
				this.afterDragOver(b, c, d)
			}
		}
	},
	beforeDragOver : function(b, a, c) {
		return true
	},
	onDragOut : function(b, c) {
		var a = this.cachedTarget || Ext.dd.DragDropMgr.getDDById(c);
		if (this.beforeDragOut(a, b, c) !== false) {
			if (a.isNotifyTarget) {
				a.notifyOut(this, b, this.dragData)
			}
			this.proxy.reset();
			if (this.afterDragOut) {
				this.afterDragOut(a, b, c)
			}
		}
		this.cachedTarget = null
	},
	beforeDragOut : function(b, a, c) {
		return true
	},
	onDragDrop : function(b, c) {
		var a = this.cachedTarget || Ext.dd.DragDropMgr.getDDById(c);
		if (this.beforeDragDrop(a, b, c) !== false) {
			if (a.isNotifyTarget) {
				if (a.notifyDrop(this, b, this.dragData)) {
					this.onValidDrop(a, b, c)
				} else {
					this.onInvalidDrop(a, b, c)
				}
			} else {
				this.onValidDrop(a, b, c)
			}
			if (this.afterDragDrop) {
				this.afterDragDrop(a, b, c)
			}
		}
		delete this.cachedTarget
	},
	beforeDragDrop : function(b, a, c) {
		return true
	},
	onValidDrop : function(b, a, c) {
		this.hideProxy();
		if (this.afterValidDrop) {
			this.afterValidDrop(b, a, c)
		}
	},
	getRepairXY : function(b, a) {
		return this.el.getXY()
	},
	onInvalidDrop : function(b, a, c) {
		this.beforeInvalidDrop(b, a, c);
		if (this.cachedTarget) {
			if (this.cachedTarget.isNotifyTarget) {
				this.cachedTarget.notifyOut(this, a, this.dragData)
			}
			this.cacheTarget = null
		}
		this.proxy.repair(this.getRepairXY(a, this.dragData), this.afterRepair,
				this);
		if (this.afterInvalidDrop) {
			this.afterInvalidDrop(a, c)
		}
	},
	afterRepair : function() {
		if (Ext.enableFx) {
			this.el.highlight(this.hlColor || "c3daf9")
		}
		this.dragging = false
	},
	beforeInvalidDrop : function(b, a, c) {
		return true
	},
	handleMouseDown : function(b) {
		if (this.dragging) {
			return
		}
		var a = this.getDragData(b);
		if (a && this.onBeforeDrag(a, b) !== false) {
			this.dragData = a;
			this.proxy.stop();
			Ext.dd.DragSource.superclass.handleMouseDown.apply(this, arguments)
		}
	},
	onBeforeDrag : function(a, b) {
		return true
	},
	onStartDrag : Ext.emptyFn,
	startDrag : function(a, b) {
		this.proxy.reset();
		this.dragging = true;
		this.proxy.update("");
		this.onInitDrag(a, b);
		this.proxy.show()
	},
	onInitDrag : function(a, c) {
		var b = this.el.dom.cloneNode(true);
		b.id = Ext.id();
		this.proxy.update(b);
		this.onStartDrag(a, c);
		return true
	},
	getProxy : function() {
		return this.proxy
	},
	hideProxy : function() {
		this.proxy.hide();
		this.proxy.reset(true);
		this.dragging = false
	},
	triggerCacheRefresh : function() {
		Ext.dd.DDM.refreshCache(this.groups)
	},
	b4EndDrag : function(a) {
	},
	endDrag : function(a) {
		this.onEndDrag(this.dragData, a)
	},
	onEndDrag : function(a, b) {
	},
	autoOffset : function(a, b) {
		this.setDelta(-12, -20)
	}
});
Ext.dd.DropTarget = function(b, a) {
	this.el = Ext.get(b);
	Ext.apply(this, a);
	if (this.containerScroll) {
		Ext.dd.ScrollManager.register(this.el)
	}
	Ext.dd.DropTarget.superclass.constructor.call(this, this.el.dom,
			this.ddGroup || this.group, {
				isTarget : true
			})
};
Ext.extend(Ext.dd.DropTarget, Ext.dd.DDTarget, {
	dropAllowed : "x-dd-drop-ok",
	dropNotAllowed : "x-dd-drop-nodrop",
	isTarget : true,
	isNotifyTarget : true,
	notifyEnter : function(a, c, b) {
		if (this.overClass) {
			this.el.addClass(this.overClass)
		}
		return this.dropAllowed
	},
	notifyOver : function(a, c, b) {
		return this.dropAllowed
	},
	notifyOut : function(a, c, b) {
		if (this.overClass) {
			this.el.removeClass(this.overClass)
		}
	},
	notifyDrop : function(a, c, b) {
		return false
	}
});
Ext.dd.DragZone = function(b, a) {
	Ext.dd.DragZone.superclass.constructor.call(this, b, a);
	if (this.containerScroll) {
		Ext.dd.ScrollManager.register(this.el)
	}
};
Ext.extend(Ext.dd.DragZone, Ext.dd.DragSource, {
	getDragData : function(a) {
		return Ext.dd.Registry.getHandleFromEvent(a)
	},
	onInitDrag : function(a, b) {
		this.proxy.update(this.dragData.ddel.cloneNode(true));
		this.onStartDrag(a, b);
		return true
	},
	afterRepair : function() {
		if (Ext.enableFx) {
			Ext.Element.fly(this.dragData.ddel).highlight(
					this.hlColor || "c3daf9")
		}
		this.dragging = false
	},
	getRepairXY : function(a) {
		return Ext.Element.fly(this.dragData.ddel).getXY()
	}
});
Ext.dd.DropZone = function(b, a) {
	Ext.dd.DropZone.superclass.constructor.call(this, b, a)
};
Ext.extend(Ext.dd.DropZone, Ext.dd.DropTarget, {
	getTargetFromEvent : function(a) {
		return Ext.dd.Registry.getTargetFromEvent(a)
	},
	onNodeEnter : function(d, a, c, b) {
	},
	onNodeOver : function(d, a, c, b) {
		return this.dropAllowed
	},
	onNodeOut : function(d, a, c, b) {
	},
	onNodeDrop : function(d, a, c, b) {
		return false
	},
	onContainerOver : function(a, c, b) {
		return this.dropNotAllowed
	},
	onContainerDrop : function(a, c, b) {
		return false
	},
	notifyEnter : function(a, c, b) {
		return this.dropNotAllowed
	},
	notifyOver : function(a, c, b) {
		var d = this.getTargetFromEvent(c);
		if (!d) {
			if (this.lastOverNode) {
				this.onNodeOut(this.lastOverNode, a, c, b);
				this.lastOverNode = null
			}
			return this.onContainerOver(a, c, b)
		}
		if (this.lastOverNode != d) {
			if (this.lastOverNode) {
				this.onNodeOut(this.lastOverNode, a, c, b)
			}
			this.onNodeEnter(d, a, c, b);
			this.lastOverNode = d
		}
		return this.onNodeOver(d, a, c, b)
	},
	notifyOut : function(a, c, b) {
		if (this.lastOverNode) {
			this.onNodeOut(this.lastOverNode, a, c, b);
			this.lastOverNode = null
		}
	},
	notifyDrop : function(a, c, b) {
		if (this.lastOverNode) {
			this.onNodeOut(this.lastOverNode, a, c, b);
			this.lastOverNode = null
		}
		var d = this.getTargetFromEvent(c);
		return d ? this.onNodeDrop(d, a, c, b) : this.onContainerDrop(a, c, b)
	},
	triggerCacheRefresh : function() {
		Ext.dd.DDM.refreshCache(this.groups)
	}
});
Ext.Element.addMethods( {
	initDD : function(c, b, d) {
		var a = new Ext.dd.DD(Ext.id(this.dom), c, b);
		return Ext.apply(a, d)
	},
	initDDProxy : function(c, b, d) {
		var a = new Ext.dd.DDProxy(Ext.id(this.dom), c, b);
		return Ext.apply(a, d)
	},
	initDDTarget : function(c, b, d) {
		var a = new Ext.dd.DDTarget(Ext.id(this.dom), c, b);
		return Ext.apply(a, d)
	}
});
Ext.data.Api = ( function() {
	var a = {};
	return {
		actions : {
			create : "create",
			read : "read",
			update : "update",
			destroy : "destroy"
		},
		restActions : {
			create : "POST",
			read : "GET",
			update : "PUT",
			destroy : "DELETE"
		},
		isAction : function(b) {
			return (Ext.data.Api.actions[b]) ? true : false
		},
		getVerb : function(b) {
			if (a[b]) {
				return a[b]
			}
			for ( var c in this.actions) {
				if (this.actions[c] === b) {
					a[b] = c;
					break
				}
			}
			return (a[b] !== undefined) ? a[b] : null
		},
		isValid : function(b) {
			var e = [];
			var d = this.actions;
			for ( var c in b) {
				if (!(c in d)) {
					e.push(c)
				}
			}
			return (!e.length) ? true : e
		},
		hasUniqueUrl : function(c, g) {
			var b = (c.api[g]) ? c.api[g].url : null;
			var e = true;
			for ( var d in c.api) {
				if ((e = (d === g) ? true : (c.api[d].url != b) ? true : false) === false) {
					break
				}
			}
			return e
		},
		prepare : function(b) {
			if (!b.api) {
				b.api = {}
			}
			for ( var d in this.actions) {
				var c = this.actions[d];
				b.api[c] = b.api[c] || b.url || b.directFn;
				if (typeof (b.api[c]) == "string") {
					b.api[c] = {
						url : b.api[c]
					}
				}
			}
		},
		restify : function(b) {
			b.restful = true;
			for ( var c in this.restActions) {
				b.api[this.actions[c]].method = this.restActions[c]
			}
		}
	}
})();
Ext.data.Api.Error = Ext.extend(Ext.Error, {
	constructor : function(b, a) {
		this.arg = a;
		Ext.Error.call(this, b)
	},
	name : "Ext.data.Api"
});
Ext
		.apply(
				Ext.data.Api.Error.prototype,
				{
					lang : {
						"action-url-undefined" : "No fallback url defined for this action.  When defining a DataProxy api, please be sure to define an url for each CRUD action in Ext.data.Api.actions or define a default url in addition to your api-configuration.",
						invalid : "received an invalid API-configuration.  Please ensure your proxy API-configuration contains only the actions defined in Ext.data.Api.actions",
						"invalid-url" : "Invalid url.  Please review your proxy configuration.",
						execute : 'Attempted to execute an unknown action.  Valid API actions are defined in Ext.data.Api.actions"'
					}
				});
Ext.data.SortTypes = {
	none : function(a) {
		return a
	},
	stripTagsRE : /<\/?[^>]+>/gi,
	asText : function(a) {
		return String(a).replace(this.stripTagsRE, "")
	},
	asUCText : function(a) {
		return String(a).toUpperCase().replace(this.stripTagsRE, "")
	},
	asUCString : function(a) {
		return String(a).toUpperCase()
	},
	asDate : function(a) {
		if (!a) {
			return 0
		}
		if (Ext.isDate(a)) {
			return a.getTime()
		}
		return Date.parse(String(a))
	},
	asFloat : function(a) {
		var b = parseFloat(String(a).replace(/,/g, ""));
		return isNaN(b) ? 0 : b
	},
	asInt : function(a) {
		var b = parseInt(String(a).replace(/,/g, ""), 10);
		return isNaN(b) ? 0 : b
	}
};
Ext.data.Record = function(a, b) {
	this.id = (b || b === 0) ? b : Ext.data.Record.id(this);
	this.data = a || {}
};
Ext.data.Record.create = function(e) {
	var c = Ext.extend(Ext.data.Record, {});
	var d = c.prototype;
	d.fields = new Ext.util.MixedCollection(false, function(g) {
		return g.name
	});
	for ( var b = 0, a = e.length; b < a; b++) {
		d.fields.add(new Ext.data.Field(e[b]))
	}
	c.getField = function(g) {
		return d.fields.get(g)
	};
	return c
};
Ext.data.Record.PREFIX = "ext-record";
Ext.data.Record.AUTO_ID = 1;
Ext.data.Record.EDIT = "edit";
Ext.data.Record.REJECT = "reject";
Ext.data.Record.COMMIT = "commit";
Ext.data.Record.id = function(a) {
	a.phantom = true;
	return [ Ext.data.Record.PREFIX, "-", Ext.data.Record.AUTO_ID++ ].join("")
};
Ext.data.Record.prototype = {
	dirty : false,
	editing : false,
	error : null,
	modified : null,
	phantom : false,
	join : function(a) {
		this.store = a
	},
	set : function(b, c) {
		var a = (typeof c === "object");
		if (!a && String(this.data[b]) === String(c)) {
			return
		} else {
			if (a && Ext.encode(this.data[b]) === Ext.encode(c)) {
				return
			}
		}
		this.dirty = true;
		if (!this.modified) {
			this.modified = {}
		}
		if (typeof this.modified[b] == "undefined") {
			this.modified[b] = this.data[b]
		}
		this.data[b] = c;
		if (!this.editing) {
			this.afterEdit()
		}
	},
	afterEdit : function() {
		if (this.store) {
			this.store.afterEdit(this)
		}
	},
	afterReject : function() {
		if (this.store) {
			this.store.afterReject(this)
		}
	},
	afterCommit : function() {
		if (this.store) {
			this.store.afterCommit(this)
		}
	},
	get : function(a) {
		return this.data[a]
	},
	beginEdit : function() {
		this.editing = true;
		this.modified = this.modified || {}
	},
	cancelEdit : function() {
		this.editing = false;
		delete this.modified
	},
	endEdit : function() {
		this.editing = false;
		if (this.dirty) {
			this.afterEdit()
		}
	},
	reject : function(b) {
		var a = this.modified;
		for ( var c in a) {
			if (typeof a[c] != "function") {
				this.data[c] = a[c]
			}
		}
		this.dirty = false;
		delete this.modified;
		this.editing = false;
		if (b !== true) {
			this.afterReject()
		}
	},
	commit : function(a) {
		this.dirty = false;
		delete this.modified;
		this.editing = false;
		if (a !== true) {
			this.afterCommit()
		}
	},
	getChanges : function() {
		var a = this.modified, b = {};
		for ( var c in a) {
			if (a.hasOwnProperty(c)) {
				b[c] = this.data[c]
			}
		}
		return b
	},
	hasError : function() {
		return this.error !== null
	},
	clearError : function() {
		this.error = null
	},
	copy : function(a) {
		return new this.constructor(Ext.apply( {}, this.data), a || this.id)
	},
	isModified : function(a) {
		return !!(this.modified && this.modified.hasOwnProperty(a))
	},
	isValid : function() {
		return this.fields.find(
				function(a) {
					return (a.allowBlank === false && Ext
							.isEmpty(this.data[a.name])) ? true : false
				}, this) ? false : true
	},
	markDirty : function() {
		this.dirty = true;
		if (!this.modified) {
			this.modified = {}
		}
		this.fields.each( function(a) {
			this.modified[a.name] = this.data[a.name]
		}, this)
	}
};
Ext.StoreMgr = Ext.apply(new Ext.util.MixedCollection(), {
	register : function() {
		for ( var a = 0, b; (b = arguments[a]); a++) {
			this.add(b)
		}
	},
	unregister : function() {
		for ( var a = 0, b; (b = arguments[a]); a++) {
			this.remove(this.lookup(b))
		}
	},
	lookup : function(e) {
		if (Ext.isArray(e)) {
			var b = [ "field1" ], d = !Ext.isArray(e[0]);
			if (!d) {
				for ( var c = 2, a = e[0].length; c <= a; ++c) {
					b.push("field" + c)
				}
			}
			return new Ext.data.ArrayStore( {
				fields : b,
				data : e,
				expandData : d,
				autoDestroy : true,
				autoCreated : true
			})
		}
		return Ext.isObject(e) ? (e.events ? e : Ext.create(e, "store")) : this
				.get(e)
	},
	getKey : function(a) {
		return a.storeId
	}
});
Ext.data.Store = function(a) {
	this.data = new Ext.util.MixedCollection(false);
	this.data.getKey = function(b) {
		return b.id
	};
	this.baseParams = {};
	this.removed = [];
	if (a && a.data) {
		this.inlineData = a.data;
		delete a.data
	}
	Ext.apply(this, a);
	this.paramNames = Ext
			.applyIf(this.paramNames || {}, this.defaultParamNames);
	if (this.url && !this.proxy) {
		this.proxy = new Ext.data.HttpProxy( {
			url : this.url
		})
	}
	if (this.restful === true && this.proxy) {
		this.batch = false;
		Ext.data.Api.restify(this.proxy)
	}
	if (this.reader) {
		if (!this.recordType) {
			this.recordType = this.reader.recordType
		}
		if (this.reader.onMetaChange) {
			this.reader.onMetaChange = this.onMetaChange.createDelegate(this)
		}
		if (this.writer) {
			this.writer.meta = this.reader.meta;
			this.pruneModifiedRecords = true
		}
	}
	if (this.recordType) {
		this.fields = this.recordType.prototype.fields
	}
	this.modified = [];
	this.addEvents("datachanged", "metachange", "add", "remove", "update",
			"clear", "exception", "beforeload", "load", "loadexception",
			"beforewrite", "write");
	if (this.proxy) {
		this.relayEvents(this.proxy, [ "loadexception", "exception" ])
	}
	if (this.writer) {
		this.on( {
			scope : this,
			add : this.createRecords,
			remove : this.destroyRecord,
			update : this.updateRecord
		})
	}
	this.sortToggle = {};
	if (this.sortField) {
		this.setDefaultSort(this.sortField, this.sortDir)
	} else {
		if (this.sortInfo) {
			this.setDefaultSort(this.sortInfo.field, this.sortInfo.direction)
		}
	}
	Ext.data.Store.superclass.constructor.call(this);
	if (this.id) {
		this.storeId = this.id;
		delete this.id
	}
	if (this.storeId) {
		Ext.StoreMgr.register(this)
	}
	if (this.inlineData) {
		this.loadData(this.inlineData);
		delete this.inlineData
	} else {
		if (this.autoLoad) {
			this.load.defer(10, this,
					[ typeof this.autoLoad == "object" ? this.autoLoad
							: undefined ])
		}
	}
};
Ext.extend(Ext.data.Store, Ext.util.Observable, {
	writer : undefined,
	remoteSort : false,
	autoDestroy : false,
	pruneModifiedRecords : false,
	lastOptions : null,
	autoSave : true,
	batch : true,
	restful : false,
	paramNames : undefined,
	defaultParamNames : {
		start : "start",
		limit : "limit",
		sort : "sort",
		dir : "dir"
	},
	destroy : function() {
		if (this.storeId) {
			Ext.StoreMgr.unregister(this)
		}
		this.data = null;
		Ext.destroy(this.proxy);
		this.reader = this.writer = null;
		this.purgeListeners()
	},
	add : function(b) {
		b = [].concat(b);
		if (b.length < 1) {
			return
		}
		for ( var d = 0, a = b.length; d < a; d++) {
			b[d].join(this)
		}
		var c = this.data.length;
		this.data.addAll(b);
		if (this.snapshot) {
			this.snapshot.addAll(b)
		}
		this.fireEvent("add", this, b, c)
	},
	addSorted : function(a) {
		var b = this.findInsertIndex(a);
		this.insert(b, a)
	},
	remove : function(a) {
		var b = this.data.indexOf(a);
		if (b > -1) {
			this.data.removeAt(b);
			if (this.pruneModifiedRecords) {
				this.modified.remove(a)
			}
			if (this.snapshot) {
				this.snapshot.remove(a)
			}
			this.fireEvent("remove", this, a, b)
		}
	},
	removeAt : function(a) {
		this.remove(this.getAt(a))
	},
	removeAll : function() {
		this.data.clear();
		if (this.snapshot) {
			this.snapshot.clear()
		}
		if (this.pruneModifiedRecords) {
			this.modified = []
		}
		this.fireEvent("clear", this)
	},
	insert : function(c, b) {
		b = [].concat(b);
		for ( var d = 0, a = b.length; d < a; d++) {
			this.data.insert(c, b[d]);
			b[d].join(this)
		}
		this.fireEvent("add", this, b, c)
	},
	indexOf : function(a) {
		return this.data.indexOf(a)
	},
	indexOfId : function(a) {
		return this.data.indexOfKey(a)
	},
	getById : function(a) {
		return this.data.key(a)
	},
	getAt : function(a) {
		return this.data.itemAt(a)
	},
	getRange : function(b, a) {
		return this.data.getRange(b, a)
	},
	storeOptions : function(a) {
		a = Ext.apply( {}, a);
		delete a.callback;
		delete a.scope;
		this.lastOptions = a
	},
	load : function(b) {
		b = b || {};
		this.storeOptions(b);
		if (this.sortInfo && this.remoteSort) {
			var a = this.paramNames;
			b.params = b.params || {};
			b.params[a.sort] = this.sortInfo.field;
			b.params[a.dir] = this.sortInfo.direction
		}
		try {
			return this.execute("read", null, b)
		} catch (c) {
			this.handleException(c);
			return false
		}
	},
	updateRecord : function(b, a, c) {
		if (c == Ext.data.Record.EDIT && this.autoSave === true
				&& (!a.phantom || (a.phantom && a.isValid))) {
			this.save()
		}
	},
	createRecords : function(c, b, d) {
		for ( var e = 0, a = b.length; e < a; e++) {
			if (b[e].phantom && b[e].isValid()) {
				b[e].markDirty();
				this.modified.push(b[e])
			}
		}
		if (this.autoSave === true) {
			this.save()
		}
	},
	destroyRecord : function(b, a, c) {
		if (this.modified.indexOf(a) != -1) {
			this.modified.remove(a)
		}
		if (!a.phantom) {
			this.removed.push(a);
			a.lastIndex = c;
			if (this.autoSave === true) {
				this.save()
			}
		}
	},
	execute : function(d, a, b) {
		if (!Ext.data.Api.isAction(d)) {
			throw new Ext.data.Api.Error("execute", d)
		}
		b = Ext.applyIf(b || {}, {
			params : {}
		});
		var c = true;
		if (d === "read") {
			c = this.fireEvent("beforeload", this, b)
		} else {
			if (this.writer.listful === true && this.restful !== true) {
				a = (Ext.isArray(a)) ? a : [ a ]
			} else {
				if (Ext.isArray(a) && a.length == 1) {
					a = a.shift()
				}
			}
			if ((c = this.fireEvent("beforewrite", this, d, a, b)) !== false) {
				this.writer.write(d, b.params, a)
			}
		}
		if (c !== false) {
			var e = Ext.apply( {}, b.params, this.baseParams);
			if (this.writer && this.proxy.url && !this.proxy.restful
					&& !Ext.data.Api.hasUniqueUrl(this.proxy, d)) {
				e.xaction = d
			}
			this.proxy.request(Ext.data.Api.actions[d], a, e, this.reader, this
					.createCallback(d, a), this, b)
		}
		return c
	},
	save : function() {
		if (!this.writer) {
			throw new Ext.data.Store.Error("writer-undefined")
		}
		if (this.removed.length) {
			this.doTransaction("destroy", this.removed)
		}
		var a = [].concat(this.getModifiedRecords());
		if (!a.length) {
			return true
		}
		var c = [];
		for ( var b = a.length - 1; b >= 0; b--) {
			if (a[b].phantom === true) {
				var d = a.splice(b, 1).shift();
				if (d.isValid()) {
					c.push(d)
				}
			} else {
				if (!a[b].isValid()) {
					a.splice(b, 1)
				}
			}
		}
		if (c.length) {
			this.doTransaction("create", c)
		}
		if (a.length) {
			this.doTransaction("update", a)
		}
		return true
	},
	doTransaction : function(d, b) {
		function e(g) {
			try {
				this.execute(d, g)
			} catch (h) {
				this.handleException(h)
			}
		}
		if (this.batch === false) {
			for ( var c = 0, a = b.length; c < a; c++) {
				e.call(this, b[c])
			}
		} else {
			e.call(this, b)
		}
	},
	createCallback : function(b, a) {
		var c = Ext.data.Api.actions;
		return (b == "read") ? this.loadRecords : function(e, d, g) {
			this["on" + Ext.util.Format.capitalize(b) + "Records"](g, a, e);
			if (g === true) {
				this.fireEvent("write", this, b, e, d, a)
			}
		}
	},
	clearModified : function(a) {
		if (Ext.isArray(a)) {
			for ( var b = a.length - 1; b >= 0; b--) {
				this.modified.splice(this.modified.indexOf(a[b]), 1)
			}
		} else {
			this.modified.splice(this.modified.indexOf(a), 1)
		}
	},
	reMap : function(b) {
		if (Ext.isArray(b)) {
			for ( var d = 0, a = b.length; d < a; d++) {
				this.reMap(b[d])
			}
		} else {
			delete this.data.map[b._phid];
			this.data.map[b.id] = b;
			var c = this.data.keys.indexOf(b._phid);
			this.data.keys.splice(c, 1, b.id);
			delete b._phid
		}
	},
	onCreateRecords : function(d, a, b) {
		if (d === true) {
			try {
				this.reader.realize(a, b);
				this.reMap(a)
			} catch (c) {
				this.handleException(c);
				if (Ext.isArray(a)) {
					this.onCreateRecords(d, a, b)
				}
			}
		}
	},
	onUpdateRecords : function(d, a, b) {
		if (d === true) {
			try {
				this.reader.update(a, b)
			} catch (c) {
				this.handleException(c);
				if (Ext.isArray(a)) {
					this.onUpdateRecords(d, a, b)
				}
			}
		}
	},
	onDestroyRecords : function(e, b, d) {
		b = (b instanceof Ext.data.Record) ? [ b ] : b;
		for ( var c = 0, a = b.length; c < a; c++) {
			this.removed.splice(this.removed.indexOf(b[c]), 1)
		}
		if (e === false) {
			for (c = b.length - 1; c >= 0; c--) {
				this.insert(b[c].lastIndex, b[c])
			}
		}
	},
	handleException : function(a) {
		Ext.handleError(a)
	},
	reload : function(a) {
		this.load(Ext.applyIf(a || {}, this.lastOptions))
	},
	loadRecords : function(h, b, g) {
		if (!h || g === false) {
			if (g !== false) {
				this.fireEvent("load", this, [], b)
			}
			if (b.callback) {
				b.callback.call(b.scope || this, [], b, false, h)
			}
			return
		}
		var e = h.records, d = h.totalRecords || e.length;
		if (!b || b.add !== true) {
			if (this.pruneModifiedRecords) {
				this.modified = []
			}
			for ( var c = 0, a = e.length; c < a; c++) {
				e[c].join(this)
			}
			if (this.snapshot) {
				this.data = this.snapshot;
				delete this.snapshot
			}
			this.data.clear();
			this.data.addAll(e);
			this.totalLength = d;
			this.applySort();
			this.fireEvent("datachanged", this)
		} else {
			this.totalLength = Math.max(d, this.data.length + e.length);
			this.add(e)
		}
		this.fireEvent("load", this, e, b);
		if (b.callback) {
			b.callback.call(b.scope || this, e, b, true)
		}
	},
	loadData : function(c, a) {
		var b = this.reader.readRecords(c);
		this.loadRecords(b, {
			add : a
		}, true)
	},
	getCount : function() {
		return this.data.length || 0
	},
	getTotalCount : function() {
		return this.totalLength || 0
	},
	getSortState : function() {
		return this.sortInfo
	},
	applySort : function() {
		if (this.sortInfo && !this.remoteSort) {
			var a = this.sortInfo, b = a.field;
			this.sortData(b, a.direction)
		}
	},
	sortData : function(c, d) {
		d = d || "ASC";
		var a = this.fields.get(c).sortType;
		var b = function(g, e) {
			var i = a(g.data[c]), h = a(e.data[c]);
			return i > h ? 1 : (i < h ? -1 : 0)
		};
		this.data.sort(d, b);
		if (this.snapshot && this.snapshot != this.data) {
			this.snapshot.sort(d, b)
		}
	},
	setDefaultSort : function(b, a) {
		a = a ? a.toUpperCase() : "ASC";
		this.sortInfo = {
			field : b,
			direction : a
		};
		this.sortToggle[b] = a
	},
	sort : function(e, c) {
		var d = this.fields.get(e);
		if (!d) {
			return false
		}
		if (!c) {
			if (this.sortInfo && this.sortInfo.field == d.name) {
				c = (this.sortToggle[d.name] || "ASC").toggle("ASC", "DESC")
			} else {
				c = d.sortDir
			}
		}
		var b = (this.sortToggle) ? this.sortToggle[d.name] : null;
		var a = (this.sortInfo) ? this.sortInfo : null;
		this.sortToggle[d.name] = c;
		this.sortInfo = {
			field : d.name,
			direction : c
		};
		if (!this.remoteSort) {
			this.applySort();
			this.fireEvent("datachanged", this)
		} else {
			if (!this.load(this.lastOptions)) {
				if (b) {
					this.sortToggle[d.name] = b
				}
				if (a) {
					this.sortInfo = a
				}
			}
		}
	},
	each : function(b, a) {
		this.data.each(b, a)
	},
	getModifiedRecords : function() {
		return this.modified
	},
	createFilterFn : function(c, b, d, a) {
		if (Ext.isEmpty(b, false)) {
			return false
		}
		b = this.data.createValueMatcher(b, d, a);
		return function(e) {
			return b.test(e.data[c])
		}
	},
	sum : function(e, g, a) {
		var c = this.data.items, b = 0;
		g = g || 0;
		a = (a || a === 0) ? a : c.length - 1;
		for ( var d = g; d <= a; d++) {
			b += (c[d].data[e] || 0)
		}
		return b
	},
	filter : function(d, c, e, a) {
		var b = this.createFilterFn(d, c, e, a);
		return b ? this.filterBy(b) : this.clearFilter()
	},
	filterBy : function(b, a) {
		this.snapshot = this.snapshot || this.data;
		this.data = this.queryBy(b, a || this);
		this.fireEvent("datachanged", this)
	},
	query : function(d, c, e, a) {
		var b = this.createFilterFn(d, c, e, a);
		return b ? this.queryBy(b) : this.data.clone()
	},
	queryBy : function(b, a) {
		var c = this.snapshot || this.data;
		return c.filterBy(b, a || this)
	},
	find : function(d, c, g, e, a) {
		var b = this.createFilterFn(d, c, e, a);
		return b ? this.data.findIndexBy(b, null, g) : -1
	},
	findExact : function(b, a, c) {
		return this.data.findIndexBy( function(d) {
			return d.get(b) === a
		}, this, c)
	},
	findBy : function(b, a, c) {
		return this.data.findIndexBy(b, a, c)
	},
	collect : function(j, k, b) {
		var h = (b === true && this.snapshot) ? this.snapshot.items
				: this.data.items;
		var m, n, a = [], c = {};
		for ( var e = 0, g = h.length; e < g; e++) {
			m = h[e].data[j];
			n = String(m);
			if ((k || !Ext.isEmpty(m)) && !c[n]) {
				c[n] = true;
				a[a.length] = m
			}
		}
		return a
	},
	clearFilter : function(a) {
		if (this.isFiltered()) {
			this.data = this.snapshot;
			delete this.snapshot;
			if (a !== true) {
				this.fireEvent("datachanged", this)
			}
		}
	},
	isFiltered : function() {
		return this.snapshot && this.snapshot != this.data
	},
	afterEdit : function(a) {
		if (this.modified.indexOf(a) == -1) {
			this.modified.push(a)
		}
		this.fireEvent("update", this, a, Ext.data.Record.EDIT)
	},
	afterReject : function(a) {
		this.modified.remove(a);
		this.fireEvent("update", this, a, Ext.data.Record.REJECT)
	},
	afterCommit : function(a) {
		this.modified.remove(a);
		this.fireEvent("update", this, a, Ext.data.Record.COMMIT)
	},
	commitChanges : function() {
		var b = this.modified.slice(0);
		this.modified = [];
		for ( var c = 0, a = b.length; c < a; c++) {
			b[c].commit()
		}
	},
	rejectChanges : function() {
		var b = this.modified.slice(0);
		this.modified = [];
		for ( var c = 0, a = b.length; c < a; c++) {
			b[c].reject()
		}
	},
	onMetaChange : function(b, a, c) {
		this.recordType = a;
		this.fields = a.prototype.fields;
		delete this.snapshot;
		if (b.sortInfo) {
			this.sortInfo = b.sortInfo
		} else {
			if (this.sortInfo && !this.fields.get(this.sortInfo.field)) {
				delete this.sortInfo
			}
		}
		this.modified = [];
		this.fireEvent("metachange", this, this.reader.meta)
	},
	findInsertIndex : function(a) {
		this.suspendEvents();
		var c = this.data.clone();
		this.data.add(a);
		this.applySort();
		var b = this.data.indexOf(a);
		this.data = c;
		this.resumeEvents();
		return b
	},
	setBaseParam : function(a, b) {
		this.baseParams = this.baseParams || {};
		this.baseParams[a] = b
	}
});
Ext.reg("store", Ext.data.Store);
Ext.data.Store.Error = Ext.extend(Ext.Error, {
	name : "Ext.data.Store"
});
Ext
		.apply(
				Ext.data.Store.Error.prototype,
				{
					lang : {
						"writer-undefined" : "Attempted to execute a write-action without a DataWriter installed."
					}
				});
Ext.data.Field = function(d) {
	if (typeof d == "string") {
		d = {
			name : d
		}
	}
	Ext.apply(this, d);
	if (!this.type) {
		this.type = "auto"
	}
	var c = Ext.data.SortTypes;
	if (typeof this.sortType == "string") {
		this.sortType = c[this.sortType]
	}
	if (!this.sortType) {
		switch (this.type) {
		case "string":
			this.sortType = c.asUCString;
			break;
		case "date":
			this.sortType = c.asDate;
			break;
		default:
			this.sortType = c.none
		}
	}
	var e = /[\$,%]/g;
	if (!this.convert) {
		var b, a = this.dateFormat;
		switch (this.type) {
		case "":
		case "auto":
		case undefined:
			b = function(g) {
				return g
			};
			break;
		case "string":
			b = function(g) {
				return (g === undefined || g === null) ? "" : String(g)
			};
			break;
		case "int":
			b = function(g) {
				return g !== undefined && g !== null && g !== "" ? parseInt(
						String(g).replace(e, ""), 10) : ""
			};
			break;
		case "float":
			b = function(g) {
				return g !== undefined && g !== null && g !== "" ? parseFloat(
						String(g).replace(e, ""), 10) : ""
			};
			break;
		case "bool":
		case "boolean":
			b = function(g) {
				return g === true || g === "true" || g == 1
			};
			break;
		case "date":
			b = function(h) {
				if (!h) {
					return ""
				}
				if (Ext.isDate(h)) {
					return h
				}
				if (a) {
					if (a == "timestamp") {
						return new Date(h * 1000)
					}
					if (a == "time") {
						return new Date(parseInt(h, 10))
					}
					return Date.parseDate(h, a)
				}
				var g = Date.parse(h);
				return g ? new Date(g) : null
			};
			break
		}
		this.convert = b
	}
};
Ext.data.Field.prototype = {
	dateFormat : null,
	defaultValue : "",
	mapping : null,
	sortType : null,
	sortDir : "ASC",
	allowBlank : true
};
Ext.data.DataReader = function(a, b) {
	this.meta = a;
	this.recordType = Ext.isArray(b) ? Ext.data.Record.create(b) : b
};
Ext.data.DataReader.prototype = {
	buildExtractors : Ext.emptyFn,
	realize : function(b, d) {
		if (Ext.isArray(b)) {
			for ( var c = b.length - 1; c >= 0; c--) {
				if (Ext.isArray(d)) {
					this
							.realize(b.splice(c, 1).shift(), d.splice(c, 1)
									.shift())
				} else {
					this.realize(b.splice(c, 1).shift(), d)
				}
			}
		} else {
			if (Ext.isArray(d) && d.length == 1) {
				d = d.shift()
			}
			if (!this.isData(d)) {
				throw new Ext.data.DataReader.Error("realize", b)
			}
			this.buildExtractors();
			var a = this
					.extractValues(d, b.fields.items, b.fields.items.length);
			b.phantom = false;
			b._phid = b.id;
			b.id = d[this.meta.idProperty];
			b.data = a;
			b.commit()
		}
	},
	update : function(a, c) {
		if (Ext.isArray(a)) {
			for ( var b = a.length - 1; b >= 0; b--) {
				if (Ext.isArray(c)) {
					this.update(a.splice(b, 1).shift(), c.splice(b, 1).shift())
				} else {
					this.update(a.splice(b, 1).shift(), c)
				}
			}
		} else {
			if (Ext.isArray(c) && c.length == 1) {
				c = c.shift()
			}
			if (!this.isData(c)) {
				a.commit();
				throw new Ext.data.DataReader.Error("update", a)
			}
			this.buildExtractors();
			a.data = this.extractValues(Ext.apply(a.data, c), a.fields.items,
					a.fields.items.length);
			a.commit()
		}
	},
	isData : function(a) {
		return (a && Ext.isObject(a) && !Ext.isEmpty(a[this.meta.idProperty])) ? true
				: false
	}
};
Ext.data.DataReader.Error = Ext.extend(Ext.Error, {
	constructor : function(b, a) {
		this.arg = a;
		Ext.Error.call(this, b)
	},
	name : "Ext.data.DataReader"
});
Ext
		.apply(
				Ext.data.DataReader.Error.prototype,
				{
					lang : {
						update : "#update received invalid data from server.  Please see docs for DataReader#update and review your DataReader configuration.",
						realize : "#realize was called with invalid remote-data.  Please see the docs for DataReader#realize and review your DataReader configuration.",
						"invalid-response" : "#readResponse received an invalid response from the server."
					}
				});
Ext.data.DataWriter = function(a) {
	Ext.apply(this, a)
};
Ext.data.DataWriter.prototype = {
	writeAllFields : false,
	listful : false,
	write : function(b, c, a) {
		this.render(b, a, c, this[b](a))
	},
	render : Ext.emptyFn,
	update : function(a) {
		var d = {};
		if (Ext.isArray(a)) {
			var c = [], b = [];
			Ext.each(a, function(e) {
				b.push(e.id);
				c.push(this.updateRecord(e))
			}, this);
			d[this.meta.idProperty] = b;
			d[this.meta.root] = c
		} else {
			if (a instanceof Ext.data.Record) {
				d[this.meta.idProperty] = a.id;
				d[this.meta.root] = this.updateRecord(a)
			}
		}
		return d
	},
	updateRecord : Ext.emptyFn,
	create : function(a) {
		var c = {};
		if (Ext.isArray(a)) {
			var b = [];
			Ext.each(a, function(d) {
				b.push(this.createRecord(d))
			}, this);
			c[this.meta.root] = b
		} else {
			if (a instanceof Ext.data.Record) {
				c[this.meta.root] = this.createRecord(a)
			}
		}
		return c
	},
	createRecord : Ext.emptyFn,
	destroy : function(a) {
		var d = {};
		if (Ext.isArray(a)) {
			var c = [], b = [];
			Ext.each(a, function(e) {
				c.push(this.destroyRecord(e))
			}, this);
			d[this.meta.root] = c
		} else {
			if (a instanceof Ext.data.Record) {
				d[this.meta.root] = this.destroyRecord(a)
			}
		}
		return d
	},
	destroyRecord : Ext.emptyFn,
	toHash : function(e) {
		var d = e.fields.map, c = {}, b = (this.writeAllFields === false && e.phantom === false) ? e
				.getChanges()
				: e.data, a;
		Ext.iterate(b, function(h, g) {
			if ((a = d[h])) {
				c[a.mapping ? a.mapping : a.name] = g
			}
		});
		c[this.meta.idProperty] = e.id;
		return c
	}
};
Ext.data.DataProxy = function(a) {
	a = a || {};
	this.api = a.api;
	this.url = a.url;
	this.restful = a.restful;
	this.listeners = a.listeners;
	this.prettyUrls = a.prettyUrls;
	try {
		Ext.data.Api.prepare(this)
	} catch (b) {
		if (b instanceof Ext.data.Api.Error) {
			b.toConsole()
		}
	}
	this.addEvents("exception", "beforeload", "load", "loadexception",
			"beforewrite", "write");
	Ext.data.DataProxy.superclass.constructor.call(this)
};
Ext.extend(Ext.data.DataProxy, Ext.util.Observable, {
	restful : false,
	setApi : function() {
		if (arguments.length == 1) {
			var a = Ext.data.Api.isValid(arguments[0]);
			if (a === true) {
				this.api = arguments[0]
			} else {
				throw new Ext.data.Api.Error("invalid", a)
			}
		} else {
			if (arguments.length == 2) {
				if (!Ext.data.Api.isAction(arguments[0])) {
					throw new Ext.data.Api.Error("invalid", arguments[0])
				}
				this.api[arguments[0]] = arguments[1]
			}
		}
		Ext.data.Api.prepare(this)
	},
	isApiAction : function(a) {
		return (this.api[a]) ? true : false
	},
	request : function(e, b, g, a, h, d, c) {
		if (!this.api[e] && !this.load) {
			throw new Ext.data.DataProxy.Error("action-undefined", e)
		}
		g = g || {};
		if ((e === Ext.data.Api.actions.read) ? this.fireEvent("beforeload",
				this, g)
				: this.fireEvent("beforewrite", this, e, b, g) !== false) {
			this.doRequest.apply(this, arguments)
		} else {
			h.call(d || this, null, c, false)
		}
	},
	load : null,
	doRequest : function(e, b, g, a, h, d, c) {
		this.load(g, a, h, d, c)
	},
	buildUrl : function(d, b) {
		b = b || null;
		var c = (this.api[d]) ? this.api[d].url : this.url;
		if (!c) {
			throw new Ext.data.Api.Error("invalid-url", d)
		}
		var e = null;
		var a = c.match(/(.*)(\.\w+)$/);
		if (a) {
			e = a[2];
			c = a[1]
		}
		if ((this.prettyUrls === true || this.restful === true)
				&& b instanceof Ext.data.Record && !b.phantom) {
			c += "/" + b.id
		}
		if (e) {
			c += e
		}
		return c
	},
	destroy : function() {
		this.purgeListeners()
	}
});
Ext.data.DataProxy.Error = Ext.extend(Ext.Error, {
	constructor : function(b, a) {
		this.arg = a;
		Ext.Error.call(this, b)
	},
	name : "Ext.data.DataProxy"
});
Ext
		.apply(
				Ext.data.DataProxy.Error.prototype,
				{
					lang : {
						"action-undefined" : "DataProxy attempted to execute an API-action but found an undefined url / function.  Please review your Proxy url/api-configuration.",
						"api-invalid" : "Recieved an invalid API-configuration.  Please ensure your proxy API-configuration contains only the actions from Ext.data.Api.actions."
					}
				});
Ext.data.ScriptTagProxy = function(a) {
	Ext.apply(this, a);
	Ext.data.ScriptTagProxy.superclass.constructor.call(this, a);
	this.head = document.getElementsByTagName("head")[0]
};
Ext.data.ScriptTagProxy.TRANS_ID = 1000;
Ext.extend(Ext.data.ScriptTagProxy, Ext.data.DataProxy, {
	timeout : 30000,
	callbackParam : "callback",
	nocache : true,
	doRequest : function(e, g, d, h, j, k, l) {
		var c = Ext.urlEncode(Ext.apply(d, this.extraParams));
		var b = this.buildUrl(e, g);
		if (!b) {
			throw new Ext.data.Api.Error("invalid-url", b)
		}
		b = Ext.urlAppend(b, c);
		if (this.nocache) {
			b = Ext.urlAppend(b, "_dc=" + (new Date().getTime()))
		}
		var a = ++Ext.data.ScriptTagProxy.TRANS_ID;
		var m = {
			id : a,
			action : e,
			cb : "stcCallback" + a,
			scriptId : "stcScript" + a,
			params : d,
			arg : l,
			url : b,
			callback : j,
			scope : k,
			reader : h
		};
		window[m.cb] = this.createCallback(e, g, m);
		b += String.format("&{0}={1}", this.callbackParam, m.cb);
		if (this.autoAbort !== false) {
			this.abort()
		}
		m.timeoutId = this.handleFailure.defer(this.timeout, this, [ m ]);
		var i = document.createElement("script");
		i.setAttribute("src", b);
		i.setAttribute("type", "text/javascript");
		i.setAttribute("id", m.scriptId);
		this.head.appendChild(i);
		this.trans = m
	},
	createCallback : function(d, b, c) {
		var a = this;
		return function(e) {
			a.trans = false;
			a.destroyTrans(c, true);
			if (d === Ext.data.Api.actions.read) {
				a.onRead.call(a, d, c, e)
			} else {
				a.onWrite.call(a, d, c, e, b)
			}
		}
	},
	onRead : function(d, c, b) {
		var a;
		try {
			a = c.reader.readRecords(b)
		} catch (g) {
			this.fireEvent("loadexception", this, c, b, g);
			this.fireEvent("exception", this, "response", d, c, b, g);
			c.callback.call(c.scope || window, null, c.arg, false);
			return
		}
		if (a.success === false) {
			this.fireEvent("loadexception", this, c, b);
			this.fireEvent("exception", this, "remote", d, c, b, null)
		} else {
			this.fireEvent("load", this, b, c.arg)
		}
		c.callback.call(c.scope || window, a, c.arg, a.success)
	},
	onWrite : function(g, d, c, b) {
		var a = d.reader;
		try {
			a.readResponse(g, c)
		} catch (h) {
			this.fireEvent("exception", this, "response", g, d, c, h);
			d.callback.call(d.scope || window, null, c, false);
			return
		}
		if (!c[a.meta.successProperty] === true) {
			this.fireEvent("exception", this, "remote", g, d, c, b);
			d.callback.call(d.scope || window, null, c, false);
			return
		}
		this.fireEvent("write", this, g, c[a.meta.root], c, b, d.arg);
		d.callback.call(d.scope || window, c[a.meta.root], c, true)
	},
	isLoading : function() {
		return this.trans ? true : false
	},
	abort : function() {
		if (this.isLoading()) {
			this.destroyTrans(this.trans)
		}
	},
	destroyTrans : function(b, a) {
		this.head.removeChild(document.getElementById(b.scriptId));
		clearTimeout(b.timeoutId);
		if (a) {
			window[b.cb] = undefined;
			try {
				delete window[b.cb]
			} catch (c) {
			}
		} else {
			window[b.cb] = function() {
				window[b.cb] = undefined;
				try {
					delete window[b.cb]
				} catch (d) {
				}
			}
		}
	},
	handleFailure : function(a) {
		this.trans = false;
		this.destroyTrans(a, false);
		if (a.action === Ext.data.Api.actions.read) {
			this.fireEvent("loadexception", this, null, a.arg)
		}
		this.fireEvent("exception", this, "response", a.action, {
			response : null,
			options : a.arg
		});
		a.callback.call(a.scope || window, null, a.arg, false)
	},
	destroy : function() {
		this.abort();
		Ext.data.ScriptTagProxy.superclass.destroy.call(this)
	}
});
Ext.data.HttpProxy = function(a) {
	Ext.data.HttpProxy.superclass.constructor.call(this, a);
	this.conn = a;
	this.conn.url = null;
	this.useAjax = !a || !a.events;
	var c = Ext.data.Api.actions;
	this.activeRequest = {};
	for ( var b in c) {
		this.activeRequest[c[b]] = undefined
	}
};
Ext.extend(Ext.data.HttpProxy, Ext.data.DataProxy, {
	getConnection : function() {
		return this.useAjax ? Ext.Ajax : this.conn
	},
	setUrl : function(a, b) {
		this.conn.url = a;
		if (b === true) {
			this.url = a;
			Ext.data.Api.prepare(this)
		}
	},
	doRequest : function(g, d, i, c, b, e, a) {
		var h = {
			method : (this.api[g]) ? this.api[g]["method"] : undefined,
			request : {
				callback : b,
				scope : e,
				arg : a
			},
			reader : c,
			callback : this.createCallback(g, d),
			scope : this
		};
		if (typeof (i[c.meta.root]) === "object") {
			h.jsonData = i
		} else {
			h.params = i || {}
		}
		if (this.conn.url === null) {
			this.conn.url = this.buildUrl(g, d)
		} else {
			if (this.restful === true && d instanceof Ext.data.Record
					&& !d.phantom) {
				this.conn.url += "/" + d.id
			}
		}
		if (this.useAjax) {
			Ext.applyIf(h, this.conn);
			if (this.activeRequest[g]) {
			}
			this.activeRequest[g] = Ext.Ajax.request(h)
		} else {
			this.conn.request(h)
		}
		this.conn.url = null
	},
	createCallback : function(b, a) {
		return function(e, d, c) {
			this.activeRequest[b] = undefined;
			if (!d) {
				if (b === Ext.data.Api.actions.read) {
					this.fireEvent("loadexception", this, e, c)
				}
				this.fireEvent("exception", this, "response", b, e, c);
				e.request.callback.call(e.request.scope, null, e.request.arg,
						false);
				return
			}
			if (b === Ext.data.Api.actions.read) {
				this.onRead(b, e, c)
			} else {
				this.onWrite(b, e, c, a)
			}
		}
	},
	onRead : function(d, h, b) {
		var a;
		try {
			a = h.reader.read(b)
		} catch (g) {
			this.fireEvent("loadexception", this, h, b, g);
			this.fireEvent("exception", this, "response", d, h, b, g);
			h.request.callback
					.call(h.request.scope, null, h.request.arg, false);
			return
		}
		if (a.success === false) {
			this.fireEvent("loadexception", this, h, b);
			var c = h.reader.readResponse(d, b);
			this.fireEvent("exception", this, "remote", d, h, c, null)
		} else {
			this.fireEvent("load", this, h, h.request.arg)
		}
		h.request.callback.call(h.request.scope, a, h.request.arg, a.success)
	},
	onWrite : function(g, i, c, b) {
		var a = i.reader;
		var d;
		try {
			d = a.readResponse(g, c)
		} catch (h) {
			this.fireEvent("exception", this, "response", g, i, c, h);
			i.request.callback
					.call(i.request.scope, null, i.request.arg, false);
			return
		}
		if (d[a.meta.successProperty] === false) {
			this.fireEvent("exception", this, "remote", g, i, d, b)
		} else {
			this.fireEvent("write", this, g, d[a.meta.root], d, b,
					i.request.arg)
		}
		i.request.callback.call(i.request.scope, d[a.meta.root], d,
				d[a.meta.successProperty])
	},
	destroy : function() {
		if (!this.useAjax) {
			this.conn.abort()
		} else {
			if (this.activeRequest) {
				var b = Ext.data.Api.actions;
				for ( var a in b) {
					if (this.activeRequest[b[a]]) {
						Ext.Ajax.abort(this.activeRequest[b[a]])
					}
				}
			}
		}
		Ext.data.HttpProxy.superclass.destroy.call(this)
	}
});
Ext.data.MemoryProxy = function(b) {
	var a = {};
	a[Ext.data.Api.actions.read] = true;
	Ext.data.MemoryProxy.superclass.constructor.call(this, {
		api : a
	});
	this.data = b
};
Ext.extend(Ext.data.MemoryProxy, Ext.data.DataProxy, {
	doRequest : function(b, c, a, d, h, i, j) {
		a = a || {};
		var k;
		try {
			k = d.readRecords(this.data)
		} catch (g) {
			this.fireEvent("loadexception", this, null, j, g);
			this.fireEvent("exception", this, "response", b, j, null, g);
			h.call(i, null, j, false);
			return
		}
		h.call(i, k, j, true)
	}
});
Ext.data.JsonWriter = function(a) {
	Ext.data.JsonWriter.superclass.constructor.call(this, a);
	if (this.returnJson != undefined) {
		this.encode = this.returnJson
	}
};
Ext.extend(Ext.data.JsonWriter, Ext.data.DataWriter, {
	returnJson : undefined,
	encode : true,
	render : function(c, a, d, b) {
		Ext.apply(d, b);
		if (this.encode === true) {
			if (Ext.isArray(a) && b[this.meta.idProperty]) {
				d[this.meta.idProperty] = Ext.encode(d[this.meta.idProperty])
			}
			d[this.meta.root] = Ext.encode(d[this.meta.root])
		}
	},
	createRecord : function(a) {
		return this.toHash(a)
	},
	updateRecord : function(a) {
		return this.toHash(a)
	},
	destroyRecord : function(a) {
		return a.id
	}
});
Ext.data.JsonReader = function(a, b) {
	a = a || {};
	Ext.applyIf(a, {
		idProperty : "id",
		successProperty : "success",
		totalProperty : "total"
	});
	Ext.data.JsonReader.superclass.constructor.call(this, a, b || a.fields)
};
Ext
		.extend(
				Ext.data.JsonReader,
				Ext.data.DataReader,
				{
					read : function(a) {
						var b = a.responseText;
						var c = Ext.decode(b);
						if (!c) {
							throw {
								message : "JsonReader.read: Json object not found"
							}
						}
						return this.readRecords(c)
					},
					onMetaChange : function(a, c, b) {
					},
					simpleAccess : function(b, a) {
						return b[a]
					},
					getJsonAccessor : function() {
						var a = /[\[\.]/;
						return function(c) {
							try {
								return (a.test(c)) ? new Function("obj",
										"return obj." + c) : function(d) {
									return d[c]
								}
							} catch (b) {
							}
							return Ext.emptyFn
						}
					}(),
					readRecords : function(a) {
						this.jsonData = a;
						if (a.metaData) {
							delete this.ef;
							this.meta = a.metaData;
							this.recordType = Ext.data.Record
									.create(a.metaData.fields);
							this.onMetaChange(this.meta, this.recordType, a)
						}
						var u = this.meta, m = this.recordType, h = m.prototype.fields, t = h.items, p = h.length, q;
						this.buildExtractors();
						var l = this.getRoot(a), k = l.length, j = k, r = true;
						if (u.totalProperty) {
							q = parseInt(this.getTotal(a), 10);
							if (!isNaN(q)) {
								j = q
							}
						}
						if (u.successProperty) {
							q = this.getSuccess(a);
							if (q === false || q === "false") {
								r = false
							}
						}
						var d = [];
						for ( var e = 0; e < k; e++) {
							var b = l[e];
							var g = new m(this.extractValues(b, t, p), this
									.getId(b));
							g.json = b;
							d[e] = g
						}
						return {
							success : r,
							records : d,
							totalRecords : j
						}
					},
					buildExtractors : function() {
						if (this.ef) {
							return
						}
						var l = this.meta, h = this.recordType, e = h.prototype.fields, k = e.items, j = e.length;
						if (l.totalProperty) {
							this.getTotal = this
									.getJsonAccessor(l.totalProperty)
						}
						if (l.successProperty) {
							this.getSuccess = this
									.getJsonAccessor(l.successProperty)
						}
						this.getRoot = l.root ? this.getJsonAccessor(l.root)
								: function(g) {
									return g
								};
						if (l.id || l.idProperty) {
							var d = this.getJsonAccessor(l.id || l.idProperty);
							this.getId = function(i) {
								var g = d(i);
								return (g === undefined || g === "") ? null : g
							}
						} else {
							this.getId = function() {
								return null
							}
						}
						var c = [];
						for ( var b = 0; b < j; b++) {
							e = k[b];
							var a = (e.mapping !== undefined && e.mapping !== null) ? e.mapping
									: e.name;
							c.push(this.getJsonAccessor(a))
						}
						this.ef = c
					},
					extractValues : function(h, d, a) {
						var g, c = {};
						for ( var e = 0; e < a; e++) {
							g = d[e];
							var b = this.ef[e](h);
							c[g.name] = g.convert((b !== undefined) ? b
									: g.defaultValue, h)
						}
						return c
					},
					readResponse : function(b, a) {
						var c = (a.responseText !== undefined) ? Ext
								.decode(a.responseText) : a;
						if (!c) {
							throw new Ext.data.JsonReader.Error("response")
						}
						if (Ext.isEmpty(c[this.meta.successProperty])) {
							throw new Ext.data.JsonReader.Error(
									"successProperty-response",
									this.meta.successProperty)
						}
						if ((b === Ext.data.Api.actions.create || b === Ext.data.Api.actions.update)) {
							if (Ext.isEmpty(c[this.meta.root])) {
								throw new Ext.data.JsonReader.Error(
										"root-emtpy", this.meta.root)
							} else {
								if (c[this.meta.root] === undefined) {
									throw new Ext.data.JsonReader.Error(
											"root-undefined-response",
											this.meta.root)
								}
							}
						}
						this.ef = this.buildExtractors();
						return c
					}
				});
Ext.data.JsonReader.Error = Ext.extend(Ext.Error, {
	constructor : function(b, a) {
		this.arg = a;
		Ext.Error.call(this, b)
	},
	name : "Ext.data.JsonReader"
});
Ext
		.apply(
				Ext.data.JsonReader.Error.prototype,
				{
					lang : {
						response : "An error occurred while json-decoding your server response",
						"successProperty-response" : 'Could not locate your "successProperty" in your server response.  Please review your JsonReader config to ensure the config-property "successProperty" matches the property in your server-response.  See the JsonReader docs.',
						"root-undefined-response" : 'Could not locate your "root" property in your server response.  Please review your JsonReader config to ensure the config-property "root" matches the property your server-response.  See the JsonReader docs.',
						"root-undefined-config" : 'Your JsonReader was configured without a "root" property.  Please review your JsonReader config and make sure to define the root property.  See the JsonReader docs.',
						"idProperty-undefined" : 'Your JsonReader was configured without an "idProperty"  Please review your JsonReader configuration and ensure the "idProperty" is set (e.g.: "id").  See the JsonReader docs.',
						"root-emtpy" : 'Data was expected to be returned by the server in the "root" property of the response.  Please review your JsonReader configuration to ensure the "root" property matches that returned in the server-response.  See JsonReader docs.'
					}
				});
Ext.data.ArrayReader = Ext
		.extend(
				Ext.data.JsonReader,
				{
					readRecords : function(q) {
						this.arrayData = q;
						var h = this.meta, d = h ? Ext.num(h.idIndex, h.id)
								: null, b = this.recordType, p = b.prototype.fields, y = [], e;
						if (!this.getRoot) {
							this.getRoot = h.root ? this
									.getJsonAccessor(h.root) : function(i) {
								return i
							};
							if (h.totalProperty) {
								this.getTotal = this
										.getJsonAccessor(h.totalProperty)
							}
						}
						var t = this.getRoot(q);
						for ( var x = 0; x < t.length; x++) {
							var r = t[x];
							var a = {};
							var m = ((d || d === 0) && r[d] !== undefined
									&& r[d] !== "" ? r[d] : null);
							for ( var w = 0, l = p.length; w < l; w++) {
								var z = p.items[w];
								var u = z.mapping !== undefined
										&& z.mapping !== null ? z.mapping : w;
								e = r[u] !== undefined ? r[u] : z.defaultValue;
								e = z.convert(e, r);
								a[z.name] = e
							}
							var c = new b(a, m);
							c.json = r;
							y[y.length] = c
						}
						var g = y.length;
						if (h.totalProperty) {
							e = parseInt(this.getTotal(q), 10);
							if (!isNaN(e)) {
								g = e
							}
						}
						return {
							records : y,
							totalRecords : g
						}
					}
				});
Ext.data.ArrayStore = Ext.extend(Ext.data.Store, {
	constructor : function(a) {
		Ext.data.ArrayStore.superclass.constructor.call(this, Ext.apply(a, {
			reader : new Ext.data.ArrayReader(a)
		}))
	},
	loadData : function(e, b) {
		if (this.expandData === true) {
			var d = [];
			for ( var c = 0, a = e.length; c < a; c++) {
				d[d.length] = [ e[c] ]
			}
			e = d
		}
		Ext.data.ArrayStore.superclass.loadData.call(this, e, b)
	}
});
Ext.reg("arraystore", Ext.data.ArrayStore);
Ext.data.SimpleStore = Ext.data.ArrayStore;
Ext.reg("simplestore", Ext.data.SimpleStore);
Ext.data.JsonStore = Ext.extend(Ext.data.Store, {
	constructor : function(a) {
		Ext.data.JsonStore.superclass.constructor.call(this, Ext.apply(a, {
			reader : new Ext.data.JsonReader(a)
		}))
	}
});
Ext.reg("jsonstore", Ext.data.JsonStore);
Ext.data.XmlWriter = Ext.extend(Ext.data.DataWriter, {
	render : function(c, a, d, b) {
	},
	createRecord : function(a) {
	},
	updateRecord : function(a) {
	},
	destroyRecord : function(a) {
	}
});
Ext.data.XmlReader = function(a, b) {
	a = a || {};
	Ext.data.XmlReader.superclass.constructor.call(this, a, b || a.fields)
};
Ext.extend(Ext.data.XmlReader, Ext.data.DataReader, {
	read : function(a) {
		var b = a.responseXML;
		if (!b) {
			throw {
				message : "XmlReader.read: XML Document not available"
			}
		}
		return this.readRecords(b)
	},
	readRecords : function(z) {
		this.xmlData = z;
		var s = z.documentElement || z;
		var l = Ext.DomQuery;
		var b = this.recordType, p = b.prototype.fields;
		var d = this.meta.idPath || this.meta.id;
		var h = 0, e = true;
		if (this.meta.totalRecords) {
			h = l.selectNumber(this.meta.totalRecords, s, 0)
		}
		if (this.meta.success) {
			var o = l.selectValue(this.meta.success, s, true);
			e = o !== false && o !== "false"
		}
		var w = [];
		var A = l.select(this.meta.record, s);
		for ( var u = 0, x = A.length; u < x; u++) {
			var r = A[u];
			var a = {};
			var m = d ? l.selectValue(d, r) : undefined;
			for ( var t = 0, k = p.length; t < k; t++) {
				var y = p.items[t];
				var g = l.selectValue(Ext.value(y.mapping, y.name, true), r,
						y.defaultValue);
				g = y.convert(g, r);
				a[y.name] = g
			}
			var c = new b(a, m);
			c.node = r;
			w[w.length] = c
		}
		return {
			success : e,
			records : w,
			totalRecords : h || w.length
		}
	},
	readResponse : Ext.emptyFn
});
Ext.data.XmlStore = Ext.extend(Ext.data.Store, {
	constructor : function(a) {
		Ext.data.XmlStore.superclass.constructor.call(this, Ext.apply(a, {
			reader : new Ext.data.XmlReader(a)
		}))
	}
});
Ext.reg("xmlstore", Ext.data.XmlStore);
Ext.data.GroupingStore = Ext
		.extend(
				Ext.data.Store,
				{
					constructor : function(a) {
						Ext.data.GroupingStore.superclass.constructor.call(
								this, a);
						this.applyGroupField()
					},
					remoteGroup : false,
					groupOnSort : false,
					groupDir : "ASC",
					clearGrouping : function() {
						this.groupField = false;
						if (this.remoteGroup) {
							if (this.baseParams) {
								delete this.baseParams.groupBy
							}
							var a = this.lastOptions;
							if (a && a.params) {
								delete a.params.groupBy
							}
							this.reload()
						} else {
							this.applySort();
							this.fireEvent("datachanged", this)
						}
					},
					groupBy : function(d, b, c) {
						c = c ? (String(c).toUpperCase() == "DESC" ? "DESC"
								: "ASC") : this.groupDir;
						if (this.groupField == d && this.groupDir == c && !b) {
							return
						}
						this.groupField = d;
						this.groupDir = c;
						this.applyGroupField();
						if (this.groupOnSort) {
							this.sort(d, c);
							return
						}
						if (this.remoteGroup) {
							this.reload()
						} else {
							var a = this.sortInfo || {};
							if (a.field != d || a.direction != c) {
								this.applySort()
							} else {
								this.sortData(d, c)
							}
							this.fireEvent("datachanged", this)
						}
					},
					applyGroupField : function() {
						if (this.remoteGroup) {
							if (!this.baseParams) {
								this.baseParams = {}
							}
							this.baseParams.groupBy = this.groupField;
							this.baseParams.groupDir = this.groupDir
						}
					},
					applySort : function() {
						Ext.data.GroupingStore.superclass.applySort.call(this);
						if (!this.groupOnSort && !this.remoteGroup) {
							var a = this.getGroupState();
							if (a
									&& (a != this.sortInfo.field || this.groupDir != this.sortInfo.direction)) {
								this.sortData(this.groupField, this.groupDir)
							}
						}
					},
					applyGrouping : function(a) {
						if (this.groupField !== false) {
							this.groupBy(this.groupField, true, this.groupDir);
							return true
						} else {
							if (a === true) {
								this.fireEvent("datachanged", this)
							}
							return false
						}
					},
					getGroupState : function() {
						return this.groupOnSort && this.groupField !== false ? (this.sortInfo ? this.sortInfo.field
								: undefined)
								: this.groupField
					}
				});
Ext.reg("groupingstore", Ext.data.GroupingStore);
Ext.data.DirectProxy = function(a) {
	Ext.apply(this, a);
	if (typeof this.paramOrder == "string") {
		this.paramOrder = this.paramOrder.split(/[\s,|]/)
	}
	Ext.data.DirectProxy.superclass.constructor.call(this, a)
};
Ext.extend(Ext.data.DirectProxy, Ext.data.DataProxy, {
	paramOrder : undefined,
	paramsAsHash : true,
	directFn : undefined,
	doRequest : function(b, c, a, e, k, l, n) {
		var j = [];
		var h = this.api[b] || this.directFn;
		switch (b) {
		case Ext.data.Api.actions.create:
			j.push(a[e.meta.root]);
			break;
		case Ext.data.Api.actions.read:
			if (this.paramOrder) {
				for ( var d = 0, g = this.paramOrder.length; d < g; d++) {
					j.push(a[this.paramOrder[d]])
				}
			} else {
				if (this.paramsAsHash) {
					j.push(a)
				}
			}
			break;
		case Ext.data.Api.actions.update:
			j.push(a[e.meta.idProperty]);
			j.push(a[e.meta.root]);
			break;
		case Ext.data.Api.actions.destroy:
			j.push(a[e.meta.root]);
			break
		}
		var m = {
			params : a || {},
			callback : k,
			scope : l,
			arg : n,
			reader : e
		};
		j.push(this.createCallback(b, c, m), this);
		h.apply(window, j)
	},
	createCallback : function(c, a, b) {
		return function(d, e) {
			if (!e.status) {
				if (c === Ext.data.Api.actions.read) {
					this.fireEvent("loadexception", this, b, e, null)
				}
				this.fireEvent("exception", this, "remote", c, b, e, null);
				b.callback.call(b.scope, null, b.arg, false);
				return
			}
			if (c === Ext.data.Api.actions.read) {
				this.onRead(c, b, d, e)
			} else {
				this.onWrite(c, b, d, e, a)
			}
		}
	},
	onRead : function(g, e, a, d) {
		var b;
		try {
			b = e.reader.readRecords(a)
		} catch (c) {
			this.fireEvent("loadexception", this, e, d, c);
			this.fireEvent("exception", this, "response", g, e, d, c);
			e.callback.call(e.scope, null, e.arg, false);
			return
		}
		this.fireEvent("load", this, d, e.arg);
		e.callback.call(e.scope, b, e.arg, true)
	},
	onWrite : function(e, d, a, c, b) {
		this.fireEvent("write", this, e, a, c, b, d.arg);
		d.callback.call(d.scope, a, c, true)
	}
});
Ext.data.DirectStore = function(a) {
	a.batchTransactions = false;
	Ext.data.DirectStore.superclass.constructor
			.call(
					this,
					Ext
							.apply(
									a,
									{
										proxy : (typeof (a.proxy) == "undefined") ? new Ext.data.DirectProxy(
												Ext
														.copyTo( {}, a,
																"paramOrder,paramsAsHash,directFn,api"))
												: a.proxy,
										reader : (typeof (a.reader) == "undefined" && typeof (a.fields) == "object") ? new Ext.data.JsonReader(
												Ext
														.copyTo( {}, a,
																"totalProperty,root,idProperty"),
												a.fields)
												: a.reader
									}))
};
Ext.extend(Ext.data.DirectStore, Ext.data.Store, {});
Ext.reg("directstore", Ext.data.DirectStore);
Ext.Direct = Ext.extend(Ext.util.Observable, {
	exceptions : {
		TRANSPORT : "xhr",
		PARSE : "parse",
		LOGIN : "login",
		SERVER : "exception"
	},
	constructor : function() {
		this.addEvents("event", "exception");
		this.transactions = {};
		this.providers = {}
	},
	addProvider : function(e) {
		var c = arguments;
		if (c.length > 1) {
			for ( var d = 0, b = c.length; d < b; d++) {
				this.addProvider(c[d])
			}
			return
		}
		if (!e.events) {
			e = new Ext.Direct.PROVIDERS[e.type](e)
		}
		e.id = e.id || Ext.id();
		this.providers[e.id] = e;
		e.on("data", this.onProviderData, this);
		e.on("exception", this.onProviderException, this);
		if (!e.isConnected()) {
			e.connect()
		}
		return e
	},
	getProvider : function(a) {
		return this.providers[a]
	},
	removeProvider : function(b) {
		var a = b.id ? b : this.providers[b.id];
		a.un("data", this.onProviderData, this);
		a.un("exception", this.onProviderException, this);
		delete this.providers[a.id];
		return a
	},
	addTransaction : function(a) {
		this.transactions[a.tid] = a;
		return a
	},
	removeTransaction : function(a) {
		delete this.transactions[a.tid || a];
		return a
	},
	getTransaction : function(a) {
		return this.transactions[a.tid || a]
	},
	onProviderData : function(d, c) {
		if (Ext.isArray(c)) {
			for ( var b = 0, a = c.length; b < a; b++) {
				this.onProviderData(d, c[b])
			}
			return
		}
		if (c.name && c.name != "event" && c.name != "exception") {
			this.fireEvent(c.name, c)
		} else {
			if (c.type == "exception") {
				this.fireEvent("exception", c)
			}
		}
		this.fireEvent("event", c, d)
	},
	createEvent : function(a, b) {
		return new Ext.Direct.eventTypes[a.type](Ext.apply(a, b))
	}
});
Ext.Direct = new Ext.Direct();
Ext.Direct.TID = 1;
Ext.Direct.PROVIDERS = {};
Ext.Direct.Transaction = function(a) {
	Ext.apply(this, a);
	this.tid = ++Ext.Direct.TID;
	this.retryCount = 0
};
Ext.Direct.Transaction.prototype = {
	send : function() {
		this.provider.queueTransaction(this)
	},
	retry : function() {
		this.retryCount++;
		this.send()
	},
	getProvider : function() {
		return this.provider
	}
};
Ext.Direct.Event = function(a) {
	Ext.apply(this, a)
};
Ext.Direct.Event.prototype = {
	status : true,
	getData : function() {
		return this.data
	}
};
Ext.Direct.RemotingEvent = Ext.extend(Ext.Direct.Event, {
	type : "rpc",
	getTransaction : function() {
		return this.transaction || Ext.Direct.getTransaction(this.tid)
	}
});
Ext.Direct.ExceptionEvent = Ext.extend(Ext.Direct.RemotingEvent, {
	status : false,
	type : "exception"
});
Ext.Direct.eventTypes = {
	rpc : Ext.Direct.RemotingEvent,
	event : Ext.Direct.Event,
	exception : Ext.Direct.ExceptionEvent
};
Ext.direct.Provider = Ext.extend(Ext.util.Observable, {
	priority : 1,
	constructor : function(a) {
		Ext.apply(this, a);
		this.addEvents("connect", "disconnect", "data", "exception");
		Ext.direct.Provider.superclass.constructor.call(this, a)
	},
	isConnected : function() {
		return false
	},
	connect : Ext.emptyFn,
	disconnect : Ext.emptyFn
});
Ext.direct.JsonProvider = Ext.extend(Ext.direct.Provider, {
	parseResponse : function(a) {
		if (!Ext.isEmpty(a.responseText)) {
			if (typeof a.responseText == "object") {
				return a.responseText
			}
			return Ext.decode(a.responseText)
		}
		return null
	},
	getEvents : function(j) {
		var g = null;
		try {
			g = this.parseResponse(j)
		} catch (h) {
			var d = new Ext.Direct.ExceptionEvent( {
				data : h,
				xhr : j,
				code : Ext.Direct.exceptions.PARSE,
				message : "Error parsing json response: \n\n " + g
			});
			return [ d ]
		}
		var c = [];
		if (Ext.isArray(g)) {
			for ( var b = 0, a = g.length; b < a; b++) {
				c.push(Ext.Direct.createEvent(g[b]))
			}
		} else {
			c.push(Ext.Direct.createEvent(g))
		}
		return c
	}
});
Ext.direct.PollingProvider = Ext.extend(Ext.direct.JsonProvider, {
	priority : 3,
	interval : 3000,
	constructor : function(a) {
		Ext.direct.PollingProvider.superclass.constructor.call(this, a);
		this.addEvents("beforepoll", "poll")
	},
	isConnected : function() {
		return !!this.pollTask
	},
	connect : function() {
		if (this.url && !this.pollTask) {
			this.pollTask = Ext.TaskMgr.start( {
				run : function() {
					if (this.fireEvent("beforepoll", this) !== false) {
						if (typeof this.url == "function") {
							this.url(this.baseParams)
						} else {
							Ext.Ajax.request( {
								url : this.url,
								callback : this.onData,
								scope : this,
								params : this.baseParams
							})
						}
					}
				},
				interval : this.interval,
				scope : this
			});
			this.fireEvent("connect", this)
		} else {
			if (!this.url) {
				throw "Error initializing PollingProvider, no url configured."
			}
		}
	},
	disconnect : function() {
		if (this.pollTask) {
			Ext.TaskMgr.stop(this.pollTask);
			delete this.pollTask;
			this.fireEvent("disconnect", this)
		}
	},
	onData : function(d, j, h) {
		if (j) {
			var c = this.getEvents(h);
			for ( var b = 0, a = c.length; b < a; b++) {
				var g = c[b];
				this.fireEvent("data", this, g)
			}
		} else {
			var g = new Ext.Direct.ExceptionEvent( {
				data : g,
				code : Ext.Direct.exceptions.TRANSPORT,
				message : "Unable to connect to the server.",
				xhr : h
			});
			this.fireEvent("data", this, g)
		}
	}
});
Ext.Direct.PROVIDERS.polling = Ext.direct.PollingProvider;
Ext.direct.RemotingProvider = Ext
		.extend(
				Ext.direct.JsonProvider,
				{
					enableBuffer : 10,
					maxRetries : 1,
					constructor : function(a) {
						Ext.direct.RemotingProvider.superclass.constructor
								.call(this, a);
						this.addEvents("beforecall", "call");
						this.namespace = (typeof this.namespace === "string") ? Ext
								.ns(this.namespace)
								: this.namespace || window;
						this.transactions = {};
						this.callBuffer = []
					},
					initAPI : function() {
						var h = this.actions;
						for ( var j in h) {
							var d = this.namespace[j]
									|| (this.namespace[j] = {});
							var e = h[j];
							for ( var g = 0, b = e.length; g < b; g++) {
								var a = e[g];
								d[a.name] = this.createMethod(j, a)
							}
						}
					},
					isConnected : function() {
						return !!this.connected
					},
					connect : function() {
						if (this.url) {
							this.initAPI();
							this.connected = true;
							this.fireEvent("connect", this)
						} else {
							if (!this.url) {
								throw "Error initializing RemotingProvider, no url configured."
							}
						}
					},
					disconnect : function() {
						if (this.connected) {
							this.connected = false;
							this.fireEvent("disconnect", this)
						}
					},
					onData : function(a, h, j) {
						if (h) {
							var k = this.getEvents(j);
							for ( var b = 0, c = k.length; b < c; b++) {
								var d = k[b];
								var l = this.getTransaction(d);
								this.fireEvent("data", this, d);
								if (l) {
									this.doCallback(l, d, true);
									Ext.Direct.removeTransaction(l)
								}
							}
						} else {
							var g = [].concat(a.ts);
							for ( var b = 0, c = g.length; b < c; b++) {
								var l = this.getTransaction(g[b]);
								if (l && l.retryCount < this.maxRetries) {
									l.retry()
								} else {
									var d = new Ext.Direct.ExceptionEvent(
											{
												data : d,
												transaction : l,
												code : Ext.Direct.exceptions.TRANSPORT,
												message : "Unable to connect to the server.",
												xhr : j
											});
									this.fireEvent("data", this, d);
									if (l) {
										this.doCallback(l, d, false);
										Ext.Direct.removeTransaction(l)
									}
								}
							}
						}
					},
					getCallData : function(a) {
						return {
							action : a.action,
							method : a.method,
							data : a.data,
							type : "rpc",
							tid : a.tid
						}
					},
					doSend : function(d) {
						var g = {
							url : this.url,
							callback : this.onData,
							scope : this,
							ts : d
						};
						var b;
						if (Ext.isArray(d)) {
							b = [];
							for ( var c = 0, a = d.length; c < a; c++) {
								b.push(this.getCallData(d[c]))
							}
						} else {
							b = this.getCallData(d)
						}
						if (this.enableUrlEncode) {
							var e = {};
							e[typeof this.enableUrlEncode == "string" ? this.enableUrlEncode
									: "data"] = Ext.encode(b);
							g.params = e
						} else {
							g.jsonData = b
						}
						Ext.Ajax.request(g)
					},
					combineAndSend : function() {
						var a = this.callBuffer.length;
						if (a > 0) {
							this.doSend(a == 1 ? this.callBuffer[0]
									: this.callBuffer);
							this.callBuffer = []
						}
					},
					queueTransaction : function(a) {
						if (a.form) {
							this.processForm(a);
							return
						}
						this.callBuffer.push(a);
						if (this.enableBuffer) {
							if (!this.callTask) {
								this.callTask = new Ext.util.DelayedTask(
										this.combineAndSend, this)
							}
							this.callTask
									.delay(typeof this.enableBuffer == "number" ? this.enableBuffer
											: 10)
						} else {
							this.combineAndSend()
						}
					},
					doCall : function(i, a, b) {
						var h = null, e = b[a.len], g = b[a.len + 1];
						if (a.len !== 0) {
							h = b.slice(0, a.len)
						}
						var d = new Ext.Direct.Transaction( {
							provider : this,
							args : b,
							action : i,
							method : a.name,
							data : h,
							cb : g && Ext.isFunction(e) ? e.createDelegate(g)
									: e
						});
						if (this.fireEvent("beforecall", this, d) !== false) {
							Ext.Direct.addTransaction(d);
							this.queueTransaction(d);
							this.fireEvent("call", this, d)
						}
					},
					doForm : function(j, b, g, i, e) {
						var d = new Ext.Direct.Transaction( {
							provider : this,
							action : j,
							method : b.name,
							args : [ g, i, e ],
							cb : e && Ext.isFunction(i) ? i.createDelegate(e)
									: i,
							isForm : true
						});
						if (this.fireEvent("beforecall", this, d) !== false) {
							Ext.Direct.addTransaction(d);
							var a = String(g.getAttribute("enctype"))
									.toLowerCase() == "multipart/form-data", h = {
								extTID : d.tid,
								extAction : j,
								extMethod : b.name,
								extType : "rpc",
								extUpload : String(a)
							};
							Ext.apply(d, {
								form : Ext.getDom(g),
								isUpload : a,
								params : i && Ext.isObject(i.params) ? Ext
										.apply(h, i.params) : h
							});
							this.fireEvent("call", this, d);
							this.processForm(d)
						}
					},
					processForm : function(a) {
						Ext.Ajax.request( {
							url : this.url,
							params : a.params,
							callback : this.onData,
							scope : this,
							form : a.form,
							isUpload : a.isUpload,
							ts : a
						})
					},
					createMethod : function(d, a) {
						var b;
						if (!a.formHandler) {
							b = function() {
								this.doCall(d, a, Array.prototype.slice.call(
										arguments, 0))
							}.createDelegate(this)
						} else {
							b = function(e, g, c) {
								this.doForm(d, a, e, g, c)
							}.createDelegate(this)
						}
						b.directCfg = {
							action : d,
							method : a
						};
						return b
					},
					getTransaction : function(a) {
						return a && a.tid ? Ext.Direct.getTransaction(a.tid)
								: null
					},
					doCallback : function(c, g) {
						var d = g.status ? "success" : "failure";
						if (c && c.cb) {
							var b = c.cb;
							var a = g.result || g.data;
							if (Ext.isFunction(b)) {
								b(a, g)
							} else {
								Ext.callback(b[d], b.scope, [ a, g ]);
								Ext.callback(b.callback, b.scope, [ a, g ])
							}
						}
					}
				});
Ext.Direct.PROVIDERS.remoting = Ext.direct.RemotingProvider;
Ext.Resizable = function(d, e) {
	this.el = Ext.get(d);
	if (e && e.wrap) {
		e.resizeChild = this.el;
		this.el = this.el.wrap(typeof e.wrap == "object" ? e.wrap : {
			cls : "xresizable-wrap"
		});
		this.el.id = this.el.dom.id = e.resizeChild.id + "-rzwrap";
		this.el.setStyle("overflow", "hidden");
		this.el.setPositioning(e.resizeChild.getPositioning());
		e.resizeChild.clearPositioning();
		if (!e.width || !e.height) {
			var g = e.resizeChild.getSize();
			this.el.setSize(g.width, g.height)
		}
		if (e.pinned && !e.adjustments) {
			e.adjustments = "auto"
		}
	}
	this.proxy = this.el.createProxy( {
		tag : "div",
		cls : "x-resizable-proxy",
		id : this.el.id + "-rzproxy"
	}, Ext.getBody());
	this.proxy.unselectable();
	this.proxy.enableDisplayMode("block");
	Ext.apply(this, e);
	if (this.pinned) {
		this.disableTrackOver = true;
		this.el.addClass("x-resizable-pinned")
	}
	var k = this.el.getStyle("position");
	if (k != "absolute" && k != "fixed") {
		this.el.setStyle("position", "relative")
	}
	if (!this.handles) {
		this.handles = "s,e,se";
		if (this.multiDirectional) {
			this.handles += ",n,w"
		}
	}
	if (this.handles == "all") {
		this.handles = "n s e w ne nw se sw"
	}
	var o = this.handles.split(/\s*?[,;]\s*?| /);
	var c = Ext.Resizable.positions;
	for ( var j = 0, l = o.length; j < l; j++) {
		if (o[j] && c[o[j]]) {
			var n = c[o[j]];
			this[n] = new Ext.Resizable.Handle(this, n, this.disableTrackOver,
					this.transparent)
		}
	}
	this.corner = this.southeast;
	if (this.handles.indexOf("n") != -1 || this.handles.indexOf("w") != -1) {
		this.updateBox = true
	}
	this.activeHandle = null;
	if (this.resizeChild) {
		if (typeof this.resizeChild == "boolean") {
			this.resizeChild = Ext.get(this.el.dom.firstChild, true)
		} else {
			this.resizeChild = Ext.get(this.resizeChild, true)
		}
	}
	if (this.adjustments == "auto") {
		var b = this.resizeChild;
		var m = this.west, h = this.east, a = this.north, o = this.south;
		if (b && (m || a)) {
			b.position("relative");
			b.setLeft(m ? m.el.getWidth() : 0);
			b.setTop(a ? a.el.getHeight() : 0)
		}
		this.adjustments = [
				(h ? -h.el.getWidth() : 0) + (m ? -m.el.getWidth() : 0),
				(a ? -a.el.getHeight() : 0) + (o ? -o.el.getHeight() : 0) - 1 ]
	}
	if (this.draggable) {
		this.dd = this.dynamic ? this.el.initDD(null) : this.el.initDDProxy(
				null, {
					dragElId : this.proxy.id
				});
		this.dd.setHandleElId(this.resizeChild ? this.resizeChild.id
				: this.el.id)
	}
	this.addEvents("beforeresize", "resize");
	if (this.width !== null && this.height !== null) {
		this.resizeTo(this.width, this.height)
	} else {
		this.updateChildSize()
	}
	if (Ext.isIE) {
		this.el.dom.style.zoom = 1
	}
	Ext.Resizable.superclass.constructor.call(this)
};
Ext
		.extend(
				Ext.Resizable,
				Ext.util.Observable,
				{
					adjustments : [ 0, 0 ],
					animate : false,
					disableTrackOver : false,
					draggable : false,
					duration : 0.35,
					dynamic : false,
					easing : "easeOutStrong",
					enabled : true,
					handles : false,
					multiDirectional : false,
					height : null,
					width : null,
					heightIncrement : 0,
					widthIncrement : 0,
					minHeight : 5,
					minWidth : 5,
					maxHeight : 10000,
					maxWidth : 10000,
					minX : 0,
					minY : 0,
					pinned : false,
					preserveRatio : false,
					resizeChild : false,
					transparent : false,
					resizeTo : function(b, a) {
						this.el.setSize(b, a);
						this.updateChildSize();
						this.fireEvent("resize", this, b, a, null)
					},
					startSizing : function(c, b) {
						this.fireEvent("beforeresize", this, c);
						if (this.enabled) {
							if (!this.overlay) {
								this.overlay = this.el.createProxy( {
									tag : "div",
									cls : "x-resizable-overlay",
									html : "&#160;"
								}, Ext.getBody());
								this.overlay.unselectable();
								this.overlay.enableDisplayMode("block");
								this.overlay.on( {
									scope : this,
									mousemove : this.onMouseMove,
									mouseup : this.onMouseUp
								})
							}
							this.overlay.setStyle("cursor", b.el
									.getStyle("cursor"));
							this.resizing = true;
							this.startBox = this.el.getBox();
							this.startPoint = c.getXY();
							this.offsets = [
									(this.startBox.x + this.startBox.width)
											- this.startPoint[0],
									(this.startBox.y + this.startBox.height)
											- this.startPoint[1] ];
							this.overlay.setSize(
									Ext.lib.Dom.getViewWidth(true), Ext.lib.Dom
											.getViewHeight(true));
							this.overlay.show();
							if (this.constrainTo) {
								var a = Ext.get(this.constrainTo);
								this.resizeRegion = a.getRegion().adjust(
										a.getFrameWidth("t"),
										a.getFrameWidth("l"),
										-a.getFrameWidth("b"),
										-a.getFrameWidth("r"))
							}
							this.proxy.setStyle("visibility", "hidden");
							this.proxy.show();
							this.proxy.setBox(this.startBox);
							if (!this.dynamic) {
								this.proxy.setStyle("visibility", "visible")
							}
						}
					},
					onMouseDown : function(a, b) {
						if (this.enabled) {
							b.stopEvent();
							this.activeHandle = a;
							this.startSizing(b, a)
						}
					},
					onMouseUp : function(b) {
						this.activeHandle = null;
						var a = this.resizeElement();
						this.resizing = false;
						this.handleOut();
						this.overlay.hide();
						this.proxy.hide();
						this.fireEvent("resize", this, a.width, a.height, b)
					},
					updateChildSize : function() {
						if (this.resizeChild) {
							var d = this.el;
							var e = this.resizeChild;
							var c = this.adjustments;
							if (d.dom.offsetWidth) {
								var a = d.getSize(true);
								e.setSize(a.width + c[0], a.height + c[1])
							}
							if (Ext.isIE) {
								setTimeout( function() {
									if (d.dom.offsetWidth) {
										var g = d.getSize(true);
										e.setSize(g.width + c[0], g.height
												+ c[1])
									}
								}, 10)
							}
						}
					},
					snap : function(c, e, b) {
						if (!e || !c) {
							return c
						}
						var d = c;
						var a = c % e;
						if (a > 0) {
							if (a > (e / 2)) {
								d = c + (e - a)
							} else {
								d = c - a
							}
						}
						return Math.max(b, d)
					},
					resizeElement : function() {
						var a = this.proxy.getBox();
						if (this.updateBox) {
							this.el.setBox(a, false, this.animate,
									this.duration, null, this.easing)
						} else {
							this.el.setSize(a.width, a.height, this.animate,
									this.duration, null, this.easing)
						}
						this.updateChildSize();
						if (!this.dynamic) {
							this.proxy.hide()
						}
						return a
					},
					constrain : function(b, c, a, d) {
						if (b - c < a) {
							c = b - a
						} else {
							if (b - c > d) {
								c = b - d
							}
						}
						return c
					},
					onMouseMove : function(z) {
						if (this.enabled && this.activeHandle) {
							try {
								if (this.resizeRegion
										&& !this.resizeRegion.contains(z
												.getPoint())) {
									return
								}
								var t = this.curSize || this.startBox, l = this.startBox.x, k = this.startBox.y, c = l, b = k, m = t.width, u = t.height, d = m, o = u, n = this.minWidth, A = this.minHeight, s = this.maxWidth, D = this.maxHeight, i = this.widthIncrement, a = this.heightIncrement, B = z
										.getXY(), r = -(this.startPoint[0] - Math
										.max(this.minX, B[0])), p = -(this.startPoint[1] - Math
										.max(this.minY, B[1])), j = this.activeHandle.position, E, g;
								switch (j) {
								case "east":
									m += r;
									m = Math.min(Math.max(n, m), s);
									break;
								case "south":
									u += p;
									u = Math.min(Math.max(A, u), D);
									break;
								case "southeast":
									m += r;
									u += p;
									m = Math.min(Math.max(n, m), s);
									u = Math.min(Math.max(A, u), D);
									break;
								case "north":
									p = this.constrain(u, p, A, D);
									k += p;
									u -= p;
									break;
								case "west":
									r = this.constrain(m, r, n, s);
									l += r;
									m -= r;
									break;
								case "northeast":
									m += r;
									m = Math.min(Math.max(n, m), s);
									p = this.constrain(u, p, A, D);
									k += p;
									u -= p;
									break;
								case "northwest":
									r = this.constrain(m, r, n, s);
									p = this.constrain(u, p, A, D);
									k += p;
									u -= p;
									l += r;
									m -= r;
									break;
								case "southwest":
									r = this.constrain(m, r, n, s);
									u += p;
									u = Math.min(Math.max(A, u), D);
									l += r;
									m -= r;
									break
								}
								var q = this.snap(m, i, n);
								var C = this.snap(u, a, A);
								if (q != m || C != u) {
									switch (j) {
									case "northeast":
										k -= C - u;
										break;
									case "north":
										k -= C - u;
										break;
									case "southwest":
										l -= q - m;
										break;
									case "west":
										l -= q - m;
										break;
									case "northwest":
										l -= q - m;
										k -= C - u;
										break
									}
									m = q;
									u = C
								}
								if (this.preserveRatio) {
									switch (j) {
									case "southeast":
									case "east":
										u = o * (m / d);
										u = Math.min(Math.max(A, u), D);
										m = d * (u / o);
										break;
									case "south":
										m = d * (u / o);
										m = Math.min(Math.max(n, m), s);
										u = o * (m / d);
										break;
									case "northeast":
										m = d * (u / o);
										m = Math.min(Math.max(n, m), s);
										u = o * (m / d);
										break;
									case "north":
										E = m;
										m = d * (u / o);
										m = Math.min(Math.max(n, m), s);
										u = o * (m / d);
										l += (E - m) / 2;
										break;
									case "southwest":
										u = o * (m / d);
										u = Math.min(Math.max(A, u), D);
										E = m;
										m = d * (u / o);
										l += E - m;
										break;
									case "west":
										g = u;
										u = o * (m / d);
										u = Math.min(Math.max(A, u), D);
										k += (g - u) / 2;
										E = m;
										m = d * (u / o);
										l += E - m;
										break;
									case "northwest":
										E = m;
										g = u;
										u = o * (m / d);
										u = Math.min(Math.max(A, u), D);
										m = d * (u / o);
										k += g - u;
										l += E - m;
										break
									}
								}
								this.proxy.setBounds(l, k, m, u);
								if (this.dynamic) {
									this.resizeElement()
								}
							} catch (v) {
							}
						}
					},
					handleOver : function() {
						if (this.enabled) {
							this.el.addClass("x-resizable-over")
						}
					},
					handleOut : function() {
						if (!this.resizing) {
							this.el.removeClass("x-resizable-over")
						}
					},
					getEl : function() {
						return this.el
					},
					getResizeChild : function() {
						return this.resizeChild
					},
					destroy : function(b) {
						Ext.destroy(this.dd, this.overlay, this.proxy);
						this.overlay = null;
						this.proxy = null;
						var c = Ext.Resizable.positions;
						for ( var a in c) {
							if (typeof c[a] != "function" && this[c[a]]) {
								this[c[a]].destroy()
							}
						}
						if (b) {
							this.el.update("");
							Ext.destroy(this.el);
							this.el = null
						}
						this.purgeListeners()
					},
					syncHandleHeight : function() {
						var a = this.el.getHeight(true);
						if (this.west) {
							this.west.el.setHeight(a)
						}
						if (this.east) {
							this.east.el.setHeight(a)
						}
					}
				});
Ext.Resizable.positions = {
	n : "north",
	s : "south",
	e : "east",
	w : "west",
	se : "southeast",
	sw : "southwest",
	nw : "northwest",
	ne : "northeast"
};
Ext.Resizable.Handle = function(c, e, b, d) {
	if (!this.tpl) {
		var a = Ext.DomHelper.createTemplate( {
			tag : "div",
			cls : "x-resizable-handle x-resizable-handle-{0}"
		});
		a.compile();
		Ext.Resizable.Handle.prototype.tpl = a
	}
	this.position = e;
	this.rz = c;
	this.el = this.tpl.append(c.el.dom, [ this.position ], true);
	this.el.unselectable();
	if (d) {
		this.el.setOpacity(0)
	}
	this.el.on("mousedown", this.onMouseDown, this);
	if (!b) {
		this.el.on( {
			scope : this,
			mouseover : this.onMouseOver,
			mouseout : this.onMouseOut
		})
	}
};
Ext.Resizable.Handle.prototype = {
	afterResize : function(a) {
	},
	onMouseDown : function(a) {
		this.rz.onMouseDown(this, a)
	},
	onMouseOver : function(a) {
		this.rz.handleOver(this, a)
	},
	onMouseOut : function(a) {
		this.rz.handleOut(this, a)
	},
	destroy : function() {
		Ext.destroy(this.el);
		this.el = null
	}
};
Ext.Window = Ext.extend(Ext.Panel, {
	baseCls : "x-window",
	resizable : true,
	draggable : true,
	closable : true,
	closeAction : "close",
	constrain : false,
	constrainHeader : false,
	plain : false,
	minimizable : false,
	maximizable : false,
	minHeight : 100,
	minWidth : 200,
	expandOnShow : true,
	collapsible : false,
	initHidden : true,
	monitorResize : true,
	elements : "header,body",
	frame : true,
	floating : true,
	initComponent : function() {
		Ext.Window.superclass.initComponent.call(this);
		this.addEvents("resize", "maximize", "minimize", "restore");
		if (this.initHidden === false) {
			this.show()
		} else {
			this.hidden = true
		}
	},
	getState : function() {
		return Ext.apply(Ext.Window.superclass.getState.call(this) || {}, this
				.getBox(true))
	},
	onRender : function(b, a) {
		Ext.Window.superclass.onRender.call(this, b, a);
		if (this.plain) {
			this.el.addClass("x-window-plain")
		}
		this.focusEl = this.el.createChild( {
			tag : "a",
			href : "#",
			cls : "x-dlg-focus",
			tabIndex : "-1",
			html : "&#160;"
		});
		this.focusEl.swallowEvent("click", true);
		this.proxy = this.el.createProxy("x-window-proxy");
		this.proxy.enableDisplayMode("block");
		if (this.modal) {
			this.mask = this.container.createChild( {
				cls : "ext-el-mask"
			}, this.el.dom);
			this.mask.enableDisplayMode("block");
			this.mask.hide();
			this.mon(this.mask, "click", this.focus, this)
		}
		this.initTools()
	},
	initEvents : function() {
		Ext.Window.superclass.initEvents.call(this);
		if (this.animateTarget) {
			this.setAnimateTarget(this.animateTarget)
		}
		if (this.resizable) {
			this.resizer = new Ext.Resizable(this.el, {
				minWidth : this.minWidth,
				minHeight : this.minHeight,
				handles : this.resizeHandles || "all",
				pinned : true,
				resizeElement : this.resizerAction
			});
			this.resizer.window = this;
			this.mon(this.resizer, "beforeresize", this.beforeResize, this)
		}
		if (this.draggable) {
			this.header.addClass("x-window-draggable")
		}
		this.mon(this.el, "mousedown", this.toFront, this);
		this.manager = this.manager || Ext.WindowMgr;
		this.manager.register(this);
		if (this.maximized) {
			this.maximized = false;
			this.maximize()
		}
		if (this.closable) {
			var a = this.getKeyMap();
			a.on(27, this.onEsc, this);
			a.disable()
		}
	},
	initDraggable : function() {
		this.dd = new Ext.Window.DD(this)
	},
	onEsc : function() {
		this[this.closeAction]()
	},
	beforeDestroy : function() {
		if (this.rendered) {
			this.hide();
			if (this.doAnchor) {
				Ext.EventManager.removeResizeListener(this.doAnchor, this);
				Ext.EventManager.un(window, "scroll", this.doAnchor, this)
			}
			Ext.destroy(this.focusEl, this.resizer, this.dd, this.proxy,
					this.mask)
		}
		Ext.Window.superclass.beforeDestroy.call(this)
	},
	onDestroy : function() {
		if (this.manager) {
			this.manager.unregister(this)
		}
		Ext.Window.superclass.onDestroy.call(this)
	},
	initTools : function() {
		if (this.minimizable) {
			this.addTool( {
				id : "minimize",
				handler : this.minimize.createDelegate(this, [])
			})
		}
		if (this.maximizable) {
			this.addTool( {
				id : "maximize",
				handler : this.maximize.createDelegate(this, [])
			});
			this.addTool( {
				id : "restore",
				handler : this.restore.createDelegate(this, []),
				hidden : true
			});
			this.mon(this.header, "dblclick", this.toggleMaximize, this)
		}
		if (this.closable) {
			this.addTool( {
				id : "close",
				handler : this[this.closeAction].createDelegate(this, [])
			})
		}
	},
	resizerAction : function() {
		var a = this.proxy.getBox();
		this.proxy.hide();
		this.window.handleResize(a);
		return a
	},
	beforeResize : function() {
		this.resizer.minHeight = Math.max(this.minHeight,
				this.getFrameHeight() + 40);
		this.resizer.minWidth = Math.max(this.minWidth,
				this.getFrameWidth() + 40);
		this.resizeBox = this.el.getBox()
	},
	updateHandles : function() {
		if (Ext.isIE && this.resizer) {
			this.resizer.syncHandleHeight();
			this.el.repaint()
		}
	},
	handleResize : function(b) {
		var a = this.resizeBox;
		if (a.x != b.x || a.y != b.y) {
			this.updateBox(b)
		} else {
			this.setSize(b)
		}
		this.focus();
		this.updateHandles();
		this.saveState();
		this.doLayout();
		this.fireEvent("resize", this, b.width, b.height)
	},
	focus : function() {
		var c = this.focusEl, a = this.defaultButton, b = typeof a;
		if (b != "undefined") {
			if (b == "number" && this.fbar) {
				c = this.fbar.items.get(a)
			} else {
				if (b == "string") {
					c = Ext.getCmp(a)
				} else {
					c = a
				}
			}
		}
		c = c || this.focusEl;
		c.focus.defer(10, c)
	},
	setAnimateTarget : function(a) {
		a = Ext.get(a);
		this.animateTarget = a
	},
	beforeShow : function() {
		delete this.el.lastXY;
		delete this.el.lastLT;
		if (this.x === undefined || this.y === undefined) {
			var a = this.el.getAlignToXY(this.container, "c-c");
			var b = this.el.translatePoints(a[0], a[1]);
			this.x = this.x === undefined ? b.left : this.x;
			this.y = this.y === undefined ? b.top : this.y
		}
		this.el.setLeftTop(this.x, this.y);
		if (this.expandOnShow) {
			this.expand(false)
		}
		if (this.modal) {
			Ext.getBody().addClass("x-body-masked");
			this.mask.setSize(Ext.lib.Dom.getViewWidth(true), Ext.lib.Dom
					.getViewHeight(true));
			this.mask.show()
		}
	},
	show : function(c, a, b) {
		if (!this.rendered) {
			this.render(Ext.getBody())
		}
		if (this.hidden === false) {
			this.toFront();
			return this
		}
		if (this.fireEvent("beforeshow", this) === false) {
			return this
		}
		if (a) {
			this.on("show", a, b, {
				single : true
			})
		}
		this.hidden = false;
		if (c !== undefined) {
			this.setAnimateTarget(c)
		}
		this.beforeShow();
		if (this.animateTarget) {
			this.animShow()
		} else {
			this.afterShow()
		}
		return this
	},
	afterShow : function(b) {
		this.proxy.hide();
		this.el.setStyle("display", "block");
		this.el.show();
		if (this.maximized) {
			this.fitContainer()
		}
		if (Ext.isMac && Ext.isGecko) {
			this.cascade(this.setAutoScroll)
		}
		if (this.monitorResize || this.modal || this.constrain
				|| this.constrainHeader) {
			Ext.EventManager.onWindowResize(this.onWindowResize, this)
		}
		this.doConstrain();
		this.doLayout();
		if (this.keyMap) {
			this.keyMap.enable()
		}
		this.toFront();
		this.updateHandles();
		if (b && (Ext.isIE || Ext.isWebKit)) {
			var a = this.getSize();
			this.onResize(a.width, a.height)
		}
		this.fireEvent("show", this)
	},
	animShow : function() {
		this.proxy.show();
		this.proxy.setBox(this.animateTarget.getBox());
		this.proxy.setOpacity(0);
		var a = this.getBox(false);
		a.callback = this.afterShow.createDelegate(this, [ true ], false);
		a.scope = this;
		a.duration = 0.25;
		a.easing = "easeNone";
		a.opacity = 0.5;
		a.block = true;
		this.el.setStyle("display", "none");
		this.proxy.shift(a)
	},
	hide : function(c, a, b) {
		if (this.hidden || this.fireEvent("beforehide", this) === false) {
			return this
		}
		if (a) {
			this.on("hide", a, b, {
				single : true
			})
		}
		this.hidden = true;
		if (c !== undefined) {
			this.setAnimateTarget(c)
		}
		if (this.modal) {
			this.mask.hide();
			Ext.getBody().removeClass("x-body-masked")
		}
		if (this.animateTarget) {
			this.animHide()
		} else {
			this.el.hide();
			this.afterHide()
		}
		return this
	},
	afterHide : function() {
		this.proxy.hide();
		if (this.monitorResize || this.modal || this.constrain
				|| this.constrainHeader) {
			Ext.EventManager.removeResizeListener(this.onWindowResize, this)
		}
		if (this.keyMap) {
			this.keyMap.disable()
		}
		this.fireEvent("hide", this)
	},
	animHide : function() {
		this.proxy.setOpacity(0.5);
		this.proxy.show();
		var c = this.getBox(false);
		this.proxy.setBox(c);
		this.el.hide();
		var a = this.animateTarget.getBox();
		a.callback = this.afterHide;
		a.scope = this;
		a.duration = 0.25;
		a.easing = "easeNone";
		a.block = true;
		a.opacity = 0;
		this.proxy.shift(a)
	},
	onWindowResize : function() {
		if (this.maximized) {
			this.fitContainer()
		}
		if (this.modal) {
			this.mask.setSize("100%", "100%");
			var a = this.mask.dom.offsetHeight;
			this.mask.setSize(Ext.lib.Dom.getViewWidth(true), Ext.lib.Dom
					.getViewHeight(true))
		}
		this.doConstrain()
	},
	doConstrain : function() {
		if (this.constrain || this.constrainHeader) {
			var b;
			if (this.constrain) {
				b = {
					right : this.el.shadowOffset,
					left : this.el.shadowOffset,
					bottom : this.el.shadowOffset
				}
			} else {
				var a = this.getSize();
				b = {
					right : -(a.width - 100),
					bottom : -(a.height - 25)
				}
			}
			var c = this.el.getConstrainToXY(this.container, true, b);
			if (c) {
				this.setPosition(c[0], c[1])
			}
		}
	},
	ghost : function(a) {
		var c = this.createGhost(a);
		var b = this.getBox(true);
		c.setLeftTop(b.x, b.y);
		c.setWidth(b.width);
		this.el.hide();
		this.activeGhost = c;
		return c
	},
	unghost : function(b, a) {
		if (!this.activeGhost) {
			return
		}
		if (b !== false) {
			this.el.show();
			this.focus();
			if (Ext.isMac && Ext.isGecko) {
				this.cascade(this.setAutoScroll)
			}
		}
		if (a !== false) {
			this.setPosition(this.activeGhost.getLeft(true), this.activeGhost
					.getTop(true))
		}
		this.activeGhost.hide();
		this.activeGhost.remove();
		delete this.activeGhost
	},
	minimize : function() {
		this.fireEvent("minimize", this);
		return this
	},
	close : function() {
		if (this.fireEvent("beforeclose", this) !== false) {
			this.hide(null, function() {
				this.fireEvent("close", this);
				this.destroy()
			}, this)
		}
	},
	maximize : function() {
		if (!this.maximized) {
			this.expand(false);
			this.restoreSize = this.getSize();
			this.restorePos = this.getPosition(true);
			if (this.maximizable) {
				this.tools.maximize.hide();
				this.tools.restore.show()
			}
			this.maximized = true;
			this.el.disableShadow();
			if (this.dd) {
				this.dd.lock()
			}
			if (this.collapsible) {
				this.tools.toggle.hide()
			}
			this.el.addClass("x-window-maximized");
			this.container.addClass("x-window-maximized-ct");
			this.setPosition(0, 0);
			this.fitContainer();
			this.fireEvent("maximize", this)
		}
		return this
	},
	restore : function() {
		if (this.maximized) {
			this.el.removeClass("x-window-maximized");
			this.tools.restore.hide();
			this.tools.maximize.show();
			this.setPosition(this.restorePos[0], this.restorePos[1]);
			this.setSize(this.restoreSize.width, this.restoreSize.height);
			delete this.restorePos;
			delete this.restoreSize;
			this.maximized = false;
			this.el.enableShadow(true);
			if (this.dd) {
				this.dd.unlock()
			}
			if (this.collapsible) {
				this.tools.toggle.show()
			}
			this.container.removeClass("x-window-maximized-ct");
			this.doConstrain();
			this.fireEvent("restore", this)
		}
		return this
	},
	toggleMaximize : function() {
		return this[this.maximized ? "restore" : "maximize"]()
	},
	fitContainer : function() {
		var a = this.container.getViewSize();
		this.setSize(a.width, a.height)
	},
	setZIndex : function(a) {
		if (this.modal) {
			this.mask.setStyle("z-index", a)
		}
		this.el.setZIndex(++a);
		a += 5;
		if (this.resizer) {
			this.resizer.proxy.setStyle("z-index", ++a)
		}
		this.lastZIndex = a
	},
	alignTo : function(b, a, c) {
		var d = this.el.getAlignToXY(b, a, c);
		this.setPagePosition(d[0], d[1]);
		return this
	},
	anchorTo : function(c, e, d, b) {
		if (this.doAnchor) {
			Ext.EventManager.removeResizeListener(this.doAnchor, this);
			Ext.EventManager.un(window, "scroll", this.doAnchor, this)
		}
		this.doAnchor = function() {
			this.alignTo(c, e, d)
		};
		Ext.EventManager.onWindowResize(this.doAnchor, this);
		var a = typeof b;
		if (a != "undefined") {
			Ext.EventManager.on(window, "scroll", this.doAnchor, this, {
				buffer : a == "number" ? b : 50
			})
		}
		this.doAnchor();
		return this
	},
	toFront : function(a) {
		if (this.manager.bringToFront(this)) {
			if (!a || !a.getTarget().focus) {
				this.focus()
			}
		}
		return this
	},
	setActive : function(a) {
		if (a) {
			if (!this.maximized) {
				this.el.enableShadow(true)
			}
			this.fireEvent("activate", this)
		} else {
			this.el.disableShadow();
			this.fireEvent("deactivate", this)
		}
	},
	toBack : function() {
		this.manager.sendToBack(this);
		return this
	},
	center : function() {
		var a = this.el.getAlignToXY(this.container, "c-c");
		this.setPagePosition(a[0], a[1]);
		return this
	}
});
Ext.reg("window", Ext.Window);
Ext.Window.DD = function(a) {
	this.win = a;
	Ext.Window.DD.superclass.constructor
			.call(this, a.el.id, "WindowDD-" + a.id);
	this.setHandleElId(a.header.id);
	this.scroll = false
};
Ext.extend(Ext.Window.DD, Ext.dd.DD, {
	moveOnly : true,
	headerOffsets : [ 100, 25 ],
	startDrag : function() {
		var a = this.win;
		this.proxy = a.ghost();
		if (a.constrain !== false) {
			var c = a.el.shadowOffset;
			this.constrainTo(a.container, {
				right : c,
				left : c,
				bottom : c
			})
		} else {
			if (a.constrainHeader !== false) {
				var b = this.proxy.getSize();
				this.constrainTo(a.container, {
					right : -(b.width - this.headerOffsets[0]),
					bottom : -(b.height - this.headerOffsets[1])
				})
			}
		}
	},
	b4Drag : Ext.emptyFn,
	onDrag : function(a) {
		this.alignElWithMouse(this.proxy, a.getPageX(), a.getPageY())
	},
	endDrag : function(a) {
		this.win.unghost();
		this.win.saveState()
	}
});
Ext.WindowGroup = function() {
	var g = {};
	var d = [];
	var e = null;
	var c = function(j, i) {
		return (!j._lastAccess || j._lastAccess < i._lastAccess) ? -1 : 1
	};
	var h = function() {
		var l = d, j = l.length;
		if (j > 0) {
			l.sort(c);
			var k = l[0].manager.zseed;
			for ( var m = 0; m < j; m++) {
				var n = l[m];
				if (n && !n.hidden) {
					n.setZIndex(k + (m * 10))
				}
			}
		}
		a()
	};
	var b = function(i) {
		if (i != e) {
			if (e) {
				e.setActive(false)
			}
			e = i;
			if (i) {
				i.setActive(true)
			}
		}
	};
	var a = function() {
		for ( var j = d.length - 1; j >= 0; --j) {
			if (!d[j].hidden) {
				b(d[j]);
				return
			}
		}
		b(null)
	};
	return {
		zseed : 9000,
		register : function(i) {
			g[i.id] = i;
			d.push(i);
			i.on("hide", a)
		},
		unregister : function(i) {
			delete g[i.id];
			i.un("hide", a);
			d.remove(i)
		},
		get : function(i) {
			return typeof i == "object" ? i : g[i]
		},
		bringToFront : function(i) {
			i = this.get(i);
			if (i != e) {
				i._lastAccess = new Date().getTime();
				h();
				return true
			}
			return false
		},
		sendToBack : function(i) {
			i = this.get(i);
			i._lastAccess = -(new Date().getTime());
			h();
			return i
		},
		hideAll : function() {
			for ( var i in g) {
				if (g[i] && typeof g[i] != "function" && g[i].isVisible()) {
					g[i].hide()
				}
			}
		},
		getActive : function() {
			return e
		},
		getBy : function(l, k) {
			var m = [];
			for ( var j = d.length - 1; j >= 0; --j) {
				var n = d[j];
				if (l.call(k || n, n) !== false) {
					m.push(n)
				}
			}
			return m
		},
		each : function(j, i) {
			for ( var k in g) {
				if (g[k] && typeof g[k] != "function") {
					if (j.call(i || g[k], g[k]) === false) {
						return
					}
				}
			}
		}
	}
};
Ext.WindowMgr = new Ext.WindowGroup();
Ext.MessageBox = function() {
	var s, b, o, r;
	var h, k, q, a, l, n, i, g;
	var p, t, m, c = "";
	var d = function(v) {
		if (s.isVisible()) {
			s.hide();
			u();
			Ext.callback(b.fn, b.scope || window, [ v, t.dom.value, b ], 1)
		}
	};
	var u = function() {
		if (b && b.cls) {
			s.el.removeClass(b.cls)
		}
		l.reset()
	};
	var e = function(x, v, w) {
		if (b && b.closable !== false) {
			s.hide();
			u()
		}
		if (w) {
			w.stopEvent()
		}
	};
	var j = function(v) {
		var x = 0;
		if (!v) {
			p.ok.hide();
			p.cancel.hide();
			p.yes.hide();
			p.no.hide();
			return x
		}
		s.footer.dom.style.display = "";
		for ( var w in p) {
			if (typeof p[w] != "function") {
				if (v[w]) {
					p[w].show();
					p[w].setText(typeof v[w] == "string" ? v[w]
							: Ext.MessageBox.buttonText[w]);
					x += p[w].el.getWidth() + 15
				} else {
					p[w].hide()
				}
			}
		}
		return x
	};
	return {
		getDialog : function(v) {
			if (!s) {
				s = new Ext.Window(
						{
							autoCreate : true,
							title : v,
							resizable : false,
							constrain : true,
							constrainHeader : true,
							minimizable : false,
							maximizable : false,
							stateful : false,
							modal : true,
							shim : true,
							buttonAlign : "center",
							width : 400,
							height : 100,
							minHeight : 80,
							plain : true,
							footer : true,
							closable : true,
							close : function() {
								if (b && b.buttons && b.buttons.no
										&& !b.buttons.cancel) {
									d("no")
								} else {
									d("cancel")
								}
							}
						});
				p = {};
				var w = this.buttonText;
				p.ok = s.addButton(w.ok, d.createCallback("ok"));
				p.yes = s.addButton(w.yes, d.createCallback("yes"));
				p.no = s.addButton(w.no, d.createCallback("no"));
				p.cancel = s.addButton(w.cancel, d.createCallback("cancel"));
				p.ok.hideMode = p.yes.hideMode = p.no.hideMode = p.cancel.hideMode = "offsets";
				s.render(document.body);
				s.getEl().addClass("x-window-dlg");
				o = s.mask;
				h = s.body
						.createChild( {
							html : '<div class="ext-mb-icon"></div><div class="ext-mb-content"><span class="ext-mb-text"></span><br /><div class="ext-mb-fix-cursor"><input type="text" class="ext-mb-input" /><textarea class="ext-mb-textarea"></textarea></div></div>'
						});
				i = Ext.get(h.dom.firstChild);
				var x = h.dom.childNodes[1];
				k = Ext.get(x.firstChild);
				q = Ext.get(x.childNodes[2].firstChild);
				q.enableDisplayMode();
				q.addKeyListener( [ 10, 13 ], function() {
					if (s.isVisible() && b && b.buttons) {
						if (b.buttons.ok) {
							d("ok")
						} else {
							if (b.buttons.yes) {
								d("yes")
							}
						}
					}
				});
				a = Ext.get(x.childNodes[2].childNodes[1]);
				a.enableDisplayMode();
				l = new Ext.ProgressBar( {
					renderTo : h
				});
				h.createChild( {
					cls : "x-clear"
				})
			}
			return s
		},
		updateText : function(z) {
			if (!s.isVisible() && !b.width) {
				s.setSize(this.maxWidth, 100)
			}
			k.update(z || "&#160;");
			var x = c != "" ? (i.getWidth() + i.getMargins("lr")) : 0;
			var B = k.getWidth() + k.getMargins("lr");
			var y = s.getFrameWidth("lr");
			var A = s.body.getFrameWidth("lr");
			if (Ext.isIE && x > 0) {
				x += 3
			}
			var v = Math.max(Math.min(b.width || x + B + y + A, this.maxWidth),
					Math.max(b.minWidth || this.minWidth, m || 0));
			if (b.prompt === true) {
				t.setWidth(v - x - y - A)
			}
			if (b.progress === true || b.wait === true) {
				l.setSize(v - x - y - A)
			}
			if (Ext.isIE && v == m) {
				v += 4
			}
			s.setSize(v, "auto").center();
			return this
		},
		updateProgress : function(w, v, x) {
			l.updateProgress(w, v);
			if (x) {
				this.updateText(x)
			}
			return this
		},
		isVisible : function() {
			return s && s.isVisible()
		},
		hide : function() {
			var v = s ? s.activeGhost : null;
			if (this.isVisible() || v) {
				s.hide();
				u();
				if (v) {
					s.unghost(false, false)
				}
			}
			return this
		},
		show : function(y) {
			if (this.isVisible()) {
				this.hide()
			}
			b = y;
			var z = this.getDialog(b.title || "&#160;");
			z.setTitle(b.title || "&#160;");
			var v = (b.closable !== false && b.progress !== true && b.wait !== true);
			z.tools.close.setDisplayed(v);
			t = q;
			b.prompt = b.prompt || (b.multiline ? true : false);
			if (b.prompt) {
				if (b.multiline) {
					q.hide();
					a.show();
					a.setHeight(typeof b.multiline == "number" ? b.multiline
							: this.defaultTextHeight);
					t = a
				} else {
					q.show();
					a.hide()
				}
			} else {
				q.hide();
				a.hide()
			}
			t.dom.value = b.value || "";
			if (b.prompt) {
				z.focusEl = t
			} else {
				var x = b.buttons;
				var w = null;
				if (x && x.ok) {
					w = p.ok
				} else {
					if (x && x.yes) {
						w = p.yes
					}
				}
				if (w) {
					z.focusEl = w
				}
			}
			if (b.iconCls) {
				z.setIconClass(b.iconCls)
			}
			this.setIcon(b.icon);
			if (b.cls) {
				z.el.addClass(b.cls)
			}
			z.proxyDrag = b.proxyDrag === true;
			z.modal = b.modal !== false;
			z.mask = b.modal !== false ? o : false;
			z.on("show", function() {
				z.keyMap.setDisabled(v !== true);
				z.doLayout();
				this.setIcon(b.icon);
				m = j(b.buttons);
				l.setVisible(b.progress === true || b.wait === true);
				this.updateProgress(0, b.progressText);
				this.updateText(b.msg);
				if (b.wait === true) {
					l.wait(b.waitConfig)
				}
			}, this, {
				single : true
			});
			if (!z.isVisible()) {
				document.body.appendChild(s.el.dom);
				z.setAnimateTarget(b.animEl);
				z.show(b.animEl)
			}
			return this
		},
		setIcon : function(v) {
			if (v && v != "") {
				i.removeClass("x-hidden");
				i.replaceClass(c, v);
				h.addClass("x-dlg-icon");
				c = v
			} else {
				i.replaceClass(c, "x-hidden");
				h.removeClass("x-dlg-icon");
				c = ""
			}
			return this
		},
		progress : function(x, w, v) {
			this.show( {
				title : x,
				msg : w,
				buttons : false,
				progress : true,
				closable : false,
				minWidth : this.minProgressWidth,
				progressText : v
			});
			return this
		},
		wait : function(x, w, v) {
			this.show( {
				title : w,
				msg : x,
				buttons : false,
				closable : false,
				wait : true,
				modal : true,
				minWidth : this.minProgressWidth,
				waitConfig : v
			});
			return this
		},
		alert : function(y, x, w, v) {
			this.show( {
				title : y,
				msg : x,
				buttons : this.OK,
				fn : w,
				scope : v
			});
			return this
		},
		confirm : function(y, x, w, v) {
			this.show( {
				title : y,
				msg : x,
				buttons : this.YESNO,
				fn : w,
				scope : v,
				icon : this.QUESTION
			});
			return this
		},
		prompt : function(A, z, x, w, v, y) {
			this.show( {
				title : A,
				msg : z,
				buttons : this.OKCANCEL,
				fn : x,
				minWidth : 250,
				scope : w,
				prompt : true,
				multiline : v,
				value : y
			});
			return this
		},
		OK : {
			ok : true
		},
		CANCEL : {
			cancel : true
		},
		OKCANCEL : {
			ok : true,
			cancel : true
		},
		YESNO : {
			yes : true,
			no : true
		},
		YESNOCANCEL : {
			yes : true,
			no : true,
			cancel : true
		},
		INFO : "ext-mb-info",
		WARNING : "ext-mb-warning",
		QUESTION : "ext-mb-question",
		ERROR : "ext-mb-error",
		defaultTextHeight : 75,
		maxWidth : 600,
		minWidth : 110,
		minProgressWidth : 250,
		buttonText : {
			ok : "OK",
			cancel : "Cancel",
			yes : "Yes",
			no : "No"
		}
	}
}();
Ext.Msg = Ext.MessageBox;
Ext.dd.PanelProxy = function(a, b) {
	this.panel = a;
	this.id = this.panel.id + "-ddproxy";
	Ext.apply(this, b)
};
Ext.dd.PanelProxy.prototype = {
	insertProxy : true,
	setStatus : Ext.emptyFn,
	reset : Ext.emptyFn,
	update : Ext.emptyFn,
	stop : Ext.emptyFn,
	sync : Ext.emptyFn,
	getEl : function() {
		return this.ghost
	},
	getGhost : function() {
		return this.ghost
	},
	getProxy : function() {
		return this.proxy
	},
	hide : function() {
		if (this.ghost) {
			if (this.proxy) {
				this.proxy.remove();
				delete this.proxy
			}
			this.panel.el.dom.style.display = "";
			this.ghost.remove();
			delete this.ghost
		}
	},
	show : function() {
		if (!this.ghost) {
			this.ghost = this.panel.createGhost(undefined, undefined, Ext
					.getBody());
			this.ghost.setXY(this.panel.el.getXY());
			if (this.insertProxy) {
				this.proxy = this.panel.el.insertSibling( {
					cls : "x-panel-dd-spacer"
				});
				this.proxy.setSize(this.panel.getSize())
			}
			this.panel.el.dom.style.display = "none"
		}
	},
	repair : function(b, c, a) {
		this.hide();
		if (typeof c == "function") {
			c.call(a || this)
		}
	},
	moveProxy : function(a, b) {
		if (this.proxy) {
			a.insertBefore(this.proxy.dom, b)
		}
	}
};
Ext.Panel.DD = function(b, a) {
	this.panel = b;
	this.dragData = {
		panel : b
	};
	this.proxy = new Ext.dd.PanelProxy(b, a);
	Ext.Panel.DD.superclass.constructor.call(this, b.el, a);
	var c = b.header;
	if (c) {
		this.setHandleElId(c.id)
	}
	(c ? c : this.panel.body).setStyle("cursor", "move");
	this.scroll = false
};
Ext.extend(Ext.Panel.DD, Ext.dd.DragSource, {
	showFrame : Ext.emptyFn,
	startDrag : Ext.emptyFn,
	b4StartDrag : function(a, b) {
		this.proxy.show()
	},
	b4MouseDown : function(b) {
		var a = b.getPageX();
		var c = b.getPageY();
		this.autoOffset(a, c)
	},
	onInitDrag : function(a, b) {
		this.onStartDrag(a, b);
		return true
	},
	createFrame : Ext.emptyFn,
	getDragEl : function(a) {
		return this.proxy.ghost.dom
	},
	endDrag : function(a) {
		this.proxy.hide();
		this.panel.saveState()
	},
	autoOffset : function(a, b) {
		a -= this.startPageX;
		b -= this.startPageY;
		this.setDelta(a, b)
	}
});
Ext.state.Provider = function() {
	this.addEvents("statechange");
	this.state = {};
	Ext.state.Provider.superclass.constructor.call(this)
};
Ext.extend(Ext.state.Provider, Ext.util.Observable, {
	get : function(b, a) {
		return typeof this.state[b] == "undefined" ? a : this.state[b]
	},
	clear : function(a) {
		delete this.state[a];
		this.fireEvent("statechange", this, a, null)
	},
	set : function(a, b) {
		this.state[a] = b;
		this.fireEvent("statechange", this, a, b)
	},
	decodeValue : function(a) {
		var l = /^(a|n|d|b|s|o)\:(.*)$/;
		var c = l.exec(unescape(a));
		if (!c || !c[1]) {
			return
		}
		var g = c[1];
		var j = c[2];
		switch (g) {
		case "n":
			return parseFloat(j);
		case "d":
			return new Date(Date.parse(j));
		case "b":
			return (j == "1");
		case "a":
			var h = [];
			var k = j.split("^");
			for ( var b = 0, d = k.length; b < d; b++) {
				h.push(this.decodeValue(k[b]))
			}
			return h;
		case "o":
			var h = {};
			var k = j.split("^");
			for ( var b = 0, d = k.length; b < d; b++) {
				var e = k[b].split("=");
				h[e[0]] = this.decodeValue(e[1])
			}
			return h;
		default:
			return j
		}
	},
	encodeValue : function(c) {
		var b;
		if (typeof c == "number") {
			b = "n:" + c
		} else {
			if (typeof c == "boolean") {
				b = "b:" + (c ? "1" : "0")
			} else {
				if (Ext.isDate(c)) {
					b = "d:" + c.toGMTString()
				} else {
					if (Ext.isArray(c)) {
						var g = "";
						for ( var e = 0, a = c.length; e < a; e++) {
							g += this.encodeValue(c[e]);
							if (e != a - 1) {
								g += "^"
							}
						}
						b = "a:" + g
					} else {
						if (typeof c == "object") {
							var g = "";
							for ( var d in c) {
								if (typeof c[d] != "function"
										&& c[d] !== undefined) {
									g += d + "=" + this.encodeValue(c[d]) + "^"
								}
							}
							b = "o:" + g.substring(0, g.length - 1)
						} else {
							b = "s:" + c
						}
					}
				}
			}
		}
		return escape(b)
	}
});
Ext.state.Manager = function() {
	var a = new Ext.state.Provider();
	return {
		setProvider : function(b) {
			a = b
		},
		get : function(c, b) {
			return a.get(c, b)
		},
		set : function(b, c) {
			a.set(b, c)
		},
		clear : function(b) {
			a.clear(b)
		},
		getProvider : function() {
			return a
		}
	}
}();
Ext.state.CookieProvider = function(a) {
	Ext.state.CookieProvider.superclass.constructor.call(this);
	this.path = "/";
	this.expires = new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 7));
	this.domain = null;
	this.secure = false;
	Ext.apply(this, a);
	this.state = this.readCookies()
};
Ext.extend(Ext.state.CookieProvider, Ext.state.Provider, {
	set : function(a, b) {
		if (typeof b == "undefined" || b === null) {
			this.clear(a);
			return
		}
		this.setCookie(a, b);
		Ext.state.CookieProvider.superclass.set.call(this, a, b)
	},
	clear : function(a) {
		this.clearCookie(a);
		Ext.state.CookieProvider.superclass.clear.call(this, a)
	},
	readCookies : function() {
		var d = {};
		var h = document.cookie + ";";
		var b = /\s?(.*?)=(.*?);/g;
		var g;
		while ((g = b.exec(h)) != null) {
			var a = g[1];
			var e = g[2];
			if (a && a.substring(0, 3) == "ys-") {
				d[a.substr(3)] = this.decodeValue(e)
			}
		}
		return d
	},
	setCookie : function(a, b) {
		document.cookie = "ys-"
				+ a
				+ "="
				+ this.encodeValue(b)
				+ ((this.expires == null) ? "" : ("; expires=" + this.expires
						.toGMTString()))
				+ ((this.path == null) ? "" : ("; path=" + this.path))
				+ ((this.domain == null) ? "" : ("; domain=" + this.domain))
				+ ((this.secure == true) ? "; secure" : "")
	},
	clearCookie : function(a) {
		document.cookie = "ys-" + a
				+ "=null; expires=Thu, 01-Jan-70 00:00:01 GMT"
				+ ((this.path == null) ? "" : ("; path=" + this.path))
				+ ((this.domain == null) ? "" : ("; domain=" + this.domain))
				+ ((this.secure == true) ? "; secure" : "")
	}
});
Ext.DataView = Ext.extend(Ext.BoxComponent, {
	selectedClass : "x-view-selected",
	emptyText : "",
	deferEmptyText : true,
	trackOver : false,
	last : false,
	initComponent : function() {
		Ext.DataView.superclass.initComponent.call(this);
		if (Ext.isString(this.tpl) || Ext.isArray(this.tpl)) {
			this.tpl = new Ext.XTemplate(this.tpl)
		}
		this.addEvents("beforeclick", "click", "mouseenter", "mouseleave",
				"containerclick", "dblclick", "contextmenu",
				"containercontextmenu", "selectionchange", "beforeselect");
		this.store = Ext.StoreMgr.lookup(this.store);
		this.all = new Ext.CompositeElementLite();
		this.selected = new Ext.CompositeElementLite()
	},
	afterRender : function() {
		Ext.DataView.superclass.afterRender.call(this);
		this.mon(this.getTemplateTarget(), {
			click : this.onClick,
			dblclick : this.onDblClick,
			contextmenu : this.onContextMenu,
			scope : this
		});
		if (this.overClass || this.trackOver) {
			this.mon(this.getTemplateTarget(), {
				mouseover : this.onMouseOver,
				mouseout : this.onMouseOut,
				scope : this
			})
		}
		if (this.store) {
			this.bindStore(this.store, true)
		}
	},
	refresh : function() {
		this.clearSelections(false, true);
		var b = this.getTemplateTarget();
		b.update("");
		var a = this.store.getRange();
		if (a.length < 1) {
			if (!this.deferEmptyText || this.hasSkippedEmptyText) {
				b.update(this.emptyText)
			}
			this.all.clear()
		} else {
			this.tpl.overwrite(b, this.collectData(a, 0));
			this.all.fill(Ext.query(this.itemSelector, b.dom));
			this.updateIndexes(0)
		}
		this.hasSkippedEmptyText = true
	},
	getTemplateTarget : function() {
		return this.el
	},
	prepareData : function(a) {
		return a
	},
	collectData : function(b, e) {
		var d = [];
		for ( var c = 0, a = b.length; c < a; c++) {
			d[d.length] = this.prepareData(b[c].data, e + c, b[c])
		}
		return d
	},
	bufferRender : function(a) {
		var b = document.createElement("div");
		this.tpl.overwrite(b, this.collectData(a));
		return Ext.query(this.itemSelector, b)
	},
	onUpdate : function(g, a) {
		var b = this.store.indexOf(a);
		var e = this.isSelected(b);
		var c = this.all.elements[b];
		var d = this.bufferRender( [ a ], b)[0];
		this.all.replaceElement(b, d, true);
		if (e) {
			this.selected.replaceElement(c, d);
			this.all.item(b).addClass(this.selectedClass)
		}
		this.updateIndexes(b, b)
	},
	onAdd : function(g, d, e) {
		if (this.all.getCount() === 0) {
			this.refresh();
			return
		}
		var c = this.bufferRender(d, e), h, b = this.all.elements;
		if (e < this.all.getCount()) {
			h = this.all.item(e).insertSibling(c, "before", true);
			b.splice.apply(b, [ e, 0 ].concat(c))
		} else {
			h = this.all.last().insertSibling(c, "after", true);
			b.push.apply(b, c)
		}
		this.updateIndexes(e)
	},
	onRemove : function(c, a, b) {
		this.deselect(b);
		this.all.removeElement(b, true);
		this.updateIndexes(b);
		if (this.store.getCount() === 0) {
			this.refresh()
		}
	},
	refreshNode : function(a) {
		this.onUpdate(this.store, this.store.getAt(a))
	},
	updateIndexes : function(d, c) {
		var b = this.all.elements;
		d = d || 0;
		c = c || ((c === 0) ? 0 : (b.length - 1));
		for ( var a = d; a <= c; a++) {
			b[a].viewIndex = a
		}
	},
	getStore : function() {
		return this.store
	},
	bindStore : function(a, b) {
		if (!b && this.store) {
			this.store.un("beforeload", this.onBeforeLoad, this);
			this.store.un("datachanged", this.refresh, this);
			this.store.un("add", this.onAdd, this);
			this.store.un("remove", this.onRemove, this);
			this.store.un("update", this.onUpdate, this);
			this.store.un("clear", this.refresh, this);
			if (a !== this.store && this.store.autoDestroy) {
				this.store.destroy()
			}
		}
		if (a) {
			a = Ext.StoreMgr.lookup(a);
			a.on( {
				scope : this,
				beforeload : this.onBeforeLoad,
				datachanged : this.refresh,
				add : this.onAdd,
				remove : this.onRemove,
				update : this.onUpdate,
				clear : this.refresh
			})
		}
		this.store = a;
		if (a) {
			this.refresh()
		}
	},
	findItemFromChild : function(a) {
		return Ext.fly(a).findParent(this.itemSelector,
				this.getTemplateTarget())
	},
	onClick : function(c) {
		var b = c.getTarget(this.itemSelector, this.getTemplateTarget());
		if (b) {
			var a = this.indexOf(b);
			if (this.onItemClick(b, a, c) !== false) {
				this.fireEvent("click", this, a, b, c)
			}
		} else {
			if (this.fireEvent("containerclick", this, c) !== false) {
				this.onContainerClick(c)
			}
		}
	},
	onContainerClick : function(a) {
		this.clearSelections()
	},
	onContextMenu : function(b) {
		var a = b.getTarget(this.itemSelector, this.getTemplateTarget());
		if (a) {
			this.fireEvent("contextmenu", this, this.indexOf(a), a, b)
		} else {
			this.fireEvent("containercontextmenu", this, b)
		}
	},
	onDblClick : function(b) {
		var a = b.getTarget(this.itemSelector, this.getTemplateTarget());
		if (a) {
			this.fireEvent("dblclick", this, this.indexOf(a), a, b)
		}
	},
	onMouseOver : function(b) {
		var a = b.getTarget(this.itemSelector, this.getTemplateTarget());
		if (a && a !== this.lastItem) {
			this.lastItem = a;
			Ext.fly(a).addClass(this.overClass);
			this.fireEvent("mouseenter", this, this.indexOf(a), a, b)
		}
	},
	onMouseOut : function(a) {
		if (this.lastItem) {
			if (!a.within(this.lastItem, true, true)) {
				Ext.fly(this.lastItem).removeClass(this.overClass);
				this.fireEvent("mouseleave", this, this.indexOf(this.lastItem),
						this.lastItem, a);
				delete this.lastItem
			}
		}
	},
	onItemClick : function(b, a, c) {
		if (this.fireEvent("beforeclick", this, a, b, c) === false) {
			return false
		}
		if (this.multiSelect) {
			this.doMultiSelection(b, a, c);
			c.preventDefault()
		} else {
			if (this.singleSelect) {
				this.doSingleSelection(b, a, c);
				c.preventDefault()
			}
		}
		return true
	},
	doSingleSelection : function(b, a, c) {
		if (c.ctrlKey && this.isSelected(a)) {
			this.deselect(a)
		} else {
			this.select(a, false)
		}
	},
	doMultiSelection : function(c, a, d) {
		if (d.shiftKey && this.last !== false) {
			var b = this.last;
			this.selectRange(b, a, d.ctrlKey);
			this.last = b
		} else {
			if ((d.ctrlKey || this.simpleSelect) && this.isSelected(a)) {
				this.deselect(a)
			} else {
				this.select(a, d.ctrlKey || d.shiftKey || this.simpleSelect)
			}
		}
	},
	getSelectionCount : function() {
		return this.selected.getCount()
	},
	getSelectedNodes : function() {
		return this.selected.elements
	},
	getSelectedIndexes : function() {
		var b = [], d = this.selected.elements;
		for ( var c = 0, a = d.length; c < a; c++) {
			b.push(d[c].viewIndex)
		}
		return b
	},
	getSelectedRecords : function() {
		var d = [], c = this.selected.elements;
		for ( var b = 0, a = c.length; b < a; b++) {
			d[d.length] = this.store.getAt(c[b].viewIndex)
		}
		return d
	},
	getRecords : function(b) {
		var e = [], d = b;
		for ( var c = 0, a = d.length; c < a; c++) {
			e[e.length] = this.store.getAt(d[c].viewIndex)
		}
		return e
	},
	getRecord : function(a) {
		return this.store.getAt(a.viewIndex)
	},
	clearSelections : function(a, b) {
		if ((this.multiSelect || this.singleSelect)
				&& this.selected.getCount() > 0) {
			if (!b) {
				this.selected.removeClass(this.selectedClass)
			}
			this.selected.clear();
			this.last = false;
			if (!a) {
				this.fireEvent("selectionchange", this, this.selected.elements)
			}
		}
	},
	isSelected : function(a) {
		return this.selected.contains(this.getNode(a))
	},
	deselect : function(a) {
		if (this.isSelected(a)) {
			a = this.getNode(a);
			this.selected.removeElement(a);
			if (this.last == a.viewIndex) {
				this.last = false
			}
			Ext.fly(a).removeClass(this.selectedClass);
			this.fireEvent("selectionchange", this, this.selected.elements)
		}
	},
	select : function(d, g, b) {
		if (Ext.isArray(d)) {
			if (!g) {
				this.clearSelections(true)
			}
			for ( var c = 0, a = d.length; c < a; c++) {
				this.select(d[c], true, true)
			}
			if (!b) {
				this.fireEvent("selectionchange", this, this.selected.elements)
			}
		} else {
			var e = this.getNode(d);
			if (!g) {
				this.clearSelections(true)
			}
			if (e && !this.isSelected(e)) {
				if (this.fireEvent("beforeselect", this, e,
						this.selected.elements) !== false) {
					Ext.fly(e).addClass(this.selectedClass);
					this.selected.add(e);
					this.last = e.viewIndex;
					if (!b) {
						this.fireEvent("selectionchange", this,
								this.selected.elements)
					}
				}
			}
		}
	},
	selectRange : function(c, a, b) {
		if (!b) {
			this.clearSelections(true)
		}
		this.select(this.getNodes(c, a), true)
	},
	getNode : function(a) {
		if (Ext.isString(a)) {
			return document.getElementById(a)
		} else {
			if (Ext.isNumber(a)) {
				return this.all.elements[a]
			}
		}
		return a
	},
	getNodes : function(e, a) {
		var d = this.all.elements;
		e = e || 0;
		a = !Ext.isDefined(a) ? Math.max(d.length - 1, 0) : a;
		var b = [], c;
		if (e <= a) {
			for (c = e; c <= a && d[c]; c++) {
				b.push(d[c])
			}
		} else {
			for (c = e; c >= a && d[c]; c--) {
				b.push(d[c])
			}
		}
		return b
	},
	indexOf : function(a) {
		a = this.getNode(a);
		if (Ext.isNumber(a.viewIndex)) {
			return a.viewIndex
		}
		return this.all.indexOf(a)
	},
	onBeforeLoad : function() {
		if (this.loadingText) {
			this.clearSelections(false, true);
			this.getTemplateTarget().update(
					'<div class="loading-indicator">' + this.loadingText
							+ "</div>");
			this.all.clear()
		}
	},
	onDestroy : function() {
		Ext.DataView.superclass.onDestroy.call(this);
		this.bindStore(null)
	}
});
Ext.DataView.prototype.setStore = Ext.DataView.prototype.bindStore;
Ext.reg("dataview", Ext.DataView);
Ext.ListView = Ext
		.extend(
				Ext.DataView,
				{
					itemSelector : "dl",
					selectedClass : "x-list-selected",
					overClass : "x-list-over",
					scrollOffset : 19,
					columnResize : true,
					columnSort : true,
					initComponent : function() {
						if (this.columnResize) {
							this.colResizer = new Ext.ListView.ColumnResizer(
									this.colResizer);
							this.colResizer.init(this)
						}
						if (this.columnSort) {
							this.colSorter = new Ext.ListView.Sorter(
									this.columnSort);
							this.colSorter.init(this)
						}
						if (!this.internalTpl) {
							this.internalTpl = new Ext.XTemplate(
									'<div class="x-list-header"><div class="x-list-header-inner">',
									'<tpl for="columns">',
									'<div style="width:{width}%;text-align:{align};"><em unselectable="on" id="',
									this.id,
									'-xlhd-{#}">',
									"{header}",
									"</em></div>",
									"</tpl>",
									'<div class="x-clear"></div>',
									"</div></div>",
									'<div class="x-list-body"><div class="x-list-body-inner">',
									"</div></div>")
						}
						if (!this.tpl) {
							this.tpl = new Ext.XTemplate(
									'<tpl for="rows">',
									"<dl>",
									'<tpl for="parent.columns">',
									'<dt style="width:{width}%;text-align:{align};"><em unselectable="on">',
									"{[values.tpl.apply(parent)]}",
									"</em></dt>", "</tpl>",
									'<div class="x-clear"></div>', "</dl>",
									"</tpl>")
						}
						var k = this.columns, g = 0, h = 0, l = k.length;
						for ( var e = 0; e < l; e++) {
							var m = k[e];
							if (!m.tpl) {
								m.tpl = new Ext.XTemplate("{" + m.dataIndex
										+ "}")
							} else {
								if (Ext.isString(m.tpl)) {
									m.tpl = new Ext.XTemplate(m.tpl)
								}
							}
							m.align = m.align || "left";
							if (Ext.isNumber(m.width)) {
								m.width *= 100;
								g += m.width;
								h++
							}
						}
						if (h < l) {
							var b = l - h;
							if (g < 100) {
								var a = ((100 - g) / b);
								for ( var d = 0; d < l; d++) {
									var m = k[d];
									if (!Ext.isNumber(m.width)) {
										m.width = a
									}
								}
							}
						}
						Ext.ListView.superclass.initComponent.call(this)
					},
					onRender : function() {
						Ext.ListView.superclass.onRender.apply(this, arguments);
						this.internalTpl.overwrite(this.el, {
							columns : this.columns
						});
						this.innerBody = Ext
								.get(this.el.dom.childNodes[1].firstChild);
						this.innerHd = Ext
								.get(this.el.dom.firstChild.firstChild);
						if (this.hideHeaders) {
							this.el.dom.firstChild.style.display = "none"
						}
					},
					getTemplateTarget : function() {
						return this.innerBody
					},
					collectData : function() {
						var a = Ext.ListView.superclass.collectData.apply(this,
								arguments);
						return {
							columns : this.columns,
							rows : a
						}
					},
					verifyInternalSize : function() {
						if (this.lastSize) {
							this.onResize(this.lastSize.width,
									this.lastSize.height)
						}
					},
					onResize : function(b, d) {
						var e = this.innerBody.dom;
						var g = this.innerHd.dom;
						if (!e) {
							return
						}
						var c = e.parentNode;
						if (Ext.isNumber(b)) {
							var a = b - this.scrollOffset;
							if (this.reserveScrollOffset
									|| ((c.offsetWidth - c.clientWidth) > 10)) {
								e.style.width = a + "px";
								g.style.width = a + "px"
							} else {
								e.style.width = b + "px";
								g.style.width = b + "px";
								setTimeout( function() {
									if ((c.offsetWidth - c.clientWidth) > 10) {
										e.style.width = a + "px";
										g.style.width = a + "px"
									}
								}, 10)
							}
						}
						if (Ext.isNumber(d == "number")) {
							c.style.height = (d - g.parentNode.offsetHeight)
									+ "px"
						}
					},
					updateIndexes : function() {
						Ext.ListView.superclass.updateIndexes.apply(this,
								arguments);
						this.verifyInternalSize()
					},
					findHeaderIndex : function(e) {
						e = e.dom || e;
						var a = e.parentNode, d = a.parentNode.childNodes;
						for ( var b = 0, g; g = d[b]; b++) {
							if (g == a) {
								return b
							}
						}
						return -1
					},
					setHdWidths : function() {
						var c = this.innerHd.dom.getElementsByTagName("div");
						for ( var b = 0, d = this.columns, a = d.length; b < a; b++) {
							c[b].style.width = d[b].width + "%"
						}
					}
				});
Ext.reg("listview", Ext.ListView);
Ext.ListView.ColumnResizer = Ext
		.extend(
				Ext.util.Observable,
				{
					minPct : 0.05,
					constructor : function(a) {
						Ext.apply(this, a);
						Ext.ListView.ColumnResizer.superclass.constructor
								.call(this)
					},
					init : function(a) {
						this.view = a;
						a.on("render", this.initEvents, this)
					},
					initEvents : function(a) {
						a.mon(a.innerHd, "mousemove", this.handleHdMove, this);
						this.tracker = new Ext.dd.DragTracker( {
							onBeforeStart : this.onBeforeStart
									.createDelegate(this),
							onStart : this.onStart.createDelegate(this),
							onDrag : this.onDrag.createDelegate(this),
							onEnd : this.onEnd.createDelegate(this),
							tolerance : 3,
							autoStart : 300
						});
						this.tracker.initEl(a.innerHd);
						a.on("beforedestroy", this.tracker.destroy,
								this.tracker)
					},
					handleHdMove : function(j, g) {
						var b = 5;
						var a = j.getPageX();
						var i = j.getTarget("em", 3, true);
						if (i) {
							var h = i.getRegion();
							var d = i.dom.style;
							var c = i.dom.parentNode;
							if (a - h.left <= b && c != c.parentNode.firstChild) {
								this.activeHd = Ext
										.get(c.previousSibling.firstChild);
								d.cursor = Ext.isWebKit ? "e-resize"
										: "col-resize"
							} else {
								if (h.right - a <= b
										&& c != c.parentNode.lastChild.previousSibling) {
									this.activeHd = i;
									d.cursor = Ext.isWebKit ? "w-resize"
											: "col-resize"
								} else {
									delete this.activeHd;
									d.cursor = ""
								}
							}
						}
					},
					onBeforeStart : function(a) {
						this.dragHd = this.activeHd;
						return !!this.dragHd
					},
					onStart : function(c) {
						this.view.disableHeaders = true;
						this.proxy = this.view.el.createChild( {
							cls : "x-list-resizer"
						});
						this.proxy.setHeight(this.view.el.getHeight());
						var a = this.tracker.getXY()[0];
						var b = this.view.innerHd.getWidth();
						this.hdX = this.dragHd.getX();
						this.hdIndex = this.view.findHeaderIndex(this.dragHd);
						this.proxy.setX(this.hdX);
						this.proxy.setWidth(a - this.hdX);
						this.minWidth = b * this.minPct;
						this.maxWidth = b
								- (this.minWidth * (this.view.columns.length - 1 - this.hdIndex))
					},
					onDrag : function(b) {
						var a = this.tracker.getXY()[0];
						this.proxy.setWidth((a - this.hdX).constrain(
								this.minWidth, this.maxWidth))
					},
					onEnd : function(l) {
						var j = this.proxy.getWidth();
						this.proxy.remove();
						var h = this.hdIndex;
						var o = this.view, g = o.columns, k = g.length;
						var q = this.view.innerHd.getWidth(), d = this.minPct * 100;
						var r = Math.ceil((j * 100) / q);
						var p = g[h].width - r;
						var n = Math.floor(p / (k - 1 - h));
						var m = p - (n * (k - 1 - h));
						for ( var c = h + 1; c < k; c++) {
							var b = g[c].width + n;
							var a = Math.max(d, b);
							if (b != a) {
								m += b - a
							}
							g[c].width = a
						}
						g[h].width = r;
						g[h + 1].width += m;
						delete this.dragHd;
						this.view.setHdWidths();
						this.view.refresh();
						setTimeout( function() {
							o.disableHeaders = false
						}, 100)
					}
				});
Ext.ListView.Sorter = Ext.extend(Ext.util.Observable, {
	sortClasses : [ "sort-asc", "sort-desc" ],
	constructor : function(a) {
		Ext.apply(this, a);
		Ext.ListView.Sorter.superclass.constructor.call(this)
	},
	init : function(a) {
		this.view = a;
		a.on("render", this.initEvents, this)
	},
	initEvents : function(a) {
		a.mon(a.innerHd, "click", this.onHdClick, this);
		a.innerHd.setStyle("cursor", "pointer");
		a.mon(a.store, "datachanged", this.updateSortState, this);
		this.updateSortState.defer(10, this, [ a.store ])
	},
	updateSortState : function(c) {
		var g = c.getSortState();
		if (!g) {
			return
		}
		this.sortState = g;
		var e = this.view.columns, h = -1;
		for ( var d = 0, a = e.length; d < a; d++) {
			if (e[d].dataIndex == g.field) {
				h = d;
				break
			}
		}
		if (h != -1) {
			var b = g.direction;
			this.updateSortIcon(h, b)
		}
	},
	updateSortIcon : function(b, a) {
		var d = this.sortClasses;
		var c = this.view.innerHd.select("em").removeClass(d);
		c.item(b).addClass(d[a == "DESC" ? 1 : 0])
	},
	onHdClick : function(c) {
		var b = c.getTarget("em", 3);
		if (b && !this.view.disableHeaders) {
			var a = this.view.findHeaderIndex(b);
			this.view.store.sort(this.view.columns[a].dataIndex)
		}
	}
});
Ext.TabPanel = Ext
		.extend(
				Ext.Panel,
				{
					monitorResize : true,
					deferredRender : true,
					tabWidth : 120,
					minTabWidth : 30,
					resizeTabs : false,
					enableTabScroll : false,
					scrollIncrement : 0,
					scrollRepeatInterval : 400,
					scrollDuration : 0.35,
					animScroll : true,
					tabPosition : "top",
					baseCls : "x-tab-panel",
					autoTabs : false,
					autoTabSelector : "div.x-tab",
					activeTab : null,
					tabMargin : 2,
					plain : false,
					wheelIncrement : 20,
					idDelimiter : "__",
					itemCls : "x-tab-item",
					elements : "body",
					headerAsText : false,
					frame : false,
					hideBorders : true,
					initComponent : function() {
						this.frame = false;
						Ext.TabPanel.superclass.initComponent.call(this);
						this.addEvents("beforetabchange", "tabchange",
								"contextmenu");
						this.setLayout(new Ext.layout.CardLayout(Ext.apply( {
							layoutOnCardChange : this.layoutOnTabChange,
							deferredRender : this.deferredRender
						}, this.layoutConfig)));
						if (this.tabPosition == "top") {
							this.elements += ",header";
							this.stripTarget = "header"
						} else {
							this.elements += ",footer";
							this.stripTarget = "footer"
						}
						if (!this.stack) {
							this.stack = Ext.TabPanel.AccessStack()
						}
						this.initItems()
					},
					onRender : function(c, a) {
						Ext.TabPanel.superclass.onRender.call(this, c, a);
						if (this.plain) {
							var g = this.tabPosition == "top" ? "header"
									: "footer";
							this[g].addClass("x-tab-panel-" + g + "-plain")
						}
						var b = this[this.stripTarget];
						this.stripWrap = b.createChild( {
							cls : "x-tab-strip-wrap",
							cn : {
								tag : "ul",
								cls : "x-tab-strip x-tab-strip-"
										+ this.tabPosition
							}
						});
						var e = (this.tabPosition == "bottom" ? this.stripWrap
								: null);
						this.stripSpacer = b.createChild( {
							cls : "x-tab-strip-spacer"
						}, e);
						this.strip = new Ext.Element(
								this.stripWrap.dom.firstChild);
						this.edge = this.strip.createChild( {
							tag : "li",
							cls : "x-tab-edge"
						});
						this.strip.createChild( {
							cls : "x-clear"
						});
						this.body.addClass("x-tab-panel-body-"
								+ this.tabPosition);
						if (!this.itemTpl) {
							var d = new Ext.Template(
									'<li class="{cls}" id="{id}"><a class="x-tab-strip-close" onclick="return false;"></a>',
									'<a class="x-tab-right" href="#" onclick="return false;"><em class="x-tab-left">',
									'<span class="x-tab-strip-inner"><span class="x-tab-strip-text {iconCls}">{text}</span></span>',
									"</em></a></li>");
							d.disableFormats = true;
							d.compile();
							Ext.TabPanel.prototype.itemTpl = d
						}
						this.items.each(this.initTab, this)
					},
					afterRender : function() {
						Ext.TabPanel.superclass.afterRender.call(this);
						if (this.autoTabs) {
							this.readTabs(false)
						}
						if (this.activeTab !== undefined) {
							var a = Ext.isObject(this.activeTab) ? this.activeTab
									: this.items.get(this.activeTab);
							delete this.activeTab;
							this.setActiveTab(a)
						}
					},
					initEvents : function() {
						Ext.TabPanel.superclass.initEvents.call(this);
						this.on("add", this.onAdd, this, {
							target : this
						});
						this.on("remove", this.onRemove, this, {
							target : this
						});
						this.mon(this.strip, "mousedown",
								this.onStripMouseDown, this);
						this.mon(this.strip, "contextmenu",
								this.onStripContextMenu, this);
						if (this.enableTabScroll) {
							this.mon(this.strip, "mousewheel", this.onWheel,
									this)
						}
					},
					findTargets : function(c) {
						var b = null;
						var a = c.getTarget("li", this.strip);
						if (a) {
							b = this
									.getComponent(a.id.split(this.idDelimiter)[1]);
							if (b.disabled) {
								return {
									close : null,
									item : null,
									el : null
								}
							}
						}
						return {
							close : c.getTarget(".x-tab-strip-close",
									this.strip),
							item : b,
							el : a
						}
					},
					onStripMouseDown : function(b) {
						if (b.button !== 0) {
							return
						}
						b.preventDefault();
						var a = this.findTargets(b);
						if (a.close) {
							if (a.item.fireEvent("beforeclose", a.item) !== false) {
								a.item.fireEvent("close", a.item);
								this.remove(a.item)
							}
							return
						}
						if (a.item && a.item != this.activeTab) {
							this.setActiveTab(a.item)
						}
					},
					onStripContextMenu : function(b) {
						b.preventDefault();
						var a = this.findTargets(b);
						if (a.item) {
							this.fireEvent("contextmenu", this, a.item, b)
						}
					},
					readTabs : function(d) {
						if (d === true) {
							this.items.each( function(h) {
								this.remove(h)
							}, this)
						}
						var c = this.el.query(this.autoTabSelector);
						for ( var b = 0, a = c.length; b < a; b++) {
							var e = c[b];
							var g = e.getAttribute("title");
							e.removeAttribute("title");
							this.add( {
								title : g,
								contentEl : e
							})
						}
					},
					initTab : function(c, a) {
						var d = this.strip.dom.childNodes[a];
						var e = this.getTemplateArgs(c);
						var b = d ? this.itemTpl.insertBefore(d, e)
								: this.itemTpl.append(this.strip, e);
						Ext.fly(b).addClassOnOver("x-tab-strip-over");
						if (c.tabTip) {
							Ext.fly(b).child("span.x-tab-strip-text", true).qtip = c.tabTip
						}
						c.tabEl = b;
						c.on("disable", this.onItemDisabled, this);
						c.on("enable", this.onItemEnabled, this);
						c.on("titlechange", this.onItemTitleChanged, this);
						c.on("iconchange", this.onItemIconChanged, this);
						c.on("beforeshow", this.onBeforeShowItem, this)
					},
					getTemplateArgs : function(b) {
						var a = b.closable ? "x-tab-strip-closable" : "";
						if (b.disabled) {
							a += " x-item-disabled"
						}
						if (b.iconCls) {
							a += " x-tab-with-icon"
						}
						if (b.tabCls) {
							a += " " + b.tabCls
						}
						return {
							id : this.id + this.idDelimiter + b.getItemId(),
							text : b.title,
							cls : a,
							iconCls : b.iconCls || ""
						}
					},
					onAdd : function(c, b, a) {
						this.initTab(b, a);
						if (this.items.getCount() == 1) {
							this.syncSize()
						}
						this.delegateUpdates()
					},
					onBeforeAdd : function(b) {
						var a = b.events ? (this.items.containsKey(b
								.getItemId()) ? b : null) : this.items.get(b);
						if (a) {
							this.setActiveTab(b);
							return false
						}
						Ext.TabPanel.superclass.onBeforeAdd.apply(this,
								arguments);
						var c = b.elements;
						b.elements = c ? c.replace(",header", "") : c;
						b.border = (b.border === true)
					},
					onRemove : function(c, b) {
						Ext.destroy(Ext.get(this.getTabEl(b)));
						this.stack.remove(b);
						b.un("disable", this.onItemDisabled, this);
						b.un("enable", this.onItemEnabled, this);
						b.un("titlechange", this.onItemTitleChanged, this);
						b.un("iconchange", this.onItemIconChanged, this);
						b.un("beforeshow", this.onBeforeShowItem, this);
						if (b == this.activeTab) {
							var a = this.stack.next();
							if (a) {
								this.setActiveTab(a)
							} else {
								if (this.items.getCount() > 0) {
									this.setActiveTab(0)
								} else {
									this.activeTab = null
								}
							}
						}
						this.delegateUpdates()
					},
					onBeforeShowItem : function(a) {
						if (a != this.activeTab) {
							this.setActiveTab(a);
							return false
						}
					},
					onItemDisabled : function(b) {
						var a = this.getTabEl(b);
						if (a) {
							Ext.fly(a).addClass("x-item-disabled")
						}
						this.stack.remove(b)
					},
					onItemEnabled : function(b) {
						var a = this.getTabEl(b);
						if (a) {
							Ext.fly(a).removeClass("x-item-disabled")
						}
					},
					onItemTitleChanged : function(b) {
						var a = this.getTabEl(b);
						if (a) {
							Ext.fly(a).child("span.x-tab-strip-text", true).innerHTML = b.title
						}
					},
					onItemIconChanged : function(d, a, c) {
						var b = this.getTabEl(d);
						if (b) {
							Ext.fly(b).child("span.x-tab-strip-text")
									.replaceClass(c, a)
						}
					},
					getTabEl : function(a) {
						return document.getElementById(this.id
								+ this.idDelimiter
								+ this.getComponent(a).getItemId())
					},
					onResize : function() {
						Ext.TabPanel.superclass.onResize.apply(this, arguments);
						this.delegateUpdates()
					},
					beginUpdate : function() {
						this.suspendUpdates = true
					},
					endUpdate : function() {
						this.suspendUpdates = false;
						this.delegateUpdates()
					},
					hideTabStripItem : function(b) {
						b = this.getComponent(b);
						var a = this.getTabEl(b);
						if (a) {
							a.style.display = "none";
							this.delegateUpdates()
						}
						this.stack.remove(b)
					},
					unhideTabStripItem : function(b) {
						b = this.getComponent(b);
						var a = this.getTabEl(b);
						if (a) {
							a.style.display = "";
							this.delegateUpdates()
						}
					},
					delegateUpdates : function() {
						if (this.suspendUpdates) {
							return
						}
						if (this.resizeTabs && this.rendered) {
							this.autoSizeTabs()
						}
						if (this.enableTabScroll && this.rendered) {
							this.autoScrollTabs()
						}
					},
					autoSizeTabs : function() {
						var h = this.items.length;
						var b = this.tabPosition != "bottom" ? "header"
								: "footer";
						var c = this[b].dom.offsetWidth;
						var a = this[b].dom.clientWidth;
						if (!this.resizeTabs || h < 1 || !a) {
							return
						}
						var k = Math.max(Math.min(Math.floor((a - 4) / h)
								- this.tabMargin, this.tabWidth),
								this.minTabWidth);
						this.lastTabWidth = k;
						var m = this.strip
								.query("li:not([className^=x-tab-edge])");
						for ( var e = 0, j = m.length; e < j; e++) {
							var l = m[e];
							var n = Ext.fly(l)
									.child(".x-tab-strip-inner", true);
							var g = l.offsetWidth;
							var d = n.offsetWidth;
							n.style.width = (k - (g - d)) + "px"
						}
					},
					adjustBodyWidth : function(a) {
						if (this.header) {
							this.header.setWidth(a)
						}
						if (this.footer) {
							this.footer.setWidth(a)
						}
						return a
					},
					setActiveTab : function(c) {
						c = this.getComponent(c);
						if (!c
								|| this.fireEvent("beforetabchange", this, c,
										this.activeTab) === false) {
							return
						}
						if (!this.rendered) {
							this.activeTab = c;
							return
						}
						if (this.activeTab != c) {
							if (this.activeTab) {
								var a = this.getTabEl(this.activeTab);
								if (a) {
									Ext.fly(a)
											.removeClass("x-tab-strip-active")
								}
								this.activeTab.fireEvent("deactivate",
										this.activeTab)
							}
							var b = this.getTabEl(c);
							Ext.fly(b).addClass("x-tab-strip-active");
							this.activeTab = c;
							this.stack.add(c);
							this.layout.setActiveItem(c);
							if (this.scrolling) {
								this.scrollToTab(c, this.animScroll)
							}
							c.fireEvent("activate", c);
							this.fireEvent("tabchange", this, c)
						}
					},
					getActiveTab : function() {
						return this.activeTab || null
					},
					getItem : function(a) {
						return this.getComponent(a)
					},
					autoScrollTabs : function() {
						this.pos = this.tabPosition == "bottom" ? this.footer
								: this.header;
						var h = this.items.length;
						var d = this.pos.dom.offsetWidth;
						var c = this.pos.dom.clientWidth;
						var g = this.stripWrap;
						var e = g.dom;
						var b = e.offsetWidth;
						var i = this.getScrollPos();
						var a = this.edge.getOffsetsTo(this.stripWrap)[0] + i;
						if (!this.enableTabScroll || h < 1 || b < 20) {
							return
						}
						if (a <= c) {
							e.scrollLeft = 0;
							g.setWidth(c);
							if (this.scrolling) {
								this.scrolling = false;
								this.pos.removeClass("x-tab-scrolling");
								this.scrollLeft.hide();
								this.scrollRight.hide();
								if (Ext.isAir || Ext.isWebKit) {
									e.style.marginLeft = "";
									e.style.marginRight = ""
								}
							}
						} else {
							if (!this.scrolling) {
								this.pos.addClass("x-tab-scrolling");
								if (Ext.isAir || Ext.isWebKit) {
									e.style.marginLeft = "18px";
									e.style.marginRight = "18px"
								}
							}
							c -= g.getMargins("lr");
							g.setWidth(c > 20 ? c : 20);
							if (!this.scrolling) {
								if (!this.scrollLeft) {
									this.createScrollers()
								} else {
									this.scrollLeft.show();
									this.scrollRight.show()
								}
							}
							this.scrolling = true;
							if (i > (a - c)) {
								e.scrollLeft = a - c
							} else {
								this.scrollToTab(this.activeTab, false)
							}
							this.updateScrollButtons()
						}
					},
					createScrollers : function() {
						this.pos
								.addClass("x-tab-scrolling-" + this.tabPosition);
						var c = this.stripWrap.dom.offsetHeight;
						var a = this.pos.insertFirst( {
							cls : "x-tab-scroller-left"
						});
						a.setHeight(c);
						a.addClassOnOver("x-tab-scroller-left-over");
						this.leftRepeater = new Ext.util.ClickRepeater(a, {
							interval : this.scrollRepeatInterval,
							handler : this.onScrollLeft,
							scope : this
						});
						this.scrollLeft = a;
						var b = this.pos.insertFirst( {
							cls : "x-tab-scroller-right"
						});
						b.setHeight(c);
						b.addClassOnOver("x-tab-scroller-right-over");
						this.rightRepeater = new Ext.util.ClickRepeater(b, {
							interval : this.scrollRepeatInterval,
							handler : this.onScrollRight,
							scope : this
						});
						this.scrollRight = b
					},
					getScrollWidth : function() {
						return this.edge.getOffsetsTo(this.stripWrap)[0]
								+ this.getScrollPos()
					},
					getScrollPos : function() {
						return parseInt(this.stripWrap.dom.scrollLeft, 10) || 0
					},
					getScrollArea : function() {
						return parseInt(this.stripWrap.dom.clientWidth, 10) || 0
					},
					getScrollAnim : function() {
						return {
							duration : this.scrollDuration,
							callback : this.updateScrollButtons,
							scope : this
						}
					},
					getScrollIncrement : function() {
						return this.scrollIncrement
								|| (this.resizeTabs ? this.lastTabWidth + 2
										: 100)
					},
					scrollToTab : function(e, a) {
						if (!e) {
							return
						}
						var c = this.getTabEl(e);
						var h = this.getScrollPos(), d = this.getScrollArea();
						var g = Ext.fly(c).getOffsetsTo(this.stripWrap)[0] + h;
						var b = g + c.offsetWidth;
						if (g < h) {
							this.scrollTo(g, a)
						} else {
							if (b > (h + d)) {
								this.scrollTo(b - d, a)
							}
						}
					},
					scrollTo : function(b, a) {
						this.stripWrap.scrollTo("left", b, a ? this
								.getScrollAnim() : false);
						if (!a) {
							this.updateScrollButtons()
						}
					},
					onWheel : function(g) {
						var h = g.getWheelDelta() * this.wheelIncrement * -1;
						g.stopEvent();
						var i = this.getScrollPos();
						var c = i + h;
						var a = this.getScrollWidth() - this.getScrollArea();
						var b = Math.max(0, Math.min(a, c));
						if (b != i) {
							this.scrollTo(b, false)
						}
					},
					onScrollRight : function() {
						var a = this.getScrollWidth() - this.getScrollArea();
						var c = this.getScrollPos();
						var b = Math.min(a, c + this.getScrollIncrement());
						if (b != c) {
							this.scrollTo(b, this.animScroll)
						}
					},
					onScrollLeft : function() {
						var b = this.getScrollPos();
						var a = Math.max(0, b - this.getScrollIncrement());
						if (a != b) {
							this.scrollTo(a, this.animScroll)
						}
					},
					updateScrollButtons : function() {
						var a = this.getScrollPos();
						this.scrollLeft[a === 0 ? "addClass" : "removeClass"]
								("x-tab-scroller-left-disabled");
						this.scrollRight[a >= (this.getScrollWidth() - this
								.getScrollArea()) ? "addClass" : "removeClass"]
								("x-tab-scroller-right-disabled")
					},
					beforeDestroy : function() {
						if (this.items) {
							this.items.each( function(a) {
								if (a && a.tabEl) {
									Ext.get(a.tabEl).removeAllListeners();
									a.tabEl = null
								}
							}, this)
						}
						if (this.strip) {
							this.strip.removeAllListeners()
						}
						Ext.TabPanel.superclass.beforeDestroy.apply(this)
					}
				});
Ext.reg("tabpanel", Ext.TabPanel);
Ext.TabPanel.prototype.activate = Ext.TabPanel.prototype.setActiveTab;
Ext.TabPanel.AccessStack = function() {
	var a = [];
	return {
		add : function(b) {
			a.push(b);
			if (a.length > 10) {
				a.shift()
			}
		},
		remove : function(e) {
			var d = [];
			for ( var c = 0, b = a.length; c < b; c++) {
				if (a[c] != e) {
					d.push(a[c])
				}
			}
			a = d
		},
		next : function() {
			return a.pop()
		}
	}
};
Ext.Button = Ext
		.extend(
				Ext.BoxComponent,
				{
					hidden : false,
					disabled : false,
					pressed : false,
					enableToggle : false,
					menuAlign : "tl-bl?",
					type : "button",
					menuClassTarget : "tr:nth(2)",
					clickEvent : "click",
					handleMouseEvents : true,
					tooltipType : "qtip",
					buttonSelector : "button:first-child",
					scale : "small",
					iconAlign : "left",
					arrowAlign : "right",
					initComponent : function() {
						Ext.Button.superclass.initComponent.call(this);
						this.addEvents("click", "toggle", "mouseover",
								"mouseout", "menushow", "menuhide",
								"menutriggerover", "menutriggerout");
						if (this.menu) {
							this.menu = Ext.menu.MenuMgr.get(this.menu)
						}
						if (Ext.isString(this.toggleGroup)) {
							this.enableToggle = true
						}
					},
					getTemplateArgs : function() {
						var a = (this.cls || "");
						a += (this.iconCls || this.icon) ? (this.text ? " x-btn-text-icon"
								: " x-btn-icon")
								: " x-btn-noicon";
						if (this.pressed) {
							a += " x-btn-pressed"
						}
						return [
								this.text || "&#160;",
								this.type,
								this.iconCls || "",
								a,
								"x-btn-" + this.scale + " x-btn-icon-"
										+ this.scale + "-" + this.iconAlign,
								this.getMenuClass() ]
					},
					getMenuClass : function() {
						return this.menu ? (this.arrowAlign != "bottom" ? "x-btn-arrow"
								: "x-btn-arrow-bottom")
								: ""
					},
					onRender : function(c, a) {
						if (!this.template) {
							if (!Ext.Button.buttonTemplate) {
								Ext.Button.buttonTemplate = new Ext.Template(
										'<table cellspacing="0" class="x-btn {3}"><tbody class="{4}">',
										'<tr><td class="x-btn-tl"><i>&#160;</i></td><td class="x-btn-tc"></td><td class="x-btn-tr"><i>&#160;</i></td></tr>',
										'<tr><td class="x-btn-ml"><i>&#160;</i></td><td class="x-btn-mc"><em class="{5}" unselectable="on"><button class="x-btn-text {2}" type="{1}">{0}</button></em></td><td class="x-btn-mr"><i>&#160;</i></td></tr>',
										'<tr><td class="x-btn-bl"><i>&#160;</i></td><td class="x-btn-bc"></td><td class="x-btn-br"><i>&#160;</i></td></tr>',
										"</tbody></table>");
								Ext.Button.buttonTemplate.compile()
							}
							this.template = Ext.Button.buttonTemplate
						}
						var b, d = this.getTemplateArgs();
						if (a) {
							b = this.template.insertBefore(a, d, true)
						} else {
							b = this.template.append(c, d, true)
						}
						this.btnEl = b.child(this.buttonSelector);
						this.mon(this.btnEl, {
							scope : this,
							focus : this.onFocus,
							blur : this.onBlur
						});
						this.initButtonEl(b, this.btnEl);
						Ext.ButtonToggleMgr.register(this)
					},
					initButtonEl : function(b, c) {
						this.el = b;
						if (this.id) {
							this.el.dom.id = this.el.id = this.id
						}
						if (this.icon) {
							c.setStyle("background-image", "url(" + this.icon
									+ ")")
						}
						if (this.tabIndex !== undefined) {
							c.dom.tabIndex = this.tabIndex
						}
						if (this.tooltip) {
							this.setTooltip(this.tooltip, true)
						}
						if (this.handleMouseEvents) {
							this.mon(b, {
								scope : this,
								mouseover : this.onMouseOver,
								mousedown : this.onMouseDown
							})
						}
						if (this.menu) {
							this.mon(this.menu, {
								scope : this,
								show : this.onMenuShow,
								hide : this.onMenuHide
							})
						}
						if (this.repeat) {
							var a = new Ext.util.ClickRepeater(b, Ext
									.isObject(this.repeat) ? this.repeat : {});
							this.mon(a, "click", this.onClick, this)
						}
						this.mon(b, this.clickEvent, this.onClick, this)
					},
					afterRender : function() {
						Ext.Button.superclass.afterRender.call(this);
						this.doAutoWidth()
					},
					setIconClass : function(a) {
						if (this.el) {
							this.btnEl.replaceClass(this.iconCls, a)
						}
						this.iconCls = a;
						return this
					},
					setTooltip : function(b, a) {
						if (this.rendered) {
							if (!a) {
								this.clearTip()
							}
							if (Ext.isObject(b)) {
								Ext.QuickTips.register(Ext.apply( {
									target : this.btnEl.id
								}, b));
								this.tooltip = b
							} else {
								this.btnEl.dom[this.tooltipType] = b
							}
						} else {
							this.tooltip = b
						}
						return this
					},
					clearTip : function() {
						if (Ext.isObject(this.tooltip)) {
							Ext.QuickTips.unregister(this.btnEl)
						}
					},
					beforeDestroy : function() {
						if (this.rendered) {
							this.clearTip()
						}
						Ext.destroy(this.menu, this.repeater)
					},
					onDestroy : function() {
						var a = Ext.getDoc();
						a.un("mouseover", this.monitorMouseOver, this);
						a.un("mouseup", this.onMouseUp, this);
						if (this.rendered) {
							Ext.ButtonToggleMgr.unregister(this)
						}
					},
					doAutoWidth : function() {
						if (this.el && this.text && this.width === undefined) {
							this.el.setWidth("auto");
							if (Ext.isIE7 && Ext.isStrict) {
								var a = this.btnEl;
								if (a && a.getWidth() > 20) {
									a.clip();
									a.setWidth(Ext.util.TextMetrics.measure(a,
											this.text).width
											+ a.getFrameWidth("lr"))
								}
							}
							if (this.minWidth) {
								if (this.el.getWidth() < this.minWidth) {
									this.el.setWidth(this.minWidth)
								}
							}
						}
					},
					setHandler : function(b, a) {
						this.handler = b;
						this.scope = a;
						return this
					},
					setText : function(a) {
						this.text = a;
						if (this.el) {
							this.el.child("td.x-btn-mc " + this.buttonSelector)
									.update(a)
						}
						this.doAutoWidth();
						return this
					},
					getText : function() {
						return this.text
					},
					toggle : function(b, a) {
						b = b === undefined ? !this.pressed : !!b;
						if (b != this.pressed) {
							this.el[b ? "addClass" : "removeClass"]
									("x-btn-pressed");
							this.pressed = b;
							if (!a) {
								this.fireEvent("toggle", this, b);
								if (this.toggleHandler) {
									this.toggleHandler.call(this.scope || this,
											this, b)
								}
							}
						}
						return this
					},
					focus : function() {
						this.btnEl.focus()
					},
					onDisable : function() {
						this.onDisableChange(true)
					},
					onEnable : function() {
						this.onDisableChange(false)
					},
					onDisableChange : function(a) {
						if (this.el) {
							if (!Ext.isIE6 || !this.text) {
								this.el[a ? "addClass" : "removeClass"]
										(this.disabledClass)
							}
							this.el.dom.disabled = a
						}
						this.disabled = a
					},
					showMenu : function() {
						if (this.rendered && this.menu) {
							if (this.tooltip) {
								Ext.QuickTips.getQuickTip().cancelShow(
										this.btnEl)
							}
							this.menu.show(this.el, this.menuAlign)
						}
						return this
					},
					hideMenu : function() {
						if (this.menu) {
							this.menu.hide()
						}
						return this
					},
					hasVisibleMenu : function() {
						return this.menu && this.menu.isVisible()
					},
					onClick : function(a) {
						if (a) {
							a.preventDefault()
						}
						if (a.button !== 0) {
							return
						}
						if (!this.disabled) {
							if (this.enableToggle
									&& (this.allowDepress !== false || !this.pressed)) {
								this.toggle()
							}
							if (this.menu && !this.menu.isVisible()
									&& !this.ignoreNextClick) {
								this.showMenu()
							}
							this.fireEvent("click", this, a);
							if (this.handler) {
								this.handler.call(this.scope || this, this, a)
							}
						}
					},
					isMenuTriggerOver : function(b, a) {
						return this.menu && !a
					},
					isMenuTriggerOut : function(b, a) {
						return this.menu && !a
					},
					onMouseOver : function(b) {
						if (!this.disabled) {
							var a = b.within(this.el, true);
							if (!a) {
								this.el.addClass("x-btn-over");
								if (!this.monitoringMouseOver) {
									Ext.getDoc().on("mouseover",
											this.monitorMouseOver, this);
									this.monitoringMouseOver = true
								}
								this.fireEvent("mouseover", this, b)
							}
							if (this.isMenuTriggerOver(b, a)) {
								this.fireEvent("menutriggerover", this,
										this.menu, b)
							}
						}
					},
					monitorMouseOver : function(a) {
						if (a.target != this.el.dom && !a.within(this.el)) {
							if (this.monitoringMouseOver) {
								Ext.getDoc().un("mouseover",
										this.monitorMouseOver, this);
								this.monitoringMouseOver = false
							}
							this.onMouseOut(a)
						}
					},
					onMouseOut : function(b) {
						var a = b.within(this.el) && b.target != this.el.dom;
						this.el.removeClass("x-btn-over");
						this.fireEvent("mouseout", this, b);
						if (this.isMenuTriggerOut(b, a)) {
							this
									.fireEvent("menutriggerout", this,
											this.menu, b)
						}
					},
					onFocus : function(a) {
						if (!this.disabled) {
							this.el.addClass("x-btn-focus")
						}
					},
					onBlur : function(a) {
						this.el.removeClass("x-btn-focus")
					},
					getClickEl : function(b, a) {
						return this.el
					},
					onMouseDown : function(a) {
						if (!this.disabled && a.button === 0) {
							this.getClickEl(a).addClass("x-btn-click");
							Ext.getDoc().on("mouseup", this.onMouseUp, this)
						}
					},
					onMouseUp : function(a) {
						if (a.button === 0) {
							this.getClickEl(a, true).removeClass("x-btn-click");
							Ext.getDoc().un("mouseup", this.onMouseUp, this)
						}
					},
					onMenuShow : function(a) {
						this.ignoreNextClick = 0;
						this.el.addClass("x-btn-menu-active");
						this.fireEvent("menushow", this, this.menu)
					},
					onMenuHide : function(a) {
						this.el.removeClass("x-btn-menu-active");
						this.ignoreNextClick = this.restoreClick.defer(250,
								this);
						this.fireEvent("menuhide", this, this.menu)
					},
					restoreClick : function() {
						this.ignoreNextClick = 0
					}
				});
Ext.reg("button", Ext.Button);
Ext.ButtonToggleMgr = function() {
	var a = {};
	function b(e, j) {
		if (j) {
			var h = a[e.toggleGroup];
			for ( var d = 0, c = h.length; d < c; d++) {
				if (h[d] != e) {
					h[d].toggle(false)
				}
			}
		}
	}
	return {
		register : function(c) {
			if (!c.toggleGroup) {
				return
			}
			var d = a[c.toggleGroup];
			if (!d) {
				d = a[c.toggleGroup] = []
			}
			d.push(c);
			c.on("toggle", b)
		},
		unregister : function(c) {
			if (!c.toggleGroup) {
				return
			}
			var d = a[c.toggleGroup];
			if (d) {
				d.remove(c);
				c.un("toggle", b)
			}
		},
		getPressed : function(h) {
			var e = a[h];
			if (e) {
				for ( var d = 0, c = e.length; d < c; d++) {
					if (e[d].pressed === true) {
						return e[d]
					}
				}
			}
			return null
		}
	}
}();
Ext.SplitButton = Ext
		.extend(
				Ext.Button,
				{
					arrowSelector : "em",
					split : true,
					initComponent : function() {
						Ext.SplitButton.superclass.initComponent.call(this);
						this.addEvents("arrowclick")
					},
					onRender : function() {
						Ext.SplitButton.superclass.onRender.apply(this,
								arguments);
						if (this.arrowTooltip) {
							this.el.child(this.arrowSelector).dom[this.tooltipType] = this.arrowTooltip
						}
					},
					setArrowHandler : function(b, a) {
						this.arrowHandler = b;
						this.scope = a
					},
					getMenuClass : function() {
						return "x-btn-split"
								+ (this.arrowAlign == "bottom" ? "-bottom" : "")
					},
					isClickOnArrow : function(a) {
						return this.arrowAlign != "bottom" ? a.getPageX() > this.el
								.child(this.buttonSelector).getRegion().right
								: a.getPageY() > this.el.child(
										this.buttonSelector).getRegion().bottom
					},
					onClick : function(b, a) {
						b.preventDefault();
						if (!this.disabled) {
							if (this.isClickOnArrow(b)) {
								if (this.menu && !this.menu.isVisible()
										&& !this.ignoreNextClick) {
									this.showMenu()
								}
								this.fireEvent("arrowclick", this, b);
								if (this.arrowHandler) {
									this.arrowHandler.call(this.scope || this,
											this, b)
								}
							} else {
								if (this.enableToggle) {
									this.toggle()
								}
								this.fireEvent("click", this, b);
								if (this.handler) {
									this.handler.call(this.scope || this, this,
											b)
								}
							}
						}
					},
					isMenuTriggerOver : function(a) {
						return this.menu && a.target.tagName == "em"
					},
					isMenuTriggerOut : function(b, a) {
						return this.menu && b.target.tagName != "em"
					}
				});
Ext.reg("splitbutton", Ext.SplitButton);
Ext.CycleButton = Ext.extend(Ext.SplitButton, {
	getItemText : function(a) {
		if (a && this.showText === true) {
			var b = "";
			if (this.prependText) {
				b += this.prependText
			}
			b += a.text;
			return b
		}
		return undefined
	},
	setActiveItem : function(c, a) {
		if (typeof c != "object") {
			c = this.menu.items.get(c)
		}
		if (c) {
			if (!this.rendered) {
				this.text = this.getItemText(c);
				this.iconCls = c.iconCls
			} else {
				var b = this.getItemText(c);
				if (b) {
					this.setText(b)
				}
				this.setIconClass(c.iconCls)
			}
			this.activeItem = c;
			if (!c.checked) {
				c.setChecked(true, true)
			}
			if (this.forceIcon) {
				this.setIconClass(this.forceIcon)
			}
			if (!a) {
				this.fireEvent("change", this, c)
			}
		}
	},
	getActiveItem : function() {
		return this.activeItem
	},
	initComponent : function() {
		this.addEvents("change");
		if (this.changeHandler) {
			this.on("change", this.changeHandler, this.scope || this);
			delete this.changeHandler
		}
		this.itemCount = this.items.length;
		this.menu = {
			cls : "x-cycle-menu",
			items : []
		};
		var d;
		for ( var b = 0, a = this.itemCount; b < a; b++) {
			var c = this.items[b];
			c.group = c.group || this.id;
			c.itemIndex = b;
			c.checkHandler = this.checkHandler;
			c.scope = this;
			c.checked = c.checked || false;
			this.menu.items.push(c);
			if (c.checked) {
				d = c
			}
		}
		this.setActiveItem(d, true);
		Ext.CycleButton.superclass.initComponent.call(this);
		this.on("click", this.toggleSelected, this)
	},
	checkHandler : function(a, b) {
		if (b) {
			this.setActiveItem(a)
		}
	},
	toggleSelected : function() {
		this.menu.render();
		var c, a;
		for ( var b = 1; b < this.itemCount; b++) {
			c = (this.activeItem.itemIndex + b) % this.itemCount;
			a = this.menu.items.itemAt(c);
			if (!a.disabled) {
				a.setChecked(true);
				break
			}
		}
	}
});
Ext.reg("cycle", Ext.CycleButton);
Ext.layout.ToolbarLayout = Ext
		.extend(
				Ext.layout.ContainerLayout,
				{
					monitorResize : true,
					triggerWidth : 18,
					lastOverflow : false,
					noItemsMenuText : '<div class="x-toolbar-no-items">(None)</div>',
					onLayout : function(d, g) {
						if (!this.leftTr) {
							g.addClass("x-toolbar-layout-ct");
							g
									.insertHtml(
											"beforeEnd",
											'<table cellspacing="0" class="x-toolbar-ct"><tbody><tr><td class="x-toolbar-left" align="left"><table cellspacing="0"><tbody><tr class="x-toolbar-left-row"></tr></tbody></table></td><td class="x-toolbar-right" align="right"><table cellspacing="0" class="x-toolbar-right-ct"><tbody><tr><td><table cellspacing="0"><tbody><tr class="x-toolbar-right-row"></tr></tbody></table></td><td><table cellspacing="0"><tbody><tr class="x-toolbar-extras-row"></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>');
							this.leftTr = g
									.child("tr.x-toolbar-left-row", true);
							this.rightTr = g.child("tr.x-toolbar-right-row",
									true);
							this.extrasTr = g.child("tr.x-toolbar-extras-row",
									true)
						}
						var h = this.leftTr;
						var l = 0;
						var j = d.items.items;
						for ( var b = 0, e = j.length, k; b < e; b++, l++) {
							k = j[b];
							if (k.isFill) {
								h = this.rightTr;
								l = -1
							} else {
								if (!k.rendered) {
									k.render(this.insertCell(k, h, l))
								} else {
									if (!k.xtbHidden
											&& !this.isValidParent(k,
													h.childNodes[l])) {
										var a = this.insertCell(k, h, l);
										a.appendChild(k.getDomPositionEl().dom);
										k.container = Ext.get(a)
									}
								}
							}
						}
						this.cleanup(this.leftTr);
						this.cleanup(this.rightTr);
						this.cleanup(this.extrasTr);
						this.fitToSize(g)
					},
					cleanup : function(b) {
						var e = b.childNodes;
						for ( var a = e.length - 1, d; a >= 0 && (d = e[a]); a--) {
							if (!d.firstChild) {
								b.removeChild(d)
							}
						}
					},
					insertCell : function(e, a, d) {
						var b = document.createElement("td");
						b.className = "x-toolbar-cell";
						a.insertBefore(b, a.childNodes[d] || null);
						return b
					},
					hideItem : function(b) {
						var a = (this.hiddens = this.hiddens || []);
						a.push(b);
						b.xtbHidden = true;
						b.xtbWidth = b.getDomPositionEl().dom.parentNode.offsetWidth;
						b.hide()
					},
					unhideItem : function(a) {
						a.show();
						a.xtbHidden = false;
						this.hiddens.remove(a);
						if (this.hiddens.length < 1) {
							delete this.hiddens
						}
					},
					getItemWidth : function(a) {
						return a.hidden ? (a.xtbWidth || 0) : a
								.getDomPositionEl().dom.parentNode.offsetWidth
					},
					fitToSize : function(n) {
						if (this.container.enableOverflow === false) {
							return
						}
						var m = n.dom.clientWidth;
						var b = this.lastWidth || 0;
						this.lastWidth = m;
						var d = n.dom.firstChild.offsetWidth;
						var l = m - this.triggerWidth;
						var k = -1;
						if (d > m || (this.hiddens && m >= b)) {
							var e, h = this.container.items.items, g = h.length, j;
							var a = 0;
							for (e = 0; e < g; e++) {
								j = h[e];
								if (!j.isFill) {
									a += this.getItemWidth(j);
									if (a > l) {
										if (!j.xtbHidden) {
											this.hideItem(j)
										}
									} else {
										if (j.xtbHidden) {
											this.unhideItem(j)
										}
									}
								}
							}
						}
						if (this.hiddens) {
							this.initMore();
							if (!this.lastOverflow) {
								this.container.fireEvent("overflowchange",
										this.container, true);
								this.lastOverflow = true
							}
						} else {
							if (this.more) {
								this.clearMenu();
								this.more.destroy();
								delete this.more;
								if (this.lastOverflow) {
									this.container.fireEvent("overflowchange",
											this.container, false);
									this.lastOverflow = false
								}
							}
						}
					},
					createMenuConfig : function(e, b) {
						var a = Ext.apply( {}, e.initialConfig), d = e.toggleGroup;
						Ext.apply(a, {
							text : e.overflowText || e.text,
							iconCls : e.iconCls,
							icon : e.icon,
							itemId : e.itemId,
							disabled : e.disabled,
							handler : e.handler,
							scope : e.scope,
							menu : e.menu,
							hideOnClick : b
						});
						if (d || e.enableToggle) {
							Ext.apply(a, {
								group : d,
								checked : e.pressed,
								listeners : {
									checkchange : function(g, c) {
										e.toggle(c)
									}
								}
							})
						}
						delete a.xtype;
						delete a.id;
						return a
					},
					addComponentToMenu : function(a, b) {
						if (b instanceof Ext.Toolbar.Separator) {
							a.add("-")
						} else {
							if (Ext.isFunction(b.isXType)) {
								if (b.isXType("splitbutton")) {
									a.add(this.createMenuConfig(b, true))
								} else {
									if (b.isXType("button")) {
										a
												.add(this.createMenuConfig(b,
														!b.menu))
									} else {
										if (b.isXType("buttongroup")) {
											b.items.each( function(c) {
												this.addComponentToMenu(a, c)
											}, this)
										}
									}
								}
							}
						}
					},
					clearMenu : function() {
						var a = this.moreMenu;
						if (a && a.items) {
							this.moreMenu.items.each( function(b) {
								delete b.menu
							})
						}
					},
					beforeMoreShow : function(b) {
						var g = this.container.items.items, a = g.length, k, j, d = function(
								h, c) {
							return h.isXType("buttongroup")
									&& !(c instanceof Ext.Toolbar.Separator)
						};
						this.clearMenu();
						b.removeAll();
						for ( var e = 0; e < a; e++) {
							k = g[e];
							if (k.xtbHidden) {
								if (j && (d(k, j) || d(j, k))) {
									b.add("-")
								}
								this.addComponentToMenu(b, k);
								j = k
							}
						}
						if (b.items.length < 1) {
							b.add(this.noItemsMenuText)
						}
					},
					initMore : function() {
						if (!this.more) {
							this.moreMenu = new Ext.menu.Menu( {
								listeners : {
									beforeshow : this.beforeMoreShow,
									scope : this
								}
							});
							this.more = new Ext.Button( {
								iconCls : "x-toolbar-more-icon",
								cls : "x-toolbar-more",
								menu : this.moreMenu
							});
							var a = this.insertCell(this.more, this.extrasTr,
									100);
							this.more.render(a)
						}
					},
					destroy : function() {
						Ext.destroy(this.more, this.moreMenu);
						Ext.layout.ToolbarLayout.superclass.destroy.call(this)
					}
				});
Ext.Container.LAYOUTS.toolbar = Ext.layout.ToolbarLayout;
Ext.Toolbar = function(a) {
	if (Ext.isArray(a)) {
		a = {
			items : a,
			layout : "toolbar"
		}
	} else {
		a = Ext.apply( {
			layout : "toolbar"
		}, a);
		if (a.buttons) {
			a.items = a.buttons
		}
	}
	Ext.Toolbar.superclass.constructor.call(this, a)
};
( function() {
	var a = Ext.Toolbar;
	Ext.extend(a, Ext.Container, {
		defaultType : "button",
		trackMenus : true,
		internalDefaults : {
			removeMode : "container",
			hideParent : true
		},
		toolbarCls : "x-toolbar",
		initComponent : function() {
			a.superclass.initComponent.call(this);
			this.addEvents("overflowchange")
		},
		onRender : function(c, b) {
			if (!this.el) {
				if (!this.autoCreate) {
					this.autoCreate = {
						cls : this.toolbarCls + " x-small-editor"
					}
				}
				this.el = c.createChild(Ext.apply( {
					id : this.id
				}, this.autoCreate), b)
			}
		},
		lookupComponent : function(b) {
			if (Ext.isString(b)) {
				if (b == "-") {
					b = new a.Separator()
				} else {
					if (b == " ") {
						b = new a.Spacer()
					} else {
						if (b == "->") {
							b = new a.Fill()
						} else {
							b = new a.TextItem(b)
						}
					}
				}
				this.applyDefaults(b)
			} else {
				if (b.isFormField || b.render) {
					b = this.constructItem(b)
				} else {
					if (b.tag) {
						b = new a.Item( {
							autoEl : b
						})
					} else {
						if (b.tagName) {
							b = new a.Item( {
								el : b
							})
						} else {
							if (Ext.isObject(b)) {
								b = b.xtype ? this.constructItem(b) : this
										.constructButton(b)
							}
						}
					}
				}
			}
			return b
		},
		applyDefaults : function(e) {
			if (!Ext.isString(e)) {
				e = Ext.Toolbar.superclass.applyDefaults.call(this, e);
				var b = this.internalDefaults;
				if (e.events) {
					Ext.applyIf(e.initialConfig, b);
					Ext.apply(e, b)
				} else {
					Ext.applyIf(e, b)
				}
			}
			return e
		},
		constructItem : function(c, b) {
			return Ext.create(c, b || this.defaultType)
		},
		addSeparator : function() {
			return this.add(new a.Separator())
		},
		addSpacer : function() {
			return this.add(new a.Spacer())
		},
		addFill : function() {
			this.add(new a.Fill())
		},
		addElement : function(b) {
			return this.addItem(new a.Item( {
				el : b
			}))
		},
		addItem : function(b) {
			return Ext.Toolbar.superclass.add.apply(this, arguments)
		},
		addButton : function(c) {
			if (Ext.isArray(c)) {
				var e = [];
				for ( var d = 0, b = c.length; d < b; d++) {
					e.push(this.addButton(c[d]))
				}
				return e
			}
			return this.add(this.constructButton(c))
		},
		addText : function(b) {
			return this.addItem(new a.TextItem(b))
		},
		addDom : function(b) {
			return this.add(new a.Item( {
				autoEl : b
			}))
		},
		addField : function(b) {
			return this.add(b)
		},
		insertButton : function(c, g) {
			if (Ext.isArray(g)) {
				var e = [];
				for ( var d = 0, b = g.length; d < b; d++) {
					e.push(this.insertButton(c + d, g[d]))
				}
				return e
			}
			return Ext.Toolbar.superclass.insert.call(this, c, g)
		},
		initMenuTracking : function(b) {
			if (this.trackMenus && b.menu) {
				this.mon(b, {
					menutriggerover : this.onButtonTriggerOver,
					menushow : this.onButtonMenuShow,
					menuhide : this.onButtonMenuHide,
					scope : this
				})
			}
		},
		constructButton : function(d) {
			var c = d.events ? d : this.constructItem(d,
					d.split ? "splitbutton" : this.defaultType);
			this.initMenuTracking(c);
			return c
		},
		onDisable : function() {
			this.items.each( function(b) {
				if (b.disable) {
					b.disable()
				}
			})
		},
		onEnable : function() {
			this.items.each( function(b) {
				if (b.enable) {
					b.enable()
				}
			})
		},
		onButtonTriggerOver : function(b) {
			if (this.activeMenuBtn && this.activeMenuBtn != b) {
				this.activeMenuBtn.hideMenu();
				b.showMenu();
				this.activeMenuBtn = b
			}
		},
		onButtonMenuShow : function(b) {
			this.activeMenuBtn = b
		},
		onButtonMenuHide : function(b) {
			delete this.activeMenuBtn
		}
	});
	Ext.reg("toolbar", Ext.Toolbar);
	a.Item = Ext.extend(Ext.BoxComponent, {
		hideParent : true,
		enable : Ext.emptyFn,
		disable : Ext.emptyFn,
		focus : Ext.emptyFn
	});
	Ext.reg("tbitem", a.Item);
	a.Separator = Ext.extend(a.Item, {
		onRender : function(c, b) {
			this.el = c.createChild( {
				tag : "span",
				cls : "xtb-sep"
			}, b)
		}
	});
	Ext.reg("tbseparator", a.Separator);
	a.Spacer = Ext.extend(a.Item, {
		onRender : function(c, b) {
			this.el = c.createChild( {
				tag : "div",
				cls : "xtb-spacer",
				style : this.width ? "width:" + this.width + "px" : ""
			}, b)
		}
	});
	Ext.reg("tbspacer", a.Spacer);
	a.Fill = Ext.extend(a.Item, {
		render : Ext.emptyFn,
		isFill : true
	});
	Ext.reg("tbfill", a.Fill);
	a.TextItem = Ext.extend(a.Item, {
		constructor : function(b) {
			if (Ext.isString(b)) {
				b = {
					autoEl : {
						cls : "xtb-text",
						html : b
					}
				}
			} else {
				b.autoEl = {
					cls : "xtb-text",
					html : b.text || ""
				}
			}
			a.TextItem.superclass.constructor.call(this, b)
		},
		setText : function(b) {
			if (this.rendered) {
				this.el.dom.innerHTML = b
			} else {
				this.autoEl.html = b
			}
		}
	});
	Ext.reg("tbtext", a.TextItem);
	a.Button = Ext.extend(Ext.Button, {});
	a.SplitButton = Ext.extend(Ext.SplitButton, {});
	Ext.reg("tbbutton", a.Button);
	Ext.reg("tbsplit", a.SplitButton)
})();
Ext.ButtonGroup = Ext.extend(Ext.Panel, {
	baseCls : "x-btn-group",
	layout : "table",
	defaultType : "button",
	frame : true,
	internalDefaults : {
		removeMode : "container",
		hideParent : true
	},
	initComponent : function() {
		this.layoutConfig = this.layoutConfig || {};
		Ext.applyIf(this.layoutConfig, {
			columns : this.columns
		});
		if (!this.title) {
			this.addClass("x-btn-group-notitle")
		}
		this.on("afterlayout", this.onAfterLayout, this);
		Ext.ButtonGroup.superclass.initComponent.call(this)
	},
	applyDefaults : function(b) {
		b = Ext.ButtonGroup.superclass.applyDefaults.call(this, b);
		var a = this.internalDefaults;
		if (b.events) {
			Ext.applyIf(b.initialConfig, a);
			Ext.apply(b, a)
		} else {
			Ext.applyIf(b, a)
		}
		return b
	},
	onAfterLayout : function() {
		var a = this.body.getFrameWidth("lr")
				+ this.body.dom.firstChild.offsetWidth;
		this.body.setWidth(a);
		this.el.setWidth(a + this.getFrameWidth())
	}
});
Ext.reg("buttongroup", Ext.ButtonGroup);
( function() {
	var a = Ext.Toolbar;
	Ext.PagingToolbar = Ext.extend(Ext.Toolbar, {
		pageSize : 20,
		displayMsg : "Displaying {0} - {1} of {2}",
		emptyMsg : "No data to display",
		beforePageText : "Page",
		afterPageText : "of {0}",
		firstText : "First Page",
		prevText : "Previous Page",
		nextText : "Next Page",
		lastText : "Last Page",
		refreshText : "Refresh",
		initComponent : function() {
			var c = [ this.first = new a.Button( {
				tooltip : this.firstText,
				overflowText : this.firstText,
				iconCls : "x-tbar-page-first",
				disabled : true,
				handler : this.moveFirst,
				scope : this
			}), this.prev = new a.Button( {
				tooltip : this.prevText,
				overflowText : this.prevText,
				iconCls : "x-tbar-page-prev",
				disabled : true,
				handler : this.movePrevious,
				scope : this
			}), "-", this.beforePageText,
					this.inputItem = new Ext.form.NumberField( {
						cls : "x-tbar-page-number",
						allowDecimals : false,
						allowNegative : false,
						enableKeyEvents : true,
						selectOnFocus : true,
						listeners : {
							scope : this,
							keydown : this.onPagingKeyDown,
							blur : this.onPagingBlur
						}
					}), this.afterTextItem = new a.TextItem( {
						text : String.format(this.afterPageText, 1)
					}), "-", this.next = new a.Button( {
						tooltip : this.nextText,
						overflowText : this.nextText,
						iconCls : "x-tbar-page-next",
						disabled : true,
						handler : this.moveNext,
						scope : this
					}), this.last = new a.Button( {
						tooltip : this.lastText,
						overflowText : this.lastText,
						iconCls : "x-tbar-page-last",
						disabled : true,
						handler : this.moveLast,
						scope : this
					}), "-", this.refresh = new a.Button( {
						tooltip : this.refreshText,
						overflowText : this.refreshText,
						iconCls : "x-tbar-loading",
						handler : this.refresh,
						scope : this
					}) ];
			var b = this.items || this.buttons || [];
			if (this.prependButtons) {
				this.items = b.concat(c)
			} else {
				this.items = c.concat(b)
			}
			delete this.buttons;
			if (this.displayInfo) {
				this.items.push("->");
				this.items.push(this.displayItem = new a.TextItem( {}))
			}
			Ext.PagingToolbar.superclass.initComponent.call(this);
			this.addEvents("change", "beforechange");
			this.on("afterlayout", this.onFirstLayout, this, {
				single : true
			});
			this.cursor = 0;
			this.bindStore(this.store)
		},
		onFirstLayout : function() {
			if (this.dsLoaded) {
				this.onLoad.apply(this, this.dsLoaded)
			}
		},
		updateInfo : function() {
			if (this.displayItem) {
				var b = this.store.getCount();
				var c = b == 0 ? this.emptyMsg : String.format(this.displayMsg,
						this.cursor + 1, this.cursor + b, this.store
								.getTotalCount());
				this.displayItem.setText(c)
			}
		},
		onLoad : function(b, e, j) {
			if (!this.rendered) {
				this.dsLoaded = [ b, e, j ];
				return
			}
			var g = this.getParams();
			this.cursor = (j.params && j.params[g.start]) ? j.params[g.start]
					: 0;
			var i = this.getPageData(), c = i.activePage, h = i.pages;
			this.afterTextItem.setText(String.format(this.afterPageText,
					i.pages));
			this.inputItem.setValue(c);
			this.first.setDisabled(c == 1);
			this.prev.setDisabled(c == 1);
			this.next.setDisabled(c == h);
			this.last.setDisabled(c == h);
			this.refresh.enable();
			this.updateInfo();
			this.fireEvent("change", this, i)
		},
		getPageData : function() {
			var b = this.store.getTotalCount();
			return {
				total : b,
				activePage : Math.ceil((this.cursor + this.pageSize)
						/ this.pageSize),
				pages : b < this.pageSize ? 1 : Math.ceil(b / this.pageSize)
			}
		},
		changePage : function(b) {
			this.doLoad(((b - 1) * this.pageSize).constrain(0, this.store
					.getTotalCount()))
		},
		onLoadError : function() {
			if (!this.rendered) {
				return
			}
			this.refresh.enable()
		},
		readPage : function(e) {
			var b = this.inputItem.getValue(), c;
			if (!b || isNaN(c = parseInt(b, 10))) {
				this.inputItem.setValue(e.activePage);
				return false
			}
			return c
		},
		onPagingFocus : function() {
			this.inputItem.select()
		},
		onPagingBlur : function(b) {
			this.inputItem.setValue(this.getPageData().activePage)
		},
		onPagingKeyDown : function(i, h) {
			var c = h.getKey(), j = this.getPageData(), g;
			if (c == h.RETURN) {
				h.stopEvent();
				g = this.readPage(j);
				if (g !== false) {
					g = Math.min(Math.max(1, g), j.pages) - 1;
					this.doLoad(g * this.pageSize)
				}
			} else {
				if (c == h.HOME || c == h.END) {
					h.stopEvent();
					g = c == h.HOME ? 1 : j.pages;
					i.setValue(g)
				} else {
					if (c == h.UP || c == h.PAGEUP || c == h.DOWN
							|| c == h.PAGEDOWN) {
						h.stopEvent();
						if ((g = this.readPage(j))) {
							var b = h.shiftKey ? 10 : 1;
							if (c == h.DOWN || c == h.PAGEDOWN) {
								b *= -1
							}
							g += b;
							if (g >= 1 & g <= j.pages) {
								i.setValue(g)
							}
						}
					}
				}
			}
		},
		getParams : function() {
			return this.paramNames || this.store.paramNames
		},
		beforeLoad : function() {
			if (this.rendered && this.refresh) {
				this.refresh.disable()
			}
		},
		doLoad : function(d) {
			var c = {}, b = this.getParams();
			c[b.start] = d;
			c[b.limit] = this.pageSize;
			if (this.fireEvent("beforechange", this, c) !== false) {
				this.store.load( {
					params : c
				})
			}
		},
		moveFirst : function() {
			this.doLoad(0)
		},
		movePrevious : function() {
			this.doLoad(Math.max(0, this.cursor - this.pageSize))
		},
		moveNext : function() {
			this.doLoad(this.cursor + this.pageSize)
		},
		moveLast : function() {
			var c = this.store.getTotalCount(), b = c % this.pageSize;
			this.doLoad(b ? (c - b) : c - this.pageSize)
		},
		refresh : function() {
			this.doLoad(this.cursor)
		},
		bindStore : function(c, d) {
			var b;
			if (!d && this.store) {
				this.store.un("beforeload", this.beforeLoad, this);
				this.store.un("load", this.onLoad, this);
				this.store.un("exception", this.onLoadError, this);
				if (c !== this.store && this.store.autoDestroy) {
					this.store.destroy()
				}
			}
			if (c) {
				c = Ext.StoreMgr.lookup(c);
				c.on( {
					scope : this,
					beforeload : this.beforeLoad,
					load : this.onLoad,
					exception : this.onLoadError
				});
				b = c.getCount() > 0
			}
			this.store = c;
			if (b) {
				this.onLoad(c, null, {})
			}
		},
		unbind : function(b) {
			this.bindStore(null)
		},
		bind : function(b) {
			this.bindStore(b)
		},
		onDestroy : function() {
			this.bindStore(null);
			Ext.PagingToolbar.superclass.onDestroy.call(this)
		}
	})
})();
Ext.reg("paging", Ext.PagingToolbar);
Ext.History = ( function() {
	var e, c;
	var k = false;
	var d;
	function g() {
		var l = top.location.href, m = l.indexOf("#");
		return m >= 0 ? l.substr(m + 1) : null
	}
	function a() {
		c.value = d
	}
	function h(l) {
		d = l;
		Ext.History.fireEvent("change", l)
	}
	function i(m) {
		var l = [ '<html><body><div id="state">', m, "</div></body></html>" ]
				.join("");
		try {
			var o = e.contentWindow.document;
			o.open();
			o.write(l);
			o.close();
			return true
		} catch (n) {
			return false
		}
	}
	function b() {
		if (!e.contentWindow || !e.contentWindow.document) {
			setTimeout(b, 10);
			return
		}
		var o = e.contentWindow.document;
		var m = o.getElementById("state");
		var l = m ? m.innerText : null;
		var n = g();
		setInterval( function() {
			o = e.contentWindow.document;
			m = o.getElementById("state");
			var q = m ? m.innerText : null;
			var p = g();
			if (q !== l) {
				l = q;
				h(l);
				top.location.hash = l;
				n = l;
				a()
			} else {
				if (p !== n) {
					n = p;
					i(p)
				}
			}
		}, 50);
		k = true;
		Ext.History.fireEvent("ready", Ext.History)
	}
	function j() {
		d = c.value ? c.value : g();
		if (Ext.isIE) {
			b()
		} else {
			var l = g();
			setInterval( function() {
				var m = g();
				if (m !== l) {
					l = m;
					h(l);
					a()
				}
			}, 50);
			k = true;
			Ext.History.fireEvent("ready", Ext.History)
		}
	}
	return {
		fieldId : "x-history-field",
		iframeId : "x-history-frame",
		events : {},
		init : function(m, l) {
			if (k) {
				Ext.callback(m, l, [ this ]);
				return
			}
			if (!Ext.isReady) {
				Ext.onReady( function() {
					Ext.History.init(m, l)
				});
				return
			}
			c = Ext.getDom(Ext.History.fieldId);
			if (Ext.isIE) {
				e = Ext.getDom(Ext.History.iframeId)
			}
			this.addEvents("ready", "change");
			if (m) {
				this.on("ready", m, l, {
					single : true
				})
			}
			j()
		},
		add : function(l, m) {
			if (m !== false) {
				if (this.getToken() == l) {
					return true
				}
			}
			if (Ext.isIE) {
				return i(l)
			} else {
				top.location.hash = l;
				return true
			}
		},
		back : function() {
			history.go(-1)
		},
		forward : function() {
			history.go(1)
		},
		getToken : function() {
			return k ? d : g()
		}
	}
})();
Ext.apply(Ext.History, new Ext.util.Observable());
Ext.Tip = Ext
		.extend(
				Ext.Panel,
				{
					minWidth : 40,
					maxWidth : 300,
					shadow : "sides",
					defaultAlign : "tl-bl?",
					autoRender : true,
					quickShowInterval : 250,
					frame : true,
					hidden : true,
					baseCls : "x-tip",
					floating : {
						shadow : true,
						shim : true,
						useDisplay : true,
						constrain : false
					},
					autoHeight : true,
					closeAction : "hide",
					initComponent : function() {
						Ext.Tip.superclass.initComponent.call(this);
						if (this.closable && !this.title) {
							this.elements += ",header"
						}
					},
					afterRender : function() {
						Ext.Tip.superclass.afterRender.call(this);
						if (this.closable) {
							this.addTool( {
								id : "close",
								handler : this[this.closeAction],
								scope : this
							})
						}
					},
					showAt : function(a) {
						Ext.Tip.superclass.show.call(this);
						if (this.measureWidth !== false
								&& (!this.initialConfig || typeof this.initialConfig.width != "number")) {
							this.doAutoWidth()
						}
						if (this.constrainPosition) {
							a = this.el.adjustForConstraints(a)
						}
						this.setPagePosition(a[0], a[1])
					},
					doAutoWidth : function() {
						var a = this.body.getTextWidth();
						if (this.title) {
							a = Math.max(a, this.header.child("span")
									.getTextWidth(this.title))
						}
						a += this.getFrameWidth() + (this.closable ? 20 : 0)
								+ this.body.getPadding("lr");
						this
								.setWidth(a.constrain(this.minWidth,
										this.maxWidth));
						if (Ext.isIE7 && !this.repainted) {
							this.el.repaint();
							this.repainted = true
						}
					},
					showBy : function(a, b) {
						if (!this.rendered) {
							this.render(Ext.getBody())
						}
						this.showAt(this.el.getAlignToXY(a, b
								|| this.defaultAlign))
					},
					initDraggable : function() {
						this.dd = new Ext.Tip.DD(this,
								typeof this.draggable == "boolean" ? null
										: this.draggable);
						this.header.addClass("x-tip-draggable")
					}
				});
Ext.Tip.DD = function(b, a) {
	Ext.apply(this, a);
	this.tip = b;
	Ext.Tip.DD.superclass.constructor.call(this, b.el.id, "WindowDD-" + b.id);
	this.setHandleElId(b.header.id);
	this.scroll = false
};
Ext.extend(Ext.Tip.DD, Ext.dd.DD, {
	moveOnly : true,
	scroll : false,
	headerOffsets : [ 100, 25 ],
	startDrag : function() {
		this.tip.el.disableShadow()
	},
	endDrag : function(a) {
		this.tip.el.enableShadow(true)
	}
});
Ext.ToolTip = Ext
		.extend(
				Ext.Tip,
				{
					showDelay : 500,
					hideDelay : 200,
					dismissDelay : 5000,
					trackMouse : false,
					anchorToTarget : true,
					anchorOffset : 0,
					targetCounter : 0,
					constrainPosition : false,
					initComponent : function() {
						Ext.ToolTip.superclass.initComponent.call(this);
						this.lastActive = new Date();
						this.initTarget(this.target);
						this.origAnchor = this.anchor
					},
					onRender : function(b, a) {
						Ext.ToolTip.superclass.onRender.call(this, b, a);
						this.anchorCls = "x-tip-anchor-"
								+ this.getAnchorPosition();
						this.anchorEl = this.el.createChild( {
							cls : "x-tip-anchor " + this.anchorCls
						})
					},
					afterRender : function() {
						Ext.ToolTip.superclass.afterRender.call(this);
						this.anchorEl.setStyle("z-index",
								this.el.getZIndex() + 1)
					},
					initTarget : function(b) {
						var a;
						if ((a = Ext.get(b))) {
							if (this.target) {
								this.target = Ext.get(this.target);
								this.target.un("mouseover", this.onTargetOver,
										this);
								this.target.un("mouseout", this.onTargetOut,
										this);
								this.target.un("mousemove", this.onMouseMove,
										this)
							}
							this.mon(a, {
								mouseover : this.onTargetOver,
								mouseout : this.onTargetOut,
								mousemove : this.onMouseMove,
								scope : this
							});
							this.target = a
						}
						if (this.anchor) {
							this.anchorTarget = this.target
						}
					},
					onMouseMove : function(b) {
						var a = this.delegate ? b.getTarget(this.delegate)
								: this.triggerElement = true;
						if (a) {
							this.targetXY = b.getXY();
							if (a === this.triggerElement) {
								if (!this.hidden && this.trackMouse) {
									this.setPagePosition(this.getTargetXY())
								}
							} else {
								this.hide();
								this.lastActive = new Date(0);
								this.onTargetOver(b)
							}
						} else {
							if (!this.closable && this.isVisible()) {
								this.hide()
							}
						}
					},
					getTargetXY : function() {
						if (this.anchor) {
							this.targetCounter++;
							var c = this.getOffsets();
							var j = (this.anchorToTarget && !this.trackMouse) ? this.el
									.getAlignToXY(this.anchorTarget, this
											.getAnchorAlign())
									: this.targetXY;
							var a = Ext.lib.Dom.getViewWidth() - 5;
							var g = Ext.lib.Dom.getViewHeight() - 5;
							var i = (document.documentElement.scrollLeft
									|| document.body.scrollLeft || 0) + 5;
							var h = (document.documentElement.scrollTop
									|| document.body.scrollTop || 0) + 5;
							var b = [ j[0] + c[0], j[1] + c[1] ];
							var e = this.getSize();
							this.anchorEl.removeClass(this.anchorCls);
							if (this.targetCounter < 2) {
								if (b[0] < i) {
									if (this.anchorToTarget) {
										this.defaultAlign = "l-r";
										if (this.mouseOffset) {
											this.mouseOffset[0] *= -1
										}
									}
									this.anchor = "left";
									return this.getTargetXY()
								}
								if (b[0] + e.width > a) {
									if (this.anchorToTarget) {
										this.defaultAlign = "r-l";
										if (this.mouseOffset) {
											this.mouseOffset[0] *= -1
										}
									}
									this.anchor = "right";
									return this.getTargetXY()
								}
								if (b[1] < h) {
									if (this.anchorToTarget) {
										this.defaultAlign = "t-b";
										if (this.mouseOffset) {
											this.mouseOffset[1] *= -1
										}
									}
									this.anchor = "top";
									return this.getTargetXY()
								}
								if (b[1] + e.height > g) {
									if (this.anchorToTarget) {
										this.defaultAlign = "b-t";
										if (this.mouseOffset) {
											this.mouseOffset[1] *= -1
										}
									}
									this.anchor = "bottom";
									return this.getTargetXY()
								}
							}
							this.anchorCls = "x-tip-anchor-"
									+ this.getAnchorPosition();
							this.anchorEl.addClass(this.anchorCls);
							this.targetCounter = 0;
							return b
						} else {
							var d = this.getMouseOffset();
							return [ this.targetXY[0] + d[0],
									this.targetXY[1] + d[1] ]
						}
					},
					getMouseOffset : function() {
						var a = this.anchor ? [ 0, 0 ] : [ 15, 18 ];
						if (this.mouseOffset) {
							a[0] += this.mouseOffset[0];
							a[1] += this.mouseOffset[1]
						}
						return a
					},
					getAnchorPosition : function() {
						if (this.anchor) {
							this.tipAnchor = this.anchor.charAt(0)
						} else {
							var a = this.defaultAlign
									.match(/^([a-z]+)-([a-z]+)(\?)?$/);
							if (!a) {
								throw "AnchorTip.defaultAlign is invalid"
							}
							this.tipAnchor = a[1].charAt(0)
						}
						switch (this.tipAnchor) {
						case "t":
							return "top";
						case "b":
							return "bottom";
						case "r":
							return "right"
						}
						return "left"
					},
					getAnchorAlign : function() {
						switch (this.anchor) {
						case "top":
							return "tl-bl";
						case "left":
							return "tl-tr";
						case "right":
							return "tr-tl";
						default:
							return "bl-tl"
						}
					},
					getOffsets : function() {
						var b, a = this.getAnchorPosition().charAt(0);
						if (this.anchorToTarget && !this.trackMouse) {
							switch (a) {
							case "t":
								b = [ 0, 9 ];
								break;
							case "b":
								b = [ 0, -13 ];
								break;
							case "r":
								b = [ -13, 0 ];
								break;
							default:
								b = [ 9, 0 ];
								break
							}
						} else {
							switch (a) {
							case "t":
								b = [ -15 - this.anchorOffset, 30 ];
								break;
							case "b":
								b = [ -19 - this.anchorOffset,
										-13 - this.el.dom.offsetHeight ];
								break;
							case "r":
								b = [ -15 - this.el.dom.offsetWidth,
										-13 - this.anchorOffset ];
								break;
							default:
								b = [ 25, -13 - this.anchorOffset ];
								break
							}
						}
						var c = this.getMouseOffset();
						b[0] += c[0];
						b[1] += c[1];
						return b
					},
					onTargetOver : function(b) {
						if (this.disabled || b.within(this.target.dom, true)) {
							return
						}
						var a = b.getTarget(this.delegate);
						if (a) {
							this.triggerElement = a;
							this.clearTimer("hide");
							this.targetXY = b.getXY();
							this.delayShow()
						}
					},
					delayShow : function() {
						if (this.hidden && !this.showTimer) {
							if (this.lastActive.getElapsed() < this.quickShowInterval) {
								this.show()
							} else {
								this.showTimer = this.show.defer(
										this.showDelay, this)
							}
						} else {
							if (!this.hidden && this.autoHide !== false) {
								this.show()
							}
						}
					},
					onTargetOut : function(a) {
						if (this.disabled || a.within(this.target.dom, true)) {
							return
						}
						this.clearTimer("show");
						if (this.autoHide !== false) {
							this.delayHide()
						}
					},
					delayHide : function() {
						if (!this.hidden && !this.hideTimer) {
							this.hideTimer = this.hide.defer(this.hideDelay,
									this)
						}
					},
					hide : function() {
						this.clearTimer("dismiss");
						this.lastActive = new Date();
						if (this.anchorEl) {
							this.anchorEl.hide()
						}
						Ext.ToolTip.superclass.hide.call(this);
						delete this.triggerElement
					},
					show : function() {
						if (this.anchor) {
							this.showAt( [ -1000, -1000 ]);
							this.origConstrainPosition = this.constrainPosition;
							this.constrainPosition = false;
							this.anchor = this.origAnchor
						}
						this.showAt(this.getTargetXY());
						if (this.anchor) {
							this.syncAnchor();
							this.anchorEl.show();
							this.constrainPosition = this.origConstrainPosition
						} else {
							this.anchorEl.hide()
						}
					},
					showAt : function(a) {
						this.lastActive = new Date();
						this.clearTimers();
						Ext.ToolTip.superclass.showAt.call(this, a);
						if (this.dismissDelay && this.autoHide !== false) {
							this.dismissTimer = this.hide.defer(
									this.dismissDelay, this)
						}
					},
					syncAnchor : function() {
						var a, b, c;
						switch (this.tipAnchor.charAt(0)) {
						case "t":
							a = "b";
							b = "tl";
							c = [ 20 + this.anchorOffset, 2 ];
							break;
						case "r":
							a = "l";
							b = "tr";
							c = [ -2, 11 + this.anchorOffset ];
							break;
						case "b":
							a = "t";
							b = "bl";
							c = [ 20 + this.anchorOffset, -2 ];
							break;
						default:
							a = "r";
							b = "tl";
							c = [ 2, 11 + this.anchorOffset ];
							break
						}
						this.anchorEl.alignTo(this.el, a + "-" + b, c)
					},
					setPagePosition : function(a, b) {
						Ext.ToolTip.superclass.setPagePosition.call(this, a, b);
						if (this.anchor) {
							this.syncAnchor()
						}
					},
					clearTimer : function(a) {
						a = a + "Timer";
						clearTimeout(this[a]);
						delete this[a]
					},
					clearTimers : function() {
						this.clearTimer("show");
						this.clearTimer("dismiss");
						this.clearTimer("hide")
					},
					onShow : function() {
						Ext.ToolTip.superclass.onShow.call(this);
						Ext.getDoc().on("mousedown", this.onDocMouseDown, this)
					},
					onHide : function() {
						Ext.ToolTip.superclass.onHide.call(this);
						Ext.getDoc().un("mousedown", this.onDocMouseDown, this)
					},
					onDocMouseDown : function(a) {
						if (this.autoHide !== true && !this.closable
								&& !a.within(this.el.dom)) {
							this.disable();
							this.enable.defer(100, this)
						}
					},
					onDisable : function() {
						this.clearTimers();
						this.hide()
					},
					adjustPosition : function(a, d) {
						if (this.contstrainPosition) {
							var c = this.targetXY[1], b = this.getSize().height;
							if (d <= c && (d + b) >= c) {
								d = c - b - 5
							}
						}
						return {
							x : a,
							y : d
						}
					},
					onDestroy : function() {
						Ext.getDoc().un("mousedown", this.onDocMouseDown, this);
						Ext.ToolTip.superclass.onDestroy.call(this)
					}
				});
Ext.QuickTip = Ext.extend(Ext.ToolTip, {
	interceptTitles : false,
	tagConfig : {
		namespace : "ext",
		attribute : "qtip",
		width : "qwidth",
		target : "target",
		title : "qtitle",
		hide : "hide",
		cls : "qclass",
		align : "qalign",
		anchor : "anchor"
	},
	initComponent : function() {
		this.target = this.target || Ext.getDoc();
		this.targets = this.targets || {};
		Ext.QuickTip.superclass.initComponent.call(this)
	},
	register : function(e) {
		var h = Ext.isArray(e) ? e : arguments;
		for ( var g = 0, a = h.length; g < a; g++) {
			var l = h[g];
			var k = l.target;
			if (k) {
				if (Ext.isArray(k)) {
					for ( var d = 0, b = k.length; d < b; d++) {
						this.targets[Ext.id(k[d])] = l
					}
				} else {
					this.targets[Ext.id(k)] = l
				}
			}
		}
	},
	unregister : function(a) {
		delete this.targets[Ext.id(a)]
	},
	cancelShow : function(b) {
		var a = this.activeTarget;
		b = Ext.get(b).dom;
		if (this.isVisible()) {
			if (a && a.el == b) {
				this.hide()
			}
		} else {
			if (a && a.el == b) {
				this.clearTimer("show")
			}
		}
	},
	onTargetOver : function(i) {
		if (this.disabled) {
			return
		}
		this.targetXY = i.getXY();
		var c = i.getTarget();
		if (!c || c.nodeType !== 1 || c == document || c == document.body) {
			return
		}
		if (this.activeTarget && c == this.activeTarget.el) {
			this.clearTimer("hide");
			this.show();
			return
		}
		if (c && this.targets[c.id]) {
			this.activeTarget = this.targets[c.id];
			this.activeTarget.el = c;
			this.anchor = this.activeTarget.anchor;
			if (this.anchor) {
				this.anchorTarget = c
			}
			this.delayShow();
			return
		}
		var g, h = Ext.fly(c), b = this.tagConfig;
		var d = b.namespace;
		if (this.interceptTitles && c.title) {
			g = c.title;
			c.qtip = g;
			c.removeAttribute("title");
			i.preventDefault()
		} else {
			g = c.qtip || h.getAttribute(b.attribute, d)
		}
		if (g) {
			var a = h.getAttribute(b.hide, d);
			this.activeTarget = {
				el : c,
				text : g,
				width : h.getAttribute(b.width, d),
				autoHide : a != "user" && a !== "false",
				title : h.getAttribute(b.title, d),
				cls : h.getAttribute(b.cls, d),
				align : h.getAttribute(b.align, d)
			};
			this.anchor = h.getAttribute(b.anchor, d);
			if (this.anchor) {
				this.anchorTarget = c
			}
			this.delayShow()
		}
	},
	onTargetOut : function(a) {
		this.clearTimer("show");
		if (this.autoHide !== false) {
			this.delayHide()
		}
	},
	showAt : function(b) {
		var a = this.activeTarget;
		if (a) {
			if (!this.rendered) {
				this.render(Ext.getBody());
				this.activeTarget = a
			}
			if (a.width) {
				this.setWidth(a.width);
				this.body.setWidth(this.adjustBodyWidth(a.width
						- this.getFrameWidth()));
				this.measureWidth = false
			} else {
				this.measureWidth = true
			}
			this.setTitle(a.title || "");
			this.body.update(a.text);
			this.autoHide = a.autoHide;
			this.dismissDelay = a.dismissDelay || this.dismissDelay;
			if (this.lastCls) {
				this.el.removeClass(this.lastCls);
				delete this.lastCls
			}
			if (a.cls) {
				this.el.addClass(a.cls);
				this.lastCls = a.cls
			}
			if (this.anchor) {
				this.constrainPosition = false
			} else {
				if (a.align) {
					b = this.el.getAlignToXY(a.el, a.align);
					this.constrainPosition = false
				} else {
					this.constrainPosition = true
				}
			}
		}
		Ext.QuickTip.superclass.showAt.call(this, b)
	},
	hide : function() {
		delete this.activeTarget;
		Ext.QuickTip.superclass.hide.call(this)
	}
});
Ext.QuickTips = function() {
	var b, a = [];
	return {
		init : function(c) {
			if (!b) {
				if (!Ext.isReady) {
					Ext.onReady( function() {
						Ext.QuickTips.init(c)
					});
					return
				}
				b = new Ext.QuickTip( {
					elements : "header,body"
				});
				if (c !== false) {
					b.render(Ext.getBody())
				}
			}
		},
		enable : function() {
			if (b) {
				a.pop();
				if (a.length < 1) {
					b.enable()
				}
			}
		},
		disable : function() {
			if (b) {
				b.disable()
			}
			a.push(1)
		},
		isEnabled : function() {
			return b !== undefined && !b.disabled
		},
		getQuickTip : function() {
			return b
		},
		register : function() {
			b.register.apply(b, arguments)
		},
		unregister : function() {
			b.unregister.apply(b, arguments)
		},
		tips : function() {
			b.register.apply(b, arguments)
		}
	}
}();
Ext.tree.TreePanel = Ext.extend(Ext.Panel, {
	rootVisible : true,
	animate : Ext.enableFx,
	lines : true,
	enableDD : false,
	hlDrop : Ext.enableFx,
	pathSeparator : "/",
	initComponent : function() {
		Ext.tree.TreePanel.superclass.initComponent.call(this);
		if (!this.eventModel) {
			this.eventModel = new Ext.tree.TreeEventModel(this)
		}
		var a = this.loader;
		if (!a) {
			a = new Ext.tree.TreeLoader( {
				dataUrl : this.dataUrl,
				requestMethod : this.requestMethod
			})
		} else {
			if (typeof a == "object" && !a.load) {
				a = new Ext.tree.TreeLoader(a)
			}
		}
		this.loader = a;
		this.nodeHash = {};
		if (this.root) {
			var b = this.root;
			delete this.root;
			this.setRootNode(b)
		}
		this.addEvents("append", "remove", "movenode", "insert",
				"beforeappend", "beforeremove", "beforemovenode",
				"beforeinsert", "beforeload", "load", "textchange",
				"beforeexpandnode", "beforecollapsenode", "expandnode",
				"disabledchange", "collapsenode", "beforeclick", "click",
				"checkchange", "dblclick", "contextmenu",
				"beforechildrenrendered", "startdrag", "enddrag", "dragdrop",
				"beforenodedrop", "nodedrop", "nodedragover");
		if (this.singleExpand) {
			this.on("beforeexpandnode", this.restrictExpand, this)
		}
	},
	proxyNodeEvent : function(c, b, a, h, g, e, d) {
		if (c == "collapse" || c == "expand" || c == "beforecollapse"
				|| c == "beforeexpand" || c == "move" || c == "beforemove") {
			c = c + "node"
		}
		return this.fireEvent(c, b, a, h, g, e, d)
	},
	getRootNode : function() {
		return this.root
	},
	setRootNode : function(b) {
		Ext.destroy(this.root);
		if (!b.render) {
			b = this.loader.createNode(b)
		}
		this.root = b;
		b.ownerTree = this;
		b.isRoot = true;
		this.registerNode(b);
		if (!this.rootVisible) {
			var a = b.attributes.uiProvider;
			b.ui = a ? new a(b) : new Ext.tree.RootTreeNodeUI(b)
		}
		if (this.innerCt) {
			this.innerCt.update("");
			this.afterRender()
		}
		return b
	},
	getNodeById : function(a) {
		return this.nodeHash[a]
	},
	registerNode : function(a) {
		this.nodeHash[a.id] = a
	},
	unregisterNode : function(a) {
		delete this.nodeHash[a.id]
	},
	toString : function() {
		return "[Tree" + (this.id ? " " + this.id : "") + "]"
	},
	restrictExpand : function(a) {
		var b = a.parentNode;
		if (b) {
			if (b.expandedChild && b.expandedChild.parentNode == b) {
				b.expandedChild.collapse()
			}
			b.expandedChild = a
		}
	},
	getChecked : function(b, c) {
		c = c || this.root;
		var d = [];
		var e = function() {
			if (this.attributes.checked) {
				d.push(!b ? this : (b == "id" ? this.id : this.attributes[b]))
			}
		};
		c.cascade(e);
		return d
	},
	getEl : function() {
		return this.el
	},
	getLoader : function() {
		return this.loader
	},
	expandAll : function() {
		this.root.expand(true)
	},
	collapseAll : function() {
		this.root.collapse(true)
	},
	getSelectionModel : function() {
		if (!this.selModel) {
			this.selModel = new Ext.tree.DefaultSelectionModel()
		}
		return this.selModel
	},
	expandPath : function(g, a, h) {
		a = a || "id";
		var d = g.split(this.pathSeparator);
		var c = this.root;
		if (c.attributes[a] != d[1]) {
			if (h) {
				h(false, null)
			}
			return
		}
		var b = 1;
		var e = function() {
			if (++b == d.length) {
				if (h) {
					h(true, c)
				}
				return
			}
			var i = c.findChild(a, d[b]);
			if (!i) {
				if (h) {
					h(false, c)
				}
				return
			}
			c = i;
			i.expand(false, false, e)
		};
		c.expand(false, false, e)
	},
	selectPath : function(e, a, g) {
		a = a || "id";
		var c = e.split(this.pathSeparator);
		var b = c.pop();
		if (c.length > 0) {
			var d = function(i, h) {
				if (i && h) {
					var j = h.findChild(a, b);
					if (j) {
						j.select();
						if (g) {
							g(true, j)
						}
					} else {
						if (g) {
							g(false, j)
						}
					}
				} else {
					if (g) {
						g(false, j)
					}
				}
			};
			this.expandPath(c.join(this.pathSeparator), a, d)
		} else {
			this.root.select();
			if (g) {
				g(true, this.root)
			}
		}
	},
	getTreeEl : function() {
		return this.body
	},
	onRender : function(b, a) {
		Ext.tree.TreePanel.superclass.onRender.call(this, b, a);
		this.el.addClass("x-tree");
		this.innerCt = this.body.createChild( {
			tag : "ul",
			cls : "x-tree-root-ct "
					+ (this.useArrows ? "x-tree-arrows"
							: this.lines ? "x-tree-lines" : "x-tree-no-lines")
		})
	},
	initEvents : function() {
		Ext.tree.TreePanel.superclass.initEvents.call(this);
		if (this.containerScroll) {
			Ext.dd.ScrollManager.register(this.body)
		}
		if ((this.enableDD || this.enableDrop) && !this.dropZone) {
			this.dropZone = new Ext.tree.TreeDropZone(this, this.dropConfig
					|| {
						ddGroup : this.ddGroup || "TreeDD",
						appendOnly : this.ddAppendOnly === true
					})
		}
		if ((this.enableDD || this.enableDrag) && !this.dragZone) {
			this.dragZone = new Ext.tree.TreeDragZone(this, this.dragConfig
					|| {
						ddGroup : this.ddGroup || "TreeDD",
						scroll : this.ddScroll
					})
		}
		this.getSelectionModel().init(this)
	},
	afterRender : function() {
		Ext.tree.TreePanel.superclass.afterRender.call(this);
		this.root.render();
		if (!this.rootVisible) {
			this.root.renderChildren()
		}
	},
	onDestroy : function() {
		if (this.rendered) {
			this.body.removeAllListeners();
			Ext.dd.ScrollManager.unregister(this.body);
			if (this.dropZone) {
				this.dropZone.unreg()
			}
			if (this.dragZone) {
				this.dragZone.unreg()
			}
		}
		this.root.destroy();
		this.nodeHash = null;
		Ext.tree.TreePanel.superclass.onDestroy.call(this)
	}
});
Ext.tree.TreePanel.nodeTypes = {};
Ext.reg("treepanel", Ext.tree.TreePanel);
Ext.tree.TreeEventModel = function(a) {
	this.tree = a;
	this.tree.on("render", this.initEvents, this)
};
Ext.tree.TreeEventModel.prototype = {
	initEvents : function() {
		var a = this.tree.getTreeEl();
		a.on("click", this.delegateClick, this);
		if (this.tree.trackMouseOver !== false) {
			this.tree.innerCt.on("mouseover", this.delegateOver, this);
			this.tree.innerCt.on("mouseout", this.delegateOut, this)
		}
		a.on("dblclick", this.delegateDblClick, this);
		a.on("contextmenu", this.delegateContextMenu, this)
	},
	getNode : function(b) {
		var a;
		if (a = b.getTarget(".x-tree-node-el", 10)) {
			var c = Ext.fly(a, "_treeEvents").getAttribute("tree-node-id",
					"ext");
			if (c) {
				return this.tree.getNodeById(c)
			}
		}
		return null
	},
	getNodeTarget : function(b) {
		var a = b.getTarget(".x-tree-node-icon", 1);
		if (!a) {
			a = b.getTarget(".x-tree-node-el", 6)
		}
		return a
	},
	delegateOut : function(b, a) {
		if (!this.beforeEvent(b)) {
			return
		}
		if (b.getTarget(".x-tree-ec-icon", 1)) {
			var c = this.getNode(b);
			this.onIconOut(b, c);
			if (c == this.lastEcOver) {
				delete this.lastEcOver
			}
		}
		if ((a = this.getNodeTarget(b)) && !b.within(a, true)) {
			this.onNodeOut(b, this.getNode(b))
		}
	},
	delegateOver : function(b, a) {
		if (!this.beforeEvent(b)) {
			return
		}
		if (Ext.isGecko && !this.trackingDoc) {
			Ext.getBody().on("mouseover", this.trackExit, this);
			this.trackingDoc = true
		}
		if (this.lastEcOver) {
			this.onIconOut(b, this.lastEcOver);
			delete this.lastEcOver
		}
		if (b.getTarget(".x-tree-ec-icon", 1)) {
			this.lastEcOver = this.getNode(b);
			this.onIconOver(b, this.lastEcOver)
		}
		if (a = this.getNodeTarget(b)) {
			this.onNodeOver(b, this.getNode(b))
		}
	},
	trackExit : function(a) {
		if (this.lastOverNode && !a.within(this.lastOverNode.ui.getEl())) {
			this.onNodeOut(a, this.lastOverNode);
			delete this.lastOverNode;
			Ext.getBody().un("mouseover", this.trackExit, this);
			this.trackingDoc = false
		}
	},
	delegateClick : function(b, a) {
		if (!this.beforeEvent(b)) {
			return
		}
		if (b.getTarget("input[type=checkbox]", 1)) {
			this.onCheckboxClick(b, this.getNode(b))
		} else {
			if (b.getTarget(".x-tree-ec-icon", 1)) {
				this.onIconClick(b, this.getNode(b))
			} else {
				if (this.getNodeTarget(b)) {
					this.onNodeClick(b, this.getNode(b))
				}
			}
		}
	},
	delegateDblClick : function(b, a) {
		if (this.beforeEvent(b) && this.getNodeTarget(b)) {
			this.onNodeDblClick(b, this.getNode(b))
		}
	},
	delegateContextMenu : function(b, a) {
		if (this.beforeEvent(b) && this.getNodeTarget(b)) {
			this.onNodeContextMenu(b, this.getNode(b))
		}
	},
	onNodeClick : function(b, a) {
		a.ui.onClick(b)
	},
	onNodeOver : function(b, a) {
		this.lastOverNode = a;
		a.ui.onOver(b)
	},
	onNodeOut : function(b, a) {
		a.ui.onOut(b)
	},
	onIconOver : function(b, a) {
		a.ui.addClass("x-tree-ec-over")
	},
	onIconOut : function(b, a) {
		a.ui.removeClass("x-tree-ec-over")
	},
	onIconClick : function(b, a) {
		a.ui.ecClick(b)
	},
	onCheckboxClick : function(b, a) {
		a.ui.onCheckChange(b)
	},
	onNodeDblClick : function(b, a) {
		a.ui.onDblClick(b)
	},
	onNodeContextMenu : function(b, a) {
		a.ui.onContextMenu(b)
	},
	beforeEvent : function(a) {
		if (this.disabled) {
			a.stopEvent();
			return false
		}
		return true
	},
	disable : function() {
		this.disabled = true
	},
	enable : function() {
		this.disabled = false
	}
};
Ext.tree.DefaultSelectionModel = function(a) {
	this.selNode = null;
	this.addEvents("selectionchange", "beforeselect");
	Ext.apply(this, a);
	Ext.tree.DefaultSelectionModel.superclass.constructor.call(this)
};
Ext
		.extend(
				Ext.tree.DefaultSelectionModel,
				Ext.util.Observable,
				{
					init : function(a) {
						this.tree = a;
						a.getTreeEl().on("keydown", this.onKeyDown, this);
						a.on("click", this.onNodeClick, this)
					},
					onNodeClick : function(a, b) {
						this.select(a)
					},
					select : function(b) {
						var a = this.selNode;
						if (b == a) {
							b.ui.onSelectedChange(true)
						} else {
							if (this.fireEvent("beforeselect", this, b, a) !== false) {
								if (a) {
									a.ui.onSelectedChange(false)
								}
								this.selNode = b;
								b.ui.onSelectedChange(true);
								this.fireEvent("selectionchange", this, b, a)
							}
						}
						return b
					},
					unselect : function(a) {
						if (this.selNode == a) {
							this.clearSelections()
						}
					},
					clearSelections : function() {
						var a = this.selNode;
						if (a) {
							a.ui.onSelectedChange(false);
							this.selNode = null;
							this.fireEvent("selectionchange", this, null)
						}
						return a
					},
					getSelectedNode : function() {
						return this.selNode
					},
					isSelected : function(a) {
						return this.selNode == a
					},
					selectPrevious : function() {
						var a = this.selNode || this.lastSelNode;
						if (!a) {
							return null
						}
						var c = a.previousSibling;
						if (c) {
							if (!c.isExpanded() || c.childNodes.length < 1) {
								return this.select(c)
							} else {
								var b = c.lastChild;
								while (b && b.isExpanded()
										&& b.childNodes.length > 0) {
									b = b.lastChild
								}
								return this.select(b)
							}
						} else {
							if (a.parentNode
									&& (this.tree.rootVisible || !a.parentNode.isRoot)) {
								return this.select(a.parentNode)
							}
						}
						return null
					},
					selectNext : function() {
						var b = this.selNode || this.lastSelNode;
						if (!b) {
							return null
						}
						if (b.firstChild && b.isExpanded()) {
							return this.select(b.firstChild)
						} else {
							if (b.nextSibling) {
								return this.select(b.nextSibling)
							} else {
								if (b.parentNode) {
									var a = null;
									b.parentNode.bubble( function() {
										if (this.nextSibling) {
											a = this.getOwnerTree().selModel
													.select(this.nextSibling);
											return false
										}
									});
									return a
								}
							}
						}
						return null
					},
					onKeyDown : function(c) {
						var b = this.selNode || this.lastSelNode;
						var d = this;
						if (!b) {
							return
						}
						var a = c.getKey();
						switch (a) {
						case c.DOWN:
							c.stopEvent();
							this.selectNext();
							break;
						case c.UP:
							c.stopEvent();
							this.selectPrevious();
							break;
						case c.RIGHT:
							c.preventDefault();
							if (b.hasChildNodes()) {
								if (!b.isExpanded()) {
									b.expand()
								} else {
									if (b.firstChild) {
										this.select(b.firstChild, c)
									}
								}
							}
							break;
						case c.LEFT:
							c.preventDefault();
							if (b.hasChildNodes() && b.isExpanded()) {
								b.collapse()
							} else {
								if (b.parentNode
										&& (this.tree.rootVisible || b.parentNode != this.tree
												.getRootNode())) {
									this.select(b.parentNode, c)
								}
							}
							break
						}
					}
				});
Ext.tree.MultiSelectionModel = function(a) {
	this.selNodes = [];
	this.selMap = {};
	this.addEvents("selectionchange");
	Ext.apply(this, a);
	Ext.tree.MultiSelectionModel.superclass.constructor.call(this)
};
Ext.extend(Ext.tree.MultiSelectionModel, Ext.util.Observable, {
	init : function(a) {
		this.tree = a;
		a.getTreeEl().on("keydown", this.onKeyDown, this);
		a.on("click", this.onNodeClick, this)
	},
	onNodeClick : function(a, b) {
		if (b.ctrlKey && this.isSelected(a)) {
			this.unselect(a)
		} else {
			this.select(a, b, b.ctrlKey)
		}
	},
	select : function(a, c, b) {
		if (b !== true) {
			this.clearSelections(true)
		}
		if (this.isSelected(a)) {
			this.lastSelNode = a;
			return a
		}
		this.selNodes.push(a);
		this.selMap[a.id] = a;
		this.lastSelNode = a;
		a.ui.onSelectedChange(true);
		this.fireEvent("selectionchange", this, this.selNodes);
		return a
	},
	unselect : function(b) {
		if (this.selMap[b.id]) {
			b.ui.onSelectedChange(false);
			var c = this.selNodes;
			var a = c.indexOf(b);
			if (a != -1) {
				this.selNodes.splice(a, 1)
			}
			delete this.selMap[b.id];
			this.fireEvent("selectionchange", this, this.selNodes)
		}
	},
	clearSelections : function(b) {
		var d = this.selNodes;
		if (d.length > 0) {
			for ( var c = 0, a = d.length; c < a; c++) {
				d[c].ui.onSelectedChange(false)
			}
			this.selNodes = [];
			this.selMap = {};
			if (b !== true) {
				this.fireEvent("selectionchange", this, this.selNodes)
			}
		}
	},
	isSelected : function(a) {
		return this.selMap[a.id] ? true : false
	},
	getSelectedNodes : function() {
		return this.selNodes
	},
	onKeyDown : Ext.tree.DefaultSelectionModel.prototype.onKeyDown,
	selectNext : Ext.tree.DefaultSelectionModel.prototype.selectNext,
	selectPrevious : Ext.tree.DefaultSelectionModel.prototype.selectPrevious
});
Ext.data.Tree = function(a) {
	this.nodeHash = {};
	this.root = null;
	if (a) {
		this.setRootNode(a)
	}
	this.addEvents("append", "remove", "move", "insert", "beforeappend",
			"beforeremove", "beforemove", "beforeinsert");
	Ext.data.Tree.superclass.constructor.call(this)
};
Ext.extend(Ext.data.Tree, Ext.util.Observable, {
	pathSeparator : "/",
	proxyNodeEvent : function() {
		return this.fireEvent.apply(this, arguments)
	},
	getRootNode : function() {
		return this.root
	},
	setRootNode : function(a) {
		this.root = a;
		a.ownerTree = this;
		a.isRoot = true;
		this.registerNode(a);
		return a
	},
	getNodeById : function(a) {
		return this.nodeHash[a]
	},
	registerNode : function(a) {
		this.nodeHash[a.id] = a
	},
	unregisterNode : function(a) {
		delete this.nodeHash[a.id]
	},
	toString : function() {
		return "[Tree" + (this.id ? " " + this.id : "") + "]"
	}
});
Ext.data.Node = function(a) {
	this.attributes = a || {};
	this.leaf = this.attributes.leaf;
	this.id = this.attributes.id;
	if (!this.id) {
		this.id = Ext.id(null, "xnode-");
		this.attributes.id = this.id
	}
	this.childNodes = [];
	if (!this.childNodes.indexOf) {
		this.childNodes.indexOf = function(d) {
			for ( var c = 0, b = this.length; c < b; c++) {
				if (this[c] == d) {
					return c
				}
			}
			return -1
		}
	}
	this.parentNode = null;
	this.firstChild = null;
	this.lastChild = null;
	this.previousSibling = null;
	this.nextSibling = null;
	this.addEvents( {
		append : true,
		remove : true,
		move : true,
		insert : true,
		beforeappend : true,
		beforeremove : true,
		beforemove : true,
		beforeinsert : true
	});
	this.listeners = this.attributes.listeners;
	Ext.data.Node.superclass.constructor.call(this)
};
Ext
		.extend(
				Ext.data.Node,
				Ext.util.Observable,
				{
					fireEvent : function(b) {
						if (Ext.data.Node.superclass.fireEvent.apply(this,
								arguments) === false) {
							return false
						}
						var a = this.getOwnerTree();
						if (a) {
							if (a.proxyNodeEvent.apply(a, arguments) === false) {
								return false
							}
						}
						return true
					},
					isLeaf : function() {
						return this.leaf === true
					},
					setFirstChild : function(a) {
						this.firstChild = a
					},
					setLastChild : function(a) {
						this.lastChild = a
					},
					isLast : function() {
						return (!this.parentNode ? true
								: this.parentNode.lastChild == this)
					},
					isFirst : function() {
						return (!this.parentNode ? true
								: this.parentNode.firstChild == this)
					},
					hasChildNodes : function() {
						return !this.isLeaf() && this.childNodes.length > 0
					},
					isExpandable : function() {
						return this.attributes.expandable
								|| this.hasChildNodes()
					},
					appendChild : function(e) {
						var g = false;
						if (Ext.isArray(e)) {
							g = e
						} else {
							if (arguments.length > 1) {
								g = arguments
							}
						}
						if (g) {
							for ( var d = 0, a = g.length; d < a; d++) {
								this.appendChild(g[d])
							}
						} else {
							if (this.fireEvent("beforeappend", this.ownerTree,
									this, e) === false) {
								return false
							}
							var b = this.childNodes.length;
							var c = e.parentNode;
							if (c) {
								if (e.fireEvent("beforemove", e.getOwnerTree(),
										e, c, this, b) === false) {
									return false
								}
								c.removeChild(e)
							}
							b = this.childNodes.length;
							if (b === 0) {
								this.setFirstChild(e)
							}
							this.childNodes.push(e);
							e.parentNode = this;
							var h = this.childNodes[b - 1];
							if (h) {
								e.previousSibling = h;
								h.nextSibling = e
							} else {
								e.previousSibling = null
							}
							e.nextSibling = null;
							this.setLastChild(e);
							e.setOwnerTree(this.getOwnerTree());
							this
									.fireEvent("append", this.ownerTree, this,
											e, b);
							if (c) {
								e.fireEvent("move", this.ownerTree, e, c, this,
										b)
							}
							return e
						}
					},
					removeChild : function(b) {
						var a = this.childNodes.indexOf(b);
						if (a == -1) {
							return false
						}
						if (this.fireEvent("beforeremove", this.ownerTree,
								this, b) === false) {
							return false
						}
						this.childNodes.splice(a, 1);
						if (b.previousSibling) {
							b.previousSibling.nextSibling = b.nextSibling
						}
						if (b.nextSibling) {
							b.nextSibling.previousSibling = b.previousSibling
						}
						if (this.firstChild == b) {
							this.setFirstChild(b.nextSibling)
						}
						if (this.lastChild == b) {
							this.setLastChild(b.previousSibling)
						}
						b.setOwnerTree(null);
						b.parentNode = null;
						b.previousSibling = null;
						b.nextSibling = null;
						this.fireEvent("remove", this.ownerTree, this, b);
						return b
					},
					insertBefore : function(d, a) {
						if (!a) {
							return this.appendChild(d)
						}
						if (d == a) {
							return false
						}
						if (this.fireEvent("beforeinsert", this.ownerTree,
								this, d, a) === false) {
							return false
						}
						var b = this.childNodes.indexOf(a);
						var c = d.parentNode;
						var e = b;
						if (c == this && this.childNodes.indexOf(d) < b) {
							e--
						}
						if (c) {
							if (d.fireEvent("beforemove", d.getOwnerTree(), d,
									c, this, b, a) === false) {
								return false
							}
							c.removeChild(d)
						}
						if (e === 0) {
							this.setFirstChild(d)
						}
						this.childNodes.splice(e, 0, d);
						d.parentNode = this;
						var g = this.childNodes[e - 1];
						if (g) {
							d.previousSibling = g;
							g.nextSibling = d
						} else {
							d.previousSibling = null
						}
						d.nextSibling = a;
						a.previousSibling = d;
						d.setOwnerTree(this.getOwnerTree());
						this.fireEvent("insert", this.ownerTree, this, d, a);
						if (c) {
							d.fireEvent("move", this.ownerTree, d, c, this, e,
									a)
						}
						return d
					},
					remove : function() {
						this.parentNode.removeChild(this);
						return this
					},
					item : function(a) {
						return this.childNodes[a]
					},
					replaceChild : function(a, c) {
						var b = c ? c.nextSibling : null;
						this.removeChild(c);
						this.insertBefore(a, b);
						return c
					},
					indexOf : function(a) {
						return this.childNodes.indexOf(a)
					},
					getOwnerTree : function() {
						if (!this.ownerTree) {
							var a = this;
							while (a) {
								if (a.ownerTree) {
									this.ownerTree = a.ownerTree;
									break
								}
								a = a.parentNode
							}
						}
						return this.ownerTree
					},
					getDepth : function() {
						var b = 0;
						var a = this;
						while (a.parentNode) {
							++b;
							a = a.parentNode
						}
						return b
					},
					setOwnerTree : function(b) {
						if (b != this.ownerTree) {
							if (this.ownerTree) {
								this.ownerTree.unregisterNode(this)
							}
							this.ownerTree = b;
							var d = this.childNodes;
							for ( var c = 0, a = d.length; c < a; c++) {
								d[c].setOwnerTree(b)
							}
							if (b) {
								b.registerNode(this)
							}
						}
					},
					setId : function(b) {
						if (b !== this.id) {
							var a = this.ownerTree;
							if (a) {
								a.unregisterNode(this)
							}
							this.id = b;
							if (a) {
								a.registerNode(this)
							}
							this.onIdChange(b)
						}
					},
					onIdChange : Ext.emptyFn,
					getPath : function(c) {
						c = c || "id";
						var e = this.parentNode;
						var a = [ this.attributes[c] ];
						while (e) {
							a.unshift(e.attributes[c]);
							e = e.parentNode
						}
						var d = this.getOwnerTree().pathSeparator;
						return d + a.join(d)
					},
					bubble : function(c, b, a) {
						var d = this;
						while (d) {
							if (c.apply(b || d, a || [ d ]) === false) {
								break
							}
							d = d.parentNode
						}
					},
					cascade : function(g, e, b) {
						if (g.apply(e || this, b || [ this ]) !== false) {
							var d = this.childNodes;
							for ( var c = 0, a = d.length; c < a; c++) {
								d[c].cascade(g, e, b)
							}
						}
					},
					eachChild : function(g, e, b) {
						var d = this.childNodes;
						for ( var c = 0, a = d.length; c < a; c++) {
							if (g.apply(e || this, b || [ d[c] ]) === false) {
								break
							}
						}
					},
					findChild : function(d, e) {
						var c = this.childNodes;
						for ( var b = 0, a = c.length; b < a; b++) {
							if (c[b].attributes[d] == e) {
								return c[b]
							}
						}
						return null
					},
					findChildBy : function(e, d) {
						var c = this.childNodes;
						for ( var b = 0, a = c.length; b < a; b++) {
							if (e.call(d || c[b], c[b]) === true) {
								return c[b]
							}
						}
						return null
					},
					sort : function(e, d) {
						var c = this.childNodes;
						var a = c.length;
						if (a > 0) {
							var g = d ? function() {
								e.apply(d, arguments)
							} : e;
							c.sort(g);
							for ( var b = 0; b < a; b++) {
								var h = c[b];
								h.previousSibling = c[b - 1];
								h.nextSibling = c[b + 1];
								if (b === 0) {
									this.setFirstChild(h)
								}
								if (b == a - 1) {
									this.setLastChild(h)
								}
							}
						}
					},
					contains : function(a) {
						return a.isAncestor(this)
					},
					isAncestor : function(a) {
						var b = this.parentNode;
						while (b) {
							if (b == a) {
								return true
							}
							b = b.parentNode
						}
						return false
					},
					toString : function() {
						return "[Node" + (this.id ? " " + this.id : "") + "]"
					}
				});
Ext.tree.TreeNode = function(a) {
	a = a || {};
	if (typeof a == "string") {
		a = {
			text : a
		}
	}
	this.childrenRendered = false;
	this.rendered = false;
	Ext.tree.TreeNode.superclass.constructor.call(this, a);
	this.expanded = a.expanded === true;
	this.isTarget = a.isTarget !== false;
	this.draggable = a.draggable !== false && a.allowDrag !== false;
	this.allowChildren = a.allowChildren !== false && a.allowDrop !== false;
	this.text = a.text;
	this.disabled = a.disabled === true;
	this.hidden = a.hidden === true;
	this.addEvents("textchange", "beforeexpand", "beforecollapse", "expand",
			"disabledchange", "collapse", "beforeclick", "click",
			"checkchange", "dblclick", "contextmenu", "beforechildrenrendered");
	var b = this.attributes.uiProvider || this.defaultUI || Ext.tree.TreeNodeUI;
	this.ui = new b(this)
};
Ext.extend(Ext.tree.TreeNode, Ext.data.Node, {
	preventHScroll : true,
	isExpanded : function() {
		return this.expanded
	},
	getUI : function() {
		return this.ui
	},
	getLoader : function() {
		var a;
		return this.loader
				|| ((a = this.getOwnerTree()) && a.loader ? a.loader
						: new Ext.tree.TreeLoader())
	},
	setFirstChild : function(a) {
		var b = this.firstChild;
		Ext.tree.TreeNode.superclass.setFirstChild.call(this, a);
		if (this.childrenRendered && b && a != b) {
			b.renderIndent(true, true)
		}
		if (this.rendered) {
			this.renderIndent(true, true)
		}
	},
	setLastChild : function(b) {
		var a = this.lastChild;
		Ext.tree.TreeNode.superclass.setLastChild.call(this, b);
		if (this.childrenRendered && a && b != a) {
			a.renderIndent(true, true)
		}
		if (this.rendered) {
			this.renderIndent(true, true)
		}
	},
	appendChild : function(b) {
		if (!b.render && !Ext.isArray(b)) {
			b = this.getLoader().createNode(b)
		}
		var a = Ext.tree.TreeNode.superclass.appendChild.call(this, b);
		if (a && this.childrenRendered) {
			a.render()
		}
		this.ui.updateExpandIcon();
		return a
	},
	removeChild : function(a) {
		this.ownerTree.getSelectionModel().unselect(a);
		Ext.tree.TreeNode.superclass.removeChild.apply(this, arguments);
		if (this.childrenRendered) {
			a.ui.remove()
		}
		if (this.childNodes.length < 1) {
			this.collapse(false, false)
		} else {
			this.ui.updateExpandIcon()
		}
		if (!this.firstChild && !this.isHiddenRoot()) {
			this.childrenRendered = false
		}
		return a
	},
	insertBefore : function(c, a) {
		if (!c.render) {
			c = this.getLoader().createNode(c)
		}
		var b = Ext.tree.TreeNode.superclass.insertBefore.call(this, c, a);
		if (b && a && this.childrenRendered) {
			c.render()
		}
		this.ui.updateExpandIcon();
		return b
	},
	setText : function(b) {
		var a = this.text;
		this.text = b;
		this.attributes.text = b;
		if (this.rendered) {
			this.ui.onTextChange(this, b, a)
		}
		this.fireEvent("textchange", this, b, a)
	},
	select : function() {
		this.getOwnerTree().getSelectionModel().select(this)
	},
	unselect : function() {
		this.getOwnerTree().getSelectionModel().unselect(this)
	},
	isSelected : function() {
		return this.getOwnerTree().getSelectionModel().isSelected(this)
	},
	expand : function(a, c, d, b) {
		if (!this.expanded) {
			if (this.fireEvent("beforeexpand", this, a, c) === false) {
				return
			}
			if (!this.childrenRendered) {
				this.renderChildren()
			}
			this.expanded = true;
			if (!this.isHiddenRoot()
					&& (this.getOwnerTree().animate && c !== false) || c) {
				this.ui.animExpand( function() {
					this.fireEvent("expand", this);
					this.runCallback(d, b || this, [ this ]);
					if (a === true) {
						this.expandChildNodes(true)
					}
				}.createDelegate(this));
				return
			} else {
				this.ui.expand();
				this.fireEvent("expand", this);
				this.runCallback(d, b || this, [ this ])
			}
		} else {
			this.runCallback(d, b || this, [ this ])
		}
		if (a === true) {
			this.expandChildNodes(true)
		}
	},
	runCallback : function(a, c, b) {
		if (Ext.isFunction(a)) {
			a.apply(c, b)
		}
	},
	isHiddenRoot : function() {
		return this.isRoot && !this.getOwnerTree().rootVisible
	},
	collapse : function(b, g, h, e) {
		if (this.expanded && !this.isHiddenRoot()) {
			if (this.fireEvent("beforecollapse", this, b, g) === false) {
				return
			}
			this.expanded = false;
			if ((this.getOwnerTree().animate && g !== false) || g) {
				this.ui.animCollapse( function() {
					this.fireEvent("collapse", this);
					this.runCallback(h, e || this, [ this ]);
					if (b === true) {
						this.collapseChildNodes(true)
					}
				}.createDelegate(this));
				return
			} else {
				this.ui.collapse();
				this.fireEvent("collapse", this);
				this.runCallback(h, e || this, [ this ])
			}
		} else {
			if (!this.expanded) {
				this.runCallback(h, e || this, [ this ])
			}
		}
		if (b === true) {
			var d = this.childNodes;
			for ( var c = 0, a = d.length; c < a; c++) {
				d[c].collapse(true, false)
			}
		}
	},
	delayedExpand : function(a) {
		if (!this.expandProcId) {
			this.expandProcId = this.expand.defer(a, this)
		}
	},
	cancelExpand : function() {
		if (this.expandProcId) {
			clearTimeout(this.expandProcId)
		}
		this.expandProcId = false
	},
	toggle : function() {
		if (this.expanded) {
			this.collapse()
		} else {
			this.expand()
		}
	},
	ensureVisible : function(c, b) {
		var a = this.getOwnerTree();
		a.expandPath(this.parentNode ? this.parentNode.getPath() : this
				.getPath(), false, function() {
			var d = a.getNodeById(this.id);
			a.getTreeEl().scrollChildIntoView(d.ui.anchor);
			this.runCallback(c, b || this, [ this ])
		}.createDelegate(this))
	},
	expandChildNodes : function(b) {
		var d = this.childNodes;
		for ( var c = 0, a = d.length; c < a; c++) {
			d[c].expand(b)
		}
	},
	collapseChildNodes : function(b) {
		var d = this.childNodes;
		for ( var c = 0, a = d.length; c < a; c++) {
			d[c].collapse(b)
		}
	},
	disable : function() {
		this.disabled = true;
		this.unselect();
		if (this.rendered && this.ui.onDisableChange) {
			this.ui.onDisableChange(this, true)
		}
		this.fireEvent("disabledchange", this, true)
	},
	enable : function() {
		this.disabled = false;
		if (this.rendered && this.ui.onDisableChange) {
			this.ui.onDisableChange(this, false)
		}
		this.fireEvent("disabledchange", this, false)
	},
	renderChildren : function(b) {
		if (b !== false) {
			this.fireEvent("beforechildrenrendered", this)
		}
		var d = this.childNodes;
		for ( var c = 0, a = d.length; c < a; c++) {
			d[c].render(true)
		}
		this.childrenRendered = true
	},
	sort : function(e, d) {
		Ext.tree.TreeNode.superclass.sort.apply(this, arguments);
		if (this.childrenRendered) {
			var c = this.childNodes;
			for ( var b = 0, a = c.length; b < a; b++) {
				c[b].render(true)
			}
		}
	},
	render : function(a) {
		this.ui.render(a);
		if (!this.rendered) {
			this.getOwnerTree().registerNode(this);
			this.rendered = true;
			if (this.expanded) {
				this.expanded = false;
				this.expand(false, false)
			}
		}
	},
	renderIndent : function(b, e) {
		if (e) {
			this.ui.childIndent = null
		}
		this.ui.renderIndent();
		if (b === true && this.childrenRendered) {
			var d = this.childNodes;
			for ( var c = 0, a = d.length; c < a; c++) {
				d[c].renderIndent(true, e)
			}
		}
	},
	beginUpdate : function() {
		this.childrenRendered = false
	},
	endUpdate : function() {
		if (this.expanded && this.rendered) {
			this.renderChildren()
		}
	},
	destroy : function() {
		if (this.childNodes) {
			for ( var b = 0, a = this.childNodes.length; b < a; b++) {
				this.childNodes[b].destroy()
			}
			this.childNodes = null
		}
		if (this.ui.destroy) {
			this.ui.destroy()
		}
	},
	onIdChange : function(a) {
		this.ui.onIdChange(a)
	}
});
Ext.tree.TreePanel.nodeTypes.node = Ext.tree.TreeNode;
Ext.tree.AsyncTreeNode = function(a) {
	this.loaded = a && a.loaded === true;
	this.loading = false;
	Ext.tree.AsyncTreeNode.superclass.constructor.apply(this, arguments);
	this.addEvents("beforeload", "load")
};
Ext.extend(Ext.tree.AsyncTreeNode, Ext.tree.TreeNode, {
	expand : function(b, e, h, c) {
		if (this.loading) {
			var g;
			var d = function() {
				if (!this.loading) {
					clearInterval(g);
					this.expand(b, e, h, c)
				}
			}.createDelegate(this);
			g = setInterval(d, 200);
			return
		}
		if (!this.loaded) {
			if (this.fireEvent("beforeload", this) === false) {
				return
			}
			this.loading = true;
			this.ui.beforeLoad(this);
			var a = this.loader || this.attributes.loader
					|| this.getOwnerTree().getLoader();
			if (a) {
				a.load(this, this.loadComplete.createDelegate(this, [ b, e, h,
						c ]), this);
				return
			}
		}
		Ext.tree.AsyncTreeNode.superclass.expand.call(this, b, e, h, c)
	},
	isLoading : function() {
		return this.loading
	},
	loadComplete : function(a, c, d, b) {
		this.loading = false;
		this.loaded = true;
		this.ui.afterLoad(this);
		this.fireEvent("load", this);
		this.expand(a, c, d, b)
	},
	isLoaded : function() {
		return this.loaded
	},
	hasChildNodes : function() {
		if (!this.isLeaf() && !this.loaded) {
			return true
		} else {
			return Ext.tree.AsyncTreeNode.superclass.hasChildNodes.call(this)
		}
	},
	reload : function(b, a) {
		this.collapse(false, false);
		while (this.firstChild) {
			this.removeChild(this.firstChild).destroy()
		}
		this.childrenRendered = false;
		this.loaded = false;
		if (this.isHiddenRoot()) {
			this.expanded = false
		}
		this.expand(false, false, b, a)
	}
});
Ext.tree.TreePanel.nodeTypes.async = Ext.tree.AsyncTreeNode;
Ext.tree.TreeNodeUI = function(a) {
	this.node = a;
	this.rendered = false;
	this.animating = false;
	this.wasLeaf = true;
	this.ecc = "x-tree-ec-icon x-tree-elbow";
	this.emptyIcon = Ext.BLANK_IMAGE_URL
};
Ext.tree.TreeNodeUI.prototype = {
	removeChild : function(a) {
		if (this.rendered) {
			this.ctNode.removeChild(a.ui.getEl())
		}
	},
	beforeLoad : function() {
		this.addClass("x-tree-node-loading")
	},
	afterLoad : function() {
		this.removeClass("x-tree-node-loading")
	},
	onTextChange : function(b, c, a) {
		if (this.rendered) {
			this.textNode.innerHTML = c
		}
	},
	onDisableChange : function(a, b) {
		this.disabled = b;
		if (this.checkbox) {
			this.checkbox.disabled = b
		}
		if (b) {
			this.addClass("x-tree-node-disabled")
		} else {
			this.removeClass("x-tree-node-disabled")
		}
	},
	onSelectedChange : function(a) {
		if (a) {
			this.focus();
			this.addClass("x-tree-selected")
		} else {
			this.removeClass("x-tree-selected")
		}
	},
	onMove : function(a, h, e, g, d, b) {
		this.childIndent = null;
		if (this.rendered) {
			var i = g.ui.getContainer();
			if (!i) {
				this.holder = document.createElement("div");
				this.holder.appendChild(this.wrap);
				return
			}
			var c = b ? b.ui.getEl() : null;
			if (c) {
				i.insertBefore(this.wrap, c)
			} else {
				i.appendChild(this.wrap)
			}
			this.node.renderIndent(true, e != g)
		}
	},
	addClass : function(a) {
		if (this.elNode) {
			Ext.fly(this.elNode).addClass(a)
		}
	},
	removeClass : function(a) {
		if (this.elNode) {
			Ext.fly(this.elNode).removeClass(a)
		}
	},
	remove : function() {
		if (this.rendered) {
			this.holder = document.createElement("div");
			this.holder.appendChild(this.wrap)
		}
	},
	fireEvent : function() {
		return this.node.fireEvent.apply(this.node, arguments)
	},
	initEvents : function() {
		this.node.on("move", this.onMove, this);
		if (this.node.disabled) {
			this.addClass("x-tree-node-disabled");
			if (this.checkbox) {
				this.checkbox.disabled = true
			}
		}
		if (this.node.hidden) {
			this.hide()
		}
		var b = this.node.getOwnerTree();
		var a = b.enableDD || b.enableDrag || b.enableDrop;
		if (a && (!this.node.isRoot || b.rootVisible)) {
			Ext.dd.Registry.register(this.elNode, {
				node : this.node,
				handles : this.getDDHandles(),
				isHandle : false
			})
		}
	},
	getDDHandles : function() {
		return [ this.iconNode, this.textNode, this.elNode ]
	},
	hide : function() {
		this.node.hidden = true;
		if (this.wrap) {
			this.wrap.style.display = "none"
		}
	},
	show : function() {
		this.node.hidden = false;
		if (this.wrap) {
			this.wrap.style.display = ""
		}
	},
	onContextMenu : function(a) {
		if (this.node.hasListener("contextmenu")
				|| this.node.getOwnerTree().hasListener("contextmenu")) {
			a.preventDefault();
			this.focus();
			this.fireEvent("contextmenu", this.node, a)
		}
	},
	onClick : function(c) {
		if (this.dropping) {
			c.stopEvent();
			return
		}
		if (this.fireEvent("beforeclick", this.node, c) !== false) {
			var b = c.getTarget("a");
			if (!this.disabled && this.node.attributes.href && b) {
				this.fireEvent("click", this.node, c);
				return
			} else {
				if (b && c.ctrlKey) {
					c.stopEvent()
				}
			}
			c.preventDefault();
			if (this.disabled) {
				return
			}
			if (this.node.attributes.singleClickExpand && !this.animating
					&& this.node.isExpandable()) {
				this.node.toggle()
			}
			this.fireEvent("click", this.node, c)
		} else {
			c.stopEvent()
		}
	},
	onDblClick : function(a) {
		a.preventDefault();
		if (this.disabled) {
			return
		}
		if (this.checkbox) {
			this.toggleCheck()
		}
		if (!this.animating && this.node.isExpandable()) {
			this.node.toggle()
		}
		this.fireEvent("dblclick", this.node, a)
	},
	onOver : function(a) {
		this.addClass("x-tree-node-over")
	},
	onOut : function(a) {
		this.removeClass("x-tree-node-over")
	},
	onCheckChange : function() {
		var a = this.checkbox.checked;
		this.checkbox.defaultChecked = a;
		this.node.attributes.checked = a;
		this.fireEvent("checkchange", this.node, a)
	},
	ecClick : function(a) {
		if (!this.animating && this.node.isExpandable()) {
			this.node.toggle()
		}
	},
	startDrop : function() {
		this.dropping = true
	},
	endDrop : function() {
		setTimeout( function() {
			this.dropping = false
		}.createDelegate(this), 50)
	},
	expand : function() {
		this.updateExpandIcon();
		this.ctNode.style.display = ""
	},
	focus : function() {
		if (!this.node.preventHScroll) {
			try {
				this.anchor.focus()
			} catch (c) {
			}
		} else {
			try {
				var b = this.node.getOwnerTree().getTreeEl().dom;
				var a = b.scrollLeft;
				this.anchor.focus();
				b.scrollLeft = a
			} catch (c) {
			}
		}
	},
	toggleCheck : function(b) {
		var a = this.checkbox;
		if (a) {
			a.checked = (b === undefined ? !a.checked : b);
			this.onCheckChange()
		}
	},
	blur : function() {
		try {
			this.anchor.blur()
		} catch (a) {
		}
	},
	animExpand : function(b) {
		var a = Ext.get(this.ctNode);
		a.stopFx();
		if (!this.node.isExpandable()) {
			this.updateExpandIcon();
			this.ctNode.style.display = "";
			Ext.callback(b);
			return
		}
		this.animating = true;
		this.updateExpandIcon();
		a.slideIn("t", {
			callback : function() {
				this.animating = false;
				Ext.callback(b)
			},
			scope : this,
			duration : this.node.ownerTree.duration || 0.25
		})
	},
	highlight : function() {
		var a = this.node.getOwnerTree();
		Ext.fly(this.wrap).highlight(a.hlColor || "C3DAF9", {
			endColor : a.hlBaseColor
		})
	},
	collapse : function() {
		this.updateExpandIcon();
		this.ctNode.style.display = "none"
	},
	animCollapse : function(b) {
		var a = Ext.get(this.ctNode);
		a.enableDisplayMode("block");
		a.stopFx();
		this.animating = true;
		this.updateExpandIcon();
		a.slideOut("t", {
			callback : function() {
				this.animating = false;
				Ext.callback(b)
			},
			scope : this,
			duration : this.node.ownerTree.duration || 0.25
		})
	},
	getContainer : function() {
		return this.ctNode
	},
	getEl : function() {
		return this.wrap
	},
	appendDDGhost : function(a) {
		a.appendChild(this.elNode.cloneNode(true))
	},
	getDDRepairXY : function() {
		return Ext.lib.Dom.getXY(this.iconNode)
	},
	onRender : function() {
		this.render()
	},
	render : function(c) {
		var e = this.node, b = e.attributes;
		var d = e.parentNode ? e.parentNode.ui.getContainer()
				: e.ownerTree.innerCt.dom;
		if (!this.rendered) {
			this.rendered = true;
			this.renderElements(e, b, d, c);
			if (b.qtip) {
				if (this.textNode.setAttributeNS) {
					this.textNode.setAttributeNS("ext", "qtip", b.qtip);
					if (b.qtipTitle) {
						this.textNode.setAttributeNS("ext", "qtitle",
								b.qtipTitle)
					}
				} else {
					this.textNode.setAttribute("ext:qtip", b.qtip);
					if (b.qtipTitle) {
						this.textNode.setAttribute("ext:qtitle", b.qtipTitle)
					}
				}
			} else {
				if (b.qtipCfg) {
					b.qtipCfg.target = Ext.id(this.textNode);
					Ext.QuickTips.register(b.qtipCfg)
				}
			}
			this.initEvents();
			if (!this.node.expanded) {
				this.updateExpandIcon(true)
			}
		} else {
			if (c === true) {
				d.appendChild(this.wrap)
			}
		}
	},
	renderElements : function(e, k, j, l) {
		this.indentMarkup = e.parentNode ? e.parentNode.ui.getChildIndent()
				: "";
		var g = typeof k.checked == "boolean";
		var c = k.href ? k.href : Ext.isGecko ? "" : "#";
		var d = [
				'<li class="x-tree-node"><div ext:tree-node-id="',
				e.id,
				'" class="x-tree-node-el x-tree-node-leaf x-unselectable ',
				k.cls,
				'" unselectable="on">',
				'<span class="x-tree-node-indent">',
				this.indentMarkup,
				"</span>",
				'<img src="',
				this.emptyIcon,
				'" class="x-tree-ec-icon x-tree-elbow" />',
				'<img src="',
				k.icon || this.emptyIcon,
				'" class="x-tree-node-icon',
				(k.icon ? " x-tree-node-inline-icon" : ""),
				(k.iconCls ? " " + k.iconCls : ""),
				'" unselectable="on" />',
				g ? ('<input class="x-tree-node-cb" type="checkbox" ' + (k.checked ? 'checked="checked" />'
						: "/>"))
						: "",
				'<a hidefocus="on" class="x-tree-node-anchor" href="', c,
				'" tabIndex="1" ',
				k.hrefTarget ? ' target="' + k.hrefTarget + '"' : "",
				'><span unselectable="on">', e.text, "</span></a></div>",
				'<ul class="x-tree-node-ct" style="display:none;"></ul>',
				"</li>" ].join("");
		var b;
		if (l !== true && e.nextSibling && (b = e.nextSibling.ui.getEl())) {
			this.wrap = Ext.DomHelper.insertHtml("beforeBegin", b, d)
		} else {
			this.wrap = Ext.DomHelper.insertHtml("beforeEnd", j, d)
		}
		this.elNode = this.wrap.childNodes[0];
		this.ctNode = this.wrap.childNodes[1];
		var i = this.elNode.childNodes;
		this.indentNode = i[0];
		this.ecNode = i[1];
		this.iconNode = i[2];
		var h = 3;
		if (g) {
			this.checkbox = i[3];
			this.checkbox.defaultChecked = this.checkbox.checked;
			h++
		}
		this.anchor = i[h];
		this.textNode = i[h].firstChild
	},
	getAnchor : function() {
		return this.anchor
	},
	getTextEl : function() {
		return this.textNode
	},
	getIconEl : function() {
		return this.iconNode
	},
	isChecked : function() {
		return this.checkbox ? this.checkbox.checked : false
	},
	updateExpandIcon : function() {
		if (this.rendered) {
			var g = this.node, d, c;
			var a = g.isLast() ? "x-tree-elbow-end" : "x-tree-elbow";
			var e = g.hasChildNodes();
			if (e || g.attributes.expandable) {
				if (g.expanded) {
					a += "-minus";
					d = "x-tree-node-collapsed";
					c = "x-tree-node-expanded"
				} else {
					a += "-plus";
					d = "x-tree-node-expanded";
					c = "x-tree-node-collapsed"
				}
				if (this.wasLeaf) {
					this.removeClass("x-tree-node-leaf");
					this.wasLeaf = false
				}
				if (this.c1 != d || this.c2 != c) {
					Ext.fly(this.elNode).replaceClass(d, c);
					this.c1 = d;
					this.c2 = c
				}
			} else {
				if (!this.wasLeaf) {
					Ext.fly(this.elNode).replaceClass("x-tree-node-expanded",
							"x-tree-node-leaf");
					delete this.c1;
					delete this.c2;
					this.wasLeaf = true
				}
			}
			var b = "x-tree-ec-icon " + a;
			if (this.ecc != b) {
				this.ecNode.className = b;
				this.ecc = b
			}
		}
	},
	onIdChange : function(a) {
		if (this.rendered) {
			this.elNode.setAttribute("ext:tree-node-id", a)
		}
	},
	getChildIndent : function() {
		if (!this.childIndent) {
			var a = [];
			var b = this.node;
			while (b) {
				if (!b.isRoot || (b.isRoot && b.ownerTree.rootVisible)) {
					if (!b.isLast()) {
						a
								.unshift('<img src="' + this.emptyIcon + '" class="x-tree-elbow-line" />')
					} else {
						a
								.unshift('<img src="' + this.emptyIcon + '" class="x-tree-icon" />')
					}
				}
				b = b.parentNode
			}
			this.childIndent = a.join("")
		}
		return this.childIndent
	},
	renderIndent : function() {
		if (this.rendered) {
			var a = "";
			var b = this.node.parentNode;
			if (b) {
				a = b.ui.getChildIndent()
			}
			if (this.indentMarkup != a) {
				this.indentNode.innerHTML = a;
				this.indentMarkup = a
			}
			this.updateExpandIcon()
		}
	},
	destroy : function() {
		if (this.elNode) {
			Ext.dd.Registry.unregister(this.elNode.id)
		}
		delete this.elNode;
		delete this.ctNode;
		delete this.indentNode;
		delete this.ecNode;
		delete this.iconNode;
		delete this.checkbox;
		delete this.anchor;
		delete this.textNode;
		if (this.holder) {
			delete this.wrap;
			Ext.removeNode(this.holder);
			delete this.holder
		} else {
			Ext.removeNode(this.wrap);
			delete this.wrap
		}
	}
};
Ext.tree.RootTreeNodeUI = Ext.extend(Ext.tree.TreeNodeUI, {
	render : function() {
		if (!this.rendered) {
			var a = this.node.ownerTree.innerCt.dom;
			this.node.expanded = true;
			a.innerHTML = '<div class="x-tree-root-node"></div>';
			this.wrap = this.ctNode = a.firstChild
		}
	},
	collapse : Ext.emptyFn,
	expand : Ext.emptyFn
});
Ext.tree.TreeLoader = function(a) {
	this.baseParams = {};
	Ext.apply(this, a);
	this.addEvents("beforeload", "load", "loadexception");
	Ext.tree.TreeLoader.superclass.constructor.call(this);
	if (typeof this.paramOrder == "string") {
		this.paramOrder = this.paramOrder.split(/[\s,|]/)
	}
};
Ext.extend(Ext.tree.TreeLoader, Ext.util.Observable, {
	uiProviders : {},
	clearOnLoad : true,
	paramOrder : undefined,
	paramsAsHash : false,
	directFn : undefined,
	load : function(b, c, a) {
		if (this.clearOnLoad) {
			while (b.firstChild) {
				b.removeChild(b.firstChild)
			}
		}
		if (this.doPreload(b)) {
			this.runCallback(c, a || b, [])
		} else {
			if (this.directFn || this.dataUrl || this.url) {
				this.requestData(b, c, a || b)
			}
		}
	},
	doPreload : function(d) {
		if (d.attributes.children) {
			if (d.childNodes.length < 1) {
				var c = d.attributes.children;
				d.beginUpdate();
				for ( var b = 0, a = c.length; b < a; b++) {
					var e = d.appendChild(this.createNode(c[b]));
					if (this.preloadChildren) {
						this.doPreload(e)
					}
				}
				d.endUpdate()
			}
			return true
		}
		return false
	},
	getParams : function(g) {
		var b = [], e = this.baseParams;
		if (this.directFn) {
			b.push(g.id);
			if (e) {
				if (this.paramOrder) {
					for ( var d = 0, a = this.paramOrder.length; d < a; d++) {
						b.push(e[this.paramOrder[d]])
					}
				} else {
					if (this.paramsAsHash) {
						b.push(e)
					}
				}
			}
			return b
		} else {
			for ( var c in e) {
				if (!Ext.isFunction(e[c])) {
					b.push(encodeURIComponent(c), "=",
							encodeURIComponent(e[c]), "&")
				}
			}
			b.push("node=", encodeURIComponent(g.id));
			return b.join("")
		}
	},
	requestData : function(c, d, b) {
		if (this.fireEvent("beforeload", this, c, d) !== false) {
			if (this.directFn) {
				var a = this.getParams(c);
				a.push(this.processDirectResponse.createDelegate(this, [ {
					callback : d,
					node : c,
					scope : b
				} ], true));
				this.directFn.apply(window, a)
			} else {
				this.transId = Ext.Ajax.request( {
					method : this.requestMethod,
					url : this.dataUrl || this.url,
					success : this.handleResponse,
					failure : this.handleFailure,
					scope : this,
					argument : {
						callback : d,
						node : c,
						scope : b
					},
					params : this.getParams(c)
				})
			}
		} else {
			this.runCallback(d, b || c, [])
		}
	},
	processDirectResponse : function(a, b, c) {
		if (b.status) {
			this.handleResponse( {
				responseData : Ext.isArray(a) ? a : null,
				responseText : a,
				argument : c
			})
		} else {
			this.handleFailure( {
				argument : c
			})
		}
	},
	runCallback : function(a, c, b) {
		if (Ext.isFunction(a)) {
			a.apply(c, b)
		}
	},
	isLoading : function() {
		return !!this.transId
	},
	abort : function() {
		if (this.isLoading()) {
			Ext.Ajax.abort(this.transId)
		}
	},
	createNode : function(attr) {
		if (this.baseAttrs) {
			Ext.applyIf(attr, this.baseAttrs)
		}
		if (this.applyLoader !== false) {
			attr.loader = this
		}
		if (typeof attr.uiProvider == "string") {
			attr.uiProvider = this.uiProviders[attr.uiProvider]
					|| eval(attr.uiProvider)
		}
		if (attr.nodeType) {
			return new Ext.tree.TreePanel.nodeTypes[attr.nodeType](attr)
		} else {
			return attr.leaf ? new Ext.tree.TreeNode(attr)
					: new Ext.tree.AsyncTreeNode(attr)
		}
	},
	processResponse : function(d, c, k, l) {
		var m = d.responseText;
		try {
			var a = d.responseData || Ext.decode(m);
			c.beginUpdate();
			for ( var g = 0, h = a.length; g < h; g++) {
				var b = this.createNode(a[g]);
				if (b) {
					c.appendChild(b)
				}
			}
			c.endUpdate();
			this.runCallback(k, l || c, [ c ])
		} catch (j) {
			this.handleFailure(d)
		}
	},
	handleResponse : function(c) {
		this.transId = false;
		var b = c.argument;
		this.processResponse(c, b.node, b.callback, b.scope);
		this.fireEvent("load", this, b.node, c)
	},
	handleFailure : function(c) {
		this.transId = false;
		var b = c.argument;
		this.fireEvent("loadexception", this, b.node, c);
		this.runCallback(b.callback, b.scope || b.node, [ b.node ])
	}
});
Ext.tree.TreeFilter = function(a, b) {
	this.tree = a;
	this.filtered = {};
	Ext.apply(this, b)
};
Ext.tree.TreeFilter.prototype = {
	clearBlank : false,
	reverse : false,
	autoClear : false,
	remove : false,
	filter : function(d, a, b) {
		a = a || "text";
		var c;
		if (typeof d == "string") {
			var e = d.length;
			if (e == 0 && this.clearBlank) {
				this.clear();
				return
			}
			d = d.toLowerCase();
			c = function(g) {
				return g.attributes[a].substr(0, e).toLowerCase() == d
			}
		} else {
			if (d.exec) {
				c = function(g) {
					return d.test(g.attributes[a])
				}
			} else {
				throw "Illegal filter type, must be string or regex"
			}
		}
		this.filterBy(c, null, b)
	},
	filterBy : function(d, c, b) {
		b = b || this.tree.root;
		if (this.autoClear) {
			this.clear()
		}
		var a = this.filtered, i = this.reverse;
		var e = function(k) {
			if (k == b) {
				return true
			}
			if (a[k.id]) {
				return false
			}
			var j = d.call(c || k, k);
			if (!j || i) {
				a[k.id] = k;
				k.ui.hide();
				return false
			}
			return true
		};
		b.cascade(e);
		if (this.remove) {
			for ( var h in a) {
				if (typeof h != "function") {
					var g = a[h];
					if (g && g.parentNode) {
						g.parentNode.removeChild(g)
					}
				}
			}
		}
	},
	clear : function() {
		var b = this.tree;
		var a = this.filtered;
		for ( var d in a) {
			if (typeof d != "function") {
				var c = a[d];
				if (c) {
					c.ui.show()
				}
			}
		}
		this.filtered = {}
	}
};
Ext.tree.TreeSorter = function(b, c) {
	Ext.apply(this, c);
	b.on("beforechildrenrendered", this.doSort, this);
	b.on("append", this.updateSort, this);
	b.on("insert", this.updateSort, this);
	b.on("textchange", this.updateSortParent, this);
	var e = this.dir && this.dir.toLowerCase() == "desc";
	var g = this.property || "text";
	var h = this.sortType;
	var a = this.folderSort;
	var d = this.caseSensitive === true;
	var i = this.leafAttr || "leaf";
	this.sortFn = function(k, j) {
		if (a) {
			if (k.attributes[i] && !j.attributes[i]) {
				return 1
			}
			if (!k.attributes[i] && j.attributes[i]) {
				return -1
			}
		}
		var m = h ? h(k)
				: (d ? k.attributes[g] : k.attributes[g].toUpperCase());
		var l = h ? h(j)
				: (d ? j.attributes[g] : j.attributes[g].toUpperCase());
		if (m < l) {
			return e ? +1 : -1
		} else {
			if (m > l) {
				return e ? -1 : +1
			} else {
				return 0
			}
		}
	}
};
Ext.tree.TreeSorter.prototype = {
	doSort : function(a) {
		a.sort(this.sortFn)
	},
	compareNodes : function(b, a) {
		return (b.text.toUpperCase() > a.text.toUpperCase() ? 1 : -1)
	},
	updateSort : function(a, b) {
		if (b.childrenRendered) {
			this.doSort.defer(1, this, [ b ])
		}
	},
	updateSortParent : function(a) {
		var b = a.parentNode;
		if (b && b.childrenRendered) {
			this.doSort.defer(1, this, [ b ])
		}
	}
};
if (Ext.dd.DropZone) {
	Ext.tree.TreeDropZone = function(a, b) {
		this.allowParentInsert = b.allowParentInsert || false;
		this.allowContainerDrop = b.allowContainerDrop || false;
		this.appendOnly = b.appendOnly || false;
		Ext.tree.TreeDropZone.superclass.constructor.call(this, a.getTreeEl(),
				b);
		this.tree = a;
		this.dragOverData = {};
		this.lastInsertClass = "x-tree-no-status"
	};
	Ext.extend(Ext.tree.TreeDropZone, Ext.dd.DropZone, {
		ddGroup : "TreeDD",
		expandDelay : 1000,
		expandNode : function(a) {
			if (a.hasChildNodes() && !a.isExpanded()) {
				a.expand(false, null, this.triggerCacheRefresh
						.createDelegate(this))
			}
		},
		queueExpand : function(a) {
			this.expandProcId = this.expandNode.defer(this.expandDelay, this,
					[ a ])
		},
		cancelExpand : function() {
			if (this.expandProcId) {
				clearTimeout(this.expandProcId);
				this.expandProcId = false
			}
		},
		isValidDropPoint : function(a, k, i, d, c) {
			if (!a || !c) {
				return false
			}
			var g = a.node;
			var h = c.node;
			if (!(g && g.isTarget && k)) {
				return false
			}
			if (k == "append" && g.allowChildren === false) {
				return false
			}
			if ((k == "above" || k == "below")
					&& (g.parentNode && g.parentNode.allowChildren === false)) {
				return false
			}
			if (h && (g == h || h.contains(g))) {
				return false
			}
			var b = this.dragOverData;
			b.tree = this.tree;
			b.target = g;
			b.data = c;
			b.point = k;
			b.source = i;
			b.rawEvent = d;
			b.dropNode = h;
			b.cancel = false;
			var j = this.tree.fireEvent("nodedragover", b);
			return b.cancel === false && j !== false
		},
		getDropPoint : function(h, g, l) {
			var m = g.node;
			if (m.isRoot) {
				return m.allowChildren !== false ? "append" : false
			}
			var c = g.ddel;
			var o = Ext.lib.Dom.getY(c), j = o + c.offsetHeight;
			var i = Ext.lib.Event.getPageY(h);
			var k = m.allowChildren === false || m.isLeaf();
			if (this.appendOnly || m.parentNode.allowChildren === false) {
				return k ? false : "append"
			}
			var d = false;
			if (!this.allowParentInsert) {
				d = m.hasChildNodes() && m.isExpanded()
			}
			var a = (j - o) / (k ? 2 : 3);
			if (i >= o && i < (o + a)) {
				return "above"
			} else {
				if (!d && (k || i >= j - a && i <= j)) {
					return "below"
				} else {
					return "append"
				}
			}
		},
		onNodeEnter : function(d, a, c, b) {
			this.cancelExpand()
		},
		onContainerOver : function(a, c, b) {
			if (this.allowContainerDrop && this.isValidDropPoint( {
				ddel : this.tree.getRootNode().ui.elNode,
				node : this.tree.getRootNode()
			}, "append", a, c, b)) {
				return this.dropAllowed
			}
			return this.dropNotAllowed
		},
		onNodeOver : function(b, i, h, g) {
			var k = this.getDropPoint(h, b, i);
			var c = b.node;
			if (!this.expandProcId && k == "append" && c.hasChildNodes()
					&& !b.node.isExpanded()) {
				this.queueExpand(c)
			} else {
				if (k != "append") {
					this.cancelExpand()
				}
			}
			var d = this.dropNotAllowed;
			if (this.isValidDropPoint(b, k, i, h, g)) {
				if (k) {
					var a = b.ddel;
					var j;
					if (k == "above") {
						d = b.node.isFirst() ? "x-tree-drop-ok-above"
								: "x-tree-drop-ok-between";
						j = "x-tree-drag-insert-above"
					} else {
						if (k == "below") {
							d = b.node.isLast() ? "x-tree-drop-ok-below"
									: "x-tree-drop-ok-between";
							j = "x-tree-drag-insert-below"
						} else {
							d = "x-tree-drop-ok-append";
							j = "x-tree-drag-append"
						}
					}
					if (this.lastInsertClass != j) {
						Ext.fly(a).replaceClass(this.lastInsertClass, j);
						this.lastInsertClass = j
					}
				}
			}
			return d
		},
		onNodeOut : function(d, a, c, b) {
			this.cancelExpand();
			this.removeDropIndicators(d)
		},
		onNodeDrop : function(i, b, h, d) {
			var a = this.getDropPoint(h, i, b);
			var g = i.node;
			g.ui.startDrop();
			if (!this.isValidDropPoint(i, a, b, h, d)) {
				g.ui.endDrop();
				return false
			}
			var c = d.node
					|| (b.getTreeNode ? b.getTreeNode(d, g, a, h) : null);
			return this.processDrop(g, d, a, b, h, c)
		},
		onContainerDrop : function(a, g, c) {
			if (this.allowContainerDrop && this.isValidDropPoint( {
				ddel : this.tree.getRootNode().ui.elNode,
				node : this.tree.getRootNode()
			}, "append", a, g, c)) {
				var d = this.tree.getRootNode();
				d.ui.startDrop();
				var b = c.node
						|| (a.getTreeNode ? a.getTreeNode(c, d, "append", g)
								: null);
				return this.processDrop(d, c, "append", a, g, b)
			}
			return false
		},
		processDrop : function(j, h, b, a, i, d) {
			var g = {
				tree : this.tree,
				target : j,
				data : h,
				point : b,
				source : a,
				rawEvent : i,
				dropNode : d,
				cancel : !d,
				dropStatus : false
			};
			var c = this.tree.fireEvent("beforenodedrop", g);
			if (c === false || g.cancel === true || !g.dropNode) {
				j.ui.endDrop();
				return g.dropStatus
			}
			j = g.target;
			if (b == "append" && !j.isExpanded()) {
				j.expand(false, null, function() {
					this.completeDrop(g)
				}.createDelegate(this))
			} else {
				this.completeDrop(g)
			}
			return true
		},
		completeDrop : function(h) {
			var d = h.dropNode, e = h.point, c = h.target;
			if (!Ext.isArray(d)) {
				d = [ d ]
			}
			var g;
			for ( var b = 0, a = d.length; b < a; b++) {
				g = d[b];
				if (e == "above") {
					c.parentNode.insertBefore(g, c)
				} else {
					if (e == "below") {
						c.parentNode.insertBefore(g, c.nextSibling)
					} else {
						c.appendChild(g)
					}
				}
			}
			g.ui.focus();
			if (Ext.enableFx && this.tree.hlDrop) {
				g.ui.highlight()
			}
			c.ui.endDrop();
			this.tree.fireEvent("nodedrop", h)
		},
		afterNodeMoved : function(a, c, g, d, b) {
			if (Ext.enableFx && this.tree.hlDrop) {
				b.ui.focus();
				b.ui.highlight()
			}
			this.tree.fireEvent("nodedrop", this.tree, d, c, a, g)
		},
		getTree : function() {
			return this.tree
		},
		removeDropIndicators : function(b) {
			if (b && b.ddel) {
				var a = b.ddel;
				Ext.fly(a).removeClass(
						[ "x-tree-drag-insert-above",
								"x-tree-drag-insert-below",
								"x-tree-drag-append" ]);
				this.lastInsertClass = "_noclass"
			}
		},
		beforeDragDrop : function(b, a, c) {
			this.cancelExpand();
			return true
		},
		afterRepair : function(a) {
			if (a && Ext.enableFx) {
				a.node.ui.highlight()
			}
			this.hideProxy()
		}
	})
}
if (Ext.dd.DragZone) {
	Ext.tree.TreeDragZone = function(a, b) {
		Ext.tree.TreeDragZone.superclass.constructor.call(this, a.innerCt, b);
		this.tree = a
	};
	Ext.extend(Ext.tree.TreeDragZone, Ext.dd.DragZone,
			{
				ddGroup : "TreeDD",
				onBeforeDrag : function(a, b) {
					var c = a.node;
					return c && c.draggable && !c.disabled
				},
				onInitDrag : function(b) {
					var a = this.dragData;
					this.tree.getSelectionModel().select(a.node);
					this.tree.eventModel.disable();
					this.proxy.update("");
					a.node.ui.appendDDGhost(this.proxy.ghost.dom);
					this.tree.fireEvent("startdrag", this.tree, a.node, b)
				},
				getRepairXY : function(b, a) {
					return a.node.ui.getDDRepairXY()
				},
				onEndDrag : function(a, b) {
					this.tree.eventModel.enable
							.defer(100, this.tree.eventModel);
					this.tree.fireEvent("enddrag", this.tree, a.node, b)
				},
				onValidDrop : function(a, b, c) {
					this.tree.fireEvent("dragdrop", this.tree,
							this.dragData.node, a, b);
					this.hideProxy()
				},
				beforeInvalidDrop : function(a, c) {
					var b = this.tree.getSelectionModel();
					b.clearSelections();
					b.select(this.dragData.node)
				},
				afterRepair : function() {
					if (Ext.enableFx && this.tree.hlDrop) {
						Ext.Element.fly(this.dragData.ddel).highlight(
								this.hlColor || "c3daf9")
					}
					this.dragging = false
				}
			})
}
Ext.tree.TreeEditor = function(a, c, b) {
	c = c || {};
	var d = c.events ? c : new Ext.form.TextField(c);
	Ext.tree.TreeEditor.superclass.constructor.call(this, d, b);
	this.tree = a;
	if (!a.rendered) {
		a.on("render", this.initEditor, this)
	} else {
		this.initEditor(a)
	}
};
Ext.extend(Ext.tree.TreeEditor, Ext.Editor, {
	alignment : "l-l",
	autoSize : false,
	hideEl : false,
	cls : "x-small-editor x-tree-editor",
	shim : false,
	shadow : "frame",
	maxWidth : 250,
	editDelay : 350,
	initEditor : function(a) {
		a.on("beforeclick", this.beforeNodeClick, this);
		a.on("dblclick", this.onNodeDblClick, this);
		this.on("complete", this.updateNode, this);
		this.on("beforestartedit", this.fitToTree, this);
		this.on("startedit", this.bindScroll, this, {
			delay : 10
		});
		this.on("specialkey", this.onSpecialKey, this)
	},
	fitToTree : function(b, c) {
		var e = this.tree.getTreeEl().dom, d = c.dom;
		if (e.scrollLeft > d.offsetLeft) {
			e.scrollLeft = d.offsetLeft
		}
		var a = Math.min(this.maxWidth, (e.clientWidth > 20 ? e.clientWidth
				: e.offsetWidth)
				- Math.max(0, d.offsetLeft - e.scrollLeft) - 5);
		this.setSize(a, "")
	},
	triggerEdit : function(a, c) {
		this.completeEdit();
		if (a.attributes.editable !== false) {
			this.editNode = a;
			if (this.tree.autoScroll) {
				Ext.fly(a.ui.getEl()).scrollIntoView(this.tree.body)
			}
			var b = a.text || "";
			if (!Ext.isGecko && Ext.isEmpty(a.text)) {
				a.setText("&#160;")
			}
			this.autoEditTimer = this.startEdit.defer(this.editDelay, this, [
					a.ui.textNode, b ]);
			return false
		}
	},
	bindScroll : function() {
		this.tree.getTreeEl().on("scroll", this.cancelEdit, this)
	},
	beforeNodeClick : function(a, b) {
		clearTimeout(this.autoEditTimer);
		if (this.tree.getSelectionModel().isSelected(a)) {
			b.stopEvent();
			return this.triggerEdit(a)
		}
	},
	onNodeDblClick : function(a, b) {
		clearTimeout(this.autoEditTimer)
	},
	updateNode : function(a, b) {
		this.tree.getTreeEl().un("scroll", this.cancelEdit, this);
		this.editNode.setText(b)
	},
	onHide : function() {
		Ext.tree.TreeEditor.superclass.onHide.call(this);
		if (this.editNode) {
			this.editNode.ui.focus.defer(50, this.editNode.ui)
		}
	},
	onSpecialKey : function(c, b) {
		var a = b.getKey();
		if (a == b.ESC) {
			b.stopEvent();
			this.cancelEdit()
		} else {
			if (a == b.ENTER && !b.hasModifier()) {
				b.stopEvent();
				this.completeEdit()
			}
		}
	}
});
/*
 * SWFObject v2.2 <http://code.google.com/p/swfobject/> is released under the
 * MIT License <http://www.opensource.org/licenses/mit-license.php>
 */
var swfobject = function() {
	var E = "undefined", s = "object", T = "Shockwave Flash", X = "ShockwaveFlash.ShockwaveFlash", r = "application/x-shockwave-flash", S = "SWFObjectExprInst", y = "onreadystatechange", P = window, k = document, u = navigator, U = false, V = [ i ], p = [], O = [], J = [], m, R, F, C, K = false, a = false, o, H, n = true, N = function() {
		var ab = typeof k.getElementById != E
				&& typeof k.getElementsByTagName != E
				&& typeof k.createElement != E, ai = u.userAgent.toLowerCase(), Z = u.platform
				.toLowerCase(), af = Z ? /win/.test(Z) : /win/.test(ai), ad = Z ? /mac/
				.test(Z)
				: /mac/.test(ai), ag = /webkit/.test(ai) ? parseFloat(ai
				.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false, Y = !+"\v1", ah = [
				0, 0, 0 ], ac = null;
		if (typeof u.plugins != E && typeof u.plugins[T] == s) {
			ac = u.plugins[T].description;
			if (ac
					&& !(typeof u.mimeTypes != E && u.mimeTypes[r] && !u.mimeTypes[r].enabledPlugin)) {
				U = true;
				Y = false;
				ac = ac.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
				ah[0] = parseInt(ac.replace(/^(.*)\..*$/, "$1"), 10);
				ah[1] = parseInt(ac.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
				ah[2] = /[a-zA-Z]/.test(ac) ? parseInt(ac.replace(
						/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0
			}
		} else {
			if (typeof P.ActiveXObject != E) {
				try {
					var ae = new ActiveXObject(X);
					if (ae) {
						ac = ae.GetVariable("$version");
						if (ac) {
							Y = true;
							ac = ac.split(" ")[1].split(",");
							ah = [ parseInt(ac[0], 10), parseInt(ac[1], 10),
									parseInt(ac[2], 10) ]
						}
					}
				} catch (aa) {
				}
			}
		}
		return {
			w3 : ab,
			pv : ah,
			wk : ag,
			ie : Y,
			win : af,
			mac : ad
		}
	}(), l = function() {
		if (!N.w3) {
			return
		}
		if ((typeof k.readyState != E && k.readyState == "complete")
				|| (typeof k.readyState == E && (k.getElementsByTagName("body")[0] || k.body))) {
			g()
		}
		if (!K) {
			if (typeof k.addEventListener != E) {
				k.addEventListener("DOMContentLoaded", g, false)
			}
			if (N.ie && N.win) {
				k.attachEvent(y, function() {
					if (k.readyState == "complete") {
						k.detachEvent(y, arguments.callee);
						g()
					}
				});
				if (P == top) {
					( function() {
						if (K) {
							return
						}
						try {
							k.documentElement.doScroll("left")
						} catch (Y) {
							setTimeout(arguments.callee, 0);
							return
						}
						g()
					})()
				}
			}
			if (N.wk) {
				( function() {
					if (K) {
						return
					}
					if (!/loaded|complete/.test(k.readyState)) {
						setTimeout(arguments.callee, 0);
						return
					}
					g()
				})()
			}
			t(g)
		}
	}();
	function g() {
		if (K) {
			return
		}
		try {
			var aa = k.getElementsByTagName("body")[0].appendChild(D("span"));
			aa.parentNode.removeChild(aa)
		} catch (ab) {
			return
		}
		K = true;
		var Y = V.length;
		for ( var Z = 0; Z < Y; Z++) {
			V[Z]()
		}
	}
	function L(Y) {
		if (K) {
			Y()
		} else {
			V[V.length] = Y
		}
	}
	function t(Z) {
		if (typeof P.addEventListener != E) {
			P.addEventListener("load", Z, false)
		} else {
			if (typeof k.addEventListener != E) {
				k.addEventListener("load", Z, false)
			} else {
				if (typeof P.attachEvent != E) {
					j(P, "onload", Z)
				} else {
					if (typeof P.onload == "function") {
						var Y = P.onload;
						P.onload = function() {
							Y();
							Z()
						}
					} else {
						P.onload = Z
					}
				}
			}
		}
	}
	function i() {
		if (U) {
			W()
		} else {
			I()
		}
	}
	function W() {
		var Y = k.getElementsByTagName("body")[0];
		var ab = D(s);
		ab.setAttribute("type", r);
		var aa = Y.appendChild(ab);
		if (aa) {
			var Z = 0;
			( function() {
				if (typeof aa.GetVariable != E) {
					var ac = aa.GetVariable("$version");
					if (ac) {
						ac = ac.split(" ")[1].split(",");
						N.pv = [ parseInt(ac[0], 10), parseInt(ac[1], 10),
								parseInt(ac[2], 10) ]
					}
				} else {
					if (Z < 10) {
						Z++;
						setTimeout(arguments.callee, 10);
						return
					}
				}
				Y.removeChild(ab);
				aa = null;
				I()
			})()
		} else {
			I()
		}
	}
	function I() {
		var ah = p.length;
		if (ah > 0) {
			for ( var ag = 0; ag < ah; ag++) {
				var Z = p[ag].id;
				var ac = p[ag].callbackFn;
				var ab = {
					success : false,
					id : Z
				};
				if (N.pv[0] > 0) {
					var af = c(Z);
					if (af) {
						if (G(p[ag].swfVersion) && !(N.wk && N.wk < 312)) {
							x(Z, true);
							if (ac) {
								ab.success = true;
								ab.ref = A(Z);
								ac(ab)
							}
						} else {
							if (p[ag].expressInstall && B()) {
								var aj = {};
								aj.data = p[ag].expressInstall;
								aj.width = af.getAttribute("width") || "0";
								aj.height = af.getAttribute("height") || "0";
								if (af.getAttribute("class")) {
									aj.styleclass = af.getAttribute("class")
								}
								if (af.getAttribute("align")) {
									aj.align = af.getAttribute("align")
								}
								var ai = {};
								var Y = af.getElementsByTagName("param");
								var ad = Y.length;
								for ( var ae = 0; ae < ad; ae++) {
									if (Y[ae].getAttribute("name")
											.toLowerCase() != "movie") {
										ai[Y[ae].getAttribute("name")] = Y[ae]
												.getAttribute("value")
									}
								}
								Q(aj, ai, Z, ac)
							} else {
								q(af);
								if (ac) {
									ac(ab)
								}
							}
						}
					}
				} else {
					x(Z, true);
					if (ac) {
						var aa = A(Z);
						if (aa && typeof aa.SetVariable != E) {
							ab.success = true;
							ab.ref = aa
						}
						ac(ab)
					}
				}
			}
		}
	}
	function A(ab) {
		var Y = null;
		var Z = c(ab);
		if (Z && Z.nodeName == "OBJECT") {
			if (typeof Z.SetVariable != E) {
				Y = Z
			} else {
				var aa = Z.getElementsByTagName(s)[0];
				if (aa) {
					Y = aa
				}
			}
		}
		return Y
	}
	function B() {
		return !a && G("6.0.65") && (N.win || N.mac) && !(N.wk && N.wk < 312)
	}
	function Q(ab, ac, Y, aa) {
		a = true;
		F = aa || null;
		C = {
			success : false,
			id : Y
		};
		var af = c(Y);
		if (af) {
			if (af.nodeName == "OBJECT") {
				m = h(af);
				R = null
			} else {
				m = af;
				R = Y
			}
			ab.id = S;
			if (typeof ab.width == E
					|| (!/%$/.test(ab.width) && parseInt(ab.width, 10) < 310)) {
				ab.width = "310"
			}
			if (typeof ab.height == E
					|| (!/%$/.test(ab.height) && parseInt(ab.height, 10) < 137)) {
				ab.height = "137"
			}
			k.title = k.title.slice(0, 47) + " - Flash Player Installation";
			var ae = N.ie && N.win ? "ActiveX" : "PlugIn", ad = "MMredirectURL="
					+ P.location.toString().replace(/&/g, "%26")
					+ "&MMplayerType=" + ae + "&MMdoctitle=" + k.title;
			if (typeof ac.flashvars != E) {
				ac.flashvars += "&" + ad
			} else {
				ac.flashvars = ad
			}
			if (N.ie && N.win && af.readyState != 4) {
				var Z = D("div");
				Y += "SWFObjectNew";
				Z.setAttribute("id", Y);
				af.parentNode.insertBefore(Z, af);
				af.style.display = "none";
				( function() {
					if (af.readyState == 4) {
						af.parentNode.removeChild(af)
					} else {
						setTimeout(arguments.callee, 10)
					}
				})()
			}
			v(ab, ac, Y)
		}
	}
	function q(Z) {
		if (N.ie && N.win && Z.readyState != 4) {
			var Y = D("div");
			Z.parentNode.insertBefore(Y, Z);
			Y.parentNode.replaceChild(h(Z), Y);
			Z.style.display = "none";
			( function() {
				if (Z.readyState == 4) {
					Z.parentNode.removeChild(Z)
				} else {
					setTimeout(arguments.callee, 10)
				}
			})()
		} else {
			Z.parentNode.replaceChild(h(Z), Z)
		}
	}
	function h(ad) {
		var ab = D("div");
		if (N.win && N.ie) {
			ab.innerHTML = ad.innerHTML
		} else {
			var Z = ad.getElementsByTagName(s)[0];
			if (Z) {
				var ae = Z.childNodes;
				if (ae) {
					var Y = ae.length;
					for ( var aa = 0; aa < Y; aa++) {
						if (!(ae[aa].nodeType == 1 && ae[aa].nodeName == "PARAM")
								&& !(ae[aa].nodeType == 8)) {
							ab.appendChild(ae[aa].cloneNode(true))
						}
					}
				}
			}
		}
		return ab
	}
	function v(aj, ah, Z) {
		var Y, ab = c(Z);
		if (N.wk && N.wk < 312) {
			return Y
		}
		if (ab) {
			if (typeof aj.id == E) {
				aj.id = Z
			}
			if (N.ie && N.win) {
				var ai = "";
				for ( var af in aj) {
					if (aj[af] != Object.prototype[af]) {
						if (af.toLowerCase() == "data") {
							ah.movie = aj[af]
						} else {
							if (af.toLowerCase() == "styleclass") {
								ai += ' class="' + aj[af] + '"'
							} else {
								if (af.toLowerCase() != "classid") {
									ai += " " + af + '="' + aj[af] + '"'
								}
							}
						}
					}
				}
				var ag = "";
				for ( var ae in ah) {
					if (ah[ae] != Object.prototype[ae]) {
						ag += '<param name="' + ae + '" value="' + ah[ae]
								+ '" />'
					}
				}
				ab.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'
						+ ai + ">" + ag + "</object>";
				O[O.length] = aj.id;
				Y = c(aj.id)
			} else {
				var aa = D(s);
				aa.setAttribute("type", r);
				for ( var ad in aj) {
					if (aj[ad] != Object.prototype[ad]) {
						if (ad.toLowerCase() == "styleclass") {
							aa.setAttribute("class", aj[ad])
						} else {
							if (ad.toLowerCase() != "classid") {
								aa.setAttribute(ad, aj[ad])
							}
						}
					}
				}
				for ( var ac in ah) {
					if (ah[ac] != Object.prototype[ac]
							&& ac.toLowerCase() != "movie") {
						e(aa, ac, ah[ac])
					}
				}
				ab.parentNode.replaceChild(aa, ab);
				Y = aa
			}
		}
		return Y
	}
	function e(aa, Y, Z) {
		var ab = D("param");
		ab.setAttribute("name", Y);
		ab.setAttribute("value", Z);
		aa.appendChild(ab)
	}
	function z(Z) {
		var Y = c(Z);
		if (Y && Y.nodeName == "OBJECT") {
			if (N.ie && N.win) {
				Y.style.display = "none";
				( function() {
					if (Y.readyState == 4) {
						b(Z)
					} else {
						setTimeout(arguments.callee, 10)
					}
				})()
			} else {
				Y.parentNode.removeChild(Y)
			}
		}
	}
	function b(aa) {
		var Z = c(aa);
		if (Z) {
			for ( var Y in Z) {
				if (typeof Z[Y] == "function") {
					Z[Y] = null
				}
			}
			Z.parentNode.removeChild(Z)
		}
	}
	function c(aa) {
		var Y = null;
		try {
			Y = k.getElementById(aa)
		} catch (Z) {
		}
		return Y
	}
	function D(Y) {
		return k.createElement(Y)
	}
	function j(aa, Y, Z) {
		aa.attachEvent(Y, Z);
		J[J.length] = [ aa, Y, Z ]
	}
	function G(aa) {
		var Z = N.pv, Y = aa.split(".");
		Y[0] = parseInt(Y[0], 10);
		Y[1] = parseInt(Y[1], 10) || 0;
		Y[2] = parseInt(Y[2], 10) || 0;
		return (Z[0] > Y[0] || (Z[0] == Y[0] && Z[1] > Y[1]) || (Z[0] == Y[0]
				&& Z[1] == Y[1] && Z[2] >= Y[2])) ? true : false
	}
	function w(ad, Z, ae, ac) {
		if (N.ie && N.mac) {
			return
		}
		var ab = k.getElementsByTagName("head")[0];
		if (!ab) {
			return
		}
		var Y = (ae && typeof ae == "string") ? ae : "screen";
		if (ac) {
			o = null;
			H = null
		}
		if (!o || H != Y) {
			var aa = D("style");
			aa.setAttribute("type", "text/css");
			aa.setAttribute("media", Y);
			o = ab.appendChild(aa);
			if (N.ie && N.win && typeof k.styleSheets != E
					&& k.styleSheets.length > 0) {
				o = k.styleSheets[k.styleSheets.length - 1]
			}
			H = Y
		}
		if (N.ie && N.win) {
			if (o && typeof o.addRule == s) {
				o.addRule(ad, Z)
			}
		} else {
			if (o && typeof k.createTextNode != E) {
				o.appendChild(k.createTextNode(ad + " {" + Z + "}"))
			}
		}
	}
	function x(aa, Y) {
		if (!n) {
			return
		}
		var Z = Y ? "visible" : "hidden";
		if (K && c(aa)) {
			c(aa).style.visibility = Z
		} else {
			w("#" + aa, "visibility:" + Z)
		}
	}
	function M(Z) {
		var aa = /[\\\"<>\.;]/;
		var Y = aa.exec(Z) != null;
		return Y && typeof encodeURIComponent != E ? encodeURIComponent(Z) : Z
	}
	var d = function() {
		if (N.ie && N.win) {
			window.attachEvent("onunload", function() {
				var ad = J.length;
				for ( var ac = 0; ac < ad; ac++) {
					J[ac][0].detachEvent(J[ac][1], J[ac][2])
				}
				var aa = O.length;
				for ( var ab = 0; ab < aa; ab++) {
					z(O[ab])
				}
				for ( var Z in N) {
					N[Z] = null
				}
				N = null;
				for ( var Y in swfobject) {
					swfobject[Y] = null
				}
				swfobject = null
			})
		}
	}();
	return {
		registerObject : function(ac, Y, ab, aa) {
			if (N.w3 && ac && Y) {
				var Z = {};
				Z.id = ac;
				Z.swfVersion = Y;
				Z.expressInstall = ab;
				Z.callbackFn = aa;
				p[p.length] = Z;
				x(ac, false)
			} else {
				if (aa) {
					aa( {
						success : false,
						id : ac
					})
				}
			}
		},
		getObjectById : function(Y) {
			if (N.w3) {
				return A(Y)
			}
		},
		embedSWF : function(ac, ai, af, ah, Z, ab, aa, ae, ag, ad) {
			var Y = {
				success : false,
				id : ai
			};
			if (N.w3 && !(N.wk && N.wk < 312) && ac && ai && af && ah && Z) {
				x(ai, false);
				L( function() {
					af += "";
					ah += "";
					var ak = {};
					if (ag && typeof ag === s) {
						for ( var am in ag) {
							ak[am] = ag[am]
						}
					}
					ak.data = ac;
					ak.width = af;
					ak.height = ah;
					var an = {};
					if (ae && typeof ae === s) {
						for ( var al in ae) {
							an[al] = ae[al]
						}
					}
					if (aa && typeof aa === s) {
						for ( var aj in aa) {
							if (typeof an.flashvars != E) {
								an.flashvars += "&" + aj + "=" + aa[aj]
							} else {
								an.flashvars = aj + "=" + aa[aj]
							}
						}
					}
					if (G(Z)) {
						var ao = v(ak, an, ai);
						if (ak.id == ai) {
							x(ai, true)
						}
						Y.success = true;
						Y.ref = ao
					} else {
						if (ab && B()) {
							ak.data = ab;
							Q(ak, an, ai, ad);
							return
						} else {
							x(ai, true)
						}
					}
					if (ad) {
						ad(Y)
					}
				})
			} else {
				if (ad) {
					ad(Y)
				}
			}
		},
		switchOffAutoHideShow : function() {
			n = false
		},
		ua : N,
		getFlashPlayerVersion : function() {
			return {
				major : N.pv[0],
				minor : N.pv[1],
				release : N.pv[2]
			}
		},
		hasFlashPlayerVersion : G,
		createSWF : function(aa, Z, Y) {
			if (N.w3) {
				return v(aa, Z, Y)
			} else {
				return undefined
			}
		},
		showExpressInstall : function(aa, ab, Y, Z) {
			if (N.w3 && B()) {
				Q(aa, ab, Y, Z)
			}
		},
		removeSWF : function(Y) {
			if (N.w3) {
				z(Y)
			}
		},
		createCSS : function(ab, aa, Z, Y) {
			if (N.w3) {
				w(ab, aa, Z, Y)
			}
		},
		addDomLoadEvent : L,
		addLoadEvent : t,
		getQueryParamValue : function(ab) {
			var aa = k.location.search || k.location.hash;
			if (aa) {
				if (/\?/.test(aa)) {
					aa = aa.split("?")[1]
				}
				if (ab == null) {
					return M(aa)
				}
				var Z = aa.split("&");
				for ( var Y = 0; Y < Z.length; Y++) {
					if (Z[Y].substring(0, Z[Y].indexOf("=")) == ab) {
						return M(Z[Y].substring((Z[Y].indexOf("=") + 1)))
					}
				}
			}
			return ""
		},
		expressInstallCallback : function() {
			if (a) {
				var Y = c(S);
				if (Y && m) {
					Y.parentNode.replaceChild(m, Y);
					if (R) {
						x(R, true);
						if (N.ie && N.win) {
							m.style.display = "block"
						}
					}
					if (F) {
						F(C)
					}
				}
				a = false
			}
		}
	}
}();
Ext.FlashComponent = Ext.extend(Ext.BoxComponent, {
	flashVersion : "9.0.45",
	backgroundColor : "#ffffff",
	wmode : "opaque",
	url : undefined,
	swfId : undefined,
	swfWidth : "100%",
	swfHeight : "100%",
	expressInstall : false,
	initComponent : function() {
		Ext.FlashComponent.superclass.initComponent.call(this);
		this.addEvents("initialize")
	},
	onRender : function() {
		Ext.FlashComponent.superclass.onRender.apply(this, arguments);
		var b = {
			allowScriptAccess : "always",
			bgcolor : this.backgroundColor,
			wmode : this.wmode
		}, a = {
			allowedDomain : document.location.hostname,
			elementID : this.getId(),
			eventHandler : "Ext.FlashEventProxy.onEvent"
		};
		new swfobject.embedSWF(this.url, this.id, this.swfWidth,
				this.swfHeight, this.flashVersion,
				this.expressInstall ? Ext.FlashComponent.EXPRESS_INSTALL_URL
						: undefined, a, b);
		this.swf = Ext.getDom(this.id);
		this.el = Ext.get(this.swf)
	},
	getSwfId : function() {
		return this.swfId
				|| (this.swfId = "extswf" + (++Ext.Component.AUTO_ID))
	},
	getId : function() {
		return this.id || (this.id = "extflashcmp" + (++Ext.Component.AUTO_ID))
	},
	onFlashEvent : function(a) {
		switch (a.type) {
		case "swfReady":
			this.initSwf();
			return;
		case "log":
			return
		}
		a.component = this;
		this.fireEvent(a.type.toLowerCase().replace(/event$/, ""), a)
	},
	initSwf : function() {
		this.onSwfReady(!!this.isInitialized);
		this.isInitialized = true;
		this.fireEvent("initialize", this)
	},
	beforeDestroy : function() {
		if (this.rendered) {
			swfobject.removeSWF(this.swf.id)
		}
		Ext.FlashComponent.superclass.beforeDestroy.call(this)
	},
	onSwfReady : Ext.emptyFn
});
Ext.FlashComponent.EXPRESS_INSTALL_URL = "http://swfobject.googlecode.com/svn/trunk/swfobject/expressInstall.swf";
Ext.reg("flash", Ext.FlashComponent);
Ext.FlashEventProxy = {
	onEvent : function(c, b) {
		var a = Ext.getCmp(c);
		if (a) {
			a.onFlashEvent(b)
		} else {
			arguments.callee.defer(10, this, [ c, b ])
		}
	}
};
Ext.chart.Chart = Ext.extend(Ext.FlashComponent, {
	refreshBuffer : 100,
	chartStyle : {
		padding : 10,
		animationEnabled : true,
		font : {
			name : "Tahoma",
			color : 4473924,
			size : 11
		},
		dataTip : {
			padding : 5,
			border : {
				color : 10075112,
				size : 1
			},
			background : {
				color : 14346230,
				alpha : 0.9
			},
			font : {
				name : "Tahoma",
				color : 1393291,
				size : 10,
				bold : true
			}
		}
	},
	extraStyle : null,
	disableCaching : Ext.isIE || Ext.isOpera,
	disableCacheParam : "_dc",
	initComponent : function() {
		Ext.chart.Chart.superclass.initComponent.call(this);
		if (!this.url) {
			this.url = Ext.chart.Chart.CHART_URL
		}
		if (this.disableCaching) {
			this.url = Ext.urlAppend(this.url, String.format("{0}={1}",
					this.disableCacheParam, new Date().getTime()))
		}
		this.addEvents("itemmouseover", "itemmouseout", "itemclick",
				"itemdoubleclick", "itemdragstart", "itemdrag", "itemdragend");
		this.store = Ext.StoreMgr.lookup(this.store)
	},
	setStyle : function(a, b) {
		this.swf.setStyle(a, Ext.encode(b))
	},
	setStyles : function(a) {
		this.swf.setStyles(Ext.encode(a))
	},
	setSeriesStyles : function(b) {
		var a = [];
		Ext.each(b, function(c) {
			a.push(Ext.encode(c))
		});
		this.swf.setSeriesStyles(a)
	},
	setCategoryNames : function(a) {
		this.swf.setCategoryNames(a)
	},
	setTipRenderer : function(b) {
		var a = this;
		this.tipFnName = this.createFnProxy( function(g, d, e) {
			var c = a.store.getAt(d);
			return b(a, c, d, e)
		}, this.tipFnName);
		this.swf.setDataTipFunction(this.tipFnName)
	},
	setSeries : function(a) {
		this.series = a;
		this.refresh()
	},
	bindStore : function(a, b) {
		if (!b && this.store) {
			this.store.un("datachanged", this.refresh, this);
			this.store.un("add", this.delayRefresh, this);
			this.store.un("remove", this.delayRefresh, this);
			this.store.un("update", this.delayRefresh, this);
			this.store.un("clear", this.refresh, this);
			if (a !== this.store && this.store.autoDestroy) {
				this.store.destroy()
			}
		}
		if (a) {
			a = Ext.StoreMgr.lookup(a);
			a.on( {
				scope : this,
				datachanged : this.refresh,
				add : this.delayRefresh,
				remove : this.delayRefresh,
				update : this.delayRefresh,
				clear : this.refresh
			})
		}
		this.store = a;
		if (a && !b) {
			this.refresh()
		}
	},
	onSwfReady : function(a) {
		Ext.chart.Chart.superclass.onSwfReady.call(this, a);
		this.swf.setType(this.type);
		if (this.chartStyle) {
			this.setStyles(Ext.apply(this.extraStyle || {}, this.chartStyle))
		}
		if (this.categoryNames) {
			this.setCategoryNames(this.categoryNames)
		}
		if (this.tipRenderer) {
			this.setTipRenderer(this.tipRenderer)
		}
		if (!a) {
			this.bindStore(this.store, true)
		}
		this.refresh.defer(10, this)
	},
	delayRefresh : function() {
		if (!this.refreshTask) {
			this.refreshTask = new Ext.util.DelayedTask(this.refresh, this)
		}
		this.refreshTask.delay(this.refreshBuffer)
	},
	refresh : function() {
		var m = false;
		var k = [], c = this.store.data.items;
		for ( var g = 0, l = c.length; g < l; g++) {
			k[g] = c[g].data
		}
		var e = [];
		var d = 0;
		var n = null;
		var h = 0;
		if (this.series) {
			d = this.series.length;
			for (h = 0; h < d; h++) {
				n = this.series[h];
				var b = {};
				for ( var a in n) {
					if (a == "style" && n.style !== null) {
						b.style = Ext.encode(n.style);
						m = true
					} else {
						b[a] = n[a]
					}
				}
				e.push(b)
			}
		}
		if (d > 0) {
			for (h = 0; h < d; h++) {
				n = e[h];
				if (!n.type) {
					n.type = this.type
				}
				n.dataProvider = k
			}
		} else {
			e.push( {
				type : this.type,
				dataProvider : k
			})
		}
		this.swf.setDataProvider(e)
	},
	createFnProxy : function(b, a) {
		if (a) {
			delete window[a]
		}
		var c = "extFnProxy" + (++Ext.chart.Chart.PROXY_FN_ID);
		window[c] = b;
		return c
	},
	onDestroy : function() {
		Ext.chart.Chart.superclass.onDestroy.call(this);
		delete window[this.tipFnName]
	}
});
Ext.reg("chart", Ext.chart.Chart);
Ext.chart.Chart.PROXY_FN_ID = 0;
Ext.chart.Chart.CHART_URL = "http://yui.yahooapis.com/2.7.0/build/charts/assets/charts.swf";
Ext.chart.PieChart = Ext.extend(Ext.chart.Chart, {
	type : "pie",
	onSwfReady : function(a) {
		Ext.chart.PieChart.superclass.onSwfReady.call(this, a);
		this.setDataField(this.dataField);
		this.setCategoryField(this.categoryField)
	},
	setDataField : function(a) {
		this.dataField = a;
		this.swf.setDataField(a)
	},
	setCategoryField : function(a) {
		this.categoryField = a;
		this.swf.setCategoryField(a)
	}
});
Ext.reg("piechart", Ext.chart.PieChart);
Ext.chart.CartesianChart = Ext.extend(Ext.chart.Chart, {
	onSwfReady : function(a) {
		Ext.chart.CartesianChart.superclass.onSwfReady.call(this, a);
		if (this.xField) {
			this.setXField(this.xField)
		}
		if (this.yField) {
			this.setYField(this.yField)
		}
		if (this.xAxis) {
			this.setXAxis(this.xAxis)
		}
		if (this.yAxis) {
			this.setYAxis(this.yAxis)
		}
	},
	setXField : function(a) {
		this.xField = a;
		this.swf.setHorizontalField(a)
	},
	setYField : function(a) {
		this.yField = a;
		this.swf.setVerticalField(a)
	},
	setXAxis : function(a) {
		this.xAxis = this.createAxis("xAxis", a);
		this.swf.setHorizontalAxis(this.xAxis)
	},
	setYAxis : function(a) {
		this.yAxis = this.createAxis("yAxis", a);
		this.swf.setVerticalAxis(this.yAxis)
	},
	createAxis : function(c, d) {
		var e = Ext.apply( {}, d), a = null;
		if (this[c]) {
			a = this[c].labelFunction
		}
		if (e.labelRenderer) {
			var b = e.labelRenderer;
			e.labelFunction = this.createFnProxy( function(g) {
				return b(g)
			}, a);
			delete e.labelRenderer
		}
		return e
	}
});
Ext.reg("cartesianchart", Ext.chart.CartesianChart);
Ext.chart.LineChart = Ext.extend(Ext.chart.CartesianChart, {
	type : "line"
});
Ext.reg("linechart", Ext.chart.LineChart);
Ext.chart.ColumnChart = Ext.extend(Ext.chart.CartesianChart, {
	type : "column"
});
Ext.reg("columnchart", Ext.chart.ColumnChart);
Ext.chart.StackedColumnChart = Ext.extend(Ext.chart.CartesianChart, {
	type : "stackcolumn"
});
Ext.reg("stackedcolumnchart", Ext.chart.StackedColumnChart);
Ext.chart.BarChart = Ext.extend(Ext.chart.CartesianChart, {
	type : "bar"
});
Ext.reg("barchart", Ext.chart.BarChart);
Ext.chart.StackedBarChart = Ext.extend(Ext.chart.CartesianChart, {
	type : "stackbar"
});
Ext.reg("stackedbarchart", Ext.chart.StackedBarChart);
Ext.chart.Axis = function(a) {
	Ext.apply(this, a)
};
Ext.chart.Axis.prototype = {
	type : null,
	orientation : "horizontal",
	reverse : false,
	labelFunction : null,
	hideOverlappingLabels : true
};
Ext.chart.NumericAxis = Ext.extend(Ext.chart.Axis, {
	type : "numeric",
	minimum : NaN,
	maximum : NaN,
	majorUnit : NaN,
	minorUnit : NaN,
	snapToUnits : true,
	alwaysShowZero : true,
	scale : "linear"
});
Ext.chart.TimeAxis = Ext.extend(Ext.chart.Axis, {
	type : "time",
	minimum : null,
	maximum : null,
	majorUnit : NaN,
	majorTimeUnit : null,
	minorUnit : NaN,
	minorTimeUnit : null,
	snapToUnits : true
});
Ext.chart.CategoryAxis = Ext.extend(Ext.chart.Axis, {
	type : "category",
	categoryNames : null
});
Ext.chart.Series = function(a) {
	Ext.apply(this, a)
};
Ext.chart.Series.prototype = {
	type : null,
	displayName : null
};
Ext.chart.CartesianSeries = Ext.extend(Ext.chart.Series, {
	xField : null,
	yField : null
});
Ext.chart.ColumnSeries = Ext.extend(Ext.chart.CartesianSeries, {
	type : "column"
});
Ext.chart.LineSeries = Ext.extend(Ext.chart.CartesianSeries, {
	type : "line"
});
Ext.chart.BarSeries = Ext.extend(Ext.chart.CartesianSeries, {
	type : "bar"
});
Ext.chart.PieSeries = Ext.extend(Ext.chart.Series, {
	type : "pie",
	dataField : null,
	categoryField : null
});
Ext.layout.MenuLayout = Ext
		.extend(
				Ext.layout.ContainerLayout,
				{
					monitorResize : true,
					setContainer : function(a) {
						this.monitorResize = !a.floating;
						Ext.layout.MenuLayout.superclass.setContainer.call(
								this, a)
					},
					renderItem : function(g, b, e) {
						if (!this.itemTpl) {
							this.itemTpl = Ext.layout.MenuLayout.prototype.itemTpl = new Ext.XTemplate(
									'<li id="{itemId}" class="{itemCls}">',
									'<tpl if="needsIcon">',
									'<img src="{icon}" class="{iconCls}"/>',
									"</tpl>", "</li>")
						}
						if (g && !g.rendered) {
							if (Ext.isNumber(b)) {
								b = e.dom.childNodes[b]
							}
							var d = this.getItemArgs(g);
							g.render(g.positionEl = b ? this.itemTpl
									.insertBefore(b, d, true) : this.itemTpl
									.append(e, d, true));
							g.positionEl.menuItemId = g.itemId || g.id;
							if (!d.isMenuItem && d.needsIcon) {
								g.positionEl
										.addClass("x-menu-list-item-indent")
							}
						} else {
							if (g && !this.isValidParent(g, e)) {
								if (Ext.isNumber(b)) {
									b = e.dom.childNodes[b]
								}
								e.dom.insertBefore(g.getActionEl().dom, b
										|| null)
							}
						}
					},
					getItemArgs : function(b) {
						var a = b instanceof Ext.menu.Item;
						return {
							isMenuItem : a,
							needsIcon : !a && (b.icon || b.iconCls),
							icon : b.icon || Ext.BLANK_IMAGE_URL,
							iconCls : "x-menu-item-icon " + (b.iconCls || ""),
							itemId : "x-menu-el-" + b.id,
							itemCls : "x-menu-list-item "
									+ (this.extraCls || "")
						}
					},
					isValidParent : function(b, a) {
						return b.el.up("li.x-menu-list-item", 5).dom.parentNode === (a.dom || a)
					},
					onLayout : function(a, b) {
						this.renderAll(a, b);
						this.doAutoSize()
					},
					doAutoSize : function() {
						var c = this.container, a = c.width;
						if (c.floating) {
							if (a) {
								c.setWidth(a)
							} else {
								if (Ext.isIE) {
									c
											.setWidth(Ext.isStrict
													&& (Ext.isIE7 || Ext.isIE8) ? "auto"
													: c.minWidth);
									var d = c.getEl(), b = d.dom.offsetWidth;
									c.setWidth(c.getLayoutTarget().getWidth()
											+ d.getFrameWidth("lr"))
								}
							}
						}
					}
				});
Ext.Container.LAYOUTS.menu = Ext.layout.MenuLayout;
Ext.menu.Menu = Ext
		.extend(
				Ext.Container,
				{
					minWidth : 120,
					shadow : "sides",
					subMenuAlign : "tl-tr?",
					defaultAlign : "tl-bl?",
					allowOtherMenus : false,
					ignoreParentClicks : false,
					enableScrolling : true,
					maxHeight : null,
					scrollIncrement : 24,
					showSeparator : true,
					defaultOffsets : [ 0, 0 ],
					floating : true,
					hidden : true,
					layout : "menu",
					hideMode : "offsets",
					scrollerHeight : 8,
					autoLayout : true,
					defaultType : "menuitem",
					initComponent : function() {
						if (Ext.isArray(this.initialConfig)) {
							Ext.apply(this, {
								items : this.initialConfig
							})
						}
						this.addEvents("click", "mouseover", "mouseout",
								"itemclick");
						Ext.menu.MenuMgr.register(this);
						if (this.floating) {
							Ext.EventManager.onWindowResize(this.hide, this)
						} else {
							if (this.initialConfig.hidden !== false) {
								this.hidden = false
							}
							this.internalDefaults = {
								hideOnClick : false
							}
						}
						Ext.menu.Menu.superclass.initComponent.call(this);
						if (this.autoLayout) {
							this.on( {
								add : this.doLayout,
								remove : this.doLayout,
								scope : this
							})
						}
					},
					getLayoutTarget : function() {
						return this.ul
					},
					onRender : function(b, a) {
						if (!b) {
							b = Ext.getBody()
						}
						var c = {
							id : this.getId(),
							cls : "x-menu "
									+ ((this.floating) ? "x-menu-floating x-layer "
											: "")
									+ (this.cls || "")
									+ (this.plain ? " x-menu-plain" : "")
									+ (this.showSeparator ? ""
											: " x-menu-nosep"),
							style : this.style,
							cn : [ {
								tag : "a",
								cls : "x-menu-focus",
								href : "#",
								onclick : "return false;",
								tabIndex : "-1"
							}, {
								tag : "ul",
								cls : "x-menu-list"
							} ]
						};
						if (this.floating) {
							this.el = new Ext.Layer( {
								shadow : this.shadow,
								dh : c,
								constrain : false,
								parentEl : b,
								zindex : 15000
							})
						} else {
							this.el = b.createChild(c)
						}
						Ext.menu.Menu.superclass.onRender.call(this, b, a);
						if (!this.keyNav) {
							this.keyNav = new Ext.menu.MenuNav(this)
						}
						this.focusEl = this.el.child("a.x-menu-focus");
						this.ul = this.el.child("ul.x-menu-list");
						this.mon(this.ul, {
							scope : this,
							click : this.onClick,
							mouseover : this.onMouseOver,
							mouseout : this.onMouseOut
						});
						if (this.enableScrolling) {
							this.mon(this.el, {
								scope : this,
								delegate : ".x-menu-scroller",
								click : this.onScroll,
								mouseover : this.deactivateActive
							})
						}
					},
					findTargetItem : function(b) {
						var a = b.getTarget(".x-menu-list-item", this.ul, true);
						if (a && a.menuItemId) {
							return this.items.get(a.menuItemId)
						}
					},
					onClick : function(b) {
						var a = this.findTargetItem(b);
						if (a) {
							if (a.isFormField) {
								this.setActiveItem(a)
							} else {
								if (a.menu && this.ignoreParentClicks) {
									a.expandMenu();
									b.preventDefault()
								} else {
									if (a.onClick) {
										a.onClick(b);
										this.fireEvent("click", this, a, b)
									}
								}
							}
						}
					},
					setActiveItem : function(a, b) {
						if (a != this.activeItem) {
							this.deactivateActive();
							if ((this.activeItem = a).isFormField) {
								a.focus()
							} else {
								a.activate(b)
							}
						} else {
							if (b) {
								a.expandMenu()
							}
						}
					},
					deactivateActive : function() {
						var b = this.activeItem;
						if (b) {
							if (b.isFormField) {
								if (b.collapse) {
									b.collapse()
								}
							} else {
								b.deactivate()
							}
							delete this.activeItem
						}
					},
					tryActivate : function(g, e) {
						var b = this.items;
						for ( var c = g, a = b.length; c >= 0 && c < a; c += e) {
							var d = b.get(c);
							if (!d.disabled && (d.canActivate || d.isFormField)) {
								this.setActiveItem(d, false);
								return d
							}
						}
						return false
					},
					onMouseOver : function(b) {
						var a = this.findTargetItem(b);
						if (a) {
							if (a.canActivate && !a.disabled) {
								this.setActiveItem(a, true)
							}
						}
						this.over = true;
						this.fireEvent("mouseover", this, b, a)
					},
					onMouseOut : function(b) {
						var a = this.findTargetItem(b);
						if (a) {
							if (a == this.activeItem && a.shouldDeactivate
									&& a.shouldDeactivate(b)) {
								this.activeItem.deactivate();
								delete this.activeItem
							}
						}
						this.over = false;
						this.fireEvent("mouseout", this, b, a)
					},
					onScroll : function(d, b) {
						if (d) {
							d.stopEvent()
						}
						var a = this.ul.dom, c = Ext.fly(b).is(
								".x-menu-scroller-top");
						a.scrollTop += this.scrollIncrement * (c ? -1 : 1);
						if (c ? a.scrollTop <= 0
								: a.scrollTop + this.activeMax >= a.scrollHeight) {
							this.onScrollerOut(null, b)
						}
					},
					onScrollerIn : function(d, b) {
						var a = this.ul.dom, c = Ext.fly(b).is(
								".x-menu-scroller-top");
						if (c ? a.scrollTop > 0
								: a.scrollTop + this.activeMax < a.scrollHeight) {
							Ext.fly(b).addClass(
									[ "x-menu-item-active",
											"x-menu-scroller-active" ])
						}
					},
					onScrollerOut : function(b, a) {
						Ext.fly(a).removeClass(
								[ "x-menu-item-active",
										"x-menu-scroller-active" ])
					},
					show : function(b, c, a) {
						if (this.floating) {
							this.parentMenu = a;
							if (!this.el) {
								this.render();
								this.doLayout(false, true)
							}
							if (this.fireEvent("beforeshow", this) !== false) {
								this.showAt(this.el.getAlignToXY(b, c
										|| this.defaultAlign,
										this.defaultOffsets), a, false)
							}
						} else {
							Ext.menu.Menu.superclass.show.call(this)
						}
					},
					showAt : function(c, b, a) {
						this.parentMenu = b;
						if (!this.el) {
							this.render()
						}
						this.el.setXY(c);
						if (this.enableScrolling) {
							this.constrainScroll(c[1])
						}
						this.el.show();
						Ext.menu.Menu.superclass.onShow.call(this);
						if (Ext.isIE) {
							this.layout.doAutoSize();
							if (!Ext.isIE8) {
								this.el.repaint()
							}
						}
						this.hidden = false;
						this.focus();
						this.fireEvent("show", this)
					},
					constrainScroll : function(c) {
						var a, b = this.ul.setHeight("auto").getHeight();
						if (this.floating) {
							a = this.maxHeight ? this.maxHeight
									: Ext.fly(this.el.dom.parentNode)
											.getViewSize().height
											- c
						} else {
							a = this.getHeight()
						}
						if (b > a && a > 0) {
							this.activeMax = a - this.scrollerHeight * 2
									- this.el.getFrameWidth("tb")
									- Ext.num(this.el.shadowOffset, 0);
							this.ul.setHeight(this.activeMax);
							this.createScrollers();
							this.el.select(".x-menu-scroller").setDisplayed("")
						} else {
							this.ul.setHeight(b);
							this.el.select(".x-menu-scroller").setDisplayed(
									"none")
						}
						this.ul.dom.scrollTop = 0
					},
					createScrollers : function() {
						if (!this.scroller) {
							this.scroller = {
								pos : 0,
								top : this.el
										.insertFirst( {
											tag : "div",
											cls : "x-menu-scroller x-menu-scroller-top",
											html : "&#160;"
										}),
								bottom : this.el
										.createChild( {
											tag : "div",
											cls : "x-menu-scroller x-menu-scroller-bottom",
											html : "&#160;"
										})
							};
							this.scroller.top.hover(this.onScrollerIn,
									this.onScrollerOut, this);
							this.scroller.topRepeater = new Ext.util.ClickRepeater(
									this.scroller.top,
									{
										listeners : {
											click : this.onScroll
													.createDelegate(
															this,
															[
																	null,
																	this.scroller.top ],
															false)
										}
									});
							this.scroller.bottom.hover(this.onScrollerIn,
									this.onScrollerOut, this);
							this.scroller.bottomRepeater = new Ext.util.ClickRepeater(
									this.scroller.bottom,
									{
										listeners : {
											click : this.onScroll
													.createDelegate(
															this,
															[
																	null,
																	this.scroller.bottom ],
															false)
										}
									})
						}
					},
					onLayout : function() {
						if (this.isVisible()) {
							if (this.enableScrolling) {
								this.constrainScroll(this.el.getTop())
							}
							if (this.floating) {
								this.el.sync()
							}
						}
					},
					focus : function() {
						if (!this.hidden) {
							this.doFocus.defer(50, this)
						}
					},
					doFocus : function() {
						if (!this.hidden) {
							this.focusEl.focus()
						}
					},
					hide : function(a) {
						this.deepHide = a;
						Ext.menu.Menu.superclass.hide.call(this);
						delete this.deepHide
					},
					onHide : function() {
						Ext.menu.Menu.superclass.onHide.call(this);
						this.deactivateActive();
						if (this.el && this.floating) {
							this.el.hide()
						}
						if (this.deepHide === true && this.parentMenu) {
							this.parentMenu.hide(true)
						}
					},
					lookupComponent : function(a) {
						if (Ext.isString(a)) {
							a = (a == "separator" || a == "-") ? new Ext.menu.Separator()
									: new Ext.menu.TextItem(a);
							this.applyDefaults(a)
						} else {
							if (Ext.isObject(a)) {
								a = this.getMenuItem(a)
							} else {
								if (a.tagName || a.el) {
									a = new Ext.BoxComponent( {
										el : a
									})
								}
							}
						}
						return a
					},
					applyDefaults : function(b) {
						if (!Ext.isString(b)) {
							b = Ext.menu.Menu.superclass.applyDefaults.call(
									this, b);
							var a = this.internalDefaults;
							if (a) {
								if (b.events) {
									Ext.applyIf(b.initialConfig, a);
									Ext.apply(b, a)
								} else {
									Ext.applyIf(b, a)
								}
							}
						}
						return b
					},
					getMenuItem : function(a) {
						if (!a.isXType) {
							if (!a.xtype && Ext.isBoolean(a.checked)) {
								return new Ext.menu.CheckItem(a)
							}
							return Ext.create(a, this.defaultType)
						}
						return a
					},
					addSeparator : function() {
						return this.add(new Ext.menu.Separator())
					},
					addElement : function(a) {
						return this.add(new Ext.menu.BaseItem(a))
					},
					addItem : function(a) {
						return this.add(a)
					},
					addMenuItem : function(a) {
						return this.add(this.getMenuItem(a))
					},
					addText : function(a) {
						return this.add(new Ext.menu.TextItem(a))
					},
					onDestroy : function() {
						Ext.menu.Menu.superclass.onDestroy.call(this);
						Ext.menu.MenuMgr.unregister(this);
						Ext.EventManager.removeResizeListener(this.hide, this);
						if (this.keyNav) {
							this.keyNav.disable()
						}
						var a = this.scroller;
						if (a) {
							Ext.destroy(a.topRepeater, a.bottomRepeater, a.top,
									a.bottom)
						}
					}
				});
Ext.reg("menu", Ext.menu.Menu);
Ext.menu.MenuNav = Ext.extend(Ext.KeyNav, function() {
	function a(d, c) {
		if (!c.tryActivate(c.items.indexOf(c.activeItem) - 1, -1)) {
			c.tryActivate(c.items.length - 1, -1)
		}
	}
	function b(d, c) {
		if (!c.tryActivate(c.items.indexOf(c.activeItem) + 1, 1)) {
			c.tryActivate(0, 1)
		}
	}
	return {
		constructor : function(c) {
			Ext.menu.MenuNav.superclass.constructor.call(this, c.el);
			this.scope = this.menu = c
		},
		doRelay : function(g, d) {
			var c = g.getKey();
			if (this.menu.activeItem && this.menu.activeItem.isFormField
					&& c != g.TAB) {
				return false
			}
			if (!this.menu.activeItem && g.isNavKeyPress() && c != g.SPACE
					&& c != g.RETURN) {
				this.menu.tryActivate(0, 1);
				return false
			}
			return d.call(this.scope || this, g, this.menu)
		},
		tab : function(d, c) {
			d.stopEvent();
			if (d.shiftKey) {
				a(d, c)
			} else {
				b(d, c)
			}
		},
		up : a,
		down : b,
		right : function(d, c) {
			if (c.activeItem) {
				c.activeItem.expandMenu(true)
			}
		},
		left : function(d, c) {
			c.hide();
			if (c.parentMenu && c.parentMenu.activeItem) {
				c.parentMenu.activeItem.activate()
			}
		},
		enter : function(d, c) {
			if (c.activeItem) {
				d.stopPropagation();
				c.activeItem.onClick(d);
				c.fireEvent("click", this, c.activeItem);
				return true
			}
		}
	}
}());
Ext.menu.MenuMgr = function() {
	var g, d, c = {}, a = false, l = new Date();
	function n() {
		g = {};
		d = new Ext.util.MixedCollection();
		Ext.getDoc().addKeyListener(27, function() {
			if (d.length > 0) {
				i()
			}
		})
	}
	function i() {
		if (d && d.length > 0) {
			var o = d.clone();
			o.each( function(p) {
				p.hide()
			})
		}
	}
	function e(o) {
		d.remove(o);
		if (d.length < 1) {
			Ext.getDoc().un("mousedown", m);
			a = false
		}
	}
	function k(o) {
		var p = d.last();
		l = new Date();
		d.add(o);
		if (!a) {
			Ext.getDoc().on("mousedown", m);
			a = true
		}
		if (o.parentMenu) {
			o.getEl().setZIndex(
					parseInt(o.parentMenu.getEl().getStyle("z-index"), 10) + 3);
			o.parentMenu.activeChild = o
		} else {
			if (p && p.isVisible()) {
				o.getEl().setZIndex(
						parseInt(p.getEl().getStyle("z-index"), 10) + 3)
			}
		}
	}
	function b(o) {
		if (o.activeChild) {
			o.activeChild.hide()
		}
		if (o.autoHideTimer) {
			clearTimeout(o.autoHideTimer);
			delete o.autoHideTimer
		}
	}
	function h(o) {
		var p = o.parentMenu;
		if (!p && !o.allowOtherMenus) {
			i()
		} else {
			if (p && p.activeChild) {
				p.activeChild.hide()
			}
		}
	}
	function m(o) {
		if (l.getElapsed() > 50 && d.length > 0 && !o.getTarget(".x-menu")) {
			i()
		}
	}
	function j(p, s) {
		if (s) {
			var r = c[p.group];
			for ( var q = 0, o = r.length; q < o; q++) {
				if (r[q] != p) {
					r[q].setChecked(false)
				}
			}
		}
	}
	return {
		hideAll : function() {
			i()
		},
		register : function(p) {
			if (!g) {
				n()
			}
			g[p.id] = p;
			p.on("beforehide", b);
			p.on("hide", e);
			p.on("beforeshow", h);
			p.on("show", k);
			var o = p.group;
			if (o && p.events.checkchange) {
				if (!c[o]) {
					c[o] = []
				}
				c[o].push(p);
				p.on("checkchange", onCheck)
			}
		},
		get : function(o) {
			if (typeof o == "string") {
				if (!g) {
					return null
				}
				return g[o]
			} else {
				if (o.events) {
					return o
				} else {
					if (typeof o.length == "number") {
						return new Ext.menu.Menu( {
							items : o
						})
					} else {
						return Ext.create(o, "menu")
					}
				}
			}
		},
		unregister : function(p) {
			delete g[p.id];
			p.un("beforehide", b);
			p.un("hide", e);
			p.un("beforeshow", h);
			p.un("show", k);
			var o = p.group;
			if (o && p.events.checkchange) {
				c[o].remove(p);
				p.un("checkchange", onCheck)
			}
		},
		registerCheckable : function(o) {
			var p = o.group;
			if (p) {
				if (!c[p]) {
					c[p] = []
				}
				c[p].push(o);
				o.on("beforecheckchange", j)
			}
		},
		unregisterCheckable : function(o) {
			var p = o.group;
			if (p) {
				c[p].remove(o);
				o.un("beforecheckchange", j)
			}
		},
		getCheckedItem : function(q) {
			var r = c[q];
			if (r) {
				for ( var p = 0, o = r.length; p < o; p++) {
					if (r[p].checked) {
						return r[p]
					}
				}
			}
			return null
		},
		setCheckedItem : function(q, s) {
			var r = c[q];
			if (r) {
				for ( var p = 0, o = r.length; p < o; p++) {
					if (r[p].id == s) {
						r[p].setChecked(true)
					}
				}
			}
			return null
		}
	}
}();
Ext.menu.BaseItem = function(a) {
	Ext.menu.BaseItem.superclass.constructor.call(this, a);
	this.addEvents("click", "activate", "deactivate");
	if (this.handler) {
		this.on("click", this.handler, this.scope)
	}
};
Ext.extend(Ext.menu.BaseItem, Ext.Component, {
	canActivate : false,
	activeClass : "x-menu-item-active",
	hideOnClick : true,
	clickHideDelay : 1,
	ctype : "Ext.menu.BaseItem",
	actionMode : "container",
	onRender : function(b, a) {
		Ext.menu.BaseItem.superclass.onRender.apply(this, arguments);
		if (this.ownerCt && this.ownerCt instanceof Ext.menu.Menu) {
			this.parentMenu = this.ownerCt
		} else {
			this.container.addClass("x-menu-list-item");
			this.mon(this.el, "click", this.onClick, this);
			this.mon(this.el, "mouseenter", this.activate, this);
			this.mon(this.el, "mouseleave", this.deactivate, this)
		}
	},
	setHandler : function(b, a) {
		if (this.handler) {
			this.un("click", this.handler, this.scope)
		}
		this.on("click", this.handler = b, this.scope = a)
	},
	onClick : function(a) {
		if (!this.disabled
				&& this.fireEvent("click", this, a) !== false
				&& (this.parentMenu && this.parentMenu.fireEvent("itemclick",
						this, a) !== false)) {
			this.handleClick(a)
		} else {
			a.stopEvent()
		}
	},
	activate : function() {
		if (this.disabled) {
			return false
		}
		var a = this.container;
		a.addClass(this.activeClass);
		this.region = a.getRegion().adjust(2, 2, -2, -2);
		this.fireEvent("activate", this);
		return true
	},
	deactivate : function() {
		this.container.removeClass(this.activeClass);
		this.fireEvent("deactivate", this)
	},
	shouldDeactivate : function(a) {
		return !this.region || !this.region.contains(a.getPoint())
	},
	handleClick : function(a) {
		if (this.hideOnClick) {
			this.parentMenu.hide.defer(this.clickHideDelay, this.parentMenu,
					[ true ])
		}
	},
	expandMenu : Ext.emptyFn,
	hideMenu : Ext.emptyFn
});
Ext.reg("menubaseitem", Ext.menu.BaseItem);
Ext.menu.TextItem = function(a) {
	if (typeof a == "string") {
		a = {
			text : a
		}
	}
	Ext.menu.TextItem.superclass.constructor.call(this, a)
};
Ext.extend(Ext.menu.TextItem, Ext.menu.BaseItem, {
	hideOnClick : false,
	itemCls : "x-menu-text",
	onRender : function() {
		var a = document.createElement("span");
		a.className = this.itemCls;
		a.innerHTML = this.text;
		this.el = a;
		Ext.menu.TextItem.superclass.onRender.apply(this, arguments)
	}
});
Ext.reg("menutextitem", Ext.menu.TextItem);
Ext.menu.Separator = function(a) {
	Ext.menu.Separator.superclass.constructor.call(this, a)
};
Ext.extend(Ext.menu.Separator, Ext.menu.BaseItem, {
	itemCls : "x-menu-sep",
	hideOnClick : false,
	activeClass : "",
	onRender : function(a) {
		var b = document.createElement("span");
		b.className = this.itemCls;
		b.innerHTML = "&#160;";
		this.el = b;
		a.addClass("x-menu-sep-li");
		Ext.menu.Separator.superclass.onRender.apply(this, arguments)
	}
});
Ext.reg("menuseparator", Ext.menu.Separator);
Ext.menu.Item = function(a) {
	Ext.menu.Item.superclass.constructor.call(this, a);
	if (this.menu) {
		this.menu = Ext.menu.MenuMgr.get(this.menu)
	}
};
Ext
		.extend(
				Ext.menu.Item,
				Ext.menu.BaseItem,
				{
					itemCls : "x-menu-item",
					canActivate : true,
					showDelay : 200,
					hideDelay : 200,
					ctype : "Ext.menu.Item",
					onRender : function(d, b) {
						if (!this.itemTpl) {
							this.itemTpl = Ext.menu.Item.prototype.itemTpl = new Ext.XTemplate(
									'<a id="{id}" class="{cls}" hidefocus="true" unselectable="on" href="{href}"',
									'<tpl if="hrefTarget">',
									' target="{hrefTarget}"',
									"</tpl>",
									">",
									'<img src="{icon}" class="x-menu-item-icon {iconCls}"/>',
									'<span class="x-menu-item-text">{text}</span>',
									"</a>")
						}
						var c = this.getTemplateArgs();
						this.el = b ? this.itemTpl.insertBefore(b, c, true)
								: this.itemTpl.append(d, c, true);
						this.iconEl = this.el.child("img.x-menu-item-icon");
						this.textEl = this.el.child(".x-menu-item-text");
						Ext.menu.Item.superclass.onRender.call(this, d, b)
					},
					getTemplateArgs : function() {
						return {
							id : this.id,
							cls : this.itemCls
									+ (this.menu ? " x-menu-item-arrow" : "")
									+ (this.cls ? " " + this.cls : ""),
							href : this.href || "#",
							hrefTarget : this.hrefTarget,
							icon : this.icon || Ext.BLANK_IMAGE_URL,
							iconCls : this.iconCls || "",
							text : this.itemText || this.text || "&#160;"
						}
					},
					setText : function(a) {
						this.text = a || "&#160;";
						if (this.rendered) {
							this.textEl.update(this.text);
							this.parentMenu.layout.doAutoSize()
						}
					},
					setIconClass : function(a) {
						var b = this.iconCls;
						this.iconCls = a;
						if (this.rendered) {
							this.iconEl.replaceClass(b, this.iconCls)
						}
					},
					beforeDestroy : function() {
						if (this.menu) {
							this.menu.destroy()
						}
						Ext.menu.Item.superclass.beforeDestroy.call(this)
					},
					handleClick : function(a) {
						if (!this.href) {
							a.stopEvent()
						}
						Ext.menu.Item.superclass.handleClick.apply(this,
								arguments)
					},
					activate : function(a) {
						if (Ext.menu.Item.superclass.activate.apply(this,
								arguments)) {
							this.focus();
							if (a) {
								this.expandMenu()
							}
						}
						return true
					},
					shouldDeactivate : function(a) {
						if (Ext.menu.Item.superclass.shouldDeactivate.call(
								this, a)) {
							if (this.menu && this.menu.isVisible()) {
								return !this.menu.getEl().getRegion().contains(
										a.getPoint())
							}
							return true
						}
						return false
					},
					deactivate : function() {
						Ext.menu.Item.superclass.deactivate.apply(this,
								arguments);
						this.hideMenu()
					},
					expandMenu : function(a) {
						if (!this.disabled && this.menu) {
							clearTimeout(this.hideTimer);
							delete this.hideTimer;
							if (!this.menu.isVisible() && !this.showTimer) {
								this.showTimer = this.deferExpand.defer(
										this.showDelay, this, [ a ])
							} else {
								if (this.menu.isVisible() && a) {
									this.menu.tryActivate(0, 1)
								}
							}
						}
					},
					deferExpand : function(a) {
						delete this.showTimer;
						this.menu.show(this.container,
								this.parentMenu.subMenuAlign || "tl-tr?",
								this.parentMenu);
						if (a) {
							this.menu.tryActivate(0, 1)
						}
					},
					hideMenu : function() {
						clearTimeout(this.showTimer);
						delete this.showTimer;
						if (!this.hideTimer && this.menu
								&& this.menu.isVisible()) {
							this.hideTimer = this.deferHide.defer(
									this.hideDelay, this)
						}
					},
					deferHide : function() {
						delete this.hideTimer;
						if (this.menu.over) {
							this.parentMenu.setActiveItem(this, false)
						} else {
							this.menu.hide()
						}
					}
				});
Ext.reg("menuitem", Ext.menu.Item);
Ext.menu.CheckItem = function(a) {
	Ext.menu.CheckItem.superclass.constructor.call(this, a);
	this.addEvents("beforecheckchange", "checkchange");
	if (this.checkHandler) {
		this.on("checkchange", this.checkHandler, this.scope)
	}
	Ext.menu.MenuMgr.registerCheckable(this)
};
Ext.extend(Ext.menu.CheckItem, Ext.menu.Item, {
	itemCls : "x-menu-item x-menu-check-item",
	groupClass : "x-menu-group-item",
	checked : false,
	ctype : "Ext.menu.CheckItem",
	onRender : function(a) {
		Ext.menu.CheckItem.superclass.onRender.apply(this, arguments);
		if (this.group) {
			this.el.addClass(this.groupClass)
		}
		if (this.checked) {
			this.checked = false;
			this.setChecked(true, true)
		}
	},
	destroy : function() {
		Ext.menu.MenuMgr.unregisterCheckable(this);
		Ext.menu.CheckItem.superclass.destroy.apply(this, arguments)
	},
	setChecked : function(b, a) {
		if (this.checked != b
				&& this.fireEvent("beforecheckchange", this, b) !== false) {
			if (this.container) {
				this.container[b ? "addClass" : "removeClass"]
						("x-menu-item-checked")
			}
			this.checked = b;
			if (a !== true) {
				this.fireEvent("checkchange", this, b)
			}
		}
	},
	handleClick : function(a) {
		if (!this.disabled && !(this.checked && this.group)) {
			this.setChecked(!this.checked)
		}
		Ext.menu.CheckItem.superclass.handleClick.apply(this, arguments)
	}
});
Ext.reg("menucheckitem", Ext.menu.CheckItem);
Ext.menu.DateMenu = Ext.extend(Ext.menu.Menu, {
	enableScrolling : false,
	hideOnClick : true,
	cls : "x-date-menu",
	initComponent : function() {
		this.on("beforeshow", this.onBeforeShow, this);
		if (this.strict = (Ext.isIE7 && Ext.isStrict)) {
			this.on("show", this.onShow, this, {
				single : true,
				delay : 20
			})
		}
		Ext.apply(this, {
			plain : true,
			showSeparator : false,
			items : this.picker = new Ext.DatePicker(Ext.apply( {
				internalRender : this.strict || !Ext.isIE,
				ctCls : "x-menu-date-item"
			}, this.initialConfig))
		});
		this.picker.purgeListeners();
		Ext.menu.DateMenu.superclass.initComponent.call(this);
		this.relayEvents(this.picker, [ "select" ]);
		this.on("select", this.menuHide, this);
		if (this.handler) {
			this.on("select", this.handler, this.scope || this)
		}
	},
	menuHide : function() {
		if (this.hideOnClick) {
			this.hide(true)
		}
	},
	onBeforeShow : function() {
		if (this.picker) {
			this.picker.hideMonthPicker(true)
		}
	},
	onShow : function() {
		var a = this.picker.getEl();
		a.setWidth(a.getWidth())
	}
});
Ext.reg("datemenu", Ext.menu.DateMenu);
Ext.menu.ColorMenu = Ext.extend(Ext.menu.Menu, {
	enableScrolling : false,
	hideOnClick : true,
	initComponent : function() {
		Ext.apply(this, {
			plain : true,
			showSeparator : false,
			items : this.palette = new Ext.ColorPalette(this.initialConfig)
		});
		this.palette.purgeListeners();
		Ext.menu.ColorMenu.superclass.initComponent.call(this);
		this.relayEvents(this.palette, [ "select" ]);
		this.on("select", this.menuHide, this);
		if (this.handler) {
			this.on("select", this.handler, this.scope || this)
		}
	},
	menuHide : function() {
		if (this.hideOnClick) {
			this.hide(true)
		}
	}
});
Ext.reg("colormenu", Ext.menu.ColorMenu);
Ext.form.Field = Ext.extend(Ext.BoxComponent, {
	invalidClass : "x-form-invalid",
	invalidText : "The value in this field is invalid",
	focusClass : "x-form-focus",
	validationEvent : "keyup",
	validateOnBlur : true,
	validationDelay : 250,
	defaultAutoCreate : {
		tag : "input",
		type : "text",
		size : "20",
		autocomplete : "off"
	},
	fieldClass : "x-form-field",
	msgTarget : "qtip",
	msgFx : "normal",
	readOnly : false,
	disabled : false,
	isFormField : true,
	hasFocus : false,
	initComponent : function() {
		Ext.form.Field.superclass.initComponent.call(this);
		this.addEvents("focus", "blur", "specialkey", "change", "invalid",
				"valid")
	},
	getName : function() {
		return this.rendered && this.el.dom.name ? this.el.dom.name : this.name
				|| this.id || ""
	},
	onRender : function(c, a) {
		if (!this.el) {
			var b = this.getAutoCreate();
			if (!b.name) {
				b.name = this.name || this.id
			}
			if (this.inputType) {
				b.type = this.inputType
			}
			this.autoEl = b
		}
		Ext.form.Field.superclass.onRender.call(this, c, a);
		var d = this.el.dom.type;
		if (d) {
			if (d == "password") {
				d = "text"
			}
			this.el.addClass("x-form-" + d)
		}
		if (this.readOnly) {
			this.el.dom.readOnly = true
		}
		if (this.tabIndex !== undefined) {
			this.el.dom.setAttribute("tabIndex", this.tabIndex)
		}
		this.el.addClass( [ this.fieldClass, this.cls ])
	},
	getItemCt : function() {
		return this.el.up(".x-form-item", 4)
	},
	initValue : function() {
		if (this.value !== undefined) {
			this.setValue(this.value)
		} else {
			if (!Ext.isEmpty(this.el.dom.value)
					&& this.el.dom.value != this.emptyText) {
				this.setValue(this.el.dom.value)
			}
		}
		this.originalValue = this.getValue()
	},
	isDirty : function() {
		if (this.disabled || !this.rendered) {
			return false
		}
		return String(this.getValue()) !== String(this.originalValue)
	},
	afterRender : function() {
		Ext.form.Field.superclass.afterRender.call(this);
		this.initEvents();
		this.initValue()
	},
	fireKey : function(a) {
		if (a.isSpecialKey()) {
			this.fireEvent("specialkey", this, a)
		}
	},
	reset : function() {
		this.setValue(this.originalValue);
		this.clearInvalid()
	},
	initEvents : function() {
		this.mon(this.el, Ext.EventManager.useKeydown ? "keydown" : "keypress",
				this.fireKey, this);
		this.mon(this.el, "focus", this.onFocus, this);
		var a = this.inEditor && Ext.isWindows && Ext.isGecko ? {
			buffer : 10
		} : null;
		this.mon(this.el, "blur", this.onBlur, this, a)
	},
	onFocus : function() {
		if (this.focusClass) {
			this.el.addClass(this.focusClass)
		}
		if (!this.hasFocus) {
			this.hasFocus = true;
			this.startValue = this.getValue();
			this.fireEvent("focus", this)
		}
	},
	beforeBlur : Ext.emptyFn,
	onBlur : function() {
		this.beforeBlur();
		if (this.focusClass) {
			this.el.removeClass(this.focusClass)
		}
		this.hasFocus = false;
		if (this.validationEvent !== false && this.validateOnBlur
				&& this.validationEvent != "blur") {
			this.validate()
		}
		var a = this.getValue();
		if (String(a) !== String(this.startValue)) {
			this.fireEvent("change", this, a, this.startValue)
		}
		this.fireEvent("blur", this)
	},
	isValid : function(a) {
		if (this.disabled) {
			return true
		}
		var c = this.preventMark;
		this.preventMark = a === true;
		var b = this.validateValue(this.processValue(this.getRawValue()));
		this.preventMark = c;
		return b
	},
	validate : function() {
		if (this.disabled
				|| this.validateValue(this.processValue(this.getRawValue()))) {
			this.clearInvalid();
			return true
		}
		return false
	},
	processValue : function(a) {
		return a
	},
	validateValue : function(a) {
		return true
	},
	markInvalid : function(c) {
		if (!this.rendered || this.preventMark) {
			return
		}
		c = c || this.invalidText;
		var a = this.getMessageHandler();
		if (a) {
			a.mark(this, c)
		} else {
			if (this.msgTarget) {
				this.el.addClass(this.invalidClass);
				var b = Ext.getDom(this.msgTarget);
				if (b) {
					b.innerHTML = c;
					b.style.display = this.msgDisplay
				}
			}
		}
		this.fireEvent("invalid", this, c)
	},
	clearInvalid : function() {
		if (!this.rendered || this.preventMark) {
			return
		}
		this.el.removeClass(this.invalidClass);
		var a = this.getMessageHandler();
		if (a) {
			a.clear(this)
		} else {
			if (this.msgTarget) {
				this.el.removeClass(this.invalidClass);
				var b = Ext.getDom(this.msgTarget);
				if (b) {
					b.innerHTML = "";
					b.style.display = "none"
				}
			}
		}
		this.fireEvent("valid", this)
	},
	getMessageHandler : function() {
		return Ext.form.MessageTargets[this.msgTarget]
	},
	getErrorCt : function() {
		return this.el.findParent(".x-form-element", 5, true)
				|| this.el.findParent(".x-form-field-wrap", 5, true)
	},
	alignErrorIcon : function() {
		this.errorIcon.alignTo(this.el, "tl-tr", [ 2, 0 ])
	},
	getRawValue : function() {
		var a = this.rendered ? this.el.getValue() : Ext.value(this.value, "");
		if (a === this.emptyText) {
			a = ""
		}
		return a
	},
	getValue : function() {
		if (!this.rendered) {
			return this.value
		}
		var a = this.el.getValue();
		if (a === this.emptyText || a === undefined) {
			a = ""
		}
		return a
	},
	setRawValue : function(a) {
		return (this.el.dom.value = (Ext.isEmpty(a) ? "" : a))
	},
	setValue : function(a) {
		this.value = a;
		if (this.rendered) {
			this.el.dom.value = (Ext.isEmpty(a) ? "" : a);
			this.validate()
		}
		return this
	},
	append : function(a) {
		this.setValue( [ this.getValue(), a ].join(""))
	},
	adjustSize : function(a, d) {
		var c = Ext.form.Field.superclass.adjustSize.call(this, a, d);
		c.width = this.adjustWidth(this.el.dom.tagName, c.width);
		if (this.offsetCt) {
			var b = this.getItemCt();
			c.width -= b.getFrameWidth("lr");
			c.height -= b.getFrameWidth("tb")
		}
		return c
	},
	adjustWidth : function(a, b) {
		if (typeof b == "number" && (Ext.isIE && (Ext.isIE6 || !Ext.isStrict))
				&& /input|textarea/i.test(a) && !this.inEditor) {
			return b - 3
		}
		return b
	}
});
Ext.form.MessageTargets = {
	qtip : {
		mark : function(a, b) {
			a.el.addClass(a.invalidClass);
			a.el.dom.qtip = b;
			a.el.dom.qclass = "x-form-invalid-tip";
			if (Ext.QuickTips) {
				Ext.QuickTips.enable()
			}
		},
		clear : function(a) {
			a.el.removeClass(a.invalidClass);
			a.el.dom.qtip = ""
		}
	},
	title : {
		mark : function(a, b) {
			a.el.addClass(a.invalidClass);
			a.el.dom.title = b
		},
		clear : function(a) {
			a.el.dom.title = ""
		}
	},
	under : {
		mark : function(b, c) {
			b.el.addClass(b.invalidClass);
			if (!b.errorEl) {
				var a = b.getErrorCt();
				if (!a) {
					b.el.dom.title = c;
					return
				}
				b.errorEl = a.createChild( {
					cls : "x-form-invalid-msg"
				});
				b.errorEl.setWidth(a.getWidth(true) - 20)
			}
			b.errorEl.update(c);
			Ext.form.Field.msgFx[b.msgFx].show(b.errorEl, b)
		},
		clear : function(a) {
			a.el.removeClass(a.invalidClass);
			if (a.errorEl) {
				Ext.form.Field.msgFx[a.msgFx].hide(a.errorEl, a)
			} else {
				a.el.dom.title = ""
			}
		}
	},
	side : {
		mark : function(b, c) {
			b.el.addClass(b.invalidClass);
			if (!b.errorIcon) {
				var a = b.getErrorCt();
				if (!a) {
					b.el.dom.title = c;
					return
				}
				b.errorIcon = a.createChild( {
					cls : "x-form-invalid-icon"
				})
			}
			b.alignErrorIcon();
			b.errorIcon.dom.qtip = c;
			b.errorIcon.dom.qclass = "x-form-invalid-tip";
			b.errorIcon.show();
			b.on("resize", b.alignErrorIcon, b)
		},
		clear : function(a) {
			a.el.removeClass(a.invalidClass);
			if (a.errorIcon) {
				a.errorIcon.dom.qtip = "";
				a.errorIcon.hide();
				a.un("resize", a.alignErrorIcon, a)
			} else {
				a.el.dom.title = ""
			}
		}
	}
};
Ext.form.Field.msgFx = {
	normal : {
		show : function(a, b) {
			a.setDisplayed("block")
		},
		hide : function(a, b) {
			a.setDisplayed(false).update("")
		}
	},
	slide : {
		show : function(a, b) {
			a.slideIn("t", {
				stopFx : true
			})
		},
		hide : function(a, b) {
			a.slideOut("t", {
				stopFx : true,
				useDisplay : true
			})
		}
	},
	slideRight : {
		show : function(a, b) {
			a.fixDisplay();
			a.alignTo(b.el, "tl-tr");
			a.slideIn("l", {
				stopFx : true
			})
		},
		hide : function(a, b) {
			a.slideOut("l", {
				stopFx : true,
				useDisplay : true
			})
		}
	}
};
Ext.reg("field", Ext.form.Field);
Ext.form.TextField = Ext
		.extend(
				Ext.form.Field,
				{
					grow : false,
					growMin : 30,
					growMax : 800,
					vtype : null,
					maskRe : null,
					disableKeyFilter : false,
					allowBlank : true,
					minLength : 0,
					maxLength : Number.MAX_VALUE,
					minLengthText : "The minimum length for this field is {0}",
					maxLengthText : "The maximum length for this field is {0}",
					selectOnFocus : false,
					blankText : "This field is required",
					validator : null,
					regex : null,
					regexText : "",
					emptyText : null,
					emptyClass : "x-form-empty-field",
					initComponent : function() {
						Ext.form.TextField.superclass.initComponent.call(this);
						this.addEvents("autosize", "keydown", "keyup",
								"keypress")
					},
					initEvents : function() {
						Ext.form.TextField.superclass.initEvents.call(this);
						if (this.validationEvent == "keyup") {
							this.validationTask = new Ext.util.DelayedTask(
									this.validate, this);
							this.mon(this.el, "keyup", this.filterValidation,
									this)
						} else {
							if (this.validationEvent !== false) {
								this.mon(this.el, this.validationEvent,
										this.validate, this, {
											buffer : this.validationDelay
										})
							}
						}
						if (this.selectOnFocus || this.emptyText) {
							this.on("focus", this.preFocus, this);
							this.mon(this.el, "mousedown", function() {
								if (!this.hasFocus) {
									this.el.on("mouseup", function(a) {
										a.preventDefault()
									}, this, {
										single : true
									})
								}
							}, this);
							if (this.emptyText) {
								this.on("blur", this.postBlur, this);
								this.applyEmptyText()
							}
						}
						if (this.maskRe
								|| (this.vtype
										&& this.disableKeyFilter !== true && (this.maskRe = Ext.form.VTypes[this.vtype
										+ "Mask"]))) {
							this
									.mon(this.el, "keypress", this.filterKeys,
											this)
						}
						if (this.grow) {
							this.mon(this.el, "keyup", this.onKeyUpBuffered,
									this, {
										buffer : 50
									});
							this.mon(this.el, "click", this.autoSize, this)
						}
						if (this.enableKeyEvents) {
							this.mon(this.el, "keyup", this.onKeyUp, this);
							this.mon(this.el, "keydown", this.onKeyDown, this);
							this
									.mon(this.el, "keypress", this.onKeyPress,
											this)
						}
					},
					processValue : function(a) {
						if (this.stripCharsRe) {
							var b = a.replace(this.stripCharsRe, "");
							if (b !== a) {
								this.setRawValue(b);
								return b
							}
						}
						return a
					},
					filterValidation : function(a) {
						if (!a.isNavKeyPress()) {
							this.validationTask.delay(this.validationDelay)
						}
					},
					onDisable : function() {
						Ext.form.TextField.superclass.onDisable.call(this);
						if (Ext.isIE) {
							this.el.dom.unselectable = "on"
						}
					},
					onEnable : function() {
						Ext.form.TextField.superclass.onEnable.call(this);
						if (Ext.isIE) {
							this.el.dom.unselectable = ""
						}
					},
					onKeyUpBuffered : function(a) {
						if (!a.isNavKeyPress()) {
							this.autoSize()
						}
					},
					onKeyUp : function(a) {
						this.fireEvent("keyup", this, a)
					},
					onKeyDown : function(a) {
						this.fireEvent("keydown", this, a)
					},
					onKeyPress : function(a) {
						this.fireEvent("keypress", this, a)
					},
					reset : function() {
						Ext.form.TextField.superclass.reset.call(this);
						this.applyEmptyText()
					},
					applyEmptyText : function() {
						if (this.rendered && this.emptyText
								&& this.getRawValue().length < 1
								&& !this.hasFocus) {
							this.setRawValue(this.emptyText);
							this.el.addClass(this.emptyClass)
						}
					},
					preFocus : function() {
						var a = this.el;
						if (this.emptyText) {
							if (a.dom.value == this.emptyText) {
								this.setRawValue("")
							}
							a.removeClass(this.emptyClass)
						}
						if (this.selectOnFocus) {
							( function() {
								a.dom.select()
							}).defer(this.inEditor && Ext.isIE ? 50 : 0)
						}
					},
					postBlur : function() {
						this.applyEmptyText()
					},
					filterKeys : function(a) {
						if (a.ctrlKey || a.isSpecialKey()) {
							return
						}
						if (!this.maskRe.test(String.fromCharCode(a
								.getCharCode()))) {
							a.stopEvent()
						}
					},
					setValue : function(a) {
						if (this.emptyText && this.el && !Ext.isEmpty(a)) {
							this.el.removeClass(this.emptyClass)
						}
						Ext.form.TextField.superclass.setValue.apply(this,
								arguments);
						this.applyEmptyText();
						this.autoSize();
						return this
					},
					validateValue : function(a) {
						if (Ext.isFunction(this.validator)) {
							var c = this.validator(a);
							if (c !== true) {
								this.markInvalid(c);
								return false
							}
						}
						if (a.length < 1 || a === this.emptyText) {
							if (this.allowBlank) {
								this.clearInvalid();
								return true
							} else {
								this.markInvalid(this.blankText);
								return false
							}
						}
						if (a.length < this.minLength) {
							this.markInvalid(String.format(this.minLengthText,
									this.minLength));
							return false
						}
						if (a.length > this.maxLength) {
							this.markInvalid(String.format(this.maxLengthText,
									this.maxLength));
							return false
						}
						if (this.vtype) {
							var b = Ext.form.VTypes;
							if (!b[this.vtype](a, this)) {
								this.markInvalid(this.vtypeText
										|| b[this.vtype + "Text"]);
								return false
							}
						}
						if (this.regex && !this.regex.test(a)) {
							this.markInvalid(this.regexText);
							return false
						}
						return true
					},
					selectText : function(h, a) {
						var c = this.getRawValue();
						var e = false;
						if (c.length > 0) {
							h = h === undefined ? 0 : h;
							a = a === undefined ? c.length : a;
							var g = this.el.dom;
							if (g.setSelectionRange) {
								g.setSelectionRange(h, a)
							} else {
								if (g.createTextRange) {
									var b = g.createTextRange();
									b.moveStart("character", h);
									b.moveEnd("character", a - c.length);
									b.select()
								}
							}
							e = Ext.isGecko || Ext.isOpera
						} else {
							e = true
						}
						if (e) {
							this.focus()
						}
					},
					autoSize : function() {
						if (!this.grow || !this.rendered) {
							return
						}
						if (!this.metrics) {
							this.metrics = Ext.util.TextMetrics
									.createInstance(this.el)
						}
						var c = this.el;
						var b = c.dom.value;
						var e = document.createElement("div");
						e.appendChild(document.createTextNode(b));
						b = e.innerHTML;
						e = null;
						Ext.removeNode(e);
						b += "&#160;";
						var a = Math.min(this.growMax, Math.max(this.metrics
								.getWidth(b) + 10, this.growMin));
						this.el.setWidth(a);
						this.fireEvent("autosize", this, a)
					},
					onDestroy : function() {
						if (this.validationTask) {
							this.validationTask.cancel();
							this.validationTask = null
						}
						Ext.form.TextField.superclass.onDestroy.call(this)
					}
				});
Ext.reg("textfield", Ext.form.TextField);
Ext.form.TriggerField = Ext.extend(Ext.form.TextField, {
	defaultAutoCreate : {
		tag : "input",
		type : "text",
		size : "16",
		autocomplete : "off"
	},
	hideTrigger : false,
	editable : true,
	wrapFocusClass : "x-trigger-wrap-focus",
	autoSize : Ext.emptyFn,
	monitorTab : true,
	deferHeight : true,
	mimicing : false,
	actionMode : "wrap",
	onResize : function(a, b) {
		Ext.form.TriggerField.superclass.onResize.call(this, a, b);
		if (typeof a == "number") {
			this.el.setWidth(this.adjustWidth("input", a
					- this.trigger.getWidth()))
		}
		this.wrap.setWidth(this.el.getWidth() + this.trigger.getWidth())
	},
	adjustSize : Ext.BoxComponent.prototype.adjustSize,
	getResizeEl : function() {
		return this.wrap
	},
	getPositionEl : function() {
		return this.wrap
	},
	alignErrorIcon : function() {
		if (this.wrap) {
			this.errorIcon.alignTo(this.wrap, "tl-tr", [ 2, 0 ])
		}
	},
	onRender : function(b, a) {
		Ext.form.TriggerField.superclass.onRender.call(this, b, a);
		this.wrap = this.el.wrap( {
			cls : "x-form-field-wrap x-form-field-trigger-wrap"
		});
		this.trigger = this.wrap.createChild(this.triggerConfig || {
			tag : "img",
			src : Ext.BLANK_IMAGE_URL,
			cls : "x-form-trigger " + this.triggerClass
		});
		if (this.hideTrigger) {
			this.trigger.setDisplayed(false)
		}
		this.initTrigger();
		if (!this.width) {
			this.wrap.setWidth(this.el.getWidth() + this.trigger.getWidth())
		}
		if (!this.editable) {
			this.editable = true;
			this.setEditable(false)
		}
	},
	afterRender : function() {
		Ext.form.TriggerField.superclass.afterRender.call(this)
	},
	initTrigger : function() {
		this.mon(this.trigger, "click", this.onTriggerClick, this, {
			preventDefault : true
		});
		this.trigger.addClassOnOver("x-form-trigger-over");
		this.trigger.addClassOnClick("x-form-trigger-click")
	},
	onDestroy : function() {
		Ext.destroy(this.trigger, this.wrap);
		if (this.mimicing) {
			Ext.get(Ext.isIE ? document.body : document).un("mousedown",
					this.mimicBlur, this)
		}
		Ext.form.TriggerField.superclass.onDestroy.call(this)
	},
	onFocus : function() {
		Ext.form.TriggerField.superclass.onFocus.call(this);
		if (!this.mimicing) {
			this.wrap.addClass(this.wrapFocusClass);
			this.mimicing = true;
			Ext.get(Ext.isIE ? document.body : document).on("mousedown",
					this.mimicBlur, this, {
						delay : 10
					});
			if (this.monitorTab) {
				this.el.on("keydown", this.checkTab, this)
			}
		}
	},
	checkTab : function(a) {
		if (a.getKey() == a.TAB) {
			this.triggerBlur()
		}
	},
	onBlur : function() {
	},
	mimicBlur : function(a) {
		if (!this.wrap.contains(a.target) && this.validateBlur(a)) {
			this.triggerBlur()
		}
	},
	triggerBlur : function() {
		this.mimicing = false;
		Ext.get(Ext.isIE ? document.body : document).un("mousedown",
				this.mimicBlur, this);
		if (this.monitorTab && this.el) {
			this.el.un("keydown", this.checkTab, this)
		}
		Ext.form.TriggerField.superclass.onBlur.call(this);
		if (this.wrap) {
			this.wrap.removeClass(this.wrapFocusClass)
		}
	},
	beforeBlur : Ext.emptyFn,
	setEditable : function(a) {
		if (a == this.editable) {
			return
		}
		this.editable = a;
		if (!a) {
			this.el.addClass("x-trigger-noedit").on("click",
					this.onTriggerClick, this).dom.setAttribute("readOnly",
					true)
		} else {
			this.el.removeClass("x-trigger-noedit").un("click",
					this.onTriggerClick, this).dom.removeAttribute("readOnly")
		}
	},
	validateBlur : function(a) {
		return true
	},
	onTriggerClick : Ext.emptyFn
});
Ext.form.TwinTriggerField = Ext.extend(Ext.form.TriggerField, {
	initComponent : function() {
		Ext.form.TwinTriggerField.superclass.initComponent.call(this);
		this.triggerConfig = {
			tag : "span",
			cls : "x-form-twin-triggers",
			cn : [ {
				tag : "img",
				src : Ext.BLANK_IMAGE_URL,
				cls : "x-form-trigger " + this.trigger1Class
			}, {
				tag : "img",
				src : Ext.BLANK_IMAGE_URL,
				cls : "x-form-trigger " + this.trigger2Class
			} ]
		}
	},
	getTrigger : function(a) {
		return this.triggers[a]
	},
	initTrigger : function() {
		var a = this.trigger.select(".x-form-trigger", true);
		this.wrap.setStyle("overflow", "hidden");
		var b = this;
		a.each( function(d, g, c) {
			d.hide = function() {
				var h = b.wrap.getWidth();
				this.dom.style.display = "none";
				b.el.setWidth(h - b.trigger.getWidth())
			};
			d.show = function() {
				var h = b.wrap.getWidth();
				this.dom.style.display = "";
				b.el.setWidth(h - b.trigger.getWidth())
			};
			var e = "Trigger" + (c + 1);
			if (this["hide" + e]) {
				d.dom.style.display = "none"
			}
			this.mon(d, "click", this["on" + e + "Click"], this, {
				preventDefault : true
			});
			d.addClassOnOver("x-form-trigger-over");
			d.addClassOnClick("x-form-trigger-click")
		}, this);
		this.triggers = a.elements
	},
	onTrigger1Click : Ext.emptyFn,
	onTrigger2Click : Ext.emptyFn
});
Ext.reg("trigger", Ext.form.TriggerField);
Ext.form.TextArea = Ext.extend(Ext.form.TextField, {
	growMin : 60,
	growMax : 1000,
	growAppend : "&#160;\n&#160;",
	growPad : Ext.isWebKit ? -6 : 0,
	enterIsSpecial : false,
	preventScrollbars : false,
	onRender : function(b, a) {
		if (!this.el) {
			this.defaultAutoCreate = {
				tag : "textarea",
				style : "width:100px;height:60px;",
				autocomplete : "off"
			}
		}
		Ext.form.TextArea.superclass.onRender.call(this, b, a);
		if (this.grow) {
			this.textSizeEl = Ext.DomHelper.append(document.body, {
				tag : "pre",
				cls : "x-form-grow-sizer"
			});
			if (this.preventScrollbars) {
				this.el.setStyle("overflow", "hidden")
			}
			this.el.setHeight(this.growMin)
		}
	},
	onDestroy : function() {
		Ext.destroy(this.textSizeEl);
		Ext.form.TextArea.superclass.onDestroy.call(this)
	},
	fireKey : function(a) {
		if (a.isSpecialKey()
				&& (this.enterIsSpecial || (a.getKey() != a.ENTER || a
						.hasModifier()))) {
			this.fireEvent("specialkey", this, a)
		}
	},
	onKeyUp : function(a) {
		if (!a.isNavKeyPress() || a.getKey() == a.ENTER) {
			this.autoSize()
		}
		Ext.form.TextArea.superclass.onKeyUp.call(this, a)
	},
	autoSize : function() {
		if (!this.grow || !this.textSizeEl) {
			return
		}
		var c = this.el;
		var a = c.dom.value;
		var d = this.textSizeEl;
		d.innerHTML = "";
		d.appendChild(document.createTextNode(a));
		a = d.innerHTML;
		Ext.fly(d).setWidth(this.el.getWidth());
		if (a.length < 1) {
			a = "&#160;&#160;"
		} else {
			a += this.growAppend;
			if (Ext.isIE) {
				a = a.replace(/\n/g, "<br />")
			}
		}
		d.innerHTML = a;
		var b = Math.min(this.growMax, Math.max(d.offsetHeight, this.growMin)
				+ this.growPad);
		if (b != this.lastHeight) {
			this.lastHeight = b;
			this.el.setHeight(b);
			this.fireEvent("autosize", this, b)
		}
	}
});
Ext.reg("textarea", Ext.form.TextArea);
Ext.form.NumberField = Ext.extend(Ext.form.TextField, {
	fieldClass : "x-form-field x-form-num-field",
	allowDecimals : true,
	decimalSeparator : ".",
	decimalPrecision : 2,
	allowNegative : true,
	minValue : Number.NEGATIVE_INFINITY,
	maxValue : Number.MAX_VALUE,
	minText : "The minimum value for this field is {0}",
	maxText : "The maximum value for this field is {0}",
	nanText : "{0} is not a valid number",
	baseChars : "0123456789",
	initEvents : function() {
		var a = this.baseChars + "";
		if (this.allowDecimals) {
			a += this.decimalSeparator
		}
		if (this.allowNegative) {
			a += "-"
		}
		this.maskRe = new RegExp("[" + Ext.escapeRe(a) + "]");
		Ext.form.NumberField.superclass.initEvents.call(this)
	},
	validateValue : function(b) {
		if (!Ext.form.NumberField.superclass.validateValue.call(this, b)) {
			return false
		}
		if (b.length < 1) {
			return true
		}
		b = String(b).replace(this.decimalSeparator, ".");
		if (isNaN(b)) {
			this.markInvalid(String.format(this.nanText, b));
			return false
		}
		var a = this.parseValue(b);
		if (a < this.minValue) {
			this.markInvalid(String.format(this.minText, this.minValue));
			return false
		}
		if (a > this.maxValue) {
			this.markInvalid(String.format(this.maxText, this.maxValue));
			return false
		}
		return true
	},
	getValue : function() {
		return this
				.fixPrecision(this
						.parseValue(Ext.form.NumberField.superclass.getValue
								.call(this)))
	},
	setValue : function(a) {
		a = typeof a == "number" ? a : parseFloat(String(a).replace(
				this.decimalSeparator, "."));
		a = isNaN(a) ? "" : String(a).replace(".", this.decimalSeparator);
		return Ext.form.NumberField.superclass.setValue.call(this, a)
	},
	parseValue : function(a) {
		a = parseFloat(String(a).replace(this.decimalSeparator, "."));
		return isNaN(a) ? "" : a
	},
	fixPrecision : function(b) {
		var a = isNaN(b);
		if (!this.allowDecimals || this.decimalPrecision == -1 || a || !b) {
			return a ? "" : b
		}
		return parseFloat(parseFloat(b).toFixed(this.decimalPrecision))
	},
	beforeBlur : function() {
		var a = this.parseValue(this.getRawValue());
		if (!Ext.isEmpty(a)) {
			this.setValue(this.fixPrecision(a))
		}
	}
});
Ext.reg("numberfield", Ext.form.NumberField);
Ext.form.DateField = Ext
		.extend(
				Ext.form.TriggerField,
				{
					format : "m/d/Y",
					altFormats : "m/d/Y|n/j/Y|n/j/y|m/j/y|n/d/y|m/j/Y|n/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d",
					disabledDaysText : "Disabled",
					disabledDatesText : "Disabled",
					minText : "The date in this field must be equal to or after {0}",
					maxText : "The date in this field must be equal to or before {0}",
					invalidText : "{0} is not a valid date - it must be in the format {1}",
					triggerClass : "x-form-date-trigger",
					showToday : true,
					defaultAutoCreate : {
						tag : "input",
						type : "text",
						size : "10",
						autocomplete : "off"
					},
					initComponent : function() {
						Ext.form.DateField.superclass.initComponent.call(this);
						this.addEvents("select");
						if (Ext.isString(this.minValue)) {
							this.minValue = this.parseDate(this.minValue)
						}
						if (Ext.isString(this.maxValue)) {
							this.maxValue = this.parseDate(this.maxValue)
						}
						this.disabledDatesRE = null;
						this.initDisabledDays()
					},
					initDisabledDays : function() {
						if (this.disabledDates) {
							var b = this.disabledDates, a = b.length - 1, c = "(?:";
							Ext.each(b, function(g, e) {
								c += Ext.isDate(g) ? "^"
										+ Ext.escapeRe(g
												.dateFormat(this.format)) + "$"
										: b[e];
								if (e != a) {
									c += "|"
								}
							}, this);
							this.disabledDatesRE = new RegExp(c + ")")
						}
					},
					setDisabledDates : function(a) {
						this.disabledDates = a;
						this.initDisabledDays();
						if (this.menu) {
							this.menu.picker
									.setDisabledDates(this.disabledDatesRE)
						}
					},
					setDisabledDays : function(a) {
						this.disabledDays = a;
						if (this.menu) {
							this.menu.picker.setDisabledDays(a)
						}
					},
					setMinValue : function(a) {
						this.minValue = (Ext.isString(a) ? this.parseDate(a)
								: a);
						if (this.menu) {
							this.menu.picker.setMinDate(this.minValue)
						}
					},
					setMaxValue : function(a) {
						this.maxValue = (Ext.isString(a) ? this.parseDate(a)
								: a);
						if (this.menu) {
							this.menu.picker.setMaxDate(this.maxValue)
						}
					},
					validateValue : function(e) {
						e = this.formatDate(e);
						if (!Ext.form.DateField.superclass.validateValue.call(
								this, e)) {
							return false
						}
						if (e.length < 1) {
							return true
						}
						var c = e;
						e = this.parseDate(e);
						if (!e) {
							this.markInvalid(String.format(this.invalidText, c,
									this.format));
							return false
						}
						var g = e.getTime();
						if (this.minValue && g < this.minValue.getTime()) {
							this.markInvalid(String.format(this.minText, this
									.formatDate(this.minValue)));
							return false
						}
						if (this.maxValue && g > this.maxValue.getTime()) {
							this.markInvalid(String.format(this.maxText, this
									.formatDate(this.maxValue)));
							return false
						}
						if (this.disabledDays) {
							var a = e.getDay();
							for ( var b = 0; b < this.disabledDays.length; b++) {
								if (a === this.disabledDays[b]) {
									this.markInvalid(this.disabledDaysText);
									return false
								}
							}
						}
						var d = this.formatDate(e);
						if (this.disabledDatesRE
								&& this.disabledDatesRE.test(d)) {
							this.markInvalid(String.format(
									this.disabledDatesText, d));
							return false
						}
						return true
					},
					validateBlur : function() {
						return !this.menu || !this.menu.isVisible()
					},
					getValue : function() {
						return this
								.parseDate(Ext.form.DateField.superclass.getValue
										.call(this))
								|| ""
					},
					setValue : function(a) {
						return Ext.form.DateField.superclass.setValue.call(
								this, this.formatDate(this.parseDate(a)))
					},
					parseDate : function(d) {
						if (!d || Ext.isDate(d)) {
							return d
						}
						var b = Date.parseDate(d, this.format);
						if (!b && this.altFormats) {
							if (!this.altFormatsArray) {
								this.altFormatsArray = this.altFormats
										.split("|")
							}
							for ( var c = 0, a = this.altFormatsArray.length; c < a
									&& !b; c++) {
								b = Date.parseDate(d, this.altFormatsArray[c])
							}
						}
						return b
					},
					onDestroy : function() {
						Ext.destroy(this.menu);
						Ext.form.DateField.superclass.onDestroy.call(this)
					},
					formatDate : function(a) {
						return Ext.isDate(a) ? a.dateFormat(this.format) : a
					},
					onTriggerClick : function() {
						if (this.disabled) {
							return
						}
						if (this.menu == null) {
							this.menu = new Ext.menu.DateMenu( {
								hideOnClick : false
							})
						}
						this.onFocus();
						Ext.apply(this.menu.picker, {
							minDate : this.minValue,
							maxDate : this.maxValue,
							disabledDatesRE : this.disabledDatesRE,
							disabledDatesText : this.disabledDatesText,
							disabledDays : this.disabledDays,
							disabledDaysText : this.disabledDaysText,
							format : this.format,
							showToday : this.showToday,
							minText : String.format(this.minText, this
									.formatDate(this.minValue)),
							maxText : String.format(this.maxText, this
									.formatDate(this.maxValue))
						});
						this.menu.picker
								.setValue(this.getValue() || new Date());
						this.menu.show(this.el, "tl-bl?");
						this.menuEvents("on")
					},
					menuEvents : function(a) {
						this.menu[a]("select", this.onSelect, this);
						this.menu[a]("hide", this.onMenuHide, this);
						this.menu[a]("show", this.onFocus, this)
					},
					onSelect : function(a, b) {
						this.setValue(b);
						this.fireEvent("select", this, b);
						this.menu.hide()
					},
					onMenuHide : function() {
						this.focus(false, 60);
						this.menuEvents("un")
					},
					beforeBlur : function() {
						var a = this.parseDate(this.getRawValue());
						if (a) {
							this.setValue(a)
						}
					}
				});
Ext.reg("datefield", Ext.form.DateField);
Ext.form.DisplayField = Ext.extend(Ext.form.Field, {
	validationEvent : false,
	validateOnBlur : false,
	defaultAutoCreate : {
		tag : "div"
	},
	fieldClass : "x-form-display-field",
	htmlEncode : false,
	initEvents : Ext.emptyFn,
	isValid : function() {
		return true
	},
	validate : function() {
		return true
	},
	getRawValue : function() {
		var a = this.rendered ? this.el.dom.innerHTML : Ext.value(this.value,
				"");
		if (a === this.emptyText) {
			a = ""
		}
		if (this.htmlEncode) {
			a = Ext.util.Format.htmlDecode(a)
		}
		return a
	},
	getValue : function() {
		return this.getRawValue()
	},
	getName : function() {
		return this.name
	},
	setRawValue : function(a) {
		if (this.htmlEncode) {
			a = Ext.util.Format.htmlEncode(a)
		}
		return this.rendered ? (this.el.dom.innerHTML = (Ext.isEmpty(a) ? ""
				: a)) : (this.value = a)
	},
	setValue : function(a) {
		this.setRawValue(a);
		return this
	}
});
Ext.reg("displayfield", Ext.form.DisplayField);
Ext.form.ComboBox = Ext
		.extend(
				Ext.form.TriggerField,
				{
					defaultAutoCreate : {
						tag : "input",
						type : "text",
						size : "24",
						autocomplete : "off"
					},
					listClass : "",
					selectedClass : "x-combo-selected",
					listEmptyText : "",
					triggerClass : "x-form-arrow-trigger",
					shadow : "sides",
					listAlign : "tl-bl?",
					maxHeight : 300,
					minHeight : 90,
					triggerAction : "query",
					minChars : 4,
					typeAhead : false,
					queryDelay : 500,
					pageSize : 0,
					selectOnFocus : false,
					queryParam : "query",
					loadingText : "Loading...",
					resizable : false,
					handleHeight : 8,
					allQuery : "",
					mode : "remote",
					minListWidth : 70,
					forceSelection : false,
					typeAheadDelay : 250,
					lazyInit : true,
					initComponent : function() {
						Ext.form.ComboBox.superclass.initComponent.call(this);
						this.addEvents("expand", "collapse", "beforeselect",
								"select", "beforequery");
						if (this.transform) {
							var c = Ext.getDom(this.transform);
							if (!this.hiddenName) {
								this.hiddenName = c.name
							}
							if (!this.store) {
								this.mode = "local";
								var j = [], e = c.options;
								for ( var b = 0, a = e.length; b < a; b++) {
									var h = e[b], g = (h.hasAttribute ? h
											.hasAttribute("value")
											: h.getAttributeNode("value").specified) ? h.value
											: h.text;
									if (h.selected
											&& Ext.isEmpty(this.value, true)) {
										this.value = g
									}
									j.push( [ g, h.text ])
								}
								this.store = new Ext.data.ArrayStore( {
									id : 0,
									fields : [ "value", "text" ],
									data : j,
									autoDestroy : true
								});
								this.valueField = "value";
								this.displayField = "text"
							}
							c.name = Ext.id();
							if (!this.lazyRender) {
								this.target = true;
								this.el = Ext.DomHelper.insertBefore(c,
										this.autoCreate
												|| this.defaultAutoCreate);
								this.render(this.el.parentNode, c);
								Ext.removeNode(c)
							} else {
								Ext.removeNode(c)
							}
						} else {
							if (this.store) {
								this.store = Ext.StoreMgr.lookup(this.store);
								if (this.store.autoCreated) {
									this.displayField = this.valueField = "field1";
									if (!this.store.expandData) {
										this.displayField = "field2"
									}
									this.mode = "local"
								}
							}
						}
						this.selectedIndex = -1;
						if (this.mode == "local") {
							if (!Ext.isDefined(this.initialConfig.queryDelay)) {
								this.queryDelay = 10
							}
							if (!Ext.isDefined(this.initialConfig.minChars)) {
								this.minChars = 0
							}
						}
					},
					onRender : function(b, a) {
						Ext.form.ComboBox.superclass.onRender.call(this, b, a);
						if (this.hiddenName) {
							this.hiddenField = this.el.insertSibling( {
								tag : "input",
								type : "hidden",
								name : this.hiddenName,
								id : (this.hiddenId || this.hiddenName)
							}, "before", true);
							this.el.dom.removeAttribute("name")
						}
						if (Ext.isGecko) {
							this.el.dom.setAttribute("autocomplete", "off")
						}
						if (!this.lazyInit) {
							this.initList()
						} else {
							this.on("focus", this.initList, this, {
								single : true
							})
						}
					},
					initValue : function() {
						Ext.form.ComboBox.superclass.initValue.call(this);
						if (this.hiddenField) {
							this.hiddenField.value = Ext
									.isDefined(this.hiddenValue) ? this.hiddenValue
									: Ext.isDefined(this.value) ? this.value
											: ""
						}
					},
					initList : function() {
						if (!this.list) {
							var a = "x-combo-list";
							this.list = new Ext.Layer( {
								parentEl : this.getListParent(),
								shadow : this.shadow,
								cls : [ a, this.listClass ].join(" "),
								constrain : false
							});
							var b = this.listWidth
									|| Math.max(this.wrap.getWidth(),
											this.minListWidth);
							this.list.setSize(b, 0);
							this.list.swallowEvent("mousewheel");
							this.assetHeight = 0;
							if (this.syncFont !== false) {
								this.list.setStyle("font-size", this.el
										.getStyle("font-size"))
							}
							if (this.title) {
								this.header = this.list.createChild( {
									cls : a + "-hd",
									html : this.title
								});
								this.assetHeight += this.header.getHeight()
							}
							this.innerList = this.list.createChild( {
								cls : a + "-inner"
							});
							this.mon(this.innerList, "mouseover",
									this.onViewOver, this);
							this.mon(this.innerList, "mousemove",
									this.onViewMove, this);
							this.innerList.setWidth(b
									- this.list.getFrameWidth("lr"));
							if (this.pageSize) {
								this.footer = this.list.createChild( {
									cls : a + "-ft"
								});
								this.pageTb = new Ext.PagingToolbar( {
									store : this.store,
									pageSize : this.pageSize,
									renderTo : this.footer
								});
								this.assetHeight += this.footer.getHeight()
							}
							if (!this.tpl) {
								this.tpl = '<tpl for="."><div class="' + a
										+ '-item">{' + this.displayField
										+ "}</div></tpl>"
							}
							this.view = new Ext.DataView( {
								applyTo : this.innerList,
								tpl : this.tpl,
								singleSelect : true,
								selectedClass : this.selectedClass,
								itemSelector : this.itemSelector || "." + a
										+ "-item",
								emptyText : this.listEmptyText
							});
							this
									.mon(this.view, "click", this.onViewClick,
											this);
							this.bindStore(this.store, true);
							if (this.resizable) {
								this.resizer = new Ext.Resizable(this.list, {
									pinned : true,
									handles : "se"
								});
								this.mon(this.resizer, "resize", function(e, c,
										d) {
									this.maxHeight = d - this.handleHeight
											- this.list.getFrameWidth("tb")
											- this.assetHeight;
									this.listWidth = c;
									this.innerList.setWidth(c
											- this.list.getFrameWidth("lr"));
									this.restrictHeight()
								}, this);
								this[this.pageSize ? "footer" : "innerList"]
										.setStyle("margin-bottom",
												this.handleHeight + "px")
							}
						}
					},
					getListParent : function() {
						return document.body
					},
					getStore : function() {
						return this.store
					},
					bindStore : function(a, b) {
						if (this.store && !b) {
							this.store
									.un("beforeload", this.onBeforeLoad, this);
							this.store.un("load", this.onLoad, this);
							this.store.un("exception", this.collapse, this);
							if (this.store !== a && this.store.autoDestroy) {
								this.store.destroy()
							}
							if (!a) {
								this.store = null;
								if (this.view) {
									this.view.bindStore(null)
								}
							}
						}
						if (a) {
							if (!b) {
								this.lastQuery = null;
								if (this.pageTb) {
									this.pageTb.bindStore(a)
								}
							}
							this.store = Ext.StoreMgr.lookup(a);
							this.store.on( {
								scope : this,
								beforeload : this.onBeforeLoad,
								load : this.onLoad,
								exception : this.collapse
							});
							if (this.view) {
								this.view.bindStore(a)
							}
						}
					},
					initEvents : function() {
						Ext.form.ComboBox.superclass.initEvents.call(this);
						this.keyNav = new Ext.KeyNav(this.el, {
							up : function(a) {
								this.inKeyMode = true;
								this.selectPrev()
							},
							down : function(a) {
								if (!this.isExpanded()) {
									this.onTriggerClick()
								} else {
									this.inKeyMode = true;
									this.selectNext()
								}
							},
							enter : function(a) {
								this.onViewClick();
								this.delayedCheck = true;
								this.unsetDelayCheck.defer(10, this)
							},
							esc : function(a) {
								this.collapse()
							},
							tab : function(a) {
								this.onViewClick(false);
								return true
							},
							scope : this,
							doRelay : function(c, b, a) {
								if (a == "down" || this.scope.isExpanded()) {
									return Ext.KeyNav.prototype.doRelay.apply(
											this, arguments)
								}
								return true
							},
							forceKeyDown : true
						});
						this.queryDelay = Math.max(this.queryDelay || 10,
								this.mode == "local" ? 10 : 250);
						this.dqTask = new Ext.util.DelayedTask(this.initQuery,
								this);
						if (this.typeAhead) {
							this.taTask = new Ext.util.DelayedTask(
									this.onTypeAhead, this)
						}
						if (this.editable !== false && !this.enableKeyEvents) {
							this.mon(this.el, "keyup", this.onKeyUp, this)
						}
					},
					onDestroy : function() {
						if (this.dqTask) {
							this.dqTask.cancel();
							this.dqTask = null
						}
						this.bindStore(null);
						Ext.destroy(this.resizer, this.view, this.pageTb,
								this.list);
						Ext.form.ComboBox.superclass.onDestroy.call(this)
					},
					unsetDelayCheck : function() {
						delete this.delayedCheck
					},
					fireKey : function(b) {
						var a = function(c) {
							if (c.isNavKeyPress() && !this.isExpanded()
									&& !this.delayedCheck) {
								this.fireEvent("specialkey", this, c)
							}
						};
						if (this.inEditor && Ext.isWebKit
								&& b.getKey() == b.TAB) {
							a.defer(10, this, [ new Ext.EventObjectImpl(b) ])
						} else {
							a.call(this, b)
						}
					},
					onResize : function(a, b) {
						Ext.form.ComboBox.superclass.onResize.apply(this,
								arguments);
						if (this.list && !Ext.isDefined(this.listWidth)) {
							var c = Math.max(a, this.minListWidth);
							this.list.setWidth(c);
							this.innerList.setWidth(c
									- this.list.getFrameWidth("lr"))
						}
					},
					onEnable : function() {
						Ext.form.ComboBox.superclass.onEnable.apply(this,
								arguments);
						if (this.hiddenField) {
							this.hiddenField.disabled = false
						}
					},
					onDisable : function() {
						Ext.form.ComboBox.superclass.onDisable.apply(this,
								arguments);
						if (this.hiddenField) {
							this.hiddenField.disabled = true
						}
					},
					onBeforeLoad : function() {
						if (!this.hasFocus) {
							return
						}
						this.innerList
								.update(this.loadingText ? '<div class="loading-indicator">'
										+ this.loadingText + "</div>"
										: "");
						this.restrictHeight();
						this.selectedIndex = -1
					},
					onLoad : function() {
						if (!this.hasFocus) {
							return
						}
						if (this.store.getCount() > 0) {
							this.expand();
							this.restrictHeight();
							if (this.lastQuery == this.allQuery) {
								if (this.editable) {
									this.el.dom.select()
								}
								if (!this.selectByValue(this.value, true)) {
									this.select(0, true)
								}
							} else {
								this.selectNext();
								if (this.typeAhead
										&& this.lastKey != Ext.EventObject.BACKSPACE
										&& this.lastKey != Ext.EventObject.DELETE) {
									this.taTask.delay(this.typeAheadDelay)
								}
							}
						} else {
							this.onEmptyResults()
						}
					},
					onTypeAhead : function() {
						if (this.store.getCount() > 0) {
							var b = this.store.getAt(0);
							var c = b.data[this.displayField];
							var a = c.length;
							var d = this.getRawValue().length;
							if (d != a) {
								this.setRawValue(c);
								this.selectText(d, c.length)
							}
						}
					},
					onSelect : function(a, b) {
						if (this.fireEvent("beforeselect", this, a, b) !== false) {
							this.setValue(a.data[this.valueField
									|| this.displayField]);
							this.collapse();
							this.fireEvent("select", this, a, b)
						}
					},
					getName : function() {
						var a = this.hiddenField;
						return a && a.name ? a.name : this.hiddenName
								|| Ext.form.ComboBox.superclass.getName
										.call(this)
					},
					getValue : function() {
						if (this.valueField) {
							return Ext.isDefined(this.value) ? this.value : ""
						} else {
							return Ext.form.ComboBox.superclass.getValue
									.call(this)
						}
					},
					clearValue : function() {
						if (this.hiddenField) {
							this.hiddenField.value = ""
						}
						this.setRawValue("");
						this.lastSelectionText = "";
						this.applyEmptyText();
						this.value = ""
					},
					setValue : function(a) {
						var c = a;
						if (this.valueField) {
							var b = this.findRecord(this.valueField, a);
							if (b) {
								c = b.data[this.displayField]
							} else {
								if (Ext.isDefined(this.valueNotFoundText)) {
									c = this.valueNotFoundText
								}
							}
						}
						this.lastSelectionText = c;
						if (this.hiddenField) {
							this.hiddenField.value = a
						}
						Ext.form.ComboBox.superclass.setValue.call(this, c);
						this.value = a;
						return this
					},
					findRecord : function(c, b) {
						var a;
						if (this.store.getCount() > 0) {
							this.store.each( function(d) {
								if (d.data[c] == b) {
									a = d;
									return false
								}
							})
						}
						return a
					},
					onViewMove : function(b, a) {
						this.inKeyMode = false
					},
					onViewOver : function(d, b) {
						if (this.inKeyMode) {
							return
						}
						var c = this.view.findItemFromChild(b);
						if (c) {
							var a = this.view.indexOf(c);
							this.select(a, false)
						}
					},
					onViewClick : function(b) {
						var a = this.view.getSelectedIndexes()[0];
						var c = this.store.getAt(a);
						if (c) {
							this.onSelect(c, a)
						}
						if (b !== false) {
							this.el.focus()
						}
					},
					restrictHeight : function() {
						this.innerList.dom.style.height = "";
						var b = this.innerList.dom;
						var e = this.list.getFrameWidth("tb")
								+ (this.resizable ? this.handleHeight : 0)
								+ this.assetHeight;
						var c = Math.max(b.clientHeight, b.offsetHeight,
								b.scrollHeight);
						var a = this.getPosition()[1]
								- Ext.getBody().getScroll().top;
						var g = Ext.lib.Dom.getViewHeight() - a
								- this.getSize().height;
						var d = Math.max(a, g, this.minHeight || 0)
								- this.list.shadowOffset - e - 5;
						c = Math.min(c, d, this.maxHeight);
						this.innerList.setHeight(c);
						this.list.beginUpdate();
						this.list.setHeight(c + e);
						this.list.alignTo(this.wrap, this.listAlign);
						this.list.endUpdate()
					},
					onEmptyResults : function() {
						this.collapse()
					},
					isExpanded : function() {
						return this.list && this.list.isVisible()
					},
					selectByValue : function(a, c) {
						if (!Ext.isEmpty(a, true)) {
							var b = this.findRecord(this.valueField
									|| this.displayField, a);
							if (b) {
								this.select(this.store.indexOf(b), c);
								return true
							}
						}
						return false
					},
					select : function(a, c) {
						this.selectedIndex = a;
						this.view.select(a);
						if (c !== false) {
							var b = this.view.getNode(a);
							if (b) {
								this.innerList.scrollChildIntoView(b, false)
							}
						}
					},
					selectNext : function() {
						var a = this.store.getCount();
						if (a > 0) {
							if (this.selectedIndex == -1) {
								this.select(0)
							} else {
								if (this.selectedIndex < a - 1) {
									this.select(this.selectedIndex + 1)
								}
							}
						}
					},
					selectPrev : function() {
						var a = this.store.getCount();
						if (a > 0) {
							if (this.selectedIndex == -1) {
								this.select(0)
							} else {
								if (this.selectedIndex !== 0) {
									this.select(this.selectedIndex - 1)
								}
							}
						}
					},
					onKeyUp : function(b) {
						var a = b.getKey();
						if (this.editable !== false
								&& (a == b.BACKSPACE || !b.isSpecialKey())) {
							this.lastKey = a;
							this.dqTask.delay(this.queryDelay)
						}
						Ext.form.ComboBox.superclass.onKeyUp.call(this, b)
					},
					validateBlur : function() {
						return !this.list || !this.list.isVisible()
					},
					initQuery : function() {
						this.doQuery(this.getRawValue())
					},
					beforeBlur : function() {
						var b = this.getRawValue();
						if (this.forceSelection) {
							if (b.length > 0 && b != this.emptyText) {
								this.el.dom.value = Ext
										.isDefined(this.lastSelectionText) ? this.lastSelectionText
										: "";
								this.applyEmptyText()
							} else {
								this.clearValue()
							}
						} else {
							var a = this.findRecord(this.displayField, b);
							if (a) {
								b = a.get(this.valueField || this.displayField)
							}
							this.setValue(b)
						}
					},
					doQuery : function(c, b) {
						c = Ext.isEmpty(c) ? "" : c;
						var a = {
							query : c,
							forceAll : b,
							combo : this,
							cancel : false
						};
						if (this.fireEvent("beforequery", a) === false
								|| a.cancel) {
							return false
						}
						c = a.query;
						b = a.forceAll;
						if (b === true || (c.length >= this.minChars)) {
							if (this.lastQuery !== c) {
								this.lastQuery = c;
								if (this.mode == "local") {
									this.selectedIndex = -1;
									if (b) {
										this.store.clearFilter()
									} else {
										this.store.filter(this.displayField, c)
									}
									this.onLoad()
								} else {
									this.store.baseParams[this.queryParam] = c;
									this.store.load( {
										params : this.getParams(c)
									});
									this.expand()
								}
							} else {
								this.selectedIndex = -1;
								this.onLoad()
							}
						}
					},
					getParams : function(a) {
						var b = {};
						if (this.pageSize) {
							b.start = 0;
							b.limit = this.pageSize
						}
						return b
					},
					collapse : function() {
						if (!this.isExpanded()) {
							return
						}
						this.list.hide();
						Ext.getDoc().un("mousewheel", this.collapseIf, this);
						Ext.getDoc().un("mousedown", this.collapseIf, this);
						this.fireEvent("collapse", this)
					},
					collapseIf : function(a) {
						if (!a.within(this.wrap) && !a.within(this.list)) {
							this.collapse()
						}
					},
					expand : function() {
						if (this.isExpanded() || !this.hasFocus) {
							return
						}
						this.list.alignTo(this.wrap, this.listAlign);
						this.list.show();
						if (Ext.isGecko2) {
							this.innerList.setOverflow("auto")
						}
						Ext.getDoc().on( {
							scope : this,
							mousewheel : this.collapseIf,
							mousedown : this.collapseIf
						});
						this.fireEvent("expand", this)
					},
					onTriggerClick : function() {
						if (this.disabled) {
							return
						}
						if (this.isExpanded()) {
							this.collapse();
							this.el.focus()
						} else {
							this.onFocus( {});
							if (this.triggerAction == "all") {
								this.doQuery(this.allQuery, true)
							} else {
								this.doQuery(this.getRawValue())
							}
							this.el.focus()
						}
					}
				});
Ext.reg("combo", Ext.form.ComboBox);
Ext.form.Checkbox = Ext.extend(Ext.form.Field, {
	focusClass : undefined,
	fieldClass : "x-form-field",
	checked : false,
	defaultAutoCreate : {
		tag : "input",
		type : "checkbox",
		autocomplete : "off"
	},
	actionMode : "wrap",
	initComponent : function() {
		Ext.form.Checkbox.superclass.initComponent.call(this);
		this.addEvents("check")
	},
	onResize : function() {
		Ext.form.Checkbox.superclass.onResize.apply(this, arguments);
		if (!this.boxLabel && !this.fieldLabel) {
			this.el.alignTo(this.wrap, "c-c")
		}
	},
	initEvents : function() {
		Ext.form.Checkbox.superclass.initEvents.call(this);
		this.mon(this.el, "click", this.onClick, this);
		this.mon(this.el, "change", this.onClick, this)
	},
	getResizeEl : function() {
		return this.wrap
	},
	getPositionEl : function() {
		return this.wrap
	},
	markInvalid : Ext.emptyFn,
	clearInvalid : Ext.emptyFn,
	onRender : function(b, a) {
		Ext.form.Checkbox.superclass.onRender.call(this, b, a);
		if (this.inputValue !== undefined) {
			this.el.dom.value = this.inputValue
		}
		this.wrap = this.el.wrap( {
			cls : "x-form-check-wrap"
		});
		if (this.boxLabel) {
			this.wrap.createChild( {
				tag : "label",
				htmlFor : this.el.id,
				cls : "x-form-cb-label",
				html : this.boxLabel
			})
		}
		if (this.checked) {
			this.setValue(true)
		} else {
			this.checked = this.el.dom.checked
		}
	},
	onDestroy : function() {
		Ext.destroy(this.wrap);
		Ext.form.Checkbox.superclass.onDestroy.call(this)
	},
	initValue : function() {
		this.originalValue = this.getValue()
	},
	getValue : function() {
		if (this.rendered) {
			return this.el.dom.checked
		}
		return false
	},
	onClick : function() {
		if (this.el.dom.checked != this.checked) {
			this.setValue(this.el.dom.checked)
		}
	},
	setValue : function(a) {
		var b = this.checked;
		this.checked = (a === true || a === "true" || a == "1" || String(a)
				.toLowerCase() == "on");
		if (this.rendered) {
			this.el.dom.checked = this.checked;
			this.el.dom.defaultChecked = this.checked
		}
		if (b != this.checked) {
			this.fireEvent("check", this, this.checked);
			if (this.handler) {
				this.handler.call(this.scope || this, this, this.checked)
			}
		}
		return this
	}
});
Ext.reg("checkbox", Ext.form.Checkbox);
Ext.form.CheckboxGroup = Ext
		.extend(
				Ext.form.Field,
				{
					columns : "auto",
					vertical : false,
					allowBlank : true,
					blankText : "You must select at least one item in this group",
					defaultType : "checkbox",
					groupCls : "x-form-check-group",
					initComponent : function() {
						this.addEvents("change");
						Ext.form.CheckboxGroup.superclass.initComponent
								.call(this)
					},
					onRender : function(j, g) {
						if (!this.el) {
							var p = {
								cls : this.groupCls,
								layout : "column",
								border : false,
								renderTo : j
							};
							var a = {
								defaultType : this.defaultType,
								layout : "form",
								border : false,
								defaults : {
									hideLabel : true,
									anchor : "100%"
								}
							};
							if (this.items[0].items) {
								Ext.apply(p, {
									layoutConfig : {
										columns : this.items.length
									},
									defaults : this.defaults,
									items : this.items
								});
								for ( var e = 0, m = this.items.length; e < m; e++) {
									Ext.applyIf(this.items[e], a)
								}
							} else {
								var d, n = [];
								if (typeof this.columns == "string") {
									this.columns = this.items.length
								}
								if (!Ext.isArray(this.columns)) {
									var k = [];
									for ( var e = 0; e < this.columns; e++) {
										k.push((100 / this.columns) * 0.01)
									}
									this.columns = k
								}
								d = this.columns.length;
								for ( var e = 0; e < d; e++) {
									var b = Ext.apply( {
										items : []
									}, a);
									b[this.columns[e] <= 1 ? "columnWidth"
											: "width"] = this.columns[e];
									if (this.defaults) {
										b.defaults = Ext
												.apply(b.defaults || {},
														this.defaults)
									}
									n.push(b)
								}
								if (this.vertical) {
									var r = Math.ceil(this.items.length / d), o = 0;
									for ( var e = 0, m = this.items.length; e < m; e++) {
										if (e > 0 && e % r == 0) {
											o++
										}
										if (this.items[e].fieldLabel) {
											this.items[e].hideLabel = false
										}
										n[o].items.push(this.items[e])
									}
								} else {
									for ( var e = 0, m = this.items.length; e < m; e++) {
										var q = e % d;
										if (this.items[e].fieldLabel) {
											this.items[e].hideLabel = false
										}
										n[q].items.push(this.items[e])
									}
								}
								Ext.apply(p, {
									layoutConfig : {
										columns : d
									},
									items : n
								})
							}
							this.panel = new Ext.Panel(p);
							this.panel.ownerCt = this;
							this.el = this.panel.getEl();
							if (this.forId && this.itemCls) {
								var c = this.el.up(this.itemCls).child("label",
										true);
								if (c) {
									c.setAttribute("htmlFor", this.forId)
								}
							}
							var h = this.panel.findBy( function(i) {
								return i.isFormField
							}, this);
							this.items = new Ext.util.MixedCollection();
							this.items.addAll(h)
						}
						Ext.form.CheckboxGroup.superclass.onRender.call(this,
								j, g)
					},
					afterRender : function() {
						Ext.form.CheckboxGroup.superclass.afterRender
								.call(this);
						if (this.values) {
							this.setValue.apply(this, this.values);
							delete this.values
						}
						this.eachItem( function(a) {
							a.on("check", this.fireChecked, this);
							a.inGroup = true
						})
					},
					doLayout : function() {
						if (this.rendered) {
							this.panel.forceLayout = this.ownerCt.forceLayout;
							this.panel.doLayout()
						}
					},
					fireChecked : function() {
						var a = [];
						this.eachItem( function(b) {
							if (b.checked) {
								a.push(b)
							}
						});
						this.fireEvent("change", this, a)
					},
					validateValue : function(a) {
						if (!this.allowBlank) {
							var b = true;
							this.eachItem( function(c) {
								if (c.checked) {
									return (b = false)
								}
							});
							if (b) {
								this.markInvalid(this.blankText);
								return false
							}
						}
						return true
					},
					onDisable : function() {
						this.eachItem( function(a) {
							a.disable()
						})
					},
					onEnable : function() {
						this.eachItem( function(a) {
							a.enable()
						})
					},
					doLayout : function() {
						if (this.rendered) {
							this.panel.forceLayout = this.ownerCt.forceLayout;
							this.panel.doLayout()
						}
					},
					onResize : function(a, b) {
						this.panel.setSize(a, b);
						this.panel.doLayout()
					},
					reset : function() {
						Ext.form.CheckboxGroup.superclass.reset.call(this);
						this.eachItem( function(a) {
							if (a.reset) {
								a.reset()
							}
						})
					},
					setValue : function(d, c) {
						if (this.rendered) {
							if (arguments.length == 1) {
								if (Ext.isArray(d)) {
									Ext.each(d, function(h, e) {
										var g = this.items.itemAt(e);
										if (g) {
											g.setValue(h)
										}
									}, this)
								} else {
									if (Ext.isObject(d)) {
										for ( var a in d) {
											var b = this.getBox(a);
											if (b) {
												b.setValue(d[a])
											}
										}
									} else {
										this.setValueForItem(d)
									}
								}
							} else {
								var b = this.getBox(d);
								if (b) {
									b.setValue(c)
								}
							}
						} else {
							this.values = arguments
						}
						return this
					},
					onDestroy : function() {
						Ext.destroy(this.panel);
						Ext.form.CheckboxGroup.superclass.onDestroy.call(this)
					},
					setValueForItem : function(a) {
						a = String(a).split(",");
						this.eachItem( function(b) {
							if (a.indexOf(b.inputValue) > -1) {
								b.setValue(true)
							}
						})
					},
					getBox : function(b) {
						var a = null;
						this.eachItem( function(c) {
							if (b == c || c.dataIndex == b || c.id == b
									|| c.getName() == b) {
								a = c;
								return false
							}
						});
						return a
					},
					getValue : function() {
						var a = [];
						this.eachItem( function(b) {
							if (b.checked) {
								a.push(b)
							}
						});
						return a
					},
					eachItem : function(a) {
						if (this.items && this.items.each) {
							this.items.each(a, this)
						}
					},
					initValue : Ext.emptyFn,
					getValue : Ext.emptyFn,
					getRawValue : Ext.emptyFn,
					setRawValue : Ext.emptyFn
				});
Ext.reg("checkboxgroup", Ext.form.CheckboxGroup);
Ext.form.Radio = Ext.extend(Ext.form.Checkbox, {
	inputType : "radio",
	markInvalid : Ext.emptyFn,
	clearInvalid : Ext.emptyFn,
	getGroupValue : function() {
		var a = this.el.up("form") || Ext.getBody();
		var b = a.child("input[name=" + this.el.dom.name + "]:checked", true);
		return b ? b.value : null
	},
	onClick : function() {
		if (this.el.dom.checked != this.checked) {
			var a = this.getCheckEl().select(
					"input[name=" + this.el.dom.name + "]");
			a.each( function(b) {
				if (b.dom.id == this.id) {
					this.setValue(true)
				} else {
					Ext.getCmp(b.dom.id).setValue(false)
				}
			}, this)
		}
	},
	setValue : function(a) {
		if (typeof a == "boolean") {
			Ext.form.Radio.superclass.setValue.call(this, a)
		} else {
			var b = this.getCheckEl().child(
					"input[name=" + this.el.dom.name + "][value=" + a + "]",
					true);
			if (b) {
				Ext.getCmp(b.id).setValue(true)
			}
		}
		return this
	},
	getCheckEl : function() {
		if (this.inGroup) {
			return this.el.up(".x-form-radio-group")
		}
		return this.el.up("form") || Ext.getBody()
	}
});
Ext.reg("radio", Ext.form.Radio);
Ext.form.RadioGroup = Ext.extend(Ext.form.CheckboxGroup, {
	allowBlank : true,
	blankText : "You must select one item in this group",
	defaultType : "radio",
	groupCls : "x-form-radio-group",
	getValue : function() {
		var a = null;
		this.eachItem( function(b) {
			if (b.checked) {
				a = b;
				return false
			}
		});
		return a
	},
	setValue : function(c, b) {
		if (this.rendered) {
			if (arguments.length > 1) {
				var a = this.getBox(c);
				if (a) {
					a.setValue(b);
					if (a.checked) {
						this.eachItem( function(d) {
							if (d !== a) {
								d.setValue(false)
							}
						})
					}
				}
			} else {
				this.setValueForItem(c)
			}
		} else {
			this.values = arguments
		}
		return this
	},
	fireChecked : function() {
		if (!this.checkTask) {
			this.checkTask = new Ext.util.DelayedTask(this.bufferChecked, this)
		}
		this.checkTask.delay(10)
	},
	bufferChecked : function() {
		var a = null;
		this.eachItem( function(b) {
			if (b.checked) {
				a = b;
				return false
			}
		});
		this.fireEvent("change", this, a)
	},
	onDestroy : function() {
		if (this.checkTask) {
			this.checkTask.cancel();
			this.checkTask = null
		}
		Ext.form.RadioGroup.superclass.onDestroy.call(this)
	}
});
Ext.reg("radiogroup", Ext.form.RadioGroup);
Ext.form.Hidden = Ext.extend(Ext.form.Field, {
	inputType : "hidden",
	onRender : function() {
		Ext.form.Hidden.superclass.onRender.apply(this, arguments)
	},
	initEvents : function() {
		this.originalValue = this.getValue()
	},
	setSize : Ext.emptyFn,
	setWidth : Ext.emptyFn,
	setHeight : Ext.emptyFn,
	setPosition : Ext.emptyFn,
	setPagePosition : Ext.emptyFn,
	markInvalid : Ext.emptyFn,
	clearInvalid : Ext.emptyFn
});
Ext.reg("hidden", Ext.form.Hidden);
Ext.form.BasicForm = function(b, a) {
	Ext.apply(this, a);
	if (Ext.isString(this.paramOrder)) {
		this.paramOrder = this.paramOrder.split(/[\s,|]/)
	}
	this.items = new Ext.util.MixedCollection(false, function(c) {
		return c.itemId || c.id || (c.id = Ext.id())
	});
	this.addEvents("beforeaction", "actionfailed", "actioncomplete");
	if (b) {
		this.initEl(b)
	}
	Ext.form.BasicForm.superclass.constructor.call(this)
};
Ext.extend(Ext.form.BasicForm, Ext.util.Observable, {
	timeout : 30,
	paramOrder : undefined,
	paramsAsHash : false,
	activeAction : null,
	trackResetOnLoad : false,
	initEl : function(a) {
		this.el = Ext.get(a);
		this.id = this.el.id || Ext.id();
		if (!this.standardSubmit) {
			this.el.on("submit", this.onSubmit, this)
		}
		this.el.addClass("x-form")
	},
	getEl : function() {
		return this.el
	},
	onSubmit : function(a) {
		a.stopEvent()
	},
	destroy : function() {
		this.items.each( function(a) {
			Ext.destroy(a)
		});
		if (this.el) {
			this.el.removeAllListeners();
			this.el.remove()
		}
		this.purgeListeners()
	},
	isValid : function() {
		var a = true;
		this.items.each( function(b) {
			if (!b.validate()) {
				a = false
			}
		});
		return a
	},
	isDirty : function() {
		var a = false;
		this.items.each( function(b) {
			if (b.isDirty()) {
				a = true;
				return false
			}
		});
		return a
	},
	doAction : function(b, a) {
		if (Ext.isString(b)) {
			b = new Ext.form.Action.ACTION_TYPES[b](this, a)
		}
		if (this.fireEvent("beforeaction", this, b) !== false) {
			this.beforeAction(b);
			b.run.defer(100, b)
		}
		return this
	},
	submit : function(b) {
		if (this.standardSubmit) {
			var a = this.isValid();
			if (a) {
				this.el.dom.submit()
			}
			return a
		}
		var c = String.format("{0}submit", this.api ? "direct" : "");
		this.doAction(c, b);
		return this
	},
	load : function(a) {
		var b = String.format("{0}load", this.api ? "direct" : "");
		this.doAction(b, a);
		return this
	},
	updateRecord : function(b) {
		b.beginEdit();
		var a = b.fields;
		a.each( function(c) {
			var d = this.findField(c.name);
			if (d) {
				b.set(c.name, d.getValue())
			}
		}, this);
		b.endEdit();
		return this
	},
	loadRecord : function(a) {
		this.setValues(a.data);
		return this
	},
	beforeAction : function(a) {
		var b = a.options;
		if (b.waitMsg) {
			if (this.waitMsgTarget === true) {
				this.el.mask(b.waitMsg, "x-mask-loading")
			} else {
				if (this.waitMsgTarget) {
					this.waitMsgTarget = Ext.get(this.waitMsgTarget);
					this.waitMsgTarget.mask(b.waitMsg, "x-mask-loading")
				} else {
					Ext.MessageBox.wait(b.waitMsg, b.waitTitle
							|| this.waitTitle || "Please Wait...")
				}
			}
		}
	},
	afterAction : function(a, c) {
		this.activeAction = null;
		var b = a.options;
		if (b.waitMsg) {
			if (this.waitMsgTarget === true) {
				this.el.unmask()
			} else {
				if (this.waitMsgTarget) {
					this.waitMsgTarget.unmask()
				} else {
					Ext.MessageBox.updateProgress(1);
					Ext.MessageBox.hide()
				}
			}
		}
		if (c) {
			if (b.reset) {
				this.reset()
			}
			Ext.callback(b.success, b.scope, [ this, a ]);
			this.fireEvent("actioncomplete", this, a)
		} else {
			Ext.callback(b.failure, b.scope, [ this, a ]);
			this.fireEvent("actionfailed", this, a)
		}
	},
	findField : function(b) {
		var a = this.items.get(b);
		if (!Ext.isObject(a)) {
			this.items
					.each( function(c) {
						if (c.isFormField
								&& (c.dataIndex == b || c.id == b || c
										.getName() == b)) {
							a = c;
							return false
						}
					})
		}
		return a || null
	},
	markInvalid : function(h) {
		if (Ext.isArray(h)) {
			for ( var c = 0, a = h.length; c < a; c++) {
				var b = h[c];
				var d = this.findField(b.id);
				if (d) {
					d.markInvalid(b.msg)
				}
			}
		} else {
			var e, g;
			for (g in h) {
				if (!Ext.isFunction(h[g]) && (e = this.findField(g))) {
					e.markInvalid(h[g])
				}
			}
		}
		return this
	},
	setValues : function(c) {
		if (Ext.isArray(c)) {
			for ( var d = 0, a = c.length; d < a; d++) {
				var b = c[d];
				var e = this.findField(b.id);
				if (e) {
					e.setValue(b.value);
					if (this.trackResetOnLoad) {
						e.originalValue = e.getValue()
					}
				}
			}
		} else {
			var g, h;
			for (h in c) {
				if (!Ext.isFunction(c[h]) && (g = this.findField(h))) {
					g.setValue(c[h]);
					if (this.trackResetOnLoad) {
						g.originalValue = g.getValue()
					}
				}
			}
		}
		return this
	},
	getValues : function(b) {
		var a = Ext.lib.Ajax.serializeForm(this.el.dom);
		if (b === true) {
			return a
		}
		return Ext.urlDecode(a)
	},
	getFieldValues : function() {
		var a = {};
		this.items.each( function(b) {
			a[b.getName()] = b.getValue()
		});
		return a
	},
	clearInvalid : function() {
		this.items.each( function(a) {
			a.clearInvalid()
		});
		return this
	},
	reset : function() {
		this.items.each( function(a) {
			a.reset()
		});
		return this
	},
	add : function() {
		this.items.addAll(Array.prototype.slice.call(arguments, 0));
		return this
	},
	remove : function(a) {
		this.items.remove(a);
		return this
	},
	render : function() {
		this.items.each( function(a) {
			if (a.isFormField && !a.rendered && document.getElementById(a.id)) {
				a.applyToMarkup(a.id)
			}
		});
		return this
	},
	applyToFields : function(a) {
		this.items.each( function(b) {
			Ext.apply(b, a)
		});
		return this
	},
	applyIfToFields : function(a) {
		this.items.each( function(b) {
			Ext.applyIf(b, a)
		});
		return this
	},
	callFieldMethod : function(b, a) {
		a = a || [];
		this.items.each( function(c) {
			if (Ext.isFunction(c[b])) {
				c[b].apply(c, a)
			}
		});
		return this
	}
});
Ext.BasicForm = Ext.form.BasicForm;
Ext.FormPanel = Ext.extend(Ext.Panel, {
	minButtonWidth : 75,
	labelAlign : "left",
	monitorValid : false,
	monitorPoll : 200,
	layout : "form",
	initComponent : function() {
		this.form = this.createForm();
		Ext.FormPanel.superclass.initComponent.call(this);
		this.bodyCfg = {
			tag : "form",
			cls : this.baseCls + "-body",
			method : this.method || "POST",
			id : this.formId || Ext.id()
		};
		if (this.fileUpload) {
			this.bodyCfg.enctype = "multipart/form-data"
		}
		this.initItems();
		this.addEvents("clientvalidation");
		this.relayEvents(this.form, [ "beforeaction", "actionfailed",
				"actioncomplete" ])
	},
	createForm : function() {
		var a = Ext.applyIf( {
			listeners : {}
		}, this.initialConfig);
		return new Ext.form.BasicForm(null, a)
	},
	initFields : function() {
		var c = this.form;
		var a = this;
		var b = function(d) {
			if (a.isField(d)) {
				c.add(d)
			}
			if (d.isFieldWrap) {
				Ext.applyIf(d, {
					labelAlign : d.ownerCt.labelAlign,
					labelWidth : d.ownerCt.labelWidth,
					itemCls : d.ownerCt.itemCls
				});
				c.add(d.field)
			} else {
				if (d.doLayout && d != a) {
					Ext.applyIf(d, {
						labelAlign : d.ownerCt.labelAlign,
						labelWidth : d.ownerCt.labelWidth,
						itemCls : d.ownerCt.itemCls
					});
					if (d.items && d.items.each) {
						d.items.each(b, this)
					}
				}
			}
		};
		this.items.each(b, this)
	},
	getLayoutTarget : function() {
		return this.form.el
	},
	getForm : function() {
		return this.form
	},
	onRender : function(b, a) {
		this.initFields();
		Ext.FormPanel.superclass.onRender.call(this, b, a);
		this.form.initEl(this.body)
	},
	beforeDestroy : function() {
		this.stopMonitoring();
		Ext.FormPanel.superclass.beforeDestroy.call(this);
		this.form.items.clear();
		Ext.destroy(this.form)
	},
	isField : function(a) {
		return !!a.setValue && !!a.getValue && !!a.markInvalid
				&& !!a.clearInvalid
	},
	initEvents : function() {
		Ext.FormPanel.superclass.initEvents.call(this);
		this.on("remove", this.onRemove, this);
		this.on("add", this.onAdd, this);
		if (this.monitorValid) {
			this.startMonitoring()
		}
	},
	onAdd : function(a, b) {
		if (this.isField(b)) {
			this.form.add(b)
		} else {
			if (b.findBy) {
				Ext.applyIf(b, {
					labelAlign : b.ownerCt.labelAlign,
					labelWidth : b.ownerCt.labelWidth,
					itemCls : b.ownerCt.itemCls
				});
				this.form.add.apply(this.form, b.findBy(this.isField))
			}
		}
	},
	onRemove : function(a, b) {
		if (this.isField(b)) {
			Ext.destroy(b.container.up(".x-form-item"));
			this.form.remove(b)
		} else {
			if (b.findByType) {
				Ext.each(b.findBy(this.isField), this.form.remove, this.form)
			}
		}
	},
	startMonitoring : function() {
		if (!this.validTask) {
			this.validTask = new Ext.util.TaskRunner();
			this.validTask.start( {
				run : this.bindHandler,
				interval : this.monitorPoll || 200,
				scope : this
			})
		}
	},
	stopMonitoring : function() {
		if (this.validTask) {
			this.validTask.stopAll();
			this.validTask = null
		}
	},
	load : function() {
		this.form.load.apply(this.form, arguments)
	},
	onDisable : function() {
		Ext.FormPanel.superclass.onDisable.call(this);
		if (this.form) {
			this.form.items.each( function() {
				this.disable()
			})
		}
	},
	onEnable : function() {
		Ext.FormPanel.superclass.onEnable.call(this);
		if (this.form) {
			this.form.items.each( function() {
				this.enable()
			})
		}
	},
	bindHandler : function() {
		var e = true;
		this.form.items.each( function(g) {
			if (!g.isValid(true)) {
				e = false;
				return false
			}
		});
		if (this.fbar) {
			var b = this.fbar.items.items;
			for ( var d = 0, a = b.length; d < a; d++) {
				var c = b[d];
				if (c.formBind === true && c.disabled === e) {
					c.setDisabled(!e)
				}
			}
		}
		this.fireEvent("clientvalidation", this, e)
	}
});
Ext.reg("form", Ext.FormPanel);
Ext.form.FormPanel = Ext.FormPanel;
Ext.form.FieldSet = Ext
		.extend(
				Ext.Panel,
				{
					baseCls : "x-fieldset",
					layout : "form",
					animCollapse : false,
					onRender : function(b, a) {
						if (!this.el) {
							this.el = document.createElement("fieldset");
							this.el.id = this.id;
							if (this.title || this.header
									|| this.checkboxToggle) {
								this.el.appendChild(document
										.createElement("legend")).className = "x-fieldset-header"
							}
						}
						Ext.form.FieldSet.superclass.onRender.call(this, b, a);
						if (this.checkboxToggle) {
							var c = typeof this.checkboxToggle == "object" ? this.checkboxToggle
									: {
										tag : "input",
										type : "checkbox",
										name : this.checkboxName || this.id
												+ "-checkbox"
									};
							this.checkbox = this.header.insertFirst(c);
							this.checkbox.dom.checked = !this.collapsed;
							this.mon(this.checkbox, "click", this.onCheckClick,
									this)
						}
					},
					onCollapse : function(a, b) {
						if (this.checkbox) {
							this.checkbox.dom.checked = false
						}
						Ext.form.FieldSet.superclass.onCollapse
								.call(this, a, b)
					},
					onExpand : function(a, b) {
						if (this.checkbox) {
							this.checkbox.dom.checked = true
						}
						Ext.form.FieldSet.superclass.onExpand.call(this, a, b)
					},
					onCheckClick : function() {
						this[this.checkbox.dom.checked ? "expand" : "collapse"]
								()
					}
				});
Ext.reg("fieldset", Ext.form.FieldSet);
Ext.form.HtmlEditor = Ext
		.extend(
				Ext.form.Field,
				{
					enableFormat : true,
					enableFontSize : true,
					enableColors : true,
					enableAlignments : true,
					enableLists : true,
					enableSourceEdit : true,
					enableLinks : true,
					enableFont : true,
					createLinkText : "Please enter the URL for the link:",
					defaultLinkValue : "http://",
					fontFamilies : [ "Arial", "Courier New", "Tahoma",
							"Times New Roman", "Verdana" ],
					defaultFont : "tahoma",
					defaultValue : (Ext.isOpera || Ext.isIE6) ? "&nbsp;"
							: "&#8203;",
					actionMode : "wrap",
					validationEvent : false,
					deferHeight : true,
					initialized : false,
					activated : false,
					sourceEditMode : false,
					onFocus : Ext.emptyFn,
					iframePad : 3,
					hideMode : "offsets",
					defaultAutoCreate : {
						tag : "textarea",
						style : "width:500px;height:300px;",
						autocomplete : "off"
					},
					initComponent : function() {
						this.addEvents("initialize", "activate", "beforesync",
								"beforepush", "sync", "push", "editmodechange")
					},
					createFontOptions : function() {
						var d = [], b = this.fontFamilies, c, g;
						for ( var e = 0, a = b.length; e < a; e++) {
							c = b[e];
							g = c.toLowerCase();
							d
									.push(
											'<option value="',
											g,
											'" style="font-family:',
											c,
											';"',
											(this.defaultFont == g ? ' selected="true">'
													: ">"), c, "</option>")
						}
						return d.join("")
					},
					createToolbar : function(d) {
						var a = Ext.QuickTips && Ext.QuickTips.isEnabled();
						function c(h, e, g) {
							return {
								itemId : h,
								cls : "x-btn-icon",
								iconCls : "x-edit-" + h,
								enableToggle : e !== false,
								scope : d,
								handler : g || d.relayBtnCmd,
								clickEvent : "mousedown",
								tooltip : a ? d.buttonTips[h] || undefined
										: undefined,
								overflowText : d.buttonTips[h].title || undefined,
								tabIndex : -1
							}
						}
						var b = new Ext.Toolbar( {
							renderTo : this.wrap.dom.firstChild
						});
						this.mon(b.el, "click", function(g) {
							g.preventDefault()
						});
						if (this.enableFont && !Ext.isSafari2) {
							this.fontSelect = b.el.createChild( {
								tag : "select",
								cls : "x-font-select",
								html : this.createFontOptions()
							});
							this.mon(this.fontSelect, "change", function() {
								var e = this.fontSelect.dom.value;
								this.relayCmd("fontname", e);
								this.deferFocus()
							}, this);
							b.add(this.fontSelect.dom, "-")
						}
						if (this.enableFormat) {
							b.add(c("bold"), c("italic"), c("underline"))
						}
						if (this.enableFontSize) {
							b.add("-", c("increasefontsize", false,
									this.adjustFont), c("decreasefontsize",
									false, this.adjustFont))
						}
						if (this.enableColors) {
							b
									.add(
											"-",
											{
												itemId : "forecolor",
												cls : "x-btn-icon",
												iconCls : "x-edit-forecolor",
												clickEvent : "mousedown",
												tooltip : a ? d.buttonTips.forecolor || undefined
														: undefined,
												tabIndex : -1,
												menu : new Ext.menu.ColorMenu(
														{
															allowReselect : true,
															focus : Ext.emptyFn,
															value : "000000",
															plain : true,
															listeners : {
																scope : this,
																select : function(
																		g, e) {
																	this
																			.execCmd(
																					"forecolor",
																					Ext.isWebKit
																							|| Ext.isIE ? "#"
																							+ e
																							: e);
																	this
																			.deferFocus()
																}
															},
															clickEvent : "mousedown"
														})
											},
											{
												itemId : "backcolor",
												cls : "x-btn-icon",
												iconCls : "x-edit-backcolor",
												clickEvent : "mousedown",
												tooltip : a ? d.buttonTips.backcolor || undefined
														: undefined,
												tabIndex : -1,
												menu : new Ext.menu.ColorMenu(
														{
															focus : Ext.emptyFn,
															value : "FFFFFF",
															plain : true,
															allowReselect : true,
															listeners : {
																scope : this,
																select : function(
																		g, e) {
																	if (Ext.isGecko) {
																		this
																				.execCmd(
																						"useCSS",
																						false);
																		this
																				.execCmd(
																						"hilitecolor",
																						e);
																		this
																				.execCmd(
																						"useCSS",
																						true);
																		this
																				.deferFocus()
																	} else {
																		this
																				.execCmd(
																						Ext.isOpera ? "hilitecolor"
																								: "backcolor",
																						Ext.isWebKit
																								|| Ext.isIE ? "#"
																								+ e
																								: e);
																		this
																				.deferFocus()
																	}
																}
															},
															clickEvent : "mousedown"
														})
											})
						}
						if (this.enableAlignments) {
							b.add("-", c("justifyleft"), c("justifycenter"),
									c("justifyright"))
						}
						if (!Ext.isSafari2) {
							if (this.enableLinks) {
								b.add("-", c("createlink", false,
										this.createLink))
							}
							if (this.enableLists) {
								b.add("-", c("insertorderedlist"),
										c("insertunorderedlist"))
							}
							if (this.enableSourceEdit) {
								b.add("-", c("sourceedit", true, function(e) {
									this.toggleSourceEdit(!this.sourceEditMode)
								}))
							}
						}
						this.tb = b
					},
					getDocMarkup : function() {
						return '<html><head><style type="text/css">body{border:0;margin:0;padding:3px;height:98%;cursor:text;}</style></head><body></body></html>'
					},
					getEditorBody : function() {
						return this.doc.body || this.doc.documentElement
					},
					getDoc : function() {
						return Ext.isIE ? this.getWin().document
								: (this.iframe.contentDocument || this.getWin().document)
					},
					getWin : function() {
						return Ext.isIE ? this.iframe.contentWindow
								: window.frames[this.iframe.name]
					},
					onRender : function(b, a) {
						Ext.form.HtmlEditor.superclass.onRender
								.call(this, b, a);
						this.el.dom.style.border = "0 none";
						this.el.dom.setAttribute("tabIndex", -1);
						this.el.addClass("x-hidden");
						if (Ext.isIE) {
							this.el
									.applyStyles("margin-top:-1px;margin-bottom:-1px;")
						}
						this.wrap = this.el.wrap( {
							cls : "x-html-editor-wrap",
							cn : {
								cls : "x-html-editor-tb"
							}
						});
						this.createToolbar(this);
						this.disableItems(true);
						this.createIFrame();
						if (!this.width) {
							var c = this.el.getSize();
							this.setSize(c.width, this.height || c.height)
						}
					},
					createIFrame : function() {
						var a = document.createElement("iframe");
						a.name = Ext.id();
						a.frameBorder = "0";
						a.src = Ext.isIE ? Ext.SSL_SECURE_URL : "javascript:;";
						this.wrap.dom.appendChild(a);
						this.iframe = a;
						this.monitorTask = Ext.TaskMgr.start( {
							run : this.checkDesignMode,
							scope : this,
							interval : 100
						})
					},
					initFrame : function() {
						Ext.TaskMgr.stop(this.monitorTask);
						this.doc = this.getDoc();
						this.win = this.getWin();
						this.doc.open();
						this.doc.write(this.getDocMarkup());
						this.doc.close();
						var a = {
							run : function() {
								if (this.doc.body
										|| this.doc.readyState == "complete") {
									Ext.TaskMgr.stop(a);
									this.doc.designMode = "on";
									this.initEditor.defer(10, this)
								}
							},
							interval : 10,
							duration : 10000,
							scope : this
						};
						Ext.TaskMgr.start(a)
					},
					checkDesignMode : function() {
						if (this.wrap && this.wrap.dom.offsetWidth) {
							var a = this.getDoc();
							if (!a) {
								return
							}
							if (!a.editorInitialized
									|| String(a.designMode).toLowerCase() != "on") {
								this.initFrame()
							}
						}
					},
					disableItems : function(a) {
						if (this.fontSelect) {
							this.fontSelect.dom.disabled = a
						}
						this.tb.items.each( function(b) {
							if (b.itemId != "sourceedit") {
								b.setDisabled(a)
							}
						})
					},
					onResize : function(b, c) {
						Ext.form.HtmlEditor.superclass.onResize.apply(this,
								arguments);
						if (this.el && this.iframe) {
							if (typeof b == "number") {
								var d = b - this.wrap.getFrameWidth("lr");
								this.el.setWidth(this
										.adjustWidth("textarea", d));
								this.tb.setWidth(d);
								this.iframe.style.width = Math.max(d, 0) + "px"
							}
							if (typeof c == "number") {
								var a = c - this.wrap.getFrameWidth("tb")
										- this.tb.el.getHeight();
								this.el.setHeight(this.adjustWidth("textarea",
										a));
								this.iframe.style.height = Math.max(a, 0)
										+ "px";
								if (this.doc) {
									this.getEditorBody().style.height = Math
											.max((a - (this.iframePad * 2)), 0)
											+ "px"
								}
							}
						}
					},
					toggleSourceEdit : function(a) {
						if (a === undefined) {
							a = !this.sourceEditMode
						}
						this.sourceEditMode = a === true;
						var c = this.tb.items.get("sourceedit");
						if (c.pressed !== this.sourceEditMode) {
							c.toggle(this.sourceEditMode);
							if (!c.xtbHidden) {
								return
							}
						}
						if (this.sourceEditMode) {
							this.disableItems(true);
							this.syncValue();
							this.iframe.className = "x-hidden";
							this.el.removeClass("x-hidden");
							this.el.dom.removeAttribute("tabIndex");
							this.el.focus()
						} else {
							if (this.initialized) {
								this.disableItems(false)
							}
							this.pushValue();
							this.iframe.className = "";
							this.el.addClass("x-hidden");
							this.el.dom.setAttribute("tabIndex", -1);
							this.deferFocus()
						}
						var b = this.lastSize;
						if (b) {
							delete this.lastSize;
							this.setSize(b)
						}
						this.fireEvent("editmodechange", this,
								this.sourceEditMode)
					},
					createLink : function() {
						var a = prompt(this.createLinkText,
								this.defaultLinkValue);
						if (a && a != "http://") {
							this.relayCmd("createlink", a)
						}
					},
					adjustSize : Ext.BoxComponent.prototype.adjustSize,
					getResizeEl : function() {
						return this.wrap
					},
					getPositionEl : function() {
						return this.wrap
					},
					initEvents : function() {
						this.originalValue = this.getValue()
					},
					markInvalid : Ext.emptyFn,
					clearInvalid : Ext.emptyFn,
					setValue : function(a) {
						Ext.form.HtmlEditor.superclass.setValue.call(this, a);
						this.pushValue();
						return this
					},
					cleanHtml : function(a) {
						a = String(a);
						if (a.length > 5) {
							if (Ext.isWebKit) {
								a = a
										.replace(
												/\sclass="(?:Apple-style-span|khtml-block-placeholder)"/gi,
												"")
							}
						}
						if (a == this.defaultValue) {
							a = ""
						}
						return a
					},
					syncValue : function() {
						if (this.initialized) {
							var d = this.getEditorBody();
							var c = d.innerHTML;
							if (Ext.isWebKit) {
								var b = d.getAttribute("style");
								var a = b.match(/text-align:(.*?);/i);
								if (a && a[1]) {
									c = '<div style="' + a[0] + '">' + c
											+ "</div>"
								}
							}
							c = this.cleanHtml(c);
							if (this.fireEvent("beforesync", this, c) !== false) {
								this.el.dom.value = c;
								this.fireEvent("sync", this, c)
							}
						}
					},
					getValue : function() {
						this[this.sourceEditMode ? "pushValue" : "syncValue"]();
						return Ext.form.HtmlEditor.superclass.getValue
								.call(this)
					},
					pushValue : function() {
						if (this.initialized) {
							var a = this.el.dom.value;
							if (!this.activated && a.length < 1) {
								a = this.defaultValue
							}
							if (this.fireEvent("beforepush", this, a) !== false) {
								this.getEditorBody().innerHTML = a;
								if (Ext.isGecko) {
									var c = this.doc, b = c.designMode
											.toLowerCase();
									c.designMode = b.toggle("on", "off");
									c.designMode = b
								}
								this.fireEvent("push", this, a)
							}
						}
					},
					deferFocus : function() {
						this.focus.defer(10, this)
					},
					focus : function() {
						if (this.win && !this.sourceEditMode) {
							this.win.focus()
						} else {
							this.el.focus()
						}
					},
					initEditor : function() {
						try {
							var b = this.getEditorBody();
							var a = this.el.getStyles("font-size",
									"font-family", "background-image",
									"background-repeat");
							a["background-attachment"] = "fixed";
							b.bgProperties = "fixed";
							Ext.DomHelper.applyStyles(b, a);
							if (this.doc) {
								try {
									Ext.EventManager.removeAll(this.doc)
								} catch (c) {
								}
							}
							this.doc = this.getDoc();
							Ext.EventManager.on(this.doc, {
								mousedown : this.onEditorEvent,
								dblclick : this.onEditorEvent,
								click : this.onEditorEvent,
								keyup : this.onEditorEvent,
								buffer : 100,
								scope : this
							});
							if (Ext.isGecko) {
								Ext.EventManager.on(this.doc, "keypress",
										this.applyCommand, this)
							}
							if (Ext.isIE || Ext.isWebKit || Ext.isOpera) {
								Ext.EventManager.on(this.doc, "keydown",
										this.fixKeys, this)
							}
							this.initialized = true;
							this.fireEvent("initialize", this);
							this.doc.editorInitialized = true;
							this.pushValue()
						} catch (c) {
						}
					},
					onDestroy : function() {
						if (this.monitorTask) {
							Ext.TaskMgr.stop(this.monitorTask)
						}
						if (this.rendered) {
							Ext.destroy(this.tb);
							if (this.wrap) {
								this.wrap.dom.innerHTML = "";
								this.wrap.remove()
							}
						}
						if (this.el) {
							this.el.removeAllListeners();
							this.el.remove()
						}
						if (this.doc) {
							try {
								Ext.EventManager.removeAll(this.doc);
								for ( var b in this.doc) {
									delete this.doc[b]
								}
							} catch (a) {
							}
						}
						this.purgeListeners()
					},
					onFirstFocus : function() {
						this.activated = true;
						this.disableItems(false);
						if (Ext.isGecko) {
							this.win.focus();
							var a = this.win.getSelection();
							if (!a.focusNode || a.focusNode.nodeType != 3) {
								var b = a.getRangeAt(0);
								b.selectNodeContents(this.getEditorBody());
								b.collapse(true);
								this.deferFocus()
							}
							try {
								this.execCmd("useCSS", true);
								this.execCmd("styleWithCSS", false)
							} catch (c) {
							}
						}
						this.fireEvent("activate", this)
					},
					adjustFont : function(b) {
						var c = b.itemId == "increasefontsize" ? 1 : -1;
						var a = parseInt(
								this.doc.queryCommandValue("FontSize") || 2, 10);
						if ((Ext.isSafari && !Ext.isSafari2) || Ext.isChrome
								|| Ext.isAir) {
							if (a <= 10) {
								a = 1 + c
							} else {
								if (a <= 13) {
									a = 2 + c
								} else {
									if (a <= 16) {
										a = 3 + c
									} else {
										if (a <= 18) {
											a = 4 + c
										} else {
											if (a <= 24) {
												a = 5 + c
											} else {
												a = 6 + c
											}
										}
									}
								}
							}
							a = a.constrain(1, 6)
						} else {
							if (Ext.isSafari) {
								c *= 2
							}
							a = Math.max(1, a + c) + (Ext.isSafari ? "px" : 0)
						}
						this.execCmd("FontSize", a)
					},
					onEditorEvent : function(a) {
						this.updateToolbar()
					},
					updateToolbar : function() {
						if (!this.activated) {
							this.onFirstFocus();
							return
						}
						var b = this.tb.items.map, c = this.doc;
						if (this.enableFont && !Ext.isSafari2) {
							var a = (this.doc.queryCommandValue("FontName") || this.defaultFont)
									.toLowerCase();
							if (a != this.fontSelect.dom.value) {
								this.fontSelect.dom.value = a
							}
						}
						if (this.enableFormat) {
							b.bold.toggle(c.queryCommandState("bold"));
							b.italic.toggle(c.queryCommandState("italic"));
							b.underline
									.toggle(c.queryCommandState("underline"))
						}
						if (this.enableAlignments) {
							b.justifyleft.toggle(c
									.queryCommandState("justifyleft"));
							b.justifycenter.toggle(c
									.queryCommandState("justifycenter"));
							b.justifyright.toggle(c
									.queryCommandState("justifyright"))
						}
						if (!Ext.isSafari2 && this.enableLists) {
							b.insertorderedlist.toggle(c
									.queryCommandState("insertorderedlist"));
							b.insertunorderedlist.toggle(c
									.queryCommandState("insertunorderedlist"))
						}
						Ext.menu.MenuMgr.hideAll();
						this.syncValue()
					},
					relayBtnCmd : function(a) {
						this.relayCmd(a.itemId)
					},
					relayCmd : function(b, a) {
						( function() {
							this.focus();
							this.execCmd(b, a);
							this.updateToolbar()
						}).defer(10, this)
					},
					execCmd : function(b, a) {
						this.doc.execCommand(b, false, a === undefined ? null
								: a);
						this.syncValue()
					},
					applyCommand : function(b) {
						if (b.ctrlKey) {
							var d = b.getCharCode(), a;
							if (d > 0) {
								d = String.fromCharCode(d);
								switch (d) {
								case "b":
									a = "bold";
									break;
								case "i":
									a = "italic";
									break;
								case "u":
									a = "underline";
									break
								}
								if (a) {
									this.win.focus();
									this.execCmd(a);
									this.deferFocus();
									b.preventDefault()
								}
							}
						}
					},
					insertAtCursor : function(b) {
						if (!this.activated) {
							return
						}
						if (Ext.isIE) {
							this.win.focus();
							var a = this.doc.selection.createRange();
							if (a) {
								a.collapse(true);
								a.pasteHTML(b);
								this.syncValue();
								this.deferFocus()
							}
						} else {
							if (Ext.isGecko || Ext.isOpera) {
								this.win.focus();
								this.execCmd("InsertHTML", b);
								this.deferFocus()
							} else {
								if (Ext.isWebKit) {
									this.execCmd("InsertText", b);
									this.deferFocus()
								}
							}
						}
					},
					fixKeys : function() {
						if (Ext.isIE) {
							return function(d) {
								var a = d.getKey(), b;
								if (a == d.TAB) {
									d.stopEvent();
									b = this.doc.selection.createRange();
									if (b) {
										b.collapse(true);
										b.pasteHTML("&nbsp;&nbsp;&nbsp;&nbsp;");
										this.deferFocus()
									}
								} else {
									if (a == d.ENTER) {
										b = this.doc.selection.createRange();
										if (b) {
											var c = b.parentElement();
											if (!c
													|| c.tagName.toLowerCase() != "li") {
												d.stopEvent();
												b.pasteHTML("<br />");
												b.collapse(false);
												b.select()
											}
										}
									}
								}
							}
						} else {
							if (Ext.isOpera) {
								return function(b) {
									var a = b.getKey();
									if (a == b.TAB) {
										b.stopEvent();
										this.win.focus();
										this.execCmd("InsertHTML",
												"&nbsp;&nbsp;&nbsp;&nbsp;");
										this.deferFocus()
									}
								}
							} else {
								if (Ext.isWebKit) {
									return function(b) {
										var a = b.getKey();
										if (a == b.TAB) {
											b.stopEvent();
											this.execCmd("InsertText", "\t");
											this.deferFocus()
										}
									}
								}
							}
						}
					}(),
					getToolbar : function() {
						return this.tb
					},
					buttonTips : {
						bold : {
							title : "Bold (Ctrl+B)",
							text : "Make the selected text bold.",
							cls : "x-html-editor-tip"
						},
						italic : {
							title : "Italic (Ctrl+I)",
							text : "Make the selected text italic.",
							cls : "x-html-editor-tip"
						},
						underline : {
							title : "Underline (Ctrl+U)",
							text : "Underline the selected text.",
							cls : "x-html-editor-tip"
						},
						increasefontsize : {
							title : "Grow Text",
							text : "Increase the font size.",
							cls : "x-html-editor-tip"
						},
						decreasefontsize : {
							title : "Shrink Text",
							text : "Decrease the font size.",
							cls : "x-html-editor-tip"
						},
						backcolor : {
							title : "Text Highlight Color",
							text : "Change the background color of the selected text.",
							cls : "x-html-editor-tip"
						},
						forecolor : {
							title : "Font Color",
							text : "Change the color of the selected text.",
							cls : "x-html-editor-tip"
						},
						justifyleft : {
							title : "Align Text Left",
							text : "Align text to the left.",
							cls : "x-html-editor-tip"
						},
						justifycenter : {
							title : "Center Text",
							text : "Center text in the editor.",
							cls : "x-html-editor-tip"
						},
						justifyright : {
							title : "Align Text Right",
							text : "Align text to the right.",
							cls : "x-html-editor-tip"
						},
						insertunorderedlist : {
							title : "Bullet List",
							text : "Start a bulleted list.",
							cls : "x-html-editor-tip"
						},
						insertorderedlist : {
							title : "Numbered List",
							text : "Start a numbered list.",
							cls : "x-html-editor-tip"
						},
						createlink : {
							title : "Hyperlink",
							text : "Make the selected text a hyperlink.",
							cls : "x-html-editor-tip"
						},
						sourceedit : {
							title : "Source Edit",
							text : "Switch to source editing mode.",
							cls : "x-html-editor-tip"
						}
					}
				});
Ext.reg("htmleditor", Ext.form.HtmlEditor);
Ext.form.TimeField = Ext
		.extend(
				Ext.form.ComboBox,
				{
					minValue : null,
					maxValue : null,
					minText : "The time in this field must be equal to or after {0}",
					maxText : "The time in this field must be equal to or before {0}",
					invalidText : "{0} is not a valid time",
					format : "g:i A",
					altFormats : "g:ia|g:iA|g:i a|g:i A|h:i|g:i|H:i|ga|ha|gA|h a|g a|g A|gi|hi|gia|hia|g|H",
					increment : 15,
					mode : "local",
					triggerAction : "all",
					typeAhead : false,
					initDate : "1/1/2008",
					initComponent : function() {
						if (typeof this.minValue == "string") {
							this.minValue = this.parseDate(this.minValue)
						}
						if (typeof this.maxValue == "string") {
							this.maxValue = this.parseDate(this.maxValue)
						}
						if (!this.store) {
							var b = this.parseDate(this.minValue)
									|| new Date(this.initDate).clearTime();
							var a = this.parseDate(this.maxValue)
									|| new Date(this.initDate).clearTime().add(
											"mi", (24 * 60) - 1);
							var c = [];
							while (b <= a) {
								c.push(b.dateFormat(this.format));
								b = b.add("mi", this.increment)
							}
							this.store = c
						}
						Ext.form.TimeField.superclass.initComponent.call(this)
					},
					getValue : function() {
						var a = Ext.form.TimeField.superclass.getValue
								.call(this);
						return this.formatDate(this.parseDate(a)) || ""
					},
					setValue : function(a) {
						return Ext.form.TimeField.superclass.setValue.call(
								this, this.formatDate(this.parseDate(a)))
					},
					validateValue : Ext.form.DateField.prototype.validateValue,
					parseDate : Ext.form.DateField.prototype.parseDate,
					formatDate : Ext.form.DateField.prototype.formatDate,
					beforeBlur : function() {
						var a = this.parseDate(this.getRawValue());
						if (a) {
							this.setValue(a.dateFormat(this.format))
						}
						Ext.form.TimeField.superclass.beforeBlur.call(this)
					}
				});
Ext.reg("timefield", Ext.form.TimeField);
Ext.form.Label = Ext.extend(Ext.BoxComponent, {
	onRender : function(b, a) {
		if (!this.el) {
			this.el = document.createElement("label");
			this.el.id = this.getId();
			this.el.innerHTML = this.text ? Ext.util.Format
					.htmlEncode(this.text) : (this.html || "");
			if (this.forId) {
				this.el.setAttribute("for", this.forId)
			}
		}
		Ext.form.Label.superclass.onRender.call(this, b, a)
	},
	setText : function(a, b) {
		var c = b === false;
		this[!c ? "text" : "html"] = a;
		delete this[c ? "text" : "html"];
		if (this.rendered) {
			this.el.dom.innerHTML = b !== false ? Ext.util.Format.htmlEncode(a)
					: a
		}
		return this
	}
});
Ext.reg("label", Ext.form.Label);
Ext.form.Action = function(b, a) {
	this.form = b;
	this.options = a || {}
};
Ext.form.Action.CLIENT_INVALID = "client";
Ext.form.Action.SERVER_INVALID = "server";
Ext.form.Action.CONNECT_FAILURE = "connect";
Ext.form.Action.LOAD_FAILURE = "load";
Ext.form.Action.prototype = {
	type : "default",
	run : function(a) {
	},
	success : function(a) {
	},
	handleResponse : function(a) {
	},
	failure : function(a) {
		this.response = a;
		this.failureType = Ext.form.Action.CONNECT_FAILURE;
		this.form.afterAction(this, false)
	},
	processResponse : function(a) {
		this.response = a;
		if (!a.responseText && !a.responseXML) {
			return true
		}
		this.result = this.handleResponse(a);
		return this.result
	},
	getUrl : function(c) {
		var a = this.options.url || this.form.url || this.form.el.dom.action;
		if (c) {
			var b = this.getParams();
			if (b) {
				a = Ext.urlAppend(a, b)
			}
		}
		return a
	},
	getMethod : function() {
		return (this.options.method || this.form.method
				|| this.form.el.dom.method || "POST").toUpperCase()
	},
	getParams : function() {
		var a = this.form.baseParams;
		var b = this.options.params;
		if (b) {
			if (typeof b == "object") {
				b = Ext.urlEncode(Ext.applyIf(b, a))
			} else {
				if (typeof b == "string" && a) {
					b += "&" + Ext.urlEncode(a)
				}
			}
		} else {
			if (a) {
				b = Ext.urlEncode(a)
			}
		}
		return b
	},
	createCallback : function(a) {
		var a = a || {};
		return {
			success : this.success,
			failure : this.failure,
			scope : this,
			timeout : (a.timeout * 1000) || (this.form.timeout * 1000),
			upload : this.form.fileUpload ? this.success : undefined
		}
	}
};
Ext.form.Action.Submit = function(b, a) {
	Ext.form.Action.Submit.superclass.constructor.call(this, b, a)
};
Ext.extend(Ext.form.Action.Submit, Ext.form.Action, {
	type : "submit",
	run : function() {
		var b = this.options;
		var c = this.getMethod();
		var a = c == "GET";
		if (b.clientValidation === false || this.form.isValid()) {
			Ext.Ajax.request(Ext.apply(this.createCallback(b), {
				form : this.form.el.dom,
				url : this.getUrl(a),
				method : c,
				headers : b.headers,
				params : !a ? this.getParams() : null,
				isUpload : this.form.fileUpload
			}))
		} else {
			if (b.clientValidation !== false) {
				this.failureType = Ext.form.Action.CLIENT_INVALID;
				this.form.afterAction(this, false)
			}
		}
	},
	success : function(b) {
		var a = this.processResponse(b);
		if (a === true || a.success) {
			this.form.afterAction(this, true);
			return
		}
		if (a.errors) {
			this.form.markInvalid(a.errors);
			this.failureType = Ext.form.Action.SERVER_INVALID
		}
		this.form.afterAction(this, false)
	},
	handleResponse : function(c) {
		if (this.form.errorReader) {
			var b = this.form.errorReader.read(c);
			var g = [];
			if (b.records) {
				for ( var d = 0, a = b.records.length; d < a; d++) {
					var e = b.records[d];
					g[d] = e.data
				}
			}
			if (g.length < 1) {
				g = null
			}
			return {
				success : b.success,
				errors : g
			}
		}
		return Ext.decode(c.responseText)
	}
});
Ext.form.Action.Load = function(b, a) {
	Ext.form.Action.Load.superclass.constructor.call(this, b, a);
	this.reader = this.form.reader
};
Ext.extend(Ext.form.Action.Load, Ext.form.Action, {
	type : "load",
	run : function() {
		Ext.Ajax.request(Ext.apply(this.createCallback(this.options), {
			method : this.getMethod(),
			url : this.getUrl(false),
			headers : this.options.headers,
			params : this.getParams()
		}))
	},
	success : function(b) {
		var a = this.processResponse(b);
		if (a === true || !a.success || !a.data) {
			this.failureType = Ext.form.Action.LOAD_FAILURE;
			this.form.afterAction(this, false);
			return
		}
		this.form.clearInvalid();
		this.form.setValues(a.data);
		this.form.afterAction(this, true)
	},
	handleResponse : function(b) {
		if (this.form.reader) {
			var a = this.form.reader.read(b);
			var c = a.records && a.records[0] ? a.records[0].data : null;
			return {
				success : a.success,
				data : c
			}
		}
		return Ext.decode(b.responseText)
	}
});
Ext.form.Action.DirectLoad = Ext.extend(Ext.form.Action.Load, {
	constructor : function(b, a) {
		Ext.form.Action.DirectLoad.superclass.constructor.call(this, b, a)
	},
	type : "directload",
	run : function() {
		var a = this.getParams();
		a.push(this.success, this);
		this.form.api.load.apply(window, a)
	},
	getParams : function() {
		var c = [], h = {};
		var e = this.form.baseParams;
		var g = this.options.params;
		Ext.apply(h, g, e);
		var b = this.form.paramOrder;
		if (b) {
			for ( var d = 0, a = b.length; d < a; d++) {
				c.push(h[b[d]])
			}
		} else {
			if (this.form.paramsAsHash) {
				c.push(h)
			}
		}
		return c
	},
	processResponse : function(a) {
		this.result = a;
		return a
	}
});
Ext.form.Action.DirectSubmit = Ext.extend(Ext.form.Action.Submit, {
	constructor : function(b, a) {
		Ext.form.Action.DirectSubmit.superclass.constructor.call(this, b, a)
	},
	type : "directsubmit",
	run : function() {
		var a = this.options;
		if (a.clientValidation === false || this.form.isValid()) {
			this.success.params = this.getParams();
			this.form.api.submit(this.form.el.dom, this.success, this)
		} else {
			if (a.clientValidation !== false) {
				this.failureType = Ext.form.Action.CLIENT_INVALID;
				this.form.afterAction(this, false)
			}
		}
	},
	getParams : function() {
		var c = {};
		var a = this.form.baseParams;
		var b = this.options.params;
		Ext.apply(c, b, a);
		return c
	},
	processResponse : function(a) {
		this.result = a;
		return a
	}
});
Ext.form.Action.ACTION_TYPES = {
	load : Ext.form.Action.Load,
	submit : Ext.form.Action.Submit,
	directload : Ext.form.Action.DirectLoad,
	directsubmit : Ext.form.Action.DirectSubmit
};
Ext.form.VTypes = function() {
	var c = /^[a-zA-Z_]+$/;
	var d = /^[a-zA-Z0-9_]+$/;
	var b = /^(\w+)([-+.][\w]+)*@(\w[-\w]*\.){1,5}([A-Za-z]){2,4}$/;
	var a = /(((https?)|(ftp)):\/\/([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\\/+@&#;`~=%!]*)(\.\w{2,})?)*\/?)/i;
	return {
		email : function(e) {
			return b.test(e)
		},
		emailText : 'This field should be an e-mail address in the format "user@example.com"',
		emailMask : /[a-z0-9_\.\-@]/i,
		url : function(e) {
			return a.test(e)
		},
		urlText : 'This field should be a URL in the format "http://www.example.com"',
		alpha : function(e) {
			return c.test(e)
		},
		alphaText : "This field should only contain letters and _",
		alphaMask : /[a-z_]/i,
		alphanum : function(e) {
			return d.test(e)
		},
		alphanumText : "This field should only contain letters, numbers and _",
		alphanumMask : /[a-z0-9_]/i
	}
}();
Ext.grid.GridPanel = Ext
		.extend(
				Ext.Panel,
				{
					autoExpandColumn : false,
					autoExpandMax : 1000,
					autoExpandMin : 50,
					columnLines : false,
					ddText : "{0} selected row{1}",
					deferRowRender : true,
					enableColumnHide : true,
					enableColumnMove : true,
					enableDragDrop : false,
					enableHdMenu : true,
					loadMask : false,
					minColumnWidth : 25,
					stripeRows : false,
					trackMouseOver : true,
					stateEvents : [ "columnmove", "columnresize", "sortchange" ],
					view : null,
					rendered : false,
					viewReady : false,
					initComponent : function() {
						Ext.grid.GridPanel.superclass.initComponent.call(this);
						if (this.columnLines) {
							this.cls = (this.cls || "")
									+ " x-grid-with-col-lines"
						}
						this.autoScroll = false;
						this.autoWidth = false;
						if (Ext.isArray(this.columns)) {
							this.colModel = new Ext.grid.ColumnModel(
									this.columns);
							delete this.columns
						}
						if (this.ds) {
							this.store = this.ds;
							delete this.ds
						}
						if (this.cm) {
							this.colModel = this.cm;
							delete this.cm
						}
						if (this.sm) {
							this.selModel = this.sm;
							delete this.sm
						}
						this.store = Ext.StoreMgr.lookup(this.store);
						this.addEvents("click", "dblclick", "contextmenu",
								"mousedown", "mouseup", "mouseover",
								"mouseout", "keypress", "keydown",
								"cellmousedown", "rowmousedown",
								"headermousedown", "cellclick", "celldblclick",
								"rowclick", "rowdblclick", "headerclick",
								"headerdblclick", "rowcontextmenu",
								"cellcontextmenu", "headercontextmenu",
								"bodyscroll", "columnresize", "columnmove",
								"sortchange", "reconfigure")
					},
					onRender : function(d, a) {
						Ext.grid.GridPanel.superclass.onRender.apply(this,
								arguments);
						var e = this.body;
						this.el.addClass("x-grid-panel");
						var b = this.getView();
						b.init(this);
						this.mon(e, {
							mousedown : this.onMouseDown,
							click : this.onClick,
							dblclick : this.onDblClick,
							contextmenu : this.onContextMenu,
							keydown : this.onKeyDown,
							scope : this
						});
						this.relayEvents(e, [ "mousedown", "mouseup",
								"mouseover", "mouseout", "keypress" ]);
						this.getSelectionModel().init(this);
						this.view.render()
					},
					initEvents : function() {
						Ext.grid.GridPanel.superclass.initEvents.call(this);
						if (this.loadMask) {
							this.loadMask = new Ext.LoadMask(this.bwrap, Ext
									.apply( {
										store : this.store
									}, this.loadMask))
						}
					},
					initStateEvents : function() {
						Ext.grid.GridPanel.superclass.initStateEvents
								.call(this);
						this.mon(this.colModel, "hiddenchange", this.saveState,
								this, {
									delay : 100
								})
					},
					applyState : function(h) {
						var b = this.colModel;
						var g = h.columns;
						if (g) {
							for ( var d = 0, a = g.length; d < a; d++) {
								var e = g[d];
								var k = b.getColumnById(e.id);
								if (k) {
									k.hidden = e.hidden;
									k.width = e.width;
									var j = b.getIndexById(e.id);
									if (j != d) {
										b.moveColumn(j, d)
									}
								}
							}
						}
						if (h.sort && this.store) {
							this.store[this.store.remoteSort ? "setDefaultSort"
									: "sort"](h.sort.field, h.sort.direction)
						}
						delete h.columns;
						delete h.sort;
						Ext.grid.GridPanel.superclass.applyState.call(this, h)
					},
					getState : function() {
						var d = {
							columns : []
						};
						for ( var b = 0, e; (e = this.colModel.config[b]); b++) {
							d.columns[b] = {
								id : e.id,
								width : e.width
							};
							if (e.hidden) {
								d.columns[b].hidden = true
							}
						}
						if (this.store) {
							var a = this.store.getSortState();
							if (a) {
								d.sort = a
							}
						}
						return d
					},
					afterRender : function() {
						Ext.grid.GridPanel.superclass.afterRender.call(this);
						this.view.layout();
						if (this.deferRowRender) {
							this.view.afterRender.defer(10, this.view)
						} else {
							this.view.afterRender()
						}
						this.viewReady = true
					},
					reconfigure : function(a, b) {
						if (this.loadMask) {
							this.loadMask.destroy();
							this.loadMask = new Ext.LoadMask(this.bwrap, Ext
									.apply( {}, {
										store : a
									}, this.initialConfig.loadMask))
						}
						this.view.initData(a, b);
						this.store = a;
						this.colModel = b;
						if (this.rendered) {
							this.view.refresh(true)
						}
						this.fireEvent("reconfigure", this, a, b)
					},
					onKeyDown : function(a) {
						this.fireEvent("keydown", a)
					},
					onDestroy : function() {
						if (this.rendered) {
							var a = this.body;
							a.removeAllListeners();
							a.update("");
							Ext.destroy(this.view, this.loadMask)
						} else {
							if (this.store && this.store.autoDestroy) {
								this.store.destroy()
							}
						}
						Ext.destroy(this.colModel, this.selModel);
						this.store = this.selModel = this.colModel = this.view = this.loadMask = null;
						Ext.grid.GridPanel.superclass.onDestroy.call(this)
					},
					processEvent : function(c, g) {
						this.fireEvent(c, g);
						var d = g.getTarget();
						var b = this.view;
						var i = b.findHeaderIndex(d);
						if (i !== false) {
							this.fireEvent("header" + c, this, i, g)
						} else {
							var h = b.findRowIndex(d);
							var a = b.findCellIndex(d);
							if (h !== false) {
								this.fireEvent("row" + c, this, h, g);
								if (a !== false) {
									this.fireEvent("cell" + c, this, h, a, g)
								}
							}
						}
					},
					onClick : function(a) {
						this.processEvent("click", a)
					},
					onMouseDown : function(a) {
						this.processEvent("mousedown", a)
					},
					onContextMenu : function(b, a) {
						this.processEvent("contextmenu", b)
					},
					onDblClick : function(a) {
						this.processEvent("dblclick", a)
					},
					walkCells : function(k, c, b, e, j) {
						var i = this.colModel, g = i.getColumnCount();
						var a = this.store, h = a.getCount(), d = true;
						if (b < 0) {
							if (c < 0) {
								k--;
								d = false
							}
							while (k >= 0) {
								if (!d) {
									c = g - 1
								}
								d = false;
								while (c >= 0) {
									if (e.call(j || this, k, c, i) === true) {
										return [ k, c ]
									}
									c--
								}
								k--
							}
						} else {
							if (c >= g) {
								k++;
								d = false
							}
							while (k < h) {
								if (!d) {
									c = 0
								}
								d = false;
								while (c < g) {
									if (e.call(j || this, k, c, i) === true) {
										return [ k, c ]
									}
									c++
								}
								k++
							}
						}
						return null
					},
					onResize : function() {
						Ext.grid.GridPanel.superclass.onResize.apply(this,
								arguments);
						if (this.viewReady) {
							this.view.layout()
						}
					},
					getGridEl : function() {
						return this.body
					},
					stopEditing : Ext.emptyFn,
					getSelectionModel : function() {
						if (!this.selModel) {
							this.selModel = new Ext.grid.RowSelectionModel(
									this.disableSelection ? {
										selectRow : Ext.emptyFn
									} : null)
						}
						return this.selModel
					},
					getStore : function() {
						return this.store
					},
					getColumnModel : function() {
						return this.colModel
					},
					getView : function() {
						if (!this.view) {
							this.view = new Ext.grid.GridView(this.viewConfig)
						}
						return this.view
					},
					getDragDropText : function() {
						var a = this.selModel.getCount();
						return String.format(this.ddText, a, a == 1 ? "" : "s")
					}
				});
Ext.reg("grid", Ext.grid.GridPanel);
Ext.grid.GridView = function(a) {
	Ext.apply(this, a);
	this.addEvents("beforerowremoved", "beforerowsinserted", "beforerefresh",
			"rowremoved", "rowsinserted", "rowupdated", "refresh");
	Ext.grid.GridView.superclass.constructor.call(this)
};
Ext
		.extend(
				Ext.grid.GridView,
				Ext.util.Observable,
				{
					deferEmptyText : true,
					scrollOffset : 19,
					autoFill : false,
					forceFit : false,
					sortClasses : [ "sort-asc", "sort-desc" ],
					sortAscText : "Sort Ascending",
					sortDescText : "Sort Descending",
					columnsText : "Columns",
					selectedRowClass : "x-grid3-row-selected",
					borderWidth : 2,
					tdClass : "x-grid3-cell",
					hdCls : "x-grid3-hd",
					markDirty : true,
					cellSelectorDepth : 4,
					rowSelectorDepth : 10,
					cellSelector : "td.x-grid3-cell",
					rowSelector : "div.x-grid3-row",
					firstRowCls : "x-grid3-row-first",
					lastRowCls : "x-grid3-row-last",
					rowClsRe : /(?:^|\s+)x-grid3-row-(first|last|alt)(?:\s+|$)/g,
					initTemplates : function() {
						var c = this.templates || {};
						if (!c.master) {
							c.master = new Ext.Template(
									'<div class="x-grid3" hidefocus="true">',
									'<div class="x-grid3-viewport">',
									'<div class="x-grid3-header"><div class="x-grid3-header-inner"><div class="x-grid3-header-offset" style="{ostyle}">{header}</div></div><div class="x-clear"></div></div>',
									'<div class="x-grid3-scroller"><div class="x-grid3-body" style="{bstyle}">{body}</div><a href="#" class="x-grid3-focus" tabIndex="-1"></a></div>',
									"</div>",
									'<div class="x-grid3-resize-marker">&#160;</div>',
									'<div class="x-grid3-resize-proxy">&#160;</div>',
									"</div>")
						}
						if (!c.header) {
							c.header = new Ext.Template(
									'<table border="0" cellspacing="0" cellpadding="0" style="{tstyle}">',
									'<thead><tr class="x-grid3-hd-row">{cells}</tr></thead>',
									"</table>")
						}
						if (!c.hcell) {
							c.hcell = new Ext.Template(
									'<td class="x-grid3-hd x-grid3-cell x-grid3-td-{id} {css}" style="{style}"><div {tooltip} {attr} class="x-grid3-hd-inner x-grid3-hd-{id}" unselectable="on" style="{istyle}">',
									this.grid.enableHdMenu ? '<a class="x-grid3-hd-btn" href="#"></a>'
											: "",
									'{value}<img class="x-grid3-sort-icon" src="',
									Ext.BLANK_IMAGE_URL, '" />', "</div></td>")
						}
						if (!c.body) {
							c.body = new Ext.Template("{rows}")
						}
						if (!c.row) {
							c.row = new Ext.Template(
									'<div class="x-grid3-row {alt}" style="{tstyle}"><table class="x-grid3-row-table" border="0" cellspacing="0" cellpadding="0" style="{tstyle}">',
									"<tbody><tr>{cells}</tr>",
									(this.enableRowBody ? '<tr class="x-grid3-row-body-tr" style="{bodyStyle}"><td colspan="{cols}" class="x-grid3-body-cell" tabIndex="0" hidefocus="on"><div class="x-grid3-row-body">{body}</div></td></tr>'
											: ""), "</tbody></table></div>")
						}
						if (!c.cell) {
							c.cell = new Ext.Template(
									'<td class="x-grid3-col x-grid3-cell x-grid3-td-{id} {css}" style="{style}" tabIndex="0" {cellAttr}>',
									'<div class="x-grid3-cell-inner x-grid3-col-{id}" unselectable="on" {attr}>{value}</div>',
									"</td>")
						}
						for ( var a in c) {
							var b = c[a];
							if (b && typeof b.compile == "function"
									&& !b.compiled) {
								b.disableFormats = true;
								b.compile()
							}
						}
						this.templates = c;
						this.colRe = new RegExp("x-grid3-td-([^\\s]+)", "")
					},
					fly : function(a) {
						if (!this._flyweight) {
							this._flyweight = new Ext.Element.Flyweight(
									document.body)
						}
						this._flyweight.dom = a;
						return this._flyweight
					},
					getEditorParent : function() {
						return this.scroller.dom
					},
					initElements : function() {
						var c = Ext.Element;
						var b = this.grid.getGridEl().dom.firstChild;
						var a = b.childNodes;
						this.el = new c(b);
						this.mainWrap = new c(a[0]);
						this.mainHd = new c(this.mainWrap.dom.firstChild);
						if (this.grid.hideHeaders) {
							this.mainHd.setDisplayed(false)
						}
						this.innerHd = this.mainHd.dom.firstChild;
						this.scroller = new c(this.mainWrap.dom.childNodes[1]);
						if (this.forceFit) {
							this.scroller.setStyle("overflow-x", "hidden")
						}
						this.mainBody = new c(this.scroller.dom.firstChild);
						this.focusEl = new c(this.scroller.dom.childNodes[1]);
						this.focusEl.swallowEvent("click", true);
						this.resizeMarker = new c(a[1]);
						this.resizeProxy = new c(a[2])
					},
					getRows : function() {
						return this.hasRows() ? this.mainBody.dom.childNodes
								: []
					},
					findCell : function(a) {
						if (!a) {
							return false
						}
						return this.fly(a).findParent(this.cellSelector,
								this.cellSelectorDepth)
					},
					findCellIndex : function(c, b) {
						var a = this.findCell(c);
						if (a && (!b || this.fly(a).hasClass(b))) {
							return this.getCellIndex(a)
						}
						return false
					},
					getCellIndex : function(b) {
						if (b) {
							var a = b.className.match(this.colRe);
							if (a && a[1]) {
								return this.cm.getIndexById(a[1])
							}
						}
						return false
					},
					findHeaderCell : function(b) {
						var a = this.findCell(b);
						return a && this.fly(a).hasClass(this.hdCls) ? a : null
					},
					findHeaderIndex : function(a) {
						return this.findCellIndex(a, this.hdCls)
					},
					findRow : function(a) {
						if (!a) {
							return false
						}
						return this.fly(a).findParent(this.rowSelector,
								this.rowSelectorDepth)
					},
					findRowIndex : function(a) {
						var b = this.findRow(a);
						return b ? b.rowIndex : false
					},
					getRow : function(a) {
						return this.getRows()[a]
					},
					getCell : function(b, a) {
						return this.getRow(b).getElementsByTagName("td")[a]
					},
					getHeaderCell : function(a) {
						return this.mainHd.dom.getElementsByTagName("td")[a]
					},
					addRowClass : function(c, a) {
						var b = this.getRow(c);
						if (b) {
							this.fly(b).addClass(a)
						}
					},
					removeRowClass : function(c, a) {
						var b = this.getRow(c);
						if (b) {
							this.fly(b).removeClass(a)
						}
					},
					removeRow : function(a) {
						Ext.removeNode(this.getRow(a));
						this.syncFocusEl(a)
					},
					removeRows : function(c, a) {
						var b = this.mainBody.dom;
						for ( var d = c; d <= a; d++) {
							Ext.removeNode(b.childNodes[c])
						}
						this.syncFocusEl(c)
					},
					getScrollState : function() {
						var a = this.scroller.dom;
						return {
							left : a.scrollLeft,
							top : a.scrollTop
						}
					},
					restoreScroll : function(a) {
						var b = this.scroller.dom;
						b.scrollLeft = a.left;
						b.scrollTop = a.top
					},
					scrollToTop : function() {
						this.scroller.dom.scrollTop = 0;
						this.scroller.dom.scrollLeft = 0
					},
					syncScroll : function() {
						this.syncHeaderScroll();
						var a = this.scroller.dom;
						this.grid.fireEvent("bodyscroll", a.scrollLeft,
								a.scrollTop)
					},
					syncHeaderScroll : function() {
						var a = this.scroller.dom;
						this.innerHd.scrollLeft = a.scrollLeft;
						this.innerHd.scrollLeft = a.scrollLeft
					},
					updateSortIcon : function(b, a) {
						var d = this.sortClasses;
						var c = this.mainHd.select("td").removeClass(d);
						c.item(b).addClass(d[a == "DESC" ? 1 : 0])
					},
					updateAllColumnWidths : function() {
						var d = this.getTotalWidth(), l = this.cm
								.getColumnCount(), g = [], e, b;
						for (b = 0; b < l; b++) {
							g[b] = this.getColumnWidth(b)
						}
						this.innerHd.firstChild.style.width = this
								.getOffsetWidth();
						this.innerHd.firstChild.firstChild.style.width = d;
						this.mainBody.dom.style.width = d;
						for (b = 0; b < l; b++) {
							var c = this.getHeaderCell(b);
							c.style.width = g[b]
						}
						var k = this.getRows(), m, h;
						for (b = 0, e = k.length; b < e; b++) {
							m = k[b];
							m.style.width = d;
							if (m.firstChild) {
								m.firstChild.style.width = d;
								h = m.firstChild.rows[0];
								for ( var a = 0; a < l; a++) {
									h.childNodes[a].style.width = g[a]
								}
							}
						}
						this.onAllColumnWidthsUpdated(g, d)
					},
					updateColumnWidth : function(b, a) {
						var j = this.getColumnWidth(b);
						var e = this.getTotalWidth();
						this.innerHd.firstChild.style.width = this
								.getOffsetWidth();
						this.innerHd.firstChild.firstChild.style.width = e;
						this.mainBody.dom.style.width = e;
						var d = this.getHeaderCell(b);
						d.style.width = j;
						var h = this.getRows(), k;
						for ( var c = 0, g = h.length; c < g; c++) {
							k = h[c];
							k.style.width = e;
							if (k.firstChild) {
								k.firstChild.style.width = e;
								k.firstChild.rows[0].childNodes[b].style.width = j
							}
						}
						this.onColumnWidthUpdated(b, j, e)
					},
					updateColumnHidden : function(a, e) {
						var d = this.getTotalWidth();
						this.innerHd.firstChild.style.width = this
								.getOffsetWidth();
						this.innerHd.firstChild.firstChild.style.width = d;
						this.mainBody.dom.style.width = d;
						var h = e ? "none" : "";
						var c = this.getHeaderCell(a);
						c.style.display = h;
						var j = this.getRows(), k;
						for ( var b = 0, g = j.length; b < g; b++) {
							k = j[b];
							k.style.width = d;
							if (k.firstChild) {
								k.firstChild.style.width = d;
								k.firstChild.rows[0].childNodes[a].style.display = h
							}
						}
						this.onColumnHiddenUpdated(a, e, d);
						delete this.lastViewWidth;
						this.layout()
					},
					doRender : function(g, k, s, a, q, w) {
						var b = this.templates, e = b.cell, h = b.row, l = q - 1;
						var d = "width:" + this.getTotalWidth() + ";";
						var z = [], t, A, u = {}, m = {
							tstyle : d
						}, o;
						for ( var v = 0, y = k.length; v < y; v++) {
							o = k[v];
							t = [];
							var n = (v + a);
							for ( var x = 0; x < q; x++) {
								A = g[x];
								u.id = A.id;
								u.css = x === 0 ? "x-grid3-cell-first "
										: (x == l ? "x-grid3-cell-last " : "");
								u.attr = u.cellAttr = "";
								u.value = A.renderer(o.data[A.name], u, o, n,
										x, s);
								u.style = A.style;
								if (Ext.isEmpty(u.value)) {
									u.value = "&#160;"
								}
								if (this.markDirty
										&& o.dirty
										&& typeof o.modified[A.name] !== "undefined") {
									u.css += " x-grid3-dirty-cell"
								}
								t[t.length] = e.apply(u)
							}
							var B = [];
							if (w && ((n + 1) % 2 === 0)) {
								B[0] = "x-grid3-row-alt"
							}
							if (o.dirty) {
								B[1] = " x-grid3-dirty-row"
							}
							m.cols = q;
							if (this.getRowClass) {
								B[2] = this.getRowClass(o, n, m, s)
							}
							m.alt = B.join(" ");
							m.cells = t.join("");
							z[z.length] = h.apply(m)
						}
						return z.join("")
					},
					processRows : function(a, c) {
						if (!this.ds || this.ds.getCount() < 1) {
							return
						}
						var b = this.getRows();
						c = c || !this.grid.stripeRows;
						a = a || 0;
						Ext.each(b, function(e, d) {
							e.rowIndex = d;
							e.className = e.className.replace(this.rowClsRe,
									" ");
							if (!c && (d + 1) % 2 === 0) {
								e.className += " x-grid3-row-alt"
							}
						});
						if (a === 0) {
							Ext.fly(b[0]).addClass(this.firstRowCls)
						}
						Ext.fly(b[b.length - 1]).addClass(this.lastRowCls)
					},
					afterRender : function() {
						if (!this.ds || !this.cm) {
							return
						}
						this.mainBody.dom.innerHTML = this.renderRows()
								|| "&#160;";
						this.processRows(0, true);
						if (this.deferEmptyText !== true) {
							this.applyEmptyText()
						}
					},
					renderUI : function() {
						var d = this.renderHeaders();
						var a = this.templates.body.apply( {
							rows : "&#160;"
						});
						var b = this.templates.master.apply( {
							body : a,
							header : d,
							ostyle : "width:" + this.getOffsetWidth() + ";",
							bstyle : "width:" + this.getTotalWidth() + ";"
						});
						var c = this.grid;
						c.getGridEl().dom.innerHTML = b;
						this.initElements();
						Ext.fly(this.innerHd).on("click", this.handleHdDown,
								this);
						this.mainHd.on( {
							scope : this,
							mouseover : this.handleHdOver,
							mouseout : this.handleHdOut,
							mousemove : this.handleHdMove
						});
						this.scroller.on("scroll", this.syncScroll, this);
						if (c.enableColumnResize !== false) {
							this.splitZone = new Ext.grid.GridView.SplitDragZone(
									c, this.mainHd.dom)
						}
						if (c.enableColumnMove) {
							this.columnDrag = new Ext.grid.GridView.ColumnDragZone(
									c, this.innerHd);
							this.columnDrop = new Ext.grid.HeaderDropZone(c,
									this.mainHd.dom)
						}
						if (c.enableHdMenu !== false) {
							this.hmenu = new Ext.menu.Menu( {
								id : c.id + "-hctx"
							});
							this.hmenu.add( {
								itemId : "asc",
								text : this.sortAscText,
								cls : "xg-hmenu-sort-asc"
							}, {
								itemId : "desc",
								text : this.sortDescText,
								cls : "xg-hmenu-sort-desc"
							});
							if (c.enableColumnHide !== false) {
								this.colMenu = new Ext.menu.Menu( {
									id : c.id + "-hcols-menu"
								});
								this.colMenu.on( {
									scope : this,
									beforeshow : this.beforeColMenuShow,
									itemclick : this.handleHdMenuClick
								});
								this.hmenu.add("-", {
									itemId : "columns",
									hideOnClick : false,
									text : this.columnsText,
									menu : this.colMenu,
									iconCls : "x-cols-icon"
								})
							}
							this.hmenu.on("itemclick", this.handleHdMenuClick,
									this)
						}
						if (c.trackMouseOver) {
							this.mainBody.on( {
								scope : this,
								mouseover : this.onRowOver,
								mouseout : this.onRowOut
							})
						}
						if (c.enableDragDrop || c.enableDrag) {
							this.dragZone = new Ext.grid.GridDragZone(c, {
								ddGroup : c.ddGroup || "GridDD"
							})
						}
						this.updateHeaderSortState()
					},
					layout : function() {
						if (!this.mainBody) {
							return
						}
						var d = this.grid;
						var i = d.getGridEl();
						var a = i.getSize(true);
						var b = a.width;
						if (!d.hideHeaders && (b < 20 || a.height < 20)) {
							return
						}
						if (d.autoHeight) {
							this.scroller.dom.style.overflow = "visible";
							if (Ext.isWebKit) {
								this.scroller.dom.style.position = "static"
							}
						} else {
							this.el.setSize(a.width, a.height);
							var h = this.mainHd.getHeight();
							var e = a.height - (h);
							this.scroller.setSize(b, e);
							if (this.innerHd) {
								this.innerHd.style.width = (b) + "px"
							}
						}
						if (this.forceFit) {
							if (this.lastViewWidth != b) {
								this.fitColumns(false, false);
								this.lastViewWidth = b
							}
						} else {
							this.autoExpand();
							this.syncHeaderScroll()
						}
						this.onLayout(b, e)
					},
					onLayout : function(a, b) {
					},
					onColumnWidthUpdated : function(c, a, b) {
					},
					onAllColumnWidthsUpdated : function(a, b) {
					},
					onColumnHiddenUpdated : function(b, c, a) {
					},
					updateColumnText : function(a, b) {
					},
					afterMove : function(a) {
					},
					init : function(a) {
						this.grid = a;
						this.initTemplates();
						this.initData(a.store, a.colModel);
						this.initUI(a)
					},
					getColumnId : function(a) {
						return this.cm.getColumnId(a)
					},
					getOffsetWidth : function() {
						return (this.cm.getTotalWidth() + this.scrollOffset)
								+ "px"
					},
					renderHeaders : function() {
						var c = this.cm, h = this.templates, e = h.hcell, b = [], j = {}, a = c
								.getColumnCount(), g = a - 1;
						for ( var d = 0; d < a; d++) {
							j.id = c.getColumnId(d);
							j.value = c.getColumnHeader(d) || "";
							j.style = this.getColumnStyle(d, true);
							j.tooltip = this.getColumnTooltip(d);
							j.css = d === 0 ? "x-grid3-cell-first "
									: (d == g ? "x-grid3-cell-last " : "");
							if (c.config[d].align == "right") {
								j.istyle = "padding-right:16px"
							} else {
								delete j.istyle
							}
							b[b.length] = e.apply(j)
						}
						return h.header.apply( {
							cells : b.join(""),
							tstyle : "width:" + this.getTotalWidth() + ";"
						})
					},
					getColumnTooltip : function(a) {
						var b = this.cm.getColumnTooltip(a);
						if (b) {
							if (Ext.QuickTips.isEnabled()) {
								return 'ext:qtip="' + b + '"'
							} else {
								return 'title="' + b + '"'
							}
						}
						return ""
					},
					beforeUpdate : function() {
						this.grid.stopEditing(true)
					},
					updateHeaders : function() {
						this.innerHd.firstChild.innerHTML = this
								.renderHeaders();
						this.innerHd.firstChild.style.width = this
								.getOffsetWidth();
						this.innerHd.firstChild.firstChild.style.width = this
								.getTotalWidth()
					},
					focusRow : function(a) {
						this.focusCell(a, 0, false)
					},
					focusCell : function(c, a, b) {
						this.syncFocusEl(this.ensureVisible(c, a, b));
						if (Ext.isGecko) {
							this.focusEl.focus()
						} else {
							this.focusEl.focus.defer(1, this.focusEl)
						}
					},
					resolveCell : function(h, d, g) {
						if (typeof h != "number") {
							h = h.rowIndex
						}
						if (!this.ds) {
							return null
						}
						if (h < 0 || h >= this.ds.getCount()) {
							return null
						}
						d = (d !== undefined ? d : 0);
						var c = this.getRow(h), a = this.cm, e = a
								.getColumnCount(), b;
						if (!(g === false && d === 0)) {
							while (d < e && a.isHidden(d)) {
								d++
							}
							b = this.getCell(h, d)
						}
						return {
							row : c,
							cell : b
						}
					},
					getResolvedXY : function(a) {
						if (!a) {
							return null
						}
						var b = this.scroller.dom, e = a.cell, d = a.row;
						return e ? Ext.fly(e).getXY() : [ this.el.getX(),
								Ext.fly(d).getY() ]
					},
					syncFocusEl : function(d, a, c) {
						var b = d;
						if (!Ext.isArray(b)) {
							d = Math.min(d, Math.max(0,
									this.getRows().length - 1));
							b = this.getResolvedXY(this.resolveCell(d, a, c))
						}
						this.focusEl.setXY(b || this.scroller.getXY())
					},
					ensureVisible : function(t, g, e) {
						var r = this.resolveCell(t, g, e);
						if (!r || !r.row) {
							return
						}
						var k = r.row, h = r.cell, n = this.scroller.dom, s = 0, d = k, o = this.el.dom;
						while (d && d != o) {
							s += d.offsetTop;
							d = d.offsetParent
						}
						s -= this.mainHd.dom.offsetHeight;
						var q = s + k.offsetHeight, a = n.clientHeight, m = o
								+ a;
						o = parseInt(n.scrollTop, 10);
						if (s < o) {
							n.scrollTop = s
						} else {
							if (q > m) {
								n.scrollTop = q - a
							}
						}
						if (e !== false) {
							var l = parseInt(h.offsetLeft, 10);
							var j = l + h.offsetWidth;
							var i = parseInt(n.scrollLeft, 10);
							var b = i + n.clientWidth;
							if (l < i) {
								n.scrollLeft = l
							} else {
								if (j > b) {
									n.scrollLeft = j - n.clientWidth
								}
							}
						}
						return this.getResolvedXY(r)
					},
					insertRows : function(a, i, e, h) {
						var d = a.getCount() - 1;
						if (!h && i === 0 && e >= d) {
							this.refresh()
						} else {
							if (!h) {
								this
										.fireEvent("beforerowsinserted", this,
												i, e)
							}
							var b = this.renderRows(i, e), g = this.getRow(i);
							if (g) {
								if (i === 0) {
									Ext.fly(this.getRow(0)).removeClass(
											this.firstRowCls)
								}
								Ext.DomHelper.insertHtml("beforeBegin", g, b)
							} else {
								var c = this.getRow(d - 1);
								if (c) {
									Ext.fly(c).removeClass(this.lastRowCls)
								}
								Ext.DomHelper.insertHtml("beforeEnd",
										this.mainBody.dom, b)
							}
							if (!h) {
								this.fireEvent("rowsinserted", this, i, e);
								this.processRows(i)
							} else {
								if (i === 0 || i >= d) {
									Ext.fly(this.getRow(i)).addClass(
											i === 0 ? this.firstRowCls
													: this.lastRowCls)
								}
							}
						}
						this.syncFocusEl(i)
					},
					deleteRows : function(a, c, b) {
						if (a.getRowCount() < 1) {
							this.refresh()
						} else {
							this.fireEvent("beforerowsdeleted", this, c, b);
							this.removeRows(c, b);
							this.processRows(c);
							this.fireEvent("rowsdeleted", this, c, b)
						}
					},
					getColumnStyle : function(a, c) {
						var b = !c ? (this.cm.config[a].css || "") : "";
						b += "width:" + this.getColumnWidth(a) + ";";
						if (this.cm.isHidden(a)) {
							b += "display:none;"
						}
						var d = this.cm.config[a].align;
						if (d) {
							b += "text-align:" + d + ";"
						}
						return b
					},
					getColumnWidth : function(b) {
						var a = this.cm.getColumnWidth(b);
						if (typeof a == "number") {
							return (Ext.isBorderBox ? a
									: (a - this.borderWidth > 0 ? a
											- this.borderWidth : 0))
									+ "px"
						}
						return a
					},
					getTotalWidth : function() {
						return this.cm.getTotalWidth() + "px"
					},
					fitColumns : function(d, h, j) {
						var q = this.cm, k;
						var l = q.getTotalWidth(false);
						var a = this.grid.getGridEl().getWidth(true)
								- this.scrollOffset;
						if (a < 20) {
							return
						}
						var e = a - l;
						if (e === 0) {
							return false
						}
						var m = q.getColumnCount(true);
						var s = m - (typeof j == "number" ? 1 : 0);
						if (s === 0) {
							s = 1;
							j = undefined
						}
						var r = q.getColumnCount();
						var o = [];
						var n = 0;
						var c = 0;
						var p;
						for (k = 0; k < r; k++) {
							if (!q.isHidden(k) && !q.isFixed(k) && k !== j) {
								p = q.getColumnWidth(k);
								o.push(k);
								n = k;
								o.push(p);
								c += p
							}
						}
						var b = (a - q.getTotalWidth()) / c;
						while (o.length) {
							p = o.pop();
							k = o.pop();
							q.setColumnWidth(k, Math.max(
									this.grid.minColumnWidth, Math.floor(p + p
											* b)), true)
						}
						if ((l = q.getTotalWidth(false)) > a) {
							var g = s != m ? j : n;
							q.setColumnWidth(g, Math.max(1, q.getColumnWidth(g)
									- (l - a)), true)
						}
						if (d !== true) {
							this.updateAllColumnWidths()
						}
						return true
					},
					autoExpand : function(b) {
						var i = this.grid, a = this.cm;
						if (!this.userResized && i.autoExpandColumn) {
							var d = a.getTotalWidth(false);
							var j = this.grid.getGridEl().getWidth(true)
									- this.scrollOffset;
							if (d != j) {
								var h = a.getIndexById(i.autoExpandColumn);
								var e = a.getColumnWidth(h);
								var c = Math.min(Math.max(((j - d) + e),
										i.autoExpandMin), i.autoExpandMax);
								if (c != e) {
									a.setColumnWidth(h, c, true);
									if (b !== true) {
										this.updateColumnWidth(h, c)
									}
								}
							}
						}
					},
					getColumnData : function() {
						var d = [], a = this.cm, e = a.getColumnCount();
						for ( var c = 0; c < e; c++) {
							var b = a.getDataIndex(c);
							d[c] = {
								name : (typeof b == "undefined" ? this.ds.fields
										.get(c).name
										: b),
								renderer : a.getRenderer(c),
								id : a.getColumnId(c),
								style : this.getColumnStyle(c)
							}
						}
						return d
					},
					renderRows : function(j, c) {
						var d = this.grid, h = d.colModel, a = d.store, k = d.stripeRows;
						var i = h.getColumnCount();
						if (a.getCount() < 1) {
							return ""
						}
						var e = this.getColumnData();
						j = j || 0;
						c = typeof c == "undefined" ? a.getCount() - 1 : c;
						var b = a.getRange(j, c);
						return this.doRender(e, b, a, j, i, k)
					},
					renderBody : function() {
						var a = this.renderRows() || "&#160;";
						return this.templates.body.apply( {
							rows : a
						})
					},
					refreshRow : function(a) {
						var c = this.ds, b;
						if (typeof a == "number") {
							b = a;
							a = c.getAt(b);
							if (!a) {
								return
							}
						} else {
							b = c.indexOf(a);
							if (b < 0) {
								return
							}
						}
						this.insertRows(c, b, b, true);
						this.getRow(b).rowIndex = b;
						this.onRemove(c, a, b + 1, true);
						this.fireEvent("rowupdated", this, b, a)
					},
					refresh : function(b) {
						this.fireEvent("beforerefresh", this);
						this.grid.stopEditing(true);
						var a = this.renderBody();
						this.mainBody.update(a).setWidth(this.getTotalWidth());
						if (b === true) {
							this.updateHeaders();
							this.updateHeaderSortState()
						}
						this.processRows(0, true);
						this.layout();
						this.applyEmptyText();
						this.fireEvent("refresh", this)
					},
					applyEmptyText : function() {
						if (this.emptyText && !this.hasRows()) {
							this.mainBody.update('<div class="x-grid-empty">'
									+ this.emptyText + "</div>")
						}
					},
					updateHeaderSortState : function() {
						var b = this.ds.getSortState();
						if (!b) {
							return
						}
						if (!this.sortState
								|| (this.sortState.field != b.field || this.sortState.direction != b.direction)) {
							this.grid.fireEvent("sortchange", this.grid, b)
						}
						this.sortState = b;
						var c = this.cm.findColumnIndex(b.field);
						if (c != -1) {
							var a = b.direction;
							this.updateSortIcon(c, a)
						}
					},
					destroy : function() {
						if (this.colMenu) {
							Ext.menu.MenuMgr.unregister(this.colMenu);
							this.colMenu.destroy();
							delete this.colMenu
						}
						if (this.hmenu) {
							Ext.menu.MenuMgr.unregister(this.hmenu);
							this.hmenu.destroy();
							delete this.hmenu
						}
						if (this.grid.enableColumnMove) {
							var c = Ext.dd.DDM.ids["gridHeader"
									+ this.grid.getGridEl().id];
							if (c) {
								for ( var a in c) {
									if (!c[a].config.isTarget && c[a].dragElId) {
										var b = c[a].dragElId;
										c[a].unreg();
										Ext.get(b).remove()
									} else {
										if (c[a].config.isTarget) {
											c[a].proxyTop.remove();
											c[a].proxyBottom.remove();
											c[a].unreg()
										}
									}
									if (Ext.dd.DDM.locationCache[a]) {
										delete Ext.dd.DDM.locationCache[a]
									}
								}
								delete Ext.dd.DDM.ids["gridHeader"
										+ this.grid.getGridEl().id]
							}
						}
						if (this.dragZone) {
							this.dragZone.unreg()
						}
						Ext.fly(this.innerHd).removeAllListeners();
						Ext.removeNode(this.innerHd);
						Ext.destroy(this.resizeMarker, this.resizeProxy,
								this.focusEl, this.mainBody, this.scroller,
								this.mainHd, this.mainWrap, this.dragZone,
								this.splitZone, this.columnDrag,
								this.columnDrop);
						this.initData(null, null);
						Ext.EventManager.removeResizeListener(
								this.onWindowResize, this);
						this.purgeListeners()
					},
					onDenyColumnHide : function() {
					},
					render : function() {
						if (this.autoFill) {
							var a = this.grid.ownerCt;
							if (a && a.getLayout()) {
								a.on("afterlayout", function() {
									this.fitColumns(true, true);
									this.updateHeaders()
								}, this, {
									single : true
								})
							} else {
								this.fitColumns(true, true)
							}
						} else {
							if (this.forceFit) {
								this.fitColumns(true, false)
							} else {
								if (this.grid.autoExpandColumn) {
									this.autoExpand(true)
								}
							}
						}
						this.renderUI()
					},
					initData : function(b, a) {
						if (this.ds) {
							this.ds.un("load", this.onLoad, this);
							this.ds.un("datachanged", this.onDataChange, this);
							this.ds.un("add", this.onAdd, this);
							this.ds.un("remove", this.onRemove, this);
							this.ds.un("update", this.onUpdate, this);
							this.ds.un("clear", this.onClear, this);
							if (this.ds !== b && this.ds.autoDestroy) {
								this.ds.destroy()
							}
						}
						if (b) {
							b.on( {
								scope : this,
								load : this.onLoad,
								datachanged : this.onDataChange,
								add : this.onAdd,
								remove : this.onRemove,
								update : this.onUpdate,
								clear : this.onClear
							})
						}
						this.ds = b;
						if (this.cm) {
							this.cm.un("configchange", this.onColConfigChange,
									this);
							this.cm.un("widthchange", this.onColWidthChange,
									this);
							this.cm.un("headerchange", this.onHeaderChange,
									this);
							this.cm.un("hiddenchange", this.onHiddenChange,
									this);
							this.cm.un("columnmoved", this.onColumnMove, this)
						}
						if (a) {
							delete this.lastViewWidth;
							a.on( {
								scope : this,
								configchange : this.onColConfigChange,
								widthchange : this.onColWidthChange,
								headerchange : this.onHeaderChange,
								hiddenchange : this.onHiddenChange,
								columnmoved : this.onColumnMove
							})
						}
						this.cm = a
					},
					onDataChange : function() {
						this.refresh();
						this.updateHeaderSortState();
						this.syncFocusEl(0)
					},
					onClear : function() {
						this.refresh();
						this.syncFocusEl(0)
					},
					onUpdate : function(b, a) {
						this.refreshRow(a)
					},
					onAdd : function(c, a, b) {
						this.insertRows(c, b, b + (a.length - 1))
					},
					onRemove : function(d, a, b, c) {
						if (c !== true) {
							this.fireEvent("beforerowremoved", this, b, a)
						}
						this.removeRow(b);
						if (c !== true) {
							this.processRows(b);
							this.applyEmptyText();
							this.fireEvent("rowremoved", this, b, a)
						}
					},
					onLoad : function() {
						this.scrollToTop()
					},
					onColWidthChange : function(a, b, c) {
						this.updateColumnWidth(b, c)
					},
					onHeaderChange : function(a, b, c) {
						this.updateHeaders()
					},
					onHiddenChange : function(a, b, c) {
						this.updateColumnHidden(b, c)
					},
					onColumnMove : function(a, d, b) {
						this.indexMap = null;
						var c = this.getScrollState();
						this.refresh(true);
						this.restoreScroll(c);
						this.afterMove(b);
						this.grid.fireEvent("columnmove", d, b)
					},
					onColConfigChange : function() {
						delete this.lastViewWidth;
						this.indexMap = null;
						this.refresh(true)
					},
					initUI : function(a) {
						a.on("headerclick", this.onHeaderClick, this)
					},
					initEvents : function() {
					},
					onHeaderClick : function(b, a) {
						if (this.headersDisabled || !this.cm.isSortable(a)) {
							return
						}
						b.stopEditing(true);
						b.store.sort(this.cm.getDataIndex(a))
					},
					onRowOver : function(b, a) {
						var c;
						if ((c = this.findRowIndex(a)) !== false) {
							this.addRowClass(c, "x-grid3-row-over")
						}
					},
					onRowOut : function(b, a) {
						var c;
						if ((c = this.findRowIndex(a)) !== false
								&& !b.within(this.getRow(c), true)) {
							this.removeRowClass(c, "x-grid3-row-over")
						}
					},
					handleWheel : function(a) {
						a.stopPropagation()
					},
					onRowSelect : function(a) {
						this.addRowClass(a, this.selectedRowClass)
					},
					onRowDeselect : function(a) {
						this.removeRowClass(a, this.selectedRowClass)
					},
					onCellSelect : function(c, b) {
						var a = this.getCell(c, b);
						if (a) {
							this.fly(a).addClass("x-grid3-cell-selected")
						}
					},
					onCellDeselect : function(c, b) {
						var a = this.getCell(c, b);
						if (a) {
							this.fly(a).removeClass("x-grid3-cell-selected")
						}
					},
					onColumnSplitterMoved : function(c, b) {
						this.userResized = true;
						var a = this.grid.colModel;
						a.setColumnWidth(c, b, true);
						if (this.forceFit) {
							this.fitColumns(true, false, c);
							this.updateAllColumnWidths()
						} else {
							this.updateColumnWidth(c, b);
							this.syncHeaderScroll()
						}
						this.grid.fireEvent("columnresize", c, b)
					},
					handleHdMenuClick : function(c) {
						var b = this.hdCtxIndex;
						var a = this.cm, d = this.ds;
						switch (c.itemId) {
						case "asc":
							d.sort(a.getDataIndex(b), "ASC");
							break;
						case "desc":
							d.sort(a.getDataIndex(b), "DESC");
							break;
						default:
							b = a.getIndexById(c.itemId.substr(4));
							if (b != -1) {
								if (c.checked
										&& a.getColumnsBy(
												this.isHideableColumn, this).length <= 1) {
									this.onDenyColumnHide();
									return false
								}
								a.setHidden(b, c.checked)
							}
						}
						return true
					},
					isHideableColumn : function(a) {
						return !a.hidden && !a.fixed
					},
					beforeColMenuShow : function() {
						var a = this.cm, c = a.getColumnCount();
						this.colMenu.removeAll();
						for ( var b = 0; b < c; b++) {
							if (a.config[b].fixed !== true
									&& a.config[b].hideable !== false) {
								this.colMenu.add(new Ext.menu.CheckItem( {
									itemId : "col-" + a.getColumnId(b),
									text : a.getColumnHeader(b),
									checked : !a.isHidden(b),
									hideOnClick : false,
									disabled : a.config[b].hideable === false
								}))
							}
						}
					},
					handleHdDown : function(h, d) {
						if (Ext.fly(d).hasClass("x-grid3-hd-btn")) {
							h.stopEvent();
							var g = this.findHeaderCell(d);
							Ext.fly(g).addClass("x-grid3-hd-menu-open");
							var c = this.getCellIndex(g);
							this.hdCtxIndex = c;
							var b = this.hmenu.items, a = this.cm;
							b.get("asc").setDisabled(!a.isSortable(c));
							b.get("desc").setDisabled(!a.isSortable(c));
							this.hmenu.on("hide", function() {
								Ext.fly(g).removeClass("x-grid3-hd-menu-open")
							}, this, {
								single : true
							});
							this.hmenu.show(d, "tl-bl?")
						}
					},
					handleHdOver : function(d, a) {
						var c = this.findHeaderCell(a);
						if (c && !this.headersDisabled) {
							this.activeHd = c;
							this.activeHdIndex = this.getCellIndex(c);
							var b = this.fly(c);
							this.activeHdRegion = b.getRegion();
							if (!this.cm.isMenuDisabled(this.activeHdIndex)) {
								b.addClass("x-grid3-hd-over");
								this.activeHdBtn = b.child(".x-grid3-hd-btn");
								if (this.activeHdBtn) {
									this.activeHdBtn.dom.style.height = (c.firstChild.offsetHeight - 1)
											+ "px"
								}
							}
						}
					},
					handleHdMove : function(h, d) {
						if (this.activeHd && !this.headersDisabled) {
							var b = this.splitHandleWidth || 5;
							var g = this.activeHdRegion;
							var a = h.getPageX();
							var c = this.activeHd.style;
							if (a - g.left <= b
									&& this.cm
											.isResizable(this.activeHdIndex - 1)) {
								c.cursor = Ext.isAir ? "move"
										: Ext.isWebKit ? "e-resize"
												: "col-resize"
							} else {
								if (g.right - a <= (!this.activeHdBtn ? b : 2)
										&& this.cm
												.isResizable(this.activeHdIndex)) {
									c.cursor = Ext.isAir ? "move"
											: Ext.isWebKit ? "w-resize"
													: "col-resize"
								} else {
									c.cursor = ""
								}
							}
						}
					},
					handleHdOut : function(c, a) {
						var b = this.findHeaderCell(a);
						if (b && (!Ext.isIE || !c.within(b, true))) {
							this.activeHd = null;
							this.fly(b).removeClass("x-grid3-hd-over");
							b.style.cursor = ""
						}
					},
					hasRows : function() {
						var a = this.mainBody.dom.firstChild;
						return a && a.nodeType == 1
								&& a.className != "x-grid-empty"
					},
					bind : function(a, b) {
						this.initData(a, b)
					}
				});
Ext.grid.GridView.SplitDragZone = function(a, b) {
	this.grid = a;
	this.view = a.getView();
	this.marker = this.view.resizeMarker;
	this.proxy = this.view.resizeProxy;
	Ext.grid.GridView.SplitDragZone.superclass.constructor.call(this, b,
			"gridSplitters" + this.grid.getGridEl().id, {
				dragElId : Ext.id(this.proxy.dom),
				resizeFrame : false
			});
	this.scroll = false;
	this.hw = this.view.splitHandleWidth || 5
};
Ext.extend(Ext.grid.GridView.SplitDragZone, Ext.dd.DDProxy, {
	b4StartDrag : function(a, e) {
		this.view.headersDisabled = true;
		var d = this.view.mainWrap.getHeight();
		this.marker.setHeight(d);
		this.marker.show();
		this.marker.alignTo(this.view.getHeaderCell(this.cellIndex), "tl-tl", [
				-2, 0 ]);
		this.proxy.setHeight(d);
		var b = this.cm.getColumnWidth(this.cellIndex);
		var c = Math.max(b - this.grid.minColumnWidth, 0);
		this.resetConstraints();
		this.setXConstraint(c, 1000);
		this.setYConstraint(0, 0);
		this.minX = a - c;
		this.maxX = a + 1000;
		this.startPos = a;
		Ext.dd.DDProxy.prototype.b4StartDrag.call(this, a, e)
	},
	handleMouseDown : function(a) {
		var i = this.view.findHeaderCell(a.getTarget());
		if (i) {
			var l = this.view.fly(i).getXY(), d = l[0], c = l[1];
			var j = a.getXY(), b = j[0];
			var h = i.offsetWidth, g = false;
			if ((b - d) <= this.hw) {
				g = -1
			} else {
				if ((d + h) - b <= this.hw) {
					g = 0
				}
			}
			if (g !== false) {
				this.cm = this.grid.colModel;
				var k = this.view.getCellIndex(i);
				if (g == -1) {
					if (k + g < 0) {
						return
					}
					while (this.cm.isHidden(k + g)) {
						--g;
						if (k + g < 0) {
							return
						}
					}
				}
				this.cellIndex = k + g;
				this.split = i.dom;
				if (this.cm.isResizable(this.cellIndex)
						&& !this.cm.isFixed(this.cellIndex)) {
					Ext.grid.GridView.SplitDragZone.superclass.handleMouseDown
							.apply(this, arguments)
				}
			} else {
				if (this.view.columnDrag) {
					this.view.columnDrag.callHandleMouseDown(a)
				}
			}
		}
	},
	endDrag : function(d) {
		this.marker.hide();
		var a = this.view;
		var b = Math.max(this.minX, d.getPageX());
		var c = b - this.startPos;
		a.onColumnSplitterMoved(this.cellIndex, this.cm
				.getColumnWidth(this.cellIndex)
				+ c);
		setTimeout( function() {
			a.headersDisabled = false
		}, 50)
	},
	autoOffset : function() {
		this.setDelta(0, 0)
	}
});
Ext.grid.HeaderDragZone = function(a, c, b) {
	this.grid = a;
	this.view = a.getView();
	this.ddGroup = "gridHeader" + this.grid.getGridEl().id;
	Ext.grid.HeaderDragZone.superclass.constructor.call(this, c);
	if (b) {
		this.setHandleElId(Ext.id(c));
		this.setOuterHandleElId(Ext.id(b))
	}
	this.scroll = false
};
Ext.extend(Ext.grid.HeaderDragZone, Ext.dd.DragZone, {
	maxDragWidth : 120,
	getDragData : function(c) {
		var a = Ext.lib.Event.getTarget(c);
		var b = this.view.findHeaderCell(a);
		if (b) {
			return {
				ddel : b.firstChild,
				header : b
			}
		}
		return false
	},
	onInitDrag : function(a) {
		this.view.headersDisabled = true;
		var b = this.dragData.ddel.cloneNode(true);
		b.id = Ext.id();
		b.style.width = Math.min(this.dragData.header.offsetWidth,
				this.maxDragWidth)
				+ "px";
		this.proxy.update(b);
		return true
	},
	afterValidDrop : function() {
		var a = this.view;
		setTimeout( function() {
			a.headersDisabled = false
		}, 50)
	},
	afterInvalidDrop : function() {
		var a = this.view;
		setTimeout( function() {
			a.headersDisabled = false
		}, 50)
	}
});
Ext.grid.HeaderDropZone = function(a, c, b) {
	this.grid = a;
	this.view = a.getView();
	this.proxyTop = Ext.DomHelper.append(document.body, {
		cls : "col-move-top",
		html : "&#160;"
	}, true);
	this.proxyBottom = Ext.DomHelper.append(document.body, {
		cls : "col-move-bottom",
		html : "&#160;"
	}, true);
	this.proxyTop.hide = this.proxyBottom.hide = function() {
		this.setLeftTop(-100, -100);
		this.setStyle("visibility", "hidden")
	};
	this.ddGroup = "gridHeader" + this.grid.getGridEl().id;
	Ext.grid.HeaderDropZone.superclass.constructor
			.call(this, a.getGridEl().dom)
};
Ext.extend(Ext.grid.HeaderDropZone, Ext.dd.DropZone, {
	proxyOffsets : [ -4, -9 ],
	fly : Ext.Element.fly,
	getTargetFromEvent : function(c) {
		var a = Ext.lib.Event.getTarget(c);
		var b = this.view.findCellIndex(a);
		if (b !== false) {
			return this.view.getHeaderCell(b)
		}
	},
	nextVisible : function(c) {
		var b = this.view, a = this.grid.colModel;
		c = c.nextSibling;
		while (c) {
			if (!a.isHidden(b.getCellIndex(c))) {
				return c
			}
			c = c.nextSibling
		}
		return null
	},
	prevVisible : function(c) {
		var b = this.view, a = this.grid.colModel;
		c = c.prevSibling;
		while (c) {
			if (!a.isHidden(b.getCellIndex(c))) {
				return c
			}
			c = c.prevSibling
		}
		return null
	},
	positionIndicator : function(d, k, j) {
		var a = Ext.lib.Event.getPageX(j);
		var g = Ext.lib.Dom.getRegion(k.firstChild);
		var c, i, b = g.top + this.proxyOffsets[1];
		if ((g.right - a) <= (g.right - g.left) / 2) {
			c = g.right + this.view.borderWidth;
			i = "after"
		} else {
			c = g.left;
			i = "before"
		}
		if (this.grid.colModel.isFixed(this.view.getCellIndex(k))) {
			return false
		}
		c += this.proxyOffsets[0];
		this.proxyTop.setLeftTop(c, b);
		this.proxyTop.show();
		if (!this.bottomOffset) {
			this.bottomOffset = this.view.mainHd.getHeight()
		}
		this.proxyBottom.setLeftTop(c, b + this.proxyTop.dom.offsetHeight
				+ this.bottomOffset);
		this.proxyBottom.show();
		return i
	},
	onNodeEnter : function(d, a, c, b) {
		if (b.header != d) {
			this.positionIndicator(b.header, d, c)
		}
	},
	onNodeOver : function(g, b, d, c) {
		var a = false;
		if (c.header != g) {
			a = this.positionIndicator(c.header, g, d)
		}
		if (!a) {
			this.proxyTop.hide();
			this.proxyBottom.hide()
		}
		return a ? this.dropAllowed : this.dropNotAllowed
	},
	onNodeOut : function(d, a, c, b) {
		this.proxyTop.hide();
		this.proxyBottom.hide()
	},
	onNodeDrop : function(b, m, g, c) {
		var d = c.header;
		if (d != b) {
			var k = this.grid.colModel;
			var j = Ext.lib.Event.getPageX(g);
			var a = Ext.lib.Dom.getRegion(b.firstChild);
			var o = (a.right - j) <= ((a.right - a.left) / 2) ? "after"
					: "before";
			var i = this.view.getCellIndex(d);
			var l = this.view.getCellIndex(b);
			if (o == "after") {
				l++
			}
			if (i < l) {
				l--
			}
			k.moveColumn(i, l);
			this.grid.fireEvent("columnmove", i, l);
			return true
		}
		return false
	}
});
Ext.grid.GridView.ColumnDragZone = function(a, b) {
	Ext.grid.GridView.ColumnDragZone.superclass.constructor.call(this, a, b,
			null);
	this.proxy.el.addClass("x-grid3-col-dd")
};
Ext.extend(Ext.grid.GridView.ColumnDragZone, Ext.grid.HeaderDragZone, {
	handleMouseDown : function(a) {
	},
	callHandleMouseDown : function(a) {
		Ext.grid.GridView.ColumnDragZone.superclass.handleMouseDown.call(this,
				a)
	}
});
Ext.grid.SplitDragZone = function(a, c, b) {
	this.grid = a;
	this.view = a.getView();
	this.proxy = this.view.resizeProxy;
	Ext.grid.SplitDragZone.superclass.constructor.call(this, c, "gridSplitters"
			+ this.grid.getGridEl().id, {
		dragElId : Ext.id(this.proxy.dom),
		resizeFrame : false
	});
	this.setHandleElId(Ext.id(c));
	this.setOuterHandleElId(Ext.id(b));
	this.scroll = false
};
Ext.extend(Ext.grid.SplitDragZone, Ext.dd.DDProxy, {
	fly : Ext.Element.fly,
	b4StartDrag : function(a, d) {
		this.view.headersDisabled = true;
		this.proxy.setHeight(this.view.mainWrap.getHeight());
		var b = this.cm.getColumnWidth(this.cellIndex);
		var c = Math.max(b - this.grid.minColumnWidth, 0);
		this.resetConstraints();
		this.setXConstraint(c, 1000);
		this.setYConstraint(0, 0);
		this.minX = a - c;
		this.maxX = a + 1000;
		this.startPos = a;
		Ext.dd.DDProxy.prototype.b4StartDrag.call(this, a, d)
	},
	handleMouseDown : function(c) {
		var b = Ext.EventObject.setEvent(c);
		var a = this.fly(b.getTarget());
		if (a.hasClass("x-grid-split")) {
			this.cellIndex = this.view.getCellIndex(a.dom);
			this.split = a.dom;
			this.cm = this.grid.colModel;
			if (this.cm.isResizable(this.cellIndex)
					&& !this.cm.isFixed(this.cellIndex)) {
				Ext.grid.SplitDragZone.superclass.handleMouseDown.apply(this,
						arguments)
			}
		}
	},
	endDrag : function(c) {
		this.view.headersDisabled = false;
		var a = Math.max(this.minX, Ext.lib.Event.getPageX(c));
		var b = a - this.startPos;
		this.view.onColumnSplitterMoved(this.cellIndex, this.cm
				.getColumnWidth(this.cellIndex)
				+ b)
	},
	autoOffset : function() {
		this.setDelta(0, 0)
	}
});
Ext.grid.GridDragZone = function(b, a) {
	this.view = b.getView();
	Ext.grid.GridDragZone.superclass.constructor.call(this,
			this.view.mainBody.dom, a);
	this.scroll = false;
	this.grid = b;
	this.ddel = document.createElement("div");
	this.ddel.className = "x-grid-dd-wrap"
};
Ext.extend(Ext.grid.GridDragZone, Ext.dd.DragZone, {
	ddGroup : "GridDD",
	getDragData : function(b) {
		var a = Ext.lib.Event.getTarget(b);
		var d = this.view.findRowIndex(a);
		if (d !== false) {
			var c = this.grid.selModel;
			if (!c.isSelected(d) || b.hasModifier()) {
				c.handleMouseDown(this.grid, d, b)
			}
			return {
				grid : this.grid,
				ddel : this.ddel,
				rowIndex : d,
				selections : c.getSelections()
			}
		}
		return false
	},
	onInitDrag : function(b) {
		var a = this.dragData;
		this.ddel.innerHTML = this.grid.getDragDropText();
		this.proxy.update(this.ddel)
	},
	afterRepair : function() {
		this.dragging = false
	},
	getRepairXY : function(b, a) {
		return false
	},
	onEndDrag : function(a, b) {
	},
	onValidDrop : function(a, b, c) {
		this.hideProxy()
	},
	beforeInvalidDrop : function(a, b) {
	}
});
Ext.grid.ColumnModel = function(a) {
	if (a.columns) {
		Ext.apply(this, a);
		this.setConfig(a.columns, true)
	} else {
		this.setConfig(a, true)
	}
	this.addEvents("widthchange", "headerchange", "hiddenchange",
			"columnmoved", "configchange");
	Ext.grid.ColumnModel.superclass.constructor.call(this)
};
Ext
		.extend(
				Ext.grid.ColumnModel,
				Ext.util.Observable,
				{
					defaultWidth : 100,
					defaultSortable : false,
					getColumnId : function(a) {
						return this.config[a].id
					},
					getColumnAt : function(a) {
						return this.config[a]
					},
					setConfig : function(e, d) {
						var g, h, a;
						if (!d) {
							delete this.totalWidth;
							for (g = 0, a = this.config.length; g < a; g++) {
								h = this.config[g];
								if (h.editor) {
									h.editor.destroy()
								}
							}
						}
						this.defaults = Ext.apply( {
							width : this.defaultWidth,
							sortable : this.defaultSortable
						}, this.defaults);
						this.config = e;
						this.lookup = {};
						for (g = 0, a = e.length; g < a; g++) {
							h = Ext.applyIf(e[g], this.defaults);
							if (!h.isColumn) {
								var b = Ext.grid.Column.types[h.xtype
										|| "gridcolumn"];
								h = new b(h);
								e[g] = h
							}
							this.lookup[h.id] = h
						}
						if (!d) {
							this.fireEvent("configchange", this)
						}
					},
					getColumnById : function(a) {
						return this.lookup[a]
					},
					getIndexById : function(c) {
						for ( var b = 0, a = this.config.length; b < a; b++) {
							if (this.config[b].id == c) {
								return b
							}
						}
						return -1
					},
					moveColumn : function(d, a) {
						var b = this.config[d];
						this.config.splice(d, 1);
						this.config.splice(a, 0, b);
						this.dataMap = null;
						this.fireEvent("columnmoved", this, d, a)
					},
					getColumnCount : function(d) {
						if (d === true) {
							var e = 0;
							for ( var b = 0, a = this.config.length; b < a; b++) {
								if (!this.isHidden(b)) {
									e++
								}
							}
							return e
						}
						return this.config.length
					},
					getColumnsBy : function(e, d) {
						var g = [];
						for ( var b = 0, a = this.config.length; b < a; b++) {
							var h = this.config[b];
							if (e.call(d || this, h, b) === true) {
								g[g.length] = h
							}
						}
						return g
					},
					isSortable : function(a) {
						return this.config[a].sortable
					},
					isMenuDisabled : function(a) {
						return !!this.config[a].menuDisabled
					},
					getRenderer : function(a) {
						if (!this.config[a].renderer) {
							return Ext.grid.ColumnModel.defaultRenderer
						}
						return this.config[a].renderer
					},
					setRenderer : function(a, b) {
						this.config[a].renderer = b
					},
					getColumnWidth : function(a) {
						return this.config[a].width
					},
					setColumnWidth : function(b, c, a) {
						this.config[b].width = c;
						this.totalWidth = null;
						if (!a) {
							this.fireEvent("widthchange", this, b, c)
						}
					},
					getTotalWidth : function(b) {
						if (!this.totalWidth) {
							this.totalWidth = 0;
							for ( var c = 0, a = this.config.length; c < a; c++) {
								if (b || !this.isHidden(c)) {
									this.totalWidth += this.getColumnWidth(c)
								}
							}
						}
						return this.totalWidth
					},
					getColumnHeader : function(a) {
						return this.config[a].header
					},
					setColumnHeader : function(a, b) {
						this.config[a].header = b;
						this.fireEvent("headerchange", this, a, b)
					},
					getColumnTooltip : function(a) {
						return this.config[a].tooltip
					},
					setColumnTooltip : function(a, b) {
						this.config[a].tooltip = b
					},
					getDataIndex : function(a) {
						return this.config[a].dataIndex
					},
					setDataIndex : function(a, b) {
						this.config[a].dataIndex = b
					},
					findColumnIndex : function(d) {
						var e = this.config;
						for ( var b = 0, a = e.length; b < a; b++) {
							if (e[b].dataIndex == d) {
								return b
							}
						}
						return -1
					},
					isCellEditable : function(a, b) {
						return (this.config[a].editable || (typeof this.config[a].editable == "undefined" && this.config[a].editor)) ? true
								: false
					},
					getCellEditor : function(a, b) {
						return this.config[a].getCellEditor(b)
					},
					setEditable : function(a, b) {
						this.config[a].editable = b
					},
					isHidden : function(a) {
						return this.config[a].hidden
					},
					isFixed : function(a) {
						return this.config[a].fixed
					},
					isResizable : function(a) {
						return a >= 0 && this.config[a].resizable !== false
								&& this.config[a].fixed !== true
					},
					setHidden : function(a, b) {
						var d = this.config[a];
						if (d.hidden !== b) {
							d.hidden = b;
							this.totalWidth = null;
							this.fireEvent("hiddenchange", this, a, b)
						}
					},
					setEditor : function(a, b) {
						Ext.destroy(this.config[a].editor);
						this.config[a].editor = b
					},
					destroy : function() {
						for ( var b = 0, d = this.config, a = d.length; b < a; b++) {
							Ext.destroy(d[b].editor)
						}
						this.purgeListeners()
					}
				});
Ext.grid.ColumnModel.defaultRenderer = function(a) {
	if (typeof a == "string" && a.length < 1) {
		return "&#160;"
	}
	return a
};
Ext.grid.AbstractSelectionModel = function() {
	this.locked = false;
	Ext.grid.AbstractSelectionModel.superclass.constructor.call(this)
};
Ext.extend(Ext.grid.AbstractSelectionModel, Ext.util.Observable, {
	init : function(a) {
		this.grid = a;
		this.initEvents()
	},
	lock : function() {
		this.locked = true
	},
	unlock : function() {
		this.locked = false
	},
	isLocked : function() {
		return this.locked
	},
	destroy : function() {
		this.purgeListeners()
	}
});
Ext.grid.RowSelectionModel = function(a) {
	Ext.apply(this, a);
	this.selections = new Ext.util.MixedCollection(false, function(b) {
		return b.id
	});
	this.last = false;
	this.lastActive = false;
	this.addEvents("selectionchange", "beforerowselect", "rowselect",
			"rowdeselect");
	Ext.grid.RowSelectionModel.superclass.constructor.call(this)
};
Ext.extend(Ext.grid.RowSelectionModel, Ext.grid.AbstractSelectionModel, {
	singleSelect : false,
	initEvents : function() {
		if (!this.grid.enableDragDrop && !this.grid.enableDrag) {
			this.grid.on("rowmousedown", this.handleMouseDown, this)
		} else {
			this.grid.on("rowclick", function(b, d, c) {
				if (c.button === 0 && !c.shiftKey && !c.ctrlKey) {
					this.selectRow(d, false);
					b.view.focusRow(d)
				}
			}, this)
		}
		this.rowNav = new Ext.KeyNav(this.grid.getGridEl(), {
			up : function(c) {
				if (!c.shiftKey || this.singleSelect) {
					this.selectPrevious(false)
				} else {
					if (this.last !== false && this.lastActive !== false) {
						var b = this.last;
						this.selectRange(this.last, this.lastActive - 1);
						this.grid.getView().focusRow(this.lastActive);
						if (b !== false) {
							this.last = b
						}
					} else {
						this.selectFirstRow()
					}
				}
			},
			down : function(c) {
				if (!c.shiftKey || this.singleSelect) {
					this.selectNext(false)
				} else {
					if (this.last !== false && this.lastActive !== false) {
						var b = this.last;
						this.selectRange(this.last, this.lastActive + 1);
						this.grid.getView().focusRow(this.lastActive);
						if (b !== false) {
							this.last = b
						}
					} else {
						this.selectFirstRow()
					}
				}
			},
			scope : this
		});
		var a = this.grid.view;
		a.on("refresh", this.onRefresh, this);
		a.on("rowupdated", this.onRowUpdated, this);
		a.on("rowremoved", this.onRemove, this)
	},
	onRefresh : function() {
		var g = this.grid.store, b;
		var d = this.getSelections();
		this.clearSelections(true);
		for ( var c = 0, a = d.length; c < a; c++) {
			var e = d[c];
			if ((b = g.indexOfId(e.id)) != -1) {
				this.selectRow(b, true)
			}
		}
		if (d.length != this.selections.getCount()) {
			this.fireEvent("selectionchange", this)
		}
	},
	onRemove : function(a, b, c) {
		if (this.selections.remove(c) !== false) {
			this.fireEvent("selectionchange", this)
		}
	},
	onRowUpdated : function(a, b, c) {
		if (this.isSelected(c)) {
			a.onRowSelect(b)
		}
	},
	selectRecords : function(b, e) {
		if (!e) {
			this.clearSelections()
		}
		var d = this.grid.store;
		for ( var c = 0, a = b.length; c < a; c++) {
			this.selectRow(d.indexOf(b[c]), true)
		}
	},
	getCount : function() {
		return this.selections.length
	},
	selectFirstRow : function() {
		this.selectRow(0)
	},
	selectLastRow : function(a) {
		this.selectRow(this.grid.store.getCount() - 1, a)
	},
	selectNext : function(a) {
		if (this.hasNext()) {
			this.selectRow(this.last + 1, a);
			this.grid.getView().focusRow(this.last);
			return true
		}
		return false
	},
	selectPrevious : function(a) {
		if (this.hasPrevious()) {
			this.selectRow(this.last - 1, a);
			this.grid.getView().focusRow(this.last);
			return true
		}
		return false
	},
	hasNext : function() {
		return this.last !== false
				&& (this.last + 1) < this.grid.store.getCount()
	},
	hasPrevious : function() {
		return !!this.last
	},
	getSelections : function() {
		return [].concat(this.selections.items)
	},
	getSelected : function() {
		return this.selections.itemAt(0)
	},
	each : function(e, d) {
		var c = this.getSelections();
		for ( var b = 0, a = c.length; b < a; b++) {
			if (e.call(d || this, c[b], b) === false) {
				return false
			}
		}
		return true
	},
	clearSelections : function(a) {
		if (this.isLocked()) {
			return
		}
		if (a !== true) {
			var c = this.grid.store;
			var b = this.selections;
			b.each( function(d) {
				this.deselectRow(c.indexOfId(d.id))
			}, this);
			b.clear()
		} else {
			this.selections.clear()
		}
		this.last = false
	},
	selectAll : function() {
		if (this.isLocked()) {
			return
		}
		this.selections.clear();
		for ( var b = 0, a = this.grid.store.getCount(); b < a; b++) {
			this.selectRow(b, true)
		}
	},
	hasSelection : function() {
		return this.selections.length > 0
	},
	isSelected : function(a) {
		var b = typeof a == "number" ? this.grid.store.getAt(a) : a;
		return (b && this.selections.key(b.id) ? true : false)
	},
	isIdSelected : function(a) {
		return (this.selections.key(a) ? true : false)
	},
	handleMouseDown : function(d, i, h) {
		if (h.button !== 0 || this.isLocked()) {
			return
		}
		var a = this.grid.getView();
		if (h.shiftKey && !this.singleSelect && this.last !== false) {
			var c = this.last;
			this.selectRange(c, i, h.ctrlKey);
			this.last = c;
			a.focusRow(i)
		} else {
			var b = this.isSelected(i);
			if (h.ctrlKey && b) {
				this.deselectRow(i)
			} else {
				if (!b || this.getCount() > 1) {
					this.selectRow(i, h.ctrlKey || h.shiftKey);
					a.focusRow(i)
				}
			}
		}
	},
	selectRows : function(c, d) {
		if (!d) {
			this.clearSelections()
		}
		for ( var b = 0, a = c.length; b < a; b++) {
			this.selectRow(c[b], true)
		}
	},
	selectRange : function(b, a, d) {
		var c;
		if (this.isLocked()) {
			return
		}
		if (!d) {
			this.clearSelections()
		}
		if (b <= a) {
			for (c = b; c <= a; c++) {
				this.selectRow(c, true)
			}
		} else {
			for (c = b; c >= a; c--) {
				this.selectRow(c, true)
			}
		}
	},
	deselectRange : function(c, b, a) {
		if (this.isLocked()) {
			return
		}
		for ( var d = c; d <= b; d++) {
			this.deselectRow(d, a)
		}
	},
	selectRow : function(b, d, a) {
		if (this.isLocked() || (b < 0 || b >= this.grid.store.getCount())
				|| (d && this.isSelected(b))) {
			return
		}
		var c = this.grid.store.getAt(b);
		if (c && this.fireEvent("beforerowselect", this, b, d, c) !== false) {
			if (!d || this.singleSelect) {
				this.clearSelections()
			}
			this.selections.add(c);
			this.last = this.lastActive = b;
			if (!a) {
				this.grid.getView().onRowSelect(b)
			}
			this.fireEvent("rowselect", this, b, c);
			this.fireEvent("selectionchange", this)
		}
	},
	deselectRow : function(b, a) {
		if (this.isLocked()) {
			return
		}
		if (this.last == b) {
			this.last = false
		}
		if (this.lastActive == b) {
			this.lastActive = false
		}
		var c = this.grid.store.getAt(b);
		if (c) {
			this.selections.remove(c);
			if (!a) {
				this.grid.getView().onRowDeselect(b)
			}
			this.fireEvent("rowdeselect", this, b, c);
			this.fireEvent("selectionchange", this)
		}
	},
	restoreLast : function() {
		if (this._last) {
			this.last = this._last
		}
	},
	acceptsNav : function(c, b, a) {
		return !a.isHidden(b) && a.isCellEditable(b, c)
	},
	onEditorKey : function(i, h) {
		var c = h.getKey(), j, d = this.grid, b = d.activeEditor;
		var a = h.shiftKey;
		if (c == h.TAB) {
			h.stopEvent();
			b.completeEdit();
			if (a) {
				j = d.walkCells(b.row, b.col - 1, -1, this.acceptsNav, this)
			} else {
				j = d.walkCells(b.row, b.col + 1, 1, this.acceptsNav, this)
			}
		} else {
			if (c == h.ENTER) {
				h.stopEvent();
				b.completeEdit();
				if (this.moveEditorOnEnter !== false) {
					if (a) {
						j = d.walkCells(b.row - 1, b.col, -1, this.acceptsNav,
								this)
					} else {
						j = d.walkCells(b.row + 1, b.col, 1, this.acceptsNav,
								this)
					}
				}
			} else {
				if (c == h.ESC) {
					b.cancelEdit()
				}
			}
		}
		if (j) {
			d.startEditing(j[0], j[1])
		}
	},
	destroy : function() {
		if (this.rowNav) {
			this.rowNav.disable();
			this.rowNav = null
		}
		Ext.grid.RowSelectionModel.superclass.destroy.call(this)
	}
});
Ext.grid.Column = function(a) {
	Ext.apply(this, a);
	if (typeof this.renderer == "string") {
		this.renderer = Ext.util.Format[this.renderer]
	} else {
		if (Ext.isObject(this.renderer)) {
			this.scope = this.renderer.scope;
			this.renderer = this.renderer.fn
		}
	}
	this.renderer = this.renderer.createDelegate(this.scope || a);
	if (this.id === undefined) {
		this.id = ++Ext.grid.Column.AUTO_ID
	}
	if (this.editor) {
		this.editor = Ext.create(this.editor, "textfield")
	}
};
Ext.grid.Column.AUTO_ID = 0;
Ext.grid.Column.prototype = {
	isColumn : true,
	renderer : function(a) {
		if (typeof a == "string" && a.length < 1) {
			return "&#160;"
		}
		return a
	},
	getEditor : function(a) {
		return this.editable !== false ? this.editor : null
	},
	getCellEditor : function(b) {
		var a = this.getEditor(b);
		if (a) {
			if (!a.startEdit) {
				if (!a.gridEditor) {
					a.gridEditor = new Ext.grid.GridEditor(a)
				}
				return a.gridEditor
			} else {
				if (a.startEdit) {
					return a
				}
			}
		}
		return null
	}
};
Ext.grid.BooleanColumn = Ext.extend(Ext.grid.Column, {
	trueText : "true",
	falseText : "false",
	undefinedText : "&#160;",
	constructor : function(a) {
		Ext.grid.BooleanColumn.superclass.constructor.call(this, a);
		var c = this.trueText, d = this.falseText, b = this.undefinedText;
		this.renderer = function(e) {
			if (e === undefined) {
				return b
			}
			if (!e || e === "false") {
				return d
			}
			return c
		}
	}
});
Ext.grid.NumberColumn = Ext.extend(Ext.grid.Column, {
	format : "0,000.00",
	constructor : function(a) {
		Ext.grid.NumberColumn.superclass.constructor.call(this, a);
		this.renderer = Ext.util.Format.numberRenderer(this.format)
	}
});
Ext.grid.DateColumn = Ext.extend(Ext.grid.Column, {
	format : "m/d/Y",
	constructor : function(a) {
		Ext.grid.DateColumn.superclass.constructor.call(this, a);
		this.renderer = Ext.util.Format.dateRenderer(this.format)
	}
});
Ext.grid.TemplateColumn = Ext.extend(Ext.grid.Column, {
	constructor : function(a) {
		Ext.grid.TemplateColumn.superclass.constructor.call(this, a);
		var b = typeof Ext.isObject(this.tpl) ? this.tpl : new Ext.XTemplate(
				this.tpl);
		this.renderer = function(d, e, c) {
			return b.apply(c.data)
		};
		this.tpl = b
	}
});
Ext.grid.Column.types = {
	gridcolumn : Ext.grid.Column,
	booleancolumn : Ext.grid.BooleanColumn,
	numbercolumn : Ext.grid.NumberColumn,
	datecolumn : Ext.grid.DateColumn,
	templatecolumn : Ext.grid.TemplateColumn
};
Ext.grid.RowNumberer = function(a) {
	Ext.apply(this, a);
	if (this.rowspan) {
		this.renderer = this.renderer.createDelegate(this)
	}
};
Ext.grid.RowNumberer.prototype = {
	header : "",
	width : 23,
	sortable : false,
	fixed : true,
	menuDisabled : true,
	dataIndex : "",
	id : "numberer",
	rowspan : undefined,
	renderer : function(b, c, a, d) {
		if (this.rowspan) {
			c.cellAttr = 'rowspan="' + this.rowspan + '"'
		}
		return d + 1
	}
};
Ext.grid.CheckboxSelectionModel = Ext.extend(Ext.grid.RowSelectionModel, {
	header : '<div class="x-grid3-hd-checker">&#160;</div>',
	width : 20,
	sortable : false,
	menuDisabled : true,
	fixed : true,
	dataIndex : "",
	id : "checker",
	constructor : function() {
		Ext.grid.CheckboxSelectionModel.superclass.constructor.apply(this,
				arguments);
		if (this.checkOnly) {
			this.handleMouseDown = Ext.emptyFn
		}
	},
	initEvents : function() {
		Ext.grid.CheckboxSelectionModel.superclass.initEvents.call(this);
		this.grid.on("render", function() {
			var a = this.grid.getView();
			a.mainBody.on("mousedown", this.onMouseDown, this);
			Ext.fly(a.innerHd).on("mousedown", this.onHdMouseDown, this)
		}, this)
	},
	onMouseDown : function(c, b) {
		if (c.button === 0 && b.className == "x-grid3-row-checker") {
			c.stopEvent();
			var d = c.getTarget(".x-grid3-row");
			if (d) {
				var a = d.rowIndex;
				if (this.isSelected(a)) {
					this.deselectRow(a)
				} else {
					this.selectRow(a, true)
				}
			}
		}
	},
	onHdMouseDown : function(c, a) {
		if (a.className == "x-grid3-hd-checker") {
			c.stopEvent();
			var b = Ext.fly(a.parentNode);
			var d = b.hasClass("x-grid3-hd-checker-on");
			if (d) {
				b.removeClass("x-grid3-hd-checker-on");
				this.clearSelections()
			} else {
				b.addClass("x-grid3-hd-checker-on");
				this.selectAll()
			}
		}
	},
	renderer : function(b, c, a) {
		return '<div class="x-grid3-row-checker">&#160;</div>'
	}
});
Ext.grid.CellSelectionModel = function(a) {
	Ext.apply(this, a);
	this.selection = null;
	this.addEvents("beforecellselect", "cellselect", "selectionchange");
	Ext.grid.CellSelectionModel.superclass.constructor.call(this)
};
Ext.extend(Ext.grid.CellSelectionModel, Ext.grid.AbstractSelectionModel, {
	initEvents : function() {
		this.grid.on("cellmousedown", this.handleMouseDown, this);
		this.grid.getGridEl().on(
				Ext.EventManager.useKeydown ? "keydown" : "keypress",
				this.handleKeyDown, this);
		var a = this.grid.view;
		a.on("refresh", this.onViewChange, this);
		a.on("rowupdated", this.onRowUpdated, this);
		a.on("beforerowremoved", this.clearSelections, this);
		a.on("beforerowsinserted", this.clearSelections, this);
		if (this.grid.isEditor) {
			this.grid.on("beforeedit", this.beforeEdit, this)
		}
	},
	beforeEdit : function(a) {
		this.select(a.row, a.column, false, true, a.record)
	},
	onRowUpdated : function(a, b, c) {
		if (this.selection && this.selection.record == c) {
			a.onCellSelect(b, this.selection.cell[1])
		}
	},
	onViewChange : function() {
		this.clearSelections(true)
	},
	getSelectedCell : function() {
		return this.selection ? this.selection.cell : null
	},
	clearSelections : function(b) {
		var a = this.selection;
		if (a) {
			if (b !== true) {
				this.grid.view.onCellDeselect(a.cell[0], a.cell[1])
			}
			this.selection = null;
			this.fireEvent("selectionchange", this, null)
		}
	},
	hasSelection : function() {
		return this.selection ? true : false
	},
	handleMouseDown : function(b, d, a, c) {
		if (c.button !== 0 || this.isLocked()) {
			return
		}
		this.select(d, a)
	},
	select : function(g, c, b, e, d) {
		if (this.fireEvent("beforecellselect", this, g, c) !== false) {
			this.clearSelections();
			d = d || this.grid.store.getAt(g);
			this.selection = {
				record : d,
				cell : [ g, c ]
			};
			if (!b) {
				var a = this.grid.getView();
				a.onCellSelect(g, c);
				if (e !== true) {
					a.focusCell(g, c)
				}
			}
			this.fireEvent("cellselect", this, g, c);
			this.fireEvent("selectionchange", this, this.selection)
		}
	},
	isSelectable : function(c, b, a) {
		return !a.isHidden(b)
	},
	handleKeyDown : function(j) {
		if (!j.isNavKeyPress()) {
			return
		}
		var i = this.grid, o = this.selection;
		if (!o) {
			j.stopEvent();
			var n = i.walkCells(0, 0, 1, this.isSelectable, this);
			if (n) {
				this.select(n[0], n[1])
			}
			return
		}
		var b = this;
		var m = function(g, c, e) {
			return i.walkCells(g, c, e, b.isSelectable, b)
		};
		var d = j.getKey(), a = o.cell[0], l = o.cell[1];
		var h;
		switch (d) {
		case j.TAB:
			if (j.shiftKey) {
				h = m(a, l - 1, -1)
			} else {
				h = m(a, l + 1, 1)
			}
			break;
		case j.DOWN:
			h = m(a + 1, l, 1);
			break;
		case j.UP:
			h = m(a - 1, l, -1);
			break;
		case j.RIGHT:
			h = m(a, l + 1, 1);
			break;
		case j.LEFT:
			h = m(a, l - 1, -1);
			break;
		case j.ENTER:
			if (i.isEditor && !i.editing) {
				i.startEditing(a, l);
				j.stopEvent();
				return
			}
			break
		}
		if (h) {
			this.select(h[0], h[1]);
			j.stopEvent()
		}
	},
	acceptsNav : function(c, b, a) {
		return !a.isHidden(b) && a.isCellEditable(b, c)
	},
	onEditorKey : function(h, d) {
		var b = d.getKey(), i, c = this.grid, a = c.activeEditor;
		if (b == d.TAB) {
			if (d.shiftKey) {
				i = c.walkCells(a.row, a.col - 1, -1, this.acceptsNav, this)
			} else {
				i = c.walkCells(a.row, a.col + 1, 1, this.acceptsNav, this)
			}
			d.stopEvent()
		} else {
			if (b == d.ENTER) {
				a.completeEdit();
				d.stopEvent()
			} else {
				if (b == d.ESC) {
					d.stopEvent();
					a.cancelEdit()
				}
			}
		}
		if (i) {
			c.startEditing(i[0], i[1])
		}
	}
});
Ext.grid.EditorGridPanel = Ext.extend(Ext.grid.GridPanel, {
	clicksToEdit : 2,
	forceValidation : false,
	isEditor : true,
	detectEdit : false,
	autoEncode : false,
	trackMouseOver : false,
	initComponent : function() {
		Ext.grid.EditorGridPanel.superclass.initComponent.call(this);
		if (!this.selModel) {
			this.selModel = new Ext.grid.CellSelectionModel()
		}
		this.activeEditor = null;
		this.addEvents("beforeedit", "afteredit", "validateedit")
	},
	initEvents : function() {
		Ext.grid.EditorGridPanel.superclass.initEvents.call(this);
		this.on("bodyscroll", this.stopEditing, this, [ true ]);
		this.on("columnresize", this.stopEditing, this, [ true ]);
		if (this.clicksToEdit == 1) {
			this.on("cellclick", this.onCellDblClick, this)
		} else {
			if (this.clicksToEdit == "auto" && this.view.mainBody) {
				this.view.mainBody.on("mousedown", this.onAutoEditClick, this)
			}
			this.on("celldblclick", this.onCellDblClick, this)
		}
	},
	onCellDblClick : function(b, c, a) {
		this.startEditing(c, a)
	},
	onAutoEditClick : function(c, b) {
		if (c.button !== 0) {
			return
		}
		var g = this.view.findRowIndex(b);
		var a = this.view.findCellIndex(b);
		if (g !== false && a !== false) {
			this.stopEditing();
			if (this.selModel.getSelectedCell) {
				var d = this.selModel.getSelectedCell();
				if (d && d[0] === g && d[1] === a) {
					this.startEditing(g, a)
				}
			} else {
				if (this.selModel.isSelected(g)) {
					this.startEditing(g, a)
				}
			}
		}
	},
	onEditComplete : function(b, d, a) {
		this.editing = false;
		this.activeEditor = null;
		b.un("specialkey", this.selModel.onEditorKey, this.selModel);
		var c = b.record;
		var h = this.colModel.getDataIndex(b.col);
		d = this.postEditValue(d, a, c, h);
		if (this.forceValidation === true || String(d) !== String(a)) {
			var g = {
				grid : this,
				record : c,
				field : h,
				originalValue : a,
				value : d,
				row : b.row,
				column : b.col,
				cancel : false
			};
			if (this.fireEvent("validateedit", g) !== false && !g.cancel
					&& String(d) !== String(a)) {
				c.set(h, g.value);
				delete g.cancel;
				this.fireEvent("afteredit", g)
			}
		}
		this.view.focusCell(b.row, b.col)
	},
	startEditing : function(h, b) {
		this.stopEditing();
		if (this.colModel.isCellEditable(b, h)) {
			this.view.ensureVisible(h, b, true);
			var c = this.store.getAt(h);
			var g = this.colModel.getDataIndex(b);
			var d = {
				grid : this,
				record : c,
				field : g,
				value : c.data[g],
				row : h,
				column : b,
				cancel : false
			};
			if (this.fireEvent("beforeedit", d) !== false && !d.cancel) {
				this.editing = true;
				var a = this.colModel.getCellEditor(b, h);
				if (!a) {
					return
				}
				if (!a.rendered) {
					a.render(this.view.getEditorParent(a))
				}
				( function() {
					a.row = h;
					a.col = b;
					a.record = c;
					a.on("complete", this.onEditComplete, this, {
						single : true
					});
					a
							.on("specialkey", this.selModel.onEditorKey,
									this.selModel);
					this.activeEditor = a;
					var e = this.preEditValue(c, g);
					a.startEdit(this.view.getCell(h, b).firstChild,
							e === undefined ? "" : e)
				}).defer(50, this)
			}
		}
	},
	preEditValue : function(a, c) {
		var b = a.data[c];
		return this.autoEncode && typeof b == "string" ? Ext.util.Format
				.htmlDecode(b) : b
	},
	postEditValue : function(c, a, b, d) {
		return this.autoEncode && typeof c == "string" ? Ext.util.Format
				.htmlEncode(c) : c
	},
	stopEditing : function(a) {
		if (this.activeEditor) {
			this.activeEditor[a === true ? "cancelEdit" : "completeEdit"]()
		}
		this.activeEditor = null
	}
});
Ext.reg("editorgrid", Ext.grid.EditorGridPanel);
Ext.grid.GridEditor = function(b, a) {
	Ext.grid.GridEditor.superclass.constructor.call(this, b, a);
	b.monitorTab = false
};
Ext.extend(Ext.grid.GridEditor, Ext.Editor, {
	alignment : "tl-tl",
	autoSize : "width",
	hideEl : false,
	cls : "x-small-editor x-grid-editor",
	shim : false,
	shadow : false
});
Ext.grid.PropertyRecord = Ext.data.Record.create( [ {
	name : "name",
	type : "string"
}, "value" ]);
Ext.grid.PropertyStore = function(a, b) {
	this.grid = a;
	this.store = new Ext.data.Store( {
		recordType : Ext.grid.PropertyRecord
	});
	this.store.on("update", this.onUpdate, this);
	if (b) {
		this.setSource(b)
	}
	Ext.grid.PropertyStore.superclass.constructor.call(this)
};
Ext.extend(Ext.grid.PropertyStore, Ext.util.Observable, {
	setSource : function(c) {
		this.source = c;
		this.store.removeAll();
		var b = [];
		for ( var a in c) {
			if (this.isEditableValue(c[a])) {
				b.push(new Ext.grid.PropertyRecord( {
					name : a,
					value : c[a]
				}, a))
			}
		}
		this.store.loadRecords( {
			records : b
		}, {}, true)
	},
	onUpdate : function(e, a, d) {
		if (d == Ext.data.Record.EDIT) {
			var b = a.data.value;
			var c = a.modified.value;
			if (this.grid.fireEvent("beforepropertychange", this.source, a.id,
					b, c) !== false) {
				this.source[a.id] = b;
				a.commit();
				this.grid.fireEvent("propertychange", this.source, a.id, b, c)
			} else {
				a.reject()
			}
		}
	},
	getProperty : function(a) {
		return this.store.getAt(a)
	},
	isEditableValue : function(a) {
		if (Ext.isDate(a)) {
			return true
		}
		return !(Ext.isObject(a) || Ext.isFunction(a))
	},
	setValue : function(b, a) {
		this.source[b] = a;
		this.store.getById(b).set("value", a)
	},
	getSource : function() {
		return this.source
	}
});
Ext.grid.PropertyColumnModel = function(c, b) {
	var d = Ext.grid, e = Ext.form;
	this.grid = c;
	d.PropertyColumnModel.superclass.constructor.call(this, [ {
		header : this.nameText,
		width : 50,
		sortable : true,
		dataIndex : "name",
		id : "name",
		menuDisabled : true
	}, {
		header : this.valueText,
		width : 50,
		resizable : false,
		dataIndex : "value",
		id : "value",
		menuDisabled : true
	} ]);
	this.store = b;
	var a = new e.Field( {
		autoCreate : {
			tag : "select",
			children : [ {
				tag : "option",
				value : "true",
				html : "true"
			}, {
				tag : "option",
				value : "false",
				html : "false"
			} ]
		},
		getValue : function() {
			return this.el.value == "true"
		}
	});
	this.editors = {
		date : new d.GridEditor(new e.DateField( {
			selectOnFocus : true
		})),
		string : new d.GridEditor(new e.TextField( {
			selectOnFocus : true
		})),
		number : new d.GridEditor(new e.NumberField( {
			selectOnFocus : true,
			style : "text-align:left;"
		})),
		"boolean" : new d.GridEditor(a)
	};
	this.renderCellDelegate = this.renderCell.createDelegate(this);
	this.renderPropDelegate = this.renderProp.createDelegate(this)
};
Ext.extend(Ext.grid.PropertyColumnModel, Ext.grid.ColumnModel, {
	nameText : "Name",
	valueText : "Value",
	dateFormat : "m/j/Y",
	renderDate : function(a) {
		return a.dateFormat(this.dateFormat)
	},
	renderBool : function(a) {
		return a ? "true" : "false"
	},
	isCellEditable : function(a, b) {
		return a == 1
	},
	getRenderer : function(a) {
		return a == 1 ? this.renderCellDelegate : this.renderPropDelegate
	},
	renderProp : function(a) {
		return this.getPropertyName(a)
	},
	renderCell : function(a) {
		var b = a;
		if (Ext.isDate(a)) {
			b = this.renderDate(a)
		} else {
			if (typeof a == "boolean") {
				b = this.renderBool(a)
			}
		}
		return Ext.util.Format.htmlEncode(b)
	},
	getPropertyName : function(b) {
		var a = this.grid.propertyNames;
		return a && a[b] ? a[b] : b
	},
	getCellEditor : function(a, e) {
		var b = this.store.getProperty(e), d = b.data.name, c = b.data.value;
		if (this.grid.customEditors[d]) {
			return this.grid.customEditors[d]
		}
		if (Ext.isDate(c)) {
			return this.editors.date
		} else {
			if (typeof c == "number") {
				return this.editors.number
			} else {
				if (typeof c == "boolean") {
					return this.editors["boolean"]
				} else {
					return this.editors.string
				}
			}
		}
	},
	destroy : function() {
		Ext.grid.PropertyColumnModel.superclass.destroy.call(this);
		for ( var a in this.editors) {
			Ext.destroy(a)
		}
	}
});
Ext.grid.PropertyGrid = Ext.extend(Ext.grid.EditorGridPanel, {
	enableColumnMove : false,
	stripeRows : false,
	trackMouseOver : false,
	clicksToEdit : 1,
	enableHdMenu : false,
	viewConfig : {
		forceFit : true
	},
	initComponent : function() {
		this.customEditors = this.customEditors || {};
		this.lastEditRow = null;
		var b = new Ext.grid.PropertyStore(this);
		this.propStore = b;
		var a = new Ext.grid.PropertyColumnModel(this, b);
		b.store.sort("name", "ASC");
		this.addEvents("beforepropertychange", "propertychange");
		this.cm = a;
		this.ds = b.store;
		Ext.grid.PropertyGrid.superclass.initComponent.call(this);
		this.mon(this.selModel, "beforecellselect", function(e, d, c) {
			if (c === 0) {
				this.startEditing.defer(200, this, [ d, 1 ]);
				return false
			}
		}, this)
	},
	onRender : function() {
		Ext.grid.PropertyGrid.superclass.onRender.apply(this, arguments);
		this.getGridEl().addClass("x-props-grid")
	},
	afterRender : function() {
		Ext.grid.PropertyGrid.superclass.afterRender.apply(this, arguments);
		if (this.source) {
			this.setSource(this.source)
		}
	},
	setSource : function(a) {
		this.propStore.setSource(a)
	},
	getSource : function() {
		return this.propStore.getSource()
	}
});
Ext.reg("propertygrid", Ext.grid.PropertyGrid);
Ext.grid.GroupingView = Ext
		.extend(
				Ext.grid.GridView,
				{
					groupByText : "Group By This Field",
					showGroupsText : "Show in Groups",
					hideGroupedColumn : false,
					showGroupName : true,
					startCollapsed : false,
					enableGrouping : true,
					enableGroupingMenu : true,
					enableNoGroups : true,
					emptyGroupText : "(None)",
					ignoreAdd : false,
					groupTextTpl : "{text}",
					gidSeed : 1000,
					initTemplates : function() {
						Ext.grid.GroupingView.superclass.initTemplates
								.call(this);
						this.state = {};
						var a = this.grid.getSelectionModel();
						a.on(a.selectRow ? "beforerowselect"
								: "beforecellselect", this.onBeforeRowSelect,
								this);
						if (!this.startGroup) {
							this.startGroup = new Ext.XTemplate(
									'<div id="{groupId}" class="x-grid-group {cls}">',
									'<div id="{groupId}-hd" class="x-grid-group-hd" style="{style}"><div class="x-grid-group-title">',
									this.groupTextTpl, "</div></div>",
									'<div id="{groupId}-bd" class="x-grid-group-body">')
						}
						this.startGroup.compile();
						this.endGroup = "</div></div>"
					},
					findGroup : function(a) {
						return Ext.fly(a)
								.up(".x-grid-group", this.mainBody.dom)
					},
					getGroups : function() {
						return this.hasRows() ? this.mainBody.dom.childNodes
								: []
					},
					onAdd : function() {
						if (this.enableGrouping && !this.ignoreAdd) {
							var a = this.getScrollState();
							this.refresh();
							this.restoreScroll(a)
						} else {
							if (!this.enableGrouping) {
								Ext.grid.GroupingView.superclass.onAdd.apply(
										this, arguments)
							}
						}
					},
					onRemove : function(e, a, b, d) {
						Ext.grid.GroupingView.superclass.onRemove.apply(this,
								arguments);
						var c = document.getElementById(a._groupId);
						if (c && c.childNodes[1].childNodes.length < 1) {
							Ext.removeNode(c)
						}
						this.applyEmptyText()
					},
					refreshRow : function(a) {
						if (this.ds.getCount() == 1) {
							this.refresh()
						} else {
							this.isUpdating = true;
							Ext.grid.GroupingView.superclass.refreshRow.apply(
									this, arguments);
							this.isUpdating = false
						}
					},
					beforeMenuShow : function() {
						var c, a = this.hmenu.items, b = this.cm.config[this.hdCtxIndex].groupable === false;
						if ((c = a.get("groupBy"))) {
							c.setDisabled(b)
						}
						if ((c = a.get("showGroups"))) {
							c.setDisabled(b);
							c.setChecked(!!this.getGroupField(), true)
						}
					},
					renderUI : function() {
						Ext.grid.GroupingView.superclass.renderUI.call(this);
						this.mainBody
								.on("mousedown", this.interceptMouse, this);
						if (this.enableGroupingMenu && this.hmenu) {
							this.hmenu.add("-", {
								itemId : "groupBy",
								text : this.groupByText,
								handler : this.onGroupByClick,
								scope : this,
								iconCls : "x-group-by-icon"
							});
							if (this.enableNoGroups) {
								this.hmenu.add( {
									itemId : "showGroups",
									text : this.showGroupsText,
									checked : true,
									checkHandler : this.onShowGroupsClick,
									scope : this
								})
							}
							this.hmenu.on("beforeshow", this.beforeMenuShow,
									this)
						}
					},
					onGroupByClick : function() {
						this.grid.store.groupBy(this.cm
								.getDataIndex(this.hdCtxIndex));
						this.beforeMenuShow()
					},
					onShowGroupsClick : function(a, b) {
						if (b) {
							this.onGroupByClick()
						} else {
							this.grid.store.clearGrouping()
						}
					},
					toggleGroup : function(c, b) {
						this.grid.stopEditing(true);
						c = Ext.getDom(c);
						var a = Ext.fly(c);
						b = b !== undefined ? b : a
								.hasClass("x-grid-group-collapsed");
						this.state[a.dom.id] = b;
						a[b ? "removeClass" : "addClass"]
								("x-grid-group-collapsed")
					},
					toggleAllGroups : function(c) {
						var b = this.getGroups();
						for ( var d = 0, a = b.length; d < a; d++) {
							this.toggleGroup(b[d], c)
						}
					},
					expandAllGroups : function() {
						this.toggleAllGroups(true)
					},
					collapseAllGroups : function() {
						this.toggleAllGroups(false)
					},
					interceptMouse : function(b) {
						var a = b.getTarget(".x-grid-group-hd", this.mainBody);
						if (a) {
							b.stopEvent();
							this.toggleGroup(a.parentNode)
						}
					},
					getGroup : function(a, d, h, i, b, e) {
						var c = h ? h(a, {}, d, i, b, e) : String(a);
						if (c === "") {
							c = this.cm.config[b].emptyGroupText
									|| this.emptyGroupText
						}
						return c
					},
					getGroupField : function() {
						return this.grid.store.getGroupState()
					},
					afterRender : function() {
						Ext.grid.GroupingView.superclass.afterRender.call(this);
						if (this.grid.deferRowRender) {
							this.updateGroupWidths()
						}
					},
					renderRows : function() {
						var a = this.getGroupField();
						var d = !!a;
						if (this.hideGroupedColumn) {
							var b = this.cm.findColumnIndex(a);
							if (!d && this.lastGroupField !== undefined) {
								this.mainBody.update("");
								this.cm.setHidden(this.cm
										.findColumnIndex(this.lastGroupField),
										false);
								delete this.lastGroupField
							} else {
								if (d && this.lastGroupField === undefined) {
									this.lastGroupField = a;
									this.cm.setHidden(b, true)
								} else {
									if (d && this.lastGroupField !== undefined
											&& a !== this.lastGroupField) {
										this.mainBody.update("");
										var c = this.cm
												.findColumnIndex(this.lastGroupField);
										this.cm.setHidden(c, false);
										this.lastGroupField = a;
										this.cm.setHidden(b, true)
									}
								}
							}
						}
						return Ext.grid.GroupingView.superclass.renderRows
								.apply(this, arguments)
					},
					doRender : function(d, j, t, a, s, v) {
						if (j.length < 1) {
							return ""
						}
						var C = this.getGroupField(), q = this.cm
								.findColumnIndex(C), z;
						this.enableGrouping = !!C;
						if (!this.enableGrouping || this.isUpdating) {
							return Ext.grid.GroupingView.superclass.doRender
									.apply(this, arguments)
						}
						var k = "width:" + this.getTotalWidth() + ";";
						var u = this.grid.getGridEl().id;
						var h = this.cm.config[q];
						var b = h.groupRenderer || h.renderer;
						var w = this.showGroupName ? (h.groupName || h.header)
								+ ": " : "";
						var B = [], n, x, y, p;
						for (x = 0, y = j.length; x < y; x++) {
							var m = a + x, o = j[x], e = o.data[C];
							z = this.getGroup(e, o, b, m, q, t);
							if (!n || n.group != z) {
								p = u + "-gp-" + C + "-"
										+ Ext.util.Format.htmlEncode(z);
								var c = typeof this.state[p] !== "undefined" ? !this.state[p]
										: this.startCollapsed;
								var l = c ? "x-grid-group-collapsed" : "";
								n = {
									group : z,
									gvalue : e,
									text : w + z,
									groupId : p,
									startRow : m,
									rs : [ o ],
									cls : l,
									style : k
								};
								B.push(n)
							} else {
								n.rs.push(o)
							}
							o._groupId = p
						}
						var A = [];
						for (x = 0, y = B.length; x < y; x++) {
							z = B[x];
							this.doGroupStart(A, z, d, t, s);
							A[A.length] = Ext.grid.GroupingView.superclass.doRender
									.call(this, d, z.rs, t, z.startRow, s, v);
							this.doGroupEnd(A, z, d, t, s)
						}
						return A.join("")
					},
					getGroupId : function(g) {
						var d = this.grid.getGridEl().id;
						var c = this.getGroupField();
						var e = this.cm.findColumnIndex(c);
						var b = this.cm.config[e];
						var h = b.groupRenderer || b.renderer;
						var a = this.getGroup(g, {
							data : {}
						}, h, 0, e, this.ds);
						return d + "-gp-" + c + "-"
								+ Ext.util.Format.htmlEncode(g)
					},
					doGroupStart : function(a, d, b, e, c) {
						a[a.length] = this.startGroup.apply(d)
					},
					doGroupEnd : function(a, d, b, e, c) {
						a[a.length] = this.endGroup
					},
					getRows : function() {
						if (!this.enableGrouping) {
							return Ext.grid.GroupingView.superclass.getRows
									.call(this)
						}
						var k = [];
						var h, c = this.getGroups();
						for ( var e = 0, a = c.length; e < a; e++) {
							h = c[e].childNodes[1].childNodes;
							for ( var d = 0, b = h.length; d < b; d++) {
								k[k.length] = h[d]
							}
						}
						return k
					},
					updateGroupWidths : function() {
						if (!this.enableGrouping || !this.hasRows()) {
							return
						}
						var c = Math.max(this.cm.getTotalWidth(),
								this.el.dom.offsetWidth - this.scrollOffset)
								+ "px";
						var b = this.getGroups();
						for ( var d = 0, a = b.length; d < a; d++) {
							b[d].firstChild.style.width = c
						}
					},
					onColumnWidthUpdated : function(c, a, b) {
						Ext.grid.GroupingView.superclass.onColumnWidthUpdated
								.call(this, c, a, b);
						this.updateGroupWidths()
					},
					onAllColumnWidthsUpdated : function(a, b) {
						Ext.grid.GroupingView.superclass.onAllColumnWidthsUpdated
								.call(this, a, b);
						this.updateGroupWidths()
					},
					onColumnHiddenUpdated : function(b, c, a) {
						Ext.grid.GroupingView.superclass.onColumnHiddenUpdated
								.call(this, b, c, a);
						this.updateGroupWidths()
					},
					onLayout : function() {
						this.updateGroupWidths()
					},
					onBeforeRowSelect : function(d, c) {
						if (!this.enableGrouping) {
							return
						}
						var b = this.getRow(c);
						if (b && !b.offsetParent) {
							var a = this.findGroup(b);
							this.toggleGroup(a, true)
						}
					}
				});
Ext.grid.GroupingView.GROUP_ID = 1000;