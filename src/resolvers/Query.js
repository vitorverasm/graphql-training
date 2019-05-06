async function feed(parent, args, context, info) {
  const where = args.filter
    ? {
        OR: [
          { description_contains: args.filter },
          { url_contains: args.filter }
        ]
      }
    : {};
  const links = await context.prisma.links({
    where,
    skip: args.skip,
    first: args.first,
    orderBy: args.orderBy
  });
  return links;
}

function info() {
  return `This is the API of a Hackernews Clone`;
}

module.exports = {
  feed,
  info
};
