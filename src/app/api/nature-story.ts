
export const getNatureStory = async () => {
  const response = await fetch(`${process?.env?.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/api/nature`, {
    next: {
      revalidate:20
    }
  })
  const data = await response.json().then(data=>data.res)
  return data
};
