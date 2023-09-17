
export const getNatureStory = async () => {
  const response = await fetch('http://localhost:3000/api/nature', {
    next: {
      revalidate:20
    }
  })
  const data = await response.json().then(data=>data.res)
  return data
};
