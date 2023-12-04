export default function CreateListing() {
  const handleSubmit = () => {};
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 text-slate-700">
        Create a Listing
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="outline p-2 outline-1 outline-slate-400"
            id="name"
            maxLength="62"
            minLength="10"
            required
          />

          <textarea
            type="text"
            placeholder="Description"
            className="outline p-2 outline-1 outline-slate-400"
            id="description"
            maxLength="62"
            minLength="10"
            required
          />

          <input
            type="text"
            placeholder="Address"
            className="outline p-2 outline-1 outline-slate-400"
            id="address"
            required
          />

          <input
            type="number"
            placeholder="Floors"
            className="outline p-2 outline-1 outline-slate-400"
            id="floors"
            required
          />

          <input
            type="number"
            placeholder="Area (square meter)"
            className="outline p-2 outline-1 outline-slate-400"
            id="area"
            required
          />

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" name="sell" id="sell" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="furnished" id="furnished" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="parking" id="parking" />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="offer" id="offer" />
              <span>Offer</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" name="sell" id="sell" />
              <span>Sell</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex flex-row gap-1 items-center outline p-2 outline-1 outline-slate-400">
              <span>
                <img className="h-6 w-6" src="bed.svg" alt="bedrooms" />
              </span>
              <input
                type="number"
                placeholder="bedrooms"
                className="p-3 rounded-lg hover:outline-none outline-none"
                id="bedrooms"
                required
              />
            </div>

            <div className="flex flex-row gap-1 items-center outline p-2 outline-1 outline-slate-400">
              <span>
                <img className="h-6 w-6" src="bathroom.svg" alt="bathrooms" />
              </span>
              <input
                type="number"
                placeholder="bathrooms"
                className="p-3 rounded-lg hover:outline-none outline-none"
                id="bathrooms"
                required
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 ">
            <div className="flex flex-row gap-1 items-center outline p-2 outline-1 outline-slate-400">
              <span>
                <img className="h-6 w-6" src="dollar.svg" alt="price" />
              </span>
              <input
                type="number"
                placeholder="Regular Price"
                className="p-3 rounded-lg hover:outline-none outline-none"
                id="regularPrice"
                required
              />
              <span className="">$/month</span>
            </div>

            <div className="flex flex-row gap-1 items-center outline p-2 outline-1 outline-slate-400">
              <span>
                <img className="h-6 w-6" src="discount.svg" alt="discount" />
              </span>
              <input
                type="number"
                placeholder="Discounted Price"
                className="p-3 rounded-lg hover:outline-none outline-none"
                id="discountedPrice"
                required
              />
              <span className="">$/month</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-2">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover max(6)
            </span>
          </p>

          <div className="flex gap-4">
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
              className="text-slate-700 bg-slate-50 border border-slate-400 w-full p-3"
            />
            <button
              className="justify-end border border-green-700 px-7 py-3 text-green-700 hover:text-green-50 hover:bg-green-700 hover:shadow-lg max-w-xs uppercase"
              type="submit"
            >
              Upload
            </button>
          </div>

          <button className="bg-slate-700 disabled:opacity-70 hover:opacity-95 p-3 text-white uppercase ">
          Create Listing
        </button>
        </div>
        
      </form>
    </main>
  );
}
