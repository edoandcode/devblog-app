'use client'
import React, { useMemo } from 'react';

import { BlocksContent, BlocksRenderer } from '@strapi/blocks-react-renderer';
import clsx from 'clsx';
import Link from 'next/link';

import type { FC, ReactNode } from 'react';


interface StrapiRichTextBlockParserProps {
    content: BlocksContent;
    fixedTypographyComponent?: FC<{ children: ReactNode }>;
    className?: string;
}


const StrapiRichTextBlockParser = ({ content, fixedTypographyComponent, className }: StrapiRichTextBlockParserProps) => {

    const FixedTypography = useMemo(() => {
        if (fixedTypographyComponent) {
            return fixedTypographyComponent;
        }
    }, [fixedTypographyComponent])

    return content?.length ? (
        <div className={clsx(
            className
        )}>
            <BlocksRenderer
                content={content}
                blocks={{
                    paragraph: ({ children }) => {
                        if (FixedTypography)
                            return <FixedTypography>{children}</FixedTypography>
                        return <p className="text-base">{children}</p>
                    },
                    heading: ({ children, level }) => {
                        if (FixedTypography)
                            return <FixedTypography>{children}</FixedTypography>
                        switch (level) {
                            case 1:
                                return <h1 className="typography-5xl">{children}</h1>
                            case 2:
                                return <h2 className="typography-4xl">{children}</h2>
                            case 3:
                                return <h3 className="typography-3xl">{children}</h3>
                            case 4:
                                return <h4 className="typography-2xl">{children}</h4>
                            case 5:
                                return <h5 className="typography-xl">{children}</h5>
                            case 6:
                                return <h6 className="typography-lg">{children}</h6>
                            default:
                                break;
                        }
                    },
                    link: ({ children, url }) => <Link href={url}>{children}</Link>,
                    "list-item": ({ children }) => <li className="list-disc ml-5 text-base text-negative">{children}</li>,
                }}
                modifiers={{
                    bold: (({ children }) => <strong >{children}</strong>) as FC<{ children: ReactNode }>,
                    italic: (({ children }) => <i>{children}</i>) as FC<{ children: ReactNode }>,
                }}
            />
        </div >
    ) : null
}

export default StrapiRichTextBlockParser