export function getForm(form) {
  const inputs = [...form.elements]
  return inputs.reduce((acc, elem) => {
    const isCheckbox = elem.type === 'checkbox'
    if (elem.id && isCheckbox && elem.checked) {
      acc[elem.id] = elem.value
    } else if (elem.id && !isCheckbox) {
      acc[elem.id] = elem.value
    }
    return acc
  }, {})
}
