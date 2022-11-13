import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class EmailValidationPipe implements PipeTransform {
  readonly emailRegexStr: RegExp =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  emailCheck(mail: string): boolean {
    return this.emailRegexStr.test(mail);
  }

  transform(
    value: { readonly email?: string; [otherProp: string]: unknown },
    metadata: ArgumentMetadata,
  ) {
    if (value.email) {
      if (value.email !== value.email.toLowerCase()) {
        throw new BadRequestException(
          `Email “${value.email}” should be lowercased`,
        );
      }
      if (!this.emailCheck(value.email)) {
        throw new BadRequestException(`Email “${value.email}” is not correct`);
      }
    }
    return value;
  }
}
