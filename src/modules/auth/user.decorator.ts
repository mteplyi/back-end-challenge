import { createParamDecorator } from '@nestjs/common';

export const CurrentUser: () => ParameterDecorator
  = createParamDecorator((data, req) => req.user);
