export function getForm(form) {
  const inputs = [...form.elements]
  return inputs.reduce((acc, elem) => {
    if (elem.id) {
      acc[elem.id] = elem.value
    }
    return acc
  }, {})
}
