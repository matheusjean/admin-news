const checkEmptyString = (str: string) => {
  if (!str || !str.replace(/[!@#$%¨&()_+=~^<>*|"]/g, '').trim()) {
    return true
  }

  return false
}

export default checkEmptyString
