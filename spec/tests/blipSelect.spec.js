import { BlipSelect } from '../../src/components/blipSelect'
const mockOptions = [
  {
    value: 'val1',
    label: 'label 1',
  },
  {
    value: 'val2',
    label: 'label 2',
  },
]

describe('BlipSelect', () => {
  describe('Behaviors', () => {
    describe('Static', () => {
      it('should has a list of options', () => {
        const component = new BlipSelect()
        const renderedElement = component.render({
          options: mockOptions,
        })

        expect(renderedElement.querySelectorAll('li').length).toEqual(2)
      })

      it('should disable component', () => {
        const component = new BlipSelect()
        document.body.appendChild(component.render({
          options: mockOptions,
        }))

        component.isDisabled = true

        expect(component.input.disabled).toBeTruthy()
      })

      it('should invalidate component', () => {
        const component = new BlipSelect()
        document.body.appendChild(component.render({
          options: mockOptions,
        }))

        component.isInvalid = true

        expect(component.input.invalid).toBeTruthy()
      })

      it('should enable component', () => {
        const component = new BlipSelect()
        document.body.appendChild(component.render({
          options: mockOptions,
        }))

        component.isDisabled = false

        expect(component.input.disabled).toBeFalsy()
      })

      describe('Instance methods', () => {
        it('should set a value', () => {
          const component = new BlipSelect()
          document.body.appendChild(component.render({
            options: mockOptions,
            inputValue: 'val1',
          }))

          expect(component.input.value).toEqual('val1')
        })

        it('should modify default search', () => {
          const component = new BlipSelect({
            mode: 'autocomplete',
            customSearch: ({ $event }) => {
              const { query, items } = $event
              return items.filter(i => i.label.endsWith(query))
            },
          })

          document.body.appendChild(component.render({
            options: mockOptions,
          }))

          component.input.value = '1'
          component.input.dispatchEvent(new Event('input'))

          setTimeout(() => {
            expect(component.optionsList.props.options.length).toEqual(1)
            expect(component.optionsList.props.options[0].label).toEqual('label 1')
          })
        })
      })
    })

    describe('Creatable', () => {
      it('should add new option', () => {
        const component = new BlipSelect({
          mode: 'autocomplete',
          canAddOption: {
            text: 'Add option',
          },
        })

        document.body.appendChild(component.render({
          options: mockOptions,
        }))

        component.optionsList.addOption('label 3')

        expect(component.optionsList.props.options.some(o => o.label === 'label 3')).toBeTruthy()
      })
    })
  })
})
