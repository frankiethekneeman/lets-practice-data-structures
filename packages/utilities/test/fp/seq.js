const seq = require('../../fp/seq');
const expect = require('chai').expect;

const int = require('../../random/int');
const TIMES = 100;


describe('seq', () => {
  for (let i = 0; i < TIMES; i++) {
    const MIN = int(0,10);
    const MAX = int(100,200);

    describe(MIN + ' to ' + MAX, () => {
      const result = seq(MIN, MAX);
      it('starts with ' + MIN, () => {
        expect(result[0]).to.equal(MIN);
      });

      it('generates ' + (MAX - MIN) + ' elements', () => {
        expect(result.length).to.equal(MAX-MIN);
      });

      it('each element is 1 more than the previous', () => {
        for(let i = 1; i < result.length; i++) {
          expect(result[i]).to.equal(result[i-1] + 1);
        };
      });
      describe('step sizes', () => {
        [-3, -2, -1].forEach((step) => {
          describe('(' + MAX + ', ' + MIN + ', ' + step + ')', () => {
            const stepped = seq(MAX, MIN, step);
            const length = Math.ceil((MIN - MAX)/ step);
            it('starts with ' + MAX, () => {
              expect(stepped[0]).to.equal(MAX);
            });

            it('generates ' + length + ' elements', () => {
              expect(stepped.length).to.equal(length);
            });

            it('each element is ' + (-step) + ' less than the previous', () => {
              for(let i = 1; i < stepped.length; i++) {
                expect(stepped[i]).to.equal(stepped[i-1] + step);
              };
            });
          });
          it('errors on (' + MIN + ', ' + MAX + ', ' + step + ')', () => {
            expect(() => seq(MIN, MAX, step)).to.throw;
          });
        });
        [2, 3].forEach((step) => {
          describe('(' + MIN + ', ' + MAX + ', ' + step + ')', () => {
            const stepped = seq(MIN, MAX, step);
            const length = Math.ceil((MAX - MIN)/ step);
            it('starts with ' + MIN, () => {
              expect(stepped[0]).to.equal(MIN);
            });

            it('generates ' + length + ' elements', () => {
              expect(stepped.length).to.equal(length);
            });

            it('each element is ' + (step) + ' more than the previous', () => {
              for(let i = 1; i < stepped.length; i++) {
                expect(stepped[i]).to.equal(stepped[i-1] + step);
              };
            });
          });
          it('errors on (' + MAX + ', ' + MIN + ', ' + step + ')', () => {
            expect(() => seq(MAX, MIN, step)).to.throw;
          });
        });
      });
    });
  }

});
