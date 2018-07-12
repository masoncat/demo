/**
 * Created by qitmac000274 on 2018/1/2.
 */
function __read_platform_info() {
    if (!isReadPlatformInfo) {
        isReadPlatformInfo = !0;
        var e = navigator.userAgent;
        e.indexOf('iPhone OS') > 0 ? Internal.isIOS = !0 : e.indexOf('Android') > 0 ? Internal.isAndroid = !0 : e.indexOf('Windows Phone') > 0 && (Internal.isWinOS = !0), e.indexOf('Youth_CtripWireless') > 0 && (Internal.isYouthApp = !0), e.indexOf('_CtripWireless') > 0 && (Internal.isInApp = !0);
    }
}
function __bridge_callback(e) {
    function n(e) {
        if (void 0 != e && null != e) {
            var n = e.tagname, a = e.param;
            if (void 0 != e.error_code && (a = e.param || {}, a.error_code = e.error_code), s = Internal.invokeCallbackIfExited(n, a), !s)try {
                s = window.app.callback(e);
            } catch (t) {
                console.log('鎵цwindow.app.callback 澶辫触' + e);
            }
            var i = CtripEventListener.__internal_is_global_event_name(n);
            if (i) {
                var r = CtripEventListener.__internal_notify_global_event_listener(n, a);
                r && !s && (s = r);
            }
            return Internal.isWinOS && (s = s ? 'true' : 'false'), s;
        }
    }

    e = CtripTool.ctripParamDecode(e);
    var a = JSON.parse(e);
    if (null != a) {
        var t = a.tagname, e = a.param, i = window.app && 'function' == typeof window.app.callback;
        if ('web_view_did_appear' == t)try {
            if (window.wkLocalStorageData) {
                var r = JSON.parse(window.wkLocalStorageData);
                for (var o in r)window.localStorage.setItem(o, r[o], !0)
            }
        } catch (l) {
        }
        if ('web_view_finished_load' == t && e && e.platform) {
            if (!window.finished_load && window.native_ctrip_inner_version)return;
            i && (window.finished_load = null, checkWVFL && clearInterval(checkWVFL), window.native_ctrip_inner_version && Internal.callNative('Util', 'notifyBridgeJSReady', null, 'notify_bridgejs_ready')), Internal.isInApp = !0, Internal.appVersion = e.version, Internal.osVersion = e.osVersion, _CtripNativeAppReady = !0, Internal.isWinOS ? (window.navigator.userAgent.winPhoneUserAgent = window.navigator.userAgent + '_CtripWireless_' + Internal.appVersion, console = CtripConsole) : Internal.isIOS && (console = CtripConsole);
        }
        var s = null;
        if (i && !window.finished_load) {
            for (var p = null; p = window.nativeEventArr.shift();)n(p);
            return n(a);
        }
        window.nativeEventArr.push(a);
    }
    return -1;
}
function __writeLocalStorage(e, n) {
    Internal.isNotEmptyString(e) && localStorage.setItem(e, n);
}
var CtripAD = {
        get_preload_res_path: function (e) {
            e || (e = ''), params = {}, params.resname = e, Internal.callNative('HybridAD', 'getPreLoadResPath', params, 'get_preload_res_path');
        }
    }, CtripBar = {
        app_refresh_nav_bar: function (e) {
            if (Internal.isNotEmptyString(e)) {
                jsonObj = JSON.parse(e), jsonObj.service = 'NavBar', jsonObj.action = 'refresh', jsonObj.callback_tagname = 'refresh_nav_bar';
                var n = JSON.stringify(jsonObj);
                if (Internal.isIOS) {
                    var a = Internal.makeURLWithParam(n);
                    Internal.loadURL(a);
                } else Internal.isAndroid ? window.NavBar_a.refresh(n) : Internal.isWinOS && Internal.callWin8App(n);
            }
        }, app_set_navbar_hidden: function (e) {
            if (Internal.isSupportAPIWithVersion('5.4')) {
                var n = {};
                n.isHidden = e, Internal.callNative('NavBar', 'setNavBarHidden', n, 'set_navbar_hidden');
            }
        }, app_set_toolbar_hidden: function (e) {
            if (Internal.isSupportAPIWithVersion('5.4')) {
                var n = {};
                n.isHidden = e, Internal.callNative('NavBar', 'setToolBarHidden', n, 'set_toolbar_hidden');
            }
        }
    }, __CTRIP_JS_PARAM = '?jsparam=', __CTRIP_URL_PLUGIN = 'ctrip://h5/plugin' + __CTRIP_JS_PARAM,
    __CTRIP_YOUTH_URL_PLUGIN = 'ctripyouth://h5/plugin' + __CTRIP_JS_PARAM, _CtripNativeAppReady = !1,
    originalConsole = console, console = originalConsole, isReadPlatformInfo = !1, n = 0,
    checkWVFL = setInterval(function () {
        window.finished_load && __bridge_callback(window.finished_load), n >= 50 && checkWVFL && clearInterval(checkWVFL), n++;
    }, 200);
