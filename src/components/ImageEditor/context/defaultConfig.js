/** Internal Dependencies */
import {
  MIN_CROP,
  TABS_IDS,
  TOOLS_IDS,
  ENLARGE_ALL_TOOLS,
} from "../../ImageEditor/utils/constants";

export default {
  theme: {
    palette: {
      "bg-primary-active": "#ECF3FF",
    },
    typography: {
      fontFamily: "Roboto, Arial",
    },
  },
  annotationsCommon: {
    fill: "#000000", // or should be no color? === undefined
    stroke: "#000000", // or should be no color? === undefined
    strokeWidth: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shadowBlur: 0,
    shadowColor: "#000000", // or should be no color? === undefined
    shadowOpacity: 1,
    opacity: 1,
  },
  [TOOLS_IDS.TEXT]: {
    text: "Enter some text",
    fontFamily: "Arial",
    fonts: [
      { label: "Arial", value: "Arial" },
      "Tahoma",
      "Sans-serif",
      { label: "Comic Sans", value: "Comic-sans" },
    ],
    fontSize: 10 * ENLARGE_ALL_TOOLS.FONT,
    letterSpacing: 0,
    lineHeight: 1,
    align: "left", // left, center, right
    fontStyle: "normal", // 'bold', 'italic', 'bold italic'
    onFontChange: undefined,
  },
  [TOOLS_IDS.RISKTEXT]: {
    text: "Risk of nerve injury explained",
    fontFamily: "Arial",
    fonts: [
      { label: "Arial", value: "Arial" },
      "Tahoma",
      "Sans-serif",
      { label: "Comic Sans", value: "Comic-sans" },
    ],
    fontSize: 10 * ENLARGE_ALL_TOOLS.FONT,
    letterSpacing: 0,
    lineHeight: 1,
    align: "center", // left, center, right
    fontStyle: "normal", // 'bold', 'italic', 'bold italic'
    fill: "#ff0000",
    strokeWidth: 1,
    stroke: "#ff0000",
    onFontChange: undefined,
    fillRect: "#ffffff",
  },
  [TOOLS_IDS.IMAGE]: {
    fill: undefined,
  },
  [TOOLS_IDS.RECT]: {
    fill: "rgba(0,0,0,0)",
    stroke: "#ff0000",
    strokeWidth: 3 * ENLARGE_ALL_TOOLS.STROKE,
  },
  [TOOLS_IDS.ELLIPSE]: {
    fill: "rgba(0,0,0,0)",
    stroke: "#ff0000",
    strokeWidth: 3 * ENLARGE_ALL_TOOLS.STROKE,
  },
  [TOOLS_IDS.POLYGON]: {
    sides: 3,
  },
  [TOOLS_IDS.PEN]: {
    strokeWidth: 2 * ENLARGE_ALL_TOOLS.STROKE,
    tension: 0.5,
    lineCap: "round",
  },
  [TOOLS_IDS.LINE]: {
    lineCap: "butt", // butt/round/square
    fill: "#ff0000",
    stroke: "#ff0000",
    strokeWidth: 2 * ENLARGE_ALL_TOOLS.STROKE,
  },
  [TOOLS_IDS.ARROW]: {
    stroke: "#ff0000",
    strokeWidth: 2 * ENLARGE_ALL_TOOLS.STROKE,
    lineCap: "butt",
    fill: "#ff0000",
    pointerLength: 30,
    pointerWidth: 30,
  },
  [TOOLS_IDS.WATERMARK]: {
    gallery: [],
    textScalingRatio: 0.5,
    imageScalingRatio: 0.5,
  },
  [TOOLS_IDS.CROP]: {
    minWidth: MIN_CROP.WIDTH,
    minHeight: MIN_CROP.HEIGHT,
    width: null,
    height: null,
    maxWidth: null,
    maxHeight: null,
    ratio: "original",
    ratioTitleKey: undefined,
    noPresets: false,
    autoResize: false,
    presetsItems: [],
    presetsFolders: [],
  },
  [TOOLS_IDS.ROTATE]: {
    angle: 60,
    componentType: "slider", // slider | buttons
  },
  tabsIds: [],
  defaultTabId: TABS_IDS.ADJUST,
  defaultToolId: TOOLS_IDS.CROP,
  onClose: undefined,
  onSave: undefined,
  onBeforeSave: undefined,
  closeAfterSave: false,
  defaultSavedImageName: undefined,
  defaultSavedImageType: null,
  forceToPngInEllipticalCrop: false,
  useBackendTranslations: true,
  translations: null,
  language: "en",
  avoidChangesNotSavedAlertOnLeave: false,
  loadableDesignState: null,
  moreSaveOptions: [],
  savingPixelRatio: 4,
  previewPixelRatio: window ? window.devicePixelRatio || 1 : 1,
  showBackButton: false,
  useCloudimage: false,
  cloudimage: {
    token: "",
    dontPrefixUrl: false,
    domain: "cloudimg.io",
    version: "",
    loadableQuery: "",
    secureProtocol: true,
    imageSealing: {
      enable: false,
      salt: "",
      charCount: 10,
      includeParams: [],
    },
  },
  observePluginContainerSize: false,
  showCanvasOnly: false,
  getCurrentImgDataFnRef: undefined,
  onModify: undefined,
  useZoomPresetsMenu: true,
  disableZooming: false,
};
