angular.module('500px.controllers')

  .controller('FavouritesCtrl', function ($scope, $ionicLoading, $state, ImageService,
                                          $ionicModal, $ionicSlideBoxDelegate, $timeout) {

    $scope.hasMoreData = true;
    $scope.loadMore = function () {
      ImageService.loadMoreFavs(function (data) {
        $scope.slider = data.favs;
        $scope.hasMoreData = data.hasMoreData;
        if (data.rows) {
          $scope.rows = data.rows;
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
        $ionicLoading.hide();
      });
    };

    $ionicModal.fromTemplateUrl('slider-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function (id) {
      $scope.slider.forEach(function (img, index) {
        if (img.id.toString() === id.toString()) {
          $scope.modal.activeImage = index;
        }
      });
      $ionicSlideBoxDelegate.update();
      $scope.modal.show();
    };

    var isNotDoubleTap = true;
    $scope.zoom = function () {
      isNotDoubleTap = false;
      console.log('double tap');
    };

    var timeout;
    $scope.close = function () {
      if (timeout) {
        $timeout.cancel(timeout);
      }
      timeout = $timeout(function () {
        if (isNotDoubleTap) {
          $scope.closeModal();
        }
        isNotDoubleTap = true;
      }, 300);
    };

    $scope.closeModal = function () {
      $scope.modal.hide();
    };

    $scope.$on('$destroy', function () {
      $scope.modal.remove();
    });

    $scope.$on('modal.shown', function () {
      console.log('Modal is shown!');
    });

    $scope.slideChanged = function (i) {
      if ($scope.slider.length <= i + 5) {
        ImageService.loadMoreFavs(function (data) {
          $scope.slider = data.favs;
          $ionicSlideBoxDelegate.update();
        });
      }
    };

    $scope.getImageLink = function (image, index) {
      if (index != $ionicSlideBoxDelegate.currentIndex()) {
        return;
      }
      return image.image_url[1];
    };

  });