window.nativeEventArr = [];
var CtripBusiness = {
        app_choose_invoice_title: function (e) {
            if (Internal.isSupportAPIWithVersion('5.6')) {
                e || (e = '');
                var n = {};
                n.selectedInvoiceTitle = e, Internal.callNative('Business', 'chooseInvoiceTitle', n, 'choose_invoice_title');
            }
        }, app_show_voice_search: function (e) {
            if (Internal.isSupportAPIWithVersion('5.7')) {
                var n = {};
                n.businessType = e, Internal.callNative('Business', 'showVoiceSearch', n, 'show_voice_search');
            }
        }, app_open_adv_page: function (e) {
            if (Internal.isSupportAPIWithVersion('5.4')) {
                var n = {};
                n.advUrl = e, Internal.callNative('Util', 'openAdvPage', n, 'open_adv_page');
            }
        }, app_show_newest_introduction: function () {
            Internal.callNative('Util', 'showNewestIntroduction', null, 'show_newest_introduction');
        }, app_check_update: function () {
            Internal.callNative('Util', 'checkUpdate', null, 'check_update');
        }, app_recommend_app_to_friends: function () {
            Internal.callNative('Util', 'recommendAppToFriends', null, 'recommend_app_to_friends');
        }, app_add_weixin_friend: function () {
            Internal.callNative('Util', 'addWeixinFriend', null, 'add_weixin_friend');
        }, app_call_system_share: function (e, n, a, t) {
            CtripShare.app_call_system_share(e, n, a, t);
        }, app_log_event: function (e) {
            if (Internal.isNotEmptyString(e)) {
                var n = {};
                n.event = e, Internal.callNative('Util', 'logEvent', n, 'log_event');
            }
        }, app_get_device_info: function () {
            Internal.isSupportAPIWithVersion('5.7') && Internal.callNative('Business', 'getDeviceInfo', null, 'get_device_info');
        }, app_read_verification_code_from_sms: function (e) {
            if (Internal.isSupportAPIWithVersion('5.8')) {
                e || (e = '');
                var n = {};
                n.pattern = e, Internal.callNative('Business', 'readVerificationCodeFromSMS', n, 'read_verification_code_from_sms');
            }
        }, app_log_google_remarkting: function (e, n) {
            if (Internal.isSupportAPIWithVersion('5.8')) {
                e || (e = '');
                var a = {};
                a.screenName = e, a.userInfo = n, Internal.callNative('Business', 'logGoogleRemarking', a, 'log_google_remarkting');
            }
        }, app_choose_contact_from_addressbook: function () {
            Internal.isSupportAPIWithVersion('5.9') && Internal.callNative('Business', 'chooseContactFromAddressbook', null, 'choose_contact_from_addressbook');
        }, app_choose_contact_from_addressbook_v2: function () {
        }, app_send_ubt_log: function (e) {
            if (Internal.isSupportAPIWithVersion('5.9')) {
                var n = {};
                e.log_from = 'Hybrid', n.tags = e, Internal.callNative('Business', 'sendUBTLog', n, 'send_ubt_log');
            }
        }, app_send_ubt_trace: function (e, n) {
            if (Internal.isSupportAPIWithVersion('6.1')) {
                var a = {};
                n.log_from = 'Hybrid', a.tags = n, a.traceName = e, Internal.callNative('Business', 'sendUBTTrace', a, 'send_ubt_trace');
            }
        }, app_send_ubt_metrics: function (e, n, a) {
            if (Internal.isSupportAPIWithVersion('6.1')) {
                var t = {};
                a.log_from = 'Hybrid', t.tags = a, t.metricsName = e, t.numValue = n, Internal.callNative('Business', 'sendUBTMetrics', t, 'send_ubt_metrics');
            }
        }, app_send_ubt_event: function (e, n) {
            if (Internal.isSupportAPIWithVersion('6.13')) {
                var a = {};
                a.code = e, n.log_from = 'Hybrid', a.userInfo = n, Internal.callNative('Business', 'sendUBTEvent', a, 'send_ubt_event');
            }
        }, app_do_business_job: function (e, n, a, t) {
            if (Internal.isSupportAPIWithVersion('6.0')) {
                var i = {};
                i.businessType = e, i.businessCode = n, i.jsonParam = a, i.sequenceId = t, Internal.callNative('Business', 'doBusinessJob', i, 'do_business_job');
            }
        }, app_get_channel_info: function () {
            Internal.isSupportAPIWithVersion('6.2') && Internal.callNative('Business', 'getChannelInfo', null, 'get_channel_info');
        }, app_get_abtesting_info: function (e, n) {
            if (Internal.isSupportAPIWithVersion('6.2')) {
                var a = {};
                a.expCode = e, a.statisticsMeta = n, Internal.callNative('Business', 'getABTestingInfo', a, 'get_abtesting_info');
            }
        }, app_input_identify_card_number: function () {
            Internal.callNative('Business', 'inputIdentifyCardNumber', null, 'input_identify_card_number');
        }, app_track_UBT_JS_log: function (e, n) {
            if (Internal.isSupportAPIWithVersion('6.10')) {
                var a = {};
                a.tags = n, a.code = e, Internal.callNative('Business', 'trackUBTJSLog', a, 'track_UBT_JS_log');
            }
        }, appShowPicker: function (e, n, a) {
            var t = {};
            t.rawDataDic = e, t.sortDataDic = n, Internal.callNative('Business', 'showPickerView', t, 'show_picker', a);
        }, appSetCityMapping: function (e, n, a, t) {
            var i = {};
            i.globalId = e, i.geoCategoryId = t, i.sourceType = a, i.bizType = n, Internal.callNative('Business', 'setCityMapping', i, 'setCityMapping');
        }, appGetCityMapping: function (e, n) {
            var a = {};
            a.bizType = e, Internal.callNative('Business', 'getCurrentCityMapping', a, 'appGetCityMapping', n);
        }, appAddPassbook: function (e) {
            var n = {};
            n.passUrl = e, Internal.callNative('Business', 'addPassbook', n, 'addPassbook');
        }, getMobileConfig: function (e, n) {
            var a = {category: e};
            Internal.callNative('Business', 'getMobileConfig', a, 'getMobileConfig', n);
        }
    }, CtripCalendar = {
        app_add_calendar_event: function (e) {
            null == e && (e = {});
            var n = {event: e};
            Internal.callNative('Calendar', 'addCalendarEvent', n, 'add_calendar_event');
        }
    }, CtripConsole = {
        log: function (e) {
            Internal.isWinOS ? Internal.callWin8App('wp-log:#wp#Log:' + e) : Internal.isIOS && Internal.loadURL('ios-log:#iOS#Log:' + e);
        }, debug: function (e) {
            Internal.isWinOS ? Internal.callWin8App('wp-log:#wp#Debug:' + e) : Internal.isIOS && Internal.loadURL('ios-log:#iOS#Debug:' + e);
        }, info: function (e) {
            Internal.isWinOS ? Internal.callWin8App('wp-log:#wp#info:' + e) : Internal.isIOS && Internal.loadURL('ios-log:#iOS#Info:' + e);
        }, warn: function (e) {
            Internal.isWinOS ? Internal.callWin8App('wp-log:#wp#warn:' + e) : Internal.isIOS && Internal.loadURL('ios-log:#iOS#warn:' + e);
        }, error: function (e) {
            Internal.isWinOS ? Internal.callWin8App('wp-log:#wp#Error:' + e) : Internal.isIOS && Internal.loadURL('ios-log:#iOS#Error:' + e);
        }
    }, CtripEncrypt = {
        app_base64_encode: function (e) {
            Internal.isSupportAPIWithVersion('5.3') && (e || (e = ''), params = {}, params.toIncodeString = e, Internal.callNative('Encrypt', 'base64Encode', params, 'base64_encode'));
        }, app_md5_hash: function (e) {
            Internal.isSupportAPIWithVersion('5.5') && (e || (e = ''), params = {}, params.inString = e, Internal.callNative('Encrypt', 'md5Hash', params, 'md5_hash'));
        }, app_ctrip_encrypt: function (e, n) {
            Internal.isSupportAPIWithVersion('5.5') && (e || (e = ''), params = {}, params.inString = e, params.encType = n, Internal.callNative('Encrypt', 'ctripEncrypt', params, 'ctrip_encrypt'));
        }
    }, CtripEvent = {
        addEventListener: function (e, n) {
            if ('string' != typeof e || 'function' != typeof n)return void console.error('Error for addEventListener:' + e + ', func:' + n);
            var a = function (e) {
                return n && n(e), !0;
            }, t = {eventName: e};
            Internal.callNative('Event', 'addEventListener', t, 'add_event_listener', a);
        }, removeEventListener: function (e) {
            if ('string' != typeof e)return void console.error('Error for removeEventListener:' + e);
            var n = {eventName: e};
            Internal.callNative('Event', 'removeEventListener', n, 'remove_event_listener');
        }, sendEvent: function (e, n) {
            if ('string' != typeof e)return void console.error('Error for sendEvent:' + e);
            var a = {eventName: e, eventInfo: n};
            Internal.callNative('Event', 'sendEvent', a, 'send_event');
        }
    }, __globalEventListenerMap = {},
    __globalEventNameList = ['onNetworkChanged', 'onPageDidAppear', 'onPageDidDisappear', 'onPageDidReceiveData', 'onPageBecomeActive', 'onBackButtonClick', 'onNativeReady'],
    __globalEventAliasNameMap = {
        network_did_changed: 'onNetworkChanged',
        web_view_did_appear: 'onPageDidAppear',
        web_view_did_disappear: 'onPageDidDisappear',
        app_become_active: 'onPageBecomeActive',
        back: 'onBackButtonClick',
        web_view_finished_load: 'onNativeReady',
        web_view_did_onReceiveData: 'onPageDidReceiveData'
    }, __globalEventNamePrefix = 'c_global_', CtripEventListener = {
        addHybridEventListener: function (e, n) {
            if ('string' != typeof e || 'function' != typeof n)return void console.error('Error for addGlobalHybridEventListener:' + e + ', func:' + n);
            var a = __globalEventListenerMap[e];
            void 0 == a && (a = new Array), a.push(n), __globalEventListenerMap[e] = a;
        }, removeHybridEventListener: function (e, n) {
            if ('string' != typeof e || 'function' != typeof n)return void console.error('Error for removeGlobalHybridEventListener:' + e + ', func:' + n);
            var a = __globalEventListenerMap[e];
            if (void 0 != a) {
                for (var t = !1, i = 0; i < a.length; i++)a[i] == n && (a.splice(i), i--, t || (t = !0));
                t && (0 == a.length ? delete __globalEventListenerMap.eventName : __globalEventListenerMap.eventName = a);
            }
        }, __internal_notify_global_event_listener: function (e, n) {
            var a = void 0, t = __globalEventAliasNameMap[e];
            t && (e = t);
            var i = __globalEventListenerMap[e];
            if (void 0 != i)for (var r = 0; r < i.length; r++) {
                var o = i[r];
                'function' == typeof o && (a = o(e, n));
            }
            return a;
        }, __internal_is_global_event_name: function (e) {
            if ('string' != typeof e)return !1;
            if (0 == e.indexOf(__globalEventNamePrefix))return !0;
            var n = __globalEventAliasNameMap[e];
            return void 0 != n ? !0 : !1;
        }
    }, CtripFile = {
        app_get_current_sandbox_name: function () {
            if (Internal.isSupportAPIWithVersion('5.4')) {
                var e = {};
                e.pageUrl = window.location.href, Internal.callNative('File', 'getCurrentSandboxName', e, 'get_current_sandbox_name');
            }
        }, app_write_text_to_file: function (e, n, a, t) {
            if (Internal.isSupportAPIWithVersion('5.4')) {
                e || (e = ''), n || (n = ''), a || (a = '');
                var i = {};
                i.pageUrl = window.location.href, i.text = e, i.fileName = n, i.relativeFilePath = a, i.isAppend = t, Internal.callNative('File', 'writeTextToFile', i, 'write_text_to_file');
            }
        }, app_delete_file: function (e, n) {
            if (Internal.isSupportAPIWithVersion('5.4')) {
                e || (e = ''), n || (n = '');
                var a = {};
                a.fileName = e, a.relativeFilePath = n, a.pageUrl = window.location.href, Internal.callNative('File', 'deleteFile', a, 'delete_file');
            }
        }, app_read_text_from_file: function (e, n) {
            if (Internal.isSupportAPIWithVersion('5.4')) {
                e || (e = ''), n || (n = '');
                var a = {};
                a.fileName = e, a.pageUrl = window.location.href, a.relativeFilePath = n, Internal.callNative('File', 'readTextFromFile', a, 'read_text_from_file');
            }
        }, app_get_file_size: function (e, n) {
            if (Internal.isSupportAPIWithVersion('5.4')) {
                e || (e = ''), n || (n = '');
                var a = {};
                a.fileName = e, a.relativeFilePath = n, a.pageUrl = window.location.href, Internal.callNative('File', 'getFileSize', a, 'get_file_size');
            }
        }, app_check_file_exist: function (e, n) {
            if (Internal.isSupportAPIWithVersion('5.4')) {
                e || (e = ''), n || (n = '');
                var a = {};
                a.fileName = e, a.relativeFilePath = n, a.pageUrl = window.location.href, Internal.callNative('File', 'checkFileExist', a, 'check_file_exist');
            }
        }, app_make_dir: function (e, n) {
            if (Internal.isSupportAPIWithVersion('5.4')) {
                e || (e = ''), n || (n = '');
                var a = {};
                a.dirName = e, a.pageUrl = window.location.href, a.relativeDirPath = n, Internal.callNative('File', 'makeDir', a, 'make_dir');
            }
        }
    }, CtripGeoHelper = {
        Aboard: 2,
        Domestic: 1,
        Unknown: -1,
        aroundAboardRectList: [[125478833, 40538425, 135928497, 16590043], [128054454, 54437790, 136370032, 49918776], [89567309, 54351906, 115617882, 47881407], [71832315, 54566279, 82281980, 46323836], [72788974, 28001436, 85887850, 16590043], [92510877, 48029708, 111570476, 45034268], [85593493, 26157025, 97294174, 16519064], [97073406, 20935216, 107743838, 16305964], [98324422, 45190596, 109142033, 42854577], [71979493, 45863038, 78896877, 41817208]],
        chinaRectList: [[85374342, 41697126, 124486996, 28705892], [98942349, 28714002, 122527683, 23331042], [108012216, 23415965, 119252965, 17294543], [120025651, 51286036, 126391116, 41330674], [82936701, 46727439, 90553182, 41621242], [126188746, 48211817, 129757821, 42485061], [129518656, 47611932, 131468770, 44959641], [131376782, 47487374, 133805226, 46225387], [79753968, 41876130, 85604309, 30872189], [113457816, 44802677, 120117638, 41517618], [118977005, 23526282, 121975765, 21629857], [109667973, 17321053, 119050594, 14580095], [76258482, 40359687, 80011530, 35915704], [90534784, 44710915, 94030271, 41531444], [80710628, 45077082, 83028687, 41862379], [85935460, 48414308, 88437492, 46645143], [93975079, 42559912, 101462779, 41600531], [93956681, 44157262, 95354876, 42491869], [116695740, 46301949, 120117638, 44619006], [116401384, 49444657, 120191227, 48057877], [121000708, 53244099, 124569783, 51210984], [106724405, 42232628, 113494611, 41683336], [112133211, 44355602, 113568200, 42123151], [110918989, 43155464, 112206800, 42232628], [115150367, 45324216, 116769330, 44724032], [126299129, 49588397, 128102064, 48057877], [128065270, 49131761, 129757821, 48131826], [129721026, 48622090, 130530508, 47611932], [124349016, 52822665, 125710416, 51095279], [122325313, 28884167, 123760302, 25662561], [111029373, 14651757, 118388292, 10605300], [109778357, 10095218, 109778357, 10095218], [109631178, 10459649, 116548562, 7753573], [110514249, 7826971, 113678584, 4734480], [124330619, 41399976, 125480450, 40689610], [126345123, 42512290, 128046872, 41827986], [127973283, 42539507, 129104717, 42143692], [74510739, 40162360, 76350468, 38678393], [119087389, 21629857, 120706351, 20142916], [106853187, 23339537, 108067408, 21990651], [129707229, 44975967, 130985841, 43017244], [130958245, 44582859, 131169814, 43104932], [131418176, 46247729, 133129126, 45359896], [133073934, 48054793, 134269758, 47409374], [99701237, 23386249, 101577762, 22174986], [100179567, 22243514, 101559364, 21745927], [101485775, 23437187, 104245370, 22875776], [98008686, 25240784, 99057332, 24181992], [124463999, 40686109, 124905534, 40461646], [125457453, 41334141, 126055365, 40979564], [126368119, 41824546, 126607284, 41645397], [125475850, 40979564, 125687419, 40853958], [124477797, 40465160, 124728460, 40343852], [124470898, 40347371, 124618076, 40285757], [124891736, 40694862, 125153898, 40607283], [126046166, 41332407, 126262335, 41165784], [127214395, 41836586, 128083666, 41546995], [126386516, 50257998, 126386516, 50257998], [126280732, 50257998, 127513351, 49580921], [126363520, 50934256, 127117809, 50225552], [125669022, 52398490, 126276133, 51247082], [80948643, 30905163, 81403976, 30280446], [83574857, 30911112, 85488176, 29214825], [98136317, 28872274, 99079179, 27642374]],
        largeChinaRect: [73083331, 54006559, 135266195, 17015367],
        isInRect: function (e, n, a) {
            return e >= a[0] && e <= a[2] && n >= a[3] && n <= a[1] ? !0 : !1;
        },
        isInRectList: function (e, n, a) {
            for (var t = 0; t < a.length - 1; t++)if (smallRect = a[t], this.isInRect(e, n, smallRect))return !0;
            return !1;
        },
        getCountry: function (e, n) {
            var a = this.Unknown, t = 1e6 * n, i = 1e6 * e;
            return isInAboard = !this.isInRect(i, t, this.largeChinaRect), isInAboard || (isInAboard = this.isInRectList(i, t, this.aroundAboardRectList)), isInAboard ? a = this.Aboard : (inInLand = this.isInRectList(i, t, this.chinaRectList), inInLand && (a = this.Domestic)), a;
        }
    }, CtripHySDK = {
        webview: {
            push: function (e, n) {
                var a = e.callback;
                a && delete e.callback, Internal.callNative('HyWebView', 'push', e, 'push', n);
            }, pop: function (e, n) {
                Internal.callNative('HyWebView', 'pop', e, 'pop', n);
            }, showLoading: function (e, n) {
                Internal.callNative('HyWebView', 'showLoading', e, 'showLoading', n);
            }, enableBackGuesture: function (e, n) {
                Internal.callNative('HyWebView', 'enableBackGuesture', e, 'enableBackGuesture', n);
            }, setName: function (e, n) {
                Internal.callNative('HyWebView', 'setName', e, 'setName', n);
            }, onShow: function (e) {
                CtripEventListener.addHybridEventListener('onPageDidAppear', e);
            }, onHide: function (e) {
                CtripEventListener.addHybridEventListener('onPageDidDisappear', e);
            }, onReceiveData: function (e) {
                var n = function (n, a) {
                    e && e(a && a.data || '');
                };
                CtripEventListener.addHybridEventListener('onPageDidReceiveData', n);
            }
        }, app: {
            setStatusBarStyle: function (e, n) {
                Internal.callNative('HyApp', 'setStatusBarStyle', e, 'setStatusBarStyle', n);
            }, getNetworkType: function (e, n) {
                Internal.callNative('HyApp', 'getNetworkType', e, 'getNetworkType', n);
            }, getDeviceInfo: function (e, n) {
                Internal.callNative('HyApp', 'getDeviceInfo', e, 'getDeviceInfo', n);
            }, getAppInfo: function (e, n) {
                Internal.callNative('HyApp', 'getAppInfo', e, 'getAppInfo', n);
            }
        }, share: {
            shareToPlatform: function (e, n) {
                Internal.callNative('HyShare', 'shareToPlatform', e, 'shareToPlatform', n);
            }, share: function (e, n) {
                Internal.callNative('HyShare', 'share', e, 'share', n);
            }
        }, log: {
            logTrace: function (e, n) {
                Internal.callNative('HyLog', 'logTrace', e, 'logTrace', n);
            }, logMetric: function (e, n) {
                Internal.callNative('HyLog', 'logMetric', e, 'logMetric', n);
            }
        }, business: {
            scanQRCode: function (e, n) {
                Internal.callNative('HyBusiness', 'scanQRCode', e, 'scanQRCode', n);
            }, openScheme: function (e, n) {
                Internal.callNative('HyBusiness', 'openScheme', e, 'openScheme', n);
            }
        }, tool: {
            checkInstalledApp: function (e, n) {
                Internal.callNative('HyTool', 'checkInstalledApp', e, 'checkInstalledApp', n);
            }, chooseContact: function (e, n) {
                Internal.callNative('HyTool', 'chooseContact', e, 'chooseContact', n);
            }
        }, geolocation: {
            getCurrentPosition: function (e, n) {
                Internal.callNative('HyGeoLocation', 'getCurrentPosition', e, 'getCurrentPosition', n);
            }
        }, navigator: {
            refresh: function (e, n) {
                Internal.callNative('HyNavigator', 'refresh', e, 'refresh', n);
            }, onClick: function (e) {
                var n = function (n, a) {
                    if ('c_global_onNavigatorClick' == n) {
                        var t = a.tagname, i = a.param;
                        'function' == typeof e && e(t, i);
                    }
                };
                this.onClickCallBack && CtripEventListener.removeHybridEventListener('c_global_onNavigatorClick', this.onClickCallBack), this.onClickCallBack = n, CtripEventListener.addHybridEventListener('c_global_onNavigatorClick', n);
            }, onClickCallBack: null
        }, event: {
            addEventListener: function (e, n) {
                var a = e.callback;
                e.callback = function (n) {
                    res = {name: e.name, data: n}, a && a(res);
                }, CtripEvent.addEventListener(e.name, e.callback), n && n({ret: !0, data: {}, errmsg: '', errcode: 0});
            }, removeEventListener: function (e, n) {
                CtripEvent.removeEventListener(e.name), n && n({ret: !0, data: {}, errmsg: '', errcode: 0});
            }, sendEvent: function (e, n) {
                CtripEvent.sendEvent(e.name, e.data), n && n({ret: !0, data: {}, errmsg: '', errcode: 0});
            }
        }
    }, CtripImage = {
        app_upload_images: function (e, n) {
            if (Internal.isSupportAPIWithVersion('6.20')) {
                var a = {images: e, options: n};
                Internal.callNative('Image', 'uploadImages', a, 'upload_images');
            }
        }, app_select_and_upload_images: function (e) {
            Internal.isSupportAPIWithVersion('6.20') && Internal.callNative('Image', 'selectAndUploadImages', e, 'select_and_upload_images');
        }
    }, __IS_BASE64_ENCODE_VERSION = !1, __USER_AGENT_FLAG = 'CtripWireless_', __EB64_FLAG = 'eb64', Internal = {
        isIOS: !1,
        isAndroid: !1,
        isWinOS: !1,
        isInApp: !1,
        appVersion: '',
        osVersion: '',
        isYouthApp: !1,
        __callbackMap: {},
        isAppVersionGreatThan: function (e) {
            if (Internal.isYouthApp)return !0;
            if ('string' == typeof e && e.length > 0 && Internal.appVersion) {
                var n = e.replace(/\./g, ''), a = Internal.appVersion.replace(/\./g, ''), t = parseFloat(n),
                    i = parseFloat(a);
                if (isNaN(i) || i - t >= 0)return !0;
            }
            return !1;
        },
        isAppVersionAfter62: function () {
            if (__IS_BASE64_ENCODE_VERSION)return __IS_BASE64_ENCODE_VERSION;
            var e = navigator.userAgent, n = e.indexOf(__USER_AGENT_FLAG);
            if (n >= 0)if (e.indexOf(__EB64_FLAG) > 0) __IS_BASE64_ENCODE_VERSION = !0; else {
                e = e.substr(n + __USER_AGENT_FLAG.length);
                var a = e.indexOf('.'), t = e.substr(0, a);
                a <= e.length - 1 && (t += e.substr(a + 1, 1));
                var i = parseInt(t);
                __IS_BASE64_ENCODE_VERSION = i >= 62;
            }
            return __IS_BASE64_ENCODE_VERSION;
        },
        isSupportAPIWithVersion: function () {
            return !0;
        },
        appVersionNotSupportCallback: function (e) {
            var n = {tagname: 'app_version_too_low', start_version: e, app_version: Internal.appVersion};
            CtripTool.app_log(JSON.stringify(n)), window.app.callback(n);
        },
        paramErrorCallback: function (e) {
            var n = {tagname: 'app_param_error', description: e};
            CtripTool.app_log(JSON.stringify(n)), window.app.callback(n);
        },
        isNotEmptyString: function (e) {
            return 'string' == typeof e && e.length > 0 ? !0 : !1;
        },
        loadURL: function (e) {
            if (0 != e.length) {
                var n = document.createElement('iframe'), a = document.body || document.documentElement;
                n.style.display = 'none', n.setAttribute('src', e), a.appendChild(n), setTimeout(function () {
                    n.parentNode.removeChild(n), n = null;
                }, 200);
            }
        },
        makeParamString: function (e, n, a, t) {
            return Internal.isNotEmptyString(e) && Internal.isNotEmptyString(n) ? (a || (a = {}), a.service = e, a.action = n, a.callback_tagname = t, JSON.stringify(a)) : '';
        },
        makeURLWithParam: function (e) {
            return null == e && (e = ''), e = CtripTool.ctripParamEncode(e), Internal.isYouthApp ? __CTRIP_YOUTH_URL_PLUGIN + e : __CTRIP_URL_PLUGIN + e;
        },
        callWin8App: function (e) {
            window.external.notify(e);
        },
        callNative: function (e, n, a, t, i) {
            if (!e || !n)return void alert('param Error:[' + e + '],[' + n + ']');
            i && (t = t + '_' + Internal.__guid(), Internal.__callbackMap[t] = i);
            var r = Internal.makeParamString(e, n, a, t);
            if (Internal.isIOS) {
                var o = Internal.makeURLWithParam(r);
                Internal.loadURL(o);
            } else Internal.isAndroid ? (nativeModule = window[e + '_a'], nativeModule && (nativeFunction = nativeModule[n], nativeFunction && nativeFunction.call(nativeModule, r))) : Internal.isWinOS && Internal.callWin8App(r);
        },
        invokeCallbackIfExited: function (e, n) {
            var a = Internal.__callbackMap[e];
            if (a) {
                var t = a(n);
                return t || delete Internal.__callbackMap[e], !0;
            }
            return !1;
        },
        __guid: function () {
            function e() {
                return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
            }

            return e() + e() + '-' + e() + '-' + e() + '-' + e() + '-' + e() + e() + e();
        }
    };
