import DropDown from '../ui/DropDown'
import { DropDownItem } from '../ui/DropDownItems'


function PopOverContent({ value, onSelect }: { value: string, onSelect: (value: any) => void }) {
  const options = [
    ['bikalpa', 'bikalpa'],
    ['aashirbad', 'aashirbad'],
    ['samir', 'samir'],
    ['sujan', 'sujan'],
  ]

  return (
    <DropDown
      disabled={false}
      buttonClassName={'toolbar-item'}
      buttonLabel={value}
      buttonAriaLabel={'buttonAriaLabel'}
    >
      {options.map(
        ([option, text]) => (
          <DropDownItem
            className={`item`}
            onClick={() => onSelect(option)}
            key={option}
          >
            <span className='text'>{text}</span>
          </DropDownItem>
        )
      )}
    </DropDown>
  )
}

export default PopOverContent