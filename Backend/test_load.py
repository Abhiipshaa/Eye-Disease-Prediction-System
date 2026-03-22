import tensorflow as tf
import h5py
from keras.src.legacy.saving import legacy_h5_format
from keras.src.models.functional import Functional as KF
from tensorflow.keras.layers import Dense

class PD(Dense):
    def __init__(self, *a, **kw):
        kw.pop("quantization_config", None)
        super().__init__(*a, **kw)

# Build the model graph (architecture only, no weights yet)
with tf.keras.utils.custom_object_scope({"Dense": PD, "Functional": KF}):
    m = legacy_h5_format.load_model_from_hdf5(
        "models/eye_detection_model.h5",
        custom_objects={"Dense": PD, "Functional": KF}
    )

print("input shape:", m.input_shape)
for i, l in enumerate(m.layers[:4]):
    w = l.get_weights()
    print(i, l.name, [x.shape for x in w])
