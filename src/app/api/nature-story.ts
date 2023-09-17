
export const getNatureStory = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/nature`, {
    next: {
      revalidate:86400
    }
  })
  const data = await response.json()
  return data
};
