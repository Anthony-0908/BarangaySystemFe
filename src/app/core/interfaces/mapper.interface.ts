export interface Mapper<TDto, TModel> {
  fromJson(dto: TDto): TModel;
  toJson(model: TModel): TDto;
}