import { z } from "zod";

const SchemaUnparsed = z.unknown().brand("SchemaUnparsed");
type SchemaUnparsed = z.infer<typeof SchemaUnparsed>;

const Primitive = z.union([z.string(), z.number(), z.boolean()]);

const BaseSchema = z.object({
  // `const` can only be on `string`, `number` and `boolean`
  const: z.never().optional(),

  // `default` can only be on `string`, `number` and `boolean`
  default: Primitive.optional(),

  // `description` and `deprecated` can be on any schema
  description: z.string().optional(),
  deprecated: z.boolean().optional(),
});

const StringYamlRef = z
  .string()
  .refine((str) => str.endsWith(".yaml"))
  .brand("StringYamlRef");

const SchemaSchemaRef = BaseSchema.extend({ $ref: StringYamlRef })
  .strict()
  .transform((s) => ({ ...s, __schema: "$ref" as const }));

const SchemaSchemaNull = BaseSchema.extend({ type: z.literal("null") })
  .strict()
  .transform((s) => ({ ...s, __schema: "null" as const }));

const SchemaSchemaString = BaseSchema.extend({
  type: z.literal("string"),
  const: z.string().optional(),
  example: z.string().optional(),
  format: z.literal(["uri", "date-time", "int64"]).optional(),
  enum: z.array(z.string()).optional(),
  minLength: z.number().optional(),
  maxLength: z.number().optional(),
})
  .strict()
  .transform((s) => ({ ...s, __schema: "string" as const }));

const SchemaSchemaStringNullable = BaseSchema.extend({
  type: z.tuple([z.literal("string"), z.literal("null")]),
})
  .strict()
  .transform((s) => ({ ...s, __schema: "string:nullable" as const }));

const SchemaSchemaInteger = BaseSchema.extend({
  type: z.literal("integer"),
  const: z.int().optional(),
  example: z.int().optional(),
  format: z.literal("int64").optional(),
  enum: z.array(z.int()).optional(),
  minimum: z.number().optional(),
  maximum: z.number().optional(),
})
  .strict()
  .transform((s) => ({ ...s, __schema: "integer" as const }));

const SchemaSchemaIntegerNullable = BaseSchema.extend({
  type: z.union([
    z.tuple([z.literal("integer"), z.literal("null")]),
    z.tuple([z.literal("null"), z.literal("integer")]),
  ]),
  example: z.int().optional(),
})
  .strict()
  .transform((s) => ({ ...s, __schema: "integer:nullable" as const }));

const SchemaSchemaNumber = BaseSchema.extend({
  type: z.literal("number"),
  example: z.number().optional(),
  minimum: z.number().optional(),
  maximum: z.number().optional(),
})
  .strict()
  .transform((s) => ({ ...s, __schema: "number" as const }));

const SchemaSchemaBoolean = BaseSchema.extend({
  type: z.literal("boolean"),
  const: z.boolean().optional(),
  example: z.boolean().optional(),
})
  .strict()
  .transform((s) => ({ ...s, __schema: "boolean" as const }));

const SchemaSchemaPrimitive = z.discriminatedUnion("type", [
  SchemaSchemaString,
  SchemaSchemaInteger,
  SchemaSchemaNumber,
  SchemaSchemaBoolean,
]);

const SchemaSchemaObject = BaseSchema.extend({
  type: z.literal("object").optional(),
  title: z.string().optional(),
  properties: z.record(z.string(), SchemaUnparsed),
  required: z.array(z.string()).optional(),
  example: z.object().optional(),
  additionalProperties: z.literal(false).optional(),
})
  .strict()
  .transform((s) => ({ ...s, __schema: "object" as const }));

const SchemaSchemaObjectAdditionalProperties = BaseSchema.extend({
  type: z.literal("object").optional(),
  additionalProperties: SchemaUnparsed,
})
  .strict()
  .transform((s) => ({
    ...s,
    __schema: "additionalProperties" as const,
  }));

const SchemaSchemaArray = BaseSchema.extend({
  type: z.literal("array"),
  items: SchemaUnparsed.optional(),
  example: z.array(z.unknown()).optional(),
  minItems: z.int().optional(),
  maxItems: z.int().optional(),
})
  .strict()
  .transform((s) => ({ ...s, __schema: "array" as const }));

const SchemaSchemaOneOf = BaseSchema.extend({ oneOf: z.array(SchemaUnparsed) })
  .strict()
  .transform((s) => ({ ...s, __schema: "oneOf" as const }));

const SchemaSchemaAllOf = BaseSchema.extend({
  type: z.literal("object").optional(),
  allOf: z.tuple([SchemaUnparsed, SchemaUnparsed]),
})
  .strict()
  .transform((s) => ({ ...s, __schema: "allOf" as const }));

const SchemaSchemaAnyOf = BaseSchema.extend({
  type: z.literal("object").optional(),
  anyOf: z.array(SchemaSchemaRef),
  discriminator: z.object({
    propertyName: z.string(),
    mapping: z.record(z.string(), StringYamlRef),
  }),
})
  .strict()
  .transform((s) => ({ ...s, __schema: "anyOf" as const }));

const SchemaSchema = z.union([
  SchemaSchemaRef,
  SchemaSchemaNull,
  SchemaSchemaPrimitive,
  SchemaSchemaIntegerNullable,
  SchemaSchemaStringNullable,
  SchemaSchemaObject,
  SchemaSchemaObjectAdditionalProperties,
  SchemaSchemaArray,
  SchemaSchemaOneOf,
  SchemaSchemaAllOf,
  SchemaSchemaAnyOf,
]);

type Schema = z.infer<typeof SchemaSchema>;

export { SchemaSchema };
export type { Schema, SchemaUnparsed };
