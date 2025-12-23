import React from 'react';

import Grid from '@/components/Grid';
import Logo from '@/components/Logo';

const Header = () => {
    return (
        <header>
            <Grid>
                <Grid.Col
                    span={12}
                    className="py-15 flex justify-center items-center"
                >
                    <div className="w-[200px]">
                        <Logo></Logo>
                    </div>
                </Grid.Col>
            </Grid>
        </header>
    )
}

export default Header