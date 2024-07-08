import parseHtmlStringToHtml, { domToReact } from 'html-react-parser';
import Link from 'next/link'
import { useMemo } from 'react'

export const HTMLRenderer = ({ htmlString, className = '' }: { htmlString: string, className?: string }) => {
  const parsedElement = useMemo(() => {
    return parseHtmlStringToHtml(htmlString, {
      // @eslint-disable-next-line @typescript-eslint/no-explicit-any
      replace: (domNode: any) => {
        if (domNode.attribs && domNode.attribs.href && domNode.name === 'a') {
          return <Link href={domNode.attribs.href}>{domToReact(domNode.children)}</Link>;
        } else if (domNode.name === 'script') {
          return <></>;
        }
      },
    });
  }, [htmlString]);
  return <div className={className}>{parsedElement}</div>;
};