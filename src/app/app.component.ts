import * as geolib from 'geolib';
import { Accuracy } from "ui/enums";
import * as utils from "utils/utils";
import { SearchBar } from "ui/search-bar";
import { isAndroid } from "platform";
import * as geolocation from "nativescript-geolocation";
import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";

@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "./app.component.html",
})

export class AppComponent {
    currentLat: number;
    currentLng: number;
    destinationLat = "-6.21462"; 
    destinationLng = "106.84513";

    searchPhrase: string;
    onSearchSubmit(args): void {
        let searchBar = <SearchBar>args.object;
        searchBar.dismissSoftInput();
        console.log("You are searching for " + searchBar.text);
    }
    
    sBLoaded(args): void {
        var searchBar:SearchBar = <SearchBar>args.object;
        if(isAndroid){
            searchBar.android.clearFocus();
        }
    }

    ngOnInit(): void {
        console.log('checking if geolocation is enabled');
        geolocation.isEnabled().then(enabled => {
            console.log('isEnabled =', enabled);
            if (enabled) {
               this.watch();
            } else {
               this.request();
            }
        }, e => {
            console.log('isEnabled error', e);
            this.request();
        });
    }

    request() {
        console.log('enableLocationRequest()');
        geolocation.enableLocationRequest().then(() => {
            console.log('location enabled!');
            this.watch();
        }, e => {
            console.log('Failed to enable', e);
        });
    }

    watch() {
        console.log('watchLocation()');
        geolocation.watchLocation(position => {
            this.currentLat = position.latitude;
            this.currentLng = position.longitude;
        }, e => {
            console.log('failed to get location');
        }, {
            desiredAccuracy: Accuracy.high,
            minimumUpdateTime: 500
        });
    }

    getDistances() {
        return geolib.getDistance(
            {latitude: this.currentLat, longitude: this.currentLng},
            {latitude: this.destinationLat, longitude: this.destinationLng}
        );
    }

    numberWithCommas(x) {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }

    @ViewChild("map") public mapbox: ElementRef;

    public onMapReady(args: any) {
        args.map.setCenter(
            {
                lat: this.currentLat, // mandatory
                lng: this.currentLng, // mandatory
                animated: true, // default true
                zoomLevel: 14
            }
        )
        args.map.addMarkers([
            {
                lat: this.destinationLat,
                lng: this.destinationLng,
                title: 'Lokasi Anda berjarak:',
                subtitle: 'sekitar ' + this.numberWithCommas(this.getDistances()) + ' meters from this place',
                selected: true, // makes the callout show immediately when the marker is added (note: only 1 marker can be selected at a time)
                onCalloutTap: function(){console.log("'Nice location' marker callout tapped");}
            }]
        );
    }

}
