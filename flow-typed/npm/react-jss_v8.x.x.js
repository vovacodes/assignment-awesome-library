declare module 'react-jss' {
	/*
	P = Props
	C = Component
	S = Styles object i.e 	{ danger: { color: 'red', }, }
	*/


	declare type Styles = {[string]: {}};
	declare function ThemerFn(theme: {}) : {};
	declare type StylesOrThemer = Styles | typeof ThemerFn;
	declare type InjectSheetOptions = {} // TODO:
	declare export type Classes<S> = {|
		[$Keys<S>]: string
	|}
	declare type StylesInjector<P, C: React$ComponentType<P>> = (InnerComponent: C) => React$ComponentType<$Diff<P, {classes: {}}>>;
	declare export default function injectSheet<P, C: React$ComponentType<P>>(Styles, options?: InjectSheetOptions) : StylesInjector<P, C>;
}
