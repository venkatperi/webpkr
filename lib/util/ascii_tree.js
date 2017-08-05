function toAsciiTree( tree, prefix = '', isTail = true ) {
  if ( !tree ) return null;

  const name = String(tree);
  const res = [];
  res.push(prefix);
  res.push(isTail ? '└─' : '├─');
  res.push(name);
  res.push('\n');

  if ( tree.children ) {
    let i = 0;
    const childCount = tree.children.length;

    tree.children.forEach(( c ) => {
      const p = prefix + ( isTail ? '  ' : '│ ' );
      res.push(toAsciiTree(c, p,
        i++ >= childCount - 1));
    });
  }
  return res.join('');
}

module.exports = toAsciiTree;
