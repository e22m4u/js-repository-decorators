import {Errorf} from '@e22m4u/js-format';

/**
 * Not a model class error.
 */
export class NotAModelClassError extends Errorf {
  /**
   * Constructor.
   *
   * @param value
   */
  constructor(value: unknown) {
    super('%v is not a model class.', value);
  }
}
