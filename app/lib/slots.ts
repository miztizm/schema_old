import type { VNode, VNodeArrayChildren } from 'vue';

/**
 * Recursively extracts text content from Vue slot children nodes.
 * @param children - The children nodes from a Vue slot.
 * @returns A concatenated string of all text content.
 */
export const getSlotChildrenText = (children?: VNodeArrayChildren): string => {
  if (!children) return '';

  return children
    .map((node: VNode) => {
      if (!node.children) return '';
      if (typeof node.children === 'string') {
        return node.children;
      } else if (Array.isArray(node.children)) {
        return getSlotChildrenText(node.children as VNodeArrayChildren);
      } else if (
        typeof node.children === 'object' &&
        typeof node.children.default === 'function'
      ) {
        return getSlotChildrenText(node.children.default() as VNodeArrayChildren);
      }
      return '';
    })
    .join('');
};

// @ts-ignore
/* export const getSlotChildrenText = children => children.map((node) => {
  if (!node.children || typeof node.children === 'string') return node.children || ''
  else if (Array.isArray(node.children)) return getSlotChildrenText(node.children)
  else if (node.children.default) return getSlotChildrenText(node.children.default())
}).join('')
 */