Feature: Park a vehicle

  In order to not forget where I've parked my vehicle
  As an application user
  I should be able to indicate my vehicle location

  Background:
    Given my fleet exists
    And I have registered a vehicle into my fleet

  @critical
  Scenario: Successfully park a vehicle
    And a location is provided
    When I park my vehicle at this location
    Then the known location of my vehicle should match this location

  Scenario: Can't localize my vehicle to the same location two times in a row
    And my vehicle has already been parked at this location
    When I try to park my vehicle at this location again
    Then I should be informed that my vehicle is already parked at this location
