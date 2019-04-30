function feed(parent, args, context, info) {
  return context.prisma.links();
}

function info() {
  return `This is the API of a Hackernews Clone`;
}

module.exports = {
  feed,
  info
};