__read_platform_info();
var CtripMap = {
        app_locate: function (e, n, a, t) {
            var i = {};
            i.timeout = e, i.isNeedCtripCity = n, i.isForceLocate = a, i.sequenceId = t, Internal.callNative('Locate', 'locate', i, 'locate');
        }, appLocate: function (e, n, a, t) {
            var i = {};
            i.timeout = e, i.isNeedCtripCity = !0, i.isForceLocate = n, i.sequenceId = t;
            var r = function (e) {
                var n = e && e.type;
                return a && a(e), 'geo' == n ? !0 : !1;
            };
            Internal.callNative('Locate', 'locate', i, 'locate_v72', r);
        }, appGetCachedLocationData: function (e) {
            Internal.callNative('Locate', 'getCachedLocationData', null, 'get_cached_location_data', e);
        }, app_stop_locate: function (e) {
            if (Internal.isSupportAPIWithVersion('6.0')) {
                var n = {};
                n.sequenceId = e, Internal.callNative('Locate', 'stopLocate', n, 'stop_locate');
            }
        }, app_show_map: function (e, n, a, t, i) {
            if (Internal.isSupportAPIWithVersion('5.5')) {
                a || (a = ''), t || (t = '');
                var r = {};
                r.latitude = e, r.longitude = n, r.title = a, r.subtitle = t, r.coordinateType = i, Internal.callNative('Locate', 'showMap', r, 'show_map');
            }
        }, app_show_map_with_POI_list: function (e) {
            if (Internal.isSupportAPIWithVersion('5.8')) {
                var n = {};
                n.poiList = e, Internal.callNative('Locate', 'showMapWithPOIList', n, 'show_map_with_POI_list');
            }
        }, app_get_cached_ctrip_city: function () {
            Internal.isSupportAPIWithVersion('6.0') && Internal.callNative('Locate', 'getCachedCtripCity', null, 'get_cached_ctrip_city');
        }, app_map_navigation: function (e, n, a, t, i, r, o, l, s) {
            var p = {};
            p.fromLatitude = e, p.fromLongitude = n, p.fromAddressTitle = a, p.toLatitude = t, p.toLongitude = i, p.toAddressTitle = r, p.mapType = o, p.coordinateType = l, p.navigateMode = s, Internal.callNative('Locate', 'mapNavigation', p, 'map_navigation');
        }, app_show_map_navigation: function (e, n, a, t, i, r, o, l) {
            var s = {};
            s.fromLatitude = e, s.fromLongitude = n, s.fromAddressTitle = a, s.toLatitude = t, s.toLongitude = i, s.toAddressTitle = r, s.coordinateType = o, s.navigateMode = l, Internal.callNative('Locate', 'showMapNavigation', s, 'show_map_navigation');
        }
    }, CtripNetwork = {
        app_sotp_send_http_requst: function (e, n, a, t, i, r) {
            var o = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36';
            a || (a = {}), a['User-Agent'] || (a['User-Agent'] = o), n || (n = 'POST');
            var l = {url: e, method: n, header: a, body: t, sequenceId: i, timeout: r};
            Internal.callNative('Network', 'sotpSendHttpRequest', l, 'sotp_send_http_requst');
        }
    }, CtripPage = {
        app_set_page_name: function (e) {
            if (Internal.isSupportAPIWithVersion('5.6')) {
                e || (e = '');
                var n = {};
                n.pageName = e, Internal.callNative('Page', 'setPageName', n, 'set_page_name');
            }
        }, app_back_to_page: function (e, n) {
            if (Internal.isSupportAPIWithVersion('5.8')) {
                e || (e = ''), n || (n = '');
                var a = {};
                a.pageName = e, a.callbackString = n, Internal.callNative('Page', 'backToPage', a, 'back_to_page');
            }
        }, app_show_loading_page: function (e) {
            if (Internal.isSupportAPIWithVersion('5.9')) {
                var n = {};
                n.meta = e, Internal.callNative('Page', 'showLoadingPage', n, 'show_loading_page');
            }
        }, app_hide_loading_page: function () {
            Internal.isSupportAPIWithVersion('5.9') && Internal.callNative('Page', 'hideLoadingPage', null, 'hide_loading_page');
        }, app_enable_drag_animation: function (e) {
            if (Internal.isSupportAPIWithVersion('5.9')) {
                var n = {};
                n.isEnable = e;
                var a = Internal.makeParamString('Page', 'enableDragAnimation', n, 'enable_drag_animation');
                Internal.isIOS ? (url = Internal.makeURLWithParam(a), Internal.loadURL(url)) : Internal.isAndroid || Internal.isWinOS && Internal.callWin8App(a);
            }
        }, app_reload_current_page: function () {
            Internal.isSupportAPIWithVersion('6.3') && Internal.callNative('Page', 'reloadCurrentPage', null, 'reload_current_page');
        }, registerPage: function (e, n) {
            if (Internal.isSupportAPIWithVersion('7.4')) {
                var a = {};
                a.name = e;
                var t = function (e) {
                    return n && n(e), !0;
                };
                Internal.callNative('Page', 'registerPage', a, 'registerPage', t);
            }
        }, popToPage: function (e, n) {
            if (Internal.isSupportAPIWithVersion('7.4')) {
                var a = {};
                a.name = e, a.info = n, Internal.callNative('Page', 'popToPage', a, 'popToPage');
            }
        }
    }, CtripPay = {
        app_check_pay_app_install_status: function () {
            Internal.isSupportAPIWithVersion('5.4') && Internal.callNative('Pay', 'checkPayAppInstallStatus', null, 'check_pay_app_install_status');
        }, app_open_pay_app_by_url: function (e, n, a, t) {
            if (Internal.isSupportAPIWithVersion('5.4')) {
                n || (n = ''), e || (e = ''), a || (a = ''), t || (t = '');
                var i = {};
                i.payMeta = n, i.payAppName = e, i.successRelativeURL = a, i.detailRelativeURL = t, Internal.callNative('Pay', 'openPayAppByURL', i, 'open_pay_app_by_url');
            }
        }, app_call_pay: function (e) {
            if (e = e || {}, e.param = e.param || '', 'string' == typeof e.param) {
                for (var n = e.param.split('?')[1] || '', a = n.split('&') || [], t = '', i = 0; i < a.length; i++) {
                    var r = a[i].split('=') || [], o = r[0], l = r[1];
                    if ('bustype' === o) {
                        t = l;
                        break;
                    }
                }
                e.names = ['payment_route_' + t], Internal.callNative('Pay', 'callPay', e, 'call_pay');
            }
        }
    }, CtripPipe = {
        app_send_HTTP_pipe_request: function (e, n, a, t, i, r, o) {
            if (Internal.isSupportAPIWithVersion('5.4')) {
                e || (e = ''), n || (n = ''), a || (a = ''), t || (t = ''), i || (i = ''), o || (o = '');
                var l = {};
                l.baseURL = e, l.path = n, l.method = a, l.header = t, l.parameters = i, l.sequenceId = o, l.isIgnoreHTTPSCertification = r, Internal.callNative('Pipe', 'sendHTTPPipeRequest', l, 'send_http_pipe_request');
            }
        }, app_abort_HTTP_pipe_request: function (e) {
            if (Internal.isSupportAPIWithVersion('5.4')) {
                e || (e = '');
                var n = {};
                n.sequenceId = e, Internal.callNative('Pipe', 'abortHTTPRequest', n, 'abort_http_pipe_request');
            }
        }, app_send_H5_pipe_request: function (e, n, a, t, i) {
            if (Internal.isSupportAPIWithVersion('5.4')) {
                e || (e = ''), n || (n = ''), a || (a = ''), t || (t = ''), i || (i = 0);
                var r = {};
                r.serviceCode = e, r.header = n, r.data = a, r.sequenceId = t, r.pipeType = i, Internal.callNative('Pipe', 'sendH5PipeRequest', r, 'send_h5_pipe_request');
            }
        }
    }, CtripShare = {
        app_call_system_share: function (e, n, a, t) {
            if (Internal.isSupportAPIWithVersion('5.3')) {
                var i = {};
                i.title = a, i.text = n, i.linkUrl = t, i.imageRelativePath = e, Internal.callNative('Util', 'callSystemShare', i, 'call_system_share');
            }
        }, wrap_call_default_share: function (e, n, a, t, i) {
            var r = {};
            r.shareType = 'Default', r.imageUrl = e, r.title = n, r.text = a, r.linkUrl = t;
            var o = [];
            o.push(r), CtripShare.app_call_custom_share(o, i);
        }, app_call_custom_share: function (e, n, a) {
            var t = {};
            t.dataList = e, t.businessCode = n, t.meta = a, Internal.callNative('Share', 'callCustomShare', t, 'call_custom_share');
        }, app_call_one_share: function (e, n, a, t, i, r, o) {
            var l = {};
            l.shareType = e, l.imageUrl = n, l.title = a, l.text = t, l.linkUrl = i, l.businessCode = r, l.meta = o, Internal.callNative('Share', 'callOneShare', l, 'call_one_share');
        }
    }, CtripStorage = {
        app_storage_save: function (e, n, a, t, i) {
            if (Internal.isSupportAPIWithVersion('6.20')) {
                var r = {key: e, value: n, domain: a};
                t && (r.expires = t), Internal.callNative('Storage', 'save', r, 'storage_save', i);
            }
        }, appMemorySet: function (e, n, a) {
            if (Internal.isSupportAPIWithVersion('7.5')) {
                var t = {key: e, value: n};
                Internal.callNative('Storage', 'saveOnlyMemory', t, 'appMemorySet', a);
            }
        }, app_storage_get: function (e, n, a) {
            Internal.isSupportAPIWithVersion('6.20') && Internal.callNative('Storage', 'get', {
                key: e,
                domain: n
            }, 'storage_get', a);
        }, app_storage_delete: function (e, n, a) {
            Internal.isSupportAPIWithVersion('6.20') && Internal.callNative('Storage', 'delete', {
                key: e,
                domain: n
            }, 'storage_delete', a);
        }
    }, base64EncodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
    base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1),
    CtripTool = {
        app_is_in_ctrip_app: function () {
            if (Internal.isInApp)return !0;
            var e = !1, n = navigator.userAgent;
            return n.indexOf(__USER_AGENT_FLAG) > 0 && (e = !0), e;
        }, _base64encode: function (e) {
            var n, a, t, i, r, o;
            for (t = e.length, a = 0, n = ''; t > a;) {
                if (i = 255 & e.charCodeAt(a++), a == t) {
                    n += base64EncodeChars.charAt(i >> 2), n += base64EncodeChars.charAt((3 & i) << 4), n += '==';
                    break;
                }
                if (r = e.charCodeAt(a++), a == t) {
                    n += base64EncodeChars.charAt(i >> 2), n += base64EncodeChars.charAt((3 & i) << 4 | (240 & r) >> 4), n += base64EncodeChars.charAt((15 & r) << 2), n += '=';
                    break;
                }
                o = e.charCodeAt(a++), n += base64EncodeChars.charAt(i >> 2), n += base64EncodeChars.charAt((3 & i) << 4 | (240 & r) >> 4), n += base64EncodeChars.charAt((15 & r) << 2 | (192 & o) >> 6), n += base64EncodeChars.charAt(63 & o);
            }
            return n;
        }, _base64decode: function (e) {
            var n, a, t, i, r, o, l;
            for (o = e.length, r = 0, l = ''; o > r;) {
                do n = base64DecodeChars[255 & e.charCodeAt(r++)]; while (o > r && -1 == n);
                if (-1 == n)break;
                do a = base64DecodeChars[255 & e.charCodeAt(r++)]; while (o > r && -1 == a);
                if (-1 == a)break;
                l += String.fromCharCode(n << 2 | (48 & a) >> 4);
                do {
                    if (t = 255 & e.charCodeAt(r++), 61 == t)return l;
                    t = base64DecodeChars[t];
                } while (o > r && -1 == t);
                if (-1 == t)break;
                l += String.fromCharCode((15 & a) << 4 | (60 & t) >> 2);
                do {
                    if (i = 255 & e.charCodeAt(r++), 61 == i)return l;
                    i = base64DecodeChars[i];
                } while (o > r && -1 == i);
                if (-1 == i)break;
                l += String.fromCharCode((3 & t) << 6 | i);
            }
            return l;
        }, _utf16to8: function (e) {
            var n, a, t, i;
            for (n = '', t = e.length, a = 0; t > a; a++)i = e.charCodeAt(a), i >= 1 && 127 >= i ? n += e.charAt(a) : i > 2047 ? (n += String.fromCharCode(224 | i >> 12 & 15), n += String.fromCharCode(128 | i >> 6 & 63), n += String.fromCharCode(128 | i >> 0 & 63)) : (n += String.fromCharCode(192 | i >> 6 & 31), n += String.fromCharCode(128 | i >> 0 & 63));
            return n;
        }, _utf8to16: function (e) {
            var n, a, t, i, r, o;
            for (n = '', t = e.length, a = 0; t > a;)switch (i = e.charCodeAt(a++), i >> 4) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    n += e.charAt(a - 1);
                    break;
                case 12:
                case 13:
                    r = e.charCodeAt(a++), n += String.fromCharCode((31 & i) << 6 | 63 & r);
                    break;
                case 14:
                    r = e.charCodeAt(a++), o = e.charCodeAt(a++), n += String.fromCharCode((15 & i) << 12 | (63 & r) << 6 | (63 & o) << 0);
            }
            return n;
        }, base64Encode: function (e) {
            return this._base64encode(this._utf16to8(e));
        }, base64Decode: function (e) {
            return this._utf8to16(this._base64decode(e));
        }, ctripParamDecode: function (e) {
            return e = Internal.isAppVersionAfter62() ? CtripTool.base64Decode(e) : decodeURIComponent(e);
        }, ctripParamEncode: function (e) {
            return Internal.isAppVersionAfter62() ? (e = encodeURIComponent(e), e = CtripTool.base64Encode(e)) : e = encodeURIComponent(e), e;
        }
    }, CtripUBT          = {
        getCurrentPageInfo: function (e) {
            Internal.callNative('UBT', 'getCurrentPageInfo', null, 'getCurrentPageInfo', e);
        }
    }, CtripUser         = {
        app_member_login: function (e) {
            var n = {};
            n.isShowNonMemberLogin = e, Internal.callNative('User', 'memberLogin', n, 'member_login');
        }, app_non_member_login: function () {
            Internal.callNative('User', 'nonMemberLogin', null, 'non_member_login');
        }, app_member_auto_login: function () {
            Internal.callNative('User', 'memberAutoLogin', null, 'member_auto_login');
        }, app_member_register: function () {
            Internal.callNative('User', 'memberRegister', null, 'member_register');
        }, app_finished_register: function (e) {
            if (Internal.isSupportAPIWithVersion('5.7')) {
                e || (e = '');
                var n = {};
                n.userInfoJson = e, Internal.callNative('User', 'finishedRegister', n, 'finished_register');
            }
        }, app_finished_login: function (e) {
            if (Internal.isSupportAPIWithVersion('5.8')) {
                e || (e = '');
                var n = {};
                n.userInfoJson = e, Internal.callNative('User', 'finishedLogin', n, 'finished_login');
            }
        }, app_user_logout: function () {
            Internal.isSupportAPIWithVersion('6.5') && Internal.callNative('User', 'userLogout', null, 'user_logout');
        }
    }, CtripUtil         = {
        app_init_member_H5_info: function () {
            Internal.callNative('User', 'initMemberH5Info', null, 'init_member_H5_info');
        }, app_call_phone: function (e, n, a) {
            e || (e = '');
            var t = {};
            t.pageId = n, t.phone = e, t.businessCode = a, Internal.callNative('Util', 'callPhone', t, 'call_phone');
        }, app_back_to_home: function () {
            Internal.callNative('Util', 'backToHome', null, 'back_to_home');
        }, app_back_to_last_page: function (e, n) {
            var a = {};
            e || (e = ''), a.callbackString = e, a.isDeleteH5Page = n, Internal.callNative('Util', 'backToLast', a, 'back_to_last_page');
        }, app_open_url: function (e, n, a, t, i, r) {
            var o = {};
            e || (e = ''), a || (a = ''), t || (t = ''), o.openUrl = e, o.title = a, o.targetMode = n, o.pageName = t, o.isShowLoadingPage = i, o.meta = r, Internal.makeParamString('Util', 'openUrl', o, 'open_url'), Internal.isInApp ? Internal.callNative('Util', 'openUrl', o, 'open_url') : window.location.href = e;
        }, app_cross_package_href: function (e, n) {
            var a = {};
            e || (e = ''), n || (n = ''), a.path = e, a.param = n, Internal.callNative('Util', 'crossPackageJumpUrl', a, 'cross_package_href');
        }, app_check_network_status: function () {
            Internal.callNative('Util', 'checkNetworkStatus', null, 'check_network_status');
        }, app_check_app_install_status: function (e, n) {
            var a = {};
            a.openUrl = e, a.packageName = n, Internal.callNative('Util', 'checkAppInstallStatus', a, 'check_app_install_status');
        }, app_check_apps_install_status: function (e, n) {
            var a = {};
            a.urlSchemaList = e, a.packageIdList = n, Internal.callNative('Util', 'checkAppsInstallStatus', a, 'check_apps_install_status');
        }, app_refresh_native_page: function (e, n) {
            var a = {};
            e || (e = ''), n || (n = ''), a.pageName = e, a.jsonStr = n, Internal.callNative('Util', 'refreshNativePage', a, 'refresh_native_page');
        }, app_copy_string_to_clipboard: function (e) {
            if (Internal.isSupportAPIWithVersion('5.3')) {
                var n = {};
                e || (e = ''), n.copyString = e, Internal.callNative('Util', 'copyToClipboard', n, 'copy_string_to_clipboard');
            }
        }, app_check_hijack: function (e) {
            if (Internal.isSupportAPIWithVersion('6.13')) {
                var n = {};
                e || (e = ''), n.regEx = e, Internal.callNative('Util', 'checkHijack', n, 'check_hijack');
            }
        }, app_read_copied_string_from_clipboard: function () {
            Internal.isSupportAPIWithVersion('5.3') && Internal.callNative('Util', 'readCopiedStringFromClipboard', null, 'read_copied_string_from_clipboard');
        }, app_download_data: function (e, n, a) {
            if (Internal.isSupportAPIWithVersion('5.3')) {
                var t = {};
                e || (e = ''), n || (n = ''), t.downloadUrl = e, t.suffix = n, t.pageUrl = window.location.href, t.isIgnoreHttpsCertification = a, Internal.callNative('Util', 'downloadData', t, 'download_data');
            }
        }, app_open_other_app: function (e, n, a) {
            if (Internal.isSupportAPIWithVersion('5.3')) {
                var t = {};
                e || (e = ''), n || (n = ''), a || (a = ''), t.packageId = e, t.jsonParam = n, t.url = a, Internal.callNative('Util', 'openOtherApp', t, 'open_other_app');
            }
        }, app_log: function (e, n) {
            if (Internal.isNotEmptyString(e)) {
                Internal.isNotEmptyString(n) || (n = '');
                var a = {};
                a.log = e, a.result = n, Internal.callNative('Util', 'h5Log', a, 'log');
            }
        }, app_choose_photo: function (e, n, a) {
            if (Internal.isSupportAPIWithVersion('5.7')) {
                var t = {};
                t.maxFileSize = e, t.maxPhotoCount = n, t.meta = a, Internal.callNative('Util', 'choosePhoto', t, 'choose_photo');
            }
        }, app_save_photo: function (e, n, a) {
            if (Internal.isSupportAPIWithVersion('5.7')) {
                var t = {};
                e || (e = ''), n || (n = ''), a || (a = ''), t.photoUrl = e, t.photoBase64String = n, t.imageName = a, Internal.callNative('Util', 'savePhoto', t, 'save_photo');
            }
        }, app_add_shortcut: function (e, n, a) {
            if (Internal.isSupportAPIWithVersion('6.4')) {
                var t = {};
                e || (e = ''), n || (n = ''), a || (a = ''), t.url = e, t.shortcutName = n, t.imageName = a, Internal.callNative('Util', 'addShortcut', t, 'add_shortcut');
            }
        }, app_h5_page_finish_loading: function () {
            Internal.isSupportAPIWithVersion('5.8') && Internal.callNative('Util', 'h5PageFinishLoading', null, 'h5_page_finish_loading');
        }, app_show_photo_broswer: function (e, n, a, t) {
            if (Internal.isSupportAPIWithVersion('6.5')) {
                var i = {};
                i.photoList = e, i.shareDataList = n, i.showPhotoIndex = a, i.meta = t, Internal.callNative('Util', 'showPhotoBroswer', i, 'show_photo_broswer');
            }
        }, app_scan_qrcode: function () {
            Internal.isSupportAPIWithVersion('6.6') && Internal.callNative('Util', 'scanQRCode', null, 'scan_qrcode');
        }, app_set_screen_brightness: function (e) {
            if (Internal.isSupportAPIWithVersion('6.11')) {
                var n = {};
                n.brightness = e, Internal.callNative('Util', 'setScreenBrightness', n, 'set_screen_brightness');
            }
        }, app_get_screen_brightness: function () {
            Internal.isSupportAPIWithVersion('6.11') && Internal.callNative('Util', 'getScreenBrightness', null, 'get_screen_brightness');
        }, app_set_status_bar_style: function (e) {
            if (Internal.isSupportAPIWithVersion('6.15')) {
                var n = {};
                n.statusBarStyle = e, Internal.callNative('Util', 'setStatusBarStyle', n, 'set_status_bar_style');
            }
        }, app_is_remote_notification_enabled: function () {
            Internal.isSupportAPIWithVersion('6.15') && Internal.callNative('Util', 'isRemoteNotificationEnabled', null, 'is_remote_notification_enabled');
        }, getHybridPackageInfo: function (e, n) {
            var a = {};
            a.packageName = e, Internal.callNative('Util', 'getHybridPackageInfo', a, 'getHybridPackageInfo', n);
        }, appSetWebviewBounce: function (e) {
            if (Internal.isIOS) {
                var n = {};
                n.isNeedBounce = e, Internal.callNative('Util', 'setWebviewBounce', n, 'appSetWebviewBounce');
            }
        }, appShowVRBrower: function (e, n) {
            Internal.callNative('Util', 'appShowVRBrower', e, 'appShowVRBrower', n);
        }
    };
//# sourceMappingURL=bridge.js.5e6cb8cb.map