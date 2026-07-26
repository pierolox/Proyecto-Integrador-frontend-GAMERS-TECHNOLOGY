import { Component, signal } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
const _forTrack0 = ($index, $item) => $item.id;
const _forTrack1 = ($index, $item) => $item.label;
function PanelAdmin_For_16_Case_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵdomElementStart(0, "svg", 15);
    i0.ɵɵdomElement(1, "rect", 17)(2, "rect", 18)(3, "rect", 19)(4, "rect", 20);
    i0.ɵɵdomElementEnd();
} }
function PanelAdmin_For_16_Case_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵdomElementStart(0, "svg", 15);
    i0.ɵɵdomElement(1, "path", 21)(2, "path", 22)(3, "path", 23);
    i0.ɵɵdomElementEnd();
} }
function PanelAdmin_For_16_Case_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵdomElementStart(0, "svg", 15);
    i0.ɵɵdomElement(1, "path", 24)(2, "circle", 25);
    i0.ɵɵdomElementEnd();
} }
function PanelAdmin_For_16_Case_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵdomElementStart(0, "svg", 15);
    i0.ɵɵdomElement(1, "path", 26)(2, "path", 27)(3, "path", 28);
    i0.ɵɵdomElementEnd();
} }
function PanelAdmin_For_16_Case_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵdomElementStart(0, "svg", 15);
    i0.ɵɵdomElement(1, "path", 29)(2, "circle", 30)(3, "circle", 31);
    i0.ɵɵdomElementEnd();
} }
function PanelAdmin_For_16_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵdomElementStart(0, "button", 13);
    i0.ɵɵdomListener("click", function PanelAdmin_For_16_Template_button_click_0_listener() { const item_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.seleccionarSeccion(item_r2.id)); });
    i0.ɵɵdomElementStart(1, "span", 14);
    i0.ɵɵconditionalCreate(2, PanelAdmin_For_16_Case_2_Template, 5, 0, ":svg:svg", 15)(3, PanelAdmin_For_16_Case_3_Template, 4, 0, ":svg:svg", 15)(4, PanelAdmin_For_16_Case_4_Template, 3, 0, ":svg:svg", 15)(5, PanelAdmin_For_16_Case_5_Template, 4, 0, ":svg:svg", 15)(6, PanelAdmin_For_16_Case_6_Template, 4, 0, ":svg:svg", 15);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(7, "span", 16);
    i0.ɵɵtext(8);
    i0.ɵɵdomElementEnd()();
} if (rf & 2) {
    let tmp_11_0;
    const item_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("active", ctx_r2.seccionActiva() === item_r2.id);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional((tmp_11_0 = item_r2.icon) === "grid" ? 2 : tmp_11_0 === "box" ? 3 : tmp_11_0 === "tag" ? 4 : tmp_11_0 === "layers" ? 5 : tmp_11_0 === "cart" ? 6 : -1);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(item_r2.label);
} }
function PanelAdmin_Conditional_18_For_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 34)(1, "span", 36);
    i0.ɵɵtext(2);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(3, "span", 37);
    i0.ɵɵtext(4);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(5, "span", 38);
    i0.ɵɵtext(6);
    i0.ɵɵdomElementEnd()();
} if (rf & 2) {
    const stat_r4 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(stat_r4.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(stat_r4.value);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("negative", !stat_r4.positive);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("", stat_r4.trend, " vs. mes anterior");
} }
function PanelAdmin_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 32)(1, "h2");
    i0.ɵɵtext(2, "Dashboard");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(3, "p");
    i0.ɵɵtext(4, "Resumen general de la actividad de tu tienda.");
    i0.ɵɵdomElementEnd()();
    i0.ɵɵdomElementStart(5, "div", 33);
    i0.ɵɵrepeaterCreate(6, PanelAdmin_Conditional_18_For_7_Template, 7, 5, "div", 34, _forTrack1);
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(8, "div", 35)(9, "p");
    i0.ɵɵtext(10, "Aqu\u00ED se mostrar\u00E1n gr\u00E1ficos de ventas, actividad reciente y accesos r\u00E1pidos.");
    i0.ɵɵdomElementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵrepeater(ctx_r2.stats);
} }
function PanelAdmin_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 32)(1, "h2");
    i0.ɵɵtext(2, "Productos");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(3, "p");
    i0.ɵɵtext(4, "Gestiona el cat\u00E1logo de productos de tu tienda.");
    i0.ɵɵdomElementEnd()();
    i0.ɵɵdomElementStart(5, "div", 35)(6, "p");
    i0.ɵɵtext(7, "Aqu\u00ED ir\u00E1 la tabla de productos (nombre, precio, stock, categor\u00EDa, acciones).");
    i0.ɵɵdomElementEnd()();
} }
function PanelAdmin_Conditional_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 32)(1, "h2");
    i0.ɵɵtext(2, "Categor\u00EDas");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(3, "p");
    i0.ɵɵtext(4, "Organiza los productos por categor\u00EDa.");
    i0.ɵɵdomElementEnd()();
    i0.ɵɵdomElementStart(5, "div", 35)(6, "p");
    i0.ɵɵtext(7, "Aqu\u00ED ir\u00E1 el listado y la administraci\u00F3n de categor\u00EDas.");
    i0.ɵɵdomElementEnd()();
} }
function PanelAdmin_Conditional_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 32)(1, "h2");
    i0.ɵɵtext(2, "SubCategor\u00EDas");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(3, "p");
    i0.ɵɵtext(4, "Administra las subcategor\u00EDas asociadas a cada categor\u00EDa.");
    i0.ɵɵdomElementEnd()();
    i0.ɵɵdomElementStart(5, "div", 35)(6, "p");
    i0.ɵɵtext(7, "Aqu\u00ED ir\u00E1 el listado y la administraci\u00F3n de subcategor\u00EDas.");
    i0.ɵɵdomElementEnd()();
} }
function PanelAdmin_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 32)(1, "h2");
    i0.ɵɵtext(2, "Pedidos");
    i0.ɵɵdomElementEnd();
    i0.ɵɵdomElementStart(3, "p");
    i0.ɵɵtext(4, "Revisa y da seguimiento a los pedidos de tus clientes.");
    i0.ɵɵdomElementEnd()();
    i0.ɵɵdomElementStart(5, "div", 35)(6, "p");
    i0.ɵɵtext(7, "Aqu\u00ED ir\u00E1 la tabla de pedidos (cliente, estado, total, fecha, acciones).");
    i0.ɵɵdomElementEnd()();
} }
export class PanelAdmin {
    router;
    seccionActiva = signal('dashboard', /* @ts-ignore */
    ...(ngDevMode ? [{ debugName: "seccionActiva" }] : /* istanbul ignore next */ []));
    secciones = [
        { id: 'dashboard', label: 'Dashboard', icon: 'grid' },
        { id: 'productos', label: 'Productos', icon: 'box' },
        { id: 'categorias', label: 'Categorías', icon: 'tag' },
        { id: 'subcategorias', label: 'SubCategorías', icon: 'layers' },
        { id: 'pedidos', label: 'Pedidos', icon: 'cart' },
    ];
    stats = [
        { label: 'Ventas del mes', value: '$48,290', trend: '+12.4%', positive: true },
        { label: 'Pedidos nuevos', value: '186', trend: '+5.1%', positive: true },
        { label: 'Productos activos', value: '324', trend: '-1.2%', positive: false },
        { label: 'Clientes nuevos', value: '57', trend: '+8.9%', positive: true },
    ];
    constructor(router) {
        this.router = router;
    }
    seleccionarSeccion(id) {
        this.seccionActiva.set(id);
    }
    cerrarSesion() {
        this.router.navigate(['/']);
    }
    static ɵfac = function PanelAdmin_Factory(__ngFactoryType__) { /* @ts-ignore */
    return new (__ngFactoryType__ || PanelAdmin)(i0.ɵɵdirectiveInject(i1.Router)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PanelAdmin, selectors: [["app-panel-admin"]], decls: 23, vars: 5, consts: [[1, "contenedor"], [1, "header"], [1, "logo"], ["aria-hidden", "true", 1, "logo-badge"], ["viewBox", "0 0 24 24", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["d", "M12 2L3 6.5V11.5C3 16.7 6.8 21.4 12 22.5C17.2 21.4 21 16.7 21 11.5V6.5L12 2Z", "stroke", "currentColor", "stroke-width", "1.6", "stroke-linejoin", "round"], ["d", "M8.5 12L11 14.5L15.5 9.5", "stroke", "currentColor", "stroke-width", "1.6", "stroke-linecap", "round", "stroke-linejoin", "round"], [1, "logout-btn", 3, "click"], ["d", "M15 17L20 12M20 12L15 7M20 12H8", "stroke", "currentColor", "stroke-width", "1.8", "stroke-linecap", "round", "stroke-linejoin", "round"], ["d", "M8 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H8", "stroke", "currentColor", "stroke-width", "1.8", "stroke-linecap", "round", "stroke-linejoin", "round"], [1, "sidebar"], [1, "nav-item", 3, "active"], [1, "contenido"], [1, "nav-item", 3, "click"], ["aria-hidden", "true", 1, "icon"], ["viewBox", "0 0 24 24", "fill", "none"], [1, "label"], ["x", "3", "y", "3", "width", "8", "height", "8", "rx", "1.5", "stroke", "currentColor", "stroke-width", "1.7"], ["x", "13", "y", "3", "width", "8", "height", "8", "rx", "1.5", "stroke", "currentColor", "stroke-width", "1.7"], ["x", "3", "y", "13", "width", "8", "height", "8", "rx", "1.5", "stroke", "currentColor", "stroke-width", "1.7"], ["x", "13", "y", "13", "width", "8", "height", "8", "rx", "1.5", "stroke", "currentColor", "stroke-width", "1.7"], ["d", "M21 8L12 3L3 8L12 13L21 8Z", "stroke", "currentColor", "stroke-width", "1.7", "stroke-linejoin", "round"], ["d", "M3 8V16L12 21L21 16V8", "stroke", "currentColor", "stroke-width", "1.7", "stroke-linejoin", "round"], ["d", "M12 13V21", "stroke", "currentColor", "stroke-width", "1.7"], ["d", "M20.6 12.5L12.5 20.6C12 21.1 11.2 21.1 10.7 20.6L3.4 13.3C2.9 12.8 2.9 12 3.4 11.5L11.5 3.4C12 2.9 12.8 2.9 13.3 3.4L20.6 10.7C21.1 11.2 21.1 12 20.6 12.5Z", "stroke", "currentColor", "stroke-width", "1.7", "stroke-linejoin", "round"], ["cx", "8.5", "cy", "8.5", "r", "1.3", "fill", "currentColor"], ["d", "M12 2L2 7L12 12L22 7L12 2Z", "stroke", "currentColor", "stroke-width", "1.7", "stroke-linejoin", "round"], ["d", "M2 12L12 17L22 12", "stroke", "currentColor", "stroke-width", "1.7", "stroke-linejoin", "round"], ["d", "M2 17L12 22L22 17", "stroke", "currentColor", "stroke-width", "1.7", "stroke-linejoin", "round"], ["d", "M3 3H5L6.4 14.2C6.5 15.2 7.3 16 8.3 16H18C19 16 19.8 15.2 19.9 14.2L21 6H6", "stroke", "currentColor", "stroke-width", "1.7", "stroke-linecap", "round", "stroke-linejoin", "round"], ["cx", "9", "cy", "20", "r", "1.3", "fill", "currentColor"], ["cx", "18", "cy", "20", "r", "1.3", "fill", "currentColor"], [1, "section-header"], [1, "stats-grid"], [1, "stat-card"], [1, "panel-placeholder"], [1, "stat-label"], [1, "stat-value"], [1, "stat-trend"]], template: function PanelAdmin_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "div", 0)(1, "header", 1)(2, "div", 2)(3, "div", 3);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵdomElementStart(4, "svg", 4);
            i0.ɵɵdomElement(5, "path", 5)(6, "path", 6);
            i0.ɵɵdomElementEnd()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵdomElementStart(7, "h1");
            i0.ɵɵtext(8, "Panel del Administrador");
            i0.ɵɵdomElementEnd()();
            i0.ɵɵdomElementStart(9, "button", 7);
            i0.ɵɵdomListener("click", function PanelAdmin_Template_button_click_9_listener() { return ctx.cerrarSesion(); });
            i0.ɵɵnamespaceSVG();
            i0.ɵɵdomElementStart(10, "svg", 4);
            i0.ɵɵdomElement(11, "path", 8)(12, "path", 9);
            i0.ɵɵdomElementEnd();
            i0.ɵɵtext(13, " Cerrar sesi\u00F3n ");
            i0.ɵɵdomElementEnd()();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵdomElementStart(14, "aside", 10);
            i0.ɵɵrepeaterCreate(15, PanelAdmin_For_16_Template, 9, 4, "button", 11, _forTrack0);
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(17, "main", 12);
            i0.ɵɵconditionalCreate(18, PanelAdmin_Conditional_18_Template, 11, 0);
            i0.ɵɵconditionalCreate(19, PanelAdmin_Conditional_19_Template, 8, 0);
            i0.ɵɵconditionalCreate(20, PanelAdmin_Conditional_20_Template, 8, 0);
            i0.ɵɵconditionalCreate(21, PanelAdmin_Conditional_21_Template, 8, 0);
            i0.ɵɵconditionalCreate(22, PanelAdmin_Conditional_22_Template, 8, 0);
            i0.ɵɵdomElementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(15);
            i0.ɵɵrepeater(ctx.secciones);
            i0.ɵɵadvance(3);
            i0.ɵɵconditional(ctx.seccionActiva() === "dashboard" ? 18 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.seccionActiva() === "productos" ? 19 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.seccionActiva() === "categorias" ? 20 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.seccionActiva() === "subcategorias" ? 21 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.seccionActiva() === "pedidos" ? 22 : -1);
        } }, styles: [".contenedor[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: 240px 1fr;\n    grid-template-rows: 72px 1fr;\n    height: 100vh;\n    background: var(--color-bg, #f4f5fb);\n}\n\n\n.header[_ngcontent-%COMP%] {\n    grid-column: 1 / 3;\n\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n\n    padding: 0 28px;\n\n    background: linear-gradient(120deg, #1e1b3a, #312e81);\n    color: white;\n\n    box-shadow: var(--shadow-sm, 0 1px 2px rgba(16, 24, 40, .06));\n    z-index: 5;\n}\n\n.logo[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 12px;\n}\n\n.logo-badge[_ngcontent-%COMP%] {\n    width: 34px;\n    height: 34px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    color: var(--color-accent, #22d3ee);\n}\n\n.logo-badge[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n    width: 100%;\n    height: 100%;\n}\n\n.header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 18px;\n    font-weight: 600;\n    margin: 0;\n    letter-spacing: .01em;\n}\n\n.logout-btn[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n\n    border: 1px solid rgba(255, 255, 255, 0.22);\n    background: rgba(255, 255, 255, 0.08);\n    color: white;\n\n    padding: 9px 16px;\n    border-radius: var(--radius-sm, 8px);\n\n    font-size: 14px;\n    font-weight: 500;\n    cursor: pointer;\n\n    transition: background .15s;\n}\n\n.logout-btn[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n    width: 18px;\n    height: 18px;\n}\n\n.logout-btn[_ngcontent-%COMP%]:hover {\n    background: rgba(255, 255, 255, 0.18);\n}\n\n\n.sidebar[_ngcontent-%COMP%] {\n    background: var(--color-surface, #fff);\n    border-right: 1px solid var(--color-border, #e5e7eb);\n\n    display: flex;\n    flex-direction: column;\n    gap: 4px;\n\n    padding: 18px 12px;\n}\n\n.nav-item[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 12px;\n\n    height: 46px;\n    padding: 0 14px;\n\n    border: none;\n    border-radius: var(--radius-sm, 8px);\n\n    background: transparent;\n    color: var(--color-text-muted, #6b7280);\n\n    font-size: 15px;\n    font-weight: 500;\n    text-align: left;\n    cursor: pointer;\n\n    transition: background .15s, color .15s;\n}\n\n.nav-item[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%] {\n    width: 20px;\n    height: 20px;\n    display: flex;\n    flex-shrink: 0;\n}\n\n.nav-item[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n    width: 100%;\n    height: 100%;\n}\n\n.nav-item[_ngcontent-%COMP%]:hover {\n    background: #ececfb;\n    color: var(--color-primary, #4338ca);\n}\n\n.nav-item.active[_ngcontent-%COMP%] {\n    background: var(--color-primary, #4338ca);\n    color: white;\n}\n\n\n.contenido[_ngcontent-%COMP%] {\n    padding: 28px 32px;\n    overflow-y: auto;\n}\n\n.section-header[_ngcontent-%COMP%] {\n    margin-bottom: 24px;\n}\n\n.section-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    margin: 0 0 4px;\n    font-size: 24px;\n    font-weight: 700;\n    color: var(--color-text, #1e1b3a);\n}\n\n.section-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    margin: 0;\n    color: var(--color-text-muted, #6b7280);\n    font-size: 14.5px;\n}\n\n.stats-grid[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n    gap: 18px;\n    margin-bottom: 24px;\n}\n\n.stat-card[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 6px;\n\n    background: var(--color-surface, #fff);\n    border: 1px solid var(--color-border, #e5e7eb);\n    border-radius: var(--radius-md, 14px);\n\n    padding: 20px;\n    box-shadow: var(--shadow-sm, 0 1px 2px rgba(16, 24, 40, .06));\n}\n\n.stat-label[_ngcontent-%COMP%] {\n    font-size: 13.5px;\n    color: var(--color-text-muted, #6b7280);\n    font-weight: 500;\n}\n\n.stat-value[_ngcontent-%COMP%] {\n    font-size: 26px;\n    font-weight: 700;\n    color: var(--color-text, #1e1b3a);\n}\n\n.stat-trend[_ngcontent-%COMP%] {\n    font-size: 12.5px;\n    font-weight: 600;\n    color: var(--color-success, #16a34a);\n}\n\n.stat-trend.negative[_ngcontent-%COMP%] {\n    color: var(--color-danger, #ef4444);\n}\n\n.panel-placeholder[_ngcontent-%COMP%] {\n    background: var(--color-surface, #fff);\n    border: 1px dashed var(--color-border, #e5e7eb);\n    border-radius: var(--radius-md, 14px);\n\n    padding: 48px 24px;\n\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    text-align: center;\n\n    color: var(--color-text-muted, #6b7280);\n    font-size: 14.5px;\n    min-height: 220px;\n}\n\n\n@media (max-width: 860px) {\n    .contenedor[_ngcontent-%COMP%] {\n        grid-template-columns: 76px 1fr;\n    }\n\n    .nav-item[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n        display: none;\n    }\n\n    .nav-item[_ngcontent-%COMP%] {\n        justify-content: center;\n        padding: 0;\n    }\n\n    .header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n        font-size: 15px;\n    }\n\n    .logout-btn[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n   .logout-btn[_ngcontent-%COMP%] {\n        font-size: 0;\n        gap: 0;\n        padding: 9px;\n    }\n\n    .logout-btn[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n        width: 20px;\n        height: 20px;\n    }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PanelAdmin, [{
        type: Component,
        args: [{ selector: 'app-panel-admin', standalone: true, imports: [], template: "<div class=\"contenedor\">\n\n    <header class=\"header\">\n        <div class=\"logo\">\n            <div class=\"logo-badge\" aria-hidden=\"true\">\n                <svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path d=\"M12 2L3 6.5V11.5C3 16.7 6.8 21.4 12 22.5C17.2 21.4 21 16.7 21 11.5V6.5L12 2Z\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linejoin=\"round\"/>\n                    <path d=\"M8.5 12L11 14.5L15.5 9.5\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                </svg>\n            </div>\n            <h1>Panel del Administrador</h1>\n        </div>\n\n        <button class=\"logout-btn\" (click)=\"cerrarSesion()\">\n            <svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <path d=\"M15 17L20 12M20 12L15 7M20 12H8\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n                <path d=\"M8 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H8\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n            </svg>\n            Cerrar sesi\u00F3n\n        </button>\n    </header>\n\n    <aside class=\"sidebar\">\n        @for (item of secciones; track item.id) {\n        <button\n            class=\"nav-item\"\n            [class.active]=\"seccionActiva() === item.id\"\n            (click)=\"seleccionarSeccion(item.id)\">\n\n            <span class=\"icon\" aria-hidden=\"true\">\n                @switch (item.icon) {\n                    @case ('grid') {\n                        <svg viewBox=\"0 0 24 24\" fill=\"none\"><rect x=\"3\" y=\"3\" width=\"8\" height=\"8\" rx=\"1.5\" stroke=\"currentColor\" stroke-width=\"1.7\"/><rect x=\"13\" y=\"3\" width=\"8\" height=\"8\" rx=\"1.5\" stroke=\"currentColor\" stroke-width=\"1.7\"/><rect x=\"3\" y=\"13\" width=\"8\" height=\"8\" rx=\"1.5\" stroke=\"currentColor\" stroke-width=\"1.7\"/><rect x=\"13\" y=\"13\" width=\"8\" height=\"8\" rx=\"1.5\" stroke=\"currentColor\" stroke-width=\"1.7\"/></svg>\n                    }\n                    @case ('box') {\n                        <svg viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M21 8L12 3L3 8L12 13L21 8Z\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linejoin=\"round\"/><path d=\"M3 8V16L12 21L21 16V8\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linejoin=\"round\"/><path d=\"M12 13V21\" stroke=\"currentColor\" stroke-width=\"1.7\"/></svg>\n                    }\n                    @case ('tag') {\n                        <svg viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M20.6 12.5L12.5 20.6C12 21.1 11.2 21.1 10.7 20.6L3.4 13.3C2.9 12.8 2.9 12 3.4 11.5L11.5 3.4C12 2.9 12.8 2.9 13.3 3.4L20.6 10.7C21.1 11.2 21.1 12 20.6 12.5Z\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linejoin=\"round\"/><circle cx=\"8.5\" cy=\"8.5\" r=\"1.3\" fill=\"currentColor\"/></svg>\n                    }\n                    @case ('layers') {\n                        <svg viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M12 2L2 7L12 12L22 7L12 2Z\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linejoin=\"round\"/><path d=\"M2 12L12 17L22 12\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linejoin=\"round\"/><path d=\"M2 17L12 22L22 17\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linejoin=\"round\"/></svg>\n                    }\n                    @case ('cart') {\n                        <svg viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M3 3H5L6.4 14.2C6.5 15.2 7.3 16 8.3 16H18C19 16 19.8 15.2 19.9 14.2L21 6H6\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><circle cx=\"9\" cy=\"20\" r=\"1.3\" fill=\"currentColor\"/><circle cx=\"18\" cy=\"20\" r=\"1.3\" fill=\"currentColor\"/></svg>\n                    }\n                }\n            </span>\n\n            <span class=\"label\">{{ item.label }}</span>\n        </button>\n        }\n    </aside>\n\n    <main class=\"contenido\">\n\n        @if (seccionActiva() === 'dashboard') {\n        <div class=\"section-header\">\n            <h2>Dashboard</h2>\n            <p>Resumen general de la actividad de tu tienda.</p>\n        </div>\n\n        <div class=\"stats-grid\">\n            @for (stat of stats; track stat.label) {\n            <div class=\"stat-card\">\n                <span class=\"stat-label\">{{ stat.label }}</span>\n                <span class=\"stat-value\">{{ stat.value }}</span>\n                <span class=\"stat-trend\" [class.negative]=\"!stat.positive\">{{ stat.trend }} vs. mes anterior</span>\n            </div>\n            }\n        </div>\n\n        <div class=\"panel-placeholder\">\n            <p>Aqu\u00ED se mostrar\u00E1n gr\u00E1ficos de ventas, actividad reciente y accesos r\u00E1pidos.</p>\n        </div>\n        }\n\n        @if (seccionActiva() === 'productos') {\n        <div class=\"section-header\">\n            <h2>Productos</h2>\n            <p>Gestiona el cat\u00E1logo de productos de tu tienda.</p>\n        </div>\n        <div class=\"panel-placeholder\">\n            <p>Aqu\u00ED ir\u00E1 la tabla de productos (nombre, precio, stock, categor\u00EDa, acciones).</p>\n        </div>\n        }\n\n        @if (seccionActiva() === 'categorias') {\n        <div class=\"section-header\">\n            <h2>Categor\u00EDas</h2>\n            <p>Organiza los productos por categor\u00EDa.</p>\n        </div>\n        <div class=\"panel-placeholder\">\n            <p>Aqu\u00ED ir\u00E1 el listado y la administraci\u00F3n de categor\u00EDas.</p>\n        </div>\n        }\n\n        @if (seccionActiva() === 'subcategorias') {\n        <div class=\"section-header\">\n            <h2>SubCategor\u00EDas</h2>\n            <p>Administra las subcategor\u00EDas asociadas a cada categor\u00EDa.</p>\n        </div>\n        <div class=\"panel-placeholder\">\n            <p>Aqu\u00ED ir\u00E1 el listado y la administraci\u00F3n de subcategor\u00EDas.</p>\n        </div>\n        }\n\n        @if (seccionActiva() === 'pedidos') {\n        <div class=\"section-header\">\n            <h2>Pedidos</h2>\n            <p>Revisa y da seguimiento a los pedidos de tus clientes.</p>\n        </div>\n        <div class=\"panel-placeholder\">\n            <p>Aqu\u00ED ir\u00E1 la tabla de pedidos (cliente, estado, total, fecha, acciones).</p>\n        </div>\n        }\n\n    </main>\n</div>\n", styles: [".contenedor {\n    display: grid;\n    grid-template-columns: 240px 1fr;\n    grid-template-rows: 72px 1fr;\n    height: 100vh;\n    background: var(--color-bg, #f4f5fb);\n}\n\n/* HEADER */\n.header {\n    grid-column: 1 / 3;\n\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n\n    padding: 0 28px;\n\n    background: linear-gradient(120deg, #1e1b3a, #312e81);\n    color: white;\n\n    box-shadow: var(--shadow-sm, 0 1px 2px rgba(16, 24, 40, .06));\n    z-index: 5;\n}\n\n.logo {\n    display: flex;\n    align-items: center;\n    gap: 12px;\n}\n\n.logo-badge {\n    width: 34px;\n    height: 34px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    color: var(--color-accent, #22d3ee);\n}\n\n.logo-badge svg {\n    width: 100%;\n    height: 100%;\n}\n\n.header h1 {\n    font-size: 18px;\n    font-weight: 600;\n    margin: 0;\n    letter-spacing: .01em;\n}\n\n.logout-btn {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n\n    border: 1px solid rgba(255, 255, 255, 0.22);\n    background: rgba(255, 255, 255, 0.08);\n    color: white;\n\n    padding: 9px 16px;\n    border-radius: var(--radius-sm, 8px);\n\n    font-size: 14px;\n    font-weight: 500;\n    cursor: pointer;\n\n    transition: background .15s;\n}\n\n.logout-btn svg {\n    width: 18px;\n    height: 18px;\n}\n\n.logout-btn:hover {\n    background: rgba(255, 255, 255, 0.18);\n}\n\n/* SIDEBAR */\n.sidebar {\n    background: var(--color-surface, #fff);\n    border-right: 1px solid var(--color-border, #e5e7eb);\n\n    display: flex;\n    flex-direction: column;\n    gap: 4px;\n\n    padding: 18px 12px;\n}\n\n.nav-item {\n    display: flex;\n    align-items: center;\n    gap: 12px;\n\n    height: 46px;\n    padding: 0 14px;\n\n    border: none;\n    border-radius: var(--radius-sm, 8px);\n\n    background: transparent;\n    color: var(--color-text-muted, #6b7280);\n\n    font-size: 15px;\n    font-weight: 500;\n    text-align: left;\n    cursor: pointer;\n\n    transition: background .15s, color .15s;\n}\n\n.nav-item .icon {\n    width: 20px;\n    height: 20px;\n    display: flex;\n    flex-shrink: 0;\n}\n\n.nav-item .icon svg {\n    width: 100%;\n    height: 100%;\n}\n\n.nav-item:hover {\n    background: #ececfb;\n    color: var(--color-primary, #4338ca);\n}\n\n.nav-item.active {\n    background: var(--color-primary, #4338ca);\n    color: white;\n}\n\n/* CONTENIDO */\n.contenido {\n    padding: 28px 32px;\n    overflow-y: auto;\n}\n\n.section-header {\n    margin-bottom: 24px;\n}\n\n.section-header h2 {\n    margin: 0 0 4px;\n    font-size: 24px;\n    font-weight: 700;\n    color: var(--color-text, #1e1b3a);\n}\n\n.section-header p {\n    margin: 0;\n    color: var(--color-text-muted, #6b7280);\n    font-size: 14.5px;\n}\n\n.stats-grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n    gap: 18px;\n    margin-bottom: 24px;\n}\n\n.stat-card {\n    display: flex;\n    flex-direction: column;\n    gap: 6px;\n\n    background: var(--color-surface, #fff);\n    border: 1px solid var(--color-border, #e5e7eb);\n    border-radius: var(--radius-md, 14px);\n\n    padding: 20px;\n    box-shadow: var(--shadow-sm, 0 1px 2px rgba(16, 24, 40, .06));\n}\n\n.stat-label {\n    font-size: 13.5px;\n    color: var(--color-text-muted, #6b7280);\n    font-weight: 500;\n}\n\n.stat-value {\n    font-size: 26px;\n    font-weight: 700;\n    color: var(--color-text, #1e1b3a);\n}\n\n.stat-trend {\n    font-size: 12.5px;\n    font-weight: 600;\n    color: var(--color-success, #16a34a);\n}\n\n.stat-trend.negative {\n    color: var(--color-danger, #ef4444);\n}\n\n.panel-placeholder {\n    background: var(--color-surface, #fff);\n    border: 1px dashed var(--color-border, #e5e7eb);\n    border-radius: var(--radius-md, 14px);\n\n    padding: 48px 24px;\n\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    text-align: center;\n\n    color: var(--color-text-muted, #6b7280);\n    font-size: 14.5px;\n    min-height: 220px;\n}\n\n/* RESPONSIVE */\n@media (max-width: 860px) {\n    .contenedor {\n        grid-template-columns: 76px 1fr;\n    }\n\n    .nav-item .label {\n        display: none;\n    }\n\n    .nav-item {\n        justify-content: center;\n        padding: 0;\n    }\n\n    .header h1 {\n        font-size: 15px;\n    }\n\n    .logout-btn span,\n    .logout-btn {\n        font-size: 0;\n        gap: 0;\n        padding: 9px;\n    }\n\n    .logout-btn svg {\n        width: 20px;\n        height: 20px;\n    }\n}\n"] }]
    }], () => [{ type: i1.Router }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(PanelAdmin, { className: "PanelAdmin", filePath: "src/app/panel-admin/panel-admin.ts", lineNumber: 20 }); })();
