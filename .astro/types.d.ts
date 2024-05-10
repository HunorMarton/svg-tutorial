declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"svg": {
"animation-on-hover.mdx": {
	id: "animation-on-hover.mdx";
  slug: "animation-on-hover";
  body: string;
  collection: "svg";
  data: InferEntrySchema<"svg">
} & { render(): Render[".mdx"] };
"arc.mdx": {
	id: "arc.mdx";
  slug: "arc";
  body: string;
  collection: "svg";
  data: InferEntrySchema<"svg">
} & { render(): Render[".mdx"] };
"basic-path.mdx": {
	id: "basic-path.mdx";
  slug: "basic-path";
  body: string;
  collection: "svg";
  data: InferEntrySchema<"svg">
} & { render(): Render[".mdx"] };
"basic-shapes.mdx": {
	id: "basic-shapes.mdx";
  slug: "basic-shapes";
  body: string;
  collection: "svg";
  data: InferEntrySchema<"svg">
} & { render(): Render[".mdx"] };
"bear.mdx": {
	id: "bear.mdx";
  slug: "bear";
  body: string;
  collection: "svg";
  data: InferEntrySchema<"svg">
} & { render(): Render[".mdx"] };
"bell.mdx": {
	id: "bell.mdx";
  slug: "bell";
  body: string;
  collection: "svg";
  data: InferEntrySchema<"svg">
} & { render(): Render[".mdx"] };
"clip-path.mdx": {
	id: "clip-path.mdx";
  slug: "clip-path";
  body: string;
  collection: "svg";
  data: InferEntrySchema<"svg">
} & { render(): Render[".mdx"] };
"clock.mdx": {
	id: "clock.mdx";
  slug: "clock";
  body: string;
  collection: "svg";
  data: InferEntrySchema<"svg">
} & { render(): Render[".mdx"] };
"cubic-bezier.mdx": {
	id: "cubic-bezier.mdx";
  slug: "cubic-bezier";
  body: string;
  collection: "svg";
  data: InferEntrySchema<"svg">
} & { render(): Render[".mdx"] };
"data-driven-diagram.mdx": {
	id: "data-driven-diagram.mdx";
  slug: "data-driven-diagram";
  body: string;
  collection: "svg";
  data: InferEntrySchema<"svg">
} & { render(): Render[".mdx"] };
"forest.mdx": {
	id: "forest.mdx";
  slug: "forest";
  body: string;
  collection: "svg";
  data: InferEntrySchema<"svg">
} & { render(): Render[".mdx"] };
"gingerbread-figure.mdx": {
	id: "gingerbread-figure.mdx";
  slug: "gingerbread-figure";
  body: string;
  collection: "svg";
  data: InferEntrySchema<"svg">
} & { render(): Render[".mdx"] };
"gradient.mdx": {
	id: "gradient.mdx";
  slug: "gradient";
  body: string;
  collection: "svg";
  data: InferEntrySchema<"svg">
} & { render(): Render[".mdx"] };
"house.mdx": {
	id: "house.mdx";
  slug: "house";
  body: string;
  collection: "svg";
  data: InferEntrySchema<"svg">
} & { render(): Render[".mdx"] };
"interaction.mdx": {
	id: "interaction.mdx";
  slug: "interaction";
  body: string;
  collection: "svg";
  data: InferEntrySchema<"svg">
} & { render(): Render[".mdx"] };
"multiple-components.mdx": {
	id: "multiple-components.mdx";
  slug: "multiple-components";
  body: string;
  collection: "svg";
  data: InferEntrySchema<"svg">
} & { render(): Render[".mdx"] };
"path-based-animation.mdx": {
	id: "path-based-animation.mdx";
  slug: "path-based-animation";
  body: string;
  collection: "svg";
  data: InferEntrySchema<"svg">
} & { render(): Render[".mdx"] };
"polygon.mdx": {
	id: "polygon.mdx";
  slug: "polygon";
  body: string;
  collection: "svg";
  data: InferEntrySchema<"svg">
} & { render(): Render[".mdx"] };
"quadratic-bezier.mdx": {
	id: "quadratic-bezier.mdx";
  slug: "quadratic-bezier";
  body: string;
  collection: "svg";
  data: InferEntrySchema<"svg">
} & { render(): Render[".mdx"] };
"ribbon.mdx": {
	id: "ribbon.mdx";
  slug: "ribbon";
  body: string;
  collection: "svg";
  data: InferEntrySchema<"svg">
} & { render(): Render[".mdx"] };
"snowing.mdx": {
	id: "snowing.mdx";
  slug: "snowing";
  body: string;
  collection: "svg";
  data: InferEntrySchema<"svg">
} & { render(): Render[".mdx"] };
"svg-in-css.mdx": {
	id: "svg-in-css.mdx";
  slug: "svg-in-css";
  body: string;
  collection: "svg";
  data: InferEntrySchema<"svg">
} & { render(): Render[".mdx"] };
"text-path.mdx": {
	id: "text-path.mdx";
  slug: "text-path";
  body: string;
  collection: "svg";
  data: InferEntrySchema<"svg">
} & { render(): Render[".mdx"] };
"transform.mdx": {
	id: "transform.mdx";
  slug: "transform";
  body: string;
  collection: "svg";
  data: InferEntrySchema<"svg">
} & { render(): Render[".mdx"] };
"use.mdx": {
	id: "use.mdx";
  slug: "use";
  body: string;
  collection: "svg";
  data: InferEntrySchema<"svg">
} & { render(): Render[".mdx"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../src/content/config.js");
}
