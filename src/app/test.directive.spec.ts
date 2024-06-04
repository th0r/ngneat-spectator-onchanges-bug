import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';

import { TestDirective } from './test.directive';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';

describe('TestDirective', () => {
  @Component({
    selector: 'test-host',
    template: ''
  })
  class TestHostComponent implements OnInit, OnChanges {
    @Input() inputString: string;

    uppercaseString: string;

    ngOnInit() {
      console.log('ngOnInit called');
      this.updateUppercaseString();
    }

    ngOnChanges() {
      console.log('ngOnChanges called');
      this.updateUppercaseString();
    }

    protected updateUppercaseString() {
      this.uppercaseString = this.inputString.toUpperCase();
    }
  }

  let spectator: SpectatorDirective<TestDirective>;

  const createDirective = createDirectiveFactory({
    directive: TestDirective,
    host: TestHostComponent
  });

  it('should call "ngOnChanges" of host component during initialization and after updating its inputs', () => {
    spectator = createDirective(`<div [appTest]="uppercaseString"></div>`, {
      hostProps: {inputString: 'foo'}
    });

    // `ngOnInit` is called, but `ngOnChanges` is not
    expect(spectator.query('[data-test=FOO]')).toExist();

    spectator.setHostInput({inputString: 'bar'});

    // `ngOnChanges` is not called - `data-test` attribute is still `FOO`
    expect(spectator.query('[data-test=BAR]')).toExist();
  });

});
