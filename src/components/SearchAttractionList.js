import React, {Component} from "react";
import {Avatar, Button, Checkbox, List} from "antd";
import Search from "./Search";

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;

const fakePlaceName = ["Chrysler Building", "Times Square", "Henry Hudson Bridge", "Lincoln Center for the Performing Arts", "Radio City Music Hall",
    "Rockefeller Center", "The Museum of Modern Art", "American Museum of Natural History", "Empire State Building", "Solomon R. Guggenheim Museum"];
const fakePlaceId = ["ChIJN0qhSgJZwokRmQJ-MIEQq08", "ChIJmQJIxlVYwokRLgeuocVOGVU", "ChIJtT1iDe_zwokRdUvlbh_VU3Y",
    "ChIJN6W-X_VYwokRTqwcBnTw1Uk", "ChIJPS8b1vhYwokRldqq2YHmxJI", "ChIJ9U1mz_5YwokRosza1aAk0jM",
    "ChIJKxDbe_lYwokRVf__s8CPn-o", "ChIJCXoPsPRYwokRsV1MYnKBfaI", "ChIJaXQRs6lZwokRY6EFpJnhNNE", "ChIJmZ5emqJYwokRuDz79o0coAQ"];
const fakePlaceDetail = [{"place_id": "ChIJN0qhSgJZwokRmQJ-MIEQq08","icon":"https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png","name":"Chrysler Building","url":"https://maps.google.com/?q=Manhattan,+New+York,+NY+10174,+USA&ftid=0x89c259024aa14a37:0x4fab1081307e0299"},{"place_id": "ChIJmQJIxlVYwokRLgeuocVOGVU","icon":"https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png","name":"Times Square","url":"https://maps.google.com/?cid=6132018978369701678"},{"place_id": "ChIJtT1iDe_zwokRdUvlbh_VU3Y","icon":"https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png","name":"Lincoln Center for the Performing Arts","url":"https://maps.google.com/?cid=5320422915917524046"},{"place_id": "ChIJN6W-X_VYwokRTqwcBnTw1Uk", "icon":"https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png","name":"Radio City Music Hall","url":"https://maps.google.com/?cid=10575831270349789845"},{"place_id": "ChIJPS8b1vhYwokRldqq2YHmxJI", "icon":"https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png","name":"Henry Hudson Bridge","url":"https://maps.google.com/?cid=8526392850523704181"},{"place_id": "ChIJ9U1mz_5YwokRosza1aAk0jM", "icon":"https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png","name":"Rockefeller Center","url":"https://maps.google.com/?cid=3734087314244816034"},{"place_id": "ChIJKxDbe_lYwokRVf__s8CPn-o", "icon":"https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/museum-71.png","name":"The Museum of Modern Art","url":"https://maps.google.com/?cid=16906389583988522837"},{"place_id": "ChIJCXoPsPRYwokRsV1MYnKBfaI", "icon":"https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/museum-71.png","name":"American Museum of Natural History","url":"https://maps.google.com/?cid=11708656934508584369"},{"place_id": "ChIJaXQRs6lZwokRY6EFpJnhNNE", "icon":"https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png","name":"Empire State Building","url":"https://maps.google.com/?cid=15074921902713971043"},{"place_id": "ChIJmZ5emqJYwokRuDz79o0coAQ","icon":"https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/museum-71.png","name":"Solomon R. Guggenheim Museum","url":"https://maps.google.com/?cid=333297768485043384"}];

class SearchAttractionList extends Component {
    render() {
        return (
            <>
                <div className="search-bar">
                    <Search
                        placeholder="input search text"
                        onSearch={value => console.log(value)}
                        style={{width: 200}}
                    />
                </div>
                <div>
                    <List
                        className="attraction_list"
                        itemLayout="horizontal"
                        size="small"
                        dataSource={fakePlaceDetail}
                        renderItem={item => (
                            <List.Item
                                actions={[<Checkbox dataInfo={item} onChange={this.onChange}/>]}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar size={50} src={item.icon}/>}
                                    title={<p>{item.name}</p>}
                                    description={`${item.url}`}
                                />

                            </List.Item>
                        )}
                    />
                </div>
                <div className="addPlanButton">
                    <Button type="primary">add to plan</Button>
                </div>
            </>
        )
    }
}

export default SearchAttractionList;