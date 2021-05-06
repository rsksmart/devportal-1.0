CLI arguments are everything that you pass after the RSK start class

#### The command line arguments have two forms the parameter and the flag
- Parameter
    - Has a name and a associeted value, separated by a space
    - Starts with one single dash
- Flag
    - It's a single text, without spaces
    - Starts with a double dash

A list of command line flags and paramenters are available:

### Network related

The following CLI flags determine which network the RSK node will connect to.

- `--main`:
  Indicates that the configuration for the RSK Mainnet (public network) should be used.
- `--testnet`:
  Indicates that the configuration for the RSK Testnet (public network) should be used.
- `--regtest`:
  Indicates that the configuration for the RSK Regtest (localhost network) should be used.
    - Example: `java -cp rsk-core-<VERSION>.jar co.rsk.start --regtest`

Only one of these three CLI flags should be specified.

When none of these are specified, RSK Mainnet is used by default.

### Database related

The RSK node stores transactions, blocks,
and other blockchain state on disk.
This is known as the *Blockchain Database*.

- `--reset`:
  Indicates that the block database should be erased, and should start from scratch,
  i.e. from genesis block.
  This is typically expected to be used when connecting to RSK Regtest,
  or in select debugging scenarios.
- `--import`:
  Indicates that the block database should be imported from an external source.
  This is typically expected to be used when connecting to RSK Testnet or RSK Mainnet,
  and when a reduction in "initial sync time" is desired.

### Configuration related

- `--verify-config`:
  Indicates that the configuration file used by this run of the RSK node
  should be validated.
  By default this step is always performed.
- `--print-system-info`:
  Indicates that the system information of the computer that the RSK node
  is running on should be output.
  By default, this is always output.
- `--skip-java-check`:
  Indicates that the detection of the version of
  the Java Virtual Machine that the RSK node is running in is supported.
  By default, this check is always performed, to ensure that the RSK node is running
  in a compatible environment.
- `-base-path`: 
  Specifies the value of `database.dir`, where the blockchain database is stored.
    - Example: `java -cp rsk-core-<VERSION>.jar co.rsk.start -base-path home/rsk/data`
- `-rpccors` Specifies the valoe of `rpc.providers.web.cors` to constrol cors configuration
    - Example: `java -cp rsk-core-<VERSION>.jar co.rsk.start -rpccors *`

## Configuration over CLI

Besides the parameters and flags, it's also possible to configure the node over the CLI using the JVM parameters starts with the prefix `-D` followed by the full path of the configuration like it is placed inside the configuration file.
- Exemple: `java -cp rskj-core-<VERSION>.jar -Ddatabase.dir=/home/rsk/data co.rsk.Start`


Most of the configurable options or settings for RSKj are available
in "config". See [config reference](../reference/) for more details.

## Reference implementation

See the definition of the CLI flags in the RSKj codebase:
[`NodeCliFlags` in `NodeCliFlags.java`](https://github.com/rsksmart/rskj/blob/master/rskj-core/src/main/java/co/rsk/config/NodeCliFlags.java)

See the definition of the CLI parameters in the RSKj codebase:
[`NodeCliOptions` in `NodeCliOptions.java`](https://github.com/rsksmart/rskj/blob/master/rskj-core/src/main/java/co/rsk/config/NodeCliOptions.java)
