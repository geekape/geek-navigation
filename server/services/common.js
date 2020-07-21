class common {
  constructor(ctx) {
    this.ctx = ctx
  }

  initParam() {
    const { pageSize = 20, pageNumber = 1 } = ctx.query
    return {
      pageSize,
      pageNumber,
      skipNumber: pageSize * pageNumber - pageSize
    }
  }
}

module.exports = common
