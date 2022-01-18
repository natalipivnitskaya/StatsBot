!function (e) {
    var t = {};

    function n(a) {
        if (t[a]) {
            return t[a].exports;
        }

        var i = t[a] = {
            i: a,
            l: false,
            exports: {}
        },
            r = true;

        try {
            e[a].call(i.exports, i, i.exports, n);
            r = false;
        } finally {
            if (r) {
                delete t[a];
            }
        }

        i.l = true;
        return i.exports;
    }

    n.m = e;
    n.c = t;

    n.d = function (e, t, a) {
        if (!n.o(e, t)) {
            Object.defineProperty(e, t, {
                enumerable: true,
                get: a
            });
        }
    };

    n.r = function (e) {
        if ("undefined" != typeof Symbol && Symbol.toStringTag) {
            Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            });
        }

        Object.defineProperty(e, "__esModule", {
            value: true
        });
    };

    n.t = function (e, t) {
        if (1 & t) {
            e = n(e);
        }

        if (8 & t) {
            return e;
        }

        if (4 & t && "object" == typeof e && e && e.__esModule) {
            return e;
        }

        var a = Object.create(null);
        n.r(a);
        Object.defineProperty(a, "default", {
            enumerable: true,
            value: e
        });

        if (2 & t && "string" != typeof e) {
            for (var i in e) {
                n.d(a, i, function (t) {
                    return e[t];
                }.bind(null, i));
            }
        }

        return a;
    };

    n.n = function (e) {
        var t = e && e.__esModule ? function () {
            return e.default;
        } : function () {
            return e;
        };
        n.d(t, "a", t);
        return t;
    };

    n.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    };

    n.p = "";
    n(n.s = "6+2J");
}({
    "+DYY": function (e, t, n) {
        "use strict";

        Object.defineProperty(t, "__esModule", {
            value: true
        });
        t.NoOpLogger = {
            log: e => {},
            error: e => {},
            warn: e => {}
        };
    },
    "1bLK": function (e, t, n) {
        var a = n("vbc5"),
            i = n("hR4s").document,
            r = a(i) && a(i.createElement);

        e.exports = function (e) {
            return r ? i.createElement(e) : {};
        };
    },
    "5Doj": function (e, t, n) {
        "use strict";

        var a,
            i = this && this.__extends || (a = function (e, t) {
            return (a = Object.setPrototypeOf || {
                __proto__: []
            } instanceof Array && function (e, t) {
                e.__proto__ = t;
            } || function (e, t) {
                for (var n in t) {
                    if (t.hasOwnProperty(n)) {
                        e[n] = t[n];
                    }
                }
            })(e, t);
        }, function (e, t) {
            function n() {
                this.constructor = e;
            }

            a(e, t);
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());
        }),
            r = this && this.__assign || function () {
            return (r = Object.assign || function (e) {
                for (var t, n = 1, a = arguments.length; n < a; n++) {
                    for (var i in t = arguments[n]) {
                        if (Object.prototype.hasOwnProperty.call(t, i)) {
                            e[i] = t[i];
                        }
                    }
                }

                return e;
            }).apply(this, arguments);
        };

        Object.defineProperty(t, "__esModule", {
            value: true
        });
        var o = n("VzOZ");

        function m(e) {
            if (null != e) {
                return "number" == typeof e ? e : e.priority;
            }
        }

        var s = function (e) {
            function t(t) {
                var n = e.call(this) || this;
                n.worker = t.worker;
                n.worker.setHandler(function (e) {
                    n.handleMessage(e);
                });
                return n;
            }

            i(t, e);

            t.prototype.close = function () {
                throw new Error("not yet implemented");
            };

            t.prototype.postQuery = function (e, t, n, a) {
                this.postMessage({
                    type: "query",
                    id: e,
                    query: t,
                    variables: n,
                    params: r(r({}, a), {
                        priority: m(a ? a.priority : void 0)
                    })
                });
            };

            t.prototype.postQueryWatch = function (e, t, n, a) {
                this.postMessage({
                    type: "watch",
                    id: e,
                    query: t,
                    variables: n,
                    params: r(r({}, a), {
                        priority: m(a ? a.priority : void 0)
                    })
                });
            };

            t.prototype.postQueryWatchEnd = function (e) {
                this.postMessage({
                    type: "watch-destroy",
                    id: e
                });
            };

            t.prototype.postMutation = function (e, t, n, a) {
                this.postMessage({
                    type: "mutate",
                    id: e,
                    mutation: t,
                    variables: n,
                    params: r(r({}, a), {
                        priority: m(a ? a.priority : void 0)
                    })
                });
            };

            t.prototype.postSubscribe = function (e, t, n, a) {
                this.postMessage({
                    type: "subscribe",
                    id: e,
                    subscription: t,
                    variables: n,
                    params: r(r({}, a), {
                        priority: m(a ? a.priority : void 0)
                    })
                });
            };

            t.prototype.postUnsubscribe = function (e) {
                this.postMessage({
                    type: "subscribe-destroy",
                    id: e
                });
            };

            t.prototype.postReadQuery = function (e, t, n) {
                this.postMessage({
                    type: "read",
                    id: e,
                    query: t,
                    variables: n
                });
            };

            t.prototype.postWriteQuery = function (e, t, n, a) {
                this.postMessage({
                    type: "write",
                    id: e,
                    query: n,
                    variables: a,
                    data: t
                });
            };

            t.prototype.handleMessage = function (e) {
                if ("result" === e.type) {
                    this.operationUpdated(e.id, e.data);
                } else {
                    if ("error" === e.type) {
                        this.operationFailed(e.id, o.Serializer.parseError(e.data));
                    } else {
                        if ("status" === e.type) {
                            this.statusWatcher.setState({
                                status: e.status
                            });
                        }
                    }
                }
            };

            t.prototype.postMessage = function (e) {
                this.worker.post(e);
            };

            return t;
        }(n("cPju").GraphqlBridgedEngine);

        t.WorkerEngine = s;
    },
    "6+2J": function (e, t, n) {
        "use strict";

        n.r(t);
        var a = n("LcAa"),
            i = n.n(a);

        var r = n("P5VG"),
            o = r.WebDefinitions.list,
            m = r.WebDefinitions.notNull,
            s = r.WebDefinitions.scalar,
            _ = r.WebDefinitions.field,
            p = r.WebDefinitions.obj,
            d = r.WebDefinitions.inline,
            y = r.WebDefinitions.fragment,
            c = r.WebDefinitions.args,
            u = r.WebDefinitions.fieldValue,
            l = r.WebDefinitions.refValue,
            g = r.WebDefinitions.intValue,
            h = (r.WebDefinitions.floatValue, r.WebDefinitions.stringValue),
            S = (r.WebDefinitions.boolValue, r.WebDefinitions.listValue),
            f = r.WebDefinitions.objectValue,
            I = p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))), _("shortname", "shortname", c(), s("String")), _("photoRef", "photoRef", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("uuid", "uuid", c(), m(s("String"))), _("crop", "crop", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("x", "x", c(), m(s("Int"))), _("y", "y", c(), m(s("Int"))), _("w", "w", c(), m(s("Int"))), _("h", "h", c(), m(s("Int"))))))), _("about", "about", c(), s("String")), _("token", "token", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("salt", "salt", c(), m(s("String"))))))),
            b = p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("title", "title", c(), m(s("String"))), _("shortname", "shortname", c(), m(s("String"))), _("type", "type", c(), m(s("String"))), _("owner", "owner", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("firstName", "firstName", c(), m(s("String"))), _("lastName", "lastName", c(), s("String"))))),
            v = p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("date", "date", c(), m(s("Date"))), _("seq", "seq", c(), s("Int")), _("sender", "sender", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID")))))), _("message", "message", c(), s("String")), _("fallback", "fallback", c(), m(s("String")))),
            M = p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))), _("photo", "photo", c(), s("String")), _("isBot", "isBot", c(), m(s("Boolean"))), _("shortname", "shortname", c(), s("String")), _("inContacts", "inContacts", c(), m(s("Boolean"))), _("primaryOrganization", "primaryOrganization", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))), _("shortname", "shortname", c(), s("String"))))),
            C = p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))), _("verified", "verified", c(), m(s("Boolean")))),
            k = p(_("__typename", "__typename", c(), m(s("String"))), _("offset", "offset", c(), m(s("Int"))), _("length", "length", c(), m(s("Int"))), d("MessageSpanUserMention", p(_("__typename", "__typename", c(), m(s("String"))), _("user", "user", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String")))))))), d("MessageSpanMultiUserMention", p(_("__typename", "__typename", c(), m(s("String"))), _("offset", "offset", c(), m(s("Int"))), _("length", "length", c(), m(s("Int"))))), d("MessageSpanOrganizationMention", p(_("__typename", "__typename", c(), m(s("String"))), _("organization", "organization", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String")))))))), d("MessageSpanRoomMention", p(_("__typename", "__typename", c(), m(s("String"))), _("room", "room", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), d("PrivateRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("user", "user", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String")))))))), d("SharedRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("title", "title", c(), m(s("String"))), _("isPremium", "isPremium", c(), m(s("Boolean")))))))))), d("MessageSpanLink", p(_("__typename", "__typename", c(), m(s("String"))), _("url", "url", c(), m(s("String"))))), d("MessageSpanDate", p(_("__typename", "__typename", c(), m(s("String"))), _("date", "date", c(), m(s("Date")))))),
            R = p(_("__typename", "__typename", c(), m(s("String"))), _("fallback", "fallback", c(), m(s("String"))), d("MessageAttachmentFile", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("fileId", "fileId", c(), m(s("String"))), _("fileMetadata", "fileMetadata", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("name", "name", c(), m(s("String"))), _("mimeType", "mimeType", c(), s("String")), _("size", "size", c(), m(s("Int"))), _("isImage", "isImage", c(), m(s("Boolean"))), _("imageWidth", "imageWidth", c(), s("Int")), _("imageHeight", "imageHeight", c(), s("Int")), _("imageFormat", "imageFormat", c(), s("String"))))), _("filePreview", "filePreview", c(), s("String")))), d("MessageRichAttachment", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("title", "title", c(), s("String")), _("subTitle", "subTitle", c(), s("String")), _("titleLink", "titleLink", c(), s("String")), _("titleLinkHostname", "titleLinkHostname", c(), s("String")), _("text", "text", c(), s("String")), _("icon", "icon", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("url", "url", c(), m(s("String"))), _("metadata", "metadata", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("name", "name", c(), m(s("String"))), _("mimeType", "mimeType", c(), s("String")), _("size", "size", c(), m(s("Int"))), _("isImage", "isImage", c(), m(s("Boolean"))), _("imageWidth", "imageWidth", c(), s("Int")), _("imageHeight", "imageHeight", c(), s("Int")), _("imageFormat", "imageFormat", c(), s("String")))))), _("image", "image", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("url", "url", c(), m(s("String"))), _("metadata", "metadata", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("name", "name", c(), m(s("String"))), _("mimeType", "mimeType", c(), s("String")), _("size", "size", c(), m(s("Int"))), _("isImage", "isImage", c(), m(s("Boolean"))), _("imageWidth", "imageWidth", c(), s("Int")), _("imageHeight", "imageHeight", c(), s("Int")), _("imageFormat", "imageFormat", c(), s("String")))))), _("socialImage", "socialImage", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("url", "url", c(), m(s("String"))), _("metadata", "metadata", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("name", "name", c(), m(s("String"))), _("mimeType", "mimeType", c(), s("String")), _("size", "size", c(), m(s("Int"))), _("isImage", "isImage", c(), m(s("Boolean"))), _("imageWidth", "imageWidth", c(), s("Int")), _("imageHeight", "imageHeight", c(), s("Int")), _("imageFormat", "imageFormat", c(), s("String")))))), _("imageFallback", "imageFallback", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("photo", "photo", c(), m(s("String"))), _("text", "text", c(), m(s("String"))))), _("keyboard", "keyboard", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("buttons", "buttons", c(), m(o(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("title", "title", c(), m(s("String"))), _("style", "style", c(), m(s("String"))), _("url", "url", c(), s("String")))))))))), _("fallback", "fallback", c(), m(s("String"))))), d("MessageAttachmentPurchase", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("purchase", "purchase", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("state", "state", c(), m(s("String"))), _("amount", "amount", c(), m(s("Int")))))), _("fallback", "fallback", c(), m(s("String")))))),
            P = p(_("__typename", "__typename", c(), m(s("String"))), d("ImageSticker", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("pack", "pack", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("title", "title", c(), m(s("String")))))), _("image", "image", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("uuid", "uuid", c(), m(s("String"))))))))),
            D = p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("date", "date", c(), m(s("Date"))), _("message", "message", c(), s("String")), _("sender", "sender", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("User", M)))), _("senderBadge", "senderBadge", c(), p(_("__typename", "__typename", c(), m(s("String"))), y("UserBadge", C))), _("fallback", "fallback", c(), m(s("String"))), _("source", "source", c(), p(_("__typename", "__typename", c(), m(s("String"))), d("MessageSourceChat", p(_("__typename", "__typename", c(), m(s("String"))), _("chat", "chat", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), d("PrivateRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))))), d("SharedRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("isChannel", "isChannel", c(), m(s("Boolean"))), _("membersCount", "membersCount", c(), m(s("Int")))))))))))), _("spans", "spans", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("MessageSpan", k)))))), d("GeneralMessage", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("edited", "edited", c(), m(s("Boolean"))), _("commentsCount", "commentsCount", c(), m(s("Int"))), _("attachments", "attachments", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("ModernMessageAttachment", R)))))))), d("StickerMessage", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("sticker", "sticker", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("Sticker", P))))))),
            w = p(_("__typename", "__typename", c(), m(s("String"))), _("reaction", "reaction", c(), m(s("String"))), _("count", "count", c(), m(s("Int"))), _("setByMe", "setByMe", c(), m(s("Boolean")))),
            $ = p(_("__typename", "__typename", c(), m(s("String"))), d("InviteServiceMetadata", p(_("__typename", "__typename", c(), m(s("String"))), _("users", "users", c(), o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))))))), _("invitedBy", "invitedBy", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID")))))))), d("KickServiceMetadata", p(_("__typename", "__typename", c(), m(s("String"))), _("user", "user", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID")))))), _("kickedBy", "kickedBy", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID")))))))), d("TitleChangeServiceMetadata", p(_("__typename", "__typename", c(), m(s("String"))), _("title", "title", c(), m(s("String"))))), d("PhotoChangeServiceMetadata", p(_("__typename", "__typename", c(), m(s("String"))), _("photo", "photo", c(), s("String")))), d("PostRespondServiceMetadata", p(_("__typename", "__typename", c(), m(s("String"))), _("respondType", "respondType", c(), m(s("ID")))))),
            A = p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("date", "date", c(), m(s("Date"))), _("sender", "sender", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("User", M)))), _("senderBadge", "senderBadge", c(), p(_("__typename", "__typename", c(), m(s("String"))), y("UserBadge", C))), _("message", "message", c(), s("String")), _("fallback", "fallback", c(), m(s("String"))), _("source", "source", c(), p(_("__typename", "__typename", c(), m(s("String"))), d("MessageSourceChat", p(_("__typename", "__typename", c(), m(s("String"))), _("chat", "chat", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), d("PrivateRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("user", "user", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID")))))))), d("SharedRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("title", "title", c(), m(s("String"))), _("isChannel", "isChannel", c(), m(s("Boolean"))), _("membersCount", "membersCount", c(), m(s("Int")))))))))))), _("spans", "spans", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("MessageSpan", k)))))), d("GeneralMessage", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("edited", "edited", c(), m(s("Boolean"))), _("commentsCount", "commentsCount", c(), m(s("Int"))), _("attachments", "attachments", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("ModernMessageAttachment", R)))))), _("quotedMessages", "quotedMessages", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("ModernMessage", D)))))), _("reactionCounters", "reactionCounters", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("ReactionCounter", w)))))), _("overrideAvatar", "overrideAvatar", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("uuid", "uuid", c(), m(s("String"))), _("crop", "crop", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("x", "x", c(), m(s("Int"))), _("y", "y", c(), m(s("Int"))), _("w", "w", c(), m(s("Int"))), _("h", "h", c(), m(s("Int"))))))), _("overrideName", "overrideName", c(), s("String")))), d("StickerMessage", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("commentsCount", "commentsCount", c(), m(s("Int"))), _("quotedMessages", "quotedMessages", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("ModernMessage", D)))))), _("sticker", "sticker", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("Sticker", P)))), _("reactionCounters", "reactionCounters", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("ReactionCounter", w)))))), _("overrideAvatar", "overrideAvatar", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("uuid", "uuid", c(), m(s("String"))), _("crop", "crop", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("x", "x", c(), m(s("Int"))), _("y", "y", c(), m(s("Int"))), _("w", "w", c(), m(s("Int"))), _("h", "h", c(), m(s("Int"))))))), _("overrideName", "overrideName", c(), s("String")))), d("ServiceMessage", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("serviceMetadata", "serviceMetadata", c(), p(_("__typename", "__typename", c(), m(s("String"))), y("ServiceMetadata", $)))))),
            B = p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))), _("photo", "photo", c(), s("String")), _("shortname", "shortname", c(), s("String")), _("about", "about", c(), s("String")), _("alphaIsCommunity", "isCommunity", c(), m(s("Boolean"))), _("alphaIsPrivate", "private", c(), m(s("Boolean"))), _("membersCount", "membersCount", c(), m(s("Int"))), _("betaIsAdmin", "isAdmin", c(), m(s("Boolean"))), _("betaMembersCanInvite", "membersCanInvite", c(), m(s("Boolean")))),
            U = p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))), _("firstName", "firstName", c(), m(s("String"))), _("lastName", "lastName", c(), s("String")), _("photo", "photo", c(), s("String")), _("email", "email", c(), s("String")), _("online", "online", c(), m(s("Boolean"))), _("lastSeen", "lastSeen", c(), s("String")), _("isBot", "isBot", c(), m(s("Boolean"))), _("shortname", "shortname", c(), s("String")), _("inContacts", "inContacts", c(), m(s("Boolean"))), _("primaryOrganization", "primaryOrganization", c(), p(_("__typename", "__typename", c(), m(s("String"))), y("Organization", B)))),
            z = p(_("__typename", "__typename", c(), m(s("String"))), d("PrivateRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("user", "user", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("User", U)))), _("settings", "settings", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("mute", "mute", c(), s("Boolean"))))), _("pinnedMessage", "pinnedMessage", c(), p(_("__typename", "__typename", c(), m(s("String"))), y("ModernMessage", A))), _("myBadge", "myBadge", c(), p(_("__typename", "__typename", c(), m(s("String"))), y("UserBadge", C))))), d("SharedRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("kind", "kind", c(), m(s("String"))), _("isChannel", "isChannel", c(), m(s("Boolean"))), _("isPremium", "isPremium", c(), m(s("Boolean"))), _("title", "title", c(), m(s("String"))), _("photo", "photo", c(), m(s("String"))), _("membership", "membership", c(), m(s("String"))), _("role", "role", c(), m(s("String"))), _("canEdit", "canEdit", c(), m(s("Boolean"))), _("canSendMessage", "canSendMessage", c(), m(s("Boolean"))), _("membersCount", "membersCount", c(), m(s("Int"))), _("canUnpinMessage", "canUnpinMessage", c(), m(s("Boolean"))), _("pinnedMessage", "pinnedMessage", c(), p(_("__typename", "__typename", c(), m(s("String"))), y("ModernMessage", A))), _("organization", "organization", c(), p(_("__typename", "__typename", c(), m(s("String"))), y("Organization", B))), _("settings", "settings", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("mute", "mute", c(), s("Boolean"))))), _("myBadge", "myBadge", c(), p(_("__typename", "__typename", c(), m(s("String"))), y("UserBadge", C))), _("owner", "owner", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("firstName", "firstName", c(), m(s("String"))), _("isYou", "isYou", c(), m(s("Boolean"))))), _("repliesEnabled", "repliesEnabled", c(), m(s("Boolean")))))),
            O = p(_("__typename", "__typename", c(), m(s("String"))), d("ChatMessageReceived", p(_("__typename", "__typename", c(), m(s("String"))), _("message", "message", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("ModernMessage", A)))), _("repeatKey", "repeatKey", c(), s("String")))), d("ChatMessageUpdated", p(_("__typename", "__typename", c(), m(s("String"))), _("message", "message", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("ModernMessage", A)))))), d("ChatMessageDeleted", p(_("__typename", "__typename", c(), m(s("String"))), _("message", "message", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID")))))))), d("ChatUpdated", p(_("__typename", "__typename", c(), m(s("String"))), _("chat", "chat", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("Room", z)))))), d("ChatLostAccess", p(_("__typename", "__typename", c(), m(s("String"))), _("lostAccess", "lostAccess", c(), m(s("Boolean")))))),
            q = p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("deleted", "deleted", c(), m(s("Boolean"))), _("betaComment", "comment", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("ModernMessage", A)))), _("parentComment", "parentComment", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("betaComment", "comment", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("message", "message", c(), s("String"))))))), _("childComments", "childComments", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))))))))),
            T = p(_("__typename", "__typename", c(), m(s("String"))), d("CommentReceived", p(_("__typename", "__typename", c(), m(s("String"))), _("comment", "comment", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("CommentEntry", q)))))), d("CommentUpdated", p(_("__typename", "__typename", c(), m(s("String"))), _("comment", "comment", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("CommentEntry", q))))))),
            x = p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("startTime", "startTime", c(), s("Date")), _("peers", "peers", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("user", "user", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("User", U)))), _("mediaState", "mediaState", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("audioPaused", "audioPaused", c(), m(s("Boolean"))), _("videoPaused", "videoPaused", c(), m(s("Boolean"))), _("screencastEnabled", "screencastEnabled", c(), m(s("Boolean"))))))))))), _("iceServers", "iceServers", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("urls", "urls", c(), m(o(m(s("String"))))), _("username", "username", c(), s("String")), _("credential", "credential", c(), s("String"))))))), _("room", "room", c(), p(_("__typename", "__typename", c(), m(s("String"))), d("SharedRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("title", "title", c(), m(s("String"))), _("isChannel", "isChannel", c(), m(s("Boolean"))), _("membersCount", "membersCount", c(), m(s("Int"))), _("photo", "photo", c(), m(s("String"))), _("owner", "owner", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))))))), d("PrivateRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("user", "user", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))), _("photo", "photo", c(), s("String")))))))))),
            F = p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("startTime", "startTime", c(), s("Date")), _("iceServers", "iceServers", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("urls", "urls", c(), m(o(m(s("String"))))), _("username", "username", c(), s("String")), _("credential", "credential", c(), s("String")))))))),
            N = p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("date", "date", c(), m(s("Date"))), _("sender", "sender", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))), _("photo", "photo", c(), s("String")), _("firstName", "firstName", c(), m(s("String")))))), _("message", "message", c(), s("String")), _("fallback", "fallback", c(), m(s("String"))), d("GeneralMessage", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("quotedMessages", "quotedMessages", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))))))))))),
            W = p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("cid", "cid", c(), m(s("ID"))), _("fid", "fid", c(), m(s("ID"))), _("kind", "kind", c(), m(s("String"))), _("isChannel", "isChannel", c(), m(s("Boolean"))), _("isPremium", "isPremium", c(), m(s("Boolean"))), _("title", "title", c(), m(s("String"))), _("photo", "photo", c(), m(s("String"))), _("unreadCount", "unreadCount", c(), m(s("Int"))), _("isMuted", "isMuted", c(), m(s("Boolean"))), _("hasActiveCall", "hasActiveCall", c(), m(s("Boolean"))), _("haveMention", "haveMention", c(), m(s("Boolean"))), _("alphaTopMessage", "topMessage", c(), p(_("__typename", "__typename", c(), m(s("String"))), y("ModernMessage", N))), _("membership", "membership", c(), m(s("String")))),
            E = p(_("__typename", "__typename", c(), m(s("String"))), d("DialogMessageReceived", p(_("__typename", "__typename", c(), m(s("String"))), _("cid", "cid", c(), m(s("ID"))), _("unread", "unread", c(), m(s("Int"))), _("globalUnread", "globalUnread", c(), m(s("Int"))), _("alphaMessage", "message", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("ModernMessage", N), d("ServiceMessage", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("serviceMetadata", "serviceMetadata", c(), p(_("__typename", "__typename", c(), m(s("String")))))))))), _("haveMention", "haveMention", c(), m(s("Boolean"))), _("silent", "silent", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("mobile", "mobile", c(), m(s("Boolean"))), _("desktop", "desktop", c(), m(s("Boolean")))))), _("showNotification", "showNotification", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("mobile", "mobile", c(), m(s("Boolean"))), _("desktop", "desktop", c(), m(s("Boolean")))))), _("membership", "membership", c(), m(s("String"))))), d("DialogMessageUpdated", p(_("__typename", "__typename", c(), m(s("String"))), _("cid", "cid", c(), m(s("ID"))), _("alphaMessage", "message", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("ModernMessage", N)))), _("haveMention", "haveMention", c(), m(s("Boolean"))))), d("DialogMessageDeleted", p(_("__typename", "__typename", c(), m(s("String"))), _("cid", "cid", c(), m(s("ID"))), _("alphaMessage", "message", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("ModernMessage", N)))), _("alphaPrevMessage", "prevMessage", c(), p(_("__typename", "__typename", c(), m(s("String"))), y("ModernMessage", N))), _("unread", "unread", c(), m(s("Int"))), _("globalUnread", "globalUnread", c(), m(s("Int"))), _("haveMention", "haveMention", c(), m(s("Boolean"))))), d("DialogMessageRead", p(_("__typename", "__typename", c(), m(s("String"))), _("cid", "cid", c(), m(s("ID"))), _("mid", "mid", c(), s("ID")), _("unread", "unread", c(), m(s("Int"))), _("globalUnread", "globalUnread", c(), m(s("Int"))), _("haveMention", "haveMention", c(), m(s("Boolean"))))), d("DialogMuteChanged", p(_("__typename", "__typename", c(), m(s("String"))), _("cid", "cid", c(), m(s("ID"))), _("mute", "mute", c(), m(s("Boolean"))))), d("DialogPeerUpdated", p(_("__typename", "__typename", c(), m(s("String"))), _("cid", "cid", c(), m(s("ID"))), _("peer", "peer", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), d("PrivateRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("user", "user", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))), _("photo", "photo", c(), s("String"))))))), d("SharedRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("title", "title", c(), m(s("String"))), _("photo", "photo", c(), m(s("String")))))))))), d("DialogDeleted", p(_("__typename", "__typename", c(), m(s("String"))), _("cid", "cid", c(), m(s("ID"))), _("globalUnread", "globalUnread", c(), m(s("Int"))))), d("DialogBump", p(_("__typename", "__typename", c(), m(s("String"))), _("cid", "cid", c(), m(s("ID"))), _("globalUnread", "globalUnread", c(), m(s("Int"))), _("unread", "unread", c(), m(s("Int"))), _("topMessage", "topMessage", c(), p(_("__typename", "__typename", c(), m(s("String"))), y("ModernMessage", N), d("ServiceMessage", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("serviceMetadata", "serviceMetadata", c(), p(_("__typename", "__typename", c(), m(s("String"))))))))), _("haveMention", "haveMention", c(), m(s("Boolean"))), _("membership", "membership", c(), m(s("String"))))), d("DialogCallStateChanged", p(_("__typename", "__typename", c(), m(s("String"))), _("cid", "cid", c(), m(s("ID"))), _("hasActiveCall", "hasActiveCall", c(), m(s("Boolean")))))),
            G = p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("kind", "kind", c(), m(s("String"))), _("title", "title", c(), m(s("String"))), _("photo", "photo", c(), m(s("String"))), _("membersCount", "membersCount", c(), m(s("Int"))), _("membership", "membership", c(), m(s("String"))), _("organization", "organization", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))), _("photo", "photo", c(), s("String")))), _("premiumSettings", "premiumSettings", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("price", "price", c(), m(s("Int"))), _("interval", "interval", c(), s("String")))), _("isPremium", "isPremium", c(), m(s("Boolean"))), _("premiumPassIsActive", "premiumPassIsActive", c(), m(s("Boolean")))),
            L = p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("title", "title", c(), m(s("String"))), _("shortname", "shortname", c(), s("String")), _("chatsCount", "chatsCount", c(), m(s("Int"))), _("chats", "chats", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("SharedRoom", G)))))), _("description", "description", c(), s("String")), _("image", "image", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("uuid", "uuid", c(), m(s("String"))), _("crop", "crop", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("x", "x", c(), m(s("Int"))), _("y", "y", c(), m(s("Int"))), _("w", "w", c(), m(s("Int"))), _("h", "h", c(), m(s("Int"))))))))),
            j = p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("title", "title", c(), m(s("String"))), _("shortname", "shortname", c(), s("String")), _("chatsCount", "chatsCount", c(), m(s("Int"))), _("description", "description", c(), s("String")), _("image", "image", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("uuid", "uuid", c(), m(s("String"))), _("crop", "crop", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("x", "x", c(), m(s("Int"))), _("y", "y", c(), m(s("Int"))), _("w", "w", c(), m(s("Int"))), _("h", "h", c(), m(s("Int"))))))))),
            H = p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("date", "date", c(), m(s("Date"))), _("sender", "sender", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("User", M)))), _("senderBadge", "senderBadge", c(), p(_("__typename", "__typename", c(), m(s("String"))), y("UserBadge", C))), _("message", "message", c(), s("String")), _("fallback", "fallback", c(), m(s("String"))), _("spans", "spans", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("MessageSpan", k)))))), d("GeneralMessage", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("edited", "edited", c(), m(s("Boolean"))), _("commentsCount", "commentsCount", c(), m(s("Int"))), _("attachments", "attachments", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("ModernMessageAttachment", R)))))), _("quotedMessages", "quotedMessages", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("ModernMessage", D)))))), _("reactionCounters", "reactionCounters", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("ReactionCounter", w)))))), _("overrideAvatar", "overrideAvatar", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("uuid", "uuid", c(), m(s("String"))), _("crop", "crop", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("x", "x", c(), m(s("Int"))), _("y", "y", c(), m(s("Int"))), _("w", "w", c(), m(s("Int"))), _("h", "h", c(), m(s("Int"))))))), _("overrideName", "overrideName", c(), s("String")))), d("StickerMessage", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("commentsCount", "commentsCount", c(), m(s("Int"))), _("quotedMessages", "quotedMessages", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("ModernMessage", D)))))), _("sticker", "sticker", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("Sticker", P)))), _("reactionCounters", "reactionCounters", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("ReactionCounter", w)))))), _("overrideAvatar", "overrideAvatar", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("uuid", "uuid", c(), m(s("String"))), _("crop", "crop", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("x", "x", c(), m(s("Int"))), _("y", "y", c(), m(s("Int"))), _("w", "w", c(), m(s("Int"))), _("h", "h", c(), m(s("Int"))))))), _("overrideName", "overrideName", c(), s("String")))), d("ServiceMessage", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("serviceMetadata", "serviceMetadata", c(), p(_("__typename", "__typename", c(), m(s("String"))), y("ServiceMetadata", $)))))),
            K = p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("seq", "seq", c(), m(s("Int"))), _("state", "state", c(), m(s("String"))), _("sdp", "sdp", c(), s("String")), _("ice", "ice", c(), m(o(m(s("String"))))), _("iceTransportPolicy", "iceTransportPolicy", c(), m(s("String"))), _("receivers", "receivers", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("peerId", "peerId", c(), s("ID")), _("kind", "kind", c(), m(s("String"))), _("videoSource", "videoSource", c(), s("String")), _("mid", "mid", c(), s("String"))))))), _("senders", "senders", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("kind", "kind", c(), m(s("String"))), _("videoSource", "videoSource", c(), s("String")), _("codecParams", "codecParams", c(), s("String")), _("mid", "mid", c(), s("String")))))))),
            Q = p(_("__typename", "__typename", c(), m(s("String"))), _("user", "user", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))), _("photo", "photo", c(), s("String")), _("primaryOrganization", "primaryOrganization", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String")))))))), _("reaction", "reaction", c(), m(s("String")))),
            V = p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("kind", "kind", c(), m(s("String"))), _("isChannel", "isChannel", c(), m(s("Boolean"))), _("isPremium", "isPremium", c(), m(s("Boolean"))), _("title", "title", c(), m(s("String"))), _("photo", "photo", c(), m(s("String"))), _("membersCount", "membersCount", c(), m(s("Int"))), _("settings", "settings", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("mute", "mute", c(), s("Boolean")))))),
            J = p(_("__typename", "__typename", c(), m(s("String"))), d("PrivateRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("user", "user", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))), _("photo", "photo", c(), s("String"))))), _("settings", "settings", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("mute", "mute", c(), s("Boolean"))))))), d("SharedRoom", p(_("__typename", "__typename", c(), m(s("String"))), y("SharedRoom", V)))),
            Y = p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("text", "text", c(), s("String")), _("content", "content", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), d("NewCommentNotification", p(_("__typename", "__typename", c(), m(s("String"))), _("comment", "comment", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("CommentEntry", q)))), _("peer", "peer", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("peerRoot", "peerRoot", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), d("CommentPeerRootMessage", p(_("__typename", "__typename", c(), m(s("String"))), _("message", "message", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), d("GeneralMessage", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("fallback", "fallback", c(), m(s("String"))), _("message", "message", c(), s("String")), _("sender", "sender", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String")))))), _("senderBadge", "senderBadge", c(), p(_("__typename", "__typename", c(), m(s("String"))), y("UserBadge", C)))))))), _("chat", "chat", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("Room", J)))))), d("CommentPeerRootPost", p(_("__typename", "__typename", c(), m(s("String"))), _("post", "post", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))))))))))), _("subscription", "subscription", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("type", "type", c(), s("String"))))))))))))))),
            X = p(_("__typename", "__typename", c(), m(s("String"))), d("NotificationReceived", p(_("__typename", "__typename", c(), m(s("String"))), _("center", "center", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("unread", "unread", c(), m(s("Int")))))), _("notification", "notification", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("Notification", Y)))))), d("NotificationUpdated", p(_("__typename", "__typename", c(), m(s("String"))), _("center", "center", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("unread", "unread", c(), m(s("Int")))))), _("notification", "notification", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("Notification", Y)))))), d("NotificationDeleted", p(_("__typename", "__typename", c(), m(s("String"))), _("center", "center", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("unread", "unread", c(), m(s("Int")))))), _("notification", "notification", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID")))))))), d("NotificationRead", p(_("__typename", "__typename", c(), m(s("String"))), _("center", "center", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("unread", "unread", c(), m(s("Int")))))))), d("NotificationContentUpdated", p(_("__typename", "__typename", c(), m(s("String"))), _("content", "content", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), d("UpdatedNotificationContentComment", p(_("__typename", "__typename", c(), m(s("String"))), _("peer", "peer", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("peerRoot", "peerRoot", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), d("CommentPeerRootMessage", p(_("__typename", "__typename", c(), m(s("String"))), _("message", "message", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), d("GeneralMessage", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("fallback", "fallback", c(), m(s("String"))), _("message", "message", c(), s("String")), _("sender", "sender", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String")))))), _("senderBadge", "senderBadge", c(), p(_("__typename", "__typename", c(), m(s("String"))), y("UserBadge", C)))))))), _("chat", "chat", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("Room", J)))))), d("CommentPeerRootPost", p(_("__typename", "__typename", c(), m(s("String"))), _("post", "post", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))))))))))), _("id", "id", c(), m(s("ID"))), _("subscription", "subscription", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("type", "type", c(), s("String"))))))), _("comment", "comment", c(), p(_("__typename", "__typename", c(), m(s("String"))), y("CommentEntry", q))))))))))),
            Z = p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("isMine", "isMine", c(), m(s("Boolean"))), _("isDeleted", "isDeleted", c(), m(s("Boolean"))), _("superAccountId", "superAccountId", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))), _("photo", "photo", c(), s("String")), _("shortname", "shortname", c(), s("String")), _("website", "website", c(), s("String")), _("websiteTitle", "websiteTitle", c(), s("String")), _("about", "about", c(), s("String")), _("twitter", "twitter", c(), s("String")), _("facebook", "facebook", c(), s("String")), _("linkedin", "linkedin", c(), s("String")), _("instagram", "instagram", c(), s("String")), _("membersCount", "membersCount", c(), m(s("Int"))), _("alphaIsPrivate", "private", c(), m(s("Boolean"))), _("betaIsOwner", "isOwner", c(), m(s("Boolean"))), _("betaIsAdmin", "isAdmin", c(), m(s("Boolean"))), _("alphaFeatured", "featured", c(), m(s("Boolean"))), _("alphaIsCommunity", "isCommunity", c(), m(s("Boolean"))), _("betaPublicRoomsCount", "roomsCount", c(), m(s("Int"))), _("betaMembersCanInvite", "membersCanInvite", c(), m(s("Boolean")))),
            ee = p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))), _("photo", "photo", c(), s("String")), _("isMine", "isMine", c(), m(s("Boolean"))), _("membersCount", "membersCount", c(), m(s("Int"))), _("shortname", "shortname", c(), s("String")), _("about", "about", c(), s("String")), _("betaIsOwner", "isOwner", c(), m(s("Boolean"))), _("betaIsAdmin", "isAdmin", c(), m(s("Boolean"))), _("alphaIsCommunity", "isCommunity", c(), m(s("Boolean"))), _("alphaIsPrivate", "private", c(), m(s("Boolean"))), _("betaMembersCanInvite", "membersCanInvite", c(), m(s("Boolean")))),
            te = p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))), _("photoRef", "photoRef", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("uuid", "uuid", c(), m(s("String"))), _("crop", "crop", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("x", "x", c(), m(s("Int"))), _("y", "y", c(), m(s("Int"))), _("w", "w", c(), m(s("Int"))), _("h", "h", c(), m(s("Int"))))))), _("website", "website", c(), s("String")), _("websiteTitle", "websiteTitle", c(), s("String")), _("about", "about", c(), s("String")), _("twitter", "twitter", c(), s("String")), _("facebook", "facebook", c(), s("String")), _("linkedin", "linkedin", c(), s("String")), _("instagram", "instagram", c(), s("String")), _("shortname", "shortname", c(), s("String")), _("alphaIsCommunity", "isCommunity", c(), m(s("Boolean"))), _("alphaIsPrivate", "private", c(), m(s("Boolean"))), _("alphaFeatured", "featured", c(), m(s("Boolean"))), _("alphaPublished", "published", c(), m(s("Boolean"))), _("alphaEditorial", "editorial", c(), m(s("Boolean"))), _("betaMembersCanInvite", "membersCanInvite", c(), m(s("Boolean")))),
            ne = p(_("__typename", "__typename", c(), m(s("String"))), d("TextParagraph", p(_("__typename", "__typename", c(), m(s("String"))), _("text", "text", c(), m(s("String"))), _("spans", "spans", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), d("PostSpanBold", p(_("__typename", "__typename", c(), m(s("String"))), _("offset", "offset", c(), m(s("Int"))), _("length", "length", c(), m(s("Int"))))), d("PostSpanItalic", p(_("__typename", "__typename", c(), m(s("String"))), _("offset", "offset", c(), m(s("Int"))), _("length", "length", c(), m(s("Int"))))), d("PostSpanIrony", p(_("__typename", "__typename", c(), m(s("String"))), _("offset", "offset", c(), m(s("Int"))), _("length", "length", c(), m(s("Int"))))), d("PostSpanLink", p(_("__typename", "__typename", c(), m(s("String"))), _("offset", "offset", c(), m(s("Int"))), _("length", "length", c(), m(s("Int"))), _("url", "url", c(), m(s("String")))))))))))), d("ImageParagraph", p(_("__typename", "__typename", c(), m(s("String"))), _("url", "url", c(), m(s("String"))), _("image", "image", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("uuid", "uuid", c(), m(s("String")))))), _("fileMetadata", "fileMetadata", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("isImage", "isImage", c(), m(s("Boolean"))), _("imageWidth", "imageWidth", c(), s("Int")), _("imageHeight", "imageHeight", c(), s("Int")), _("imageFormat", "imageFormat", c(), s("String"))))))), d("H1Paragraph", p(_("__typename", "__typename", c(), m(s("String"))), _("text", "text", c(), m(s("String"))))), d("H2Paragraph", p(_("__typename", "__typename", c(), m(s("String"))), _("text", "text", c(), m(s("String")))))),
            ae = p(_("__typename", "__typename", c(), m(s("String"))), _("direct", "direct", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("showNotification", "showNotification", c(), m(s("Boolean"))), _("sound", "sound", c(), m(s("Boolean")))))), _("secretChat", "secretChat", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("showNotification", "showNotification", c(), m(s("Boolean"))), _("sound", "sound", c(), m(s("Boolean")))))), _("organizationChat", "organizationChat", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("showNotification", "showNotification", c(), m(s("Boolean"))), _("sound", "sound", c(), m(s("Boolean")))))), _("communityChat", "communityChat", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("showNotification", "showNotification", c(), m(s("Boolean"))), _("sound", "sound", c(), m(s("Boolean")))))), _("comments", "comments", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("showNotification", "showNotification", c(), m(s("Boolean"))), _("sound", "sound", c(), m(s("Boolean")))))), _("notificationPreview", "notificationPreview", c(), m(s("String")))),
            ie = p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("title", "title", c(), m(s("String"))), _("content", "content", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("Paragraph", ne)))))), _("publishedCopy", "publishedCopy", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))))), _("channel", "channel", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("title", "title", c(), m(s("String"))), _("shortname", "shortname", c(), m(s("String"))))), _("createdAt", "createdAt", c(), m(s("Date"))), _("updatedAt", "updatedAt", c(), s("Date")), _("deletedAt", "deletedAt", c(), s("Date"))),
            re = p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("title", "title", c(), m(s("String"))), _("content", "content", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("Paragraph", ne)))))), _("channel", "channel", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("title", "title", c(), m(s("String"))), _("shortname", "shortname", c(), m(s("String"))))), _("author", "author", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))))), _("draft", "draft", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))))), _("canEdit", "canEdit", c(), m(s("Boolean"))), _("createdAt", "createdAt", c(), m(s("Date"))), _("updatedAt", "updatedAt", c(), s("Date")), _("deletedAt", "deletedAt", c(), s("Date"))),
            oe = p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("primaryEmail", "primaryEmail", c(), m(s("String"))), _("emailFrequency", "emailFrequency", c(), m(s("String"))), _("excludeMutedChats", "excludeMutedChats", c(), m(s("Boolean"))), _("countUnreadChats", "countUnreadChats", c(), m(s("Boolean"))), _("whoCanSeeEmail", "whoCanSeeEmail", c(), m(s("String"))), _("whoCanSeePhone", "whoCanSeePhone", c(), m(s("String"))), _("desktop", "desktop", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("PlatformNotificationSettings", ae)))), _("mobile", "mobile", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("PlatformNotificationSettings", ae))))),
            me = p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("isChannel", "isChannel", c(), m(s("Boolean"))), _("isPremium", "isPremium", c(), m(s("Boolean"))), _("premiumPassIsActive", "premiumPassIsActive", c(), m(s("Boolean"))), _("premiumSubscription", "premiumSubscription", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("state", "state", c(), m(s("String"))))), _("premiumSettings", "premiumSettings", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("price", "price", c(), m(s("Int"))), _("interval", "interval", c(), s("String")))), _("membership", "membership", c(), m(s("String"))), _("owner", "owner", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))))), _("title", "title", c(), m(s("String"))), _("photo", "photo", c(), m(s("String"))), _("membersCount", "membersCount", c(), m(s("Int"))), _("description", "description", c(), s("String")), _("previewMembers", "previewMembers", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))), _("photo", "photo", c(), s("String")))))))),
            se = p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("title", "title", c(), m(s("String"))), _("photo", "photo", c(), m(s("String"))), _("membersCount", "membersCount", c(), m(s("Int"))), _("photo", "photo", c(), m(s("String")))),
            _e = p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("title", "title", c(), m(s("String"))), _("stickers", "stickers", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("Sticker", P))))))),
            pe = p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))), _("photo", "photo", c(), s("String")), _("shortname", "shortname", c(), s("String")), _("isBot", "isBot", c(), m(s("Boolean"))), _("primaryOrganization", "primaryOrganization", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String")))))),
            de = p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))), _("firstName", "firstName", c(), m(s("String"))), _("lastName", "lastName", c(), s("String")), _("photo", "photo", c(), s("String")), _("phone", "phone", c(), s("String")), _("email", "email", c(), s("String")), _("website", "website", c(), s("String")), _("about", "about", c(), s("String")), _("location", "location", c(), s("String")), _("isBot", "isBot", c(), m(s("Boolean"))), _("isDeleted", "isDeleted", c(), m(s("Boolean"))), _("online", "online", c(), m(s("Boolean"))), _("lastSeen", "lastSeen", c(), s("String")), _("linkedin", "linkedin", c(), s("String")), _("instagram", "instagram", c(), s("String")), _("twitter", "twitter", c(), s("String")), _("facebook", "facebook", c(), s("String")), _("shortname", "shortname", c(), s("String")), _("audienceSize", "audienceSize", c(), m(s("Int"))), _("inContacts", "inContacts", c(), m(s("Boolean"))), _("primaryOrganization", "primaryOrganization", c(), p(_("__typename", "__typename", c(), m(s("String"))), y("Organization", B)))),
            ye = p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("status", "status", c(), m(s("String"))), _("date", "date", c(), m(s("String"))), _("operation", "operation", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), d("WalletTransactionDeposit", p(_("__typename", "__typename", c(), m(s("String"))), _("amount", "amount", c(), m(s("Int"))), _("payment", "payment", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("status", "status", c(), m(s("String"))), _("card", "card", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("brand", "brand", c(), m(s("String"))), _("last4", "last4", c(), m(s("String"))))), _("intent", "intent", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("clientSecret", "clientSecret", c(), m(s("String"))))))))), d("WalletTransactionIncome", p(_("__typename", "__typename", c(), m(s("String"))), _("amount", "amount", c(), m(s("Int"))), _("payment", "payment", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("status", "status", c(), m(s("String"))), _("card", "card", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("brand", "brand", c(), m(s("String"))), _("last4", "last4", c(), m(s("String"))))), _("intent", "intent", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("clientSecret", "clientSecret", c(), m(s("String"))))))), _("source", "source", c(), p(_("__typename", "__typename", c(), m(s("String"))), d("WalletSubscription", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("product", "product", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), d("WalletProductGroup", p(_("__typename", "__typename", c(), m(s("String"))), _("group", "group", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("title", "title", c(), m(s("String"))), _("photo", "photo", c(), m(s("String")))))))), d("WalletProductDonation", p(_("__typename", "__typename", c(), m(s("String"))), _("user", "user", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))), _("photo", "photo", c(), s("String"))))))), d("WalletProductDonationMessage", p(_("__typename", "__typename", c(), m(s("String"))), _("user", "user", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))), _("photo", "photo", c(), s("String"))))), _("chat", "chat", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), d("SharedRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("title", "title", c(), m(s("String")))))))))), d("WalletProductDonationReaction", p(_("__typename", "__typename", c(), m(s("String"))), _("user", "user", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))), _("photo", "photo", c(), s("String"))))), _("chat", "chat", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), d("SharedRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("title", "title", c(), m(s("String"))))))))))))))), d("Purchase", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("user", "user", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))), _("photo", "photo", c(), s("String"))))), _("product", "product", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), d("WalletProductGroup", p(_("__typename", "__typename", c(), m(s("String"))), _("group", "group", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("title", "title", c(), m(s("String"))), _("photo", "photo", c(), m(s("String")))))))), d("WalletProductDonation", p(_("__typename", "__typename", c(), m(s("String"))), _("user", "user", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))), _("photo", "photo", c(), s("String"))))))), d("WalletProductDonationMessage", p(_("__typename", "__typename", c(), m(s("String"))), _("user", "user", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))), _("photo", "photo", c(), s("String"))))), _("chat", "chat", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), d("SharedRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("title", "title", c(), m(s("String")))))))))), d("WalletProductDonationReaction", p(_("__typename", "__typename", c(), m(s("String"))), _("user", "user", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))), _("photo", "photo", c(), s("String"))))), _("chat", "chat", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), d("SharedRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("title", "title", c(), m(s("String"))))))))))))))))))), d("WalletTransactionTransferIn", p(_("__typename", "__typename", c(), m(s("String"))), _("amount", "amount", c(), m(s("Int"))), _("payment", "payment", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("status", "status", c(), m(s("String"))), _("card", "card", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("brand", "brand", c(), m(s("String"))), _("last4", "last4", c(), m(s("String"))))), _("intent", "intent", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("clientSecret", "clientSecret", c(), m(s("String"))))))), _("fromUser", "fromUser", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("User", U)))))), d("WalletTransactionTransferOut", p(_("__typename", "__typename", c(), m(s("String"))), _("amount", "amount", c(), m(s("Int"))), _("walletAmount", "walletAmount", c(), m(s("Int"))), _("chargeAmount", "chargeAmount", c(), m(s("Int"))), _("payment", "payment", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("status", "status", c(), m(s("String"))), _("card", "card", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("brand", "brand", c(), m(s("String"))), _("last4", "last4", c(), m(s("String"))))), _("intent", "intent", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("clientSecret", "clientSecret", c(), m(s("String"))))))), _("toUser", "toUser", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("User", U)))))), d("WalletTransactionSubscription", p(_("__typename", "__typename", c(), m(s("String"))), _("amount", "amount", c(), m(s("Int"))), _("walletAmount", "walletAmount", c(), m(s("Int"))), _("chargeAmount", "chargeAmount", c(), m(s("Int"))), _("subscription", "subscription", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("interval", "interval", c(), m(s("String"))), _("amount", "amount", c(), m(s("Int"))), _("product", "product", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), d("WalletProductGroup", p(_("__typename", "__typename", c(), m(s("String"))), _("group", "group", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("title", "title", c(), m(s("String"))), _("photo", "photo", c(), m(s("String")))))))), d("WalletProductDonation", p(_("__typename", "__typename", c(), m(s("String"))), _("user", "user", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))), _("photo", "photo", c(), s("String"))))))), d("WalletProductDonationMessage", p(_("__typename", "__typename", c(), m(s("String"))), _("user", "user", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))), _("photo", "photo", c(), s("String"))))), _("chat", "chat", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), d("SharedRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("title", "title", c(), m(s("String")))))))))), d("WalletProductDonationReaction", p(_("__typename", "__typename", c(), m(s("String"))), _("user", "user", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))), _("photo", "photo", c(), s("String"))))), _("chat", "chat", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), d("SharedRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("title", "title", c(), m(s("String")))))))))))))))), _("payment", "payment", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("status", "status", c(), m(s("String"))), _("intent", "intent", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("clientSecret", "clientSecret", c(), m(s("String"))))), _("card", "card", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("brand", "brand", c(), m(s("String"))), _("last4", "last4", c(), m(s("String"))))))))), d("WalletTransactionPurchase", p(_("__typename", "__typename", c(), m(s("String"))), _("amount", "amount", c(), m(s("Int"))), _("walletAmount", "walletAmount", c(), m(s("Int"))), _("chargeAmount", "chargeAmount", c(), m(s("Int"))), _("purchase", "purchase", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("product", "product", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), d("WalletProductGroup", p(_("__typename", "__typename", c(), m(s("String"))), _("group", "group", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("title", "title", c(), m(s("String"))), _("photo", "photo", c(), m(s("String")))))))), d("WalletProductDonation", p(_("__typename", "__typename", c(), m(s("String"))), _("user", "user", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))), _("photo", "photo", c(), s("String"))))))), d("WalletProductDonationMessage", p(_("__typename", "__typename", c(), m(s("String"))), _("user", "user", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))), _("photo", "photo", c(), s("String"))))), _("chat", "chat", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), d("SharedRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("title", "title", c(), m(s("String")))))))))), d("WalletProductDonationReaction", p(_("__typename", "__typename", c(), m(s("String"))), _("user", "user", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))), _("photo", "photo", c(), s("String"))))), _("chat", "chat", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), d("SharedRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("title", "title", c(), m(s("String")))))))))))))))), _("payment", "payment", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("status", "status", c(), m(s("String"))), _("intent", "intent", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("clientSecret", "clientSecret", c(), m(s("String"))))), _("card", "card", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("brand", "brand", c(), m(s("String"))), _("last4", "last4", c(), m(s("String"))))))))))))),
            ce = p(_("__typename", "__typename", c(), m(s("String"))), d("WalletUpdateBalance", p(_("__typename", "__typename", c(), m(s("String"))), _("amount", "amount", c(), m(s("Int"))))), d("WalletUpdateLocked", p(_("__typename", "__typename", c(), m(s("String"))), _("isLocked", "isLocked", c(), m(s("Boolean"))), _("failingPaymentsCount", "failingPaymentsCount", c(), m(s("Int"))))), d("WalletUpdateTransactionSuccess", p(_("__typename", "__typename", c(), m(s("String"))), _("transaction", "transaction", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("WalletTransaction", ye)))))), d("WalletUpdateTransactionCanceled", p(_("__typename", "__typename", c(), m(s("String"))), _("transaction", "transaction", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("WalletTransaction", ye)))))), d("WalletUpdateTransactionPending", p(_("__typename", "__typename", c(), m(s("String"))), _("transaction", "transaction", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("WalletTransaction", ye)))))), d("WalletUpdatePaymentStatus", p(_("__typename", "__typename", c(), m(s("String"))), _("payment", "payment", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("status", "status", c(), m(s("String"))), _("intent", "intent", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("clientSecret", "clientSecret", c(), m(s("String"))))), _("card", "card", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("brand", "brand", c(), m(s("String"))), _("last4", "last4", c(), m(s("String"))))))))))),
            ue = p(_("me", "me", c(), p(_("__typename", "__typename", c(), m(s("String"))), y("User", U))), _("myProfile", "myProfile", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("authEmail", "authEmail", c(), s("String")))), _("sessionState", "sessionState", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("isLoggedIn", "isLoggedIn", c(), m(s("Boolean"))), _("isActivated", "isActivated", c(), m(s("Boolean"))), _("isProfileCreated", "isProfileCreated", c(), m(s("Boolean"))), _("isAccountActivated", "isAccountActivated", c(), m(s("Boolean"))), _("isAccountExists", "isAccountExists", c(), m(s("Boolean"))), _("isAccountPicked", "isAccountPicked", c(), m(s("Boolean"))), _("isCompleted", "isCompleted", c(), m(s("Boolean"))), _("isBlocked", "isBlocked", c(), m(s("Boolean")))))), _("myPermissions", "myPermissions", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("roles", "roles", c(), m(o(m(s("String"))))))))),
            le = p(_("appInvite", "invite", c(), m(s("String")))),
            ge = p(_("alphaInviteInfo", "invite", c(u("key", l("inviteKey"))), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("creator", "creator", c(), p(_("__typename", "__typename", c(), m(s("String"))), y("User", U))))), _("appInviteInfo", "appInvite", c(u("key", l("inviteKey"))), p(_("__typename", "__typename", c(), m(s("String"))), _("inviter", "inviter", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("User", U))))))),
            he = p(_("alphaInviteInfo", "invite", c(u("key", l("inviteKey"))), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("key", "key", c(), m(s("String"))), _("orgId", "orgId", c(), m(s("ID"))), _("title", "title", c(), m(s("String"))), _("photo", "photo", c(), s("String")), _("joined", "joined", c(), m(s("Boolean"))), _("creator", "creator", c(), p(_("__typename", "__typename", c(), m(s("String"))), y("User", U))), _("forEmail", "forEmail", c(), s("String")), _("forName", "forName", c(), s("String")), _("membersCount", "membersCount", c(), s("Int")), _("organization", "organization", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("alphaIsCommunity", "isCommunity", c(), m(s("Boolean"))), _("about", "about", c(), s("String"))))))),
            Se = p(_("me", "me", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("audienceSize", "audienceSize", c(), m(s("Int"))), y("User", U))), _("myProfile", "myProfile", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("authEmail", "authEmail", c(), s("String")))), _("myOrganizations", "organizations", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("Organization", B))))))),
            fe = p(_("authPoints", "authPoints", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("email", "email", c(), s("String")), _("phone", "phone", c(), s("String")))))),
            Ie = p(_("alphaResolveShortName", "item", c(u("shortname", l("shortname"))), p(_("__typename", "__typename", c(), m(s("String"))), d("User", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))), _("firstName", "firstName", c(), m(s("String"))), _("lastName", "lastName", c(), s("String")), _("photo", "photo", c(), s("String")), _("online", "online", c(), m(s("Boolean"))))), d("SharedRoom", p(_("__typename", "__typename", c(), m(s("String"))), y("SharedRoom", me))), d("DiscoverChatsCollection", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID")))))))),
            be = p(_("channel", "channel", c(u("id", l("id"))), p(_("__typename", "__typename", c(), m(s("String"))), y("Channel", b)))),
            ve = p(_("channels", "channels", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("Channel", b))))))),
            Me = p(_("messages", "messages", c(u("chatId", l("chatId")), u("first", l("first")), u("before", l("before"))), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("ModernMessage", A)))))), _("conversationState", "state", c(u("id", l("chatId"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("state", "state", c(), s("String"))))), _("room", "room", c(u("id", l("chatId"))), p(_("__typename", "__typename", c(), m(s("String"))), y("Room", z))), _("lastReadedMessage", "lastReadedMessage", c(u("chatId", l("chatId"))), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID")))))),
            Ce = p(_("gammaMessages", "gammaMessages", c(u("chatId", l("chatId")), u("first", l("first")), u("before", l("before"))), p(_("__typename", "__typename", c(), m(s("String"))), _("messages", "messages", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("ModernMessage", A)))))), _("haveMoreForward", "haveMoreForward", c(), s("Boolean")), _("haveMoreBackward", "haveMoreBackward", c(), s("Boolean")))), _("conversationState", "state", c(u("id", l("chatId"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("state", "state", c(), s("String"))))), _("room", "room", c(u("id", l("chatId"))), p(_("__typename", "__typename", c(), m(s("String"))), y("Room", z))), _("lastReadedMessage", "lastReadedMessage", c(u("chatId", l("chatId"))), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID")))))),
            ke = p(_("room", "room", c(u("id", l("id"))), p(_("__typename", "__typename", c(), m(s("String"))), d("SharedRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("title", "title", c(), m(s("String"))), _("description", "description", c(), s("String")), _("photo", "photo", c(), m(s("String"))), _("membersCount", "membersCount", c(), m(s("Int"))), _("previewMembers", "previewMembers", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("photo", "photo", c(), s("String")), _("name", "name", c(), m(s("String")))))))), _("isChannel", "isChannel", c(), m(s("Boolean"))), _("isPremium", "isPremium", c(), m(s("Boolean"))), _("premiumPassIsActive", "premiumPassIsActive", c(), m(s("Boolean"))), _("premiumSubscription", "premiumSubscription", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("state", "state", c(), m(s("String"))))), _("premiumSettings", "premiumSettings", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("price", "price", c(), m(s("Int"))), _("interval", "interval", c(), s("String")))), _("owner", "owner", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("firstName", "firstName", c(), m(s("String")))))))))),
            Re = p(_("betaChatMentionSearch", "mentions", c(u("cid", l("cid")), u("query", l("query")), u("first", l("first")), u("after", l("after"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("items", "items", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), d("MentionSearchOrganization", p(_("__typename", "__typename", c(), m(s("String"))), _("organization", "organization", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("Organization", B)))))), d("MentionSearchUser", p(_("__typename", "__typename", c(), m(s("String"))), _("user", "user", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("User", pe)))), _("fromSameChat", "fromSameChat", c(), m(s("Boolean"))))), d("MentionSearchSharedRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("room", "room", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("SharedRoom", V))))))))))), _("cursor", "cursor", c(), s("String")))))),
            Pe = p(_("message", "message", c(u("messageId", l("id"))), p(_("__typename", "__typename", c(), m(s("String"))), y("ModernMessage", v)))),
            De = p(_("gammaMessages", "batch", c(u("chatId", l("chatId")), u("first", l("limit")), u("after", l("after"))), p(_("__typename", "__typename", c(), m(s("String"))), _("messages", "messages", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("ModernMessage", v)))))), _("haveMoreForward", "haveMoreForward", c(), s("Boolean"))))),
            we = p(_("gammaMessages", "batch", c(u("chatId", l("chatId")), u("first", l("limit")), u("before", l("before"))), p(_("__typename", "__typename", c(), m(s("String"))), _("messages", "messages", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("ModernMessage", v)))))), _("haveMoreBackward", "haveMoreBackward", c(), s("Boolean"))))),
            $e = p(_("lastReadedMessage", "message", c(u("chatId", l("chatId"))), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID")))))),
            Ae = p(_("commentEntry", "commentEntry", c(u("entryId", l("id"))), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("comment", "comment", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("reactions", "reactions", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("ModernMessageReaction", Q)))))))))))),
            Be = p(_("comments", "comments", c(u("peerId", l("peerId"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("state", "state", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("state", "state", c(), s("String"))))), _("count", "count", c(), m(s("Int"))), _("peerRoot", "peerRoot", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), d("CommentPeerRootMessage", p(_("__typename", "__typename", c(), m(s("String"))), _("chat", "chat", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), d("SharedRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("role", "role", c(), m(s("String"))))), d("PrivateRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))))))))))))), _("subscription", "subscription", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("type", "type", c(), s("String")))), _("comments", "comments", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("CommentEntry", q)))))))))),
            Ue = p(_("commonChatsWithUser", "commonChatsWithUser", c(u("uid", l("uid")), u("first", l("first")), u("after", l("after"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("items", "items", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("title", "title", c(), m(s("String"))), _("description", "description", c(), s("String")), _("photo", "photo", c(), m(s("String"))), _("membersCount", "membersCount", c(), m(s("Int")))))))), _("cursor", "cursor", c(), s("String")), _("count", "count", c(), m(s("Int"))))))),
            ze = p(_("conference", "conference", c(u("id", l("id"))), m(p(_("__typename", "__typename", c(), m(s("String"))), y("Conference", x))))),
            Oe = p(_("conferenceMedia", "conferenceMedia", c(u("id", l("id")), u("peerId", l("peerId"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("streams", "streams", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("MediaStream", K)))))), _("iceServers", "iceServers", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("urls", "urls", c(), m(o(m(s("String"))))), _("username", "username", c(), s("String")), _("credential", "credential", c(), s("String"))))))))))),
            qe = p(_("debugGqlTrace", "debugGqlTrace", c(u("id", l("id"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))), _("duration", "duration", c(), m(s("Int"))), _("traceData", "traceData", c(), m(s("String"))), _("date", "date", c(), m(s("Date"))))))),
            Te = p(_("debugGqlTraces", "debugGqlTraces", c(u("first", l("first")), u("after", l("after"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("cursor", "cursor", c(), s("ID")), _("items", "items", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))), _("date", "date", c(), m(s("Date"))), _("duration", "duration", c(), m(s("Int")))))))))))),
            xe = p(_("dialogs", "dialogs", c(u("first", g(20)), u("after", l("after"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("items", "items", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("Dialog", W)))))), _("cursor", "cursor", c(), s("String"))))), _("dialogsState", "state", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("state", "state", c(), s("String"))))), _("alphaNotificationCounter", "counter", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("unreadCount", "unreadCount", c(), m(s("Int"))))))),
            Fe = p(_("discoverCollection", "discoverCollection", c(u("id", l("id"))), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("title", "title", c(), m(s("String"))), _("shortname", "shortname", c(), s("String")), _("description", "description", c(), s("String")), _("image", "image", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("uuid", "uuid", c(), m(s("String"))), _("crop", "crop", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("x", "x", c(), m(s("Int"))), _("y", "y", c(), m(s("Int"))), _("w", "w", c(), m(s("Int"))), _("h", "h", c(), m(s("Int")))))))), _("chats", "chats", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("SharedRoom", G))))))))),
            Ne = p(_("discoverCollection", "discoverCollection", c(u("id", l("id"))), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("title", "title", c(), m(s("String"))), _("image", "image", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("uuid", "uuid", c(), m(s("String"))), _("crop", "crop", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("x", "x", c(), m(s("Int"))), _("y", "y", c(), m(s("Int"))), _("w", "w", c(), m(s("Int"))), _("h", "h", c(), m(s("Int"))))))))))),
            We = p(_("discoverCollections", "discoverCollections", c(u("first", l("first")), u("after", l("after"))), p(_("__typename", "__typename", c(), m(s("String"))), _("items", "items", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("DiscoverChatsCollection", L)))))), _("cursor", "cursor", c(), s("String"))))),
            Ee = p(_("discoverCollections", "discoverCollections", c(u("first", l("first")), u("after", l("after"))), p(_("__typename", "__typename", c(), m(s("String"))), _("items", "items", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("DiscoverChatsCollection", j)))))), _("cursor", "cursor", c(), s("String"))))),
            Ge = p(_("discoverEditorsChoice", "discoverEditorsChoice", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("image", "image", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("uuid", "uuid", c(), m(s("String"))), _("crop", "crop", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("x", "x", c(), m(s("Int"))), _("y", "y", c(), m(s("Int"))), _("w", "w", c(), m(s("Int"))), _("h", "h", c(), m(s("Int")))))))), _("chat", "chat", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("SharedRoom", G)))))))))),
            Le = p(_("betaIsDiscoverDone", "betaIsDiscoverDone", c(), m(s("Boolean")))),
            je = p(_("discoverNewAndGrowing", "discoverNewAndGrowing", c(u("first", l("first")), u("seed", l("seed")), u("after", l("after"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("items", "items", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("SharedRoom", G)))))), _("cursor", "cursor", c(), s("String")))))),
            He = p(_("gammaNextDiscoverPage", "betaNextDiscoverPage", c(u("selectedTagsIds", l("selectedTagsIds")), u("excudedGroupsIds", l("excudedGroupsIds"))), p(_("__typename", "__typename", c(), m(s("String"))), _("chats", "chats", c(), o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("Room", z))))), _("tagGroup", "tagGroup", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("String"))), _("title", "title", c(), s("String")), _("subtitle", "subtitle", c(), s("String")), _("tags", "tags", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("String"))), _("title", "title", c(), m(s("String"))))))))))))),
            Ke = p(_("discoverNewAndGrowing", "discoverNewAndGrowing", c(u("first", g(3)), u("seed", l("seed"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("items", "items", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("SharedRoom", G)))))), _("cursor", "cursor", c(), s("String"))))), _("discoverPopularNow", "discoverPopularNow", c(u("first", g(3))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("items", "items", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("room", "room", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("SharedRoom", G)))), _("newMessages", "newMessages", c(), m(s("Int")))))))), _("cursor", "cursor", c(), s("String"))))), _("discoverTopPremium", "discoverTopPremium", c(u("first", g(5))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("items", "items", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("SharedRoom", G)))))), _("cursor", "cursor", c(), s("String"))))), _("discoverTopFree", "discoverTopFree", c(u("first", g(5))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("items", "items", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("SharedRoom", G)))))), _("cursor", "cursor", c(), s("String"))))), _("discoverCollections", "discoverCollections", c(u("first", g(20))), p(_("__typename", "__typename", c(), m(s("String"))), _("items", "items", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("DiscoverChatsCollection", j)))))), _("cursor", "cursor", c(), s("String")))), _("discoverEditorsChoice", "discoverEditorsChoice", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("image", "image", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("uuid", "uuid", c(), m(s("String"))), _("crop", "crop", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("x", "x", c(), m(s("Int"))), _("y", "y", c(), m(s("Int"))), _("w", "w", c(), m(s("Int"))), _("h", "h", c(), m(s("Int")))))))), _("chat", "chat", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("SharedRoom", G)))))))))),
            Qe = p(_("discoverPopularNow", "discoverPopularNow", c(u("first", l("first")), u("after", l("after"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("items", "items", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("room", "room", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("SharedRoom", G)))), _("newMessages", "newMessages", c(), m(s("Int")))))))), _("cursor", "cursor", c(), s("String")))))),
            Ve = p(_("dialogs", "dialogs", c(u("first", g(1))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("items", "items", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID")))))))))))),
            Je = p(_("betaSuggestedRooms", "suggestedRooms", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("SharedRoom", G))))))),
            Ye = p(_("discoverTopFree", "discoverTopFree", c(u("first", l("first")), u("after", l("after"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("items", "items", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("SharedRoom", G)))))), _("cursor", "cursor", c(), s("String")))))),
            Xe = p(_("discoverTopPremium", "discoverTopPremium", c(u("first", l("first")), u("after", l("after"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("items", "items", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("SharedRoom", G)))))), _("cursor", "cursor", c(), s("String")))))),
            Ze = p(_("userSearch", "items", c(u("query", l("query")), u("sort", l("sort")), u("page", l("page")), u("first", g(25)), u("after", l("after"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("edges", "edges", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("node", "node", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("isYou", "isYou", c(), m(s("Boolean"))), y("User", U)))), _("cursor", "cursor", c(), m(s("String")))))))), _("pageInfo", "pageInfo", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("hasNextPage", "hasNextPage", c(), m(s("Boolean"))), _("hasPreviousPage", "hasPreviousPage", c(), m(s("Boolean"))), _("itemsCount", "itemsCount", c(), m(s("Int"))), _("currentPage", "currentPage", c(), m(s("Int"))), _("pagesCount", "pagesCount", c(), m(s("Int"))), _("openEnded", "openEnded", c(), m(s("Boolean")))))))))),
            et = p(_("discoverNewAndGrowing", "discoverNewAndGrowing", c(u("first", g(3)), u("seed", l("seed"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("items", "items", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("SharedRoom", G)))))), _("cursor", "cursor", c(), s("String"))))), _("discoverPopularNow", "discoverPopularNow", c(u("first", g(3))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("items", "items", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("room", "room", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("SharedRoom", G)))), _("newMessages", "newMessages", c(), m(s("Int")))))))), _("cursor", "cursor", c(), s("String"))))), _("betaSuggestedRooms", "suggestedRooms", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("SharedRoom", G)))))), _("discoverTopPremium", "discoverTopPremium", c(u("first", g(5))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("items", "items", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("SharedRoom", G)))))), _("cursor", "cursor", c(), s("String"))))), _("discoverTopFree", "discoverTopFree", c(u("first", g(5))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("items", "items", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("SharedRoom", G)))))), _("cursor", "cursor", c(), s("String"))))), _("betaIsDiscoverDone", "isDiscoverDone", c(), m(s("Boolean")))),
            tt = p(_("featureFlags", "featureFlags", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("key", "key", c(), m(s("String"))), _("title", "title", c(), m(s("String"))))))))),
            nt = p(_("pushSettings", "pushSettings", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("webPushKey", "webPushKey", c(), s("String")))))),
            at = p(_("alphaNotificationCounter", "alphaNotificationCounter", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("unreadCount", "unreadCount", c(), m(s("Int"))))))),
            it = p(_("alphaGlobalSearch", "items", c(u("query", l("query")), u("kinds", l("kinds"))), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), d("Organization", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))), _("about", "about", c(), s("String")), _("photo", "photo", c(), s("String")), _("shortname", "shortname", c(), s("String")), _("alphaIsCommunity", "isCommunity", c(), m(s("Boolean"))))), d("User", p(_("__typename", "__typename", c(), m(s("String"))), y("User", U))), d("SharedRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("kind", "kind", c(), m(s("String"))), _("title", "title", c(), m(s("String"))), _("canSendMessage", "canSendMessage", c(), m(s("Boolean"))), _("photo", "roomPhoto", c(), m(s("String"))), _("membersCount", "membersCount", c(), m(s("Int"))), _("membership", "membership", c(), m(s("String"))), _("organization", "organization", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))), _("photo", "photo", c(), s("String")))))))))))),
            rt = p(_("ipLocation", "ipLocation", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("countryCode", "countryCode", c(), s("String"))))),
            ot = p(_("message", "message", c(u("messageId", l("messageId"))), p(_("__typename", "__typename", c(), m(s("String"))), _("source", "source", c(), p(_("__typename", "__typename", c(), m(s("String"))), d("MessageSourceChat", p(_("__typename", "__typename", c(), m(s("String"))), _("chat", "chat", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), d("PrivateRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("user", "user", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("isBot", "isBot", c(), m(s("Boolean")))))), _("pinnedMessage", "pinnedMessage", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))))))), d("SharedRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("title", "title", c(), m(s("String"))), _("isChannel", "isChannel", c(), m(s("Boolean"))), _("membersCount", "membersCount", c(), m(s("Int"))), _("canSendMessage", "canSendMessage", c(), m(s("Boolean"))), _("canEdit", "canEdit", c(), m(s("Boolean"))), _("pinnedMessage", "pinnedMessage", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))))), _("role", "role", c(), m(s("String")))))))))))), y("ModernMessage", H))), _("comments", "comments", c(u("peerId", l("messageId"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("subscription", "subscription", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("type", "type", c(), s("String")))))))),
            mt = p(_("message", "message", c(u("messageId", l("id"))), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), d("GeneralMessage", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("reactions", "reactions", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("ModernMessageReaction", Q)))))))), d("StickerMessage", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("reactions", "reactions", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("ModernMessageReaction", Q))))))))))),
            st = p(_("message", "message", c(u("messageId", l("id"))), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("spans", "spans", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), d("MessageSpanMultiUserMention", p(_("__typename", "__typename", c(), m(s("String"))), _("users", "users", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("User", pe)))))))))))))))),
            _t = p(_("gammaMessages", "gammaMessages", c(u("chatId", l("chatId")), u("first", l("first")), u("before", l("before")), u("after", l("after"))), p(_("__typename", "__typename", c(), m(s("String"))), _("messages", "messages", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("ModernMessage", A)))))), _("haveMoreForward", "haveMoreForward", c(), s("Boolean")), _("haveMoreBackward", "haveMoreBackward", c(), s("Boolean")))), _("conversationState", "state", c(u("id", l("chatId"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("state", "state", c(), s("String")))))),
            pt = p(_("messagesSearch", "messagesSearch", c(u("query", l("query")), u("sort", l("sort")), u("first", l("first")), u("after", l("after"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("edges", "edges", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("node", "node", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("chat", "chat", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), d("PrivateRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("user", "user", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))), _("photo", "photo", c(), s("String"))))), _("settings", "settings", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("mute", "mute", c(), s("Boolean"))))))), d("SharedRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("kind", "kind", c(), m(s("String"))), _("title", "title", c(), m(s("String"))), _("membership", "membership", c(), m(s("String"))), _("isChannel", "isChannel", c(), m(s("Boolean"))), _("role", "role", c(), m(s("String"))), _("canEdit", "canEdit", c(), m(s("Boolean"))), _("photo", "photo", c(), m(s("String"))), _("settings", "settings", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("mute", "mute", c(), s("Boolean")))))))))), _("message", "message", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("date", "date", c(), m(s("Date"))), _("sender", "sender", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))), _("firstName", "firstName", c(), m(s("String"))), _("photo", "photo", c(), s("String"))))), _("senderBadge", "senderBadge", c(), p(_("__typename", "__typename", c(), m(s("String"))), y("UserBadge", C))), _("message", "message", c(), s("String")), _("fallback", "fallback", c(), m(s("String"))), d("GeneralMessage", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("attachments", "attachments", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("fallback", "fallback", c(), m(s("String"))), d("MessageAttachmentFile", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("fileId", "fileId", c(), m(s("String"))), _("fileMetadata", "fileMetadata", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("isImage", "isImage", c(), m(s("Boolean"))), _("imageFormat", "imageFormat", c(), s("String")))))))))))), _("quotedMessages", "quotedMessages", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID")))))))))))))))), _("cursor", "cursor", c(), m(s("String")))))))), _("pageInfo", "pageInfo", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("hasNextPage", "hasNextPage", c(), m(s("Boolean"))), _("hasPreviousPage", "hasPreviousPage", c(), m(s("Boolean"))), _("itemsCount", "itemsCount", c(), m(s("Int"))), _("currentPage", "currentPage", c(), m(s("Int"))), _("pagesCount", "pagesCount", c(), m(s("Int"))), _("openEnded", "openEnded", c(), m(s("Boolean")))))))))),
            dt = p(_("myApps", "apps", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("AppProfile", I))))))),
            yt = p(_("myCards", "myCards", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("pmid", "pmid", c(), m(s("ID"))), _("last4", "last4", c(), m(s("String"))), _("brand", "brand", c(), m(s("String"))), _("expYear", "expYear", c(), m(s("Int"))), _("expMonth", "expMonth", c(), m(s("Int"))), _("isDefault", "isDefault", c(), m(s("Boolean"))), _("deleted", "deleted", c(), m(s("Boolean"))))))))),
            ct = p(_("myCommunities", "myCommunities", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("betaIsOwner", "isOwner", c(), m(s("Boolean"))), _("betaIsAdmin", "isAdmin", c(), m(s("Boolean"))), y("Organization", B))))))),
            ut = p(_("myContacts", "myContacts", c(u("first", l("first")), u("after", l("after"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("items", "items", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("user", "user", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("User", U))))))))), _("cursor", "cursor", c(), s("String")))))),
            lt = p(_("myContactsSearch", "myContactsSearch", c(u("query", l("query")), u("first", l("first")), u("after", l("after")), u("page", l("page"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("edges", "edges", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("node", "node", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("User", U))))))))), _("pageInfo", "pageInfo", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("hasNextPage", "hasNextPage", c(), m(s("Boolean"))), _("currentPage", "currentPage", c(), m(s("Int")))))))))),
            gt = p(_("myContactsState", "myContactsState", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("state", "state", c(), m(s("String"))))))),
            ht = p(_("myNotificationCenter", "myNotificationCenter", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("unread", "unread", c(), m(s("Int"))), _("state", "state", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("state", "state", c(), s("String"))))))))),
            St = p(_("myNotifications", "myNotifications", c(u("first", l("first")), u("before", l("before"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("items", "items", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("Notification", Y)))))), _("cursor", "cursor", c(), s("String")))))),
            ft = p(_("myOrganizations", "myOrganizations", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("betaIsPrimary", "isPrimary", c(), m(s("Boolean"))), y("Organization", B))))))),
            It = p(_("postMyDrafts", "postMyDrafts", c(u("first", g(20)), u("after", l("after"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("items", "items", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("PostDraft", ie)))))), _("cursor", "cursor", c(), s("String")))))),
            bt = p(_("myStickers", "stickers", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("packs", "packs", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("title", "title", c(), m(s("String"))), _("stickers", "stickers", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("Sticker", P))))))))))))))),
            vt = {
            operations: {
                Account: {
                    kind: "query",
                    name: "Account",
                    body: "query Account{me:me{__typename ...UserShort}myProfile{__typename id authEmail}sessionState:sessionState{__typename isLoggedIn isActivated isProfileCreated isAccountActivated isAccountExists isAccountPicked isCompleted isBlocked}myPermissions{__typename roles}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}",
                    selector: ue
                },
                AccountAppInvite: {
                    kind: "query",
                    name: "AccountAppInvite",
                    body: "query AccountAppInvite{invite:appInvite}",
                    selector: le
                },
                AccountAppInviteInfo: {
                    kind: "query",
                    name: "AccountAppInviteInfo",
                    body: "query AccountAppInviteInfo($inviteKey:String!){invite:alphaInviteInfo(key:$inviteKey){__typename id creator{__typename ...UserShort}}appInvite:appInviteInfo(key:$inviteKey){__typename inviter{__typename ...UserShort}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}",
                    selector: ge
                },
                AccountInviteInfo: {
                    kind: "query",
                    name: "AccountInviteInfo",
                    body: "query AccountInviteInfo($inviteKey:String!){invite:alphaInviteInfo(key:$inviteKey){__typename id key orgId title photo joined creator{__typename ...UserShort}forEmail forName membersCount organization{__typename id isCommunity:alphaIsCommunity about}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}",
                    selector: he
                },
                AccountSettings: {
                    kind: "query",
                    name: "AccountSettings",
                    body: "query AccountSettings{me:me{__typename ...UserShort audienceSize}myProfile{__typename id authEmail}organizations:myOrganizations{__typename ...OrganizationShort}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}",
                    selector: Se
                },
                AuthPoints: {
                    kind: "query",
                    name: "AuthPoints",
                    body: "query AuthPoints{authPoints{__typename email phone}}",
                    selector: fe
                },
                AuthResolveShortName: {
                    kind: "query",
                    name: "AuthResolveShortName",
                    body: "query AuthResolveShortName($shortname:String!){item:alphaResolveShortName(shortname:$shortname){__typename ... on User{__typename id name firstName lastName photo online}... on SharedRoom{__typename ...SharedRoomPreview}... on DiscoverChatsCollection{__typename id}}}fragment SharedRoomPreview on SharedRoom{__typename id isChannel isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}membership owner{__typename id}title photo membersCount description previewMembers{__typename id name photo}}",
                    selector: Ie
                },
                Channel: {
                    kind: "query",
                    name: "Channel",
                    body: "query Channel($id:ID!){channel(id:$id){__typename ...ChannelSimple}}fragment ChannelSimple on Channel{__typename id title shortname type owner{__typename id firstName lastName}}",
                    selector: be
                },
                Channels: {
                    kind: "query",
                    name: "Channels",
                    body: "query Channels{channels{__typename ...ChannelSimple}}fragment ChannelSimple on Channel{__typename id title shortname type owner{__typename id firstName lastName}}",
                    selector: ve
                },
                ChatInit: {
                    kind: "query",
                    name: "ChatInit",
                    body: "query ChatInit($chatId:ID!,$before:ID,$first:Int!){messages(chatId:$chatId,first:$first,before:$before){__typename ...FullMessage}state:conversationState(id:$chatId){__typename state}room(id:$chatId){__typename ...RoomShort}lastReadedMessage(chatId:$chatId){__typename id}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id user{__typename id}}... on SharedRoom{__typename id title isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname inContacts primaryOrganization{__typename id name shortname}}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageReactionCounter on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel isPremium title photo membership role canEdit canSendMessage membersCount canUnpinMessage pinnedMessage{__typename ...FullMessage}organization{__typename ...OrganizationShort}settings{__typename id mute}myBadge{__typename ...UserBadge}owner{__typename id firstName isYou}repliesEnabled}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}",
                    selector: Me
                },
                ChatInitFromUnread: {
                    kind: "query",
                    name: "ChatInitFromUnread",
                    body: "query ChatInitFromUnread($chatId:ID!,$before:ID,$first:Int!){gammaMessages(chatId:$chatId,first:$first,before:$before){__typename messages{__typename ...FullMessage}haveMoreForward haveMoreBackward}state:conversationState(id:$chatId){__typename state}room(id:$chatId){__typename ...RoomShort}lastReadedMessage(chatId:$chatId){__typename id}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id user{__typename id}}... on SharedRoom{__typename id title isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname inContacts primaryOrganization{__typename id name shortname}}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageReactionCounter on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel isPremium title photo membership role canEdit canSendMessage membersCount canUnpinMessage pinnedMessage{__typename ...FullMessage}organization{__typename ...OrganizationShort}settings{__typename id mute}myBadge{__typename ...UserBadge}owner{__typename id firstName isYou}repliesEnabled}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}",
                    selector: Ce
                },
                ChatJoin: {
                    kind: "query",
                    name: "ChatJoin",
                    body: "query ChatJoin($id:ID!){room(id:$id){__typename ... on SharedRoom{__typename id title description photo membersCount previewMembers{__typename id photo name}isChannel isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}owner{__typename id firstName}}}}",
                    selector: ke
                },
                ChatMentionSearch: {
                    kind: "query",
                    name: "ChatMentionSearch",
                    body: "query ChatMentionSearch($cid:ID!,$query:String,$first:Int!,$after:String){mentions:betaChatMentionSearch(cid:$cid,query:$query,first:$first,after:$after){__typename items{__typename ... on MentionSearchOrganization{__typename organization{__typename ...OrganizationShort}}... on MentionSearchUser{__typename user{__typename ...UserForMention}fromSameChat}... on MentionSearchSharedRoom{__typename room{__typename ...RoomSharedNano}}}cursor}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}fragment UserForMention on User{__typename id name photo shortname isBot primaryOrganization{__typename id name}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title photo membersCount settings{__typename id mute}}",
                    selector: Re
                },
                ChatNewGetMessage: {
                    kind: "query",
                    name: "ChatNewGetMessage",
                    body: "query ChatNewGetMessage($id:ID!){message(messageId:$id){__typename ...ChatNewMessageFragment}}fragment ChatNewMessageFragment on ModernMessage{__typename id date seq sender{__typename id}message fallback}",
                    selector: Pe
                },
                ChatNewLoadAfter: {
                    kind: "query",
                    name: "ChatNewLoadAfter",
                    body: "query ChatNewLoadAfter($chatId:ID!,$after:ID!,$limit:Int!){batch:gammaMessages(chatId:$chatId,first:$limit,after:$after){__typename messages{__typename ...ChatNewMessageFragment}haveMoreForward}}fragment ChatNewMessageFragment on ModernMessage{__typename id date seq sender{__typename id}message fallback}",
                    selector: De
                },
                ChatNewLoadBefore: {
                    kind: "query",
                    name: "ChatNewLoadBefore",
                    body: "query ChatNewLoadBefore($chatId:ID!,$before:ID!,$limit:Int!){batch:gammaMessages(chatId:$chatId,first:$limit,before:$before){__typename messages{__typename ...ChatNewMessageFragment}haveMoreBackward}}fragment ChatNewMessageFragment on ModernMessage{__typename id date seq sender{__typename id}message fallback}",
                    selector: we
                },
                ChatNewReadLastRead: {
                    kind: "query",
                    name: "ChatNewReadLastRead",
                    body: "query ChatNewReadLastRead($chatId:ID!){message:lastReadedMessage(chatId:$chatId){__typename id}}",
                    selector: $e
                },
                CommentFullReactions: {
                    kind: "query",
                    name: "CommentFullReactions",
                    body: "query CommentFullReactions($id:ID!){commentEntry(entryId:$id){__typename id comment{__typename id reactions{__typename ...MessageUsersReactions}}}}fragment MessageUsersReactions on ModernMessageReaction{__typename user{__typename id name photo primaryOrganization{__typename id name}}reaction}",
                    selector: Ae
                },
                Comments: {
                    kind: "query",
                    name: "Comments",
                    body: "query Comments($peerId:ID!){comments(peerId:$peerId){__typename id state{__typename state}count peerRoot{__typename ... on CommentPeerRootMessage{__typename chat{__typename ... on SharedRoom{__typename id role}... on PrivateRoom{__typename id}}}}subscription{__typename type}comments{__typename ...CommentEntryFragment}}}fragment CommentEntryFragment on CommentEntry{__typename id deleted comment:betaComment{__typename ...FullMessage}parentComment{__typename id comment:betaComment{__typename id message}}childComments{__typename id}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id user{__typename id}}... on SharedRoom{__typename id title isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname inContacts primaryOrganization{__typename id name shortname}}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageReactionCounter on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}",
                    selector: Be
                },
                CommonChatsWithUser: {
                    kind: "query",
                    name: "CommonChatsWithUser",
                    body: "query CommonChatsWithUser($uid:ID!,$first:Int!,$after:ID){commonChatsWithUser(uid:$uid,first:$first,after:$after){__typename items{__typename id title description photo membersCount}cursor count}}",
                    selector: Ue
                },
                Conference: {
                    kind: "query",
                    name: "Conference",
                    body: "query Conference($id:ID!){conference(id:$id){__typename ...ConferenceFull}}fragment ConferenceFull on Conference{__typename id startTime peers{__typename id user{__typename ...UserShort}mediaState{__typename audioPaused videoPaused screencastEnabled}}iceServers{__typename urls username credential}room{__typename ... on SharedRoom{__typename id title isChannel membersCount photo owner{__typename id name}}... on PrivateRoom{__typename id user{__typename id name photo}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}",
                    selector: ze
                },
                ConferenceMedia: {
                    kind: "query",
                    name: "ConferenceMedia",
                    body: "query ConferenceMedia($id:ID!,$peerId:ID!){conferenceMedia(id:$id,peerId:$peerId){__typename id streams{__typename ...MediaStreamFull}iceServers{__typename urls username credential}}}fragment MediaStreamFull on MediaStream{__typename id seq state sdp ice iceTransportPolicy receivers{__typename peerId kind videoSource mid}senders{__typename kind videoSource codecParams mid}}",
                    selector: Oe
                },
                DebugGqlTrace: {
                    kind: "query",
                    name: "DebugGqlTrace",
                    body: "query DebugGqlTrace($id:ID!){debugGqlTrace(id:$id){__typename id name duration traceData date}}",
                    selector: qe
                },
                DebugGqlTraces: {
                    kind: "query",
                    name: "DebugGqlTraces",
                    body: "query DebugGqlTraces($first:Int!,$after:ID){debugGqlTraces(first:$first,after:$after){__typename cursor items{__typename id name date duration}}}",
                    selector: Te
                },
                Dialogs: {
                    kind: "query",
                    name: "Dialogs",
                    body: "query Dialogs($after:String){dialogs(first:20,after:$after){__typename items{__typename ...DialogFragment}cursor}state:dialogsState{__typename state}counter:alphaNotificationCounter{__typename id unreadCount}}fragment DialogFragment on Dialog{__typename id cid fid kind isChannel isPremium title photo unreadCount isMuted hasActiveCall haveMention topMessage:alphaTopMessage{__typename ...DialogMessage}membership}fragment DialogMessage on ModernMessage{__typename id date sender{__typename id name photo firstName}message fallback ... on GeneralMessage{__typename id quotedMessages{__typename id}}}",
                    selector: xe
                },
                DiscoverCollection: {
                    kind: "query",
                    name: "DiscoverCollection",
                    body: "query DiscoverCollection($id:ID!){discoverCollection(id:$id){__typename id title shortname description image{__typename uuid crop{__typename x y w h}}chats{__typename ...DiscoverSharedRoom}}}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive}",
                    selector: Fe
                },
                DiscoverCollectionShort: {
                    kind: "query",
                    name: "DiscoverCollectionShort",
                    body: "query DiscoverCollectionShort($id:ID!){discoverCollection(id:$id){__typename id title image{__typename uuid crop{__typename x y w h}}}}",
                    selector: Ne
                },
                DiscoverCollections: {
                    kind: "query",
                    name: "DiscoverCollections",
                    body: "query DiscoverCollections($first:Int!,$after:String){discoverCollections(first:$first,after:$after){__typename items{__typename ...DiscoverChatsCollection}cursor}}fragment DiscoverChatsCollection on DiscoverChatsCollection{__typename id title shortname chatsCount chats{__typename ...DiscoverSharedRoom}description image{__typename uuid crop{__typename x y w h}}}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive}",
                    selector: We
                },
                DiscoverCollectionsShort: {
                    kind: "query",
                    name: "DiscoverCollectionsShort",
                    body: "query DiscoverCollectionsShort($first:Int!,$after:String){discoverCollections(first:$first,after:$after){__typename items{__typename ...DiscoverChatsCollectionShort}cursor}}fragment DiscoverChatsCollectionShort on DiscoverChatsCollection{__typename id title shortname chatsCount description image{__typename uuid crop{__typename x y w h}}}",
                    selector: Ee
                },
                DiscoverEditorsChoice: {
                    kind: "query",
                    name: "DiscoverEditorsChoice",
                    body: "query DiscoverEditorsChoice{discoverEditorsChoice{__typename id image{__typename uuid crop{__typename x y w h}}chat{__typename ...DiscoverSharedRoom}}}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive}",
                    selector: Ge
                },
                DiscoverIsDone: {
                    kind: "query",
                    name: "DiscoverIsDone",
                    body: "query DiscoverIsDone{betaIsDiscoverDone}",
                    selector: Le
                },
                DiscoverNewAndGrowing: {
                    kind: "query",
                    name: "DiscoverNewAndGrowing",
                    body: "query DiscoverNewAndGrowing($first:Int!,$seed:Int!,$after:String){discoverNewAndGrowing(first:$first,seed:$seed,after:$after){__typename items{__typename ...DiscoverSharedRoom}cursor}}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive}",
                    selector: je
                },
                DiscoverNextPage: {
                    kind: "query",
                    name: "DiscoverNextPage",
                    body: "query DiscoverNextPage($selectedTagsIds:[String!]!,$excudedGroupsIds:[String!]!){betaNextDiscoverPage:gammaNextDiscoverPage(selectedTagsIds:$selectedTagsIds,excudedGroupsIds:$excudedGroupsIds){__typename chats{__typename ...RoomShort}tagGroup{__typename id title subtitle tags{__typename id title}}}}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel isPremium title photo membership role canEdit canSendMessage membersCount canUnpinMessage pinnedMessage{__typename ...FullMessage}organization{__typename ...OrganizationShort}settings{__typename id mute}myBadge{__typename ...UserBadge}owner{__typename id firstName isYou}repliesEnabled}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id user{__typename id}}... on SharedRoom{__typename id title isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname inContacts primaryOrganization{__typename id name shortname}}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageReactionCounter on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}",
                    selector: He
                },
                DiscoverNoAuth: {
                    kind: "query",
                    name: "DiscoverNoAuth",
                    body: "query DiscoverNoAuth($seed:Int!){discoverNewAndGrowing(first:3,seed:$seed){__typename items{__typename ...DiscoverSharedRoom}cursor}discoverPopularNow(first:3){__typename items{__typename room{__typename ...DiscoverSharedRoom}newMessages}cursor}discoverTopPremium(first:5){__typename items{__typename ...DiscoverSharedRoom}cursor}discoverTopFree(first:5){__typename items{__typename ...DiscoverSharedRoom}cursor}discoverCollections(first:20){__typename items{__typename ...DiscoverChatsCollectionShort}cursor}discoverEditorsChoice{__typename id image{__typename uuid crop{__typename x y w h}}chat{__typename ...DiscoverSharedRoom}}}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive}fragment DiscoverChatsCollectionShort on DiscoverChatsCollection{__typename id title shortname chatsCount description image{__typename uuid crop{__typename x y w h}}}",
                    selector: Ke
                },
                DiscoverPopularNow: {
                    kind: "query",
                    name: "DiscoverPopularNow",
                    body: "query DiscoverPopularNow($first:Int!,$after:String){discoverPopularNow(first:$first,after:$after){__typename items{__typename room{__typename ...DiscoverSharedRoom}newMessages}cursor}}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive}",
                    selector: Qe
                },
                DiscoverState: {
                    kind: "query",
                    name: "DiscoverState",
                    body: "query DiscoverState{dialogs(first:1){__typename items{__typename id}}}",
                    selector: Ve
                },
                DiscoverSuggestedRooms: {
                    kind: "query",
                    name: "DiscoverSuggestedRooms",
                    body: "query DiscoverSuggestedRooms{suggestedRooms:betaSuggestedRooms{__typename ...DiscoverSharedRoom}}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive}",
                    selector: Je
                },
                DiscoverTopFree: {
                    kind: "query",
                    name: "DiscoverTopFree",
                    body: "query DiscoverTopFree($first:Int!,$after:String){discoverTopFree(first:$first,after:$after){__typename items{__typename ...DiscoverSharedRoom}cursor}}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive}",
                    selector: Ye
                },
                DiscoverTopPremium: {
                    kind: "query",
                    name: "DiscoverTopPremium",
                    body: "query DiscoverTopPremium($first:Int!,$after:String){discoverTopPremium(first:$first,after:$after){__typename items{__typename ...DiscoverSharedRoom}cursor}}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive}",
                    selector: Xe
                },
                ExplorePeople: {
                    kind: "query",
                    name: "ExplorePeople",
                    body: "query ExplorePeople($query:String,$sort:String,$page:Int,$after:String){items:userSearch(query:$query,sort:$sort,page:$page,first:25,after:$after){__typename edges{__typename node{__typename ...UserShort isYou}cursor}pageInfo{__typename hasNextPage hasPreviousPage itemsCount currentPage pagesCount openEnded}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}",
                    selector: Ze
                },
                ExploreRooms: {
                    kind: "query",
                    name: "ExploreRooms",
                    body: "query ExploreRooms($seed:Int!){discoverNewAndGrowing(first:3,seed:$seed){__typename items{__typename ...DiscoverSharedRoom}cursor}discoverPopularNow(first:3){__typename items{__typename room{__typename ...DiscoverSharedRoom}newMessages}cursor}suggestedRooms:betaSuggestedRooms{__typename ...DiscoverSharedRoom}discoverTopPremium(first:5){__typename items{__typename ...DiscoverSharedRoom}cursor}discoverTopFree(first:5){__typename items{__typename ...DiscoverSharedRoom}cursor}isDiscoverDone:betaIsDiscoverDone}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive}",
                    selector: et
                },
                FeatureFlags: {
                    kind: "query",
                    name: "FeatureFlags",
                    body: "query FeatureFlags{featureFlags{__typename id key title}}",
                    selector: tt
                },
                FetchPushSettings: {
                    kind: "query",
                    name: "FetchPushSettings",
                    body: "query FetchPushSettings{pushSettings{__typename webPushKey}}",
                    selector: nt
                },
                GlobalCounter: {
                    kind: "query",
                    name: "GlobalCounter",
                    body: "query GlobalCounter{alphaNotificationCounter{__typename id unreadCount}}",
                    selector: at
                },
                GlobalSearch: {
                    kind: "query",
                    name: "GlobalSearch",
                    body: "query GlobalSearch($query:String!,$kinds:[GlobalSearchEntryKind!]){items:alphaGlobalSearch(query:$query,kinds:$kinds){__typename ... on Organization{__typename id name about photo shortname isCommunity:alphaIsCommunity}... on User{__typename ...UserShort}... on SharedRoom{__typename id kind title canSendMessage roomPhoto:photo membersCount membership organization{__typename id name photo}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}",
                    selector: it
                },
                IpLocation: {
                    kind: "query",
                    name: "IpLocation",
                    body: "query IpLocation{ipLocation{__typename countryCode}}",
                    selector: rt
                },
                Message: {
                    kind: "query",
                    name: "Message",
                    body: "query Message($messageId:ID!){message(messageId:$messageId){__typename ...FullMessageWithoutSource source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id user{__typename id isBot}pinnedMessage{__typename id}}... on SharedRoom{__typename id title isChannel membersCount canSendMessage canEdit pinnedMessage{__typename id}role}}}}}comments(peerId:$messageId){__typename id subscription{__typename type}}}fragment FullMessageWithoutSource on ModernMessage{__typename id date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname inContacts primaryOrganization{__typename id name shortname}}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageReactionCounter on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}",
                    selector: ot
                },
                MessageFullReactions: {
                    kind: "query",
                    name: "MessageFullReactions",
                    body: "query MessageFullReactions($id:ID!){message(messageId:$id){__typename id ... on GeneralMessage{__typename id reactions{__typename ...MessageUsersReactions}}... on StickerMessage{__typename id reactions{__typename ...MessageUsersReactions}}}}fragment MessageUsersReactions on ModernMessageReaction{__typename user{__typename id name photo primaryOrganization{__typename id name}}reaction}",
                    selector: mt
                },
                MessageMultiSpan: {
                    kind: "query",
                    name: "MessageMultiSpan",
                    body: "query MessageMultiSpan($id:ID!){message(messageId:$id){__typename id spans{__typename ... on MessageSpanMultiUserMention{__typename users{__typename ...UserForMention}}}}}fragment UserForMention on User{__typename id name photo shortname isBot primaryOrganization{__typename id name}}",
                    selector: st
                },
                MessagesBatch: {
                    kind: "query",
                    name: "MessagesBatch",
                    body: "query MessagesBatch($chatId:ID!,$first:Int!,$before:ID,$after:ID){gammaMessages(chatId:$chatId,first:$first,before:$before,after:$after){__typename messages{__typename ...FullMessage}haveMoreForward haveMoreBackward}state:conversationState(id:$chatId){__typename state}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id user{__typename id}}... on SharedRoom{__typename id title isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname inContacts primaryOrganization{__typename id name shortname}}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageReactionCounter on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}",
                    selector: _t
                },
                MessagesSearch: {
                    kind: "query",
                    name: "MessagesSearch",
                    body: "query MessagesSearch($query:String!,$sort:String,$first:Int!,$after:String){messagesSearch(query:$query,sort:$sort,first:$first,after:$after){__typename edges{__typename node{__typename chat{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename id kind title membership isChannel role canEdit photo settings{__typename id mute}}}message{__typename id date sender{__typename id name firstName photo}senderBadge{__typename ...UserBadge}message fallback ... on GeneralMessage{__typename id attachments{__typename id fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename isImage imageFormat}}}quotedMessages{__typename id}}}}cursor}pageInfo{__typename hasNextPage hasPreviousPage itemsCount currentPage pagesCount openEnded}}}fragment UserBadge on UserBadge{__typename id name verified}",
                    selector: pt
                },
                MyApps: {
                    kind: "query",
                    name: "MyApps",
                    body: "query MyApps{apps:myApps{__typename ...AppFull}}fragment AppFull on AppProfile{__typename id name shortname photoRef{__typename uuid crop{__typename x y w h}}about token{__typename salt}}",
                    selector: dt
                },
                MyCards: {
                    kind: "query",
                    name: "MyCards",
                    body: "query MyCards{myCards{__typename id pmid last4 brand expYear expMonth isDefault deleted}}",
                    selector: yt
                },
                MyCommunities: {
                    kind: "query",
                    name: "MyCommunities",
                    body: "query MyCommunities{myCommunities{__typename ...OrganizationShort isOwner:betaIsOwner isAdmin:betaIsAdmin}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}",
                    selector: ct
                },
                MyContacts: {
                    kind: "query",
                    name: "MyContacts",
                    body: "query MyContacts($first:Int!,$after:String){myContacts(first:$first,after:$after){__typename items{__typename id user{__typename ...UserShort}}cursor}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}",
                    selector: ut
                },
                MyContactsSearch: {
                    kind: "query",
                    name: "MyContactsSearch",
                    body: "query MyContactsSearch($query:String,$first:Int!,$after:String,$page:Int){myContactsSearch(query:$query,first:$first,after:$after,page:$page){__typename edges{__typename node{__typename ...UserShort}}pageInfo{__typename hasNextPage currentPage}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}",
                    selector: lt
                },
                MyContactsState: {
                    kind: "query",
                    name: "MyContactsState",
                    body: "query MyContactsState{myContactsState{__typename state}}",
                    selector: gt
                },
                MyNotificationCenter: {
                    kind: "query",
                    name: "MyNotificationCenter",
                    body: "query MyNotificationCenter{myNotificationCenter{__typename id unread state{__typename state}}}",
                    selector: ht
                },
                MyNotifications: {
                    kind: "query",
                    name: "MyNotifications",
                    body: "query MyNotifications($first:Int!,$before:ID){myNotifications(first:$first,before:$before){__typename items{__typename ...NotificationFragment}cursor}}fragment NotificationFragment on Notification{__typename id text content{__typename ... on NewCommentNotification{__typename comment{__typename ...CommentEntryFragment}peer{__typename id peerRoot{__typename ... on CommentPeerRootMessage{__typename message{__typename ... on GeneralMessage{__typename id fallback message sender{__typename id name}senderBadge{__typename ...UserBadge}}}chat{__typename ...RoomNano}}... on CommentPeerRootPost{__typename post{__typename id}}}subscription{__typename type}}}}}fragment CommentEntryFragment on CommentEntry{__typename id deleted comment:betaComment{__typename ...FullMessage}parentComment{__typename id comment:betaComment{__typename id message}}childComments{__typename id}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id user{__typename id}}... on SharedRoom{__typename id title isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname inContacts primaryOrganization{__typename id name shortname}}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageReactionCounter on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title photo membersCount settings{__typename id mute}}",
                    selector: St
                },
                MyOrganizations: {
                    kind: "query",
                    name: "MyOrganizations",
                    body: "query MyOrganizations{myOrganizations{__typename ...OrganizationShort isPrimary:betaIsPrimary}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}",
                    selector: ft
                },
                MyPostDrafts: {
                    kind: "query",
                    name: "MyPostDrafts",
                    body: "query MyPostDrafts($after:String){postMyDrafts(first:20,after:$after){__typename items{__typename ...PostDraftSimple}cursor}}fragment PostDraftSimple on PostDraft{__typename id title content{__typename ...ParagraphSimple}publishedCopy{__typename id}channel{__typename id title shortname}createdAt updatedAt deletedAt}fragment ParagraphSimple on Paragraph{__typename ... on TextParagraph{__typename text spans{__typename ... on PostSpanBold{__typename offset length}... on PostSpanItalic{__typename offset length}... on PostSpanIrony{__typename offset length}... on PostSpanLink{__typename offset length url}}}... on ImageParagraph{__typename url image{__typename uuid}fileMetadata{__typename isImage imageWidth imageHeight imageFormat}}... on H1Paragraph{__typename text}... on H2Paragraph{__typename text}}",
                    selector: It
                },
                MyStickers: {
                    kind: "query",
                    name: "MyStickers",
                    body: "query MyStickers{stickers:myStickers{__typename packs{__typename id title stickers{__typename ...StickerFragment}}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}",
                    selector: bt
                },
                MySuccessfulInvitesCount: {
                    kind: "query",
                    name: "MySuccessfulInvitesCount",
                    body: "query MySuccessfulInvitesCount{mySuccessfulInvitesCount}",
                    selector: p(_("mySuccessfulInvitesCount", "mySuccessfulInvitesCount", c(), m(s("Int"))))
                },
                MyWallet: {
                    kind: "query",
                    name: "MyWallet",
                    body: "query MyWallet{myWallet{__typename id balance state isLocked failingPaymentsCount}transactionsPending{__typename ...WalletTransactionFragment}transactionsHistory(first:20){__typename items{__typename ...WalletTransactionFragment}cursor}}fragment WalletTransactionFragment on WalletTransaction{__typename id status date operation{__typename ... on WalletTransactionDeposit{__typename amount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}}... on WalletTransactionIncome{__typename amount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}source{__typename ... on WalletSubscription{__typename id product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}... on WalletProductDonation{__typename user{__typename id name photo}}... on WalletProductDonationMessage{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}... on WalletProductDonationReaction{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}}}... on Purchase{__typename id user{__typename id name photo}product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}... on WalletProductDonation{__typename user{__typename id name photo}}... on WalletProductDonationMessage{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}... on WalletProductDonationReaction{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}}}}}... on WalletTransactionTransferIn{__typename amount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}fromUser{__typename ...UserShort}}... on WalletTransactionTransferOut{__typename amount walletAmount chargeAmount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}toUser{__typename ...UserShort}}... on WalletTransactionSubscription{__typename amount walletAmount chargeAmount subscription{__typename id interval amount product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}... on WalletProductDonation{__typename user{__typename id name photo}}... on WalletProductDonationMessage{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}... on WalletProductDonationReaction{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}}}payment{__typename id status intent{__typename id clientSecret}card{__typename id brand last4}}}... on WalletTransactionPurchase{__typename amount walletAmount chargeAmount purchase{__typename id product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}... on WalletProductDonation{__typename user{__typename id name photo}}... on WalletProductDonationMessage{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}... on WalletProductDonationReaction{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}}}payment{__typename id status intent{__typename id clientSecret}card{__typename id brand last4}}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}",
                    selector: p(_("myWallet", "myWallet", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("balance", "balance", c(), m(s("Int"))), _("state", "state", c(), m(s("String"))), _("isLocked", "isLocked", c(), m(s("Boolean"))), _("failingPaymentsCount", "failingPaymentsCount", c(), m(s("Int")))))), _("transactionsPending", "transactionsPending", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("WalletTransaction", ye)))))), _("transactionsHistory", "transactionsHistory", c(u("first", g(20))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("items", "items", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("WalletTransaction", ye)))))), _("cursor", "cursor", c(), s("String"))))))
                },
                OauthContext: {
                    kind: "query",
                    name: "OauthContext",
                    body: "query OauthContext($code:String!){context:oauthContext(code:$code){__typename app{__typename id title scopes image{__typename uuid crop{__typename x y w h}}}state redirectUrl code}}",
                    selector: p(_("oauthContext", "context", c(u("code", l("code"))), p(_("__typename", "__typename", c(), m(s("String"))), _("app", "app", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("title", "title", c(), m(s("String"))), _("scopes", "scopes", c(), o(m(s("String")))), _("image", "image", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("uuid", "uuid", c(), m(s("String"))), _("crop", "crop", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("x", "x", c(), m(s("Int"))), _("y", "y", c(), m(s("Int"))), _("w", "w", c(), m(s("Int"))), _("h", "h", c(), m(s("Int")))))))))), _("state", "state", c(), m(s("String"))), _("redirectUrl", "redirectUrl", c(), m(s("String"))), _("code", "code", c(), m(s("String"))))))
                },
                Online: {
                    kind: "query",
                    name: "Online",
                    body: "query Online($userId:ID!){user:user(id:$userId){__typename id online lastSeen isBot}}",
                    selector: p(_("user", "user", c(u("id", l("userId"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("online", "online", c(), m(s("Boolean"))), _("lastSeen", "lastSeen", c(), s("String")), _("isBot", "isBot", c(), m(s("Boolean")))))))
                },
                Organization: {
                    kind: "query",
                    name: "Organization",
                    body: "query Organization($organizationId:ID!){organization(id:$organizationId){__typename ...OrganizationFragment}}fragment OrganizationFragment on Organization{__typename id isMine isDeleted superAccountId name photo shortname website websiteTitle about twitter facebook linkedin instagram membersCount private:alphaIsPrivate isOwner:betaIsOwner isAdmin:betaIsAdmin featured:alphaFeatured isCommunity:alphaIsCommunity roomsCount:betaPublicRoomsCount membersCanInvite:betaMembersCanInvite}",
                    selector: p(_("organization", "organization", c(u("id", l("organizationId"))), m(p(_("__typename", "__typename", c(), m(s("String"))), y("Organization", Z)))))
                },
                OrganizationMembers: {
                    kind: "query",
                    name: "OrganizationMembers",
                    body: "query OrganizationMembers($organizationId:ID!,$first:Int,$after:ID){organization(id:$organizationId){__typename id members:alphaOrganizationMembers(first:$first,after:$after){__typename role user{__typename ...UserShort}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}",
                    selector: p(_("organization", "organization", c(u("id", l("organizationId"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("alphaOrganizationMembers", "members", c(u("first", l("first")), u("after", l("after"))), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("role", "role", c(), m(s("String"))), _("user", "user", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("User", U)))))))))))))
                },
                OrganizationMembersSearch: {
                    kind: "query",
                    name: "OrganizationMembersSearch",
                    body: "query OrganizationMembersSearch($orgId:ID!,$query:String,$first:Int!,$after:String,$page:Int){orgMembersSearch(orgId:$orgId,query:$query,first:$first,after:$after,page:$page){__typename edges{__typename node{__typename role user{__typename ...UserShort}}cursor}pageInfo{__typename hasNextPage}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}",
                    selector: p(_("orgMembersSearch", "orgMembersSearch", c(u("orgId", l("orgId")), u("query", l("query")), u("first", l("first")), u("after", l("after")), u("page", l("page"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("edges", "edges", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("node", "node", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("role", "role", c(), m(s("String"))), _("user", "user", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("User", U))))))), _("cursor", "cursor", c(), m(s("String")))))))), _("pageInfo", "pageInfo", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("hasNextPage", "hasNextPage", c(), m(s("Boolean"))))))))))
                },
                OrganizationMembersShort: {
                    kind: "query",
                    name: "OrganizationMembersShort",
                    body: "query OrganizationMembersShort($organizationId:ID!){organization(id:$organizationId){__typename ...OrganizationFragment members:alphaOrganizationMembers{__typename user{__typename id}}}}fragment OrganizationFragment on Organization{__typename id isMine isDeleted superAccountId name photo shortname website websiteTitle about twitter facebook linkedin instagram membersCount private:alphaIsPrivate isOwner:betaIsOwner isAdmin:betaIsAdmin featured:alphaFeatured isCommunity:alphaIsCommunity roomsCount:betaPublicRoomsCount membersCanInvite:betaMembersCanInvite}",
                    selector: p(_("organization", "organization", c(u("id", l("organizationId"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("alphaOrganizationMembers", "members", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("user", "user", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))))))))))), y("Organization", Z)))))
                },
                OrganizationPico: {
                    kind: "query",
                    name: "OrganizationPico",
                    body: "query OrganizationPico($id:ID!){organization(id:$id){__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}",
                    selector: p(_("organization", "organization", c(u("id", l("id"))), m(p(_("__typename", "__typename", c(), m(s("String"))), y("Organization", B)))))
                },
                OrganizationProfile: {
                    kind: "query",
                    name: "OrganizationProfile",
                    body: "query OrganizationProfile($organizationId:ID!){organizationProfile(id:$organizationId){__typename ...OrganizationProfileFragment}}fragment OrganizationProfileFragment on OrganizationProfile{__typename id name photoRef{__typename uuid crop{__typename x y w h}}website websiteTitle about twitter facebook linkedin instagram shortname isCommunity:alphaIsCommunity private:alphaIsPrivate featured:alphaFeatured published:alphaPublished editorial:alphaEditorial membersCanInvite:betaMembersCanInvite}",
                    selector: p(_("organizationProfile", "organizationProfile", c(u("id", l("organizationId"))), m(p(_("__typename", "__typename", c(), m(s("String"))), y("OrganizationProfile", te)))))
                },
                OrganizationPublicInvite: {
                    kind: "query",
                    name: "OrganizationPublicInvite",
                    body: "query OrganizationPublicInvite($organizationId:ID){publicInvite:alphaOrganizationInviteLink(organizationId:$organizationId){__typename id key ttl}}",
                    selector: p(_("alphaOrganizationInviteLink", "publicInvite", c(u("organizationId", l("organizationId"))), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("key", "key", c(), m(s("String"))), _("ttl", "ttl", c(), s("String")))))
                },
                OrganizationPublicRooms: {
                    kind: "query",
                    name: "OrganizationPublicRooms",
                    body: "query OrganizationPublicRooms($organizationId:ID!,$first:Int!,$after:ID){organizationPublicRooms(id:$organizationId,first:$first,after:$after){__typename items{__typename ...SharedRoomView}cursor}}fragment SharedRoomView on SharedRoom{__typename id title photo membersCount photo}",
                    selector: p(_("organizationPublicRooms", "organizationPublicRooms", c(u("id", l("organizationId")), u("first", l("first")), u("after", l("after"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("items", "items", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("SharedRoom", se)))))), _("cursor", "cursor", c(), s("String"))))))
                },
                Permissions: {
                    kind: "query",
                    name: "Permissions",
                    body: "query Permissions{myPermissions{__typename roles}}",
                    selector: p(_("myPermissions", "myPermissions", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("roles", "roles", c(), m(o(m(s("String")))))))))
                },
                PhonebookWasExported: {
                    kind: "query",
                    name: "PhonebookWasExported",
                    body: "query PhonebookWasExported{phonebookWasExported}",
                    selector: p(_("phonebookWasExported", "phonebookWasExported", c(), m(s("Boolean"))))
                },
                PicSharedMedia: {
                    kind: "query",
                    name: "PicSharedMedia",
                    body: "query PicSharedMedia($chatId:ID!,$first:Int!,$after:ID,$before:ID,$around:ID){chatSharedMedia(chatId:$chatId,mediaTypes:[IMAGE],first:$first,after:$after,before:$before,around:$around){__typename edges{__typename cursor index node{__typename message{__typename ... on GeneralMessage{__typename id date sender{__typename id name}attachments{__typename ... on MessageAttachmentFile{__typename id fileMetadata{__typename name isImage imageFormat mimeType imageWidth imageHeight size}filePreview fileId fallback}}}}}}}}",
                    selector: p(_("chatSharedMedia", "chatSharedMedia", c(u("chatId", l("chatId")), u("mediaTypes", S(h("IMAGE"))), u("first", l("first")), u("after", l("after")), u("before", l("before")), u("around", l("around"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("edges", "edges", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("cursor", "cursor", c(), m(s("String"))), _("index", "index", c(), m(s("Int"))), _("node", "node", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("message", "message", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), d("GeneralMessage", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("date", "date", c(), m(s("Date"))), _("sender", "sender", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String")))))), _("attachments", "attachments", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), d("MessageAttachmentFile", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("fileMetadata", "fileMetadata", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("name", "name", c(), m(s("String"))), _("isImage", "isImage", c(), m(s("Boolean"))), _("imageFormat", "imageFormat", c(), s("String")), _("mimeType", "mimeType", c(), s("String")), _("imageWidth", "imageWidth", c(), s("Int")), _("imageHeight", "imageHeight", c(), s("Int")), _("size", "size", c(), m(s("Int")))))), _("filePreview", "filePreview", c(), s("String")), _("fileId", "fileId", c(), m(s("String"))), _("fallback", "fallback", c(), m(s("String")))))))))))))))))))))))))))
                },
                Post: {
                    kind: "query",
                    name: "Post",
                    body: "query Post($id:ID!){post(id:$id){__typename ...PostSimple}}fragment PostSimple on Post{__typename id title content{__typename ...ParagraphSimple}channel{__typename id title shortname}author{__typename id name}draft{__typename id}canEdit createdAt updatedAt deletedAt}fragment ParagraphSimple on Paragraph{__typename ... on TextParagraph{__typename text spans{__typename ... on PostSpanBold{__typename offset length}... on PostSpanItalic{__typename offset length}... on PostSpanIrony{__typename offset length}... on PostSpanLink{__typename offset length url}}}... on ImageParagraph{__typename url image{__typename uuid}fileMetadata{__typename isImage imageWidth imageHeight imageFormat}}... on H1Paragraph{__typename text}... on H2Paragraph{__typename text}}",
                    selector: p(_("post", "post", c(u("id", l("id"))), p(_("__typename", "__typename", c(), m(s("String"))), y("Post", re))))
                },
                PostDraft: {
                    kind: "query",
                    name: "PostDraft",
                    body: "query PostDraft($id:ID!){postDraft(id:$id){__typename ...PostDraftSimple}}fragment PostDraftSimple on PostDraft{__typename id title content{__typename ...ParagraphSimple}publishedCopy{__typename id}channel{__typename id title shortname}createdAt updatedAt deletedAt}fragment ParagraphSimple on Paragraph{__typename ... on TextParagraph{__typename text spans{__typename ... on PostSpanBold{__typename offset length}... on PostSpanItalic{__typename offset length}... on PostSpanIrony{__typename offset length}... on PostSpanLink{__typename offset length url}}}... on ImageParagraph{__typename url image{__typename uuid}fileMetadata{__typename isImage imageWidth imageHeight imageFormat}}... on H1Paragraph{__typename text}... on H2Paragraph{__typename text}}",
                    selector: p(_("postDraft", "postDraft", c(u("id", l("id"))), p(_("__typename", "__typename", c(), m(s("String"))), y("PostDraft", ie))))
                },
                Posts: {
                    kind: "query",
                    name: "Posts",
                    body: "query Posts($channels:[ID!]!,$after:String){posts(hubs:$channels,first:20,after:$after){__typename items{__typename ...PostSimple}cursor}}fragment PostSimple on Post{__typename id title content{__typename ...ParagraphSimple}channel{__typename id title shortname}author{__typename id name}draft{__typename id}canEdit createdAt updatedAt deletedAt}fragment ParagraphSimple on Paragraph{__typename ... on TextParagraph{__typename text spans{__typename ... on PostSpanBold{__typename offset length}... on PostSpanItalic{__typename offset length}... on PostSpanIrony{__typename offset length}... on PostSpanLink{__typename offset length url}}}... on ImageParagraph{__typename url image{__typename uuid}fileMetadata{__typename isImage imageWidth imageHeight imageFormat}}... on H1Paragraph{__typename text}... on H2Paragraph{__typename text}}",
                    selector: p(_("posts", "posts", c(u("hubs", l("channels")), u("first", g(20)), u("after", l("after"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("items", "items", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("Post", re)))))), _("cursor", "cursor", c(), s("String"))))))
                },
                Profile: {
                    kind: "query",
                    name: "Profile",
                    body: "query Profile{user:me{__typename id shortname}profile:myProfile{__typename id firstName lastName photoRef{__typename uuid crop{__typename x y w h}}email phone website about location role:alphaRole linkedin instagram facebook twitter primaryOrganization{__typename id name membersCount}joinedAt:alphaJoinedAt invitedBy:alphaInvitedBy{__typename id name}}}",
                    selector: p(_("me", "user", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("shortname", "shortname", c(), s("String")))), _("myProfile", "profile", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("firstName", "firstName", c(), s("String")), _("lastName", "lastName", c(), s("String")), _("photoRef", "photoRef", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("uuid", "uuid", c(), m(s("String"))), _("crop", "crop", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("x", "x", c(), m(s("Int"))), _("y", "y", c(), m(s("Int"))), _("w", "w", c(), m(s("Int"))), _("h", "h", c(), m(s("Int"))))))), _("email", "email", c(), s("String")), _("phone", "phone", c(), s("String")), _("website", "website", c(), s("String")), _("about", "about", c(), s("String")), _("location", "location", c(), s("String")), _("alphaRole", "role", c(), s("String")), _("linkedin", "linkedin", c(), s("String")), _("instagram", "instagram", c(), s("String")), _("facebook", "facebook", c(), s("String")), _("twitter", "twitter", c(), s("String")), _("primaryOrganization", "primaryOrganization", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))), _("membersCount", "membersCount", c(), m(s("Int"))))), _("alphaJoinedAt", "joinedAt", c(), s("String")), _("alphaInvitedBy", "invitedBy", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))))))))
                },
                ProfilePrefill: {
                    kind: "query",
                    name: "ProfilePrefill",
                    body: "query ProfilePrefill{prefill:myProfilePrefill{__typename firstName lastName picture}}",
                    selector: p(_("myProfilePrefill", "prefill", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("firstName", "firstName", c(), s("String")), _("lastName", "lastName", c(), s("String")), _("picture", "picture", c(), s("String")))))
                },
                ResolveShortName: {
                    kind: "query",
                    name: "ResolveShortName",
                    body: "query ResolveShortName($shortname:String!){item:alphaResolveShortName(shortname:$shortname){__typename ... on User{__typename id isDeleted}... on Organization{__typename id isDeleted}... on FeedChannel{__typename id}... on SharedRoom{__typename id}... on DiscoverChatsCollection{__typename id}... on Channel{__typename id}}}",
                    selector: p(_("alphaResolveShortName", "item", c(u("shortname", l("shortname"))), p(_("__typename", "__typename", c(), m(s("String"))), d("User", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("isDeleted", "isDeleted", c(), m(s("Boolean"))))), d("Organization", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("isDeleted", "isDeleted", c(), m(s("Boolean"))))), d("FeedChannel", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))))), d("SharedRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))))), d("DiscoverChatsCollection", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))))), d("Channel", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))))))))
                },
                ResolvedInvite: {
                    kind: "query",
                    name: "ResolvedInvite",
                    body: "query ResolvedInvite($key:String!){invite:alphaResolveInvite(key:$key){__typename ... on InviteInfo{__typename id orgId title creator{__typename ...UserShort}organization{__typename id photo name membersCount about isCommunity:alphaIsCommunity}}... on AppInvite{__typename inviter{__typename ...UserShort}}... on RoomInvite{__typename id invitedByUser{__typename ...UserShort}room{__typename ... on SharedRoom{__typename id kind isChannel title photo socialImage description membership membersCount previewMembers{__typename id photo name}isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}owner{__typename id firstName}}}}}shortnameItem:alphaResolveShortName(shortname:$key){__typename ... on SharedRoom{__typename ...SharedRoomPreview}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}fragment SharedRoomPreview on SharedRoom{__typename id isChannel isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}membership owner{__typename id}title photo membersCount description previewMembers{__typename id name photo}}",
                    selector: p(_("alphaResolveInvite", "invite", c(u("key", l("key"))), p(_("__typename", "__typename", c(), m(s("String"))), d("InviteInfo", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("orgId", "orgId", c(), m(s("ID"))), _("title", "title", c(), m(s("String"))), _("creator", "creator", c(), p(_("__typename", "__typename", c(), m(s("String"))), y("User", U))), _("organization", "organization", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("photo", "photo", c(), s("String")), _("name", "name", c(), m(s("String"))), _("membersCount", "membersCount", c(), m(s("Int"))), _("about", "about", c(), s("String")), _("alphaIsCommunity", "isCommunity", c(), m(s("Boolean"))))))), d("AppInvite", p(_("__typename", "__typename", c(), m(s("String"))), _("inviter", "inviter", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("User", U)))))), d("RoomInvite", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("invitedByUser", "invitedByUser", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("User", U)))), _("room", "room", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), d("SharedRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("kind", "kind", c(), m(s("String"))), _("isChannel", "isChannel", c(), m(s("Boolean"))), _("title", "title", c(), m(s("String"))), _("photo", "photo", c(), m(s("String"))), _("socialImage", "socialImage", c(), s("String")), _("description", "description", c(), s("String")), _("membership", "membership", c(), m(s("String"))), _("membersCount", "membersCount", c(), m(s("Int"))), _("previewMembers", "previewMembers", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("photo", "photo", c(), s("String")), _("name", "name", c(), m(s("String")))))))), _("isPremium", "isPremium", c(), m(s("Boolean"))), _("premiumPassIsActive", "premiumPassIsActive", c(), m(s("Boolean"))), _("premiumSubscription", "premiumSubscription", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("state", "state", c(), m(s("String"))))), _("premiumSettings", "premiumSettings", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("price", "price", c(), m(s("Int"))), _("interval", "interval", c(), s("String")))), _("owner", "owner", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("firstName", "firstName", c(), m(s("String")))))))))))))), _("alphaResolveShortName", "shortnameItem", c(u("shortname", l("key"))), p(_("__typename", "__typename", c(), m(s("String"))), d("SharedRoom", p(_("__typename", "__typename", c(), m(s("String"))), y("SharedRoom", me))))))
                },
                RoomAdminMembers: {
                    kind: "query",
                    name: "RoomAdminMembers",
                    body: "query RoomAdminMembers($roomId:ID!){roomAdmins(roomId:$roomId){__typename user{__typename ...UserShort}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}",
                    selector: p(_("roomAdmins", "roomAdmins", c(u("roomId", l("roomId"))), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("user", "user", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("User", U))))))))))
                },
                RoomChat: {
                    kind: "query",
                    name: "RoomChat",
                    body: "query RoomChat($id:ID!){room(id:$id){__typename ... on PrivateRoom{__typename id user{__typename id name firstName photo shortname inContacts primaryOrganization{__typename id name}isBot isYou online lastSeen}pinnedMessage{__typename ...FullMessage}settings{__typename id mute}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind title membership isChannel role canEdit canSendMessage photo membersCount shortname featuredMembersCount socialImage welcomeMessage{__typename isOn sender{__typename id name}message}organization{__typename ...OrganizationMedium}canUnpinMessage pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}settings{__typename id mute}description previewMembers{__typename id photo name}isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}owner{__typename id firstName isYou}repliesEnabled}}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id user{__typename id}}... on SharedRoom{__typename id title isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname inContacts primaryOrganization{__typename id name shortname}}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageReactionCounter on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}fragment OrganizationMedium on Organization{__typename id name photo isMine membersCount shortname about isOwner:betaIsOwner isAdmin:betaIsAdmin isCommunity:alphaIsCommunity private:alphaIsPrivate membersCanInvite:betaMembersCanInvite}",
                    selector: p(_("room", "room", c(u("id", l("id"))), p(_("__typename", "__typename", c(), m(s("String"))), d("PrivateRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("user", "user", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))), _("firstName", "firstName", c(), m(s("String"))), _("photo", "photo", c(), s("String")), _("shortname", "shortname", c(), s("String")), _("inContacts", "inContacts", c(), m(s("Boolean"))), _("primaryOrganization", "primaryOrganization", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))))), _("isBot", "isBot", c(), m(s("Boolean"))), _("isYou", "isYou", c(), m(s("Boolean"))), _("online", "online", c(), m(s("Boolean"))), _("lastSeen", "lastSeen", c(), s("String"))))), _("pinnedMessage", "pinnedMessage", c(), p(_("__typename", "__typename", c(), m(s("String"))), y("ModernMessage", A))), _("settings", "settings", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("mute", "mute", c(), s("Boolean"))))), _("myBadge", "myBadge", c(), p(_("__typename", "__typename", c(), m(s("String"))), y("UserBadge", C))))), d("SharedRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("kind", "kind", c(), m(s("String"))), _("title", "title", c(), m(s("String"))), _("membership", "membership", c(), m(s("String"))), _("isChannel", "isChannel", c(), m(s("Boolean"))), _("role", "role", c(), m(s("String"))), _("canEdit", "canEdit", c(), m(s("Boolean"))), _("canSendMessage", "canSendMessage", c(), m(s("Boolean"))), _("photo", "photo", c(), m(s("String"))), _("membersCount", "membersCount", c(), m(s("Int"))), _("shortname", "shortname", c(), s("String")), _("featuredMembersCount", "featuredMembersCount", c(), m(s("Int"))), _("socialImage", "socialImage", c(), s("String")), _("welcomeMessage", "welcomeMessage", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("isOn", "isOn", c(), m(s("Boolean"))), _("sender", "sender", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))))), _("message", "message", c(), s("String")))), _("organization", "organization", c(), p(_("__typename", "__typename", c(), m(s("String"))), y("Organization", ee))), _("canUnpinMessage", "canUnpinMessage", c(), m(s("Boolean"))), _("pinnedMessage", "pinnedMessage", c(), p(_("__typename", "__typename", c(), m(s("String"))), y("ModernMessage", A))), _("myBadge", "myBadge", c(), p(_("__typename", "__typename", c(), m(s("String"))), y("UserBadge", C))), _("settings", "settings", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("mute", "mute", c(), s("Boolean"))))), _("description", "description", c(), s("String")), _("previewMembers", "previewMembers", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("photo", "photo", c(), s("String")), _("name", "name", c(), m(s("String")))))))), _("isPremium", "isPremium", c(), m(s("Boolean"))), _("premiumPassIsActive", "premiumPassIsActive", c(), m(s("Boolean"))), _("premiumSubscription", "premiumSubscription", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("state", "state", c(), m(s("String"))))), _("premiumSettings", "premiumSettings", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("price", "price", c(), m(s("Int"))), _("interval", "interval", c(), s("String")))), _("owner", "owner", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("firstName", "firstName", c(), m(s("String"))), _("isYou", "isYou", c(), m(s("Boolean"))))), _("repliesEnabled", "repliesEnabled", c(), m(s("Boolean"))))))))
                },
                RoomFeaturedMembers: {
                    kind: "query",
                    name: "RoomFeaturedMembers",
                    body: "query RoomFeaturedMembers($roomId:ID!){roomFeaturedMembers(roomId:$roomId){__typename user{__typename ...UserShort}role membership canKick badge{__typename ...UserBadge}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}fragment UserBadge on UserBadge{__typename id name verified}",
                    selector: p(_("roomFeaturedMembers", "roomFeaturedMembers", c(u("roomId", l("roomId"))), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("user", "user", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("User", U)))), _("role", "role", c(), m(s("String"))), _("membership", "membership", c(), m(s("String"))), _("canKick", "canKick", c(), m(s("Boolean"))), _("badge", "badge", c(), p(_("__typename", "__typename", c(), m(s("String"))), y("UserBadge", C)))))))))
                },
                RoomInviteInfo: {
                    kind: "query",
                    name: "RoomInviteInfo",
                    body: "query RoomInviteInfo($invite:String!){invite:betaRoomInviteInfo(invite:$invite){__typename id room{__typename ... on SharedRoom{__typename id kind isChannel title photo socialImage description organization{__typename ...OrganizationShort}membership membersCount previewMembers{__typename id photo name}isPremium premiumPassIsActive premiumSubscription{__typename id state}premiumSettings{__typename id price interval}owner{__typename id firstName}}}invitedByUser{__typename ...UserShort}}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}",
                    selector: p(_("betaRoomInviteInfo", "invite", c(u("invite", l("invite"))), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("room", "room", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), d("SharedRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("kind", "kind", c(), m(s("String"))), _("isChannel", "isChannel", c(), m(s("Boolean"))), _("title", "title", c(), m(s("String"))), _("photo", "photo", c(), m(s("String"))), _("socialImage", "socialImage", c(), s("String")), _("description", "description", c(), s("String")), _("organization", "organization", c(), p(_("__typename", "__typename", c(), m(s("String"))), y("Organization", B))), _("membership", "membership", c(), m(s("String"))), _("membersCount", "membersCount", c(), m(s("Int"))), _("previewMembers", "previewMembers", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("photo", "photo", c(), s("String")), _("name", "name", c(), m(s("String")))))))), _("isPremium", "isPremium", c(), m(s("Boolean"))), _("premiumPassIsActive", "premiumPassIsActive", c(), m(s("Boolean"))), _("premiumSubscription", "premiumSubscription", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("state", "state", c(), m(s("String"))))), _("premiumSettings", "premiumSettings", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("price", "price", c(), m(s("Int"))), _("interval", "interval", c(), s("String")))), _("owner", "owner", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("firstName", "firstName", c(), m(s("String")))))))))), _("invitedByUser", "invitedByUser", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("User", U)))))))
                },
                RoomInviteLink: {
                    kind: "query",
                    name: "RoomInviteLink",
                    body: "query RoomInviteLink($roomId:ID!){link:betaRoomInviteLink(roomId:$roomId)}",
                    selector: p(_("betaRoomInviteLink", "link", c(u("roomId", l("roomId"))), m(s("String"))))
                },
                RoomMembersPaginated: {
                    kind: "query",
                    name: "RoomMembersPaginated",
                    body: "query RoomMembersPaginated($roomId:ID!,$first:Int,$after:ID){members:roomMembers(roomId:$roomId,first:$first,after:$after){__typename user{__typename ...UserShort}role membership canKick badge{__typename ...UserBadge}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}fragment UserBadge on UserBadge{__typename id name verified}",
                    selector: p(_("roomMembers", "members", c(u("roomId", l("roomId")), u("first", l("first")), u("after", l("after"))), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("user", "user", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("User", U)))), _("role", "role", c(), m(s("String"))), _("membership", "membership", c(), m(s("String"))), _("canKick", "canKick", c(), m(s("Boolean"))), _("badge", "badge", c(), p(_("__typename", "__typename", c(), m(s("String"))), y("UserBadge", C)))))))))
                },
                RoomMembersSearch: {
                    kind: "query",
                    name: "RoomMembersSearch",
                    body: "query RoomMembersSearch($cid:ID!,$query:String,$first:Int!,$after:String){chatMembersSearch(cid:$cid,query:$query,first:$first,after:$after){__typename edges{__typename node{__typename user{__typename ...UserShort}role membership canKick badge{__typename ...UserBadge}}cursor}pageInfo{__typename hasNextPage}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}fragment UserBadge on UserBadge{__typename id name verified}",
                    selector: p(_("chatMembersSearch", "chatMembersSearch", c(u("cid", l("cid")), u("query", l("query")), u("first", l("first")), u("after", l("after"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("edges", "edges", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("node", "node", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("user", "user", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("User", U)))), _("role", "role", c(), m(s("String"))), _("membership", "membership", c(), m(s("String"))), _("canKick", "canKick", c(), m(s("Boolean"))), _("badge", "badge", c(), p(_("__typename", "__typename", c(), m(s("String"))), y("UserBadge", C)))))), _("cursor", "cursor", c(), m(s("String")))))))), _("pageInfo", "pageInfo", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("hasNextPage", "hasNextPage", c(), m(s("Boolean"))))))))))
                },
                RoomMembersShort: {
                    kind: "query",
                    name: "RoomMembersShort",
                    body: "query RoomMembersShort($roomId:ID!){members:roomMembers(roomId:$roomId){__typename user{__typename id}}}",
                    selector: p(_("roomMembers", "members", c(u("roomId", l("roomId"))), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("user", "user", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))))))))))))
                },
                RoomMembersTiny: {
                    kind: "query",
                    name: "RoomMembersTiny",
                    body: "query RoomMembersTiny($roomId:ID!){members:roomMembers(roomId:$roomId){__typename user{__typename id name shortname photo primaryOrganization{__typename id name}}}}",
                    selector: p(_("roomMembers", "members", c(u("roomId", l("roomId"))), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("user", "user", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))), _("shortname", "shortname", c(), s("String")), _("photo", "photo", c(), s("String")), _("primaryOrganization", "primaryOrganization", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))))))))))))))
                },
                RoomMetaPreview: {
                    kind: "query",
                    name: "RoomMetaPreview",
                    body: "query RoomMetaPreview($shortname:String!,$id:ID!){alphaResolveShortName(shortname:$shortname){__typename ... on SharedRoom{__typename id title description photo socialImage}}roomSocialImage(roomId:$id)}",
                    selector: p(_("alphaResolveShortName", "alphaResolveShortName", c(u("shortname", l("shortname"))), p(_("__typename", "__typename", c(), m(s("String"))), d("SharedRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("title", "title", c(), m(s("String"))), _("description", "description", c(), s("String")), _("photo", "photo", c(), m(s("String"))), _("socialImage", "socialImage", c(), s("String")))))), _("roomSocialImage", "roomSocialImage", c(u("roomId", l("id"))), s("String")))
                },
                RoomPico: {
                    kind: "query",
                    name: "RoomPico",
                    body: "query RoomPico($id:ID!){room(id:$id){__typename ...RoomNano}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title photo membersCount settings{__typename id mute}}",
                    selector: p(_("room", "room", c(u("id", l("id"))), p(_("__typename", "__typename", c(), m(s("String"))), y("Room", J))))
                },
                RoomSearch: {
                    kind: "query",
                    name: "RoomSearch",
                    body: "query RoomSearch($query:String,$sort:String,$page:Int){items:betaRoomSearch(query:$query,sort:$sort,page:$page,first:25){__typename edges{__typename node{__typename ... on SharedRoom{__typename id kind isChannel title photo membership membersCount organization{__typename id photo name}}}cursor}pageInfo{__typename hasNextPage hasPreviousPage itemsCount currentPage pagesCount openEnded}}}",
                    selector: p(_("betaRoomSearch", "items", c(u("query", l("query")), u("sort", l("sort")), u("page", l("page")), u("first", g(25))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("edges", "edges", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("node", "node", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), d("SharedRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("kind", "kind", c(), m(s("String"))), _("isChannel", "isChannel", c(), m(s("Boolean"))), _("title", "title", c(), m(s("String"))), _("photo", "photo", c(), m(s("String"))), _("membership", "membership", c(), m(s("String"))), _("membersCount", "membersCount", c(), m(s("Int"))), _("organization", "organization", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("photo", "photo", c(), s("String")), _("name", "name", c(), m(s("String")))))))))), _("cursor", "cursor", c(), m(s("String")))))))), _("pageInfo", "pageInfo", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("hasNextPage", "hasNextPage", c(), m(s("Boolean"))), _("hasPreviousPage", "hasPreviousPage", c(), m(s("Boolean"))), _("itemsCount", "itemsCount", c(), m(s("Int"))), _("currentPage", "currentPage", c(), m(s("Int"))), _("pagesCount", "pagesCount", c(), m(s("Int"))), _("openEnded", "openEnded", c(), m(s("Boolean"))))))))))
                },
                RoomSocialImage: {
                    kind: "query",
                    name: "RoomSocialImage",
                    body: "query RoomSocialImage($roomId:ID!){roomSocialImage(roomId:$roomId)}",
                    selector: p(_("roomSocialImage", "roomSocialImage", c(u("roomId", l("roomId"))), s("String")))
                },
                RoomTiny: {
                    kind: "query",
                    name: "RoomTiny",
                    body: "query RoomTiny($id:ID!){room(id:$id){__typename ...RoomShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel isPremium title photo membership role canEdit canSendMessage membersCount canUnpinMessage pinnedMessage{__typename ...FullMessage}organization{__typename ...OrganizationShort}settings{__typename id mute}myBadge{__typename ...UserBadge}owner{__typename id firstName isYou}repliesEnabled}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id user{__typename id}}... on SharedRoom{__typename id title isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname inContacts primaryOrganization{__typename id name shortname}}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageReactionCounter on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}",
                    selector: p(_("room", "room", c(u("id", l("id"))), p(_("__typename", "__typename", c(), m(s("String"))), y("Room", z))))
                },
                Settings: {
                    kind: "query",
                    name: "Settings",
                    body: "query Settings{settings{__typename ...SettingsFull}}fragment SettingsFull on Settings{__typename id primaryEmail emailFrequency excludeMutedChats countUnreadChats whoCanSeeEmail whoCanSeePhone desktop{__typename ...PlatformNotificationSettingsFull}mobile{__typename ...PlatformNotificationSettingsFull}}fragment PlatformNotificationSettingsFull on PlatformNotificationSettings{__typename direct{__typename showNotification sound}secretChat{__typename showNotification sound}organizationChat{__typename showNotification sound}communityChat{__typename showNotification sound}comments{__typename showNotification sound}notificationPreview}",
                    selector: p(_("settings", "settings", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("Settings", oe)))))
                },
                SharedMedia: {
                    kind: "query",
                    name: "SharedMedia",
                    body: "query SharedMedia($chatId:ID!,$mediaTypes:[SharedMediaType!]!,$first:Int!,$after:ID){sharedMedia:chatSharedMedia(chatId:$chatId,mediaTypes:$mediaTypes,first:$first,after:$after){__typename pageInfo{__typename hasNextPage currentPage}edges{__typename node{__typename message{__typename ... on GeneralMessage{__typename id fallback date sender{__typename id name}attachments{__typename ... on MessageAttachmentFile{__typename id fileMetadata{__typename name isImage imageFormat mimeType imageWidth imageHeight size}filePreview fileId fallback}... on MessageRichAttachment{__typename id title text titleLink imagePreview image{__typename url}imageFallback{__typename photo}keyboard{__typename buttons{__typename id title url}}}}}}}cursor}}}",
                    selector: p(_("chatSharedMedia", "sharedMedia", c(u("chatId", l("chatId")), u("mediaTypes", l("mediaTypes")), u("first", l("first")), u("after", l("after"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("pageInfo", "pageInfo", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("hasNextPage", "hasNextPage", c(), m(s("Boolean"))), _("currentPage", "currentPage", c(), m(s("Int")))))), _("edges", "edges", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("node", "node", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("message", "message", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), d("GeneralMessage", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("fallback", "fallback", c(), m(s("String"))), _("date", "date", c(), m(s("Date"))), _("sender", "sender", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String")))))), _("attachments", "attachments", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), d("MessageAttachmentFile", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("fileMetadata", "fileMetadata", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("name", "name", c(), m(s("String"))), _("isImage", "isImage", c(), m(s("Boolean"))), _("imageFormat", "imageFormat", c(), s("String")), _("mimeType", "mimeType", c(), s("String")), _("imageWidth", "imageWidth", c(), s("Int")), _("imageHeight", "imageHeight", c(), s("Int")), _("size", "size", c(), m(s("Int")))))), _("filePreview", "filePreview", c(), s("String")), _("fileId", "fileId", c(), m(s("String"))), _("fallback", "fallback", c(), m(s("String"))))), d("MessageRichAttachment", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("title", "title", c(), s("String")), _("text", "text", c(), s("String")), _("titleLink", "titleLink", c(), s("String")), _("imagePreview", "imagePreview", c(), s("String")), _("image", "image", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("url", "url", c(), m(s("String"))))), _("imageFallback", "imageFallback", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("photo", "photo", c(), m(s("String"))))), _("keyboard", "keyboard", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("buttons", "buttons", c(), m(o(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("title", "title", c(), m(s("String"))), _("url", "url", c(), s("String"))))))))))))))))))))))))), _("cursor", "cursor", c(), m(s("String"))))))))))))
                },
                SharedMediaCounters: {
                    kind: "query",
                    name: "SharedMediaCounters",
                    body: "query SharedMediaCounters($chatId:ID!){counters:chatSharedMediaCounters(chatId:$chatId){__typename links images documents videos}}",
                    selector: p(_("chatSharedMediaCounters", "counters", c(u("chatId", l("chatId"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("links", "links", c(), m(s("Int"))), _("images", "images", c(), m(s("Int"))), _("documents", "documents", c(), m(s("Int"))), _("videos", "videos", c(), m(s("Int")))))))
                },
                StickerPack: {
                    kind: "query",
                    name: "StickerPack",
                    body: "query StickerPack($id:ID!){stickerPack(id:$id){__typename ...StickerPackFragment}}fragment StickerPackFragment on StickerPack{__typename id title stickers{__typename ...StickerFragment}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}",
                    selector: p(_("stickerPack", "stickerPack", c(u("id", l("id"))), p(_("__typename", "__typename", c(), m(s("String"))), y("StickerPack", _e))))
                },
                StickerPackCatalog: {
                    kind: "query",
                    name: "StickerPackCatalog",
                    body: "query StickerPackCatalog{stickers:stickerPackCatalog{__typename id title published stickers{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}",
                    selector: p(_("stickerPackCatalog", "stickers", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("title", "title", c(), m(s("String"))), _("published", "published", c(), m(s("Boolean"))), _("stickers", "stickers", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("Sticker", P))))))))))))
                },
                StripeToken: {
                    kind: "query",
                    name: "StripeToken",
                    body: "query StripeToken{stripeToken}",
                    selector: p(_("stripeToken", "stripeToken", c(), m(s("String"))))
                },
                Subscriptions: {
                    kind: "query",
                    name: "Subscriptions",
                    body: "query Subscriptions{subscriptions{__typename id state expires amount interval product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}}}}",
                    selector: p(_("subscriptions", "subscriptions", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("state", "state", c(), m(s("String"))), _("expires", "expires", c(), m(s("Date"))), _("amount", "amount", c(), m(s("Int"))), _("interval", "interval", c(), m(s("String"))), _("product", "product", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), d("WalletProductGroup", p(_("__typename", "__typename", c(), m(s("String"))), _("group", "group", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("title", "title", c(), m(s("String"))), _("photo", "photo", c(), m(s("String")))))))))))))))))
                },
                SuggestedRooms: {
                    kind: "query",
                    name: "SuggestedRooms",
                    body: "query SuggestedRooms{suggestedRooms:betaSuggestedRooms{__typename ... on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}}}isDiscoverDone:betaIsDiscoverDone}",
                    selector: p(_("betaSuggestedRooms", "suggestedRooms", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), d("SharedRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("kind", "kind", c(), m(s("String"))), _("title", "title", c(), m(s("String"))), _("photo", "photo", c(), m(s("String"))), _("membersCount", "membersCount", c(), m(s("Int"))), _("membership", "membership", c(), m(s("String"))), _("organization", "organization", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))), _("photo", "photo", c(), s("String"))))))))))), _("betaIsDiscoverDone", "isDiscoverDone", c(), m(s("Boolean"))))
                },
                SuperAccount: {
                    kind: "query",
                    name: "SuperAccount",
                    body: "query SuperAccount($accountId:ID!,$viaOrgId:Boolean){superAccount(id:$accountId,viaOrgId:$viaOrgId){__typename id title state members{__typename ...UserShort}features{__typename id key title}orgId createdAt createdBy{__typename id name}published:alphaPublished}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}",
                    selector: p(_("superAccount", "superAccount", c(u("id", l("accountId")), u("viaOrgId", l("viaOrgId"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("title", "title", c(), m(s("String"))), _("state", "state", c(), m(s("String"))), _("members", "members", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("User", U)))))), _("features", "features", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("key", "key", c(), m(s("String"))), _("title", "title", c(), m(s("String")))))))), _("orgId", "orgId", c(), m(s("ID"))), _("createdAt", "createdAt", c(), s("String")), _("createdBy", "createdBy", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))))), _("alphaPublished", "published", c(), m(s("Boolean")))))))
                },
                SuperAccounts: {
                    kind: "query",
                    name: "SuperAccounts",
                    body: "query SuperAccounts{superAccounts{__typename id orgId title state createdAt}}",
                    selector: p(_("superAccounts", "superAccounts", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("orgId", "orgId", c(), m(s("ID"))), _("title", "title", c(), m(s("String"))), _("state", "state", c(), m(s("String"))), _("createdAt", "createdAt", c(), s("String"))))))))
                },
                SuperAdmins: {
                    kind: "query",
                    name: "SuperAdmins",
                    body: "query SuperAdmins{superAdmins{__typename role user{__typename ...UserShort}email}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}",
                    selector: p(_("superAdmins", "superAdmins", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("role", "role", c(), m(s("String"))), _("user", "user", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("User", U)))), _("email", "email", c(), s("String"))))))))
                },
                SuperBadgeInRoom: {
                    kind: "query",
                    name: "SuperBadgeInRoom",
                    body: "query SuperBadgeInRoom($roomId:ID!,$userId:ID!){superBadgeInRoom(roomId:$roomId,userId:$userId){__typename ...UserBadge}}fragment UserBadge on UserBadge{__typename id name verified}",
                    selector: p(_("superBadgeInRoom", "superBadgeInRoom", c(u("roomId", l("roomId")), u("userId", l("userId"))), p(_("__typename", "__typename", c(), m(s("String"))), y("UserBadge", C))))
                },
                TransactionsHistory: {
                    kind: "query",
                    name: "TransactionsHistory",
                    body: "query TransactionsHistory($first:Int!,$after:String){transactionsHistory(first:$first,after:$after){__typename items{__typename ...WalletTransactionFragment}cursor}}fragment WalletTransactionFragment on WalletTransaction{__typename id status date operation{__typename ... on WalletTransactionDeposit{__typename amount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}}... on WalletTransactionIncome{__typename amount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}source{__typename ... on WalletSubscription{__typename id product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}... on WalletProductDonation{__typename user{__typename id name photo}}... on WalletProductDonationMessage{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}... on WalletProductDonationReaction{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}}}... on Purchase{__typename id user{__typename id name photo}product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}... on WalletProductDonation{__typename user{__typename id name photo}}... on WalletProductDonationMessage{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}... on WalletProductDonationReaction{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}}}}}... on WalletTransactionTransferIn{__typename amount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}fromUser{__typename ...UserShort}}... on WalletTransactionTransferOut{__typename amount walletAmount chargeAmount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}toUser{__typename ...UserShort}}... on WalletTransactionSubscription{__typename amount walletAmount chargeAmount subscription{__typename id interval amount product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}... on WalletProductDonation{__typename user{__typename id name photo}}... on WalletProductDonationMessage{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}... on WalletProductDonationReaction{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}}}payment{__typename id status intent{__typename id clientSecret}card{__typename id brand last4}}}... on WalletTransactionPurchase{__typename amount walletAmount chargeAmount purchase{__typename id product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}... on WalletProductDonation{__typename user{__typename id name photo}}... on WalletProductDonationMessage{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}... on WalletProductDonationReaction{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}}}payment{__typename id status intent{__typename id clientSecret}card{__typename id brand last4}}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}",
                    selector: p(_("transactionsHistory", "transactionsHistory", c(u("first", l("first")), u("after", l("after"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("items", "items", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("WalletTransaction", ye)))))), _("cursor", "cursor", c(), s("String"))))))
                },
                User: {
                    kind: "query",
                    name: "User",
                    body: "query User($userId:ID!){user:user(id:$userId){__typename ...UserFull chatsWithBadge{__typename chat{__typename ...RoomShort}badge{__typename ...UserBadge}}}conversation:room(id:$userId){__typename ... on PrivateRoom{__typename id settings{__typename id mute}}}}fragment UserFull on User{__typename id name firstName lastName photo phone email website about location isBot isDeleted online lastSeen linkedin instagram twitter facebook shortname audienceSize inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel isPremium title photo membership role canEdit canSendMessage membersCount canUnpinMessage pinnedMessage{__typename ...FullMessage}organization{__typename ...OrganizationShort}settings{__typename id mute}myBadge{__typename ...UserBadge}owner{__typename id firstName isYou}repliesEnabled}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id user{__typename id}}... on SharedRoom{__typename id title isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname inContacts primaryOrganization{__typename id name shortname}}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageReactionCounter on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}",
                    selector: p(_("user", "user", c(u("id", l("userId"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("chatsWithBadge", "chatsWithBadge", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("chat", "chat", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("Room", z)))), _("badge", "badge", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("UserBadge", C))))))))), y("User", de)))), _("room", "conversation", c(u("id", l("userId"))), p(_("__typename", "__typename", c(), m(s("String"))), d("PrivateRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("settings", "settings", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("mute", "mute", c(), s("Boolean"))))))))))
                },
                UserAvailableRooms: {
                    kind: "query",
                    name: "UserAvailableRooms",
                    body: "query UserAvailableRooms($first:Int!,$after:String,$query:String){alphaUserAvailableRooms(first:$first,after:$after,query:$query){__typename edges{__typename node{__typename ...DiscoverSharedRoom}cursor}pageInfo{__typename hasNextPage}}}fragment DiscoverSharedRoom on SharedRoom{__typename id kind title photo membersCount membership organization{__typename id name photo}premiumSettings{__typename id price interval}isPremium premiumPassIsActive}",
                    selector: p(_("alphaUserAvailableRooms", "alphaUserAvailableRooms", c(u("first", l("first")), u("after", l("after")), u("query", l("query"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("edges", "edges", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("node", "node", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("SharedRoom", G)))), _("cursor", "cursor", c(), m(s("String")))))))), _("pageInfo", "pageInfo", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("hasNextPage", "hasNextPage", c(), m(s("Boolean"))))))))))
                },
                UserNano: {
                    kind: "query",
                    name: "UserNano",
                    body: "query UserNano($id:ID!){user(id:$id){__typename id name photo shortname isBot inContacts}}",
                    selector: p(_("user", "user", c(u("id", l("id"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))), _("photo", "photo", c(), s("String")), _("shortname", "shortname", c(), s("String")), _("isBot", "isBot", c(), m(s("Boolean"))), _("inContacts", "inContacts", c(), m(s("Boolean")))))))
                },
                UserPico: {
                    kind: "query",
                    name: "UserPico",
                    body: "query UserPico($userId:ID!){user:user(id:$userId){__typename id name firstName photo}}",
                    selector: p(_("user", "user", c(u("id", l("userId"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String"))), _("firstName", "firstName", c(), m(s("String"))), _("photo", "photo", c(), s("String"))))))
                },
                UserStorage: {
                    kind: "query",
                    name: "UserStorage",
                    body: "query UserStorage($namespace:String!,$keys:[String!]!){userStorage(namespace:$namespace,keys:$keys){__typename id key value}}",
                    selector: p(_("userStorage", "userStorage", c(u("namespace", l("namespace")), u("keys", l("keys"))), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("key", "key", c(), m(s("String"))), _("value", "value", c(), s("String"))))))))
                },
                Users: {
                    kind: "query",
                    name: "Users",
                    body: "query Users($query:String!){items:users(query:$query){__typename id title:name subtitle:email}}",
                    selector: p(_("users", "items", c(u("query", l("query"))), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "title", c(), m(s("String"))), _("email", "subtitle", c(), s("String"))))))))
                },
                AccountInviteJoin: {
                    kind: "mutation",
                    name: "AccountInviteJoin",
                    body: "mutation AccountInviteJoin($inviteKey:String!){alphaJoinInvite(key:$inviteKey)}",
                    selector: p(_("alphaJoinInvite", "alphaJoinInvite", c(u("key", l("inviteKey"))), m(s("ID"))))
                },
                AddAppToChat: {
                    kind: "mutation",
                    name: "AddAppToChat",
                    body: "mutation AddAppToChat($appId:ID!,$chatId:ID!){addAppToChat(appId:$appId,chatId:$chatId){__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}webhook}}",
                    selector: p(_("addAppToChat", "addAppToChat", c(u("appId", l("appId")), u("chatId", l("chatId"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("chat", "chat", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), d("PrivateRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))))), d("SharedRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID")))))))), _("webhook", "webhook", c(), m(s("String")))))))
                },
                AddComment: {
                    kind: "mutation",
                    name: "AddComment",
                    body: "mutation AddComment($repeatKey:String,$peerId:ID!,$message:String,$replyComment:ID,$mentions:[MentionInput!],$fileAttachments:[FileAttachmentInput!],$spans:[MessageSpanInput!]){betaAddComment(repeatKey:$repeatKey,peerId:$peerId,message:$message,replyComment:$replyComment,mentions:$mentions,fileAttachments:$fileAttachments,spans:$spans){__typename id}}",
                    selector: p(_("betaAddComment", "betaAddComment", c(u("repeatKey", l("repeatKey")), u("peerId", l("peerId")), u("message", l("message")), u("replyComment", l("replyComment")), u("mentions", l("mentions")), u("fileAttachments", l("fileAttachments")), u("spans", l("spans"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID")))))))
                },
                AddStickerComment: {
                    kind: "mutation",
                    name: "AddStickerComment",
                    body: "mutation AddStickerComment($peerId:ID!,$stickerId:ID!,$replyComment:ID,$repeatKey:String){addStickerComment:betaAddStickerComment(peerId:$peerId,stickerId:$stickerId,replyComment:$replyComment,repeatKey:$repeatKey){__typename id}}",
                    selector: p(_("betaAddStickerComment", "addStickerComment", c(u("peerId", l("peerId")), u("stickerId", l("stickerId")), u("replyComment", l("replyComment")), u("repeatKey", l("repeatKey"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID")))))))
                },
                AddToContacts: {
                    kind: "mutation",
                    name: "AddToContacts",
                    body: "mutation AddToContacts($userId:ID!){addToContacts(userId:$userId)}",
                    selector: p(_("addToContacts", "addToContacts", c(u("userId", l("userId"))), m(s("Boolean"))))
                },
                BetaDiscoverSkip: {
                    kind: "mutation",
                    name: "BetaDiscoverSkip",
                    body: "mutation BetaDiscoverSkip($selectedTagsIds:[String!]!){betaDiscoverSkip(selectedTagsIds:$selectedTagsIds){__typename tagGroup{__typename id}}}",
                    selector: p(_("betaDiscoverSkip", "betaDiscoverSkip", c(u("selectedTagsIds", l("selectedTagsIds"))), p(_("__typename", "__typename", c(), m(s("String"))), _("tagGroup", "tagGroup", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("String"))))))))
                },
                BetaNextDiscoverReset: {
                    kind: "mutation",
                    name: "BetaNextDiscoverReset",
                    body: "mutation BetaNextDiscoverReset{betaNextDiscoverReset}",
                    selector: p(_("betaNextDiscoverReset", "betaNextDiscoverReset", c(), m(s("Boolean"))))
                },
                BetaSubmitNextDiscover: {
                    kind: "mutation",
                    name: "BetaSubmitNextDiscover",
                    body: "mutation BetaSubmitNextDiscover($selectedTagsIds:[String!]!,$excudedGroupsIds:[String!]!){betaSubmitNextDiscover(selectedTagsIds:$selectedTagsIds,excudedGroupsIds:$excudedGroupsIds){__typename tagGroup{__typename id}}}",
                    selector: p(_("betaSubmitNextDiscover", "betaSubmitNextDiscover", c(u("selectedTagsIds", l("selectedTagsIds")), u("excudedGroupsIds", l("excudedGroupsIds"))), p(_("__typename", "__typename", c(), m(s("String"))), _("tagGroup", "tagGroup", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("String"))))))))
                },
                BuyPremiumChatPass: {
                    kind: "mutation",
                    name: "BuyPremiumChatPass",
                    body: "mutation BuyPremiumChatPass($chatId:ID!){betaBuyPremiumChatPass(chatId:$chatId){__typename id premiumPassIsActive membership}}",
                    selector: p(_("betaBuyPremiumChatPass", "betaBuyPremiumChatPass", c(u("chatId", l("chatId"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("premiumPassIsActive", "premiumPassIsActive", c(), m(s("Boolean"))), _("membership", "membership", c(), m(s("String")))))))
                },
                BuyPremiumChatSubscription: {
                    kind: "mutation",
                    name: "BuyPremiumChatSubscription",
                    body: "mutation BuyPremiumChatSubscription($chatId:ID!){betaBuyPremiumChatSubscription(chatId:$chatId){__typename id premiumPassIsActive premiumSubscription{__typename id state}membership}}",
                    selector: p(_("betaBuyPremiumChatSubscription", "betaBuyPremiumChatSubscription", c(u("chatId", l("chatId"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("premiumPassIsActive", "premiumPassIsActive", c(), m(s("Boolean"))), _("premiumSubscription", "premiumSubscription", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("state", "state", c(), m(s("String"))))), _("membership", "membership", c(), m(s("String")))))))
                },
                CancelSubscription: {
                    kind: "mutation",
                    name: "CancelSubscription",
                    body: "mutation CancelSubscription($id:ID!){subscriptionCancel(id:$id){__typename id}}",
                    selector: p(_("subscriptionCancel", "subscriptionCancel", c(u("id", l("id"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID")))))))
                },
                CommentDeleteUrlAugmentation: {
                    kind: "mutation",
                    name: "CommentDeleteUrlAugmentation",
                    body: "mutation CommentDeleteUrlAugmentation($id:ID!){deleteCommentAugmentation(id:$id)}",
                    selector: p(_("deleteCommentAugmentation", "deleteCommentAugmentation", c(u("id", l("id"))), m(s("Boolean"))))
                },
                CommentSetReaction: {
                    kind: "mutation",
                    name: "CommentSetReaction",
                    body: "mutation CommentSetReaction($commentId:ID!,$reaction:MessageReactionType!){commentReactionAdd(commentId:$commentId,reaction:$reaction)}",
                    selector: p(_("commentReactionAdd", "commentReactionAdd", c(u("commentId", l("commentId")), u("reaction", l("reaction"))), m(s("Boolean"))))
                },
                CommentUnsetReaction: {
                    kind: "mutation",
                    name: "CommentUnsetReaction",
                    body: "mutation CommentUnsetReaction($commentId:ID!,$reaction:MessageReactionType!){commentReactionRemove(commentId:$commentId,reaction:$reaction)}",
                    selector: p(_("commentReactionRemove", "commentReactionRemove", c(u("commentId", l("commentId")), u("reaction", l("reaction"))), m(s("Boolean"))))
                },
                CommitCardSetupIntent: {
                    kind: "mutation",
                    name: "CommitCardSetupIntent",
                    body: "mutation CommitCardSetupIntent($id:ID!,$pmid:ID!){cardCommitSetupIntent(id:$id,pmid:$pmid){__typename id}}",
                    selector: p(_("cardCommitSetupIntent", "cardCommitSetupIntent", c(u("id", l("id")), u("pmid", l("pmid"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID")))))))
                },
                ConferenceJoin: {
                    kind: "mutation",
                    name: "ConferenceJoin",
                    body: "mutation ConferenceJoin($id:ID!,$input:ConferenceJoinInput){conferenceJoin(id:$id,input:$input){__typename peerId conference{__typename ...ConferenceShort}}}fragment ConferenceShort on Conference{__typename id startTime iceServers{__typename urls username credential}}",
                    selector: p(_("conferenceJoin", "conferenceJoin", c(u("id", l("id")), u("input", l("input"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("peerId", "peerId", c(), m(s("ID"))), _("conference", "conference", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("Conference", F))))))))
                },
                ConferenceKeepAlive: {
                    kind: "mutation",
                    name: "ConferenceKeepAlive",
                    body: "mutation ConferenceKeepAlive($id:ID!,$peerId:ID!){conferenceKeepAlive(id:$id,peerId:$peerId){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename id startTime iceServers{__typename urls username credential}}",
                    selector: p(_("conferenceKeepAlive", "conferenceKeepAlive", c(u("id", l("id")), u("peerId", l("peerId"))), m(p(_("__typename", "__typename", c(), m(s("String"))), y("Conference", F)))))
                },
                ConferenceLeave: {
                    kind: "mutation",
                    name: "ConferenceLeave",
                    body: "mutation ConferenceLeave($id:ID!,$peerId:ID!){conferenceLeave(id:$id,peerId:$peerId){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename id startTime iceServers{__typename urls username credential}}",
                    selector: p(_("conferenceLeave", "conferenceLeave", c(u("id", l("id")), u("peerId", l("peerId"))), m(p(_("__typename", "__typename", c(), m(s("String"))), y("Conference", F)))))
                },
                CreateApp: {
                    kind: "mutation",
                    name: "CreateApp",
                    body: "mutation CreateApp($name:String!,$shortname:String,$photoRef:ImageRefInput,$about:String){createApp(name:$name,shortname:$shortname,photoRef:$photoRef,about:$about){__typename ...AppFull}}fragment AppFull on AppProfile{__typename id name shortname photoRef{__typename uuid crop{__typename x y w h}}about token{__typename salt}}",
                    selector: p(_("createApp", "createApp", c(u("name", l("name")), u("shortname", l("shortname")), u("photoRef", l("photoRef")), u("about", l("about"))), m(p(_("__typename", "__typename", c(), m(s("String"))), y("AppProfile", I)))))
                },
                CreateCardSetupIntent: {
                    kind: "mutation",
                    name: "CreateCardSetupIntent",
                    body: "mutation CreateCardSetupIntent($retryKey:String!){cardCreateSetupIntent(retryKey:$retryKey){__typename id clientSecret}}",
                    selector: p(_("cardCreateSetupIntent", "cardCreateSetupIntent", c(u("retryKey", l("retryKey"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("clientSecret", "clientSecret", c(), m(s("String")))))))
                },
                CreateDepositIntent: {
                    kind: "mutation",
                    name: "CreateDepositIntent",
                    body: "mutation CreateDepositIntent($cardId:ID!,$amount:Int!,$retryKey:String!){cardDepositIntent(id:$cardId,amount:$amount,retryKey:$retryKey){__typename id clientSecret}}",
                    selector: p(_("cardDepositIntent", "cardDepositIntent", c(u("id", l("cardId")), u("amount", l("amount")), u("retryKey", l("retryKey"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("clientSecret", "clientSecret", c(), m(s("String")))))))
                },
                CreateOrganization: {
                    kind: "mutation",
                    name: "CreateOrganization",
                    body: "mutation CreateOrganization($input:CreateOrganizationInput!){organization:createOrganization(input:$input){__typename id name}}",
                    selector: p(_("createOrganization", "organization", c(u("input", l("input"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String")))))))
                },
                DebugMails: {
                    kind: "mutation",
                    name: "DebugMails",
                    body: "mutation DebugMails($type:DebugEmailType!){debugSendEmail(type:$type)}",
                    selector: p(_("debugSendEmail", "debugSendEmail", c(u("type", l("type"))), s("Boolean")))
                },
                DeleteComment: {
                    kind: "mutation",
                    name: "DeleteComment",
                    body: "mutation DeleteComment($id:ID!){deleteComment(id:$id)}",
                    selector: p(_("deleteComment", "deleteComment", c(u("id", l("id"))), m(s("Boolean"))))
                },
                DeleteNotification: {
                    kind: "mutation",
                    name: "DeleteNotification",
                    body: "mutation DeleteNotification($notificationId:ID!){deleteNotification(notificationId:$notificationId)}",
                    selector: p(_("deleteNotification", "deleteNotification", c(u("notificationId", l("notificationId"))), m(s("Boolean"))))
                },
                DeleteOrganization: {
                    kind: "mutation",
                    name: "DeleteOrganization",
                    body: "mutation DeleteOrganization($organizationId:ID!){deleteOrganization(id:$organizationId)}",
                    selector: p(_("deleteOrganization", "deleteOrganization", c(u("id", l("organizationId"))), m(s("Boolean"))))
                },
                DeleteUser: {
                    kind: "mutation",
                    name: "DeleteUser",
                    body: "mutation DeleteUser($id:ID!){superDeleteUser(id:$id)}",
                    selector: p(_("superDeleteUser", "superDeleteUser", c(u("id", l("id"))), m(s("Boolean"))))
                },
                DiscoverCollectionSetShortname: {
                    kind: "mutation",
                    name: "DiscoverCollectionSetShortname",
                    body: "mutation DiscoverCollectionSetShortname($id:ID!,$shortname:String!){alphaSetCollectionShortName(id:$id,shortname:$shortname)}",
                    selector: p(_("alphaSetCollectionShortName", "alphaSetCollectionShortName", c(u("id", l("id")), u("shortname", l("shortname"))), s("String")))
                },
                DiscoverCollectionsCreate: {
                    kind: "mutation",
                    name: "DiscoverCollectionsCreate",
                    body: "mutation DiscoverCollectionsCreate($title:String!,$description:String,$image:ImageRefInput!,$chatIds:[ID!]!){discoverCollectionsCreate(collection:{title:$title,description:$description,image:$image,chatIds:$chatIds}){__typename id title}}",
                    selector: p(_("discoverCollectionsCreate", "discoverCollectionsCreate", c(u("collection", f(u("title", l("title")), u("description", l("description")), u("image", l("image")), u("chatIds", l("chatIds"))))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("title", "title", c(), m(s("String")))))))
                },
                DiscoverCollectionsDelete: {
                    kind: "mutation",
                    name: "DiscoverCollectionsDelete",
                    body: "mutation DiscoverCollectionsDelete($id:ID!){discoverCollectionsDelete(id:$id)}",
                    selector: p(_("discoverCollectionsDelete", "discoverCollectionsDelete", c(u("id", l("id"))), m(s("Boolean"))))
                },
                DiscoverCollectionsUpdate: {
                    kind: "mutation",
                    name: "DiscoverCollectionsUpdate",
                    body: "mutation DiscoverCollectionsUpdate($id:ID!,$title:String!,$description:String,$image:ImageRefInput!,$chatIds:[ID!]!){discoverCollectionsUpdate(id:$id,input:{title:$title,description:$description,image:$image,chatIds:$chatIds}){__typename id title}}",
                    selector: p(_("discoverCollectionsUpdate", "discoverCollectionsUpdate", c(u("id", l("id")), u("input", f(u("title", l("title")), u("description", l("description")), u("image", l("image")), u("chatIds", l("chatIds"))))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("title", "title", c(), m(s("String")))))))
                },
                DiscoverEditorsChoiceCreate: {
                    kind: "mutation",
                    name: "DiscoverEditorsChoiceCreate",
                    body: "mutation DiscoverEditorsChoiceCreate($image:ImageRefInput!,$cid:ID!){discoverEditorsChoiceCreate(input:{image:$image,cid:$cid}){__typename id image{__typename uuid crop{__typename x y w h}}chat{__typename id title}}}",
                    selector: p(_("discoverEditorsChoiceCreate", "discoverEditorsChoiceCreate", c(u("input", f(u("image", l("image")), u("cid", l("cid"))))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("image", "image", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("uuid", "uuid", c(), m(s("String"))), _("crop", "crop", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("x", "x", c(), m(s("Int"))), _("y", "y", c(), m(s("Int"))), _("w", "w", c(), m(s("Int"))), _("h", "h", c(), m(s("Int")))))))), _("chat", "chat", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("title", "title", c(), m(s("String"))))))))))
                },
                DiscoverEditorsChoiceDelete: {
                    kind: "mutation",
                    name: "DiscoverEditorsChoiceDelete",
                    body: "mutation DiscoverEditorsChoiceDelete($id:ID!){discoverEditorsChoiceDelete(id:$id)}",
                    selector: p(_("discoverEditorsChoiceDelete", "discoverEditorsChoiceDelete", c(u("id", l("id"))), m(s("Boolean"))))
                },
                DiscoverEditorsChoiceUpdate: {
                    kind: "mutation",
                    name: "DiscoverEditorsChoiceUpdate",
                    body: "mutation DiscoverEditorsChoiceUpdate($id:ID!,$image:ImageRefInput!,$cid:ID!){discoverEditorsChoiceUpdate(id:$id,input:{image:$image,cid:$cid}){__typename id image{__typename uuid crop{__typename x y w h}}chat{__typename id title}}}",
                    selector: p(_("discoverEditorsChoiceUpdate", "discoverEditorsChoiceUpdate", c(u("id", l("id")), u("input", f(u("image", l("image")), u("cid", l("cid"))))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("image", "image", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("uuid", "uuid", c(), m(s("String"))), _("crop", "crop", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("x", "x", c(), m(s("Int"))), _("y", "y", c(), m(s("Int"))), _("w", "w", c(), m(s("Int"))), _("h", "h", c(), m(s("Int")))))))), _("chat", "chat", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("title", "title", c(), m(s("String"))))))))))
                },
                EditComment: {
                    kind: "mutation",
                    name: "EditComment",
                    body: "mutation EditComment($id:ID!,$message:String,$mentions:[MentionInput!],$fileAttachments:[FileAttachmentInput!],$spans:[MessageSpanInput!]){editComment(id:$id,message:$message,mentions:$mentions,fileAttachments:$fileAttachments,spans:$spans)}",
                    selector: p(_("editComment", "editComment", c(u("id", l("id")), u("message", l("message")), u("mentions", l("mentions")), u("fileAttachments", l("fileAttachments")), u("spans", l("spans"))), m(s("Boolean"))))
                },
                EditMessage: {
                    kind: "mutation",
                    name: "EditMessage",
                    body: "mutation EditMessage($messageId:ID!,$message:String,$replyMessages:[ID!],$mentions:[MentionInput!],$fileAttachments:[FileAttachmentInput!],$spans:[MessageSpanInput!]){editMessage(messageId:$messageId,message:$message,replyMessages:$replyMessages,mentions:$mentions,fileAttachments:$fileAttachments,spans:$spans)}",
                    selector: p(_("editMessage", "editMessage", c(u("messageId", l("messageId")), u("message", l("message")), u("replyMessages", l("replyMessages")), u("mentions", l("mentions")), u("fileAttachments", l("fileAttachments")), u("spans", l("spans"))), m(s("Boolean"))))
                },
                FeatureFlagAdd: {
                    kind: "mutation",
                    name: "FeatureFlagAdd",
                    body: "mutation FeatureFlagAdd($key:String!,$title:String!){featureFlagAdd(key:$key,title:$title){__typename id key title}}",
                    selector: p(_("featureFlagAdd", "featureFlagAdd", c(u("key", l("key")), u("title", l("title"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("key", "key", c(), m(s("String"))), _("title", "title", c(), m(s("String")))))))
                },
                FeatureFlagDisable: {
                    kind: "mutation",
                    name: "FeatureFlagDisable",
                    body: "mutation FeatureFlagDisable($accountId:ID!,$featureId:ID!){superAccountFeatureRemove(id:$accountId,featureId:$featureId){__typename id features{__typename id key title}}}",
                    selector: p(_("superAccountFeatureRemove", "superAccountFeatureRemove", c(u("id", l("accountId")), u("featureId", l("featureId"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("features", "features", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("key", "key", c(), m(s("String"))), _("title", "title", c(), m(s("String"))))))))))))
                },
                FeatureFlagEnable: {
                    kind: "mutation",
                    name: "FeatureFlagEnable",
                    body: "mutation FeatureFlagEnable($accountId:ID!,$featureId:ID!){superAccountFeatureAdd(id:$accountId,featureId:$featureId){__typename id features{__typename id key title}}}",
                    selector: p(_("superAccountFeatureAdd", "superAccountFeatureAdd", c(u("id", l("accountId")), u("featureId", l("featureId"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("features", "features", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("key", "key", c(), m(s("String"))), _("title", "title", c(), m(s("String"))))))))))))
                },
                GlobalEventBusPublish: {
                    kind: "mutation",
                    name: "GlobalEventBusPublish",
                    body: "mutation GlobalEventBusPublish($topic:String!,$message:String!){globalEventBusPublish(topic:$topic,message:$message)}",
                    selector: p(_("globalEventBusPublish", "globalEventBusPublish", c(u("topic", l("topic")), u("message", l("message"))), m(s("Boolean"))))
                },
                MakeCardDefault: {
                    kind: "mutation",
                    name: "MakeCardDefault",
                    body: "mutation MakeCardDefault($id:ID!){cardMakeDefault(id:$id){__typename id isDefault}}",
                    selector: p(_("cardMakeDefault", "cardMakeDefault", c(u("id", l("id"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("isDefault", "isDefault", c(), m(s("Boolean")))))))
                },
                MarkSequenceRead: {
                    kind: "mutation",
                    name: "MarkSequenceRead",
                    body: "mutation MarkSequenceRead($seq:Int!){alphaGlobalRead(toSeq:$seq)}",
                    selector: p(_("alphaGlobalRead", "alphaGlobalRead", c(u("toSeq", l("seq"))), m(s("String"))))
                },
                MediaAnswer: {
                    kind: "mutation",
                    name: "MediaAnswer",
                    body: "mutation MediaAnswer($id:ID!,$peerId:ID!,$answer:String!,$seq:Int!){mediaStreamAnswer(id:$id,peerId:$peerId,answer:$answer,seq:$seq){__typename id streams{__typename ...MediaStreamFull}}}fragment MediaStreamFull on MediaStream{__typename id seq state sdp ice iceTransportPolicy receivers{__typename peerId kind videoSource mid}senders{__typename kind videoSource codecParams mid}}",
                    selector: p(_("mediaStreamAnswer", "mediaStreamAnswer", c(u("id", l("id")), u("peerId", l("peerId")), u("answer", l("answer")), u("seq", l("seq"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("streams", "streams", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("MediaStream", K))))))))))
                },
                MediaCandidate: {
                    kind: "mutation",
                    name: "MediaCandidate",
                    body: "mutation MediaCandidate($id:ID!,$peerId:ID!,$candidate:String!){mediaStreamCandidate(id:$id,peerId:$peerId,candidate:$candidate){__typename id streams{__typename ...MediaStreamFull}}}fragment MediaStreamFull on MediaStream{__typename id seq state sdp ice iceTransportPolicy receivers{__typename peerId kind videoSource mid}senders{__typename kind videoSource codecParams mid}}",
                    selector: p(_("mediaStreamCandidate", "mediaStreamCandidate", c(u("id", l("id")), u("peerId", l("peerId")), u("candidate", l("candidate"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("streams", "streams", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("MediaStream", K))))))))))
                },
                MediaFailed: {
                    kind: "mutation",
                    name: "MediaFailed",
                    body: "mutation MediaFailed($id:ID!,$peerId:ID!){mediaStreamFailed(id:$id,peerId:$peerId){__typename id streams{__typename ...MediaStreamFull}}}fragment MediaStreamFull on MediaStream{__typename id seq state sdp ice iceTransportPolicy receivers{__typename peerId kind videoSource mid}senders{__typename kind videoSource codecParams mid}}",
                    selector: p(_("mediaStreamFailed", "mediaStreamFailed", c(u("id", l("id")), u("peerId", l("peerId"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("streams", "streams", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("MediaStream", K))))))))))
                },
                MediaOffer: {
                    kind: "mutation",
                    name: "MediaOffer",
                    body: "mutation MediaOffer($id:ID!,$peerId:ID!,$offer:String!,$seq:Int!,$hints:[MediaStreamHint!]){mediaStreamOffer(id:$id,peerId:$peerId,offer:$offer,seq:$seq,hints:$hints){__typename id streams{__typename ...MediaStreamFull}}}fragment MediaStreamFull on MediaStream{__typename id seq state sdp ice iceTransportPolicy receivers{__typename peerId kind videoSource mid}senders{__typename kind videoSource codecParams mid}}",
                    selector: p(_("mediaStreamOffer", "mediaStreamOffer", c(u("id", l("id")), u("peerId", l("peerId")), u("offer", l("offer")), u("seq", l("seq")), u("hints", l("hints"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("streams", "streams", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("MediaStream", K))))))))))
                },
                MessageSetDonationReaction: {
                    kind: "mutation",
                    name: "MessageSetDonationReaction",
                    body: "mutation MessageSetDonationReaction($messageId:ID!){messageDonationReactionAdd(messageId:$messageId)}",
                    selector: p(_("messageDonationReactionAdd", "messageDonationReactionAdd", c(u("messageId", l("messageId"))), m(s("Boolean"))))
                },
                MessageSetReaction: {
                    kind: "mutation",
                    name: "MessageSetReaction",
                    body: "mutation MessageSetReaction($messageId:ID!,$reaction:MessageReactionType!){messageReactionAdd(messageId:$messageId,reaction:$reaction)}",
                    selector: p(_("messageReactionAdd", "messageReactionAdd", c(u("messageId", l("messageId")), u("reaction", l("reaction"))), m(s("Boolean"))))
                },
                MessageUnsetReaction: {
                    kind: "mutation",
                    name: "MessageUnsetReaction",
                    body: "mutation MessageUnsetReaction($messageId:ID!,$reaction:MessageReactionType!){messageReactionRemove(messageId:$messageId,reaction:$reaction)}",
                    selector: p(_("messageReactionRemove", "messageReactionRemove", c(u("messageId", l("messageId")), u("reaction", l("reaction"))), m(s("Boolean"))))
                },
                MyNotificationCenterMarkSeqRead: {
                    kind: "mutation",
                    name: "MyNotificationCenterMarkSeqRead",
                    body: "mutation MyNotificationCenterMarkSeqRead($seq:Int!){notificationCenterMarkSeqRead(toSeq:$seq)}",
                    selector: p(_("notificationCenterMarkSeqRead", "notificationCenterMarkSeqRead", c(u("toSeq", l("seq"))), m(s("Boolean"))))
                },
                OrganizationActivateByInvite: {
                    kind: "mutation",
                    name: "OrganizationActivateByInvite",
                    body: "mutation OrganizationActivateByInvite($inviteKey:String!){joinAppInvite(key:$inviteKey)}",
                    selector: p(_("joinAppInvite", "joinAppInvite", c(u("key", l("inviteKey"))), m(s("ID"))))
                },
                OrganizationAddMember: {
                    kind: "mutation",
                    name: "OrganizationAddMember",
                    body: "mutation OrganizationAddMember($userIds:[ID!],$organizationId:ID!){alphaOrganizationMemberAdd(userIds:$userIds,organizationId:$organizationId){__typename role user{__typename ...UserShort}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}",
                    selector: p(_("alphaOrganizationMemberAdd", "alphaOrganizationMemberAdd", c(u("userIds", l("userIds")), u("organizationId", l("organizationId"))), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("role", "role", c(), m(s("String"))), _("user", "user", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("User", U))))))))))
                },
                OrganizationChangeMemberRole: {
                    kind: "mutation",
                    name: "OrganizationChangeMemberRole",
                    body: "mutation OrganizationChangeMemberRole($memberId:ID!,$newRole:OrganizationMemberRole!,$organizationId:ID!){alphaOrganizationChangeMemberRole(memberId:$memberId,newRole:$newRole,organizationId:$organizationId)}",
                    selector: p(_("alphaOrganizationChangeMemberRole", "alphaOrganizationChangeMemberRole", c(u("memberId", l("memberId")), u("newRole", l("newRole")), u("organizationId", l("organizationId"))), m(s("String"))))
                },
                OrganizationCreatePublicInvite: {
                    kind: "mutation",
                    name: "OrganizationCreatePublicInvite",
                    body: "mutation OrganizationCreatePublicInvite($expirationDays:Int,$organizationId:ID){alphaOrganizationRefreshInviteLink(expirationDays:$expirationDays,organizationId:$organizationId){__typename id key ttl}}",
                    selector: p(_("alphaOrganizationRefreshInviteLink", "alphaOrganizationRefreshInviteLink", c(u("expirationDays", l("expirationDays")), u("organizationId", l("organizationId"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("key", "key", c(), m(s("String"))), _("ttl", "ttl", c(), s("String"))))))
                },
                OrganizationMemberRemove: {
                    kind: "mutation",
                    name: "OrganizationMemberRemove",
                    body: "mutation OrganizationMemberRemove($userId:ID!,$organizationId:ID!){betaOrganizationMemberRemove(userId:$userId,organizationId:$organizationId){__typename id}}",
                    selector: p(_("betaOrganizationMemberRemove", "betaOrganizationMemberRemove", c(u("userId", l("userId")), u("organizationId", l("organizationId"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID")))))))
                },
                PairEmail: {
                    kind: "mutation",
                    name: "PairEmail",
                    body: "mutation PairEmail($sessionId:String!,$confirmationCode:String!){pairEmail(sessionId:$sessionId,confirmationCode:$confirmationCode)}",
                    selector: p(_("pairEmail", "pairEmail", c(u("sessionId", l("sessionId")), u("confirmationCode", l("confirmationCode"))), m(s("Boolean"))))
                },
                PairPhone: {
                    kind: "mutation",
                    name: "PairPhone",
                    body: "mutation PairPhone($sessionId:String!,$confirmationCode:String!){pairPhone(sessionId:$sessionId,confirmationCode:$confirmationCode)}",
                    selector: p(_("pairPhone", "pairPhone", c(u("sessionId", l("sessionId")), u("confirmationCode", l("confirmationCode"))), m(s("Boolean"))))
                },
                PaymentIntentCancel: {
                    kind: "mutation",
                    name: "PaymentIntentCancel",
                    body: "mutation PaymentIntentCancel($id:ID!){paymentCancel(id:$id)}",
                    selector: p(_("paymentCancel", "paymentCancel", c(u("id", l("id"))), m(s("Boolean"))))
                },
                PaymentIntentCommit: {
                    kind: "mutation",
                    name: "PaymentIntentCommit",
                    body: "mutation PaymentIntentCommit($id:ID!){paymentIntentCommit(id:$id)}",
                    selector: p(_("paymentIntentCommit", "paymentIntentCommit", c(u("id", l("id"))), m(s("Boolean"))))
                },
                PersistEvents: {
                    kind: "mutation",
                    name: "PersistEvents",
                    body: "mutation PersistEvents($did:String!,$events:[Event!]!,$isProd:Boolean){track(did:$did,events:$events,isProd:$isProd)}",
                    selector: p(_("track", "track", c(u("did", l("did")), u("events", l("events")), u("isProd", l("isProd"))), m(s("String"))))
                },
                PhonebookAdd: {
                    kind: "mutation",
                    name: "PhonebookAdd",
                    body: "mutation PhonebookAdd($records:[PhonebookRecordInput!]!){phonebookAdd(records:$records)}",
                    selector: p(_("phonebookAdd", "phonebookAdd", c(u("records", l("records"))), m(s("Boolean"))))
                },
                PinMessage: {
                    kind: "mutation",
                    name: "PinMessage",
                    body: "mutation PinMessage($chatId:ID!,$messageId:ID!){pinMessage:gammaPinMessage(chatId:$chatId,messageId:$messageId){__typename ...RoomShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel isPremium title photo membership role canEdit canSendMessage membersCount canUnpinMessage pinnedMessage{__typename ...FullMessage}organization{__typename ...OrganizationShort}settings{__typename id mute}myBadge{__typename ...UserBadge}owner{__typename id firstName isYou}repliesEnabled}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id user{__typename id}}... on SharedRoom{__typename id title isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname inContacts primaryOrganization{__typename id name shortname}}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageReactionCounter on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}",
                    selector: p(_("gammaPinMessage", "pinMessage", c(u("chatId", l("chatId")), u("messageId", l("messageId"))), m(p(_("__typename", "__typename", c(), m(s("String"))), y("Room", z)))))
                },
                PostCreateDraft: {
                    kind: "mutation",
                    name: "PostCreateDraft",
                    body: "mutation PostCreateDraft{postDraftCreate(input:{}){__typename ...PostDraftSimple}}fragment PostDraftSimple on PostDraft{__typename id title content{__typename ...ParagraphSimple}publishedCopy{__typename id}channel{__typename id title shortname}createdAt updatedAt deletedAt}fragment ParagraphSimple on Paragraph{__typename ... on TextParagraph{__typename text spans{__typename ... on PostSpanBold{__typename offset length}... on PostSpanItalic{__typename offset length}... on PostSpanIrony{__typename offset length}... on PostSpanLink{__typename offset length url}}}... on ImageParagraph{__typename url image{__typename uuid}fileMetadata{__typename isImage imageWidth imageHeight imageFormat}}... on H1Paragraph{__typename text}... on H2Paragraph{__typename text}}",
                    selector: p(_("postDraftCreate", "postDraftCreate", c(u("input", f())), m(p(_("__typename", "__typename", c(), m(s("String"))), y("PostDraft", ie)))))
                },
                PostDraftUpdate: {
                    kind: "mutation",
                    name: "PostDraftUpdate",
                    body: "mutation PostDraftUpdate($id:ID!,$channel:ID,$title:String!,$content:[PostContentInput!]){postDraftUpdate(id:$id,input:{hub:$channel,title:$title,content:$content}){__typename ...PostDraftSimple}}fragment PostDraftSimple on PostDraft{__typename id title content{__typename ...ParagraphSimple}publishedCopy{__typename id}channel{__typename id title shortname}createdAt updatedAt deletedAt}fragment ParagraphSimple on Paragraph{__typename ... on TextParagraph{__typename text spans{__typename ... on PostSpanBold{__typename offset length}... on PostSpanItalic{__typename offset length}... on PostSpanIrony{__typename offset length}... on PostSpanLink{__typename offset length url}}}... on ImageParagraph{__typename url image{__typename uuid}fileMetadata{__typename isImage imageWidth imageHeight imageFormat}}... on H1Paragraph{__typename text}... on H2Paragraph{__typename text}}",
                    selector: p(_("postDraftUpdate", "postDraftUpdate", c(u("id", l("id")), u("input", f(u("hub", l("channel")), u("title", l("title")), u("content", l("content"))))), m(p(_("__typename", "__typename", c(), m(s("String"))), y("PostDraft", ie)))))
                },
                PostPublish: {
                    kind: "mutation",
                    name: "PostPublish",
                    body: "mutation PostPublish($id:ID!){postDraftPublish(id:$id){__typename ...PostSimple}}fragment PostSimple on Post{__typename id title content{__typename ...ParagraphSimple}channel{__typename id title shortname}author{__typename id name}draft{__typename id}canEdit createdAt updatedAt deletedAt}fragment ParagraphSimple on Paragraph{__typename ... on TextParagraph{__typename text spans{__typename ... on PostSpanBold{__typename offset length}... on PostSpanItalic{__typename offset length}... on PostSpanIrony{__typename offset length}... on PostSpanLink{__typename offset length url}}}... on ImageParagraph{__typename url image{__typename uuid}fileMetadata{__typename isImage imageWidth imageHeight imageFormat}}... on H1Paragraph{__typename text}... on H2Paragraph{__typename text}}",
                    selector: p(_("postDraftPublish", "postDraftPublish", c(u("id", l("id"))), m(p(_("__typename", "__typename", c(), m(s("String"))), y("Post", re)))))
                },
                ProfileCreate: {
                    kind: "mutation",
                    name: "ProfileCreate",
                    body: "mutation ProfileCreate($input:ProfileInput!,$inviteKey:String){profileCreate(input:$input,inviteKey:$inviteKey){__typename id firstName lastName photoRef{__typename uuid crop{__typename x y w h}}email phone website about location}}",
                    selector: p(_("profileCreate", "profileCreate", c(u("input", l("input")), u("inviteKey", l("inviteKey"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("firstName", "firstName", c(), s("String")), _("lastName", "lastName", c(), s("String")), _("photoRef", "photoRef", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("uuid", "uuid", c(), m(s("String"))), _("crop", "crop", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("x", "x", c(), m(s("Int"))), _("y", "y", c(), m(s("Int"))), _("w", "w", c(), m(s("Int"))), _("h", "h", c(), m(s("Int"))))))), _("email", "email", c(), s("String")), _("phone", "phone", c(), s("String")), _("website", "website", c(), s("String")), _("about", "about", c(), s("String")), _("location", "location", c(), s("String"))))))
                },
                ProfileUpdate: {
                    kind: "mutation",
                    name: "ProfileUpdate",
                    body: "mutation ProfileUpdate($input:ProfileInput!,$uid:ID,$inviteKey:String){profileUpdate(input:$input,uid:$uid,inviteKey:$inviteKey){__typename id firstName lastName photoRef{__typename uuid crop{__typename x y w h}}email phone website about location role:alphaRole linkedin instagram facebook twitter primaryOrganizationId:alphaPrimaryOrganizationId joinedAt:alphaJoinedAt invitedBy:alphaInvitedBy{__typename id name}}}",
                    selector: p(_("profileUpdate", "profileUpdate", c(u("input", l("input")), u("uid", l("uid")), u("inviteKey", l("inviteKey"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("firstName", "firstName", c(), s("String")), _("lastName", "lastName", c(), s("String")), _("photoRef", "photoRef", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("uuid", "uuid", c(), m(s("String"))), _("crop", "crop", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("x", "x", c(), m(s("Int"))), _("y", "y", c(), m(s("Int"))), _("w", "w", c(), m(s("Int"))), _("h", "h", c(), m(s("Int"))))))), _("email", "email", c(), s("String")), _("phone", "phone", c(), s("String")), _("website", "website", c(), s("String")), _("about", "about", c(), s("String")), _("location", "location", c(), s("String")), _("alphaRole", "role", c(), s("String")), _("linkedin", "linkedin", c(), s("String")), _("instagram", "instagram", c(), s("String")), _("facebook", "facebook", c(), s("String")), _("twitter", "twitter", c(), s("String")), _("alphaPrimaryOrganizationId", "primaryOrganizationId", c(), s("ID")), _("alphaJoinedAt", "joinedAt", c(), s("String")), _("alphaInvitedBy", "invitedBy", c(), p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("name", "name", c(), m(s("String")))))))))
                },
                ReadNotification: {
                    kind: "mutation",
                    name: "ReadNotification",
                    body: "mutation ReadNotification($notificationId:ID!){readNotification(notificationId:$notificationId){__typename id unread}}",
                    selector: p(_("readNotification", "readNotification", c(u("notificationId", l("notificationId"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("unread", "unread", c(), m(s("Int")))))))
                },
                RefreshAppToken: {
                    kind: "mutation",
                    name: "RefreshAppToken",
                    body: "mutation RefreshAppToken($appId:ID!){refreshAppToken(appId:$appId){__typename ...AppFull}}fragment AppFull on AppProfile{__typename id name shortname photoRef{__typename uuid crop{__typename x y w h}}about token{__typename salt}}",
                    selector: p(_("refreshAppToken", "refreshAppToken", c(u("appId", l("appId"))), m(p(_("__typename", "__typename", c(), m(s("String"))), y("AppProfile", I)))))
                },
                RegisterPush: {
                    kind: "mutation",
                    name: "RegisterPush",
                    body: "mutation RegisterPush($endpoint:String!,$type:PushType!){registerPush(endpoint:$endpoint,type:$type)}",
                    selector: p(_("registerPush", "registerPush", c(u("endpoint", l("endpoint")), u("type", l("type"))), m(s("String"))))
                },
                RegisterWebPush: {
                    kind: "mutation",
                    name: "RegisterWebPush",
                    body: "mutation RegisterWebPush($endpoint:String!){registerWebPush(endpoint:$endpoint)}",
                    selector: p(_("registerWebPush", "registerWebPush", c(u("endpoint", l("endpoint"))), m(s("String"))))
                },
                RemoveCard: {
                    kind: "mutation",
                    name: "RemoveCard",
                    body: "mutation RemoveCard($id:ID!){cardRemove(id:$id){__typename id deleted}}",
                    selector: p(_("cardRemove", "cardRemove", c(u("id", l("id"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("deleted", "deleted", c(), m(s("Boolean")))))))
                },
                RemoveFromContacts: {
                    kind: "mutation",
                    name: "RemoveFromContacts",
                    body: "mutation RemoveFromContacts($userId:ID!){removeFromContacts(userId:$userId)}",
                    selector: p(_("removeFromContacts", "removeFromContacts", c(u("userId", l("userId"))), m(s("Boolean"))))
                },
                ReportContent: {
                    kind: "mutation",
                    name: "ReportContent",
                    body: "mutation ReportContent($contentId:ID!,$type:String!,$message:String){reportContent(contentId:$contentId,type:$type,message:$message)}",
                    selector: p(_("reportContent", "reportContent", c(u("contentId", l("contentId")), u("type", l("type")), u("message", l("message"))), s("Boolean")))
                },
                ReportOnline: {
                    kind: "mutation",
                    name: "ReportOnline",
                    body: "mutation ReportOnline($active:Boolean,$platform:String){presenceReportOnline(timeout:5000,active:$active,platform:$platform)}",
                    selector: p(_("presenceReportOnline", "presenceReportOnline", c(u("timeout", g(5e3)), u("active", l("active")), u("platform", l("platform"))), m(s("String"))))
                },
                RoomAddMembers: {
                    kind: "mutation",
                    name: "RoomAddMembers",
                    body: "mutation RoomAddMembers($roomId:ID!,$invites:[RoomInviteInput!]!){alphaRoomInvite(roomId:$roomId,invites:$invites){__typename user{__typename ...UserShort}role membership canKick badge{__typename ...UserBadge}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}fragment UserBadge on UserBadge{__typename id name verified}",
                    selector: p(_("alphaRoomInvite", "alphaRoomInvite", c(u("roomId", l("roomId")), u("invites", l("invites"))), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("user", "user", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("User", U)))), _("role", "role", c(), m(s("String"))), _("membership", "membership", c(), m(s("String"))), _("canKick", "canKick", c(), m(s("Boolean"))), _("badge", "badge", c(), p(_("__typename", "__typename", c(), m(s("String"))), y("UserBadge", C)))))))))
                },
                RoomChangeRole: {
                    kind: "mutation",
                    name: "RoomChangeRole",
                    body: "mutation RoomChangeRole($roomId:ID!,$userId:ID!,$newRole:RoomMemberRole!){betaRoomChangeRole(roomId:$roomId,userId:$userId,newRole:$newRole){__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}",
                    selector: p(_("betaRoomChangeRole", "betaRoomChangeRole", c(u("roomId", l("roomId")), u("userId", l("userId")), u("newRole", l("newRole"))), m(p(_("__typename", "__typename", c(), m(s("String"))), d("PrivateRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))))), d("SharedRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID")))))))))
                },
                RoomCreate: {
                    kind: "mutation",
                    name: "RoomCreate",
                    body: "mutation RoomCreate($kind:SharedRoomKind!,$members:[ID!]!,$message:String,$title:String,$description:String,$photoRef:ImageRefInput,$organizationId:ID,$channel:Boolean!,$price:Int,$interval:WalletSubscriptionInterval){room:betaRoomCreate(kind:$kind,members:$members,message:$message,title:$title,description:$description,photoRef:$photoRef,organizationId:$organizationId,channel:$channel,price:$price,interval:$interval){__typename id}}",
                    selector: p(_("betaRoomCreate", "room", c(u("kind", l("kind")), u("members", l("members")), u("message", l("message")), u("title", l("title")), u("description", l("description")), u("photoRef", l("photoRef")), u("organizationId", l("organizationId")), u("channel", l("channel")), u("price", l("price")), u("interval", l("interval"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID")))))))
                },
                RoomDelete: {
                    kind: "mutation",
                    name: "RoomDelete",
                    body: "mutation RoomDelete($chatId:ID!){deleteChat(chatId:$chatId)}",
                    selector: p(_("deleteChat", "deleteChat", c(u("chatId", l("chatId"))), m(s("Boolean"))))
                },
                RoomDeleteMessage: {
                    kind: "mutation",
                    name: "RoomDeleteMessage",
                    body: "mutation RoomDeleteMessage($messageId:ID!){betaMessageDelete(mid:$messageId)}",
                    selector: p(_("betaMessageDelete", "betaMessageDelete", c(u("mid", l("messageId"))), m(s("Boolean"))))
                },
                RoomDeleteMessages: {
                    kind: "mutation",
                    name: "RoomDeleteMessages",
                    body: "mutation RoomDeleteMessages($mids:[ID!]!){betaMessageDelete(mids:$mids)}",
                    selector: p(_("betaMessageDelete", "betaMessageDelete", c(u("mids", l("mids"))), m(s("Boolean"))))
                },
                RoomDeleteUrlAugmentation: {
                    kind: "mutation",
                    name: "RoomDeleteUrlAugmentation",
                    body: "mutation RoomDeleteUrlAugmentation($messageId:ID!){betaMessageDeleteAugmentation(mid:$messageId)}",
                    selector: p(_("betaMessageDeleteAugmentation", "betaMessageDeleteAugmentation", c(u("mid", l("messageId"))), m(s("Boolean"))))
                },
                RoomJoin: {
                    kind: "mutation",
                    name: "RoomJoin",
                    body: "mutation RoomJoin($roomId:ID!){join:betaRoomJoin(roomId:$roomId){__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}",
                    selector: p(_("betaRoomJoin", "join", c(u("roomId", l("roomId"))), m(p(_("__typename", "__typename", c(), m(s("String"))), d("PrivateRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))))), d("SharedRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID")))))))))
                },
                RoomJoinInviteLink: {
                    kind: "mutation",
                    name: "RoomJoinInviteLink",
                    body: "mutation RoomJoinInviteLink($invite:String!){join:betaRoomInviteLinkJoin(invite:$invite){__typename ...RoomShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel isPremium title photo membership role canEdit canSendMessage membersCount canUnpinMessage pinnedMessage{__typename ...FullMessage}organization{__typename ...OrganizationShort}settings{__typename id mute}myBadge{__typename ...UserBadge}owner{__typename id firstName isYou}repliesEnabled}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id user{__typename id}}... on SharedRoom{__typename id title isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname inContacts primaryOrganization{__typename id name shortname}}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageReactionCounter on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}",
                    selector: p(_("betaRoomInviteLinkJoin", "join", c(u("invite", l("invite"))), m(p(_("__typename", "__typename", c(), m(s("String"))), y("Room", z)))))
                },
                RoomKick: {
                    kind: "mutation",
                    name: "RoomKick",
                    body: "mutation RoomKick($roomId:ID!,$userId:ID!){betaRoomKick(roomId:$roomId,userId:$userId){__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}",
                    selector: p(_("betaRoomKick", "betaRoomKick", c(u("roomId", l("roomId")), u("userId", l("userId"))), m(p(_("__typename", "__typename", c(), m(s("String"))), d("PrivateRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))))), d("SharedRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID")))))))))
                },
                RoomLeave: {
                    kind: "mutation",
                    name: "RoomLeave",
                    body: "mutation RoomLeave($roomId:ID!){betaRoomLeave(roomId:$roomId){__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}",
                    selector: p(_("betaRoomLeave", "betaRoomLeave", c(u("roomId", l("roomId"))), m(p(_("__typename", "__typename", c(), m(s("String"))), d("PrivateRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))))), d("SharedRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID")))))))))
                },
                RoomRead: {
                    kind: "mutation",
                    name: "RoomRead",
                    body: "mutation RoomRead($id:ID!,$mid:ID!){roomRead(id:$id,mid:$mid)}",
                    selector: p(_("roomRead", "roomRead", c(u("id", l("id")), u("mid", l("mid"))), m(s("Boolean"))))
                },
                RoomRenewInviteLink: {
                    kind: "mutation",
                    name: "RoomRenewInviteLink",
                    body: "mutation RoomRenewInviteLink($roomId:ID!){link:betaRoomInviteLinkRenew(roomId:$roomId)}",
                    selector: p(_("betaRoomInviteLinkRenew", "link", c(u("roomId", l("roomId"))), m(s("String"))))
                },
                RoomSettingsUpdate: {
                    kind: "mutation",
                    name: "RoomSettingsUpdate",
                    body: "mutation RoomSettingsUpdate($settings:RoomUserNotificaionSettingsInput!,$roomId:ID!){betaRoomUpdateUserNotificationSettings(settings:$settings,roomId:$roomId){__typename id mute}}",
                    selector: p(_("betaRoomUpdateUserNotificationSettings", "betaRoomUpdateUserNotificationSettings", c(u("settings", l("settings")), u("roomId", l("roomId"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("mute", "mute", c(), s("Boolean"))))))
                },
                RoomUpdate: {
                    kind: "mutation",
                    name: "RoomUpdate",
                    body: "mutation RoomUpdate($roomId:ID!,$input:RoomUpdateInput!){betaRoomUpdate(roomId:$roomId,input:$input){__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id title photo description socialImage repliesEnabled}}}",
                    selector: p(_("betaRoomUpdate", "betaRoomUpdate", c(u("roomId", l("roomId")), u("input", l("input"))), m(p(_("__typename", "__typename", c(), m(s("String"))), d("PrivateRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))))), d("SharedRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("title", "title", c(), m(s("String"))), _("photo", "photo", c(), m(s("String"))), _("description", "description", c(), s("String")), _("socialImage", "socialImage", c(), s("String")), _("repliesEnabled", "repliesEnabled", c(), m(s("Boolean")))))))))
                },
                RoomsInviteUser: {
                    kind: "mutation",
                    name: "RoomsInviteUser",
                    body: "mutation RoomsInviteUser($userId:ID!,$roomIds:[ID!]!){rooms:betaRoomsInviteUser(userId:$userId,roomIds:$roomIds){__typename ...RoomShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel isPremium title photo membership role canEdit canSendMessage membersCount canUnpinMessage pinnedMessage{__typename ...FullMessage}organization{__typename ...OrganizationShort}settings{__typename id mute}myBadge{__typename ...UserBadge}owner{__typename id firstName isYou}repliesEnabled}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id user{__typename id}}... on SharedRoom{__typename id title isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname inContacts primaryOrganization{__typename id name shortname}}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageReactionCounter on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}",
                    selector: p(_("betaRoomsInviteUser", "rooms", c(u("userId", l("userId")), u("roomIds", l("roomIds"))), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("Room", z)))))))
                },
                RoomsJoin: {
                    kind: "mutation",
                    name: "RoomsJoin",
                    body: "mutation RoomsJoin($roomsIds:[ID!]!){join:betaRoomsJoin(roomsIds:$roomsIds){__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}}",
                    selector: p(_("betaRoomsJoin", "join", c(u("roomsIds", l("roomsIds"))), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), d("PrivateRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))))), d("SharedRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID")))))))))))
                },
                SendDonation: {
                    kind: "mutation",
                    name: "SendDonation",
                    body: "mutation SendDonation($amount:Int!,$chatId:ID,$userId:ID,$message:String,$repeatKey:String){sendDonation(chatId:$chatId,userId:$userId,amount:$amount,message:$message,repeatKey:$repeatKey)}",
                    selector: p(_("sendDonation", "sendDonation", c(u("chatId", l("chatId")), u("userId", l("userId")), u("amount", l("amount")), u("message", l("message")), u("repeatKey", l("repeatKey"))), m(s("Boolean"))))
                },
                SendEmailPairCode: {
                    kind: "mutation",
                    name: "SendEmailPairCode",
                    body: "mutation SendEmailPairCode($email:String!){sendEmailPairCode(email:$email)}",
                    selector: p(_("sendEmailPairCode", "sendEmailPairCode", c(u("email", l("email"))), m(s("String"))))
                },
                SendMessage: {
                    kind: "mutation",
                    name: "SendMessage",
                    body: "mutation SendMessage($chatId:ID!,$message:String,$replyMessages:[ID!],$mentions:[MentionInput!],$fileAttachments:[FileAttachmentInput!],$spans:[MessageSpanInput!],$repeatKey:String){sentMessage:sendMessage(chatId:$chatId,message:$message,replyMessages:$replyMessages,mentions:$mentions,fileAttachments:$fileAttachments,spans:$spans,repeatKey:$repeatKey)}",
                    selector: p(_("sendMessage", "sentMessage", c(u("chatId", l("chatId")), u("message", l("message")), u("replyMessages", l("replyMessages")), u("mentions", l("mentions")), u("fileAttachments", l("fileAttachments")), u("spans", l("spans")), u("repeatKey", l("repeatKey"))), m(s("Boolean"))))
                },
                SendPhonePairCode: {
                    kind: "mutation",
                    name: "SendPhonePairCode",
                    body: "mutation SendPhonePairCode($phone:String!){sendPhonePairCode(phone:$phone)}",
                    selector: p(_("sendPhonePairCode", "sendPhonePairCode", c(u("phone", l("phone"))), m(s("String"))))
                },
                SendSticker: {
                    kind: "mutation",
                    name: "SendSticker",
                    body: "mutation SendSticker($chatId:ID!,$stickerId:ID!,$replyMessages:[ID!],$repeatKey:String){sendSticker(chatId:$chatId,stickerId:$stickerId,replyMessages:$replyMessages,repeatKey:$repeatKey)}",
                    selector: p(_("sendSticker", "sendSticker", c(u("chatId", l("chatId")), u("stickerId", l("stickerId")), u("replyMessages", l("replyMessages")), u("repeatKey", l("repeatKey"))), m(s("Boolean"))))
                },
                SetFeedChannelShortname: {
                    kind: "mutation",
                    name: "SetFeedChannelShortname",
                    body: "mutation SetFeedChannelShortname($id:ID!,$shortname:String!){alphaSetFeedChannelShortName(id:$id,shortname:$shortname)}",
                    selector: p(_("alphaSetFeedChannelShortName", "alphaSetFeedChannelShortName", c(u("id", l("id")), u("shortname", l("shortname"))), s("String")))
                },
                SetOrgShortname: {
                    kind: "mutation",
                    name: "SetOrgShortname",
                    body: "mutation SetOrgShortname($organizationId:ID!,$shortname:String!){alphaSetOrgShortName(id:$organizationId,shortname:$shortname)}",
                    selector: p(_("alphaSetOrgShortName", "alphaSetOrgShortName", c(u("id", l("organizationId")), u("shortname", l("shortname"))), s("String")))
                },
                SetRoomShortname: {
                    kind: "mutation",
                    name: "SetRoomShortname",
                    body: "mutation SetRoomShortname($id:ID!,$shortname:String!){alphaSetRoomShortName(id:$id,shortname:$shortname)}",
                    selector: p(_("alphaSetRoomShortName", "alphaSetRoomShortName", c(u("id", l("id")), u("shortname", l("shortname"))), s("String")))
                },
                SetTyping: {
                    kind: "mutation",
                    name: "SetTyping",
                    body: "mutation SetTyping($conversationId:ID!,$type:TypingType!){typingSend(conversationId:$conversationId,type:$type)}",
                    selector: p(_("typingSend", "typingSend", c(u("conversationId", l("conversationId")), u("type", l("type"))), m(s("String"))))
                },
                SetUserShortname: {
                    kind: "mutation",
                    name: "SetUserShortname",
                    body: "mutation SetUserShortname($shortname:String!){alphaSetUserShortName(shortname:$shortname)}",
                    selector: p(_("alphaSetUserShortName", "alphaSetUserShortName", c(u("shortname", l("shortname"))), s("String")))
                },
                SettingsUpdate: {
                    kind: "mutation",
                    name: "SettingsUpdate",
                    body: "mutation SettingsUpdate($input:UpdateSettingsInput){updateSettings(settings:$input){__typename ...SettingsFull}}fragment SettingsFull on Settings{__typename id primaryEmail emailFrequency excludeMutedChats countUnreadChats whoCanSeeEmail whoCanSeePhone desktop{__typename ...PlatformNotificationSettingsFull}mobile{__typename ...PlatformNotificationSettingsFull}}fragment PlatformNotificationSettingsFull on PlatformNotificationSettings{__typename direct{__typename showNotification sound}secretChat{__typename showNotification sound}organizationChat{__typename showNotification sound}communityChat{__typename showNotification sound}comments{__typename showNotification sound}notificationPreview}",
                    selector: p(_("updateSettings", "updateSettings", c(u("settings", l("input"))), m(p(_("__typename", "__typename", c(), m(s("String"))), y("Settings", oe)))))
                },
                StickerPackAddToCollection: {
                    kind: "mutation",
                    name: "StickerPackAddToCollection",
                    body: "mutation StickerPackAddToCollection($id:ID!){stickerPackAddToCollection:stickerPackAddToCollection(id:$id)}",
                    selector: p(_("stickerPackAddToCollection", "stickerPackAddToCollection", c(u("id", l("id"))), m(s("Boolean"))))
                },
                StickerPackRemoveFromCollection: {
                    kind: "mutation",
                    name: "StickerPackRemoveFromCollection",
                    body: "mutation StickerPackRemoveFromCollection($id:ID!){stickerPackRemoveFromCollection:stickerPackRemoveFromCollection(id:$id)}",
                    selector: p(_("stickerPackRemoveFromCollection", "stickerPackRemoveFromCollection", c(u("id", l("id"))), m(s("Boolean"))))
                },
                SubscribeToComments: {
                    kind: "mutation",
                    name: "SubscribeToComments",
                    body: "mutation SubscribeToComments($peerId:ID!,$type:CommentSubscriptionType!){subscribeToComments(peerId:$peerId,type:$type)}",
                    selector: p(_("subscribeToComments", "subscribeToComments", c(u("peerId", l("peerId")), u("type", l("type"))), m(s("Boolean"))))
                },
                SuperAccountActivate: {
                    kind: "mutation",
                    name: "SuperAccountActivate",
                    body: "mutation SuperAccountActivate($accountId:ID!){superAccountActivate(id:$accountId){__typename id state}}",
                    selector: p(_("superAccountActivate", "superAccountActivate", c(u("id", l("accountId"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("state", "state", c(), m(s("String")))))))
                },
                SuperAccountAdd: {
                    kind: "mutation",
                    name: "SuperAccountAdd",
                    body: "mutation SuperAccountAdd($title:String!){superAccountAdd(title:$title){__typename id}}",
                    selector: p(_("superAccountAdd", "superAccountAdd", c(u("title", l("title"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID")))))))
                },
                SuperAccountMemberAdd: {
                    kind: "mutation",
                    name: "SuperAccountMemberAdd",
                    body: "mutation SuperAccountMemberAdd($accountId:ID!,$userId:ID!){superAccountMemberAdd(id:$accountId,userId:$userId){__typename id members{__typename ...UserShort}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}",
                    selector: p(_("superAccountMemberAdd", "superAccountMemberAdd", c(u("id", l("accountId")), u("userId", l("userId"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("members", "members", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("User", U))))))))))
                },
                SuperAccountMemberRemove: {
                    kind: "mutation",
                    name: "SuperAccountMemberRemove",
                    body: "mutation SuperAccountMemberRemove($accountId:ID!,$userId:ID!){superAccountMemberRemove(id:$accountId,userId:$userId){__typename id members{__typename ...UserShort}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}",
                    selector: p(_("superAccountMemberRemove", "superAccountMemberRemove", c(u("id", l("accountId")), u("userId", l("userId"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("members", "members", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("User", U))))))))))
                },
                SuperAccountPend: {
                    kind: "mutation",
                    name: "SuperAccountPend",
                    body: "mutation SuperAccountPend($accountId:ID!){superAccountPend(id:$accountId){__typename id state}}",
                    selector: p(_("superAccountPend", "superAccountPend", c(u("id", l("accountId"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("state", "state", c(), m(s("String")))))))
                },
                SuperAccountRename: {
                    kind: "mutation",
                    name: "SuperAccountRename",
                    body: "mutation SuperAccountRename($accountId:ID!,$title:String!){superAccountRename(id:$accountId,title:$title){__typename id title}}",
                    selector: p(_("superAccountRename", "superAccountRename", c(u("id", l("accountId")), u("title", l("title"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("title", "title", c(), m(s("String")))))))
                },
                SuperAccountSuspend: {
                    kind: "mutation",
                    name: "SuperAccountSuspend",
                    body: "mutation SuperAccountSuspend($accountId:ID!){superAccountSuspend(id:$accountId){__typename id state}}",
                    selector: p(_("superAccountSuspend", "superAccountSuspend", c(u("id", l("accountId"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("state", "state", c(), m(s("String")))))))
                },
                SuperAdminAdd: {
                    kind: "mutation",
                    name: "SuperAdminAdd",
                    body: "mutation SuperAdminAdd($userId:ID!,$role:SuperAdminRole!){superAdminAdd(userId:$userId,role:$role)}",
                    selector: p(_("superAdminAdd", "superAdminAdd", c(u("userId", l("userId")), u("role", l("role"))), m(s("String"))))
                },
                SuperAdminRemove: {
                    kind: "mutation",
                    name: "SuperAdminRemove",
                    body: "mutation SuperAdminRemove($userId:ID!){superAdminRemove(userId:$userId)}",
                    selector: p(_("superAdminRemove", "superAdminRemove", c(u("userId", l("userId"))), m(s("String"))))
                },
                SuperBadgeCreateToRoom: {
                    kind: "mutation",
                    name: "SuperBadgeCreateToRoom",
                    body: "mutation SuperBadgeCreateToRoom($roomId:ID!,$userId:ID!,$name:String!){superBadgeCreateToRoom(roomId:$roomId,userId:$userId,name:$name){__typename ...UserBadge}}fragment UserBadge on UserBadge{__typename id name verified}",
                    selector: p(_("superBadgeCreateToRoom", "superBadgeCreateToRoom", c(u("roomId", l("roomId")), u("userId", l("userId")), u("name", l("name"))), m(p(_("__typename", "__typename", c(), m(s("String"))), y("UserBadge", C)))))
                },
                SuperBadgeUnsetToRoom: {
                    kind: "mutation",
                    name: "SuperBadgeUnsetToRoom",
                    body: "mutation SuperBadgeUnsetToRoom($roomId:ID!,$userId:ID!,$badgeId:ID!){superBadgeUnsetToRoom(roomId:$roomId,userId:$userId,badgeId:$badgeId)}",
                    selector: p(_("superBadgeUnsetToRoom", "superBadgeUnsetToRoom", c(u("roomId", l("roomId")), u("userId", l("userId")), u("badgeId", l("badgeId"))), m(s("Boolean"))))
                },
                UnSubscribeFromComments: {
                    kind: "mutation",
                    name: "UnSubscribeFromComments",
                    body: "mutation UnSubscribeFromComments($peerId:ID!){unsubscribeFromComments(peerId:$peerId)}",
                    selector: p(_("unsubscribeFromComments", "unsubscribeFromComments", c(u("peerId", l("peerId"))), m(s("Boolean"))))
                },
                UnpinMessage: {
                    kind: "mutation",
                    name: "UnpinMessage",
                    body: "mutation UnpinMessage($chatId:ID!){unpinMessage:gammaUnpinMessage(chatId:$chatId){__typename ...RoomShort}}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel isPremium title photo membership role canEdit canSendMessage membersCount canUnpinMessage pinnedMessage{__typename ...FullMessage}organization{__typename ...OrganizationShort}settings{__typename id mute}myBadge{__typename ...UserBadge}owner{__typename id firstName isYou}repliesEnabled}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id user{__typename id}}... on SharedRoom{__typename id title isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname inContacts primaryOrganization{__typename id name shortname}}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageReactionCounter on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}",
                    selector: p(_("gammaUnpinMessage", "unpinMessage", c(u("chatId", l("chatId"))), m(p(_("__typename", "__typename", c(), m(s("String"))), y("Room", z)))))
                },
                UnsetTyping: {
                    kind: "mutation",
                    name: "UnsetTyping",
                    body: "mutation UnsetTyping($conversationId:ID!){typingCancel(conversationId:$conversationId)}",
                    selector: p(_("typingCancel", "typingCancel", c(u("conversationId", l("conversationId"))), m(s("String"))))
                },
                UpdateApp: {
                    kind: "mutation",
                    name: "UpdateApp",
                    body: "mutation UpdateApp($appId:ID!,$input:AppProfileInput!){updateAppProfile(appId:$appId,input:$input){__typename ...AppFull}}fragment AppFull on AppProfile{__typename id name shortname photoRef{__typename uuid crop{__typename x y w h}}about token{__typename salt}}",
                    selector: p(_("updateAppProfile", "updateAppProfile", c(u("appId", l("appId")), u("input", l("input"))), m(p(_("__typename", "__typename", c(), m(s("String"))), y("AppProfile", I)))))
                },
                UpdateOrganization: {
                    kind: "mutation",
                    name: "UpdateOrganization",
                    body: "mutation UpdateOrganization($input:UpdateOrganizationProfileInput!,$organizationId:ID){updateOrganizationProfile(input:$input,id:$organizationId){__typename id}}",
                    selector: p(_("updateOrganizationProfile", "updateOrganizationProfile", c(u("input", l("input")), u("id", l("organizationId"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID")))))))
                },
                UpdateWelcomeMessage: {
                    kind: "mutation",
                    name: "UpdateWelcomeMessage",
                    body: "mutation UpdateWelcomeMessage($roomId:ID!,$welcomeMessageIsOn:Boolean!,$welcomeMessageSender:ID,$welcomeMessageText:String){updateWelcomeMessage(roomId:$roomId,welcomeMessageIsOn:$welcomeMessageIsOn,welcomeMessageSender:$welcomeMessageSender,welcomeMessageText:$welcomeMessageText)}",
                    selector: p(_("updateWelcomeMessage", "updateWelcomeMessage", c(u("roomId", l("roomId")), u("welcomeMessageIsOn", l("welcomeMessageIsOn")), u("welcomeMessageSender", l("welcomeMessageSender")), u("welcomeMessageText", l("welcomeMessageText"))), m(s("Boolean"))))
                },
                UserStorageSet: {
                    kind: "mutation",
                    name: "UserStorageSet",
                    body: "mutation UserStorageSet($namespace:String!,$data:[AppStorageValueInput!]!){userStorageSet(namespace:$namespace,data:$data){__typename id key value}}",
                    selector: p(_("userStorageSet", "userStorageSet", c(u("namespace", l("namespace")), u("data", l("data"))), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("key", "key", c(), m(s("String"))), _("value", "value", c(), s("String"))))))))
                },
                conferenceAddScreenShare: {
                    kind: "mutation",
                    name: "conferenceAddScreenShare",
                    body: "mutation conferenceAddScreenShare($id:ID!){conferenceAddScreenShare(id:$id){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename id startTime iceServers{__typename urls username credential}}",
                    selector: p(_("conferenceAddScreenShare", "conferenceAddScreenShare", c(u("id", l("id"))), m(p(_("__typename", "__typename", c(), m(s("String"))), y("Conference", F)))))
                },
                conferenceAlterMediaState: {
                    kind: "mutation",
                    name: "conferenceAlterMediaState",
                    body: "mutation conferenceAlterMediaState($id:ID!,$state:MediaStreamMediaStateInput!){conferenceAlterMediaState(id:$id,state:$state){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename id startTime iceServers{__typename urls username credential}}",
                    selector: p(_("conferenceAlterMediaState", "conferenceAlterMediaState", c(u("id", l("id")), u("state", l("state"))), m(p(_("__typename", "__typename", c(), m(s("String"))), y("Conference", F)))))
                },
                conferenceRemoveScreenShare: {
                    kind: "mutation",
                    name: "conferenceRemoveScreenShare",
                    body: "mutation conferenceRemoveScreenShare($id:ID!){conferenceRemoveScreenShare(id:$id){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename id startTime iceServers{__typename urls username credential}}",
                    selector: p(_("conferenceRemoveScreenShare", "conferenceRemoveScreenShare", c(u("id", l("id"))), m(p(_("__typename", "__typename", c(), m(s("String"))), y("Conference", F)))))
                },
                conferenceRequestLocalMediaChange: {
                    kind: "mutation",
                    name: "conferenceRequestLocalMediaChange",
                    body: "mutation conferenceRequestLocalMediaChange($id:ID!,$media:LocalMediaInput!){conferenceRequestLocalMediaChange(id:$id,media:$media){__typename ...ConferenceShort}}fragment ConferenceShort on Conference{__typename id startTime iceServers{__typename urls username credential}}",
                    selector: p(_("conferenceRequestLocalMediaChange", "conferenceRequestLocalMediaChange", c(u("id", l("id")), u("media", l("media"))), m(p(_("__typename", "__typename", c(), m(s("String"))), y("Conference", F)))))
                },
                ChatOnlinesCountWatch: {
                    kind: "subscription",
                    name: "ChatOnlinesCountWatch",
                    body: "subscription ChatOnlinesCountWatch($chatId:ID!){chatOnlinesCount(chatId:$chatId){__typename onlineMembers}}",
                    selector: p(_("chatOnlinesCount", "chatOnlinesCount", c(u("chatId", l("chatId"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("onlineMembers", "onlineMembers", c(), m(s("Int")))))))
                },
                ChatWatch: {
                    kind: "subscription",
                    name: "ChatWatch",
                    body: "subscription ChatWatch($chatId:ID!,$state:String){event:chatUpdates(chatId:$chatId,fromState:$state){__typename ... on ChatUpdateSingle{__typename seq state update{__typename ...ChatUpdateFragment}}... on ChatUpdateBatch{__typename fromSeq seq state updates{__typename ...ChatUpdateFragment}}}}fragment ChatUpdateFragment on ChatUpdate{__typename ... on ChatMessageReceived{__typename message{__typename ...FullMessage}repeatKey}... on ChatMessageUpdated{__typename message{__typename ...FullMessage}}... on ChatMessageDeleted{__typename message{__typename id}}... on ChatUpdated{__typename chat{__typename ...RoomShort}}... on ChatLostAccess{__typename lostAccess}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id user{__typename id}}... on SharedRoom{__typename id title isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname inContacts primaryOrganization{__typename id name shortname}}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageReactionCounter on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}fragment RoomShort on Room{__typename ... on PrivateRoom{__typename id user{__typename ...UserShort}settings{__typename id mute}pinnedMessage{__typename ...FullMessage}myBadge{__typename ...UserBadge}}... on SharedRoom{__typename id kind isChannel isPremium title photo membership role canEdit canSendMessage membersCount canUnpinMessage pinnedMessage{__typename ...FullMessage}organization{__typename ...OrganizationShort}settings{__typename id mute}myBadge{__typename ...UserBadge}owner{__typename id firstName isYou}repliesEnabled}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}",
                    selector: p(_("chatUpdates", "event", c(u("chatId", l("chatId")), u("fromState", l("state"))), m(p(_("__typename", "__typename", c(), m(s("String"))), d("ChatUpdateSingle", p(_("__typename", "__typename", c(), m(s("String"))), _("seq", "seq", c(), m(s("Int"))), _("state", "state", c(), m(s("String"))), _("update", "update", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("ChatUpdate", O)))))), d("ChatUpdateBatch", p(_("__typename", "__typename", c(), m(s("String"))), _("fromSeq", "fromSeq", c(), m(s("Int"))), _("seq", "seq", c(), m(s("Int"))), _("state", "state", c(), m(s("String"))), _("updates", "updates", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("ChatUpdate", O))))))))))))
                },
                CommentWatch: {
                    kind: "subscription",
                    name: "CommentWatch",
                    body: "subscription CommentWatch($peerId:ID!,$fromState:String){event:commentUpdates(peerId:$peerId,fromState:$fromState){__typename ... on CommentUpdateSingle{__typename seq state update{__typename ...CommentUpdateFragment}}... on CommentUpdateBatch{__typename fromSeq seq state updates{__typename ...CommentUpdateFragment}}}}fragment CommentUpdateFragment on CommentUpdate{__typename ... on CommentReceived{__typename comment{__typename ...CommentEntryFragment}}... on CommentUpdated{__typename comment{__typename ...CommentEntryFragment}}}fragment CommentEntryFragment on CommentEntry{__typename id deleted comment:betaComment{__typename ...FullMessage}parentComment{__typename id comment:betaComment{__typename id message}}childComments{__typename id}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id user{__typename id}}... on SharedRoom{__typename id title isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname inContacts primaryOrganization{__typename id name shortname}}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageReactionCounter on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}",
                    selector: p(_("commentUpdates", "event", c(u("peerId", l("peerId")), u("fromState", l("fromState"))), p(_("__typename", "__typename", c(), m(s("String"))), d("CommentUpdateSingle", p(_("__typename", "__typename", c(), m(s("String"))), _("seq", "seq", c(), m(s("Int"))), _("state", "state", c(), m(s("String"))), _("update", "update", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("CommentUpdate", T)))))), d("CommentUpdateBatch", p(_("__typename", "__typename", c(), m(s("String"))), _("fromSeq", "fromSeq", c(), m(s("Int"))), _("seq", "seq", c(), m(s("Int"))), _("state", "state", c(), m(s("String"))), _("updates", "updates", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("CommentUpdate", T)))))))))))
                },
                ConferenceMediaWatch: {
                    kind: "subscription",
                    name: "ConferenceMediaWatch",
                    body: "subscription ConferenceMediaWatch($id:ID!,$peerId:ID!){media:alphaConferenceMediaWatch(id:$id,peerId:$peerId){__typename id streams{__typename ...MediaStreamFull}localMedia{__typename sendVideo sendAudio sendScreencast}}}fragment MediaStreamFull on MediaStream{__typename id seq state sdp ice iceTransportPolicy receivers{__typename peerId kind videoSource mid}senders{__typename kind videoSource codecParams mid}}",
                    selector: p(_("alphaConferenceMediaWatch", "media", c(u("id", l("id")), u("peerId", l("peerId"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("streams", "streams", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("MediaStream", K)))))), _("localMedia", "localMedia", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("sendVideo", "sendVideo", c(), m(s("Boolean"))), _("sendAudio", "sendAudio", c(), m(s("Boolean"))), _("sendScreencast", "sendScreencast", c(), m(s("Boolean"))))))))))
                },
                ConferenceWatch: {
                    kind: "subscription",
                    name: "ConferenceWatch",
                    body: "subscription ConferenceWatch($id:ID!){alphaConferenceWatch(id:$id){__typename ...ConferenceFull}}fragment ConferenceFull on Conference{__typename id startTime peers{__typename id user{__typename ...UserShort}mediaState{__typename audioPaused videoPaused screencastEnabled}}iceServers{__typename urls username credential}room{__typename ... on SharedRoom{__typename id title isChannel membersCount photo owner{__typename id name}}... on PrivateRoom{__typename id user{__typename id name photo}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}",
                    selector: p(_("alphaConferenceWatch", "alphaConferenceWatch", c(u("id", l("id"))), m(p(_("__typename", "__typename", c(), m(s("String"))), y("Conference", x)))))
                },
                DebugEventsWatch: {
                    kind: "subscription",
                    name: "DebugEventsWatch",
                    body: "subscription DebugEventsWatch($fromState:String,$eventsCount:Int!,$randomDelays:Boolean!,$seed:String!){debugEvents(fromState:$fromState,eventsCount:$eventsCount,randomDelays:$randomDelays,seed:$seed){__typename seq key}}",
                    selector: p(_("debugEvents", "debugEvents", c(u("fromState", l("fromState")), u("eventsCount", l("eventsCount")), u("randomDelays", l("randomDelays")), u("seed", l("seed"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("seq", "seq", c(), m(s("Int"))), _("key", "key", c(), m(s("String")))))))
                },
                DialogsWatch: {
                    kind: "subscription",
                    name: "DialogsWatch",
                    body: "subscription DialogsWatch($state:String){event:dialogsUpdates(fromState:$state){__typename ... on DialogUpdateSingle{__typename state update{__typename ...DialogUpdateFragment}}... on DialogUpdateBatch{__typename state updates{__typename ...DialogUpdateFragment}}}}fragment DialogUpdateFragment on DialogUpdate{__typename ... on DialogMessageReceived{__typename cid unread globalUnread message:alphaMessage{__typename ...DialogMessage ... on ServiceMessage{__typename id serviceMetadata{__typename}}}haveMention silent{__typename mobile desktop}showNotification{__typename mobile desktop}membership}... on DialogMessageUpdated{__typename cid message:alphaMessage{__typename ...DialogMessage}haveMention}... on DialogMessageDeleted{__typename cid message:alphaMessage{__typename ...DialogMessage}prevMessage:alphaPrevMessage{__typename ...DialogMessage}unread globalUnread haveMention}... on DialogMessageRead{__typename cid mid unread globalUnread haveMention}... on DialogMuteChanged{__typename cid mute}... on DialogPeerUpdated{__typename cid peer{__typename ... on PrivateRoom{__typename id user{__typename id name photo}}... on SharedRoom{__typename id title photo}}}... on DialogDeleted{__typename cid globalUnread}... on DialogBump{__typename cid globalUnread unread topMessage{__typename ...DialogMessage ... on ServiceMessage{__typename id serviceMetadata{__typename}}}haveMention membership}... on DialogCallStateChanged{__typename cid hasActiveCall}}fragment DialogMessage on ModernMessage{__typename id date sender{__typename id name photo firstName}message fallback ... on GeneralMessage{__typename id quotedMessages{__typename id}}}",
                    selector: p(_("dialogsUpdates", "event", c(u("fromState", l("state"))), m(p(_("__typename", "__typename", c(), m(s("String"))), d("DialogUpdateSingle", p(_("__typename", "__typename", c(), m(s("String"))), _("state", "state", c(), m(s("String"))), _("update", "update", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("DialogUpdate", E)))))), d("DialogUpdateBatch", p(_("__typename", "__typename", c(), m(s("String"))), _("state", "state", c(), m(s("String"))), _("updates", "updates", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("DialogUpdate", E))))))))))))
                },
                GlobalEventBus: {
                    kind: "subscription",
                    name: "GlobalEventBus",
                    body: "subscription GlobalEventBus($topic:String!){globalEventBus(topic:$topic){__typename message}}",
                    selector: p(_("globalEventBus", "globalEventBus", c(u("topic", l("topic"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("message", "message", c(), m(s("String")))))))
                },
                MyContactsUpdates: {
                    kind: "subscription",
                    name: "MyContactsUpdates",
                    body: "subscription MyContactsUpdates($state:String!){myContactsUpdates(fromState:$state){__typename updates{__typename ... on ContactRemoved{__typename contact{__typename id user{__typename ...UserShort}}}... on ContactAdded{__typename contact{__typename id user{__typename ...UserShort}}}}state}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}",
                    selector: p(_("myContactsUpdates", "myContactsUpdates", c(u("fromState", l("state"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("updates", "updates", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), d("ContactRemoved", p(_("__typename", "__typename", c(), m(s("String"))), _("contact", "contact", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("user", "user", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("User", U))))))))), d("ContactAdded", p(_("__typename", "__typename", c(), m(s("String"))), _("contact", "contact", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("user", "user", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("User", U)))))))))))))), _("state", "state", c(), m(s("String")))))))
                },
                MyNotificationsCenter: {
                    kind: "subscription",
                    name: "MyNotificationsCenter",
                    body: "subscription MyNotificationsCenter($state:String){event:notificationCenterUpdates(fromState:$state){__typename ... on NotificationCenterUpdateSingle{__typename seq state update{__typename ...NotificationCenterUpdateFragment}}... on NotificationCenterUpdateBatch{__typename fromSeq seq state updates{__typename ...NotificationCenterUpdateFragment}}}}fragment NotificationCenterUpdateFragment on NotificationCenterUpdate{__typename ... on NotificationReceived{__typename center{__typename id unread}notification{__typename ...NotificationFragment}}... on NotificationUpdated{__typename center{__typename id unread}notification{__typename ...NotificationFragment}}... on NotificationDeleted{__typename center{__typename id unread}notification{__typename id}}... on NotificationRead{__typename center{__typename id unread}}... on NotificationContentUpdated{__typename content{__typename ... on UpdatedNotificationContentComment{__typename peer{__typename peerRoot{__typename ... on CommentPeerRootMessage{__typename message{__typename ... on GeneralMessage{__typename id fallback message sender{__typename id name}senderBadge{__typename ...UserBadge}}}chat{__typename ...RoomNano}}... on CommentPeerRootPost{__typename post{__typename id}}}id subscription{__typename type}}comment{__typename ...CommentEntryFragment}}}}}fragment NotificationFragment on Notification{__typename id text content{__typename ... on NewCommentNotification{__typename comment{__typename ...CommentEntryFragment}peer{__typename id peerRoot{__typename ... on CommentPeerRootMessage{__typename message{__typename ... on GeneralMessage{__typename id fallback message sender{__typename id name}senderBadge{__typename ...UserBadge}}}chat{__typename ...RoomNano}}... on CommentPeerRootPost{__typename post{__typename id}}}subscription{__typename type}}}}}fragment CommentEntryFragment on CommentEntry{__typename id deleted comment:betaComment{__typename ...FullMessage}parentComment{__typename id comment:betaComment{__typename id message}}childComments{__typename id}}fragment FullMessage on ModernMessage{__typename id date sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}message fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id user{__typename id}}... on SharedRoom{__typename id title isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}quotedMessages{__typename ...QuotedMessage}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on StickerMessage{__typename id commentsCount quotedMessages{__typename ...QuotedMessage}sticker{__typename ...StickerFragment}reactionCounters{__typename ...MessageReactionCounter}overrideAvatar{__typename uuid crop{__typename x y w h}}overrideName}... on ServiceMessage{__typename id serviceMetadata{__typename ...ServiceMessageMetadata}}}fragment MessageSender on User{__typename id name photo isBot shortname inContacts primaryOrganization{__typename id name shortname}}fragment UserBadge on UserBadge{__typename id name verified}fragment MessageSpan on MessageSpan{__typename offset length ... on MessageSpanUserMention{__typename user{__typename id name}}... on MessageSpanMultiUserMention{__typename offset length}... on MessageSpanOrganizationMention{__typename organization{__typename id name}}... on MessageSpanRoomMention{__typename room{__typename ... on PrivateRoom{__typename id user{__typename id name}}... on SharedRoom{__typename id title isPremium}}}... on MessageSpanLink{__typename url}... on MessageSpanDate{__typename date}}fragment MessageAttachments on ModernMessageAttachment{__typename fallback ... on MessageAttachmentFile{__typename id fileId fileMetadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}filePreview}... on MessageRichAttachment{__typename id title subTitle titleLink titleLinkHostname text icon{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}image{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}socialImage{__typename url metadata{__typename name mimeType size isImage imageWidth imageHeight imageFormat}}imageFallback{__typename photo text}keyboard{__typename buttons{__typename id title style url}}fallback}... on MessageAttachmentPurchase{__typename id purchase{__typename id state amount}fallback}}fragment QuotedMessage on ModernMessage{__typename id date message sender{__typename ...MessageSender}senderBadge{__typename ...UserBadge}fallback source{__typename ... on MessageSourceChat{__typename chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id isChannel membersCount}}}}spans{__typename ...MessageSpan}... on GeneralMessage{__typename id edited commentsCount attachments{__typename ...MessageAttachments}}... on StickerMessage{__typename id sticker{__typename ...StickerFragment}}}fragment StickerFragment on Sticker{__typename ... on ImageSticker{__typename id pack{__typename id title}image{__typename uuid}}}fragment MessageReactionCounter on ReactionCounter{__typename reaction count setByMe}fragment ServiceMessageMetadata on ServiceMetadata{__typename ... on InviteServiceMetadata{__typename users{__typename id}invitedBy{__typename id}}... on KickServiceMetadata{__typename user{__typename id}kickedBy{__typename id}}... on TitleChangeServiceMetadata{__typename title}... on PhotoChangeServiceMetadata{__typename photo}... on PostRespondServiceMetadata{__typename respondType}}fragment RoomNano on Room{__typename ... on PrivateRoom{__typename id user{__typename id name photo}settings{__typename id mute}}... on SharedRoom{__typename ...RoomSharedNano}}fragment RoomSharedNano on SharedRoom{__typename id kind isChannel isPremium title photo membersCount settings{__typename id mute}}",
                    selector: p(_("notificationCenterUpdates", "event", c(u("fromState", l("state"))), p(_("__typename", "__typename", c(), m(s("String"))), d("NotificationCenterUpdateSingle", p(_("__typename", "__typename", c(), m(s("String"))), _("seq", "seq", c(), m(s("Int"))), _("state", "state", c(), m(s("String"))), _("update", "update", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("NotificationCenterUpdate", X)))))), d("NotificationCenterUpdateBatch", p(_("__typename", "__typename", c(), m(s("String"))), _("fromSeq", "fromSeq", c(), m(s("Int"))), _("seq", "seq", c(), m(s("Int"))), _("state", "state", c(), m(s("String"))), _("updates", "updates", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("NotificationCenterUpdate", X)))))))))))
                },
                OnlineWatch: {
                    kind: "subscription",
                    name: "OnlineWatch",
                    body: "subscription OnlineWatch($users:[ID!]!){alphaSubscribeOnline(users:$users){__typename user{__typename id online lastSeen}timeout}}",
                    selector: p(_("alphaSubscribeOnline", "alphaSubscribeOnline", c(u("users", l("users"))), m(p(_("__typename", "__typename", c(), m(s("String"))), _("user", "user", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("online", "online", c(), m(s("Boolean"))), _("lastSeen", "lastSeen", c(), s("String"))))), _("timeout", "timeout", c(), m(s("Int")))))))
                },
                SettingsWatch: {
                    kind: "subscription",
                    name: "SettingsWatch",
                    body: "subscription SettingsWatch{watchSettings{__typename ...SettingsFull}}fragment SettingsFull on Settings{__typename id primaryEmail emailFrequency excludeMutedChats countUnreadChats whoCanSeeEmail whoCanSeePhone desktop{__typename ...PlatformNotificationSettingsFull}mobile{__typename ...PlatformNotificationSettingsFull}}fragment PlatformNotificationSettingsFull on PlatformNotificationSettings{__typename direct{__typename showNotification sound}secretChat{__typename showNotification sound}organizationChat{__typename showNotification sound}communityChat{__typename showNotification sound}comments{__typename showNotification sound}notificationPreview}",
                    selector: p(_("watchSettings", "watchSettings", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("Settings", oe)))))
                },
                TypingsWatch: {
                    kind: "subscription",
                    name: "TypingsWatch",
                    body: "subscription TypingsWatch{typings{__typename conversation:chat{__typename ... on PrivateRoom{__typename id}... on SharedRoom{__typename id}}user{__typename id photo firstName}cancel type}}",
                    selector: p(_("typings", "typings", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("chat", "conversation", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), d("PrivateRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))))), d("SharedRoom", p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID")))))))), _("user", "user", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), _("id", "id", c(), m(s("ID"))), _("photo", "photo", c(), s("String")), _("firstName", "firstName", c(), m(s("String")))))), _("cancel", "cancel", c(), m(s("Boolean"))), _("type", "type", c(), m(s("String")))))))
                },
                WalletUpdates: {
                    kind: "subscription",
                    name: "WalletUpdates",
                    body: "subscription WalletUpdates($state:String!){event:walletUpdates(fromState:$state){__typename ... on WalletUpdateSingle{__typename state update{__typename ...WalletUpdateFragment}}... on WalletUpdateBatch{__typename state updates{__typename ...WalletUpdateFragment}}}}fragment WalletUpdateFragment on WalletUpdate{__typename ... on WalletUpdateBalance{__typename amount}... on WalletUpdateLocked{__typename isLocked failingPaymentsCount}... on WalletUpdateTransactionSuccess{__typename transaction{__typename ...WalletTransactionFragment}}... on WalletUpdateTransactionCanceled{__typename transaction{__typename ...WalletTransactionFragment}}... on WalletUpdateTransactionPending{__typename transaction{__typename ...WalletTransactionFragment}}... on WalletUpdatePaymentStatus{__typename payment{__typename id status intent{__typename id clientSecret}card{__typename id brand last4}}}}fragment WalletTransactionFragment on WalletTransaction{__typename id status date operation{__typename ... on WalletTransactionDeposit{__typename amount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}}... on WalletTransactionIncome{__typename amount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}source{__typename ... on WalletSubscription{__typename id product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}... on WalletProductDonation{__typename user{__typename id name photo}}... on WalletProductDonationMessage{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}... on WalletProductDonationReaction{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}}}... on Purchase{__typename id user{__typename id name photo}product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}... on WalletProductDonation{__typename user{__typename id name photo}}... on WalletProductDonationMessage{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}... on WalletProductDonationReaction{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}}}}}... on WalletTransactionTransferIn{__typename amount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}fromUser{__typename ...UserShort}}... on WalletTransactionTransferOut{__typename amount walletAmount chargeAmount payment{__typename id status card{__typename id brand last4}intent{__typename id clientSecret}}toUser{__typename ...UserShort}}... on WalletTransactionSubscription{__typename amount walletAmount chargeAmount subscription{__typename id interval amount product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}... on WalletProductDonation{__typename user{__typename id name photo}}... on WalletProductDonationMessage{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}... on WalletProductDonationReaction{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}}}payment{__typename id status intent{__typename id clientSecret}card{__typename id brand last4}}}... on WalletTransactionPurchase{__typename amount walletAmount chargeAmount purchase{__typename id product{__typename ... on WalletProductGroup{__typename group{__typename id title photo}}... on WalletProductDonation{__typename user{__typename id name photo}}... on WalletProductDonationMessage{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}... on WalletProductDonationReaction{__typename user{__typename id name photo}chat{__typename ... on SharedRoom{__typename id title}}}}}payment{__typename id status intent{__typename id clientSecret}card{__typename id brand last4}}}}}fragment UserShort on User{__typename id name firstName lastName photo email online lastSeen isBot shortname inContacts primaryOrganization{__typename ...OrganizationShort}}fragment OrganizationShort on Organization{__typename id name photo shortname about isCommunity:alphaIsCommunity private:alphaIsPrivate membersCount isAdmin:betaIsAdmin membersCanInvite:betaMembersCanInvite}",
                    selector: p(_("walletUpdates", "event", c(u("fromState", l("state"))), m(p(_("__typename", "__typename", c(), m(s("String"))), d("WalletUpdateSingle", p(_("__typename", "__typename", c(), m(s("String"))), _("state", "state", c(), m(s("String"))), _("update", "update", c(), m(p(_("__typename", "__typename", c(), m(s("String"))), y("WalletUpdate", ce)))))), d("WalletUpdateBatch", p(_("__typename", "__typename", c(), m(s("String"))), _("state", "state", c(), m(s("String"))), _("updates", "updates", c(), m(o(m(p(_("__typename", "__typename", c(), m(s("String"))), y("WalletUpdate", ce))))))))))))
                }
            }
        },
            Mt = n("7pQk");

        Object(Mt.disableAll)();
        Object(Mt.disableTag)("GraphQL-Direct");
        var Ct = self;
        Ct.addEventListener("message", function e(t) {
            var n = t.data;

            if ("init" !== n.type) {
                (function (e) {
                    throw Error(e);
                })("Worker need to be inited first!");
            }

            Ct.removeEventListener("message", e);

            var a,
                o,
                m,
                s = {
                post: function (e) {
                    return Ct.postMessage(e);
                },
                setHandler: function (e) {
                    return Ct.addEventListener("message", function (t) {
                        return e(t.data);
                    });
                }
            },
                _ = new r.WebEngine(vt, {
                endpoint: n.endpoint,
                connectionParams: n.token && (a = {}, o = "x-openland-token", m = n.token, o in a ? i()(a, o, {
                    value: m,
                    enumerable: true,
                    configurable: true,
                    writable: true
                }) : a[o] = m, a),
                protocol: "openland"
            });

            new r.WorkerHost({
                engine: _,
                worker: s
            });
        });
        console.log("started");
    },
    "7G9G": function (e, t, n) {
        var a = n("ndpj"),
            i = n("pltR");

        e.exports = function (e, t, n) {
            var r = t && n || 0;

            if ("string" == typeof e) {
                t = "binary" === e ? new Array(16) : null;
                e = null;
            }

            var o = (e = e || {}).random || (e.rng || a)();
            o[6] = 15 & o[6] | 64;
            o[8] = 63 & o[8] | 128;

            if (t) {
                for (var m = 0; m < 16; ++m) {
                    t[r + m] = o[m];
                }
            }

            if ("string" == typeof e) {
                t = "binary" === e ? new Array(16) : null;
                e = null;
            }
        };
    },
    "7S/a": function (e, t) {
        e.exports = function (e) {
            try {
                return !!e();
            } catch (t) {
                return true;
            }
        };
    },
    "7pQk": function (e, t, n) {
        "use strict";

        Object.defineProperty(t, "__esModule", {
            value: true
        });
        var a = n("Q+8h");
        t.createLogger = a.createLogger;
        var i = n("bDEp");
        t.enableTag = i.enableTag;
        t.disableTag = i.disableTag;
        t.enableAll = i.enableAll;
        t.disableAll = i.disableAll;
    },
    "8fQz": function (e, t, n) {
        var a = n("vbc5");

        e.exports = function (e) {
            if (!a(e)) {
                throw TypeError(e + " is not an object!");
            }

            return e;
        };
    },
    CHRr: function (e, t, n) {
        n("HWod");
        var a = n("rFq9").Object;

        e.exports = function (e, t, n) {
            return a.defineProperty(e, t, n);
        };
    },
    DUKJ: function (e, t, n) {
        "use strict";

        var a = this && this.__values || function (e) {
            var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                a = 0;

            if (n) {
                return n.call(e);
            }

            if (e && "number" == typeof e.length) {
                return {
                    next: function () {
                        if (e && a >= e.length) {
                            e = void 0;
                        }

                        return {
                            value: e && e[a++],
                            done: !e
                        };
                    }
                };
            }

            throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
        };

        Object.defineProperty(t, "__esModule", {
            value: true
        });
        var i = n("dHgG");

        function r(e, t, n, i) {
            var m, s;

            if ("scalar" === t.type) {
                if ("null" === e.type) {
                    return {
                        result: true,
                        value: null
                    };
                }

                if ("String" === t.name || "Date" === t.name || "ID" === t.name) {
                    return "string" === e.type ? {
                        result: true,
                        value: e.value
                    } : {
                        result: false
                    };
                }

                if ("Int" === t.name || "Float" === t.name) {
                    return "number" === e.type ? {
                        result: true,
                        value: e.value
                    } : {
                        result: false
                    };
                }

                if ("Boolean" === t.name) {
                    return "boolean" === e.type ? {
                        result: true,
                        value: e.value
                    } : {
                        result: false
                    };
                }

                throw Error("Unknown scalar type: " + t.name);
            }

            if ("notNull" === t.type) {
                return "null" === e.type ? {
                    result: false
                } : r(e, t.inner, n, i);
            }

            if ("list" === t.type) {
                if ("null" === e.type) {
                    return {
                        result: true,
                        value: null
                    };
                }

                if ("list" === e.type) {
                    var _ = [];

                    try {
                        for (var p = a(e.values), d = p.next(); !d.done; d = p.next()) {
                            var y = r(d.value, t.inner, n, i);

                            if (!y.result) {
                                return {
                                    result: false
                                };
                            }

                            _.push(y.value);
                        }
                    } catch (c) {
                        m = {
                            error: c
                        };
                    } finally {
                        try {
                            if (d && !d.done && (s = p.return)) {
                                s.call(p);
                            }
                        } finally {
                            if (m) {
                                throw m.error;
                            }
                        }
                    }

                    return {
                        result: true,
                        value: _
                    };
                }

                throw Error("Invalid record value");
            }

            if ("object" === t.type) {
                if ("null" === e.type) {
                    return {
                        result: true,
                        value: null
                    };
                }

                if ("reference" === e.type) {
                    return o(e.key, n, t.selectors, i);
                }

                throw Error("Invalid record value");
            }

            return {
                result: false
            };
        }

        function o(e, t, n, o) {
            var m = t.read(e);

            if (0 === Object.keys(m.fields).length) {
                return {
                    result: false
                };
            }

            var s = {};
            return function e(t, n, o, m, s) {
                var _, p;

                try {
                    for (var d = a(m), y = d.next(); !y.done; y = d.next()) {
                        var c = y.value;

                        if ("field" === c.type) {
                            var u = i.selectorKey(c.name, c.arguments, s);

                            if (void 0 === t.fields[u]) {
                                return false;
                            }

                            var l = r(t.fields[u], c.fieldType, o, s);

                            if (!l.result) {
                                return false;
                            }

                            n[c.alias] = l.value;
                        } else if ("type-condition" === c.type) {
                            if (t.fields.__typename && "string" === t.fields.__typename.type && t.fields.__typename.value === c.name && !e(t, n, o, c.fragmentType.selectors, s)) {
                                return false;
                            }
                        } else if ("fragment" === c.type && !e(t, n, o, c.fragmentType.selectors, s)) {
                            return false;
                        }
                    }
                } catch (g) {
                    _ = {
                        error: g
                    };
                } finally {
                    try {
                        if (y && !y.done && (p = d.return)) {
                            p.call(d);
                        }
                    } finally {
                        if (_) {
                            throw _.error;
                        }
                    }
                }

                return true;
            }(m, s, t, n, o) ? {
                result: true,
                value: s
            } : {
                result: false
            };
        }

        t.readFromStore = function (e, t, n, a) {
            return o(e, t, n.selectors, a);
        };

        t.readRootFromStore = function (e, t, n, o) {
            var m,
                s,
                _ = {};

            try {
                for (var p = a(n.selectors), d = p.next(); !d.done; d = p.next()) {
                    var y = d.value;

                    if ("field" !== y.type) {
                        throw Error("Root query cant't contain fragments");
                    }

                    var c = e + ".$ref." + i.selectorKey(y.name, y.arguments, o),
                        u = t.read(c);

                    if (void 0 === u.fields.data) {
                        return {
                            result: false
                        };
                    }

                    var l = r(u.fields.data, y.fieldType, t, o);

                    if (!l.result) {
                        return {
                            result: false
                        };
                    }

                    _[y.alias] = l.value;
                }
            } catch (g) {
                m = {
                    error: g
                };
            } finally {
                try {
                    if (d && !d.done && (s = p.return)) {
                        s.call(p);
                    }
                } finally {
                    if (m) {
                        throw m.error;
                    }
                }
            }

            return {
                result: true,
                value: _
            };
        };
    },
    ERkP: function (e, t, n) {
        "use strict";

        e.exports = n("hLw4");
    },
    FXS2: function (e, t, n) {
        "use strict";

        var a = this && this.__importDefault || function (e) {
            return e && e.__esModule ? e : {
                default: e
            };
        };

        Object.defineProperty(t, "__esModule", {
            value: true
        });

        var i = a(n("HLMk")),
            r = function () {},
            o = function () {
            function e(e) {
                var t = this;
                this._state = "connecting";
                this.onopen = null;
                this.onclose = null;
                this.onmessage = null;
                this._ws = e;

                this._ws.onopen = function () {
                    if ("connecting" === t._state) {
                        t._state = "open";

                        if (t.onopen) {
                            t.onopen();
                        }
                    }
                };

                this._ws.onmessage = function (e) {
                    if ("open" === t._state && "string" == typeof e.data && t.onmessage) {
                        t.onmessage(e.data);
                    }
                };

                this._ws.onclose = function () {
                    t.close();
                };

                this._ws.onerror = function () {
                    t.close();
                };

                if (this._ws.on) {
                    this._ws.on("error", function () {
                        t.close();
                    });
                }
            }

            e.prototype.send = function (e) {
                if ("closed" !== this._state) {
                    if ("open" !== this._state) {
                        throw Error("Socket is not connected");
                    }

                    this._ws.send(e);
                }
            };

            e.prototype.close = function () {
                if ("closed" !== this._state) {
                    this._state = "closed";
                    this._ws.onclose = r;
                    this._ws.onopen = r;
                    this._ws.onmessage = r;

                    try {
                        this._ws.close();
                    } catch (e) {}
                }
            };

            return e;
        }();

        t.DefaultWebSocketEngine = {
            create: function (e, t) {
                return new o(new i.default(e, t));
            }
        };
    },
    GkNs: function (e, t, n) {
        "use strict";

        Object.defineProperty(t, "__esModule", {
            value: true
        });

        var a = n("VzOZ"),
            i = n("MGe+"),
            r = function () {
            function e(e) {
                var t = this;
                this.watches = new Map();
                this.subscriptions = new Map();

                this.handleMessage = function (e) {
                    if ("query" === e.type) {
                        t.engine.query(e.query, e.variables, e.params).then(function (n) {
                            t.postResult(e.id, n);
                        }).catch(function (n) {
                            t.postError(e.id, n);
                        });
                    } else if ("mutate" === e.type) {
                        t.engine.mutate(e.mutation, e.variables, e.params).then(function (n) {
                            t.postResult(e.id, n);
                        }).catch(function (n) {
                            t.postError(e.id, n);
                        });
                    } else if ("read" === e.type) {
                        t.engine.readQuery(e.query, e.variables).then(function (n) {
                            t.postResult(e.id, n);
                        }).catch(function (n) {
                            t.postError(e.id, n);
                        });
                    } else if ("write" === e.type) {
                        t.engine.writeQuery(e.data, e.query, e.variables).then(function (n) {
                            t.postResult(e.id, n);
                        }).catch(function (n) {
                            t.postError(e.id, n);
                        });
                    } else if ("watch" === e.type) {
                        var n = e.id,
                            a = t.engine.queryWatch(e.query, e.variables, e.params),
                            i = a.currentResult();

                        if (i) {
                            if (i.error) {
                                t.postError(n, i.error);
                            } else {
                                if (i.data) {
                                    t.postResult(n, i.data);
                                }
                            }
                        }

                        var r = a.subscribe(function (e) {
                            var a = e.data,
                                i = e.error;

                            if (i) {
                                t.postError(n, i);
                            } else {
                                t.postResult(n, a);
                            }
                        });
                        t.watches.set(e.id, r);
                    } else if ("watch-destroy" === e.type) {
                        if (t.watches.has(e.id)) {
                            t.watches.get(e.id)();
                            t.watches.delete(e.id);
                        }
                    } else if ("subscribe" === e.type) {
                        var o = e.id,
                            m = t.engine.subscribe(function (e) {
                            if ("stopped" === e.type) {
                                t.postError(o, e.error);
                            } else {
                                if ("message" === e.type) {
                                    t.postResult(o, e.message);
                                } else {
                                    console.warn("Unknown subscription result: ", e);
                                }
                            }
                        }, e.subscription, e.variables, e.params);
                        t.subscriptions.set(o, m);
                    } else if ("subscribe-destroy" === e.type) {
                        t.subscriptions.get(e.id).destroy();
                        t.subscriptions.delete(e.id);
                    }
                };

                this.postMessage = function (e) {
                    t.worker.post(e);
                };

                this.worker = e.worker;
                this.engine = e.engine;
                this.engine.watchStatus(function (e) {
                    t.postMessage({
                        id: i.randomKey(),
                        type: "status",
                        status: e.status
                    });
                });
                this.worker.setHandler(function (e) {
                    t.handleMessage(e);
                });
            }

            e.prototype.postResult = function (e, t) {
                this.postMessage({
                    id: e,
                    type: "result",
                    data: t
                });
            };

            e.prototype.postError = function (e, t) {
                this.postMessage({
                    type: "error",
                    id: e,
                    data: a.Serializer.serializeError(t)
                });
            };

            return e;
        }();

        t.WorkerHost = r;
    },
    HLMk: function (e, t, n) {
        (function (t) {
            var n = null;

            if ("undefined" != typeof WebSocket) {
                n = WebSocket;
            } else {
                if ("undefined" != typeof MozWebSocket) {
                    n = MozWebSocket;
                } else {
                    if (void 0 !== t) {
                        n = t.WebSocket || t.MozWebSocket;
                    } else {
                        if ("undefined" != typeof window) {
                            n = window.WebSocket || window.MozWebSocket;
                        } else {
                            if ("undefined" != typeof self) {
                                n = self.WebSocket || self.MozWebSocket;
                            }
                        }
                    }
                }
            }

            e.exports = n;
        }).call(this, n("fRV1"));
    },
    HWod: function (e, t, n) {
        var a = n("IFjL");
        a(a.S + a.F * !n("ObEa"), "Object", {
            defineProperty: n("UwCj").f
        });
    },
    IFjL: function (e, t, n) {
        var a = n("hR4s"),
            i = n("rFq9"),
            r = n("dWRk"),
            o = n("b95h"),
            m = n("YVtA"),
            s = function (e, t, n) {
            var _,
                p,
                d,
                y = e & s.F,
                c = e & s.G,
                u = e & s.S,
                l = e & s.P,
                g = e & s.B,
                h = e & s.W,
                S = c ? i : i[t] || (i[t] = {}),
                f = S.prototype,
                I = c ? a : u ? a[t] : (a[t] || {}).prototype;

            for (_ in c && (n = t), n) {
                if (!((p = !y && I && void 0 !== I[_]) && m(S, _))) {
                    d = p ? I[_] : n[_];
                    S[_] = c && "function" != typeof I[_] ? n[_] : g && p ? r(d, a) : h && I[_] == d ? function (e) {
                        var t = function (t, n, a) {
                            if (this instanceof e) {
                                switch (arguments.length) {
                                    case 0:
                                        return new e();

                                    case 1:
                                        return new e(t);

                                    case 2:
                                        return new e(t, n);
                                }

                                return new e(t, n, a);
                            }

                            return e.apply(this, arguments);
                        };

                        t.prototype = e.prototype;
                        return t;
                    }(d) : l && "function" == typeof d ? r(Function.call, d) : d;

                    if (l) {
                        (S.virtual || (S.virtual = {}))[_] = d;

                        if (e & s.R && f && !f[_]) {
                            o(f, _, d);
                        }
                    }
                }
            }
        };

        s.F = 1;
        s.G = 2;
        s.S = 4;
        s.P = 8;
        s.B = 16;
        s.W = 32;
        s.U = 64;
        s.R = 128;
        e.exports = s;
    },
    IdYv: function (e, t, n) {
        "use strict";

        Object.defineProperty(t, "__esModule", {
            value: true
        });
        t.ConsoleLogger = class {
            constructor(e) {
                this.log = e => {
                    console.log(this._tag + ": " + e);
                };

                this.error = e => {
                    console.error(this._tag + ": ", e);
                };

                this.warn = e => {
                    console.warn(this._tag + ": ", e);
                };

                this._tag = e;
            }

        };
    },
    Kc1g: function (e, t, n) {
        var a = n("vbc5");

        e.exports = function (e, t) {
            if (!a(e)) {
                return e;
            }

            var n, i;

            if (t && "function" == typeof (n = e.toString) && !a(i = n.call(e))) {
                return i;
            }

            if ("function" == typeof (n = e.valueOf) && !a(i = n.call(e))) {
                return i;
            }

            if (!t && "function" == typeof (n = e.toString) && !a(i = n.call(e))) {
                return i;
            }

            throw TypeError("Can't convert object to primitive value");
        };
    },
    LMaB: function (e, t, n) {
        e.exports = !n("ObEa") && !n("7S/a")(function () {
            return 7 != Object.defineProperty(n("1bLK")("div"), "a", {
                get: function () {
                    return 7;
                }
            }).a;
        });
    },
    LcAa: function (e, t, n) {
        e.exports = n("CHRr");
    },
    "MGe+": function (e, t, n) {
        "use strict";

        var a = this && this.__importDefault || function (e) {
            return e && e.__esModule ? e : {
                default: e
            };
        };

        Object.defineProperty(t, "__esModule", {
            value: true
        });
        var i = a(n("7G9G"));

        t.randomKey = function () {
            return i.default();
        };
    },
    "O/w3": function (e, t, n) {
        "use strict";

        var a = this && this.__awaiter || function (e, t, n, a) {
            return new (n || (n = Promise))(function (i, r) {
                function o(e) {
                    try {
                        s(a.next(e));
                    } catch (t) {
                        r(t);
                    }
                }

                function m(e) {
                    try {
                        s(a.throw(e));
                    } catch (t) {
                        r(t);
                    }
                }

                function s(e) {
                    var t;

                    if (e.done) {
                        i(e.value);
                    } else {
                        (t = e.value, t instanceof n ? t : new n(function (e) {
                            e(t);
                        })).then(o, m);
                    }
                }

                s((a = a.apply(e, t || [])).next());
            });
        },
            i = this && this.__generator || function (e, t) {
            var n,
                a,
                i,
                r,
                o = {
                label: 0,
                sent: function () {
                    if (1 & i[0]) {
                        throw i[1];
                    }

                    return i[1];
                },
                trys: [],
                ops: []
            };
            r = {
                next: m(0),
                throw: m(1),
                return: m(2)
            };

            if ("function" == typeof Symbol) {
                r[Symbol.iterator] = function () {
                    return this;
                };
            }

            return r;

            function m(r) {
                return function (m) {
                    return function (r) {
                        if (n) {
                            throw new TypeError("Generator is already executing.");
                        }

                        for (; o;) {
                            try {
                                n = 1;

                                if (a && (i = 2 & r[0] ? a.return : r[0] ? a.throw || ((i = a.return) && i.call(a), 0) : a.next) && !(i = i.call(a, r[1])).done) {
                                    return i;
                                }

                                switch (a = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                    case 0:
                                    case 1:
                                        i = r;
                                        break;

                                    case 4:
                                        o.label++;
                                        return {
                                            value: r[1],
                                            done: false
                                        };

                                    case 5:
                                        o.label++, a = r[1], r = [0];
                                        continue;

                                    case 7:
                                        r = o.ops.pop(), o.trys.pop();
                                        continue;

                                    default:
                                        if (!(i = (i = o.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                            o = 0;
                                            continue;
                                        }

                                        if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                            o.label = r[1];
                                            break;
                                        }

                                        if (6 === r[0] && o.label < i[1]) {
                                            o.label = i[1];
                                            i = r;
                                            break;
                                        }

                                        if (i && o.label < i[2]) {
                                            o.label = i[2];
                                            o.ops.push(r);
                                            break;
                                        }

                                        i[2] && o.ops.pop(), o.trys.pop();
                                        continue;
                                }

                                r = t.call(e, o);
                            } catch (m) {
                                r = [6, m];
                                a = 0;
                            } finally {
                                n = i = 0;
                            }
                        }

                        if (5 & r[0]) {
                            throw r[1];
                        }

                        return {
                            value: r[0] ? r[1] : void 0,
                            done: true
                        };
                    }([r, m]);
                };
            }
        };

        Object.defineProperty(t, "__esModule", {
            value: true
        });

        var r = n("PuaQ"),
            o = function () {
            function e(e) {
                var t = this;
                this.onStatusChanged = null;

                this.operation = function (e, n) {
                    return a(t, void 0, void 0, function () {
                        var t,
                            a = this;
                        return i(this, function (i) {
                            switch (i.label) {
                                case 0:
                                    t = false;
                                    return [4, new Promise(function (i, r) {
                                        return a.serviceLayer.operation(e, n, function (e) {
                                            if (!("result" !== e.type && "error" !== e.type || t)) {
                                                t = true;
                                                i(e);
                                            }
                                        });
                                    })];

                                case 1:
                                    return [2, i.sent()];
                            }
                        });
                    });
                };

                this.subscription = function (e, n, a) {
                    return t.serviceLayer.operation(e, n, a);
                };

                this.opts = e;
                this.serviceLayer = new r.TransportServiceLayer(e);

                this.serviceLayer.onStatusChanged = function (e) {
                    if (t.onStatusChanged) {
                        t.onStatusChanged(e);
                    }
                };
            }

            e.prototype.close = function () {
                this.close();
            };

            return e;
        }();

        t.WebTransport = o;
    },
    O9eG: function (e, t, n) {
        "use strict";

        Object.defineProperty(t, "__esModule", {
            value: true
        });

        t.keyFromObject = function e(t) {
            if (void 0 === t) {
                return "";
            }

            if ("string" == typeof t || "number" == typeof t || "boolean" == typeof t) {
                return t + "";
            }

            var n = Object.keys(t).sort().reduce(function (n, a) {
                n[a] = e(t[a]);
                return n;
            }, {});
            return JSON.stringify(n);
        };
    },
    ObEa: function (e, t, n) {
        e.exports = !n("7S/a")(function () {
            return 7 != Object.defineProperty({}, "a", {
                get: function () {
                    return 7;
                }
            }).a;
        });
    },
    P5VG: function (e, t, n) {
        "use strict";

        var a = this && this.__importStar || function (e) {
            if (e && e.__esModule) {
                return e;
            }

            var t = {};

            if (null != e) {
                for (var n in e) {
                    if (Object.hasOwnProperty.call(e, n)) {
                        t[n] = e[n];
                    }
                }
            }

            t.default = e;
            return t;
        };

        Object.defineProperty(t, "__esModule", {
            value: true
        });
        var i = n("cPju");
        t.GraphqlBridgedEngine = i.GraphqlBridgedEngine;
        var r = n("5Doj");
        t.WorkerEngine = r.WorkerEngine;
        var o = n("GkNs");
        t.WorkerHost = o.WorkerHost;
        var m = n("zOtc");
        t.GraphqlUnknownError = m.GraphqlUnknownError;
        t.GraphqlError = m.GraphqlError;
        var s = n("yLub");
        t.RetryEngine = s.RetryEngine;

        var _ = n("Zg3w");

        t.WebEngine = _.WebEngine;
        var p = a(n("PlaK"));
        t.WebDefinitions = p;
        var d = n("vJUR");
        t.QueryCacheProvider = d.QueryCacheProvider;
        t.QueryCache = d.QueryCache;
        var y = n("cSMM");
        t.BaseSpaceXClient = y.BaseSpaceXClient;
        var c = n("PyOb");
        t.PriorityContext = c.PriorityContext;
    },
    PlaK: function (e, t, n) {
        "use strict";

        var a = this && this.__values || function (e) {
            var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                a = 0;

            if (n) {
                return n.call(e);
            }

            if (e && "number" == typeof e.length) {
                return {
                    next: function () {
                        if (e && a >= e.length) {
                            e = void 0;
                        }

                        return {
                            value: e && e[a++],
                            done: !e
                        };
                    }
                };
            }

            throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
        };

        Object.defineProperty(t, "__esModule", {
            value: true
        });

        t.list = function (e) {
            return {
                type: "list",
                inner: e
            };
        };

        t.notNull = function (e) {
            return {
                type: "notNull",
                inner: e
            };
        };

        t.scalar = function (e) {
            return {
                type: "scalar",
                name: e
            };
        };

        t.obj = function () {
            for (var e = [], t = 0; t < arguments.length; t++) {
                e[t] = arguments[t];
            }

            return {
                type: "object",
                selectors: e
            };
        };

        t.field = function (e, t, n, a) {
            return {
                type: "field",
                name: e,
                alias: t,
                arguments: n,
                fieldType: a
            };
        };

        t.inline = function (e, t) {
            return {
                type: "type-condition",
                name: e,
                fragmentType: t
            };
        };

        t.fragment = function (e, t) {
            return {
                type: "fragment",
                name: e,
                fragmentType: t
            };
        };

        t.args = function () {
            for (var e, t, n = [], i = 0; i < arguments.length; i++) {
                n[i] = arguments[i];
            }

            if (0 === n.length) {
                return {};
            }

            var r = {};

            try {
                for (var o = a(n), m = o.next(); !m.done; m = o.next()) {
                    var s = m.value;
                    r[s.name] = s.value;
                }
            } catch (_) {
                e = {
                    error: _
                };
            } finally {
                try {
                    if (m && !m.done && (t = o.return)) {
                        t.call(o);
                    }
                } finally {
                    if (e) {
                        throw e.error;
                    }
                }
            }

            return r;
        };

        t.fieldValue = function (e, t) {
            return {
                name: e,
                value: t
            };
        };

        t.refValue = function (e) {
            return {
                type: "reference",
                name: e
            };
        };

        t.intValue = function (e) {
            return {
                type: "int",
                value: e
            };
        };

        t.floatValue = function (e) {
            return {
                type: "float",
                value: e
            };
        };

        t.stringValue = function (e) {
            return {
                type: "string",
                value: e
            };
        };

        t.boolValue = function (e) {
            return {
                type: "boolean",
                value: e
            };
        };

        t.listValue = function () {
            for (var e = [], t = 0; t < arguments.length; t++) {
                e[t] = arguments[t];
            }

            return {
                type: "list",
                items: e
            };
        };

        t.objectValue = function () {
            for (var e, t, n = [], i = 0; i < arguments.length; i++) {
                n[i] = arguments[i];
            }

            var r = {};

            try {
                for (var o = a(n), m = o.next(); !m.done; m = o.next()) {
                    var s = m.value;
                    r[s.name] = s.value;
                }
            } catch (_) {
                e = {
                    error: _
                };
            } finally {
                try {
                    if (m && !m.done && (t = o.return)) {
                        t.call(o);
                    }
                } finally {
                    if (e) {
                        throw e.error;
                    }
                }
            }

            return {
                type: "object",
                fields: r
            };
        };
    },
    PuaQ: function (e, t, n) {
        "use strict";

        var a = this && this.__values || function (e) {
            var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                a = 0;

            if (n) {
                return n.call(e);
            }

            if (e && "number" == typeof e.length) {
                return {
                    next: function () {
                        if (e && a >= e.length) {
                            e = void 0;
                        }

                        return {
                            value: e && e[a++],
                            done: !e
                        };
                    }
                };
            }

            throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
        };

        Object.defineProperty(t, "__esModule", {
            value: true
        });

        var i = n("gVk7"),
            r = function () {
            function e(e) {
                var t = this;
                this.nextId = 1;
                this.liveOperations = new Map();
                this.liveOperationsIds = new Map();
                this.onStatusChanged = null;

                this.operation = function (e, n, a) {
                    var i = (t.nextId++).toString(),
                        r = {
                        id: i,
                        reqiestId: i,
                        operation: e,
                        variables: n,
                        callback: a
                    };
                    t.liveOperations.set(i, r);
                    t.liveOperationsIds.set(i, i);
                    t.flushQueryStart(r);
                    return function () {
                        if (t.liveOperations.has(i)) {
                            t.liveOperations.delete(i);
                            t.liveOperationsIds.delete(r.reqiestId);
                            t.flushQueryStop(r);
                        }
                    };
                };

                this.transport = e.transport ? e.transport : new i.ApolloTransportLayer(e);

                this.transport.onConnected = function () {
                    if (e.logging) {
                        console.log("[TX] Connected");
                    }

                    if (t.onStatusChanged) {
                        t.onStatusChanged({
                            status: "connected"
                        });
                    }
                };

                this.transport.onDisconnected = function () {
                    if (e.logging) {
                        console.log("[TX] Disconnected");
                    }

                    if (t.onStatusChanged) {
                        t.onStatusChanged({
                            status: "connecting"
                        });
                    }
                };

                this.transport.onReceiveData = function (e, n) {
                    var a = t.liveOperationsIds.get(e);

                    if (a) {
                        var i = t.liveOperations.get(a);

                        if (i) {
                            i.callback({
                                type: "result",
                                value: n
                            });

                            if (!("query" !== i.operation.kind && "mutation" !== i.operation.kind)) {
                                t.liveOperations.delete(a);
                                t.liveOperationsIds.delete(e);
                            }
                        }
                    }
                };

                this.transport.onReceiveError = function (e, n) {
                    var a = t.liveOperationsIds.get(e);

                    if (a) {
                        var i = t.liveOperations.get(a);

                        if (i) {
                            t.liveOperations.delete(a);
                            t.liveOperationsIds.delete(e);
                            i.callback({
                                type: "error",
                                errors: n
                            });
                        }
                    }
                };

                this.transport.onReceiveCompleted = function (e) {
                    var n = t.liveOperationsIds.get(e);

                    if (n) {
                        var a = t.liveOperations.get(n);

                        if (a) {
                            t.liveOperations.delete(n);
                            t.liveOperationsIds.delete(e);
                            a.callback({
                                type: "completed"
                            });
                        }
                    }
                };

                this.transport.onSessionLost = function () {
                    var n, i;

                    if (e.logging) {
                        console.log("[TX] Session lost");
                    }

                    try {
                        for (var r = a(Array.from(t.liveOperations.values())), o = r.next(); !o.done; o = r.next()) {
                            var m = o.value;

                            if ("subscription" === m.operation.kind) {
                                t.liveOperations.delete(m.id);
                                t.liveOperationsIds.delete(m.reqiestId);
                                m.callback({
                                    type: "completed"
                                });
                            } else {
                                t.flushQueryStart(m);
                            }
                        }
                    } catch (s) {
                        n = {
                            error: s
                        };
                    } finally {
                        try {
                            if (o && !o.done && (i = r.return)) {
                                i.call(r);
                            }
                        } finally {
                            if (n) {
                                throw n.error;
                            }
                        }
                    }
                };

                this.transport.connect();
            }

            e.prototype.close = function () {
                this.transport.close();
            };

            e.prototype.flushQueryStart = function (e) {
                this.transport.request(e.reqiestId, {
                    query: e.operation.body,
                    name: e.operation.name,
                    variables: e.variables
                });
            };

            e.prototype.flushQueryStop = function (e) {
                this.transport.cancel(e.reqiestId);
            };

            return e;
        }();

        t.TransportServiceLayer = r;
    },
    PyOb: function (e, t, n) {
        "use strict";

        Object.defineProperty(t, "__esModule", {
            value: true
        });

        var a = function () {
            function e(e, t) {
                this.name = e;
                this._priority = t;
            }

            Object.defineProperty(e.prototype, "priority", {
                get: function () {
                    return this._priority;
                },
                set: function (e) {
                    this._priority = e;
                },
                enumerable: true,
                configurable: true
            });
            return e;
        }();

        t.PriorityContext = a;
    },
    "Q+8h": function (e, t, n) {
        "use strict";

        Object.defineProperty(t, "__esModule", {
            value: true
        });
        const a = n("IdYv"),
              i = n("nlML"),
              r = n("+DYY");

        t.createLogger = function (e) {
            return i.LoggingConfig.isDisabled(e) ? r.NoOpLogger : new a.ConsoleLogger(e);
        };
    },
    T01t: function (e, t, n) {
        "use strict";

        Object.defineProperty(t, "__esModule", {
            value: true
        });

        var a = function () {
            return function (e, t) {
                var n = this;
                this.isDead = true;

                this.kick = function () {
                    if (!n.isDead) {
                        if (n.timer) {
                            clearTimeout(n.timer);
                        }

                        n.timer = setTimeout(function () {
                            if (!n.isDead) {
                                n.isDead = true;
                                n.onRestart();
                            }
                        }, n.timeout);
                    }
                };

                this.reset = function () {
                    n.isDead = false;
                    n.kick();
                };

                this.kill = function () {
                    n.isDead = true;

                    if (n.timer) {
                        clearTimeout(n.timer);
                        n.timer = null;
                    }
                };

                this.timeout = e;
                this.onRestart = t;
            };
        }();

        t.WatchDogTimer = a;
    },
    UwCj: function (e, t, n) {
        var a = n("8fQz"),
            i = n("LMaB"),
            r = n("Kc1g"),
            o = Object.defineProperty;
        t.f = n("ObEa") ? Object.defineProperty : function (e, t, n) {
            a(e);
            t = r(t, true);
            a(n);

            if (i) {
                try {
                    return o(e, t, n);
                } catch (m) {}
            }

            if ("get" in n || "set" in n) {
                throw TypeError("Accessors not supported!");
            }

            if ("value" in n) {
                e[t] = n.value;
            }

            return e;
        };
    },
    VzOZ: function (e, t, n) {
        "use strict";

        Object.defineProperty(t, "__esModule", {
            value: true
        });
        var a = n("zOtc");
        t.Serializer = {
            serializeError: function (e) {
                return e instanceof a.GraphqlError ? {
                    type: "gql",
                    errors: e.errors
                } : e instanceof a.GraphqlUnknownError ? {
                    type: "unknown",
                    message: e.message
                } : e.message && "string" == typeof e.message ? {
                    type: "unknown",
                    message: e.message
                } : {
                    type: "unknown",
                    message: "Unknown error"
                };
            },
            parseError: function (e) {
                return "gql" === e.type ? new a.GraphqlError(e.errors) : "unknown" === e.type ? new a.GraphqlUnknownError(e.message) : new a.GraphqlUnknownError("Unknown error");
            }
        };
    },
    Vzpu: function (e, t) {
        e.exports = function (e) {
            if ("function" != typeof e) {
                throw TypeError(e + " is not a function!");
            }

            return e;
        };
    },
    WsZc: function (e, t, n) {
        "use strict";

        var a = this && this.__values || function (e) {
            var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                a = 0;

            if (n) {
                return n.call(e);
            }

            if (e && "number" == typeof e.length) {
                return {
                    next: function () {
                        if (e && a >= e.length) {
                            e = void 0;
                        }

                        return {
                            value: e && e[a++],
                            done: !e
                        };
                    }
                };
            }

            throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
        };

        Object.defineProperty(t, "__esModule", {
            value: true
        });

        var i = function () {
            function e() {
                this._watchers = [];
            }

            e.prototype.watch = function (e) {
                var t = this;

                this._watchers.push(e);

                if (this._state) {
                    e(this._state);
                }

                return function () {
                    var n = t._watchers.indexOf(e);

                    if (n < 0) {
                        console.warn("Double unsubscribe detected!");
                    } else {
                        t._watchers.splice(n, 1);
                    }
                };
            };

            e.prototype.getState = function () {
                return this._state;
            };

            e.prototype.setState = function (e) {
                var t, n;

                if (this._state !== e) {
                    this._state = e;

                    try {
                        for (var i = a(this._watchers), r = i.next(); !r.done; r = i.next()) {
                            (0, r.value)(e);
                        }
                    } catch (o) {
                        t = {
                            error: o
                        };
                    } finally {
                        try {
                            if (r && !r.done && (n = i.return)) {
                                n.call(i);
                            }
                        } finally {
                            if (t) {
                                throw t.error;
                            }
                        }
                    }
                }
            };

            return e;
        }();

        t.Watcher = i;
    },
    XXhW: function (e, t, n) {
        "use strict";

        var a = this && this.__values || function (e) {
            var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                a = 0;

            if (n) {
                return n.call(e);
            }

            if (e && "number" == typeof e.length) {
                return {
                    next: function () {
                        if (e && a >= e.length) {
                            e = void 0;
                        }

                        return {
                            value: e && e[a++],
                            done: !e
                        };
                    }
                };
            }

            throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
        };

        Object.defineProperty(t, "__esModule", {
            value: true
        });
        var i = n("dHgG");

        function r(e) {
            var t,
                n,
                i = Object.keys(e),
                r = {};

            try {
                for (var o = a(i), m = o.next(); !m.done; m = o.next()) {
                    var s = m.value;
                    r[s] = {
                        key: s,
                        fields: e[s]
                    };
                }
            } catch (_) {
                t = {
                    error: _
                };
            } finally {
                try {
                    if (m && !m.done && (n = o.return)) {
                        n.call(o);
                    }
                } finally {
                    if (t) {
                        throw t.error;
                    }
                }
            }

            return r;
        }

        function o(e, t, n, a) {
            if ("notNull" === t.type) {
                var i = o(e, t.inner, n, a);

                if (i && "null" === i.type) {
                    throw Error("Unexpected null value");
                }

                return i;
            }

            if (null == n) {
                return {
                    type: "null"
                };
            }

            if ("scalar" === t.type) {
                if (null !== e) {
                    if ("String" === t.name || "ID" === t.name || "Date" === t.name) {
                        return {
                            type: "string",
                            value: n + ""
                        };
                    }

                    if ("Int" === t.name || "Float" === t.name) {
                        if ("number" == typeof n) {
                            return {
                                type: "number",
                                value: n
                            };
                        }

                        throw Error("Unexpected value for " + t.name + ": " + n);
                    }

                    if ("Boolean" === t.name) {
                        if ("boolean" == typeof n) {
                            return {
                                type: "boolean",
                                value: n
                            };
                        }

                        throw Error("Unexpected value for " + t.name + ": " + n);
                    }

                    throw Error("Unsupported Scalar: " + t.name);
                }

                return null;
            }

            if ("list" === t.type) {
                if (!Array.isArray(n)) {
                    throw Error("Invalid array");
                }

                if (null !== e) {
                    for (var r = [], s = 0; s < n.length; s++) {
                        r.push(o(e + "." + s, t.inner, n[s], a));
                    }

                    return {
                        type: "list",
                        values: r
                    };
                }

                for (s = 0; s < n.length; s++) {
                    o(null, t.inner, n[s], a);
                }

                return null;
            }

            if ("object" === t.type) {
                return m(e, t.selectors, n, a);
            }

            throw Error("Unreachable code");
        }

        function m(e, t, n, r) {
            var s,
                _,
                p = void 0,
                d = null;

            if (null !== n.id && void 0 !== n.id) {
                d = "" + n.id;
            } else {
                d = e;
            }

            if (null !== d) {
                var y = r.collection[d];

                if (y) {
                    p = y;
                } else {
                    p = {};
                    r.collection[d] = p;
                }
            }

            try {
                for (var c = a(t), u = c.next(); !u.done; u = c.next()) {
                    var l = u.value;

                    if ("field" === l.type) {
                        if (p) {
                            var g = i.selectorKey(l.name, l.arguments, r.queryArguments);
                            p[g] = o(d + "." + g, l.fieldType, n[l.alias], r);
                        } else {
                            o(null, l.fieldType, n[l.alias], r);
                        }
                    } else if ("type-condition" === l.type) {
                        if (n.__typename === l.name) {
                            m(e, l.fragmentType.selectors, n, r);
                        }
                    } else {
                        if ("fragment" !== l.type) {
                            throw Error("Unreachable code");
                        }

                        m(e, l.fragmentType.selectors, n, r);
                    }
                }
            } catch (h) {
                s = {
                    error: h
                };
            } finally {
                try {
                    if (u && !u.done && (_ = c.return)) {
                        _.call(c);
                    }
                } finally {
                    if (s) {
                        throw s.error;
                    }
                }
            }

            return null !== d ? {
                type: "reference",
                key: d
            } : null;
        }

        t.normalizeData = function (e, t, n, a) {
            var i = {};
            m(e, t.selectors, a, {
                collection: i,
                root: a,
                queryArguments: n
            });
            return r(i);
        };

        t.normalizeResponse = function (e, t, n, s) {
            var _ = {};

            (function (e, t, n, r) {
                var s, _;

                if (null !== e) {
                    try {
                        for (var p = a(t), d = p.next(); !d.done; d = p.next()) {
                            var y = d.value;

                            if ("field" !== y.type) {
                                throw Error("Root query cant't contain fragments");
                            }

                            var c = i.selectorKey(y.name, y.arguments, r.queryArguments),
                                u = e + "." + c,
                                l = e + ".$ref." + c,
                                g = r.collection[l],
                                h = void 0;

                            if (g) {
                                h = g;
                            } else {
                                h = {};
                                r.collection[l] = h;
                            }

                            h.data = o(u, y.fieldType, n[y.alias], r);
                        }
                    } catch (S) {
                        s = {
                            error: S
                        };
                    } finally {
                        try {
                            if (d && !d.done && (_ = p.return)) {
                                _.call(p);
                            }
                        } finally {
                            if (s) {
                                throw s.error;
                            }
                        }
                    }
                } else {
                    m(null, t, n, r);
                }
            })(e, t.selectors, s, {
                collection: _,
                root: s,
                queryArguments: n
            });

            return r(_);
        };
    },
    YEIM: function (e, t, n) {
        "use strict";

        function a(e, t) {
            if (e.type !== t.type) {
                return false;
            }

            if ("number" === e.type && "number" === t.type) {
                return e.value === t.value;
            }

            if ("boolean" === e.type && "boolean" === t.type) {
                return e.value === t.value;
            }

            if ("string" === e.type && "string" === t.type) {
                return e.value === t.value;
            }

            if ("null" === e.type && "null" === t.type) {
                return true;
            }

            if ("reference" === e.type && "reference" === t.type) {
                return e.key === t.key;
            }

            if ("list" === e.type && "list" === t.type) {
                var n = e.values,
                    i = t.values;

                if (n.length !== i.length) {
                    return false;
                }

                for (var r = 0; r < n.length; r++) {
                    if (!a(n[r], i[r])) {
                        return false;
                    }
                }

                return true;
            }

            return true;
        }

        Object.defineProperty(t, "__esModule", {
            value: true
        });

        var i = function () {
            return function () {
                var e = this;
                this.inMemory = {};

                this.isInMemory = function (t) {
                    return !!e.inMemory[t];
                };

                this.loaded = function (t) {
                    for (var n in t) {
                        if (t.hasOwnProperty(n)) {
                            e.loadedRecord(t[n]);
                        }
                    }
                };

                this.loadedRecord = function (t) {
                    if (e.inMemory[t.key]) {
                        throw Error("Record " + t.key + " already loaded");
                    }

                    e.inMemory[t.key] = t;
                };

                this.read = function (t) {
                    if (!e.inMemory[t]) {
                        throw Error("Record " + t + " not loaded yet");
                    }

                    return e.inMemory[t];
                };

                this.merge = function (t) {
                    var n = {};

                    for (var a in t) {
                        if (t.hasOwnProperty(a)) {
                            e._merge(t[a], n);
                        }
                    }

                    return n;
                };

                this.mergeRecord = function (t) {
                    var n = {};

                    e._merge(t, n);

                    return n;
                };

                this._merge = function (t, n) {
                    var i = {},
                        r = {},
                        o = e.inMemory[t.key];

                    if (o) {
                        for (var m in o.fields) {
                            if (o.fields.hasOwnProperty(m)) {
                                i[m] = o.fields[m];
                            }
                        }
                    }

                    for (var m in t.fields) {
                        if (t.fields.hasOwnProperty(m)) {
                            var s = o ? o.fields[m] : null;

                            if (!(s && a(s, t.fields[m]))) {
                                r[m] = m;
                                i[m] = t.fields[m];
                            }
                        }
                    }

                    if (Object.keys(r).length > 0) {
                        e.inMemory[t.key] = {
                            key: t.key,
                            fields: i
                        };
                        n[t.key] = r;
                    }
                };
            };
        }();

        t.RecordStore = i;
    },
    YVtA: function (e, t) {
        var n = {}.hasOwnProperty;

        e.exports = function (e, t) {
            return n.call(e, t);
        };
    },
    ZOSw: function (e, t, n) {
        "use strict";

        Object.defineProperty(t, "__esModule", {
            value: true
        });

        var a = n("T01t"),
            i = n("r/V+"),
            r = function () {},
            o = [1e3, 5e3, 3e4],
            m = function () {
            return function (e) {
                var t = this;
                this.onopen = null;
                this.onclose = null;
                this.onmessage = null;
                this.socket = null;
                this.watchDog = null;
                this.closed = false;

                this.onConnected = function (e) {
                    t.watchDog = new a.WatchDogTimer(t.timeout, t.onConnectionDied);
                    t.socket = e;
                    t.watchDog.reset();

                    e.onclose = function () {
                        t.onConnectionDied();
                    };

                    e.onmessage = function (e) {
                        if (!t.closed) {
                            if (t.onmessage) {
                                t.onmessage(e);
                            }
                        }

                        if (t.watchDog) {
                            t.watchDog.kick();
                        }
                    };

                    if (t.onopen) {
                        t.onopen();
                    }
                };

                this.onConnectionDied = function () {
                    if (!t.closed) {
                        t.closed = true;

                        if (t.socket) {
                            t.socket.onmessage = r;
                            t.socket.onclose = r;
                            t.socket.onopen = r;

                            try {
                                t.socket.close();
                            } catch (e) {}

                            t.socket = null;
                        }

                        if (t.watchDog) {
                            t.watchDog.kill();
                            t.watchDog = null;
                        }

                        if (t.watchDog) {
                            t.watchDog.kill();
                            t.watchDog = null;
                        }
                    }
                };

                this.send = function (e) {
                    if (t.socket) {
                        t.socket.send(e);
                    } else if (!t.closed) {
                        throw Error("Socket is not connected yet");
                    }
                };

                this.close = function () {
                    if (!t.closed) {
                        t.closed = true;
                        t.thruster.close();

                        if (t.socket) {
                            t.socket.onmessage = r;
                            t.socket.onclose = r;
                            t.socket.onopen = r;

                            try {
                                t.socket.close();
                            } catch (e) {}

                            t.socket = null;
                        }

                        if (t.watchDog) {
                            t.watchDog.kill();
                            t.watchDog = null;
                        }
                    }
                };

                this.url = e.url;
                this.timeout = e.timeout;
                this.thruster = new i.Thruster({
                    configs: o.map(function (t) {
                        return {
                            url: e.url,
                            timeout: t
                        };
                    }),
                    onSuccess: this.onConnected,
                    engine: e.engine,
                    protocol: e.protocol
                });
            };
        }();

        t.ThrustedSocket = m;
    },
    Zg3w: function (e, t, n) {
        "use strict";

        var a = this && this.__awaiter || function (e, t, n, a) {
            return new (n || (n = Promise))(function (i, r) {
                function o(e) {
                    try {
                        s(a.next(e));
                    } catch (t) {
                        r(t);
                    }
                }

                function m(e) {
                    try {
                        s(a.throw(e));
                    } catch (t) {
                        r(t);
                    }
                }

                function s(e) {
                    var t;

                    if (e.done) {
                        i(e.value);
                    } else {
                        (t = e.value, t instanceof n ? t : new n(function (e) {
                            e(t);
                        })).then(o, m);
                    }
                }

                s((a = a.apply(e, t || [])).next());
            });
        },
            i = this && this.__generator || function (e, t) {
            var n,
                a,
                i,
                r,
                o = {
                label: 0,
                sent: function () {
                    if (1 & i[0]) {
                        throw i[1];
                    }

                    return i[1];
                },
                trys: [],
                ops: []
            };
            r = {
                next: m(0),
                throw: m(1),
                return: m(2)
            };

            if ("function" == typeof Symbol) {
                r[Symbol.iterator] = function () {
                    return this;
                };
            }

            return r;

            function m(r) {
                return function (m) {
                    return function (r) {
                        if (n) {
                            throw new TypeError("Generator is already executing.");
                        }

                        for (; o;) {
                            try {
                                n = 1;

                                if (a && (i = 2 & r[0] ? a.return : r[0] ? a.throw || ((i = a.return) && i.call(a), 0) : a.next) && !(i = i.call(a, r[1])).done) {
                                    return i;
                                }

                                switch (a = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                    case 0:
                                    case 1:
                                        i = r;
                                        break;

                                    case 4:
                                        o.label++;
                                        return {
                                            value: r[1],
                                            done: false
                                        };

                                    case 5:
                                        o.label++, a = r[1], r = [0];
                                        continue;

                                    case 7:
                                        r = o.ops.pop(), o.trys.pop();
                                        continue;

                                    default:
                                        if (!(i = (i = o.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                            o = 0;
                                            continue;
                                        }

                                        if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                            o.label = r[1];
                                            break;
                                        }

                                        if (6 === r[0] && o.label < i[1]) {
                                            o.label = i[1];
                                            i = r;
                                            break;
                                        }

                                        if (i && o.label < i[2]) {
                                            o.label = i[2];
                                            o.ops.push(r);
                                            break;
                                        }

                                        i[2] && o.ops.pop(), o.trys.pop();
                                        continue;
                                }

                                r = t.call(e, o);
                            } catch (m) {
                                r = [6, m];
                                a = 0;
                            } finally {
                                n = i = 0;
                            }
                        }

                        if (5 & r[0]) {
                            throw r[1];
                        }

                        return {
                            value: r[0] ? r[1] : void 0,
                            done: true
                        };
                    }([r, m]);
                };
            }
        },
            r = this && this.__values || function (e) {
            var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                a = 0;

            if (n) {
                return n.call(e);
            }

            if (e && "number" == typeof e.length) {
                return {
                    next: function () {
                        if (e && a >= e.length) {
                            e = void 0;
                        }

                        return {
                            value: e && e[a++],
                            done: !e
                        };
                    }
                };
            }

            throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
        };

        Object.defineProperty(t, "__esModule", {
            value: true
        });

        var o = n("zOtc"),
            m = n("WsZc"),
            s = n("O/w3"),
            _ = n("on7m"),
            p = n("MGe+"),
            d = function () {
            return function () {
                this.hasValue = false;
                this.hasError = false;
            };
        }(),
            y = function () {
            function e(e, t) {
                var n = this;
                this.statusWatcher = new m.Watcher();
                this.store = new _.WebStore();
                this.transport = new s.WebTransport(t);
                this.statusWatcher.setState({
                    status: "connecting"
                });
                this.definitions = e;

                this.transport.onStatusChanged = function (e) {
                    n.statusWatcher.setState(e);
                };
            }

            Object.defineProperty(e.prototype, "status", {
                get: function () {
                    return this.statusWatcher.getState();
                },
                enumerable: true,
                configurable: true
            });

            e.prototype.close = function () {
                this.transport.close();
            };

            e.prototype.watchStatus = function (e) {
                return this.statusWatcher.watch(e);
            };

            e.prototype.query = function (e, t, n) {
                return a(this, void 0, void 0, function () {
                    var a, r, m, s;
                    return i(this, function (i) {
                        switch (i.label) {
                            case 0:
                                if (!(a = this.definitions.operations[e])) {
                                    throw new o.GraphqlUnknownError("Unknown operation");
                                }

                                if ("query" !== a.kind) {
                                    throw new o.GraphqlUnknownError("Invalid operation kind");
                                }

                                r = "cache-first";

                                if (n && n.fetchPolicy) {
                                    r = n.fetchPolicy;
                                }

                                if ("cache-and-network" === r) {
                                    throw new o.GraphqlUnknownError("Unable to use CACHE_AND_NETWORK policy for non watchable query");
                                }

                                return "cache-first" !== r ? [3, 2] : [4, this.store.readQuery(a, t)];

                            case 1:
                                if ((m = i.sent()).result) {
                                    return [2, m.value];
                                }

                                i.label = 2;

                            case 2:
                                return [4, this.transport.operation(a, t)];

                            case 3:
                                if ("result" !== (s = i.sent()).type) {
                                    return [3, 8];
                                }

                                i.label = 4;

                            case 4:
                                i.trys.push([4, 6,, 7]);
                                return [4, this.store.mergeResponse(a, t, s.value)];

                            case 5:
                                i.sent();
                                return [3, 7];

                            case 6:
                                throw i.sent(), console.warn("Mailformed response: ", s.value), new o.GraphqlUnknownError("Mailformed response");

                            case 7:
                                return [2, s.value];

                            case 8:
                                throw "error" === s.type ? new o.GraphqlError(s.errors) : new o.GraphqlUnknownError("Internal error");

                            case 9:
                                return [2];
                        }
                    });
                });
            };

            e.prototype.queryWatch = function (e, t, n) {
                var m = this,
                    s = this.definitions.operations[e],
                    _ = "cache-first";

                if (n && n.fetchPolicy) {
                    _ = n.fetchPolicy;
                }

                if (!s) {
                    throw new o.GraphqlUnknownError("Unknown operation");
                }

                if ("query" !== s.kind) {
                    throw new o.GraphqlUnknownError("Invalid operation kind: " + s.kind);
                }

                var y,
                    c,
                    u,
                    l,
                    g = new d(),
                    h = new Map(),
                    S = false,
                    f = new Promise(function (e, t) {
                    y = e;
                    c = t;
                }),
                    I = false,
                    b = false,
                    v = function (e) {
                    var t, n;

                    if (!I) {
                        g.hasError = true;
                        g.hasValue = false;
                        g.value = void 0;
                        g.error = e;

                        if (!S) {
                            S = true;
                            c();
                        }

                        if (!S) {
                            S = true;
                            c();
                        }
                    }
                };

                l = function () {
                    return a(m, void 0, void 0, function () {
                        return i(this, function (e) {
                            this.store.readQueryAndWatch(s, t, function (e) {
                                if (!I) {
                                    if ("value" === e.type) {
                                        !function (e) {
                                            var t, n;

                                            if (!I) {
                                                g.hasError = false;
                                                g.hasValue = true;
                                                g.value = e;
                                                g.error = void 0;

                                                if (!S) {
                                                    S = true;
                                                    y();
                                                }

                                                if (!S) {
                                                    S = true;
                                                    y();
                                                }
                                            }
                                        }(e.value);

                                        if (!("cache-and-network" !== _ || b)) {
                                            u(false);
                                        }
                                    } else {
                                        if ("missing" === e.type) {
                                            u(true);
                                        } else {
                                            if ("updated" === e.type) {
                                                l();
                                            }
                                        }
                                    }
                                }
                            });
                            return [2];
                        });
                    });
                };

                u = function (e) {
                    return a(m, void 0, void 0, function () {
                        var n;
                        return i(this, function (a) {
                            switch (a.label) {
                                case 0:
                                    b = true;
                                    return [4, this.transport.operation(s, t)];

                                case 1:
                                    if ("result" !== (n = a.sent()).type) {
                                        return [3, 6];
                                    }

                                    a.label = 2;

                                case 2:
                                    a.trys.push([2, 4,, 5]);
                                    return [4, this.store.mergeResponse(s, t, n.value)];

                                case 3:
                                    a.sent();
                                    return [3, 5];

                                case 4:
                                    a.sent();
                                    console.warn("Mailformed response: ", n.value);
                                    return I ? [2] : e ? (v(new o.GraphqlUnknownError("Mailformed response")), [2]) : [3, 5];

                                case 5:
                                    return I ? [2] : (e && l(), [3, 7]);

                                case 6:
                                    if ("error" !== n.type) {
                                        throw new o.GraphqlUnknownError("Internal Error");
                                    }

                                    e && v(new o.GraphqlError(n.errors)), a.label = 7;

                                case 7:
                                    return [2];
                            }
                        });
                    });
                };

                if ("cache-first" === _ || "cache-and-network" === _) {
                    l();
                } else {
                    u(true);
                }

                return {
                    subscribe: function (e) {
                        var t = p.randomKey();
                        h.set(t, e);
                        return function () {
                            h.delete(t);
                        };
                    },
                    currentResult: function () {
                        return g.hasError ? {
                            error: g.error
                        } : g.hasValue ? {
                            data: g.value
                        } : void 0;
                    },
                    result: function () {
                        return f;
                    },
                    destroy: function () {
                        if (!I) {
                            I = true;
                        }
                    }
                };
            };

            e.prototype.mutate = function (e, t, n) {
                return a(this, void 0, void 0, function () {
                    var n, a;
                    return i(this, function (i) {
                        switch (i.label) {
                            case 0:
                                if (!(n = this.definitions.operations[e])) {
                                    throw new o.GraphqlUnknownError("Unknown operation");
                                }

                                if ("mutation" !== n.kind) {
                                    throw new o.GraphqlUnknownError("Invalid operation kind");
                                }

                                return [4, this.transport.operation(n, t)];

                            case 1:
                                if ("result" !== (a = i.sent()).type) {
                                    return [3, 6];
                                }

                                i.label = 2;

                            case 2:
                                i.trys.push([2, 4,, 5]);
                                return [4, this.store.mergeResponse(n, t, a.value)];

                            case 3:
                                i.sent();
                                return [3, 5];

                            case 4:
                                throw i.sent(), console.warn("Mailformed response: ", a.value), new o.GraphqlUnknownError("Mailformed response");

                            case 5:
                                return [2, a.value];

                            case 6:
                                throw "error" === a.type ? new o.GraphqlError(a.errors) : new o.GraphqlUnknownError("Internal Error");

                            case 7:
                                return [2];
                        }
                    });
                });
            };

            e.prototype.subscribe = function (e, t, n, r) {
                var m = this,
                    s = this.definitions.operations[t];

                if (!s) {
                    throw new o.GraphqlUnknownError("Unknown operation");
                }

                if ("subscription" !== s.kind) {
                    throw new o.GraphqlUnknownError("Invalid operation kind");
                }

                var _ = false,
                    p = this.transport.subscription(s, n, function (t) {
                    if (!_) {
                        if ("completed" === t.type) {
                            _ = true;
                            p();
                            e({
                                type: "stopped",
                                error: new o.GraphqlUnknownError("Subscription stopped")
                            });
                        } else if ("error" === t.type) {
                            _ = true;
                            p();
                            e({
                                type: "stopped",
                                error: new o.GraphqlError(t.errors)
                            });
                        } else {
                            if ("result" !== t.type) {
                                throw new o.GraphqlUnknownError("Internal Error");
                            }

                            a(m, void 0, void 0, function () {
                                var a;
                                return i(this, function (i) {
                                    switch (i.label) {
                                        case 0:
                                            i.trys.push([0, 2,, 3]);
                                            return [4, this.store.mergeResponse(s, n, t.value)];

                                        case 1:
                                            i.sent();
                                            return [3, 3];

                                        case 2:
                                            a = i.sent();
                                            console.warn(a);

                                            if (!_) {
                                                _ = true;
                                                p();
                                                e({
                                                    type: "stopped",
                                                    error: new o.GraphqlUnknownError("Mailformed message")
                                                });
                                            }

                                            return [2];

                                        case 3:
                                            if (!_) {
                                                e({
                                                    type: "message",
                                                    message: t.value
                                                });
                                            }

                                            return [2];
                                    }
                                });
                            });
                        }
                    }
                });

                return {
                    destroy: function () {
                        if (!_) {
                            _ = true;
                            p();
                        }
                    }
                };
            };

            e.prototype.updateQuery = function (e, t, n) {
                return a(this, void 0, void 0, function () {
                    var a, r;
                    return i(this, function (i) {
                        switch (i.label) {
                            case 0:
                                return [4, this.readQuery(t, n)];

                            case 1:
                                return (a = i.sent()) && (r = e(a)) ? [4, this.writeQuery(r, t, n)] : [3, 3];

                            case 2:
                                i.sent();
                                return [2, true];

                            case 3:
                                return [2, false];
                        }
                    });
                });
            };

            e.prototype.readQuery = function (e, t) {
                return a(this, void 0, void 0, function () {
                    var n;
                    return i(this, function (a) {
                        switch (a.label) {
                            case 0:
                                return [4, this.store.readQuery(this.definitions.operations[e], t)];

                            case 1:
                                return (n = a.sent()).result ? [2, n.value] : [2, null];
                        }
                    });
                });
            };

            e.prototype.writeQuery = function (e, t, n) {
                return a(this, void 0, void 0, function () {
                    return i(this, function (a) {
                        switch (a.label) {
                            case 0:
                                return [4, this.store.mergeResponse(this.definitions.operations[t], n, e)];

                            case 1:
                                a.sent();
                                return [2];
                        }
                    });
                });
            };

            return e;
        }();

        t.WebEngine = y;
    },
    b4Gh: function (e, t, n) {
        "use strict";

        var a = this && this.__awaiter || function (e, t, n, a) {
            return new (n || (n = Promise))(function (i, r) {
                function o(e) {
                    try {
                        s(a.next(e));
                    } catch (t) {
                        r(t);
                    }
                }

                function m(e) {
                    try {
                        s(a.throw(e));
                    } catch (t) {
                        r(t);
                    }
                }

                function s(e) {
                    var t;

                    if (e.done) {
                        i(e.value);
                    } else {
                        (t = e.value, t instanceof n ? t : new n(function (e) {
                            e(t);
                        })).then(o, m);
                    }
                }

                s((a = a.apply(e, t || [])).next());
            });
        },
            i = this && this.__generator || function (e, t) {
            var n,
                a,
                i,
                r,
                o = {
                label: 0,
                sent: function () {
                    if (1 & i[0]) {
                        throw i[1];
                    }

                    return i[1];
                },
                trys: [],
                ops: []
            };
            r = {
                next: m(0),
                throw: m(1),
                return: m(2)
            };

            if ("function" == typeof Symbol) {
                r[Symbol.iterator] = function () {
                    return this;
                };
            }

            return r;

            function m(r) {
                return function (m) {
                    return function (r) {
                        if (n) {
                            throw new TypeError("Generator is already executing.");
                        }

                        for (; o;) {
                            try {
                                n = 1;

                                if (a && (i = 2 & r[0] ? a.return : r[0] ? a.throw || ((i = a.return) && i.call(a), 0) : a.next) && !(i = i.call(a, r[1])).done) {
                                    return i;
                                }

                                switch (a = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                    case 0:
                                    case 1:
                                        i = r;
                                        break;

                                    case 4:
                                        o.label++;
                                        return {
                                            value: r[1],
                                            done: false
                                        };

                                    case 5:
                                        o.label++, a = r[1], r = [0];
                                        continue;

                                    case 7:
                                        r = o.ops.pop(), o.trys.pop();
                                        continue;

                                    default:
                                        if (!(i = (i = o.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                            o = 0;
                                            continue;
                                        }

                                        if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                            o.label = r[1];
                                            break;
                                        }

                                        if (6 === r[0] && o.label < i[1]) {
                                            o.label = i[1];
                                            i = r;
                                            break;
                                        }

                                        if (i && o.label < i[2]) {
                                            o.label = i[2];
                                            o.ops.push(r);
                                            break;
                                        }

                                        i[2] && o.ops.pop(), o.trys.pop();
                                        continue;
                                }

                                r = t.call(e, o);
                            } catch (m) {
                                r = [6, m];
                                a = 0;
                            } finally {
                                n = i = 0;
                            }
                        }

                        if (5 & r[0]) {
                            throw r[1];
                        }

                        return {
                            value: r[0] ? r[1] : void 0,
                            done: true
                        };
                    }([r, m]);
                };
            }
        },
            r = this && this.__values || function (e) {
            var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                a = 0;

            if (n) {
                return n.call(e);
            }

            if (e && "number" == typeof e.length) {
                return {
                    next: function () {
                        if (e && a >= e.length) {
                            e = void 0;
                        }

                        return {
                            value: e && e[a++],
                            done: !e
                        };
                    }
                };
            }

            throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
        };

        Object.defineProperty(t, "__esModule", {
            value: true
        });

        var o = n("l/dd"),
            m = function () {
            function e() {
                this.persistence = new o.PersistenceEmptyProvider();
            }

            e.prototype.saveRecords = function (e) {
                return a(this, void 0, void 0, function () {
                    return i(this, function (t) {
                        switch (t.label) {
                            case 0:
                                return [4, this.persistence.saveRecords(e)];

                            case 1:
                                t.sent();
                                return [2];
                        }
                    });
                });
            };

            e.prototype.loadRecords = function (e) {
                return a(this, void 0, void 0, function () {
                    var t, n, a, o, m, s, _, p;

                    return i(this, function (i) {
                        switch (i.label) {
                            case 0:
                                return [4, this.persistence.loadRecords(e)];

                            case 1:
                                t = i.sent(), n = {};

                                try {
                                    a = r(e);

                                    for (o = a.next(); !o.done; o = a.next()) {
                                        m = o.value;
                                        s = t[m];
                                        n[m] = s || {
                                            key: m,
                                            fields: {}
                                        };
                                    }
                                } catch (d) {
                                    _ = {
                                        error: d
                                    };
                                } finally {
                                    try {
                                        if (o && !o.done && (p = a.return)) {
                                            p.call(a);
                                        }
                                    } finally {
                                        if (_) {
                                            throw _.error;
                                        }
                                    }
                                }

                                return [2, n];
                        }
                    });
                });
            };

            return e;
        }();

        t.WebPersistence = m;
    },
    b95h: function (e, t, n) {
        var a = n("UwCj"),
            i = n("jHgz");
        e.exports = n("ObEa") ? function (e, t, n) {
            return a.f(e, t, i(1, n));
        } : function (e, t, n) {
            e[t] = n;
            return e;
        };
    },
    bDEp: function (e, t, n) {
        "use strict";

        Object.defineProperty(t, "__esModule", {
            value: true
        });
        const a = n("nlML");

        t.disableAll = function () {
            a.LoggingConfig.disableAll();
        };

        t.enableAll = function () {
            a.LoggingConfig.enableAll();
        };

        t.disableTag = function (e) {
            a.LoggingConfig.disableTag(e);
        };

        t.enableTag = function (e) {
            a.LoggingConfig.enableTag(e);
        };
    },
    cPju: function (e, t, n) {
        "use strict";

        var a = this && this.__awaiter || function (e, t, n, a) {
            return new (n || (n = Promise))(function (i, r) {
                function o(e) {
                    try {
                        s(a.next(e));
                    } catch (t) {
                        r(t);
                    }
                }

                function m(e) {
                    try {
                        s(a.throw(e));
                    } catch (t) {
                        r(t);
                    }
                }

                function s(e) {
                    var t;

                    if (e.done) {
                        i(e.value);
                    } else {
                        (t = e.value, t instanceof n ? t : new n(function (e) {
                            e(t);
                        })).then(o, m);
                    }
                }

                s((a = a.apply(e, t || [])).next());
            });
        },
            i = this && this.__generator || function (e, t) {
            var n,
                a,
                i,
                r,
                o = {
                label: 0,
                sent: function () {
                    if (1 & i[0]) {
                        throw i[1];
                    }

                    return i[1];
                },
                trys: [],
                ops: []
            };
            r = {
                next: m(0),
                throw: m(1),
                return: m(2)
            };

            if ("function" == typeof Symbol) {
                r[Symbol.iterator] = function () {
                    return this;
                };
            }

            return r;

            function m(r) {
                return function (m) {
                    return function (r) {
                        if (n) {
                            throw new TypeError("Generator is already executing.");
                        }

                        for (; o;) {
                            try {
                                n = 1;

                                if (a && (i = 2 & r[0] ? a.return : r[0] ? a.throw || ((i = a.return) && i.call(a), 0) : a.next) && !(i = i.call(a, r[1])).done) {
                                    return i;
                                }

                                switch (a = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                    case 0:
                                    case 1:
                                        i = r;
                                        break;

                                    case 4:
                                        o.label++;
                                        return {
                                            value: r[1],
                                            done: false
                                        };

                                    case 5:
                                        o.label++, a = r[1], r = [0];
                                        continue;

                                    case 7:
                                        r = o.ops.pop(), o.trys.pop();
                                        continue;

                                    default:
                                        if (!(i = (i = o.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                            o = 0;
                                            continue;
                                        }

                                        if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                            o.label = r[1];
                                            break;
                                        }

                                        if (6 === r[0] && o.label < i[1]) {
                                            o.label = i[1];
                                            i = r;
                                            break;
                                        }

                                        if (i && o.label < i[2]) {
                                            o.label = i[2];
                                            o.ops.push(r);
                                            break;
                                        }

                                        i[2] && o.ops.pop(), o.trys.pop();
                                        continue;
                                }

                                r = t.call(e, o);
                            } catch (m) {
                                r = [6, m];
                                a = 0;
                            } finally {
                                n = i = 0;
                            }
                        }

                        if (5 & r[0]) {
                            throw r[1];
                        }

                        return {
                            value: r[0] ? r[1] : void 0,
                            done: true
                        };
                    }([r, m]);
                };
            }
        },
            r = this && this.__values || function (e) {
            var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                a = 0;

            if (n) {
                return n.call(e);
            }

            if (e && "number" == typeof e.length) {
                return {
                    next: function () {
                        if (e && a >= e.length) {
                            e = void 0;
                        }

                        return {
                            value: e && e[a++],
                            done: !e
                        };
                    }
                };
            }

            throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
        };

        Object.defineProperty(t, "__esModule", {
            value: true
        });

        var o = n("WsZc"),
            m = n("MGe+"),
            s = function () {
            return function () {
                this.hasValue = false;
                this.hasError = false;
            };
        }(),
            _ = function () {
            function e() {
                this.handlers = new Map();
                this.queryWatches = new Map();
                this.statusWatcher = new o.Watcher();
                this.statusWatcher.setState({
                    status: "connecting"
                });
            }

            Object.defineProperty(e.prototype, "status", {
                get: function () {
                    return this.statusWatcher.getState();
                },
                enumerable: true,
                configurable: true
            });

            e.prototype.watchStatus = function (e) {
                return this.statusWatcher.watch(e);
            };

            e.prototype.query = function (e, t, n) {
                return a(this, void 0, void 0, function () {
                    var a, r;
                    return i(this, function (i) {
                        switch (i.label) {
                            case 0:
                                a = this.nextKey();
                                r = this.registerPromiseHandler(a);
                                this.postQuery(a, e, t, n);
                                return [4, r];

                            case 1:
                                return [2, i.sent()];
                        }
                    });
                });
            };

            e.prototype.queryWatch = function (e, t, n) {
                var a,
                    i,
                    o = this,
                    _ = this.nextKey(),
                    p = new s(),
                    d = new Map(),
                    y = false,
                    c = new Promise(function (e, t) {
                    a = e;
                    i = t;
                }),
                    u = false;

                this.queryWatches.set(_, p);
                this.handlers.set(_, function (e, t) {
                    var n, o;

                    if (!u) {
                        if (t) {
                            p.hasError = true;
                            p.hasValue = false;
                            p.value = void 0;
                            p.error = t;
                        } else {
                            p.hasError = false;
                            p.hasValue = true;
                            p.value = e;
                            p.error = void 0;
                        }

                        if (!y) {
                            y = true;

                            if (p.hasError) {
                                i();
                            } else {
                                if (p.hasValue) {
                                    a();
                                }
                            }
                        }

                        if (!y) {
                            y = true;

                            if (p.hasError) {
                                i();
                            } else {
                                if (p.hasValue) {
                                    a();
                                }
                            }
                        }
                    }
                });
                this.postQueryWatch(_, e, t, n);
                return {
                    subscribe: function (e) {
                        var t = m.randomKey();
                        d.set(t, e);
                        return function () {
                            d.delete(t);
                        };
                    },
                    currentResult: function () {
                        return p.hasError ? {
                            error: p.error
                        } : p.hasValue ? {
                            data: p.value
                        } : void 0;
                    },
                    result: function () {
                        return c;
                    },
                    destroy: function () {
                        if (!u) {
                            u = true;
                            o.handlers.delete(_);
                            o.postQueryWatchEnd(_);
                        }
                    }
                };
            };

            e.prototype.mutate = function (e, t) {
                return a(this, void 0, void 0, function () {
                    var n, a;
                    return i(this, function (i) {
                        switch (i.label) {
                            case 0:
                                n = this.nextKey();
                                a = this.registerPromiseHandler(n);
                                this.postMutation(n, e, t);
                                return [4, a];

                            case 1:
                                return [2, i.sent()];
                        }
                    });
                });
            };

            e.prototype.subscribe = function (e, t, n, a) {
                var i = this,
                    r = false,
                    o = this.nextKey();
                this.handlers.set(o, function (t, n) {
                    if (!r) {
                        if (n) {
                            i.handlers.delete(o);
                            e({
                                type: "stopped",
                                error: n
                            });
                            i.postUnsubscribe(o);
                            r = true;
                        } else {
                            e({
                                type: "message",
                                message: t
                            });
                        }
                    }
                });
                this.postSubscribe(o, t, n, a);
                return {
                    destroy: function () {
                        if (!r) {
                            r = true;
                            i.handlers.delete(o);
                            i.postUnsubscribe(o);
                        }
                    }
                };
            };

            e.prototype.updateQuery = function (e, t, n) {
                return a(this, void 0, void 0, function () {
                    var a, r;
                    return i(this, function (i) {
                        switch (i.label) {
                            case 0:
                                return [4, this.readQuery(t, n)];

                            case 1:
                                return (a = i.sent()) && (r = e(a)) ? [4, this.writeQuery(r, t, n)] : [3, 3];

                            case 2:
                                i.sent();
                                return [2, true];

                            case 3:
                                return [2, false];
                        }
                    });
                });
            };

            e.prototype.readQuery = function (e, t) {
                return a(this, void 0, void 0, function () {
                    var n, a;
                    return i(this, function (i) {
                        switch (i.label) {
                            case 0:
                                n = this.nextKey();
                                a = this.registerPromiseHandler(n);
                                this.postReadQuery(n, e, t);
                                return [4, a];

                            case 1:
                                return [2, i.sent()];
                        }
                    });
                });
            };

            e.prototype.writeQuery = function (e, t, n) {
                return a(this, void 0, void 0, function () {
                    var a, r;
                    return i(this, function (i) {
                        switch (i.label) {
                            case 0:
                                a = this.nextKey();
                                r = this.registerPromiseHandler(a);
                                this.postWriteQuery(a, e, t, n);
                                return [4, r];

                            case 1:
                                i.sent();
                                return [2];
                        }
                    });
                });
            };

            e.prototype.operationUpdated = function (e, t) {
                var n = this.handlers.get(e);

                if (n) {
                    n(t, void 0);
                }
            };

            e.prototype.operationFailed = function (e, t) {
                var n = this.handlers.get(e);

                if (n) {
                    n(void 0, t);
                }
            };

            e.prototype.nextKey = function () {
                return m.randomKey();
            };

            e.prototype.registerPromiseHandler = function (e) {
                var t = this;
                return new Promise(function (n, a) {
                    t.handlers.set(e, function (i, r) {
                        t.handlers.delete(e);

                        if (r) {
                            a(r);
                        } else {
                            n(i);
                        }
                    });
                });
            };

            return e;
        }();

        t.GraphqlBridgedEngine = _;
    },
    cSMM: function (e, t, n) {
        "use strict";

        var a = this && this.__assign || function () {
            return (a = Object.assign || function (e) {
                for (var t, n = 1, a = arguments.length; n < a; n++) {
                    for (var i in t = arguments[n]) {
                        if (Object.prototype.hasOwnProperty.call(t, i)) {
                            e[i] = t[i];
                        }
                    }
                }

                return e;
            }).apply(this, arguments);
        },
            i = this && this.__read || function (e, t) {
            var n = "function" == typeof Symbol && e[Symbol.iterator];

            if (!n) {
                return e;
            }

            var a,
                i,
                r = n.call(e),
                o = [];

            try {
                for (; (void 0 === t || t-- > 0) && !(a = r.next()).done;) {
                    o.push(a.value);
                }
            } catch (m) {
                i = {
                    error: m
                };
            } finally {
                try {
                    if (a && !a.done && (n = r.return)) {
                        n.call(r);
                    }
                } finally {
                    if (i) {
                        throw i.error;
                    }
                }
            }

            return o;
        },
            r = this && this.__importStar || function (e) {
            if (e && e.__esModule) {
                return e;
            }

            var t = {};

            if (null != e) {
                for (var n in e) {
                    if (Object.hasOwnProperty.call(e, n)) {
                        t[n] = e[n];
                    }
                }
            }

            t.default = e;
            return t;
        };

        Object.defineProperty(t, "__esModule", {
            value: true
        });

        var o = n("vJUR"),
            m = r(n("ERkP")),
            s = n("O9eG"),
            _ = function () {
            function e(e) {
                var t = this;

                this.close = function () {
                    t.engine.close();
                };

                this.engine = e.engine;

                if (e.globalCache) {
                    this.globalCache = e.globalCache;
                } else {
                    this.globalCache = new o.QueryCache();
                }

                if (e && e.defaultPriority) {
                    this.defaultPriority = e.defaultPriority;
                } else {
                    this.defaultPriority = null;
                }

                Object.freeze(this);
            }

            e.prototype.query = function (e, t, n) {
                return this.engine.query(e, t, n);
            };

            e.prototype.refetch = function (e, t, n) {
                return this.engine.query(e, t, a({
                    fetchPolicy: "network-only"
                }, n));
            };

            e.prototype.updateQuery = function (e, t, n) {
                return this.engine.updateQuery(e, t, n);
            };

            e.prototype.mutate = function (e, t, n) {
                return this.engine.mutate(e, t, n);
            };

            e.prototype.subscribe = function (e, t, n, a) {
                return this.engine.subscribe(e, t, n, a);
            };

            e.prototype.useQuery = function (e, t, n) {
                return n && false === n.suspense ? this.useQueryNonSuspense(e, t, n) : this.useQuerySuspense(e, t, n);
            };

            e.prototype.useQueryNonSuspense = function (e, t, n) {
                var a = i(this.useObservableQuery(e, t, n), 2),
                    r = (a[0], a[1]);

                if (r && r.error) {
                    throw r.error;
                }

                return r && r.data ? r.data : null;
            };

            e.prototype.useQuerySuspense = function (e, t, n) {
                var a = i(this.useObservableQuery(e, t, n), 2),
                    r = a[0],
                    o = a[1];

                if (o && o.error) {
                    throw o.error;
                }

                if (o && o.data) {
                    return o.data;
                }

                throw r.result();
            };

            e.prototype.useObservableQuery = function (e, t, n) {
                var a = m.useContext(o.QueryCacheContext);

                if (!a && n && n.fetchPolicy && ("cache-and-network" === n.fetchPolicy || "network-only" === n.fetchPolicy)) {
                    throw Error("Unable to use cache-and-network or network-only fetch policy outside of cache context");
                }

                var r = this.getQueryWatch((a || this.globalCache).queries, e, t, n),
                    s = i(m.useState(0), 2),
                    _ = s[0],
                    p = s[1],
                    d = m.useMemo(function () {
                    return r.currentResult();
                }, [_, r]);
                m.useEffect(function () {
                    return r.subscribe(function (e) {
                        p(function (e) {
                            return e + 1;
                        });
                    });
                }, [r]);
                return [r, d];
            };

            e.prototype.getQueryWatch = function (e, t, n, i) {
                var r = void 0;

                if (null !== this.defaultPriority) {
                    r = this.defaultPriority;
                }

                var o = i && i.fetchPolicy && ("cache-and-network" === i.fetchPolicy || "network-only" === i.fetchPolicy),
                    m = i && i.fetchPolicy && i.fetchPolicy || "cache-first",
                    _ = e;

                if (!o) {
                    _ = this.globalCache.queries;
                }

                var p = t + "$" + s.keyFromObject(n) + "$" + m;

                if (_.has(p)) {
                    return _.get(p);
                }

                var d = this.engine.queryWatch(t, n, a({
                    priority: r
                }, i));

                _.set(p, d);

                return d;
            };

            return e;
        }();

        t.BaseSpaceXClient = _;
    },
    dHgG: function (e, t, n) {
        "use strict";

        var a = this && this.__values || function (e) {
            var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                a = 0;

            if (n) {
                return n.call(e);
            }

            if (e && "number" == typeof e.length) {
                return {
                    next: function () {
                        if (e && a >= e.length) {
                            e = void 0;
                        }

                        return {
                            value: e && e[a++],
                            done: !e
                        };
                    }
                };
            }

            throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
        };

        function i(e, t) {
            var n, r;

            if ("int" === e.type) {
                return e.value + "";
            }

            if ("float" === e.type) {
                return e.value + "";
            }

            if ("boolean" === e.type) {
                return e.value + "";
            }

            if ("string" === e.type) {
                return '"' + e.value + '"';
            }

            if ("null" === e.type) {
                return "null";
            }

            if ("list" === e.type) {
                return "[" + e.items.map(function (e) {
                    return i(e, t);
                }).join(",") + "]";
            }

            if ("object" === e.type) {
                var o = Object.keys(e.fields);
                o.sort();
                var m = [];

                try {
                    for (var s = a(o), _ = s.next(); !_.done; _ = s.next()) {
                        var p = _.value,
                            d = i(e.fields[p], t);

                        if (null !== d) {
                            m.push(p + ":" + d);
                        }
                    }
                } catch (c) {
                    n = {
                        error: c
                    };
                } finally {
                    try {
                        if (_ && !_.done && (r = s.return)) {
                            r.call(s);
                        }
                    } finally {
                        if (n) {
                            throw n.error;
                        }
                    }
                }

                return "{" + m.join(",") + "}";
            }

            if ("reference" === e.type) {
                var y = e.name;
                return void 0 !== t[y] ? function e(t) {
                    var n, i;

                    if (null === t) {
                        return "null";
                    }

                    if ("string" == typeof t) {
                        return '"' + t + '"';
                    }

                    if (Array.isArray(t)) {
                        return "[" + t.map(function (t) {
                            return e(t);
                        }).join(",") + "]";
                    }

                    if ("object" == typeof t) {
                        var r = Object.keys(t);
                        r.sort();
                        var o = [];

                        try {
                            for (var m = a(r), s = m.next(); !s.done; s = m.next()) {
                                var _ = s.value;
                                o.push(_ + ":" + e(t[_]));
                            }
                        } catch (p) {
                            n = {
                                error: p
                            };
                        } finally {
                            try {
                                if (s && !s.done && (i = m.return)) {
                                    i.call(m);
                                }
                            } finally {
                                if (n) {
                                    throw n.error;
                                }
                            }
                        }

                        return "{" + o.join(",") + "}";
                    }

                    return "" + t;
                }(t[y]) : null;
            }

            throw Error("Unknown InputValue");
        }

        Object.defineProperty(t, "__esModule", {
            value: true
        });

        t.selectorKey = function (e, t, n) {
            var r, o;

            if (0 === Object.keys(t).length) {
                return e;
            }

            var m = Object.keys(t);
            m.sort();
            var s = [];

            try {
                for (var _ = a(m), p = _.next(); !p.done; p = _.next()) {
                    var d = p.value,
                        y = i(t[d], n);

                    if (null !== y) {
                        s.push(d + ":" + y);
                    }
                }
            } catch (c) {
                r = {
                    error: c
                };
            } finally {
                try {
                    if (p && !p.done && (o = _.return)) {
                        o.call(_);
                    }
                } finally {
                    if (r) {
                        throw r.error;
                    }
                }
            }

            return 0 === s.length ? e : e + "(" + s.join(",") + ")";
        };
    },
    dWRk: function (e, t, n) {
        var a = n("Vzpu");

        e.exports = function (e, t, n) {
            a(e);

            if (void 0 === t) {
                return e;
            }

            switch (n) {
                case 1:
                    return function (n) {
                        return e.call(t, n);
                    };

                case 2:
                    return function (n, a) {
                        return e.call(t, n, a);
                    };

                case 3:
                    return function (n, a, i) {
                        return e.call(t, n, a, i);
                    };
            }

            return function () {
                return e.apply(t, arguments);
            };
        };
    },
    fRV1: function (e, t) {
        var n;

        n = function () {
            return this;
        }();

        try {
            n = n || new Function("return this")();
        } catch (a) {
            if ("object" == typeof window) {
                n = window;
            }
        }

        e.exports = n;
    },
    gVk7: function (e, t, n) {
        "use strict";

        var a = this && this.__values || function (e) {
            var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                a = 0;

            if (n) {
                return n.call(e);
            }

            if (e && "number" == typeof e.length) {
                return {
                    next: function () {
                        if (e && a >= e.length) {
                            e = void 0;
                        }

                        return {
                            value: e && e[a++],
                            done: !e
                        };
                    }
                };
            }

            throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
        };

        Object.defineProperty(t, "__esModule", {
            value: true
        });

        var i = n("zOtc"),
            r = n("ZOSw"),
            o = function () {
            function e(e) {
                this.onReceiveData = null;
                this.onReceiveError = null;
                this.onReceiveCompleted = null;
                this.onSessionLost = null;
                this.onConnected = null;
                this.onDisconnected = null;
                this.state = "waiting";
                this.pending = new Map();
                this.isStarted = false;
                this.isStopped = false;
                this.client = null;
                this.opts = e;
            }

            e.prototype.request = function (e, t) {
                if ("waiting" === this.state || "connecting" === this.state) {
                    this.pending.set(e, t);
                } else if ("starting" === this.state) {
                    this.pending.set(e, t);
                    this.writeToSocket({
                        type: "start",
                        id: e,
                        payload: {
                            query: t.query,
                            name: t.name,
                            variables: t.variables
                        }
                    });
                } else if ("started" === this.state) {
                    this.writeToSocket({
                        type: "start",
                        id: e,
                        payload: {
                            query: t.query,
                            name: t.name,
                            variables: t.variables
                        }
                    });
                } else if ("completed" !== this.state) {
                    throw new i.GraphqlUnknownError("Unknown state: " + this.state);
                }
            };

            e.prototype.cancel = function (e) {
                if ("waiting" === this.state || "connecting" === this.state) {
                    this.pending.delete(e);
                } else if ("starting" === this.state) {
                    this.pending.delete(e);
                    this.writeToSocket({
                        type: "stop",
                        id: e
                    });
                } else if ("started" === this.state) {
                    this.writeToSocket({
                        type: "stop",
                        id: e
                    });
                } else if ("completed" !== this.state) {
                    throw new i.GraphqlUnknownError("Unknown state: " + this.state);
                }
            };

            e.prototype.connect = function () {
                if (!this.isStarted) {
                    this.isStarted = true;
                    this.doConnect();
                }
            };

            e.prototype.close = function () {
                if (!this.isStopped) {
                    if (!this.isStarted) {
                        throw new i.GraphqlUnknownError("Socket was not started");
                    }

                    this.isStopped = true;
                    this.pending.clear();
                }
            };

            e.prototype.onMessage = function (e) {
                var t = this;

                if (this.opts.logging) {
                    console.log("[WS] <<< " + JSON.stringify(e));
                }

                if ("ka" === e.type) {
                    ;
                } else if ("connection_ack" === e.type) {
                    if ("starting" === this.state) {
                        this.state = "started";
                        this.pending.clear();

                        if (this.opts.logging) {
                            console.log("[WS] Started");
                        }

                        if (this.pingTimeout) {
                            clearTimeout(this.pingTimeout);
                        }

                        this.pingTimeout = setTimeout(function () {
                            if ("openland" === t.opts.protocol) {
                                t.writeToSocket({
                                    type: "ping"
                                });
                            }
                        }, 1e3);

                        if (this.onConnected) {
                            this.onConnected();
                        }
                    }
                } else if ("ping" === e.type) {
                    if ("openland" === this.opts.protocol) {
                        this.writeToSocket({
                            type: "pong"
                        });
                    }
                } else if ("pong" === e.type) {
                    if (this.pingTimeout) {
                        clearTimeout(this.pingTimeout);
                        this.pingTimeout = null;
                    }

                    if (this.pingTimeout) {
                        clearTimeout(this.pingTimeout);
                        this.pingTimeout = null;
                    }
                } else if ("data" === e.type) {
                    var n = e.id,
                        a = e.payload,
                        i = a.errors;

                    if (i) {
                        if (this.onReceiveError) {
                            this.onReceiveError(n, i);
                        }
                    } else {
                        var r = a.data;

                        if (this.onReceiveData) {
                            this.onReceiveData(n, r);
                        }
                    }
                } else if ("error" === e.type) {
                    console.warn(e);
                } else {
                    if ("connection_error" === e.type && e.payload && "string" == typeof e.payload.message && this.opts.onConnectionFailed) {
                        this.opts.onConnectionFailed(e.payload.message);
                    }
                }
            };

            e.prototype.doConnect = function () {
                var e = this;

                if ("waiting" !== this.state) {
                    throw Error("Unexpected state");
                }

                this.state = "connecting";

                if (this.opts.logging) {
                    console.log("[WS] Connecting");
                }

                var t = this.opts.protocol || "apollo",
                    n = new r.ThrustedSocket({
                    url: this.opts.endpoint,
                    timeout: "openland" === t ? 5e3 : 1e4,
                    protocol: "apollo" === t ? "graphql-ws" : void 0,
                    engine: this.opts.ws
                });

                n.onopen = function () {
                    var i, r;

                    if (e.client === n) {
                        if ("connecting" !== e.state) {
                            throw Error("Unexpected state");
                        }

                        e.state = "starting";

                        if (e.opts.logging) {
                            console.log("[WS] Starting");
                        }

                        if ("apollo" === t) {
                            e.writeToSocket({
                                type: "connection_init",
                                payload: e.opts.connectionParams || {}
                            });
                        } else {
                            e.writeToSocket({
                                protocol_v: 2,
                                type: "connection_init",
                                payload: e.opts.connectionParams || {}
                            });
                        }

                        try {
                            for (var o = a(e.pending), m = o.next(); !m.done; m = o.next()) {
                                var s = m.value;
                                e.writeToSocket({
                                    type: "start",
                                    id: s[0],
                                    payload: s[1]
                                });
                            }
                        } catch (_) {
                            i = {
                                error: _
                            };
                        } finally {
                            try {
                                if (m && !m.done && (r = o.return)) {
                                    r.call(o);
                                }
                            } finally {
                                if (i) {
                                    throw i.error;
                                }
                            }
                        }
                    }
                };

                n.onclose = function () {
                    if (e.client === n) {
                        var t = "started" === e.state;
                        e.stopClient();
                        e.state = "waiting";

                        if (e.opts.logging) {
                            console.log("[WS] Waiting");
                        }

                        if (t) {
                            if (e.opts.logging) {
                                console.log("[WS] Session Lost");
                            }

                            if (e.onDisconnected) {
                                e.onDisconnected();
                            }

                            if (e.onSessionLost) {
                                e.onSessionLost();
                            }
                        }

                        if (t) {
                            if (e.opts.logging) {
                                console.log("[WS] Session Lost");
                            }

                            if (e.onDisconnected) {
                                e.onDisconnected();
                            }

                            if (e.onSessionLost) {
                                e.onSessionLost();
                            }
                        }
                    }
                };

                n.onmessage = function (t) {
                    if (e.client === n) {
                        e.onMessage(JSON.parse(t));
                    }
                };

                this.client = n;
            };

            e.prototype.stopClient = function () {
                var e = this.client;
                this.client = null;
                e.onclose = null;
                e.onopen = null;
                e.onmessage = null;
                e.close();

                if (this.pingTimeout) {
                    clearTimeout(this.pingTimeout);
                    this.pingTimeout = null;
                }
            };

            e.prototype.writeToSocket = function (e) {
                this.client.send(JSON.stringify(e));
            };

            return e;
        }();

        t.ApolloTransportLayer = o;
    },
    hLw4: function (e, t, n) {
        "use strict"; /** @license React v16.8.4
                       * react.production.min.js
                       *
                       * Copyright (c) Facebook, Inc. and its affiliates.
                       *
                       * This source code is licensed under the MIT license found in the
                       * LICENSE file in the root directory of this source tree.
                       */

        var a = n("maj8"),
            i = "function" == typeof Symbol && Symbol.for,
            r = i ? Symbol.for("react.element") : 60103,
            o = i ? Symbol.for("react.portal") : 60106,
            m = i ? Symbol.for("react.fragment") : 60107,
            s = i ? Symbol.for("react.strict_mode") : 60108,
            _ = i ? Symbol.for("react.profiler") : 60114,
            p = i ? Symbol.for("react.provider") : 60109,
            d = i ? Symbol.for("react.context") : 60110,
            y = i ? Symbol.for("react.concurrent_mode") : 60111,
            c = i ? Symbol.for("react.forward_ref") : 60112,
            u = i ? Symbol.for("react.suspense") : 60113,
            l = i ? Symbol.for("react.memo") : 60115,
            g = i ? Symbol.for("react.lazy") : 60116,
            h = "function" == typeof Symbol && Symbol.iterator;

        function S(e) {
            for (var t = arguments.length - 1, n = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, a = 0; a < t; a++) {
                n += "&args[]=" + encodeURIComponent(arguments[a + 1]);
            }

            !function (e, t, n, a, i, r, o, m) {
                if (!e) {
                    e = void 0;

                    if (void 0 === t) {
                        e = Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
                    } else {
                        var s = [n, a, i, r, o, m],
                            _ = 0;
                        (e = Error(t.replace(/%s/g, function () {
                            return s[_++];
                        }))).name = "Invariant Violation";
                    }

                    throw e.framesToPop = 1, e;
                }
            }(false, "Minified React error #" + e + "; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ", n);
        }

        var f = {
            isMounted: function () {
                return false;
            },
            enqueueForceUpdate: function () {},
            enqueueReplaceState: function () {},
            enqueueSetState: function () {}
        },
            I = {};

        function b(e, t, n) {
            this.props = e;
            this.context = t;
            this.refs = I;
            this.updater = n || f;
        }

        function v() {}

        function M(e, t, n) {
            this.props = e;
            this.context = t;
            this.refs = I;
            this.updater = n || f;
        }

        b.prototype.isReactComponent = {};

        b.prototype.setState = function (e, t) {
            if ("object" != typeof e && "function" != typeof e && null != e) {
                S("85");
            }

            this.updater.enqueueSetState(this, e, t, "setState");
        };

        b.prototype.forceUpdate = function (e) {
            this.updater.enqueueForceUpdate(this, e, "forceUpdate");
        };

        v.prototype = b.prototype;
        var C = M.prototype = new v();
        C.constructor = M;
        a(C, b.prototype);
        C.isPureReactComponent = true;
        var k = {
            current: null
        },
            R = {
            current: null
        },
            P = Object.prototype.hasOwnProperty,
            D = {
            key: true,
            ref: true,
            __self: true,
            __source: true
        };

        function w(e, t, n) {
            var a = void 0,
                i = {},
                o = null,
                m = null;

            if (null != t) {
                for (a in void 0 !== t.ref && (m = t.ref), void 0 !== t.key && (o = "" + t.key), t) {
                    if (P.call(t, a) && !D.hasOwnProperty(a)) {
                        i[a] = t[a];
                    }
                }
            }

            var s = arguments.length - 2;

            if (1 === s) {
                i.children = n;
            } else if (1 < s) {
                for (var _ = Array(s), p = 0; p < s; p++) {
                    _[p] = arguments[p + 2];
                }

                i.children = _;
            }

            if (e && e.defaultProps) {
                for (a in s = e.defaultProps) {
                    if (void 0 === i[a]) {
                        i[a] = s[a];
                    }
                }
            }

            return {
                $$typeof: r,
                type: e,
                key: o,
                ref: m,
                props: i,
                _owner: R.current
            };
        }

        function $(e) {
            return "object" == typeof e && null !== e && e.$$typeof === r;
        }

        var A = /\/+/g,
            B = [];

        function U(e, t, n, a) {
            if (B.length) {
                var i = B.pop();
                i.result = e;
                i.keyPrefix = t;
                i.func = n;
                i.context = a;
                i.count = 0;
                return i;
            }

            return {
                result: e,
                keyPrefix: t,
                func: n,
                context: a,
                count: 0
            };
        }

        function z(e) {
            e.result = null;
            e.keyPrefix = null;
            e.func = null;
            e.context = null;
            e.count = 0;

            if (10 > B.length) {
                B.push(e);
            }
        }

        function O(e, t, n) {
            return null == e ? 0 : function e(t, n, a, i) {
                var m = typeof t;

                if (!("undefined" !== m && "boolean" !== m)) {
                    t = null;
                }

                var s = false;

                if (null === t) {
                    s = true;
                } else {
                    switch (m) {
                        case "string":
                        case "number":
                            s = true;
                            break;

                        case "object":
                            switch (t.$$typeof) {
                                case r:
                                case o:
                                    s = true;
                            }

                    }
                }

                if (s) {
                    a(i, t, "" === n ? "." + q(t, 0) : n);
                    return 1;
                }

                s = 0;
                n = "" === n ? "." : n + ":";

                if (Array.isArray(t)) {
                    for (var _ = 0; _ < t.length; _++) {
                        var p = n + q(m = t[_], _);
                        s += e(m, p, a, i);
                    }
                } else {
                    p = null === t || "object" != typeof t ? null : "function" == typeof (p = h && t[h] || t["@@iterator"]) ? p : null;

                    if ("function" == typeof p) {
                        t = p.call(t);

                        for (_ = 0; !(m = t.next()).done;) {
                            s += e(m = m.value, p = n + q(m, _++), a, i);
                        }
                    } else if ("object" === m) {
                        S("31", "[object Object]" == (a = "" + t) ? "object with keys {" + Object.keys(t).join(", ") + "}" : a, "");
                    }
                }

                return s;
            }(e, "", t, n);
        }

        function q(e, t) {
            return "object" == typeof e && null !== e && null != e.key ? function (e) {
                var t = {
                    "=": "=0",
                    ":": "=2"
                };
                return "$" + ("" + e).replace(/[=:]/g, function (e) {
                    return t[e];
                });
            }(e.key) : t.toString(36);
        }

        function T(e, t) {
            e.func.call(e.context, t, e.count++);
        }

        function x(e, t, n) {
            var a = e.result,
                i = e.keyPrefix;
            e = e.func.call(e.context, t, e.count++);

            if (Array.isArray(e)) {
                F(e, a, n, function (e) {
                    return e;
                });
            } else {
                if (null != e) {
                    if ($(e)) {
                        e = function (e, t) {
                            return {
                                $$typeof: r,
                                type: e.type,
                                key: t,
                                ref: e.ref,
                                props: e.props,
                                _owner: e._owner
                            };
                        }(e, i + (!e.key || t && t.key === e.key ? "" : ("" + e.key).replace(A, "$&/") + "/") + n);
                    }

                    a.push(e);
                }
            }
        }

        function F(e, t, n, a, i) {
            var r = "";

            if (null != n) {
                r = ("" + n).replace(A, "$&/") + "/";
            }

            O(e, x, t = U(t, r, a, i));
            z(t);
        }

        function N() {
            var e = k.current;

            if (null === e) {
                S("307");
            }

            return e;
        }

        var W = {
            Children: {
                map: function (e, t, n) {
                    if (null == e) {
                        return e;
                    }

                    var a = [];
                    F(e, a, null, t, n);
                    return a;
                },
                forEach: function (e, t, n) {
                    if (null == e) {
                        return e;
                    }

                    O(e, T, t = U(null, null, t, n));
                    z(t);
                },
                count: function (e) {
                    return O(e, function () {
                        return null;
                    }, null);
                },
                toArray: function (e) {
                    var t = [];
                    F(e, t, null, function (e) {
                        return e;
                    });
                    return t;
                },
                only: function (e) {
                    if (!$(e)) {
                        S("143");
                    }

                    return e;
                }
            },
            createRef: function () {
                return {
                    current: null
                };
            },
            Component: b,
            PureComponent: M,
            createContext: function (e, t) {
                if (void 0 === t) {
                    t = null;
                }

                (e = {
                    $$typeof: d,
                    _calculateChangedBits: t,
                    _currentValue: e,
                    _currentValue2: e,
                    _threadCount: 0,
                    Provider: null,
                    Consumer: null
                }).Provider = {
                    $$typeof: p,
                    _context: e
                };
                return e.Consumer = e;
            },
            forwardRef: function (e) {
                return {
                    $$typeof: c,
                    render: e
                };
            },
            lazy: function (e) {
                return {
                    $$typeof: g,
                    _ctor: e,
                    _status: -1,
                    _result: null
                };
            },
            memo: function (e, t) {
                return {
                    $$typeof: l,
                    type: e,
                    compare: void 0 === t ? null : t
                };
            },
            useCallback: function (e, t) {
                return N().useCallback(e, t);
            },
            useContext: function (e, t) {
                return N().useContext(e, t);
            },
            useEffect: function (e, t) {
                return N().useEffect(e, t);
            },
            useImperativeHandle: function (e, t, n) {
                return N().useImperativeHandle(e, t, n);
            },
            useDebugValue: function () {},
            useLayoutEffect: function (e, t) {
                return N().useLayoutEffect(e, t);
            },
            useMemo: function (e, t) {
                return N().useMemo(e, t);
            },
            useReducer: function (e, t, n) {
                return N().useReducer(e, t, n);
            },
            useRef: function (e) {
                return N().useRef(e);
            },
            useState: function (e) {
                return N().useState(e);
            },
            Fragment: m,
            StrictMode: s,
            Suspense: u,
            createElement: w,
            cloneElement: function (e, t, n) {
                if (null == e) {
                    S("267", e);
                }

                var i = void 0,
                    o = a({}, e.props),
                    m = e.key,
                    s = e.ref,
                    _ = e._owner;

                if (null != t) {
                    if (void 0 !== t.ref) {
                        s = t.ref;
                        _ = R.current;
                    }

                    if (void 0 !== t.key) {
                        m = "" + t.key;
                    }

                    var p = void 0;

                    if (void 0 !== t.ref) {
                        s = t.ref;
                        _ = R.current;
                    }
                }

                if (1 === (i = arguments.length - 2)) {
                    o.children = n;
                } else if (1 < i) {
                    p = Array(i);

                    for (var d = 0; d < i; d++) {
                        p[d] = arguments[d + 2];
                    }

                    o.children = p;
                }

                return {
                    $$typeof: r,
                    type: e.type,
                    key: m,
                    ref: s,
                    props: o,
                    _owner: _
                };
            },
            createFactory: function (e) {
                var t = w.bind(null, e);
                t.type = e;
                return t;
            },
            isValidElement: $,
            version: "16.8.4",
            unstable_ConcurrentMode: y,
            unstable_Profiler: _,
            __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
                ReactCurrentDispatcher: k,
                ReactCurrentOwner: R,
                assign: a
            }
        },
            E = {
            default: W
        },
            G = E && W || E;
        e.exports = G.default || G;
    },
    hR4s: function (e, t) {
        var n = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();

        if ("number" == typeof __g) {
            __g = n;
        }
    },
    jHgz: function (e, t) {
        e.exports = function (e, t) {
            return {
                enumerable: !(1 & e),
                configurable: !(2 & e),
                writable: !(4 & e),
                value: t
            };
        };
    },
    jS6G: function (e, t, n) {
        "use strict";

        var a = this && this.__values || function (e) {
            var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                a = 0;

            if (n) {
                return n.call(e);
            }

            if (e && "number" == typeof e.length) {
                return {
                    next: function () {
                        if (e && a >= e.length) {
                            e = void 0;
                        }

                        return {
                            value: e && e[a++],
                            done: !e
                        };
                    }
                };
            }

            throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
        };

        Object.defineProperty(t, "__esModule", {
            value: true
        });
        var i = n("dHgG");

        function r(e, t, n, o, m) {
            var s, _;

            if ("scalar" !== t.type) {
                if ("notNull" === t.type) {
                    if ("null" !== e.type) {
                        r(e, t.inner, n, o, m);
                    }
                } else if ("list" === t.type) {
                    if ("list" === e.type) {
                        try {
                            for (var p = a(e.values), d = p.next(); !d.done; d = p.next()) {
                                r(d.value, t.inner, n, o, m);
                            }
                        } catch (y) {
                            s = {
                                error: y
                            };
                        } finally {
                            try {
                                if (d && !d.done && (_ = p.return)) {
                                    _.call(p);
                                }
                            } finally {
                                if (s) {
                                    throw s.error;
                                }
                            }
                        }
                    } else if ("null" !== e.type) {
                        throw Error("Invalid record value");
                    }
                } else if ("object" === t.type) {
                    if ("reference" === e.type) {
                        !function e(t, n, o, m, s) {
                            var _, p;

                            if (n.isInMemory(t)) {
                                var d = n.read(t);

                                try {
                                    for (var y = a(o), c = y.next(); !c.done; c = y.next()) {
                                        var u = c.value;

                                        if ("field" === u.type) {
                                            var l = i.selectorKey(u.name, u.arguments, m);

                                            if (void 0 !== d.fields[l]) {
                                                r(d.fields[l], u.fieldType, n, m, s);
                                            }
                                        } else if ("type-condition" === u.type) {
                                            if (d.fields.__typename && "string" === d.fields.__typename.type && d.fields.__typename.value === u.name) {
                                                e(t, n, u.fragmentType.selectors, m, s);
                                            }
                                        } else {
                                            if ("fragment" !== u.type) {
                                                throw Error("Unreachable code");
                                            }

                                            e(t, n, u.fragmentType.selectors, m, s);
                                        }
                                    }
                                } catch (g) {
                                    _ = {
                                        error: g
                                    };
                                } finally {
                                    try {
                                        if (c && !c.done && (p = y.return)) {
                                            p.call(y);
                                        }
                                    } finally {
                                        if (_) {
                                            throw _.error;
                                        }
                                    }
                                }
                            } else {
                                s.add(t);
                            }
                        }(e.key, n, t.selectors, o, m);
                    } else if ("null" !== e.type) {
                        throw Error("Invalid record value");
                    }
                }
            }
        }

        t.collectMissingKeysRoot = function (e, t, n, o) {
            var m,
                s,
                _ = new Set();

            try {
                for (var p = a(n.selectors), d = p.next(); !d.done; d = p.next()) {
                    var y = d.value;

                    if ("field" !== y.type) {
                        throw Error("Root query cant't contain fragments");
                    }

                    var c = e + ".$ref." + i.selectorKey(y.name, y.arguments, o);

                    if (t.isInMemory(c)) {
                        var u = t.read(c).fields.data;

                        if (u) {
                            r(u, y.fieldType, t, o, _);
                        }
                    } else {
                        _.add(c);
                    }
                }
            } catch (l) {
                m = {
                    error: l
                };
            } finally {
                try {
                    if (d && !d.done && (s = p.return)) {
                        s.call(p);
                    }
                } finally {
                    if (m) {
                        throw m.error;
                    }
                }
            }

            return _;
        };
    },
    k9qA: function (e, t, n) {
        "use strict";

        var a = this && this.__awaiter || function (e, t, n, a) {
            return new (n || (n = Promise))(function (i, r) {
                function o(e) {
                    try {
                        s(a.next(e));
                    } catch (t) {
                        r(t);
                    }
                }

                function m(e) {
                    try {
                        s(a.throw(e));
                    } catch (t) {
                        r(t);
                    }
                }

                function s(e) {
                    var t;

                    if (e.done) {
                        i(e.value);
                    } else {
                        (t = e.value, t instanceof n ? t : new n(function (e) {
                            e(t);
                        })).then(o, m);
                    }
                }

                s((a = a.apply(e, t || [])).next());
            });
        },
            i = this && this.__generator || function (e, t) {
            var n,
                a,
                i,
                r,
                o = {
                label: 0,
                sent: function () {
                    if (1 & i[0]) {
                        throw i[1];
                    }

                    return i[1];
                },
                trys: [],
                ops: []
            };
            r = {
                next: m(0),
                throw: m(1),
                return: m(2)
            };

            if ("function" == typeof Symbol) {
                r[Symbol.iterator] = function () {
                    return this;
                };
            }

            return r;

            function m(r) {
                return function (m) {
                    return function (r) {
                        if (n) {
                            throw new TypeError("Generator is already executing.");
                        }

                        for (; o;) {
                            try {
                                n = 1;

                                if (a && (i = 2 & r[0] ? a.return : r[0] ? a.throw || ((i = a.return) && i.call(a), 0) : a.next) && !(i = i.call(a, r[1])).done) {
                                    return i;
                                }

                                switch (a = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                    case 0:
                                    case 1:
                                        i = r;
                                        break;

                                    case 4:
                                        o.label++;
                                        return {
                                            value: r[1],
                                            done: false
                                        };

                                    case 5:
                                        o.label++, a = r[1], r = [0];
                                        continue;

                                    case 7:
                                        r = o.ops.pop(), o.trys.pop();
                                        continue;

                                    default:
                                        if (!(i = (i = o.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                            o = 0;
                                            continue;
                                        }

                                        if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                            o.label = r[1];
                                            break;
                                        }

                                        if (6 === r[0] && o.label < i[1]) {
                                            o.label = i[1];
                                            i = r;
                                            break;
                                        }

                                        if (i && o.label < i[2]) {
                                            o.label = i[2];
                                            o.ops.push(r);
                                            break;
                                        }

                                        i[2] && o.ops.pop(), o.trys.pop();
                                        continue;
                                }

                                r = t.call(e, o);
                            } catch (m) {
                                r = [6, m];
                                a = 0;
                            } finally {
                                n = i = 0;
                            }
                        }

                        if (5 & r[0]) {
                            throw r[1];
                        }

                        return {
                            value: r[0] ? r[1] : void 0,
                            done: true
                        };
                    }([r, m]);
                };
            }
        };

        Object.defineProperty(t, "__esModule", {
            value: true
        });

        t.delay = function (e) {
            return a(this, void 0, void 0, function () {
                return i(this, function (t) {
                    return [2, new Promise(function (t) {
                        return setTimeout(t, e);
                    })];
                });
            });
        };
    },
    "l/dd": function (e, t, n) {
        "use strict";

        var a = this && this.__awaiter || function (e, t, n, a) {
            return new (n || (n = Promise))(function (i, r) {
                function o(e) {
                    try {
                        s(a.next(e));
                    } catch (t) {
                        r(t);
                    }
                }

                function m(e) {
                    try {
                        s(a.throw(e));
                    } catch (t) {
                        r(t);
                    }
                }

                function s(e) {
                    var t;

                    if (e.done) {
                        i(e.value);
                    } else {
                        (t = e.value, t instanceof n ? t : new n(function (e) {
                            e(t);
                        })).then(o, m);
                    }
                }

                s((a = a.apply(e, t || [])).next());
            });
        },
            i = this && this.__generator || function (e, t) {
            var n,
                a,
                i,
                r,
                o = {
                label: 0,
                sent: function () {
                    if (1 & i[0]) {
                        throw i[1];
                    }

                    return i[1];
                },
                trys: [],
                ops: []
            };
            r = {
                next: m(0),
                throw: m(1),
                return: m(2)
            };

            if ("function" == typeof Symbol) {
                r[Symbol.iterator] = function () {
                    return this;
                };
            }

            return r;

            function m(r) {
                return function (m) {
                    return function (r) {
                        if (n) {
                            throw new TypeError("Generator is already executing.");
                        }

                        for (; o;) {
                            try {
                                n = 1;

                                if (a && (i = 2 & r[0] ? a.return : r[0] ? a.throw || ((i = a.return) && i.call(a), 0) : a.next) && !(i = i.call(a, r[1])).done) {
                                    return i;
                                }

                                switch (a = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                    case 0:
                                    case 1:
                                        i = r;
                                        break;

                                    case 4:
                                        o.label++;
                                        return {
                                            value: r[1],
                                            done: false
                                        };

                                    case 5:
                                        o.label++, a = r[1], r = [0];
                                        continue;

                                    case 7:
                                        r = o.ops.pop(), o.trys.pop();
                                        continue;

                                    default:
                                        if (!(i = (i = o.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                            o = 0;
                                            continue;
                                        }

                                        if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                            o.label = r[1];
                                            break;
                                        }

                                        if (6 === r[0] && o.label < i[1]) {
                                            o.label = i[1];
                                            i = r;
                                            break;
                                        }

                                        if (i && o.label < i[2]) {
                                            o.label = i[2];
                                            o.ops.push(r);
                                            break;
                                        }

                                        i[2] && o.ops.pop(), o.trys.pop();
                                        continue;
                                }

                                r = t.call(e, o);
                            } catch (m) {
                                r = [6, m];
                                a = 0;
                            } finally {
                                n = i = 0;
                            }
                        }

                        if (5 & r[0]) {
                            throw r[1];
                        }

                        return {
                            value: r[0] ? r[1] : void 0,
                            done: true
                        };
                    }([r, m]);
                };
            }
        };

        Object.defineProperty(t, "__esModule", {
            value: true
        });

        var r = function () {
            function e() {}

            e.prototype.saveRecords = function (e) {
                return a(this, void 0, void 0, function () {
                    return i(this, function (e) {
                        return [2];
                    });
                });
            };

            e.prototype.loadRecords = function (e) {
                return a(this, void 0, void 0, function () {
                    return i(this, function (e) {
                        return [2, {}];
                    });
                });
            };

            return e;
        }();

        t.PersistenceEmptyProvider = r;
    },
    maj8: function (e, t, n) {
        "use strict"; /*
                      object-assign
                      (c) Sindre Sorhus
                      @license MIT
                      */

        var a = Object.getOwnPropertySymbols,
            i = Object.prototype.hasOwnProperty,
            r = Object.prototype.propertyIsEnumerable;
        e.exports = function () {
            try {
                if (!Object.assign) {
                    return false;
                }

                var e = new String("abc");
                e[5] = "de";

                if ("5" === Object.getOwnPropertyNames(e)[0]) {
                    return false;
                }

                for (var t = {}, n = 0; n < 10; n++) {
                    t["_" + String.fromCharCode(n)] = n;
                }

                if ("0123456789" !== Object.getOwnPropertyNames(t).map(function (e) {
                    return t[e];
                }).join("")) {
                    return false;
                }

                var a = {};
                "abcdefghijklmnopqrst".split("").forEach(function (e) {
                    a[e] = e;
                });
                return "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, a)).join("");
            } catch (i) {
                return false;
            }
        }() ? Object.assign : function (e, t) {
            for (var n, o, m = function (e) {
                if (null == e) {
                    throw new TypeError("Object.assign cannot be called with null or undefined");
                }

                return Object(e);
            }(e), s = 1; s < arguments.length; s++) {
                for (var _ in n = Object(arguments[s])) {
                    if (i.call(n, _)) {
                        m[_] = n[_];
                    }
                }

                if (a) {
                    o = a(n);

                    for (var p = 0; p < o.length; p++) {
                        if (r.call(n, o[p])) {
                            m[o[p]] = n[o[p]];
                        }
                    }
                }
            }

            return m;
        };
    },
    ndpj: function (e, t) {
        var n = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof window.msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto);

        if (n) {
            var a = new Uint8Array(16);

            e.exports = function () {
                n(a);
                return a;
            };
        } else {
            var i = new Array(16);

            e.exports = function () {
                for (var e, t = 0; t < 16; t++) {
                    if (0 == (3 & t)) {
                        e = 4294967296 * Math.random();
                    }

                    i[t] = e >>> ((3 & t) << 3) & 255;
                }

                return i;
            };
        }
    },
    nlML: function (e, t, n) {
        "use strict";

        Object.defineProperty(t, "__esModule", {
            value: true
        });
        t.LoggingConfig = new class {
            constructor() {
                this.disabled = false;
                this.disabledTags = new Set();

                this.isDisabled = e => !!this.disabled || this.disabledTags.has(e);

                this.disableAll = () => {
                    this.disabled = true;
                };

                this.enableAll = () => {
                    this.disabled = true;
                };

                this.disableTag = e => {
                    this.disabledTags.add(e);
                };

                this.enableTag = e => {
                    this.disabledTags.delete(e);
                };
            }

        }();
    },
    noq8: function (e, t, n) {
        "use strict";

        var a = this && this.__awaiter || function (e, t, n, a) {
            return new (n || (n = Promise))(function (i, r) {
                function o(e) {
                    try {
                        s(a.next(e));
                    } catch (t) {
                        r(t);
                    }
                }

                function m(e) {
                    try {
                        s(a.throw(e));
                    } catch (t) {
                        r(t);
                    }
                }

                function s(e) {
                    var t;

                    if (e.done) {
                        i(e.value);
                    } else {
                        (t = e.value, t instanceof n ? t : new n(function (e) {
                            e(t);
                        })).then(o, m);
                    }
                }

                s((a = a.apply(e, t || [])).next());
            });
        },
            i = this && this.__generator || function (e, t) {
            var n,
                a,
                i,
                r,
                o = {
                label: 0,
                sent: function () {
                    if (1 & i[0]) {
                        throw i[1];
                    }

                    return i[1];
                },
                trys: [],
                ops: []
            };
            r = {
                next: m(0),
                throw: m(1),
                return: m(2)
            };

            if ("function" == typeof Symbol) {
                r[Symbol.iterator] = function () {
                    return this;
                };
            }

            return r;

            function m(r) {
                return function (m) {
                    return function (r) {
                        if (n) {
                            throw new TypeError("Generator is already executing.");
                        }

                        for (; o;) {
                            try {
                                n = 1;

                                if (a && (i = 2 & r[0] ? a.return : r[0] ? a.throw || ((i = a.return) && i.call(a), 0) : a.next) && !(i = i.call(a, r[1])).done) {
                                    return i;
                                }

                                switch (a = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                    case 0:
                                    case 1:
                                        i = r;
                                        break;

                                    case 4:
                                        o.label++;
                                        return {
                                            value: r[1],
                                            done: false
                                        };

                                    case 5:
                                        o.label++, a = r[1], r = [0];
                                        continue;

                                    case 7:
                                        r = o.ops.pop(), o.trys.pop();
                                        continue;

                                    default:
                                        if (!(i = (i = o.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                            o = 0;
                                            continue;
                                        }

                                        if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                            o.label = r[1];
                                            break;
                                        }

                                        if (6 === r[0] && o.label < i[1]) {
                                            o.label = i[1];
                                            i = r;
                                            break;
                                        }

                                        if (i && o.label < i[2]) {
                                            o.label = i[2];
                                            o.ops.push(r);
                                            break;
                                        }

                                        i[2] && o.ops.pop(), o.trys.pop();
                                        continue;
                                }

                                r = t.call(e, o);
                            } catch (m) {
                                r = [6, m];
                                a = 0;
                            } finally {
                                n = i = 0;
                            }
                        }

                        if (5 & r[0]) {
                            throw r[1];
                        }

                        return {
                            value: r[0] ? r[1] : void 0,
                            done: true
                        };
                    }([r, m]);
                };
            }
        };

        Object.defineProperty(t, "__esModule", {
            value: true
        });
        var r = n("k9qA");

        function o(e, t, n, a) {
            var i = t + (n - t) / a * Math.max(e, a);
            return Math.round(Math.random() * i);
        }

        t.exponentialBackoffDelay = o;

        t.backoff = function (e) {
            return a(this, void 0, void 0, function () {
                var t, n, a, m, s, _;

                return i(this, function (i) {
                    switch (i.label) {
                        case 0:
                            t = 0, n = 1e3, a = 5e3, m = 50, i.label = 1;

                        case 1:
                            i.label = 2;

                        case 2:
                            i.trys.push([2, 4,, 6]);
                            return [4, e()];

                        case 3:
                            return [2, i.sent()];

                        case 4:
                            s = i.sent();

                            if (t > 3) {
                                console.warn(s);
                            }

                            if (t < m) {
                                t++;
                            }

                            _ = o(t, n, a, m);
                            return [4, r.delay(_)];

                        case 5:
                            i.sent();
                            return [3, 6];

                        case 6:
                            return [3, 1];

                        case 7:
                            return [2];
                    }
                });
            });
        };
    },
    on7m: function (e, t, n) {
        "use strict";

        var a = this && this.__awaiter || function (e, t, n, a) {
            return new (n || (n = Promise))(function (i, r) {
                function o(e) {
                    try {
                        s(a.next(e));
                    } catch (t) {
                        r(t);
                    }
                }

                function m(e) {
                    try {
                        s(a.throw(e));
                    } catch (t) {
                        r(t);
                    }
                }

                function s(e) {
                    var t;

                    if (e.done) {
                        i(e.value);
                    } else {
                        (t = e.value, t instanceof n ? t : new n(function (e) {
                            e(t);
                        })).then(o, m);
                    }
                }

                s((a = a.apply(e, t || [])).next());
            });
        },
            i = this && this.__generator || function (e, t) {
            var n,
                a,
                i,
                r,
                o = {
                label: 0,
                sent: function () {
                    if (1 & i[0]) {
                        throw i[1];
                    }

                    return i[1];
                },
                trys: [],
                ops: []
            };
            r = {
                next: m(0),
                throw: m(1),
                return: m(2)
            };

            if ("function" == typeof Symbol) {
                r[Symbol.iterator] = function () {
                    return this;
                };
            }

            return r;

            function m(r) {
                return function (m) {
                    return function (r) {
                        if (n) {
                            throw new TypeError("Generator is already executing.");
                        }

                        for (; o;) {
                            try {
                                n = 1;

                                if (a && (i = 2 & r[0] ? a.return : r[0] ? a.throw || ((i = a.return) && i.call(a), 0) : a.next) && !(i = i.call(a, r[1])).done) {
                                    return i;
                                }

                                switch (a = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                    case 0:
                                    case 1:
                                        i = r;
                                        break;

                                    case 4:
                                        o.label++;
                                        return {
                                            value: r[1],
                                            done: false
                                        };

                                    case 5:
                                        o.label++, a = r[1], r = [0];
                                        continue;

                                    case 7:
                                        r = o.ops.pop(), o.trys.pop();
                                        continue;

                                    default:
                                        if (!(i = (i = o.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                            o = 0;
                                            continue;
                                        }

                                        if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                            o.label = r[1];
                                            break;
                                        }

                                        if (6 === r[0] && o.label < i[1]) {
                                            o.label = i[1];
                                            i = r;
                                            break;
                                        }

                                        if (i && o.label < i[2]) {
                                            o.label = i[2];
                                            o.ops.push(r);
                                            break;
                                        }

                                        i[2] && o.ops.pop(), o.trys.pop();
                                        continue;
                                }

                                r = t.call(e, o);
                            } catch (m) {
                                r = [6, m];
                                a = 0;
                            } finally {
                                n = i = 0;
                            }
                        }

                        if (5 & r[0]) {
                            throw r[1];
                        }

                        return {
                            value: r[0] ? r[1] : void 0,
                            done: true
                        };
                    }([r, m]);
                };
            }
        },
            r = this && this.__values || function (e) {
            var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                a = 0;

            if (n) {
                return n.call(e);
            }

            if (e && "number" == typeof e.length) {
                return {
                    next: function () {
                        if (e && a >= e.length) {
                            e = void 0;
                        }

                        return {
                            value: e && e[a++],
                            done: !e
                        };
                    }
                };
            }

            throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
        };

        Object.defineProperty(t, "__esModule", {
            value: true
        });

        var o = n("b4Gh"),
            m = n("YEIM"),
            s = n("XXhW"),
            _ = n("DUKJ"),
            p = n("jS6G"),
            d = "ROOT_QUERY",
            y = function () {
            return function () {
                var e = this;
                this.store = new m.RecordStore();
                this.persistence = new o.WebPersistence();
                this.requested = new Set();
                this.pendingReadRequests = [];
                this.isWriting = false;
                this.pendingWriteRequests = new Map();
                this.nextSubscriptionId = 1;
                this.subscriptions = new Map();

                this.mergeResponse = function (t, n, r) {
                    return a(e, void 0, void 0, function () {
                        var e, a;
                        return i(this, function (i) {
                            switch (i.label) {
                                case 0:
                                    e = "query" === t.kind ? d : null;
                                    a = s.normalizeResponse(e, t.selector, n, r);
                                    return [4, this.merge(a)];

                                case 1:
                                    i.sent();
                                    return [2];
                            }
                        });
                    });
                };

                this.merge = function (t) {
                    return a(e, void 0, void 0, function () {
                        var e, n, a, o, m, s, _, p, d, y, c, u, l, g, h, S, f, I, b, v, M, C, k, R, P, D, w, $, A, B, U, z, O, q;

                        return i(this, function (i) {
                            switch (i.label) {
                                case 0:
                                    return [4, this.prepareMerge(t)];

                                case 1:
                                    i.sent();
                                    e = this.store.merge(t);

                                    if (!(n = 0 === Object.keys(e).length)) {
                                        a = {};

                                        try {
                                            o = r(Object.keys(e));

                                            for (m = o.next(); !m.done; m = o.next()) {
                                                y = m.value;
                                                a[y] = this.store.read(y);
                                            }
                                        } catch (T) {
                                            k = {
                                                error: T
                                            };
                                        } finally {
                                            try {
                                                if (m && !m.done && (R = o.return)) {
                                                    R.call(o);
                                                }
                                            } finally {
                                                if (k) {
                                                    throw k.error;
                                                }
                                            }
                                        }

                                        this.persistenceWrite(a);
                                    }

                                    if (!n) {
                                        s = [];
                                        _ = new Set();

                                        try {
                                            p = r(Object.keys(e));

                                            for (d = p.next(); !d.done; d = p.next()) {
                                                y = d.value;

                                                try {
                                                    w = void 0;
                                                    c = r(Object.keys(e[y]));

                                                    for (u = c.next(); !u.done; u = c.next()) {
                                                        C = u.value;

                                                        _.add(y + "." + C);
                                                    }
                                                } catch (x) {
                                                    w = {
                                                        error: x
                                                    };
                                                } finally {
                                                    try {
                                                        if (u && !u.done && ($ = c.return)) {
                                                            $.call(c);
                                                        }
                                                    } finally {
                                                        if (w) {
                                                            throw w.error;
                                                        }
                                                    }
                                                }
                                            }
                                        } catch (F) {
                                            P = {
                                                error: F
                                            };
                                        } finally {
                                            try {
                                                if (d && !d.done && (D = p.return)) {
                                                    D.call(p);
                                                }
                                            } finally {
                                                if (P) {
                                                    throw P.error;
                                                }
                                            }
                                        }

                                        try {
                                            l = r(this.subscriptions);

                                            for (g = l.next(); !g.done; g = l.next()) {
                                                h = g.value;
                                                S = false;

                                                try {
                                                    U = void 0;
                                                    f = r(h[1].keys);

                                                    for (I = f.next(); !I.done; I = f.next()) {
                                                        b = I.value;

                                                        if (_.has(b)) {
                                                            S = true;
                                                            break;
                                                        }
                                                    }
                                                } catch (N) {
                                                    U = {
                                                        error: N
                                                    };
                                                } finally {
                                                    try {
                                                        if (I && !I.done && (z = f.return)) {
                                                            z.call(f);
                                                        }
                                                    } finally {
                                                        if (U) {
                                                            throw U.error;
                                                        }
                                                    }
                                                }

                                                if (S) {
                                                    s.push(h[1]);
                                                }
                                            }
                                        } catch (W) {
                                            A = {
                                                error: W
                                            };
                                        } finally {
                                            try {
                                                if (g && !g.done && (B = l.return)) {
                                                    B.call(l);
                                                }
                                            } finally {
                                                if (A) {
                                                    throw A.error;
                                                }
                                            }
                                        }

                                        try {
                                            v = r(s);

                                            for (M = v.next(); !M.done; M = v.next()) {
                                                (C = M.value).callback();
                                            }
                                        } catch (E) {
                                            O = {
                                                error: E
                                            };
                                        } finally {
                                            try {
                                                if (M && !M.done && (q = v.return)) {
                                                    q.call(v);
                                                }
                                            } finally {
                                                if (O) {
                                                    throw O.error;
                                                }
                                            }
                                        }
                                    }

                                    return [2];
                            }
                        });
                    });
                };

                this.readQuery = function (t, n) {
                    return a(e, void 0, void 0, function () {
                        var e;
                        return i(this, function (a) {
                            switch (a.label) {
                                case 0:
                                    return [4, this.prepareRead(t, n)];

                                case 1:
                                    a.sent();
                                    return (e = _.readRootFromStore(d, this.store, t.selector, n)).result ? [2, {
                                        result: true,
                                        value: e.value
                                    }] : [2, {
                                        result: false
                                    }];
                            }
                        });
                    });
                };

                this.readQueryAndWatch = function (t, n, o) {
                    a(e, void 0, void 0, function () {
                        var e,
                            a,
                            m,
                            p,
                            y,
                            c,
                            u,
                            l,
                            g,
                            h,
                            S,
                            f,
                            I,
                            b,
                            v = this;
                        return i(this, function (i) {
                            switch (i.label) {
                                case 0:
                                    return [4, this.prepareRead(t, n)];

                                case 1:
                                    i.sent();

                                    if (!(e = _.readRootFromStore(d, this.store, t.selector, n)).result) {
                                        o({
                                            type: "missing"
                                        });
                                        return [2];
                                    }

                                    a = s.normalizeResponse(d, t.selector, n, e.value), m = new Set();

                                    try {
                                        p = r(Object.keys(a));

                                        for (y = p.next(); !y.done; y = p.next()) {
                                            c = y.value;

                                            try {
                                                I = void 0;
                                                u = r(Object.keys(a[c].fields));

                                                for (l = u.next(); !l.done; l = u.next()) {
                                                    g = l.value;
                                                    m.add(c + "." + g);
                                                }
                                            } catch (M) {
                                                I = {
                                                    error: M
                                                };
                                            } finally {
                                                try {
                                                    if (l && !l.done && (b = u.return)) {
                                                        b.call(u);
                                                    }
                                                } finally {
                                                    if (I) {
                                                        throw I.error;
                                                    }
                                                }
                                            }
                                        }
                                    } catch (C) {
                                        S = {
                                            error: C
                                        };
                                    } finally {
                                        try {
                                            if (y && !y.done && (f = p.return)) {
                                                f.call(p);
                                            }
                                        } finally {
                                            if (S) {
                                                throw S.error;
                                            }
                                        }
                                    }

                                    h = this.nextSubscriptionId++;
                                    this.subscriptions.set(h, {
                                        keys: m,
                                        callback: function () {
                                            v.subscriptions.delete(h);
                                            o({
                                                type: "updated"
                                            });
                                        }
                                    });
                                    o({
                                        type: "value",
                                        value: e.value
                                    });
                                    return [2];
                            }
                        });
                    });
                };

                this.prepareMerge = function (t) {
                    return a(e, void 0, void 0, function () {
                        var e, n, a, o, m, s;
                        return i(this, function (i) {
                            switch (i.label) {
                                case 0:
                                    e = new Set();

                                    try {
                                        n = r(Object.keys(t));

                                        for (a = n.next(); !a.done; a = n.next()) {
                                            o = a.value;

                                            if (!this.store.isInMemory(o)) {
                                                e.add(o);
                                            }
                                        }
                                    } catch (_) {
                                        m = {
                                            error: _
                                        };
                                    } finally {
                                        try {
                                            if (a && !a.done && (s = n.return)) {
                                                s.call(n);
                                            }
                                        } finally {
                                            if (m) {
                                                throw m.error;
                                            }
                                        }
                                    }

                                    return e.size > 0 ? [4, this.persistenceRead(e)] : [3, 2];

                                case 1:
                                    i.sent(), i.label = 2;

                                case 2:
                                    return [2];
                            }
                        });
                    });
                };

                this.prepareRead = function (t, n) {
                    return a(e, void 0, void 0, function () {
                        var e;
                        return i(this, function (a) {
                            switch (a.label) {
                                case 0:
                                    return (e = p.collectMissingKeysRoot(d, this.store, t.selector, n)).size > 0 ? [4, this.persistenceRead(e)] : [3, 3];

                                case 1:
                                    a.sent();
                                    return [4, this.prepareRead(t, n)];

                                case 2:
                                    a.sent(), a.label = 3;

                                case 3:
                                    return [2];
                            }
                        });
                    });
                };

                this.persistenceRead = function (t) {
                    return a(e, void 0, void 0, function () {
                        var e, n, a, o, m, s, _, p;

                        return i(this, function (i) {
                            switch (i.label) {
                                case 0:
                                    n = new Promise(function (t) {
                                        return e = t;
                                    }), this.pendingReadRequests.push({
                                        missing: t,
                                        callback: e
                                    }), a = new Set();

                                    try {
                                        o = r(t);

                                        for (m = o.next(); !m.done; m = o.next()) {
                                            s = m.value;

                                            if (!this.requested.has(s)) {
                                                a.add(s);
                                            }
                                        }
                                    } catch (d) {
                                        _ = {
                                            error: d
                                        };
                                    } finally {
                                        try {
                                            if (m && !m.done && (p = o.return)) {
                                                p.call(o);
                                            }
                                        } finally {
                                            if (_) {
                                                throw _.error;
                                            }
                                        }
                                    }

                                    if (a.size > 0) {
                                        this.doLoad(a);
                                    }

                                    return [4, n];

                                case 1:
                                    i.sent();
                                    return [2];
                            }
                        });
                    });
                };

                this.doLoad = function (t) {
                    return a(e, void 0, void 0, function () {
                        var e, n, a, o, m, s, _, p, d, y, c, u, l, g, h, S, f, I, b, v, M, C, k, R, P, D, w, $, A, B;

                        return i(this, function (i) {
                            switch (i.label) {
                                case 0:
                                    try {
                                        e = r(t);

                                        for (n = e.next(); !n.done; n = e.next()) {
                                            c = n.value;
                                            this.requested.add(c);
                                        }
                                    } catch (U) {
                                        b = {
                                            error: U
                                        };
                                    } finally {
                                        try {
                                            if (n && !n.done && (v = e.return)) {
                                                v.call(e);
                                            }
                                        } finally {
                                            if (b) {
                                                throw b.error;
                                            }
                                        }
                                    }

                                    return [4, this.persistence.loadRecords(t)];

                                case 1:
                                    a = i.sent();

                                    try {
                                        o = r(t);

                                        for (m = o.next(); !m.done; m = o.next()) {
                                            c = m.value;

                                            if (!a[c]) {
                                                throw Error("Key " + c + " was not loaded from persistence!");
                                            }
                                        }
                                    } catch (z) {
                                        M = {
                                            error: z
                                        };
                                    } finally {
                                        try {
                                            if (m && !m.done && (C = o.return)) {
                                                C.call(o);
                                            }
                                        } finally {
                                            if (M) {
                                                throw M.error;
                                            }
                                        }
                                    }

                                    this.store.loaded(a);

                                    try {
                                        s = r(this.pendingReadRequests);

                                        for (_ = s.next(); !_.done; _ = s.next()) {
                                            p = _.value;

                                            try {
                                                P = void 0;
                                                d = r(t);

                                                for (y = d.next(); !y.done; y = d.next()) {
                                                    c = y.value;
                                                    p.missing.delete(c);
                                                }
                                            } catch (O) {
                                                P = {
                                                    error: O
                                                };
                                            } finally {
                                                try {
                                                    if (y && !y.done && (D = d.return)) {
                                                        D.call(d);
                                                    }
                                                } finally {
                                                    if (P) {
                                                        throw P.error;
                                                    }
                                                }
                                            }
                                        }
                                    } catch (q) {
                                        k = {
                                            error: q
                                        };
                                    } finally {
                                        try {
                                            if (_ && !_.done && (R = s.return)) {
                                                R.call(s);
                                            }
                                        } finally {
                                            if (k) {
                                                throw k.error;
                                            }
                                        }
                                    }

                                    u = this.pendingReadRequests.filter(function (e) {
                                        return 0 === e.missing.size;
                                    });

                                    try {
                                        l = r(u);

                                        for (g = l.next(); !g.done; g = l.next()) {
                                            I = g.value;
                                            h = this.pendingReadRequests.indexOf(I);
                                            this.pendingReadRequests.splice(h, 1);
                                        }
                                    } catch (T) {
                                        w = {
                                            error: T
                                        };
                                    } finally {
                                        try {
                                            if (g && !g.done && ($ = l.return)) {
                                                $.call(l);
                                            }
                                        } finally {
                                            if (w) {
                                                throw w.error;
                                            }
                                        }
                                    }

                                    try {
                                        S = r(u);

                                        for (f = S.next(); !f.done; f = S.next()) {
                                            (I = f.value).callback();
                                        }
                                    } catch (x) {
                                        A = {
                                            error: x
                                        };
                                    } finally {
                                        try {
                                            if (f && !f.done && (B = S.return)) {
                                                B.call(S);
                                            }
                                        } finally {
                                            if (A) {
                                                throw A.error;
                                            }
                                        }
                                    }

                                    return [2];
                            }
                        });
                    });
                };

                this.persistenceWrite = function (t) {
                    var n, a;

                    try {
                        for (var i = r(Object.keys(t)), o = i.next(); !o.done; o = i.next()) {
                            var m = o.value;
                            e.pendingWriteRequests.set(m, t[m]);
                            e.doWriteIfNeeded();
                        }
                    } catch (s) {
                        n = {
                            error: s
                        };
                    } finally {
                        try {
                            if (o && !o.done && (a = i.return)) {
                                a.call(i);
                            }
                        } finally {
                            if (n) {
                                throw n.error;
                            }
                        }
                    }
                };

                this.doWriteIfNeeded = function () {
                    return a(e, void 0, void 0, function () {
                        var e, t, n, a, o, m;
                        return i(this, function (i) {
                            switch (i.label) {
                                case 0:
                                    if (!(this.pendingWriteRequests.size > 0) || this.isWriting) {
                                        return [3, 4];
                                    }

                                    this.isWriting = true, e = {};

                                    try {
                                        t = r(this.pendingWriteRequests);

                                        for (n = t.next(); !n.done; n = t.next()) {
                                            a = n.value;
                                            e[a[0]] = a[1];
                                        }
                                    } catch (s) {
                                        o = {
                                            error: s
                                        };
                                    } finally {
                                        try {
                                            if (n && !n.done && (m = t.return)) {
                                                m.call(t);
                                            }
                                        } finally {
                                            if (o) {
                                                throw o.error;
                                            }
                                        }
                                    }

                                    this.pendingWriteRequests.clear(), i.label = 1;

                                case 1:
                                    i.trys.push([1,, 3, 4]);
                                    return [4, this.persistence.saveRecords(e)];

                                case 2:
                                    i.sent();
                                    return [3, 4];

                                case 3:
                                    this.isWriting = false;
                                    this.doWriteIfNeeded();
                                    return [7];

                                case 4:
                                    return [2];
                            }
                        });
                    });
                };
            };
        }();

        t.WebStore = y;
    },
    pltR: function (e, t) {
        for (var n = [], a = 0; a < 256; ++a) {
            n[a] = (a + 256).toString(16).substr(1);
        }

        e.exports = function (e, t) {
            var a = t || 0,
                i = n;
            return [i[e[a++]], i[e[a++]], i[e[a++]], i[e[a++]], "-", i[e[a++]], i[e[a++]], "-", i[e[a++]], i[e[a++]], "-", i[e[a++]], i[e[a++]], "-", i[e[a++]], i[e[a++]], i[e[a++]], i[e[a++]], i[e[a++]], i[e[a++]]].join("");
        };
    },
    "r/V+": function (e, t, n) {
        "use strict";

        Object.defineProperty(t, "__esModule", {
            value: true
        });

        var a = n("FXS2"),
            i = function () {
            return function (e) {
                var t = this;
                this.bucketSockets = [];
                this.bucketTimeout = [];
                this.closed = false;

                this.restartBucket = function (e) {
                    var n = t.configs[e].timeout,
                        a = t.configs[e].url;

                    if (t.bucketSockets[e]) {
                        var i = t.bucketSockets[e];
                        t.bucketSockets[e] = null;
                        i.onclose = null;
                        i.onopen = null;
                        i.onmessage = null;
                        i.close();
                    }

                    if (t.bucketTimeout[e]) {
                        clearTimeout(t.bucketTimeout[e]);
                        t.bucketTimeout[e] = null;
                    }

                    var r = t.engine.create(a, t.protocol);

                    if (t.bucketTimeout[e]) {
                        clearTimeout(t.bucketTimeout[e]);
                        t.bucketTimeout[e] = null;
                    }
                };

                this.close = function () {
                    if (!t.closed) {
                        t.closed = true;

                        for (var e = 0; e < t.configs.length; e++) {
                            var n = t.bucketSockets[e];
                            t.bucketSockets[e] = null;

                            if (n) {
                                n.onclose = null;
                                n.onopen = null;
                                n.onmessage = null;
                                n.close();
                            }

                            if (n) {
                                n.onclose = null;
                                n.onopen = null;
                                n.onmessage = null;
                                n.close();
                            }
                        }
                    }
                };

                this.engine = e.engine || a.DefaultWebSocketEngine;
                this.configs = e.configs;
                this.onSuccess = e.onSuccess;
                this.protocol = e.protocol;

                for (var n = 0; n < e.configs.length; n++) {
                    this.bucketSockets.push(null);
                    this.bucketTimeout.push(null);
                }

                for (n = 0; n < e.configs.length; n++) {
                    this.restartBucket(n);
                }
            };
        }();

        t.Thruster = i;
    },
    rFq9: function (e, t) {
        var n = e.exports = {
            version: "2.5.7"
        };

        if ("number" == typeof __e) {
            __e = n;
        }
    },
    vJUR: function (e, t, n) {
        "use strict";

        var a = this && this.__values || function (e) {
            var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                a = 0;

            if (n) {
                return n.call(e);
            }

            if (e && "number" == typeof e.length) {
                return {
                    next: function () {
                        if (e && a >= e.length) {
                            e = void 0;
                        }

                        return {
                            value: e && e[a++],
                            done: !e
                        };
                    }
                };
            }

            throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
        },
            i = this && this.__importStar || function (e) {
            if (e && e.__esModule) {
                return e;
            }

            var t = {};

            if (null != e) {
                for (var n in e) {
                    if (Object.hasOwnProperty.call(e, n)) {
                        t[n] = e[n];
                    }
                }
            }

            t.default = e;
            return t;
        };

        Object.defineProperty(t, "__esModule", {
            value: true
        });

        var r = i(n("ERkP")),
            o = n("MGe+"),
            m = function () {
            return function () {
                var e = this;
                this.key = o.randomKey();
                this.queries = new Map();

                this.cleanup = function () {
                    var t, n;

                    try {
                        for (var i = a(e.queries.keys()), r = i.next(); !r.done; r = i.next()) {
                            var o = r.value;
                            e.queries.get(o).destroy();
                        }
                    } catch (m) {
                        t = {
                            error: m
                        };
                    } finally {
                        try {
                            if (r && !r.done && (n = i.return)) {
                                n.call(i);
                            }
                        } finally {
                            if (t) {
                                throw t.error;
                            }
                        }
                    }

                    e.queries.clear();
                };
            };
        }();

        t.QueryCache = m;
        t.QueryCacheContext = r.createContext(void 0);

        t.QueryCacheProvider = function (e) {
            var n = r.useMemo(function () {
                return new m();
            }, []);
            r.useEffect(function () {
                return function () {
                    return n.cleanup();
                };
            }, []);
            return r.createElement(t.QueryCacheContext.Provider, {
                value: n
            }, e.children);
        };
    },
    vbc5: function (e, t) {
        e.exports = function (e) {
            return "object" == typeof e ? null !== e : "function" == typeof e;
        };
    },
    yLub: function (e, t, n) {
        "use strict";

        var a = this && this.__awaiter || function (e, t, n, a) {
            return new (n || (n = Promise))(function (i, r) {
                function o(e) {
                    try {
                        s(a.next(e));
                    } catch (t) {
                        r(t);
                    }
                }

                function m(e) {
                    try {
                        s(a.throw(e));
                    } catch (t) {
                        r(t);
                    }
                }

                function s(e) {
                    var t;

                    if (e.done) {
                        i(e.value);
                    } else {
                        (t = e.value, t instanceof n ? t : new n(function (e) {
                            e(t);
                        })).then(o, m);
                    }
                }

                s((a = a.apply(e, t || [])).next());
            });
        },
            i = this && this.__generator || function (e, t) {
            var n,
                a,
                i,
                r,
                o = {
                label: 0,
                sent: function () {
                    if (1 & i[0]) {
                        throw i[1];
                    }

                    return i[1];
                },
                trys: [],
                ops: []
            };
            r = {
                next: m(0),
                throw: m(1),
                return: m(2)
            };

            if ("function" == typeof Symbol) {
                r[Symbol.iterator] = function () {
                    return this;
                };
            }

            return r;

            function m(r) {
                return function (m) {
                    return function (r) {
                        if (n) {
                            throw new TypeError("Generator is already executing.");
                        }

                        for (; o;) {
                            try {
                                n = 1;

                                if (a && (i = 2 & r[0] ? a.return : r[0] ? a.throw || ((i = a.return) && i.call(a), 0) : a.next) && !(i = i.call(a, r[1])).done) {
                                    return i;
                                }

                                switch (a = 0, i && (r = [2 & r[0], i.value]), r[0]) {
                                    case 0:
                                    case 1:
                                        i = r;
                                        break;

                                    case 4:
                                        o.label++;
                                        return {
                                            value: r[1],
                                            done: false
                                        };

                                    case 5:
                                        o.label++, a = r[1], r = [0];
                                        continue;

                                    case 7:
                                        r = o.ops.pop(), o.trys.pop();
                                        continue;

                                    default:
                                        if (!(i = (i = o.trys).length > 0 && i[i.length - 1]) && (6 === r[0] || 2 === r[0])) {
                                            o = 0;
                                            continue;
                                        }

                                        if (3 === r[0] && (!i || r[1] > i[0] && r[1] < i[3])) {
                                            o.label = r[1];
                                            break;
                                        }

                                        if (6 === r[0] && o.label < i[1]) {
                                            o.label = i[1];
                                            i = r;
                                            break;
                                        }

                                        if (i && o.label < i[2]) {
                                            o.label = i[2];
                                            o.ops.push(r);
                                            break;
                                        }

                                        i[2] && o.ops.pop(), o.trys.pop();
                                        continue;
                                }

                                r = t.call(e, o);
                            } catch (m) {
                                r = [6, m];
                                a = 0;
                            } finally {
                                n = i = 0;
                            }
                        }

                        if (5 & r[0]) {
                            throw r[1];
                        }

                        return {
                            value: r[0] ? r[1] : void 0,
                            done: true
                        };
                    }([r, m]);
                };
            }
        },
            r = this && this.__values || function (e) {
            var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                a = 0;

            if (n) {
                return n.call(e);
            }

            if (e && "number" == typeof e.length) {
                return {
                    next: function () {
                        if (e && a >= e.length) {
                            e = void 0;
                        }

                        return {
                            value: e && e[a++],
                            done: !e
                        };
                    }
                };
            }

            throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
        };

        Object.defineProperty(t, "__esModule", {
            value: true
        });

        var o = n("WsZc"),
            m = n("noq8"),
            s = n("MGe+"),
            _ = n("k9qA"),
            p = n("noq8"),
            d = function () {
            function e(e) {
                var t = this;
                this.statusWatcher = new o.Watcher();
                this.errorHandler = e.errorHandler;
                this.inner = e.engine;
                this.minRetry = e.minRetry;
                this.statusWatcher.setState(this.inner.status);
                this.inner.watchStatus(function (e) {
                    t.statusWatcher.setState(e);
                });
            }

            Object.defineProperty(e.prototype, "status", {
                get: function () {
                    return this.statusWatcher.getState();
                },
                enumerable: true,
                configurable: true
            });

            e.prototype.watchStatus = function (e) {
                return this.statusWatcher.watch(e);
            };

            e.prototype.query = function (e, t, n) {
                return a(this, void 0, void 0, function () {
                    var r,
                        o = this;
                    return i(this, function (s) {
                        switch (s.label) {
                            case 0:
                                return [4, m.backoff(function () {
                                    return a(o, void 0, void 0, function () {
                                        var a, r;
                                        return i(this, function (i) {
                                            switch (i.label) {
                                                case 0:
                                                    0, i.label = 1;

                                                case 1:
                                                    i.trys.push([1, 3,, 8]);
                                                    return [4, this.inner.query(e, t, n)];

                                                case 2:
                                                    return [2, {
                                                        type: "result",
                                                        result: i.sent()
                                                    }];

                                                case 3:
                                                    a = i.sent();
                                                    return "error" !== (r = this.errorHandler(a)).type ? [3, 4] : [2, {
                                                        type: "error",
                                                        error: r.error
                                                    }];

                                                case 4:
                                                    if ("unknown" !== r.type) {
                                                        return [3, 5];
                                                    }

                                                    throw console.warn(a), a;

                                                case 5:
                                                    return "retry" !== r.type ? [3, 7] : [4, _.delay(Math.max(this.minRetry, r.delay))];

                                                case 6:
                                                    i.sent(), i.label = 7;

                                                case 7:
                                                    return [3, 8];

                                                case 8:
                                                    return [3, 0];

                                                case 9:
                                                    return [2];
                                            }
                                        });
                                    });
                                })];

                            case 1:
                                if ("result" === (r = s.sent()).type) {
                                    return [2, r.result];
                                }

                                throw r.error;
                        }
                    });
                });
            };

            e.prototype.mutate = function (e, t, n) {
                return a(this, void 0, void 0, function () {
                    var r,
                        o = this;
                    return i(this, function (s) {
                        switch (s.label) {
                            case 0:
                                return [4, m.backoff(function () {
                                    return a(o, void 0, void 0, function () {
                                        var a, r;
                                        return i(this, function (i) {
                                            switch (i.label) {
                                                case 0:
                                                    0, i.label = 1;

                                                case 1:
                                                    i.trys.push([1, 3,, 8]);
                                                    return [4, this.inner.mutate(e, t, n)];

                                                case 2:
                                                    return [2, {
                                                        type: "result",
                                                        result: i.sent()
                                                    }];

                                                case 3:
                                                    a = i.sent();
                                                    return "error" !== (r = this.errorHandler(a)).type ? [3, 4] : [2, {
                                                        type: "error",
                                                        error: r.error
                                                    }];

                                                case 4:
                                                    if ("unknown" !== r.type) {
                                                        return [3, 5];
                                                    }

                                                    throw console.warn(a), a;

                                                case 5:
                                                    return "retry" !== r.type ? [3, 7] : [4, _.delay(Math.max(this.minRetry, r.delay))];

                                                case 6:
                                                    i.sent(), i.label = 7;

                                                case 7:
                                                    return [3, 8];

                                                case 8:
                                                    return [3, 0];

                                                case 9:
                                                    return [2];
                                            }
                                        });
                                    });
                                })];

                            case 1:
                                if ("result" === (r = s.sent()).type) {
                                    return [2, r.result];
                                }

                                throw r.error;
                        }
                    });
                });
            };

            e.prototype.queryWatch = function (e, t, n) {
                var a,
                    i,
                    o,
                    m,
                    _,
                    d = this,
                    y = false,
                    c = 0,
                    u = new Map(),
                    l = false,
                    g = new Promise(function (e, t) {
                        m = e;
                        _ = t;
                    }),
                    h = function (s) {
                    if (!y) {
                        if (i) {
                            i();
                            i = void 0;
                        }

                        if (a) {
                            a.destroy();
                            a = void 0;
                        }

                        if (a) {
                            a.destroy();
                            a = void 0;
                        }
                    }
                };

                h(10);
                return {
                    subscribe: function (e) {
                        var t = s.randomKey();
                        u.set(t, e);
                        return function () {
                            u.delete(t);
                        };
                    },
                    currentResult: function () {
                        return o;
                    },
                    result: function () {
                        return g;
                    },
                    destroy: function () {
                        if (!y) {
                            y = true;

                            if (i) {
                                i();
                                i = void 0;
                            }

                            if (i) {
                                i();
                                i = void 0;
                            }
                        }
                    }
                };
            };

            e.prototype.subscribe = function (e, t, n, a) {
                return this.inner.subscribe(e, t, n, a);
            };

            e.prototype.updateQuery = function (e, t, n) {
                return this.inner.updateQuery(e, t, n);
            };

            e.prototype.readQuery = function (e, t) {
                return this.inner.readQuery(e, t);
            };

            e.prototype.writeQuery = function (e, t, n) {
                return this.inner.writeQuery(e, t, n);
            };

            e.prototype.close = function () {
                this.inner.close();
            };

            return e;
        }();

        t.RetryEngine = d;
    },
    zOtc: function (e, t, n) {
        "use strict";

        var a,
            i = this && this.__extends || (a = function (e, t) {
            return (a = Object.setPrototypeOf || {
                __proto__: []
            } instanceof Array && function (e, t) {
                e.__proto__ = t;
            } || function (e, t) {
                for (var n in t) {
                    if (t.hasOwnProperty(n)) {
                        e[n] = t[n];
                    }
                }
            })(e, t);
        }, function (e, t) {
            function n() {
                this.constructor = e;
            }

            a(e, t);
            e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());
        });
        Object.defineProperty(t, "__esModule", {
            value: true
        });

        var r = function (e) {
            function t(n) {
                var a = e.call(this, "GraphQL Error") || this;
                a.errors = n;
                Object.setPrototypeOf(a, t.prototype);
                return a;
            }

            i(t, e);
            return t;
        }(Error);

        t.GraphqlError = r;

        var o = function (e) {
            function t(n) {
                var a = e.call(this, n) || this;
                Object.setPrototypeOf(a, t.prototype);
                return a;
            }

            i(t, e);
            return t;
        }(Error);

        t.GraphqlUnknownError = o;
    }
});