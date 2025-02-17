/**
 * Contains pages and the corresponding schema for validating url parameters of the page. The schema should be defined as an object containing the url params and query as seperate objects. e.g `/pets/{id}?type=dog}` should have a schema as
 * ```json
 * {
 *     params: {id: stringValidation},
 *     query: {type: petTypeValidation}
 * }
 * ```
 * @see singleFeedSchema
 */
export const urlParamsSchemaStore = {} as const;
