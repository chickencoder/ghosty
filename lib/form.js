export function getForm(form) {
  const inputs = [...form.elements]
  return inputs.reduce((acc, elem) => {
    const isCheckbox = typeof elem.checked !== 'undefined'
    if (isCheckbox && elem.id && elem.checked) {
      acc[elem.id] = elem.value
    } else if (elem.id) {
      acc[elem.id] = elem.value
    }
    return acc
  }, {})
}
