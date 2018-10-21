"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var geolib = require("geolib");
var enums_1 = require("ui/enums");
var platform_1 = require("platform");
var geolocation = require("nativescript-geolocation");
var core_1 = require("@angular/core");
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.destinationLat = "-6.21462";
        this.destinationLng = "106.84513";
    }
    AppComponent.prototype.onSearchSubmit = function (args) {
        var searchBar = args.object;
        searchBar.dismissSoftInput();
        console.log("You are searching for " + searchBar.text);
    };
    AppComponent.prototype.sBLoaded = function (args) {
        var searchBar = args.object;
        if (platform_1.isAndroid) {
            searchBar.android.clearFocus();
        }
    };
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('checking if geolocation is enabled');
        geolocation.isEnabled().then(function (enabled) {
            console.log('isEnabled =', enabled);
            if (enabled) {
                _this.watch();
            }
            else {
                _this.request();
            }
        }, function (e) {
            console.log('isEnabled error', e);
            _this.request();
        });
    };
    AppComponent.prototype.request = function () {
        var _this = this;
        console.log('enableLocationRequest()');
        geolocation.enableLocationRequest().then(function () {
            console.log('location enabled!');
            _this.watch();
        }, function (e) {
            console.log('Failed to enable', e);
        });
    };
    AppComponent.prototype.watch = function () {
        var _this = this;
        console.log('watchLocation()');
        geolocation.watchLocation(function (position) {
            _this.currentLat = position.latitude;
            _this.currentLng = position.longitude;
        }, function (e) {
            console.log('failed to get location');
        }, {
            desiredAccuracy: enums_1.Accuracy.high,
            minimumUpdateTime: 500
        });
    };
    AppComponent.prototype.getDistances = function () {
        return geolib.getDistance({ latitude: this.currentLat, longitude: this.currentLng }, { latitude: this.destinationLat, longitude: this.destinationLng });
    };
    AppComponent.prototype.numberWithCommas = function (x) {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    };
    AppComponent.prototype.onMapReady = function (args) {
        args.map.setCenter({
            lat: this.currentLat,
            lng: this.currentLng,
            animated: true,
            zoomLevel: 14
        });
        args.map.addMarkers([
            {
                lat: this.destinationLat,
                lng: this.destinationLng,
                title: 'Lokasi Anda berjarak:',
                subtitle: 'sekitar ' + this.numberWithCommas(this.getDistances()) + ' meters from this place',
                selected: true,
                onCalloutTap: function () { console.log("'Nice location' marker callout tapped"); }
            }
        ]);
    };
    __decorate([
        core_1.ViewChild("map"),
        __metadata("design:type", core_1.ElementRef)
    ], AppComponent.prototype, "mapbox", void 0);
    AppComponent = __decorate([
        core_1.Component({
            selector: "ns-app",
            moduleId: module.id,
            templateUrl: "./app.component.html",
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBaUM7QUFDakMsa0NBQW9DO0FBR3BDLHFDQUFxQztBQUNyQyxzREFBd0Q7QUFDeEQsc0NBQXlFO0FBUXpFO0lBTkE7UUFTSSxtQkFBYyxHQUFHLFVBQVUsQ0FBQztRQUM1QixtQkFBYyxHQUFHLFdBQVcsQ0FBQztJQTBGakMsQ0FBQztJQXZGRyxxQ0FBYyxHQUFkLFVBQWUsSUFBSTtRQUNmLElBQUksU0FBUyxHQUFjLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkMsU0FBUyxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELCtCQUFRLEdBQVIsVUFBUyxJQUFJO1FBQ1QsSUFBSSxTQUFTLEdBQXdCLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDakQsRUFBRSxDQUFBLENBQUMsb0JBQVMsQ0FBQyxDQUFBLENBQUM7WUFDVixTQUFTLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ25DLENBQUM7SUFDTCxDQUFDO0lBRUQsK0JBQVEsR0FBUjtRQUFBLGlCQWFDO1FBWkcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1FBQ2xELFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxPQUFPO1lBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3BDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsS0FBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2hCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTCxLQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7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QkFBUyxDQUFDLEtBQUssQ0FBQztrQ0FBZ0IsaUJBQVU7Z0RBQUM7SUF2RW5DLFlBQVk7UUFOeEIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsc0JBQXNCO1NBQ3RDLENBQUM7T0FFVyxZQUFZLENBOEZ4QjtJQUFELG1CQUFDO0NBQUEsQUE5RkQsSUE4RkM7QUE5Rlksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBnZW9saWIgZnJvbSAnZ2VvbGliJztcbmltcG9ydCB7IEFjY3VyYWN5IH0gZnJvbSBcInVpL2VudW1zXCI7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tIFwidXRpbHMvdXRpbHNcIjtcbmltcG9ydCB7IFNlYXJjaEJhciB9IGZyb20gXCJ1aS9zZWFyY2gtYmFyXCI7XG5pbXBvcnQgeyBpc0FuZHJvaWQgfSBmcm9tIFwicGxhdGZvcm1cIjtcbmltcG9ydCAqIGFzIGdlb2xvY2F0aW9uIGZyb20gXCJuYXRpdmVzY3JpcHQtZ2VvbG9jYXRpb25cIjtcbmltcG9ydCB7IENvbXBvbmVudCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJucy1hcHBcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vYXBwLmNvbXBvbmVudC5odG1sXCIsXG59KVxuXG5leHBvcnQgY2xhc3MgQXBwQ29tcG9uZW50IHtcbiAgICBjdXJyZW50TGF0OiBudW1iZXI7XG4gICAgY3VycmVudExuZzogbnVtYmVyO1xuICAgIGRlc3RpbmF0aW9uTGF0ID0gXCItNi4yMTQ2MlwiOyBcbiAgICBkZXN0aW5hdGlvbkxuZyA9IFwiMTA2Ljg0NTEzXCI7XG5cbiAgICBzZWFyY2hQaHJhc2U6IHN0cmluZztcbiAgICBvblNlYXJjaFN1Ym1pdChhcmdzKTogdm9pZCB7XG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xuICAgICAgICBzZWFyY2hCYXIuZGlzbWlzc1NvZnRJbnB1dCgpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIllvdSBhcmUgc2VhcmNoaW5nIGZvciBcIiArIHNlYXJjaEJhci50ZXh0KTtcbiAgICB9XG4gICAgXG4gICAgc0JMb2FkZWQoYXJncyk6IHZvaWQge1xuICAgICAgICB2YXIgc2VhcmNoQmFyOlNlYXJjaEJhciA9IDxTZWFyY2hCYXI+YXJncy5vYmplY3Q7XG4gICAgICAgIGlmKGlzQW5kcm9pZCl7XG4gICAgICAgICAgICBzZWFyY2hCYXIuYW5kcm9pZC5jbGVhckZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2NoZWNraW5nIGlmIGdlb2xvY2F0aW9uIGlzIGVuYWJsZWQnKTtcbiAgICAgICAgZ2VvbG9jYXRpb24uaXNFbmFibGVkKCkudGhlbihlbmFibGVkID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpc0VuYWJsZWQgPScsIGVuYWJsZWQpO1xuICAgICAgICAgICAgaWYgKGVuYWJsZWQpIHtcbiAgICAgICAgICAgICAgIHRoaXMud2F0Y2goKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICB0aGlzLnJlcXVlc3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnaXNFbmFibGVkIGVycm9yJywgZSk7XG4gICAgICAgICAgICB0aGlzLnJlcXVlc3QoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVxdWVzdCgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2VuYWJsZUxvY2F0aW9uUmVxdWVzdCgpJyk7XG4gICAgICAgIGdlb2xvY2F0aW9uLmVuYWJsZUxvY2F0aW9uUmVxdWVzdCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2xvY2F0aW9uIGVuYWJsZWQhJyk7XG4gICAgICAgICAgICB0aGlzLndhdGNoKCk7XG4gICAgICAgIH0sIGUgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0ZhaWxlZCB0byBlbmFibGUnLCBlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgd2F0Y2goKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd3YXRjaExvY2F0aW9uKCknKTtcbiAgICAgICAgZ2VvbG9jYXRpb24ud2F0Y2hMb2NhdGlvbihwb3NpdGlvbiA9PiB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRMYXQgPSBwb3NpdGlvbi5sYXRpdHVkZTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudExuZyA9IHBvc2l0aW9uLmxvbmdpdHVkZTtcbiAgICAgICAgfSwgZSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZmFpbGVkIHRvIGdldCBsb2NhdGlvbicpO1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBkZXNpcmVkQWNjdXJhY3k6IEFjY3VyYWN5LmhpZ2gsXG4gICAgICAgICAgICBtaW5pbXVtVXBkYXRlVGltZTogNTAwXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldERpc3RhbmNlcygpIHtcbiAgICAgICAgcmV0dXJuIGdlb2xpYi5nZXREaXN0YW5jZShcbiAgICAgICAgICAgIHtsYXRpdHVkZTogdGhpcy5jdXJyZW50TGF0LCBsb25naXR1ZGU6IHRoaXMuY3VycmVudExuZ30sXG4gICAgICAgICAgICB7bGF0aXR1ZGU6IHRoaXMuZGVzdGluYXRpb25MYXQsIGxvbmdpdHVkZTogdGhpcy5kZXN0aW5hdGlvbkxuZ31cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBudW1iZXJXaXRoQ29tbWFzKHgpIHtcbiAgICAgICAgdmFyIHBhcnRzID0geC50b1N0cmluZygpLnNwbGl0KFwiLlwiKTtcbiAgICAgICAgcGFydHNbMF0gPSBwYXJ0c1swXS5yZXBsYWNlKC9cXEIoPz0oXFxkezN9KSsoPyFcXGQpKS9nLCBcIixcIik7XG4gICAgICAgIHJldHVybiBwYXJ0cy5qb2luKFwiLlwiKTtcbiAgICB9XG5cbiAgICBAVmlld0NoaWxkKFwibWFwXCIpIHB1YmxpYyBtYXBib3g6IEVsZW1lbnRSZWY7XG5cbiAgICBwdWJsaWMgb25NYXBSZWFkeShhcmdzOiBhbnkpIHtcbiAgICAgICAgYXJncy5tYXAuc2V0Q2VudGVyKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxhdDogdGhpcy5jdXJyZW50TGF0LCAvLyBtYW5kYXRvcnlcbiAgICAgICAgICAgICAgICBsbmc6IHRoaXMuY3VycmVudExuZywgLy8gbWFuZGF0b3J5XG4gICAgICAgICAgICAgICAgYW5pbWF0ZWQ6IHRydWUsIC8vIGRlZmF1bHQgdHJ1ZVxuICAgICAgICAgICAgICAgIHpvb21MZXZlbDogMTRcbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgICAgICBhcmdzLm1hcC5hZGRNYXJrZXJzKFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsYXQ6IHRoaXMuZGVzdGluYXRpb25MYXQsXG4gICAgICAgICAgICAgICAgbG5nOiB0aGlzLmRlc3RpbmF0aW9uTG5nLFxuICAgICAgICAgICAgICAgIHRpdGxlOiAnTG9rYXNpIEFuZGEgYmVyamFyYWs6JyxcbiAgICAgICAgICAgICAgICBzdWJ0aXRsZTogJ3Nla2l0YXIgJyArIHRoaXMubnVtYmVyV2l0aENvbW1hcyh0aGlzLmdldERpc3RhbmNlcygpKSArICcgbWV0ZXJzIGZyb20gdGhpcyBwbGFjZScsXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IHRydWUsIC8vIG1ha2VzIHRoZSBjYWxsb3V0IHNob3cgaW1tZWRpYXRlbHkgd2hlbiB0aGUgbWFya2VyIGlzIGFkZGVkIChub3RlOiBvbmx5IDEgbWFya2VyIGNhbiBiZSBzZWxlY3RlZCBhdCBhIHRpbWUpXG4gICAgICAgICAgICAgICAgb25DYWxsb3V0VGFwOiBmdW5jdGlvbigpe2NvbnNvbGUubG9nKFwiJ05pY2UgbG9jYXRpb24nIG1hcmtlciBjYWxsb3V0IHRhcHBlZFwiKTt9XG4gICAgICAgICAgICB9XVxuICAgICAgICApO1xuICAgIH1cblxufVxuIl19