import { IsInt, Min } from "class-validator";

export class AddPointsDto {
  @IsInt()
  @Min(1)
  amount!: number;
}
