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
	export { z } from 'astro/zod';

	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;
	export type CollectionEntry<C extends keyof AnyEntryMap> = Flatten<AnyEntryMap[C]>;

	// TODO: Remove this when having this fallback is no longer relevant. 2.3? 3.0? - erika, 2023-04-04
	/**
	 * @deprecated
	 * `astro:content` no longer provide `image()`.
	 *
	 * Please use it through `schema`, like such:
	 * ```ts
	 * import { defineCollection, z } from "astro:content";
	 *
	 * defineCollection({
	 *   schema: ({ image }) =>
	 *     z.object({
	 *       image: image(),
	 *     }),
	 * });
	 * ```
	 */
	export const image: never;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<[BaseSchemaWithoutEffects, ...BaseSchemaWithoutEffects[]]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<BaseSchemaWithoutEffects, BaseSchemaWithoutEffects>;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(
		input: CollectionConfig<S>
	): CollectionConfig<S>;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {})
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
		E extends ValidContentEntrySlug<C> | (string & {})
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {})
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {})
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {})
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
"animation-on-hover.md": {
	id: "animation-on-hover.md";
  slug: "animation-on-hover";
  body: string;
  collection: "svg";
  data: any
} & { render(): Render[".md"] };
"arc.md": {
	id: "arc.md";
  slug: "arc";
  body: string;
  collection: "svg";
  data: any
} & { render(): Render[".md"] };
"background-pattern.md": {
	id: "background-pattern.md";
  slug: "background-pattern";
  body: string;
  collection: "svg";
  data: any
} & { render(): Render[".md"] };
"basic-path.md": {
	id: "basic-path.md";
  slug: "basic-path";
  body: string;
  collection: "svg";
  data: any
} & { render(): Render[".md"] };
"basic-shapes.md": {
	id: "basic-shapes.md";
  slug: "basic-shapes";
  body: string;
  collection: "svg";
  data: any
} & { render(): Render[".md"] };
"bear.md": {
	id: "bear.md";
  slug: "bear";
  body: string;
  collection: "svg";
  data: any
} & { render(): Render[".md"] };
"bell.md": {
	id: "bell.md";
  slug: "bell";
  body: string;
  collection: "svg";
  data: any
} & { render(): Render[".md"] };
"clip-path.md": {
	id: "clip-path.md";
  slug: "clip-path";
  body: string;
  collection: "svg";
  data: any
} & { render(): Render[".md"] };
"clock.md": {
	id: "clock.md";
  slug: "clock";
  body: string;
  collection: "svg";
  data: any
} & { render(): Render[".md"] };
"cubic-bezier.md": {
	id: "cubic-bezier.md";
  slug: "cubic-bezier";
  body: string;
  collection: "svg";
  data: any
} & { render(): Render[".md"] };
"data-driven-diagram.md": {
	id: "data-driven-diagram.md";
  slug: "data-driven-diagram";
  body: string;
  collection: "svg";
  data: any
} & { render(): Render[".md"] };
"forest.md": {
	id: "forest.md";
  slug: "forest";
  body: string;
  collection: "svg";
  data: any
} & { render(): Render[".md"] };
"gingerbread-figure.md": {
	id: "gingerbread-figure.md";
  slug: "gingerbread-figure";
  body: string;
  collection: "svg";
  data: any
} & { render(): Render[".md"] };
"gradient - old.md": {
	id: "gradient - old.md";
  slug: "gradient---old";
  body: string;
  collection: "svg";
  data: any
} & { render(): Render[".md"] };
"gradient.md": {
	id: "gradient.md";
  slug: "gradient";
  body: string;
  collection: "svg";
  data: any
} & { render(): Render[".md"] };
"house.md": {
	id: "house.md";
  slug: "house";
  body: string;
  collection: "svg";
  data: any
} & { render(): Render[".md"] };
"interaction.md": {
	id: "interaction.md";
  slug: "interaction";
  body: string;
  collection: "svg";
  data: any
} & { render(): Render[".md"] };
"multiple-components.md": {
	id: "multiple-components.md";
  slug: "multiple-components";
  body: string;
  collection: "svg";
  data: any
} & { render(): Render[".md"] };
"path-based-animation.md": {
	id: "path-based-animation.md";
  slug: "path-based-animation";
  body: string;
  collection: "svg";
  data: any
} & { render(): Render[".md"] };
"polygon.md": {
	id: "polygon.md";
  slug: "polygon";
  body: string;
  collection: "svg";
  data: any
} & { render(): Render[".md"] };
"quadratic-bezier.md": {
	id: "quadratic-bezier.md";
  slug: "quadratic-bezier";
  body: string;
  collection: "svg";
  data: any
} & { render(): Render[".md"] };
"ribbon.md": {
	id: "ribbon.md";
  slug: "ribbon";
  body: string;
  collection: "svg";
  data: any
} & { render(): Render[".md"] };
"snowing.md": {
	id: "snowing.md";
  slug: "snowing";
  body: string;
  collection: "svg";
  data: any
} & { render(): Render[".md"] };
"text-path.md": {
	id: "text-path.md";
  slug: "text-path";
  body: string;
  collection: "svg";
  data: any
} & { render(): Render[".md"] };
"transform.md": {
	id: "transform.md";
  slug: "transform";
  body: string;
  collection: "svg";
  data: any
} & { render(): Render[".md"] };
"use.md": {
	id: "use.md";
  slug: "use";
  body: string;
  collection: "svg";
  data: any
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = typeof import("../src/content/config");
}
