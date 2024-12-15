import type { MarkdownHeading } from "astro";
import { PAGE_TITLE_ID } from "@/consts";

export interface TocItem extends MarkdownHeading {
  children: TocItem[];
}

interface TocOpts {
  minHeadingLevel: number;
  maxHeadingLevel: number;
  title: string;
}

/**
 * Convert flat heading into a nested tree of headings.
 */
export function generateToC(
  headings: MarkdownHeading[],
  { minHeadingLevel, maxHeadingLevel, title }: TocOpts
) {
  headings = headings.filter(
    ({ depth }) => depth >= minHeadingLevel && depth <= maxHeadingLevel
  );
  const toc: Array<TocItem> = [
    { depth: 2, slug: PAGE_TITLE_ID, text: title, children: [] },
  ];
  for (const heading of headings) injectChild(toc, { ...heading, children: [] });
  return toc;
}

/** Inject a ToC entry as deep in the tree as its `depth` property requires. */
function injectChild(items: TocItem[], item: TocItem): void {
  const lastItem = items.at(-1);

  if (!lastItem || lastItem.depth >= item.depth) {
    items.push(item);
  } else {
    return injectChild(lastItem.children, item);
  }
}