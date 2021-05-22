const filterSearch = ({
  router,
  page,
  category,
  sort,
  search,
  show,
  showAll,
}) => {
  const path = router.pathname
  const query = router.query

  if (category) query.category = category
  if (page) query.page = page
  if (search) query.search = search
  if (sort) query.sort = sort
  if (show) query.show = show
  if (showAll) query.showAll = showAll

  router.push({
    pathname: path,
    query: query,
  })
}

export default filterSearch
