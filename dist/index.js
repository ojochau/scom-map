var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@scom/scom-map/interface.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("@scom/scom-map/store.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getAPIUrl = exports.setAPIUrl = exports.getAPIKey = exports.setAPIKey = exports.getEmbeddedUrl = exports.setEmbeddedUrl = exports.setDataFromSCConfig = exports.state = void 0;
    ///<amd-module name='@scom/scom-map/store.ts'/> 
    exports.state = {
        embeddedUrl: "",
        apiKey: "",
        apiUrl: ""
    };
    const setDataFromSCConfig = (options) => {
        if (options.apiKey) {
            exports.setAPIKey(options.apiKey);
        }
        if (options.apiUrl) {
            exports.setAPIUrl(options.apiUrl);
        }
        if (options.embeddedUrl) {
            exports.setEmbeddedUrl(options.embeddedUrl);
        }
    };
    exports.setDataFromSCConfig = setDataFromSCConfig;
    const setEmbeddedUrl = (url) => {
        exports.state.embeddedUrl = url;
    };
    exports.setEmbeddedUrl = setEmbeddedUrl;
    const getEmbeddedUrl = () => {
        return exports.state.embeddedUrl;
    };
    exports.getEmbeddedUrl = getEmbeddedUrl;
    const setAPIKey = (value) => {
        exports.state.apiKey = value;
    };
    exports.setAPIKey = setAPIKey;
    const getAPIKey = () => {
        return exports.state.apiKey;
    };
    exports.getAPIKey = getAPIKey;
    const setAPIUrl = (value) => {
        exports.state.apiUrl = value;
    };
    exports.setAPIUrl = setAPIUrl;
    const getAPIUrl = () => {
        return exports.state.apiUrl;
    };
    exports.getAPIUrl = getAPIUrl;
});
define("@scom/scom-map/scconfig.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-map/scconfig.json.ts'/> 
    exports.default = {
        "name": "@scom-map/main",
        "version": "0.1.0",
        "env": "",
        "moduleDir": "src",
        "main": "@scom-map/main",
        "modules": {},
        "apiKey": "",
        "apiUrl": "https://www.google.com/maps/embed/v1/place",
        "embeddedUrl": "https://maps.google.com/maps?hl=en&q={lat},{long}&t=h&z=14&ie=UTF8&iwloc=B&output=embed"
    };
});
define("@scom/scom-map/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_1.Styles.Theme.ThemeVars;
    components_1.Styles.cssRule('i-scom-map', {
        $nest: {
            '#pnlModule': {
                height: '100%'
            }
        }
    });
});
define("@scom/scom-map", ["require", "exports", "@ijstech/components", "@scom/scom-map/store.ts", "@scom/scom-map/scconfig.json.ts", "@scom/scom-map/index.css.ts"], function (require, exports, components_2, store_1, scconfig_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const DEFAULT_ZOOM = 14;
    let ScomMap = class ScomMap extends components_2.Module {
        constructor(parent, options) {
            super(parent, options);
            this.data = {};
            this.oldData = {};
            if (scconfig_json_1.default) {
                store_1.setDataFromSCConfig(scconfig_json_1.default);
            }
        }
        init() {
            super.init();
            const width = this.getAttribute('width', true);
            const height = this.getAttribute('height', true);
            this.setTag({
                width: width ? this.width : '500px',
                height: height ? this.height : '300px'
            });
            this.data.long = this.getAttribute('long', true, 0);
            this.data.lat = this.getAttribute('lat', true, 0);
            this.data.viewMode = this.getAttribute('viewMode', true, 'roadmap');
            this.data.zoom = this.getAttribute('zoom', true, DEFAULT_ZOOM);
            this.data.address = this.getAttribute('address', true, '');
            this.data.showHeader = this.getAttribute('showHeader', true, true);
            this.data.showFooter = this.getAttribute('showFooter', true, true);
            this.setData(this.data);
        }
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        get long() {
            var _a;
            return (_a = this.data.long) !== null && _a !== void 0 ? _a : 0;
        }
        set long(value) {
            this.data.long = value;
        }
        get lat() {
            var _a;
            return (_a = this.data.lat) !== null && _a !== void 0 ? _a : 0;
        }
        set lat(value) {
            this.data.lat = value;
        }
        get viewMode() {
            var _a;
            return (_a = this.data.viewMode) !== null && _a !== void 0 ? _a : 'roadmap';
        }
        set viewMode(value) {
            this.data.viewMode = value;
        }
        get address() {
            var _a;
            return (_a = this.data.address) !== null && _a !== void 0 ? _a : '';
        }
        set address(value) {
            this.data.address = value;
        }
        get zoom() {
            var _a;
            return (_a = this.data.zoom) !== null && _a !== void 0 ? _a : DEFAULT_ZOOM;
        }
        set zoom(value) {
            this.data.zoom = value;
        }
        get showFooter() {
            var _a;
            return (_a = this.data.showFooter) !== null && _a !== void 0 ? _a : true;
        }
        set showFooter(value) {
            this.data.showFooter = value;
            if (this.dappContainer)
                this.dappContainer.showFooter = this.showFooter;
        }
        get showHeader() {
            var _a;
            return (_a = this.data.showHeader) !== null && _a !== void 0 ? _a : true;
        }
        set showHeader(value) {
            this.data.showHeader = value;
            if (this.dappContainer)
                this.dappContainer.showHeader = this.showHeader;
        }
        // getConfigSchema() {
        //   return configSchema
        // }
        getConfigurators() {
            return [
                {
                    name: 'Builder Configurator',
                    target: 'Builders',
                    getActions: this.getActions.bind(this),
                    getData: this.getData.bind(this),
                    setData: this.setData.bind(this),
                    getTag: this.getTag.bind(this),
                    setTag: this.setTag.bind(this)
                },
                {
                    name: 'Emdedder Configurator',
                    target: 'Embedders',
                    getActions: this.getEmbedderActions.bind(this),
                    getData: this.getData.bind(this),
                    setData: this.setData.bind(this),
                    getTag: this.getTag.bind(this),
                    setTag: this.setTag.bind(this)
                }
            ];
        }
        getData() {
            return this.data;
        }
        getUrl() {
            const baseUrl = store_1.getAPIUrl();
            const params = new URLSearchParams();
            const apiKey = this.data.apiKey || store_1.getAPIKey() || '';
            params.append('key', apiKey);
            const position = `${this.lat},${this.long}`;
            if (this.address) {
                params.append('q', this.address);
                if (this.lat || this.long)
                    params.append('center', position);
            }
            else {
                params.append('q', position);
            }
            params.append('zoom', this.zoom.toString());
            params.append('maptype', this.viewMode);
            return `${baseUrl}?${params.toString()}`;
        }
        async setData(value) {
            this.oldData = this.data;
            this.data = value;
            const url = this.getUrl();
            this.iframeElm.url = url;
            if (this.dappContainer) {
                this.dappContainer.showHeader = this.showHeader;
                this.dappContainer.showFooter = this.showFooter;
            }
        }
        getTag() {
            return this.tag;
        }
        async setTag(value) {
            this.tag = value;
            if (this.dappContainer) {
                this.dappContainer.width = this.tag.width;
                this.dappContainer.height = this.tag.height;
            }
        }
        getPropertiesSchema() {
            const propertiesSchema = {
                type: 'object',
                properties: {
                    address: {
                        type: 'string'
                    },
                    lat: {
                        type: 'number',
                        title: 'Latitude'
                    },
                    long: {
                        type: 'number',
                        title: 'Longitude'
                    },
                    zoom: {
                        type: 'number',
                        minimum: 0,
                        maximum: 21,
                        default: DEFAULT_ZOOM
                    },
                    viewMode: {
                        type: "string",
                        enum: ['roadmap', 'satellite'],
                        default: 'roadmap'
                    },
                    apiKey: {
                        type: "string",
                        title: "API Key"
                    }
                }
            };
            return propertiesSchema;
        }
        getEmbedderActions() {
            const propertiesSchema = this.getPropertiesSchema();
            const themeSchema = {
                type: 'object',
                properties: {
                    width: {
                        type: 'string',
                        readOnly: true,
                    },
                    height: {
                        type: 'string',
                        readOnly: true,
                    },
                },
            };
            return this._getActions(propertiesSchema, themeSchema);
        }
        getActions() {
            const propertiesSchema = this.getPropertiesSchema();
            const themeSchema = {
                type: 'object',
                properties: {
                    width: {
                        type: 'string',
                    },
                    height: {
                        type: 'string',
                    },
                },
            };
            return this._getActions(propertiesSchema, themeSchema);
        }
        _getActions(settingSchema, themeSchema) {
            const actions = [
                {
                    name: 'Settings',
                    icon: 'cog',
                    command: (builder, userInputData) => {
                        return {
                            execute: () => {
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(userInputData);
                                this.setData(userInputData);
                            },
                            undo: () => {
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(this.oldData);
                                this.setData(this.oldData);
                            },
                            redo: () => { },
                        };
                    },
                    userInputDataSchema: settingSchema,
                },
            ];
            return actions;
        }
        render() {
            return (this.$render("i-scom-dapp-container", { id: "dappContainer", showWalletNetwork: false, display: "block" },
                this.$render("i-iframe", { id: "iframeElm", width: "100%", height: "100%", display: "flex" })));
        }
    };
    ScomMap = __decorate([
        components_2.customModule,
        components_2.customElements('i-scom-map')
    ], ScomMap);
    exports.default = ScomMap;
});
