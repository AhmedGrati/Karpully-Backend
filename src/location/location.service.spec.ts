import { FindLocationByTextInput } from './dto/find-location-by-text.input';
import { Address } from './entities/address.entity';
import { Location } from './entities/location.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { LocationService } from './location.service';
import { ReverseLocationSearchInput } from './dto/reverse-location-search-input';
import { AutocompleteInput } from './dto/autocomplete.input';

describe('LocationService', () => {
  let service: LocationService;
  const mockLocationService = {
    create: jest.fn().mockImplementation((loc) => {
      return Promise.resolve({ id: 1, ...loc })
    }),
    createAddress: jest.fn().mockImplementation((add) => {
      return Promise.resolve({ ID: 1, ...add })
    }),
    findAllAddress: jest.fn().mockImplementation(() => {
      return Promise.resolve([{ ID: 1, display_name: 'Tunis' }, { ID: 2, display_name: 'Marsa' }])
    }),
    findLocationByText: jest.fn().mockImplementation(text => {
      return Promise.resolve([{ "place_id": "334034910717", "licence": "https://locationiq.com/attribution", "lat": "36.83467", "lon": "11.09466", "display_name": "El Marsa, Kelibia, Nabeul, Tunisia", "boundingbox": ["36.81467", "36.85467", "11.07466", "11.11466"], "importance": 0.25 }, { "place_id": "330154119439", "licence": "https://locationiq.com/attribution", "lat": "33.6956", "lon": "10.73438", "display_name": "Al Jurf, Sidi Makhlouf, Médenine, Tunisia", "boundingbox": ["33.6756", "33.7156", "10.71438", "10.75438"], "importance": 0.25 }])
    }),
    reverseSearchLocation: jest.fn().mockImplementation(input => {
      return Promise.resolve({ "place_id": "96238694", "licence": "https://locationiq.com/attribution", "osm_type": "way", "osm_id": "35602106", "lat": "36.7946501835703", "lon": "10.1337450083407", "display_name": "Rue du 13 Août, Ezzouhour 2, Tunis, Cite Tayarane, Délégation Ezzouhour, Tunis, 2052, Tunisia", "address": { "road": "Rue du 13 Août", "suburb": "Ezzouhour 2", "city": "Tunis", "county": "Cite Tayarane", "state_district": "Délégation Ezzouhour", "state": "Tunis", "postcode": "2052", "country": "Tunisia", "country_code": "tn" }, "boundingbox": ["36.793306", "36.7964649", "10.1292757", "10.1431154"] })
    }),
    autocomplete: jest.fn().mockImplementation(place => {
      return Promise.resolve({ "place_id": "323378675241", "osm_id": "287547219", "osm_type": "node", "licence": "https://locationiq.com/attribution", "lat": "36.8790882", "lon": "10.327678", "boundingbox": ["36.8390882", "36.9190882", "10.287678", "10.367678"], "class": "place", "type": "town", "display_name": "La Marsa, Tunis, 2070, Tunisia", "display_place": "La Marsa", "display_address": "Tunis, 2070, Tunisia", "address": { "name": "La Marsa", "state": "Tunis", "postcode": "2070", "country": "Tunisia", "country_code": "tn" } })
    })
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationService],
    }).overrideProvider(LocationService).useValue(mockLocationService).compile();

    service = module.get<LocationService>(LocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create a location with id 1', async () => {
    const loc = new Location()
    expect((await service.create(loc) as Location).id).toEqual(1)
    expect(service.create).toBeCalledTimes(1)
  });
  it('should create an address with id 1', async () => {
    const add = new Address()
    expect((await service.createAddress(add) as Address).ID).toEqual(1)
    expect(service.createAddress).toBeCalledTimes(1)
  });
  it('should fetch all addresses', async () => {
    expect.assertions(3)
    expect((await service.findAllAddress())).toBeInstanceOf(Array)
    expect((await service.findAllAddress()).length).toEqual(2)
    expect((await service.findAllAddress()).map(e => e.ID)).toEqual([1, 2])
  })
  it('should get valid non falsy objects from LocationIQ', async () => {
    const findLocIn = new FindLocationByTextInput()
    const revSrchIn = new ReverseLocationSearchInput('', '')
    const autoCompIn = new AutocompleteInput()
    expect(Object.keys(await service.findLocationByText(findLocIn)).length).toBeGreaterThan(0);
    expect(Object.keys(await service.reverseSearchLocation(revSrchIn)).length).toBeGreaterThan(0)
    expect(Object.keys(await service.autocomplete(autoCompIn)).length).toBeGreaterThan(0);
    expect((await service.findLocationByText(findLocIn))).toBeTruthy().toMatchObject(new Location())
    expect((await service.reverseSearchLocation(revSrchIn))).toBeTruthy().toMatchObject(new Location())
    expect((await service.autocomplete(autoCompIn))).toBeTruthy().toMatchObject(new Location())
  })

});
