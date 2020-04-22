import React, { Component } from 'react';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app

export default class JobListsTree extends Component {
    constructor(props) {
        super(props);

        this.state = {
            treeData: [
                { title: 'Fall Semester', children: [
                        { title: 'Sr Data Scientist, Xoriant', isJob:true },
                        { title: 'Fall Co-op Jobs', children: [
                            { title: 'Data Scientist, Northrop Grumman', isJob:true },
                                { title: 'Data Scientist, Adroit Resources', isJob:true }]
                        }
                    ]
                },
                { title: 'Summer', children: [
                        { title: 'Summer Internship Jobs', children: [
                                { title: 'Data Scientist, Adroit Resources', isJob:true }]
                        }
                    ]
                }
            ],
        };
    }

    render() {
        return (
            <div style={{ height: 1000 }}>
                <SortableTree
                    treeData={this.state.treeData}
                    canNodeHaveChildren={node => !node.isJob}
                    onChange={treeData => this.setState({ treeData })}
                    generateNodeProps={({ node, path }) => {
                        console.log(path);
                    if(!node.isJob) {
                        return {
                            style: {
                                boxShadow: "0 0 0 4px grey",
                            }
                        };
                    }else{
                        return {
                            style: {
                                height: "80%",
                            }
                        };
                    }
                    }}
                />
            </div>
        );
    }
}