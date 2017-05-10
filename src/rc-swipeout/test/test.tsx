import '../assets/index.less';
import Swipeout from '../index';
import React from 'react';
import inferno from 'inferno';

inferno.render(
    <div style={{marginBottom: 12}}>
        <Swipeout
            style={{backgroundColor: 'white'}}
            autoClose
            right={[
                {
                    text: 'more',
                    onPress: () => console.log('more'),
                    style: {backgroundColor: 'orange', color: 'white'},
                },
                {
                    text: 'delete',
                    onPress: () => console.log('delete'),
                    style: {backgroundColor: 'red', color: 'white'},
                },
            ]}
            left={[
                {
                    text: 'read',
                    onPress: () => console.log('read'),
                    style: {backgroundColor: 'blue', color: 'white'},
                },
                {
                    text: 'reply',
                    onPress: () => console.log('reply'),
                    style: {backgroundColor: 'green', color: 'white'},
                },
            ]}
            onOpen={() => console.log('open')}
            onClose={() => console.log('close')}
        >
            <div style={{
                height: 44,
                backgroundColor: 'white',
                lineHeight: '44px',
                borderTop: '1px solid #dedede',
                borderBottom: '1px solid #dedede',
            }}
            >swipe out simple demo
            </div>
        </Swipeout>
    </div>,
    document.getElementById('app')
);
